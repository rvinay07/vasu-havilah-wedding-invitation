import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const VIEWPORT_SIZES = [
  { name: 'iPhone 5/SE (Compact)', width: 320 },
  { name: 'Galaxy S8/S9 / Compact Android', width: 360 },
  { name: 'iPhone SE 2/3 / iPhone 12/13 mini', width: 375 },
  { name: 'iPhone 12/13/14 Pro', width: 390 },
  { name: 'Samsung Galaxy Ultra / Pixel 7', width: 412 },
  { name: 'iPhone 14/15/16 Pro Max', width: 430 },
  { name: 'iPad Mini (Portrait Tablet)', width: 768 },
  { name: 'iPad Pro / Desktop Transition', width: 1024 }
];

test('Mobile-First Responsiveness & Cross-Device Adaptation', async (t) => {
  const indexHtmlPath = path.join(ROOT, 'index.html');
  const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

  await t.test('Viewport meta tag is configured with viewport-fit=cover for safe-areas', () => {
    assert.match(indexContent, /name="viewport"/, 'Must contain viewport meta tag');
    assert.match(indexContent, /width=device-width/, 'Must specify width=device-width');
    assert.match(indexContent, /initial-scale=1/, 'Must specify initial-scale=1');
    assert.match(indexContent, /viewport-fit=cover/, 'Must specify viewport-fit=cover for notch safe areas');
  });

  await t.test('Root body enforces horizontal scroll prevention (overflow-x-hidden)', () => {
    assert.match(indexContent, /overflow-x-hidden/, 'Body must contain overflow-x-hidden to prevent horizontal scrolling');
  });

  await t.test('Target smartphone widths (320px–430px) are accommodated in Page layouts', () => {
    const pageFiles = [
      'src/pages/HomePage.tsx',
      'src/pages/OurStoryPage.tsx',
      'src/pages/WeddingDetailsPage.tsx',
      'src/pages/GalleryPage.tsx',
      'src/pages/BlessingsPage.tsx',
    ];

    for (const relPath of pageFiles) {
      const fullPath = path.join(ROOT, relPath);
      const content = fs.readFileSync(fullPath, 'utf8');

      // Grid classes must collapse to 1 column on mobile viewports
      assert.match(content, /grid-cols-1/, `${relPath} must specify grid-cols-1 for mobile screens`);

      // Buttons and CTAs must be flexible/wrapping without hardcoded breaking widths
      assert.doesNotMatch(content, /w-\[\d{3,4}px\]/g, `${relPath} must not contain large fixed pixel widths that break on 320px`);
    }
  });

  await t.test('Mobile Touch Target Size (44px standard) & touch-manipulation', () => {
    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const headerContent = fs.readFileSync(headerPath, 'utf8');

    // Menu button and Theme toggle size
    assert.match(headerContent, /w-10\s+h-10\s+sm:w-11\s+sm:h-11/, 'Menu button must meet 40px-44px touch target standard');
    assert.match(headerContent, /touch-manipulation/, 'Buttons must have touch-manipulation for lag-free mobile taps');
  });

  await t.test('Mobile Drawer accommodates small screens (320px height & width)', () => {
    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const headerContent = fs.readFileSync(headerPath, 'utf8');

    assert.match(headerContent, /overflow-y-auto/, 'Drawer container must have overflow-y-auto for small screen heights');
    assert.match(headerContent, /overscroll-contain/, 'Drawer container must have overscroll-contain to isolate scroll gestures');
    assert.match(headerContent, /max-w-sm\s+mx-auto/, 'Drawer inner content must be constrained to max-w-sm for narrow widths');
  });

  await t.test('Countdown grid adapts cleanly on 320px viewports (4 columns with gap-2)', () => {
    const countdownPath = path.join(ROOT, 'src/components/Countdown.tsx');
    const countdownContent = fs.readFileSync(countdownPath, 'utf8');

    assert.match(countdownContent, /grid-cols-4\s+gap-2/, 'Countdown must use 4 columns with compact gap-2 for 320px screens');
    assert.match(countdownContent, /p-2\.5\s+sm:p-3/, 'Countdown cells must use responsive padding');
  });

  await t.test('Wedding Details CTAs adapt responsively (stack full-width on mobile, flex on desktop)', () => {
    const detailsPath = path.join(ROOT, 'src/pages/WeddingDetailsPage.tsx');
    const detailsContent = fs.readFileSync(detailsPath, 'utf8');

    assert.match(detailsContent, /flex-col\s+sm:flex-row/, 'Action buttons must stack on mobile (flex-col) and row on tablet/desktop');
    assert.match(detailsContent, /w-full\s+sm:w-auto\s+sm:flex-1/, 'Action buttons must expand full width on small screens');
  });

  await t.test('Photo Gallery is optimized for mobile touch interaction', () => {
    const galleryPath = path.join(ROOT, 'src/pages/GalleryPage.tsx');
    const galleryContent = fs.readFileSync(galleryPath, 'utf8');

    assert.match(galleryContent, /opacity-90\s+sm:opacity-0/, 'Photo captions must be visible on touchscreens without requiring mouse hover');
    assert.match(galleryContent, /aspect-\[16\/10\]/, 'Carousel must use standard mobile-friendly aspect ratio');
    assert.match(galleryContent, /aspect-\[4\/3\]/, 'Grid cards must use responsive aspect ratio');
  });

  await t.test('Tablet (768px-1023px) vs Desktop (1024px+) clean responsive breakpointing', () => {
    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const headerContent = fs.readFileSync(headerPath, 'utf8');

    assert.match(headerContent, /hidden\s+lg:flex/, 'Desktop navigation must hide cleanly below 1024px to prevent tablet crowding');
    assert.match(headerContent, /lg:hidden/, 'Mobile menu toggle must show on tablets below 1024px');
  });

  await t.test('Hero image framing & seamless bottom gradient feathering on mobile', () => {
    const homeContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf8');
    const heroContent = fs.readFileSync(path.join(ROOT, 'src/components/PageHero.tsx'), 'utf8');

    // Both home hero and subpage hero must use top-biased face framing and bottom gradient fade
    assert.match(homeContent, /object-\[center_20%\]/, 'HomePage hero must use top-biased face framing for mobile');
    assert.match(homeContent, /bg-gradient-to-t\s+from-cream-warm\s+dark:from-midnight/, 'HomePage must feather bottom edge into invitation');
    assert.match(heroContent, /object-\[center_20%\]/, 'PageHero must use top-biased face framing for mobile');
    assert.match(heroContent, /bg-gradient-to-t\s+from-cream-warm\s+dark:from-midnight/, 'PageHero must feather bottom edge seamlessly');
  });

  await t.test('Floating audio controls do not overlap mobile cards and respect safe areas', () => {
    const floatContent = fs.readFileSync(path.join(ROOT, 'src/components/FloatingControls.tsx'), 'utf8');
    assert.match(floatContent, /bottom-3\s+right-3\s+sm:bottom-6\s+sm:right-6/, 'Floating controls must use compact margins on mobile');
    assert.match(floatContent, /safe-area-inset-bottom/, 'Floating controls must respect safe-area-inset-bottom');
    assert.match(floatContent, /w-10\s+h-10\s+sm:w-11\s+sm:h-11/, 'Music button must be appropriately sized for mobile without occluding cards');
  });

  await t.test('Couple portrait photos scale responsively on compact mobile viewports', () => {
    const storyContent = fs.readFileSync(path.join(ROOT, 'src/pages/OurStoryPage.tsx'), 'utf8');
    assert.match(storyContent, /w-36\s+h-36\s+sm:w-44\s+sm:h-44/, 'Couple portraits must scale down to 144px on mobile to prevent clipping');
  });
});

