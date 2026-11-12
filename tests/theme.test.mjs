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

  await t.test('Light theme tokens are present and exact', () => {
    assert.match(tailwindContent, /#C98271/i, 'Dusty Rose #C98271 must exist');
    assert.match(tailwindContent, /#67724A/i, 'Olive Green #67724A must exist');
    assert.match(tailwindContent, /#C2CCA8/i, 'Soft Pear Green #C2CCA8 must exist');
    assert.match(tailwindContent, /#FFEDDC/i, 'Cream White #FFEDDC must exist');
    assert.match(tailwindContent, /#4F3730/i, 'Plum Brown #4F3730 must exist');
  });

  await t.test('Midnight Champagne Luxury dark theme tokens are present and exact', () => {
    assert.match(tailwindContent, /#101820/i, 'Main background #101820 must exist');
    assert.match(tailwindContent, /#151F28/i, 'Secondary background #151F28 must exist');
    assert.match(tailwindContent, /#1B2732/i, 'Card background #1B2732 must exist');
    assert.match(tailwindContent, /#24313B/i, 'Elevated surface #24313B must exist');
    assert.match(tailwindContent, /#F1EBDD/i, 'Primary text #F1EBDD must exist');
    assert.match(tailwindContent, /#C1C5C4/i, 'Secondary text #C1C5C4 must exist');
    assert.match(tailwindContent, /#A0AAA9/i, 'Muted text #A0AAA9 must exist');
    assert.match(tailwindContent, /#D6B878/i, 'Champagne gold #D6B878 must exist');
    assert.match(tailwindContent, /#E6CC91/i, 'Gold hover #E6CC91 must exist');
    assert.match(tailwindContent, /#A6B3A1/i, 'Sage accent #A6B3A1 must exist');
    assert.match(tailwindContent, /#34424C/i, 'Border #34424C must exist');
  });

  await t.test('CSS custom properties match Midnight Champagne theme', () => {
    assert.match(cssContent, /\[data-theme="dark"\]/, 'Must declare [data-theme="dark"] selector');
    assert.match(cssContent, /#101820/i, 'CSS dark --bg-page must use #101820');
    assert.match(cssContent, /#1B2732/i, 'CSS dark --bg-card must use #1B2732');
    assert.match(cssContent, /#F1EBDD/i, 'CSS dark --text-main must use #F1EBDD');
    assert.match(cssContent, /#D6B878/i, 'CSS dark --champagne must use #D6B878');
  });
});

