import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { handleRequest } from '../server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

class SimpleCDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
    this.events = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          if (data.id && this.callbacks.has(data.id)) {
            const cb = this.callbacks.get(data.id);
            this.callbacks.delete(data.id);
            if (data.error) cb.reject(new Error(data.error.message));
            else cb.resolve(data.result);
          } else if (data.method) {
            const handlers = this.events.get(data.method) || [];
            handlers.forEach(fn => fn(data.params));
          }
        } catch (e) {
          console.error('CDP parse error:', e);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = this.id++;
      this.callbacks.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  on(event, handler) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(handler);
  }

  async evaluate(expression, retries = 5) {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await this.send('Runtime.evaluate', {
          expression,
          returnByValue: true,
          awaitPromise: true
        });
        if (res.exceptionDetails) {
          const detail = res.exceptionDetails.exception?.description || res.exceptionDetails.text || 'Runtime.evaluate failed';
          throw new Error(detail);
        }
        return res.result?.value;
      } catch (err) {
        if (i < retries - 1) {
          await new Promise(r => setTimeout(r, 400));
          continue;
        }
        throw err;
      }
    }
  }

  close() {
    if (this.ws) {
      try { this.ws.close(); } catch {}
    }
  }
}

async function runE2E() {
  console.log('--- Starting Comprehensive Desktop & Mobile E2E Test Suite ---');

  // 1. Start Server on random port
  const server = http.createServer(handleRequest);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`✓ Test server running on ${baseUrl}`);

  // 2. Launch Headless Chrome
  const debugPort = 9222 + Math.floor(Math.random() * 500);
  const chromeArgs = [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--mute-audio',
    'about:blank'
  ];

  const chromeProc = spawn(CHROME_PATH, chromeArgs, { stdio: 'ignore' });
  console.log(`✓ Chrome launched on debug port ${debugPort}`);

  // Wait for Chrome remote debugging to be ready
  let targetWs = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 250));
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find(t => t.type === 'page');
        if (page && page.webSocketDebuggerUrl) {
          targetWs = page.webSocketDebuggerUrl;
          break;
        }
      }
    } catch {}
  }

  if (!targetWs) {
    chromeProc.kill();
    server.close();
    throw new Error('Failed to connect to Chrome debug endpoint');
  }

  const cdp = new SimpleCDP(targetWs);
  await cdp.connect();
  console.log('✓ Connected to Chrome via Chrome DevTools Protocol (CDP)');

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('DOM.enable');

  const consoleErrors = [];
  cdp.on('Runtime.consoleAPICalled', (params) => {
    if (params.type === 'error') {
      const text = params.args?.map(a => a.value || a.description).join(' ');
      consoleErrors.push(text);
    }
  });

  const testViewports = [
    { name: 'Desktop (1920x1080)', width: 1920, height: 1080, isMobile: false },
    { name: 'Laptop / Tablet Landscape (1280x800)', width: 1280, height: 800, isMobile: false },
    { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024, isMobile: true },
    { name: 'Mobile Large - iPhone 15 Pro Max (430x932)', width: 430, height: 932, isMobile: true },
    { name: 'Mobile Standard - iPhone 14 (390x844)', width: 390, height: 844, isMobile: true },
    { name: 'Mobile Compact - iPhone SE / 5 (320x568)', width: 320, height: 568, isMobile: true },
  ];

  const pagesToTest = [
    { path: '/', name: 'Home' },
    { path: '/#/our-story', name: 'Our Story' },
    { path: '/#/wedding-details', name: 'Wedding Details' },
    { path: '/#/gallery', name: 'Gallery' },
    { path: '/#/blessings', name: 'Blessings' },
  ];

  let totalAssertions = 0;
  let passedAssertions = 0;
  const issues = [];

  function assert(condition, message) {
    totalAssertions++;
    if (condition) {
      passedAssertions++;
    } else {
      console.error(`  ❌ FAILED: ${message}`);
      issues.push(message);
    }
  }

  try {
    for (const vp of testViewports) {
      console.log(`\n📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);

      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.isMobile ? 2 : 1,
        mobile: vp.isMobile
      });

      for (const p of pagesToTest) {
        const url = `${baseUrl}${p.path}`;
        await cdp.send('Page.navigate', { url });
        await new Promise(r => setTimeout(r, 800)); // allow page transition / GSAP

        // Ensure page is ready
        await cdp.evaluate(`new Promise(resolve => {
          if (document.readyState === 'complete') return resolve(true);
          window.addEventListener('load', () => resolve(true), { once: true });
          setTimeout(() => resolve(true), 1500);
        })`);

        // Check horizontal overflow
        const overflowData = await cdp.evaluate(`(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollW = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientW = docEl.clientWidth;
          return {
            scrollW,
            clientW,
            hasOverflow: scrollW > clientW + 1
          };
        })()`);

        assert(
          !overflowData.hasOverflow,
          `[${vp.name}] ${p.name} has horizontal overflow (scrollWidth: ${overflowData.scrollW}px, clientWidth: ${overflowData.clientW}px)`
        );

        // Check images on page
        const imagesData = await cdp.evaluate(`(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          const broken = imgs.filter(img => !img.complete || img.naturalWidth === 0).map(i => i.src);
          return { total: imgs.length, brokenCount: broken.length, brokenUrls: broken };
        })()`);

        assert(
          imagesData.brokenCount === 0,
          `[${vp.name}] ${p.name} has ${imagesData.brokenCount} broken images: ${imagesData.brokenUrls.join(', ')}`
        );
      }

      // Viewport-specific UI tests:
      if (!vp.isMobile) {
        // Desktop nav should be visible
        const desktopNavVisible = await cdp.evaluate(`(() => {
          const nav = document.querySelector('nav[aria-label="Main desktop navigation"]');
          if (!nav) return false;
          const style = window.getComputedStyle(nav);
          return style.display !== 'none';
        })()`);
        assert(desktopNavVisible, `[${vp.name}] Desktop navigation bar must be visible`);

        // Mobile hamburger button should be hidden
        const hamburgerVisible = await cdp.evaluate(`(() => {
          const btn = document.querySelector('button[aria-controls="mobile-navigation-drawer"]');
          if (!btn) return false;
          const style = window.getComputedStyle(btn);
          return style.display !== 'none';
        })()`);
        assert(!hamburgerVisible, `[${vp.name}] Mobile hamburger button must be hidden on desktop`);
      } else {
        // Mobile hamburger button should be visible
        const hamburgerVisible = await cdp.evaluate(`(() => {
          const btn = document.querySelector('button[aria-controls="mobile-navigation-drawer"]');
          if (!btn) return false;
          const style = window.getComputedStyle(btn);
          return style.display !== 'none';
        })()`);
        assert(hamburgerVisible, `[${vp.name}] Mobile hamburger button must be visible on mobile`);

        // Desktop nav should be hidden
        const desktopNavVisible = await cdp.evaluate(`(() => {
          const nav = document.querySelector('nav[aria-label="Main desktop navigation"]');
          if (!nav) return false;
          const style = window.getComputedStyle(nav);
          return style.display !== 'none';
        })()`);
        assert(!desktopNavVisible, `[${vp.name}] Desktop navigation bar must be hidden on mobile`);

        // Test opening hamburger drawer
        await cdp.evaluate(`(() => {
          const btn = document.querySelector('button[aria-controls="mobile-navigation-drawer"]');
          if (btn) btn.click();
        })()`);
        await new Promise(r => setTimeout(r, 400));

        const drawerOpen = await cdp.evaluate(`(() => {
          const drawer = document.getElementById('mobile-navigation-drawer');
          return !!drawer;
        })()`);
        assert(drawerOpen, `[${vp.name}] Mobile drawer must open on hamburger button click`);

        // Test clicking navigation link in drawer redirects and closes drawer
        const clickResult = await cdp.evaluate(`(() => {
          const drawer = document.getElementById('mobile-navigation-drawer');
          if (!drawer) return { clicked: false };
          const link = Array.from(drawer.querySelectorAll('a')).find(a => a.textContent.includes('Wedding Details'));
          if (link) {
            link.click();
            return { clicked: true };
          }
          return { clicked: false };
        })()`);
        assert(clickResult.clicked, `[${vp.name}] Must click 'Wedding Details' link in mobile drawer`);

        await new Promise(r => setTimeout(r, 400));
        const drawerClosed = await cdp.evaluate(`(() => {
          const drawer = document.getElementById('mobile-navigation-drawer');
          return !drawer;
        })()`);
        assert(drawerClosed, `[${vp.name}] Mobile drawer must automatically close after link click`);

        const hash = await cdp.evaluate(`window.location.hash`);
        assert(hash.includes('wedding-details'), `[${vp.name}] Page hash must be updated to #/wedding-details (got: ${hash})`);
      }

      // Test Theme Toggle
      const initialTheme = await cdp.evaluate(`document.documentElement.getAttribute('data-theme') || 'light'`);
      await cdp.evaluate(`(() => {
        const btn = document.querySelector('button[data-testid="theme-toggle"]') || document.querySelector('button[title="Toggle theme"]');
        if (btn) btn.click();
      })()`);
      await new Promise(r => setTimeout(r, 300));
      const toggledTheme = await cdp.evaluate(`document.documentElement.getAttribute('data-theme') || 'light'`);
      assert(toggledTheme !== initialTheme, `[${vp.name}] Theme toggle must switch theme (from ${initialTheme} to ${toggledTheme})`);

      // Switch back
      await cdp.evaluate(`(() => {
        const btn = document.querySelector('button[data-testid="theme-toggle"]') || document.querySelector('button[title="Toggle theme"]');
        if (btn) btn.click();
      })()`);
    }

    // Check for any JavaScript runtime errors collected during the entire session
    assert(consoleErrors.length === 0, `No console errors should occur (found: ${consoleErrors.join(', ')})`);

    console.log(`\n========================================`);
    console.log(`E2E Results: ${passedAssertions}/${totalAssertions} assertions passed.`);
    if (issues.length > 0) {
      console.log(`\n🚨 ${issues.length} ISSUES FOUND:`);
      issues.forEach((iss, i) => console.log(`  ${i + 1}. ${iss}`));
      process.exitCode = 1;
    } else {
      console.log(`🎉 ALL DESKTOP & MOBILE RESPONSIVE TESTS PASSED PERFECTLY WITH ZERO ISSUES!`);
    }
    console.log(`========================================\n`);

  } finally {
    cdp.close();
    chromeProc.kill();
    server.close();
  }
}

runE2E().catch((err) => {
  console.error('E2E Fatal Error:', err);
  process.exit(1);
});
