import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

describe('Typography & Layout Consistency', () => {
  it('Hero heading enforces 3-line stacked format with whitespace-nowrap', () => {
    const homeContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf-8');
    assert.match(homeContent, /<h1 className="[^"]*font-champagne[^"]*gsap-hero-title/);
    assert.match(homeContent, /<span className="block whitespace-nowrap">Vasu<\/span>/);
    assert.match(homeContent, /<span className="block whitespace-nowrap">Mercy Havilah<\/span>/);
  });

  it('Joyful Invitation enforces 3-line stacked format with whitespace-nowrap', () => {
    const homeContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf-8');
    assert.match(homeContent, /<span className="font-champagne[^"]*block my-4 leading-none">/);
    assert.match(homeContent, /<span className="block whitespace-nowrap">Vasu<\/span>/);
    assert.match(homeContent, /<span className="block whitespace-nowrap">Mercy Havilah<\/span>/);
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

  it('Footer enforces 3-line stacked format with whitespace-nowrap', () => {
    const footerContent = fs.readFileSync(path.join(ROOT, 'src/components/Footer.tsx'), 'utf-8');
    assert.match(footerContent, /<h2 className="font-champagne[^"]*leading-none">/);
    assert.match(footerContent, /<span className="block whitespace-nowrap">Vasu<\/span>/);
    assert.match(footerContent, /<span className="block whitespace-nowrap">Mercy Havilah<\/span>/);
  });

  it('Header mobile drawer enforces 3-line stacked format with whitespace-nowrap', () => {
    const headerContent = fs.readFileSync(path.join(ROOT, 'src/components/Header.tsx'), 'utf-8');
    assert.match(headerContent, /<div className="font-champagne text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-normal leading-none">/);
    assert.match(headerContent, /<span className="block whitespace-nowrap">Vasu<\/span>/);
    assert.match(headerContent, /<span className="block whitespace-nowrap">Mercy Havilah<\/span>/);
  });

  it('Preloader splash enforces 3-line stacked format with whitespace-nowrap', () => {
    const preloaderContent = fs.readFileSync(path.join(ROOT, 'src/components/Preloader.tsx'), 'utf-8');
    assert.match(preloaderContent, /<div className="font-champagne text-2xl sm:text-3xl md:text-4xl text-plum dark:text-darktext-primary font-normal tracking-wide leading-none">/);
    assert.match(preloaderContent, /<span className="block whitespace-nowrap">Vasu<\/span>/);
    assert.match(preloaderContent, /<span className="block whitespace-nowrap">Mercy Havilah<\/span>/);
  });
});
