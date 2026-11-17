import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

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
}

async function generate() {
  console.log('--- Generating WhatsApp Invitation Card from gallery-1.jpg ---');

  const galleryPath = path.join(ROOT, 'assets/images/gallery-1.jpg');
  if (!fs.existsSync(galleryPath)) {
    throw new Error('gallery-1.jpg does not exist at ' + galleryPath);
  }

  const galleryBase64 = fs.readFileSync(galleryPath).toString('base64');
  const imageSrc = `data:image/jpeg;base64,${galleryBase64}`;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    width: 1280px;
    height: 720px;
    overflow: hidden;
    background: #170A15;
    color: #FBF7EE;
    font-family: 'Montserrat', sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-font-smoothing: antialiased;
  }

  .card-container {
    width: 1280px;
    height: 720px;
    background: radial-gradient(circle at 70% 50%, #2A1326 0%, #170916 65%, #0F050E 100%);
    position: relative;
    display: flex;
    padding: 38px 48px;
    gap: 46px;
    align-items: center;
    overflow: hidden;
  }

  /* Decorative borders */
  .border-outer {
    position: absolute;
    inset: 16px;
    border: 1px solid rgba(212, 175, 55, 0.45);
    pointer-events: none;
  }
  .border-inner {
    position: absolute;
    inset: 22px;
    border: 1px solid rgba(212, 175, 55, 0.2);
    pointer-events: none;
  }
  .corner {
    position: absolute;
    width: 22px;
    height: 22px;
    border-color: #D4AF37;
    border-style: solid;
    pointer-events: none;
  }
  .corner-tl { top: 20px; left: 20px; border-width: 2px 0 0 2px; }
  .corner-tr { top: 20px; right: 20px; border-width: 2px 2px 0 0; }
  .corner-bl { bottom: 20px; left: 20px; border-width: 0 0 2px 2px; }
  .corner-br { bottom: 20px; right: 20px; border-width: 0 2px 2px 0; }

  /* Left Photo Arch */
  .photo-frame {
    width: 440px;
    height: 615px;
    position: relative;
    border-radius: 220px 220px 24px 24px;
    overflow: hidden;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 0 1.5px rgba(212, 175, 55, 0.5);
    flex-shrink: 0;
  }
  .photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 18%;
    display: block;
  }
  .photo-glow {
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.45);
    border-radius: inherit;
    pointer-events: none;
  }

  /* Right Invitation Text */
  .text-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 10px;
  }

  .cross {
    font-size: 36px;
    color: #E6C594;
    line-height: 1;
    margin-bottom: 6px;
    text-shadow: 0 0 16px rgba(230, 197, 148, 0.5);
  }

  .eyebrow {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #E6C594;
    margin-bottom: 12px;
  }

  .title-couple {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 56px;
    font-weight: 600;
    line-height: 1.05;
    color: #FFFFFF;
    letter-spacing: 0.02em;
    margin-bottom: 4px;
  }
  .ampersand {
    font-style: italic;
    font-weight: 400;
    color: #E6C594;
    margin: 0 10px;
    font-size: 46px;
  }

  .divider-line {
    width: 120px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    margin: 16px 0;
  }

  .scripture {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 19px;
    line-height: 1.4;
    color: rgba(251, 247, 238, 0.88);
    max-width: 530px;
    margin-bottom: 20px;
  }

  .details-box {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 16px;
    padding: 16px 26px;
    width: 100%;
    max-width: 530px;
    margin-bottom: 18px;
    backdrop-filter: blur(6px);
  }

  .event-date {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 26px;
    font-weight: 600;
    color: #E6C594;
    margin-bottom: 5px;
    letter-spacing: 0.02em;
  }

  .event-venue {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #FFFFFF;
  }
  .event-address {
    font-size: 12px;
    color: rgba(251, 247, 238, 0.7);
    margin-top: 3px;
    letter-spacing: 0.03em;
  }

  .footer-badge {
    font-size: 11px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #E6C594;
    opacity: 0.9;
    font-weight: 600;
  }
</style>
</head>
<body>
  <div class="card-container">
    <div class="border-outer"></div>
    <div class="border-inner"></div>
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>

    <!-- Left Arch Portrait -->
    <div class="photo-frame">
      <img src="${imageSrc}" alt="Vasu & Mercy Havilah">
      <div class="photo-glow"></div>
    </div>

    <!-- Right Content -->
    <div class="text-column">
      <div class="cross">✝</div>
      <div class="eyebrow">Holy Matrimony Invitation</div>
      <h1 class="title-couple">VASU <span class="ampersand">&amp;</span> MERCY HAVILAH</h1>
      
      <div class="divider-line"></div>
      
      <p class="scripture">“Therefore what God has joined together, let no one separate.” — Mark 10:9</p>
      
      <div class="details-box">
        <div class="event-date">Wednesday, 3 February 2027 · 9:00 AM</div>
        <div class="event-venue">AB Function Hall (AC)</div>
        <div class="event-address">Behind SSGS Degree College, SN Pet, Guntakal</div>
      </div>

      <div class="footer-badge">Together with their families, cordially invite you</div>
    </div>
  </div>
</body>
</html>`;

  // Start temporary local server to serve the HTML
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlContent);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  console.log('✓ Render server running on port ' + port);

  // Launch headless Chrome
  const debugPort = 9250 + Math.floor(Math.random() * 500);
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
    throw new Error('Could not connect to Chrome debugging endpoint');
  }

  const cdp = new SimpleCDP(targetWs);
  await cdp.connect();
  console.log('✓ Connected to Chrome CDP');

  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
    mobile: false
  });

  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` });

  // Wait for fonts and network idle
  await new Promise(r => setTimeout(r, 1800));

  console.log('✓ Capturing screenshot as JPEG...');
  const { data } = await cdp.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 82,
    clip: {
      x: 0,
      y: 0,
      width: 1280,
      height: 720,
      scale: 1
    }
  });

  const buffer = Buffer.from(data, 'base64');
  console.log(`✓ Image generated successfully! Size: ${(buffer.length / 1024).toFixed(1)} KB`);

  // Target paths
  const targets = [
    path.join(ROOT, 'assets/images/og-preview.jpg'),
    path.join(ROOT, 'dist/assets/images/og-preview.jpg'),
    path.join(ROOT, 'docs/assets/images/og-preview.jpg'),
  ];

  for (const t of targets) {
    const parent = path.dirname(t);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    fs.writeFileSync(t, buffer);
    console.log('  Saved to:', t);
  }

  chromeProc.kill();
  server.close();
  console.log('🎉 Done! Custom invitation card created successfully from gallery-1.jpg!');
}

generate().catch(err => {
  console.error('Error generating invitation card:', err);
  process.exit(1);
});
