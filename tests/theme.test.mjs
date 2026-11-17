import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

test('Design Tokens & Dual-Theme System Verification', async (t) => {
  const tailwindPath = path.join(ROOT, 'tailwind.config.js');
  const cssPath = path.join(ROOT, 'src/index.css');

  assert.ok(fs.existsSync(tailwindPath), 'tailwind.config.js must exist');
  assert.ok(fs.existsSync(cssPath), 'src/index.css must exist');

  const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  await t.test('Light theme tokens are present and exact per WedBuild specification', () => {
    assert.match(tailwindContent, /#C08A8F/i, 'Primary Colour / Main #C08A8F must exist');
    assert.match(tailwindContent, /#C0A08A/i, 'Secondary Colour / Accent #C0A08A must exist');
    assert.match(tailwindContent, /#DDCFD1/i, 'Soft #DDCFD1 must exist');
    assert.match(tailwindContent, /#F6F4F4/i, 'Neutral / Page Background #F6F4F4 must exist');
    assert.match(tailwindContent, /#322526/i, 'Deep / Heading Colour / Button Text #322526 must exist');

    assert.match(cssContent, /--color-rose:\s*#C08A8F/i, 'CSS --color-rose must be #C08A8F');
    assert.match(cssContent, /--color-olive:\s*#C0A08A/i, 'CSS --color-olive must be #C0A08A');
    assert.match(cssContent, /--color-pear:\s*#DDCFD1/i, 'CSS --color-pear must be #DDCFD1');
    assert.match(cssContent, /--color-cream:\s*#F6F4F4/i, 'CSS --color-cream must be #F6F4F4');
    assert.match(cssContent, /--color-plum:\s*#322526/i, 'CSS --color-plum must be #322526');

    assert.match(cssContent, /--bg-page:\s*#F6F4F4/i, 'CSS --bg-page must be #F6F4F4');
    assert.match(cssContent, /--text-main:\s*#322526/i, 'CSS --text-main must be #322526');
  });

  await t.test('Dark theme tokens adapt palette into dark mode values', () => {
    assert.match(tailwindContent, /#1D1516/i, 'Dark canvas background #1D1516 must exist');
    assert.match(tailwindContent, /#261D1E/i, 'Dark subtle surface #261D1E must exist');
    assert.match(tailwindContent, /#322526/i, 'Dark card surface #322526 must exist');
    assert.match(tailwindContent, /#413234/i, 'Dark elevated surface #413234 must exist');
    assert.match(tailwindContent, /#F6F4F4/i, 'Dark primary text #F6F4F4 must exist');
    assert.match(tailwindContent, /#DDCFD1/i, 'Dark secondary text #DDCFD1 must exist');
    assert.match(tailwindContent, /#C08A8F/i, 'Dark champagne/main accent #C08A8F must exist');
    assert.match(tailwindContent, /#C0A08A/i, 'Dark sage/accent #C0A08A must exist');
    assert.match(tailwindContent, /#564345/i, 'Dark border #564345 must exist');
  });

  await t.test('CSS custom properties match dark theme', () => {
    assert.match(cssContent, /\[data-theme="dark"\]/, 'Must declare [data-theme="dark"] selector');
    assert.match(cssContent, /--bg-page:\s*#1D1516/i, 'CSS dark --bg-page must use #1D1516');
    assert.match(cssContent, /--bg-card:\s*#322526/i, 'CSS dark --bg-card must use #322526');
    assert.match(cssContent, /--text-main:\s*#F6F4F4/i, 'CSS dark --text-main must use #F6F4F4');
    assert.match(cssContent, /--champagne:\s*#C08A8F/i, 'CSS dark --champagne must use #C08A8F');
  });
});

