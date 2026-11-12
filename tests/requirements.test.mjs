import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

function getFiles(dir, exts = ['.tsx', '.ts', '.html', '.css']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === 'dist' || file === '.git' || file === 'tests') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  return results;
}

test('Strict Business Rules & Prohibitions Verification', async (t) => {
  const sourceFiles = getFiles(path.join(ROOT, 'src')).concat([path.join(ROOT, 'index.html')]);

  await t.test('Strictly NO RSVP forms, buttons, or registration across entire website', () => {
    for (const filePath of sourceFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.doesNotMatch(content, /<form\b[^>]*rsvp/i, `File ${path.basename(filePath)} must not contain an RSVP form`);
      assert.doesNotMatch(content, />\s*RSVP\s*</i, `File ${path.basename(filePath)} must not contain RSVP button/link text`);
      assert.doesNotMatch(content, /rsvp\s*now/i, `File ${path.basename(filePath)} must not contain "RSVP Now"`);
      assert.doesNotMatch(content, /confirm\s*attendance/i, `File ${path.basename(filePath)} must not contain "Confirm Attendance"`);
      assert.doesNotMatch(content, /guest\s*count/i, `File ${path.basename(filePath)} must not contain "Guest Count"`);
    }
  });

  await t.test('Strictly NO Thanksgiving service anywhere in upcoming events', () => {
    for (const filePath of sourceFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.doesNotMatch(content, /thanksgiving\s*service/i, `File ${path.basename(filePath)} must not contain Thanksgiving service`);
      assert.doesNotMatch(content, /thanksgiving\s*ceremony/i, `File ${path.basename(filePath)} must not contain Thanksgiving ceremony`);
    }
  });

  await t.test('Multi-page routes are registered in App.tsx', () => {
    const appPath = path.join(ROOT, 'src/App.tsx');
    const content = fs.readFileSync(appPath, 'utf8');
    assert.match(content, /path=["']\/["']/, 'Must register root route');
    assert.match(content, /path=["']\/our-story["']/, 'Must register /our-story route');
    assert.match(content, /path=["']\/wedding-details["']/, 'Must register /wedding-details route');
    assert.match(content, /path=["']\/gallery["']/, 'Must register /gallery route');
    assert.match(content, /path=["']\/blessings["']/, 'Must register /blessings route');
  });

  await t.test('Header navigation contains all 5 mandatory pages', () => {
    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const content = fs.readFileSync(headerPath, 'utf8');
    assert.match(content, /label:\s*["']Home["']/, 'Header must have Home link');
    assert.match(content, /label:\s*["']Our Story["']/, 'Header must have Our Story link');
    assert.match(content, /label:\s*["']Wedding Details["']/, 'Header must have Wedding Details link');
    assert.match(content, /label:\s*["']Gallery["']/, 'Header must have Gallery link');
    assert.match(content, /label:\s*["']Blessings["']/, 'Header must have Blessings link');
  });

  await t.test('Header uses sacred monogram V ✝ M', () => {
    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const content = fs.readFileSync(headerPath, 'utf8');
    assert.match(content, />\s*V\s*</, 'Monogram must contain V');
    assert.match(content, />\s*✝\s*</, 'Monogram must contain sacred cross');
    assert.match(content, />\s*M\s*</, 'Monogram must contain M');
  });

  await t.test('Enhanced Menu Top Button & Responsive Drawer Attributes', () => {
    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const content = fs.readFileSync(headerPath, 'utf8');
    assert.match(content, /aria-controls=["']mobile-navigation-drawer["']/, 'Menu button must have aria-controls matching drawer ID');
    assert.match(content, /aria-expanded=\{menuOpen\}/, 'Menu button must reflect aria-expanded dynamic state');
    assert.match(content, /lg:hidden/, 'Menu button must support responsiveness covering mobile and tablet (lg:hidden)');
    assert.match(content, /translate-y-\[7px\]\s+rotate-45/, 'Menu button must have animated 3-bar morphing transformation');
    assert.match(content, /touch-manipulation/, 'Buttons must have touch-manipulation for lag-free mobile taps');
  });

  await t.test('Mobile Navigation Scroll-Lock prevents reload and preserves scroll position', () => {
    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const content = fs.readFileSync(headerPath, 'utf8');
    // Ensure position: fixed is NOT used on body (which broke scroll restoration and caused pull-to-refresh reload)
    assert.doesNotMatch(content, /document\.body\.style\.position\s*=\s*['"]fixed['"]/, 'Must NOT use body position:fixed to prevent scroll jump and pull-to-refresh');
    // Ensure overscrollBehavior is set to none on lock
    assert.match(content, /overscrollBehavior\s*=\s*['"]none['"]/, 'Must disable overscrollBehavior to prevent Android pull-to-refresh');
    // Ensure overflow: hidden is used
    assert.match(content, /style\.overflow\s*=\s*['"]hidden['"]/, 'Must use overflow:hidden for clean scroll locking');
  });

  await t.test('No unexpected window.location assignments in navigation components', () => {
    const footerContent = fs.readFileSync(path.join(ROOT, 'src/components/Footer.tsx'), 'utf8');
    assert.doesNotMatch(footerContent, /window\.location\.href\s*=/, 'Footer must not use window.location.href assignment');
    assert.doesNotMatch(footerContent, /window\.location\.reload/, 'Footer must not use window.location.reload');

    const headerContent = fs.readFileSync(path.join(ROOT, 'src/components/Header.tsx'), 'utf8');
    assert.doesNotMatch(headerContent, /window\.location\.reload/, 'Header must not use window.location.reload');
    assert.doesNotMatch(headerContent, /window\.location\.href\s*=/, 'Header must not use window.location.href assignment');
  });

  await t.test('Mobile Navigation Links correctly redirect without preventDefault blocking', () => {
    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const content = fs.readFileSync(headerPath, 'utf8');

    // Root cause verification: ensure closeMenu does NOT call e.preventDefault()
    assert.doesNotMatch(
      content,
      /const\s+closeMenu\s*=\s*\([^)]*\)\s*=>\s*\{[^}]*preventDefault/s,
      'closeMenu must not call e.preventDefault() so NavLink redirect works'
    );

    // Verify all 5 routes are mapped to NavLink
    const expectedRoutes = [
      { to: '/', label: 'Home' },
      { to: '/our-story', label: 'Our Story' },
      { to: '/wedding-details', label: 'Wedding Details' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/blessings', label: 'Blessings' },
    ];

    for (const r of expectedRoutes) {
      assert.ok(
        content.includes(`to: '${r.to}'`) && content.includes(`label: '${r.label}'`),
        `Header navLinks must contain exact route mapping for ${r.label} -> ${r.to}`
      );
    }

    // Verify NavLink component from react-router-dom is used for mobile links
    assert.match(content, /import\s*\{[^}]*NavLink[^}]*\}\s*from\s*['"]react-router-dom['"]/);
    assert.match(content, /<NavLink[^>]+to=\{link\.to\}[^>]+onClick=\{closeMenu\}/);
  });

  await t.test('3D wax seal and physical book invitations are completely removed', () => {
    const appPath = path.join(ROOT, 'src/App.tsx');
    const appContent = fs.readFileSync(appPath, 'utf8');
    assert.doesNotMatch(appContent, /InvitationExperience/, 'App.tsx must not import or render InvitationExperience');
    assert.doesNotMatch(appContent, /LuxuryInvitationPage/, 'App.tsx must not import or render LuxuryInvitationPage');
    assert.doesNotMatch(appContent, /envelope/, 'App.tsx must not route to envelope');

    const headerPath = path.join(ROOT, 'src/components/Header.tsx');
    const headerContent = fs.readFileSync(headerPath, 'utf8');
    assert.doesNotMatch(headerContent, /envelope/, 'Header must not contain envelope links');
    assert.doesNotMatch(headerContent, /invite.*book/i, 'Header must not contain invitation book link');

    const footerPath = path.join(ROOT, 'src/components/Footer.tsx');
    const footerContent = fs.readFileSync(footerPath, 'utf8');
    assert.doesNotMatch(footerContent, /invite.*book/i, 'Footer must not contain invitation book button');

    assert.strictEqual(fs.existsSync(path.join(ROOT, 'src/components/InvitationExperience.tsx')), false);
    assert.strictEqual(fs.existsSync(path.join(ROOT, 'src/pages/LuxuryInvitationPage.tsx')), false);
    assert.strictEqual(fs.existsSync(path.join(ROOT, 'src/components/luxury')), false);
  });
});
