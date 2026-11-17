import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

describe('Typography & Layout Consistency', () => {
  it('Hero heading enforces responsive layout: stacked on mobile (block) and single line on desktop (md:inline) with natural baseline & glyph', () => {
    const homeContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf-8');
    assert.match(homeContent, /<h1 className="[^"]*font-champagne[^"]*gsap-hero-title/);
    assert.match(homeContent, /<span className="block md:inline whitespace-nowrap">Vasu<\/span>/);
    assert.match(homeContent, /<span className="block md:inline text-rose dark:text-champagne font-champagne[^"]*"[^>]*>&amp;<\/span>/);
    assert.match(homeContent, /<span className="block md:inline whitespace-nowrap">Mercy Havilah<\/span>/);
  });

  it('Joyful Invitation enforces responsive layout: stacked on mobile (block) and single line on desktop (md:inline)', () => {
    const homeContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf-8');
    assert.match(homeContent, /<span className="block md:inline whitespace-nowrap">Vasu<\/span>/);
    assert.match(homeContent, /<span className="block md:inline text-rose dark:text-champagne font-champagne[^"]*"[^>]*>&amp;<\/span>/);
    assert.match(homeContent, /<span className="block md:inline whitespace-nowrap">Mercy Havilah<\/span>/);
  });

  it('HomePage portrait cards enforce font size, clearance and whitespace-nowrap', () => {
    const homeContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf-8');
    assert.match(homeContent, /<h3 className="font-champagne text-4xl sm:text-5xl font-normal text-plum dark:text-darktext-primary mb-4 sm:mb-5 leading-normal pb-1">[\s\S]*?<span className="whitespace-nowrap">Vasu<\/span>/);
    assert.match(homeContent, /<h3 className="font-champagne text-4xl sm:text-5xl font-normal text-plum dark:text-darktext-primary mb-4 sm:mb-5 leading-normal pb-1">[\s\S]*?<span className="whitespace-nowrap">Mercy Havilah<\/span>/);
    assert.match(homeContent, /<div className="text-xs text-plum-muted dark:text-darktext-secondary font-medium pt-1">/);
  });

  it('OurStoryPage portrait cards enforce font size, clearance and whitespace-nowrap', () => {
    const ourStoryContent = fs.readFileSync(path.join(ROOT, 'src/pages/OurStoryPage.tsx'), 'utf-8');
    assert.match(ourStoryContent, /<h3 className="font-champagne text-4xl sm:text-5xl font-normal text-plum dark:text-darktext-primary mb-4 sm:mb-5 leading-normal pb-1">[\s\S]*?<span className="whitespace-nowrap">Vasu<\/span>/);
    assert.match(ourStoryContent, /<h3 className="font-champagne text-4xl sm:text-5xl font-normal text-plum dark:text-darktext-primary mb-4 sm:mb-5 leading-normal pb-1">[\s\S]*?<span className="whitespace-nowrap">Mercy Havilah<\/span>/);
    assert.match(ourStoryContent, /<div className="text-xs text-plum-muted dark:text-darktext-secondary font-medium pt-1">/);
  });

  it('Footer enforces responsive layout: stacked on mobile (block) and single line on desktop (md:inline)', () => {
    const footerContent = fs.readFileSync(path.join(ROOT, 'src/components/Footer.tsx'), 'utf-8');
    assert.match(footerContent, /<span className="block md:inline whitespace-nowrap">Vasu<\/span>/);
    assert.match(footerContent, /<span className="block md:inline text-rose dark:text-champagne font-champagne[^"]*"[^>]*>&amp;<\/span>/);
    assert.match(footerContent, /<span className="block md:inline whitespace-nowrap">Mercy Havilah<\/span>/);
  });

  it('Header mobile drawer enforces 3-line stacked format with whitespace-nowrap and cursive ampersand', () => {
    const headerContent = fs.readFileSync(path.join(ROOT, 'src/components/Header.tsx'), 'utf-8');
    assert.match(headerContent, /<div className="font-champagne text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-normal leading-normal">/);
    assert.match(headerContent, /<span className="block whitespace-nowrap">Vasu<\/span>/);
    assert.match(headerContent, /<span className="block text-rose dark:text-champagne font-champagne[^"]*"[^>]*>&amp;<\/span>/);
    assert.match(headerContent, /<span className="block whitespace-nowrap">Mercy Havilah<\/span>/);
  });

  it('Preloader splash enforces responsive layout with whitespace-nowrap', () => {
    const preloaderContent = fs.readFileSync(path.join(ROOT, 'src/components/Preloader.tsx'), 'utf-8');
    assert.match(preloaderContent, /<span className="block md:inline whitespace-nowrap">Vasu<\/span>/);
    assert.match(preloaderContent, /<span className="block md:inline text-rose dark:text-champagne font-champagne[^"]*"[^>]*>&amp;<\/span>/);
    assert.match(preloaderContent, /<span className="block md:inline whitespace-nowrap">Mercy Havilah<\/span>/);
  });

  it('Top Hero section on HomePage displays Mark 10:9 in elegant italics beneath couple names', () => {
    const homeContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf-8');
    assert.match(homeContent, /“\{weddingConfig\.coreVerse\.quote\}”[\s\S]*?—\s*\{weddingConfig\.coreVerse\.reference\}\s*—/);
  });

  it('A Joyful Invitation section on HomePage displays Mark 10:9 in rounded pill-shaped badge', () => {
    const homeContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf-8');
    assert.match(homeContent, /rounded-full[^"]*bg-cream-soft[^"]*border[^"]*shadow-sm[\s\S]*?“\{weddingConfig\.coreVerse\.quote\}”/);
    assert.match(homeContent, /—\s*\{weddingConfig\.coreVerse\.reference\}/);
  });

  it('Holy Matrimony milestone on OurStoryPage features lead scripture Mark 10:9', () => {
    const ourStoryContent = fs.readFileSync(path.join(ROOT, 'src/pages/OurStoryPage.tsx'), 'utf-8');
    assert.match(ourStoryContent, /\{milestone\.scripture && \([\s\S]*?\{milestone\.scripture\}[\s\S]*?\)\}/);
    const configContent = fs.readFileSync(path.join(ROOT, 'src/config/weddingConfig.ts'), 'utf-8');
    assert.match(configContent, /id:\s*["']matrimony["'][\s\S]*?scripture:\s*["']“Therefore what God has joined together, let no one separate\.” — Mark 10:9["']/);
  });

  it('WhatsApp share invitation places Mark 10:9 near top of message', () => {
    const configContent = fs.readFileSync(path.join(ROOT, 'src/config/weddingConfig.ts'), 'utf-8');
    assert.match(configContent, /`"Therefore what God has joined together, let no one separate\." — Mark 10:9`/);
  });
});
