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

  await t.test('Light theme tokens are present and exact per specification', () => {
    assert.match(tailwindContent, /#8B7BB8/i, 'Cool Lavender #8B7BB8 must exist');
    assert.match(tailwindContent, /#768A9E/i, 'Cool Slate Grey #768A9E must exist');
    assert.match(tailwindContent, /#8EA7BE/i, 'Slate Accent #8EA7BE must exist');
    assert.match(tailwindContent, /#EBE5F2/i, 'Soft Lilac Mist #EBE5F2 must exist');
    assert.match(tailwindContent, /#261E33/i, 'Deep Obsidian Violet #261E33 must exist');

    assert.match(cssContent, /--color-rose:\s*#8B7BB8/i, 'CSS --color-rose must be #8B7BB8');
    assert.match(cssContent, /--color-olive:\s*#768A9E/i, 'CSS --color-olive must be #768A9E');
    assert.match(cssContent, /--color-pear:\s*#8EA7BE/i, 'CSS --color-pear must be #8EA7BE');
    assert.match(cssContent, /--color-cream:\s*#EBE5F2/i, 'CSS --color-cream must be #EBE5F2');
    assert.match(cssContent, /--color-plum:\s*#261E33/i, 'CSS --color-plum must be #261E33');

    assert.match(cssContent, /--bg-page:\s*#F8F7FA/i, 'CSS --bg-page must be #F8F7FA');
    assert.match(cssContent, /--text-main:\s*#261E33/i, 'CSS --text-main must be #261E33');
  });

  await t.test('Midnight Amethyst & Cool Lavender dark theme tokens are present and exact', () => {
    assert.match(tailwindContent, /#130F19/i, 'Main background #130F19 must exist');
    assert.match(tailwindContent, /#1A1523/i, 'Secondary background #1A1523 must exist');
    assert.match(tailwindContent, /#231C2D/i, 'Card background #231C2D must exist');
    assert.match(tailwindContent, /#2E253A/i, 'Elevated surface #2E253A must exist');
    assert.match(tailwindContent, /#ECE7F4/i, 'Primary text #ECE7F4 must exist');
    assert.match(tailwindContent, /#B8B0C7/i, 'Secondary text #B8B0C7 must exist');
    assert.match(tailwindContent, /#8D839E/i, 'Muted text #8D839E must exist');
    assert.match(tailwindContent, /#B8A3D9/i, 'Cool Lavender #B8A3D9 must exist');
    assert.match(tailwindContent, /#C7B5E3/i, 'Lavender hover #C7B5E3 must exist');
    assert.match(tailwindContent, /#8EA7BE/i, 'Slate accent #8EA7BE must exist');
    assert.match(tailwindContent, /#3D334D/i, 'Border #3D334D must exist');
  });

  await t.test('CSS custom properties match Midnight Amethyst theme', () => {
    assert.match(cssContent, /\[data-theme="dark"\]/, 'Must declare [data-theme="dark"] selector');
    assert.match(cssContent, /#130F19/i, 'CSS dark --bg-page must use #130F19');
    assert.match(cssContent, /#231C2D/i, 'CSS dark --bg-card must use #231C2D');
    assert.match(cssContent, /#ECE7F4/i, 'CSS dark --text-main must use #ECE7F4');
    assert.match(cssContent, /#B8A3D9/i, 'CSS dark --champagne must use #B8A3D9');
  });
});

