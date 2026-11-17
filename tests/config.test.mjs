import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

test('Centralized Wedding Configuration Integrity', async (t) => {
  const configPath = path.join(ROOT, 'src/config/weddingConfig.ts');
  assert.ok(fs.existsSync(configPath), 'weddingConfig.ts must exist');
  const content = fs.readFileSync(configPath, 'utf8');

  await t.test('Couple names are accurately defined', () => {
    assert.match(content, /groomName:\s*["']VASU["']/, 'Groom name must be VASU');
    assert.match(content, /brideName:\s*["']MERCY HAVILAH["']/, 'Bride name must be MERCY HAVILAH');
  });

  await t.test('Family / Parents details are accurately defined', () => {
    assert.match(content, /groomFather:\s*["']N\.JEPHANIAH["']/, 'Groom father must be N.JEPHANIAH');
    assert.match(content, /groomMother:\s*["']N\.UMA DEVI["']/, 'Groom mother must be N.UMA DEVI');
    assert.match(content, /brideFather:\s*["']S\.DEENA SHEKHAR["']/, 'Bride father must be S.DEENA SHEKHAR');
    assert.match(content, /brideMother:\s*["']S\.ESTHER["']/, 'Bride mother must be S.ESTHER');
  });

  await t.test('Scripture and reference are Mark 10:9', () => {
    assert.match(content, /Therefore what God has joined together, let no one separate\./, 'Must contain Mark 10:9 verse');
    assert.match(content, /Mark 10:9/, 'Must reference Mark 10:9');
  });

  await t.test('Upcoming events are strictly Ceremony (No Reception, No Thanksgiving)', () => {
    assert.match(content, /id:\s*["']ceremony["']/, 'Must have ceremony event');
    assert.doesNotMatch(content, /reception/i, 'Must NOT contain any Reception service or event per family requirement');
    assert.doesNotMatch(content, /thanksgiving/i, 'Must NOT contain any Thanksgiving service or event');
  });

  await t.test('Ceremony date, timing and venue are correct', () => {
    assert.match(content, /2027-02-03T09:00:00/, 'Ceremony date must be 3 Feb 2027 9:00 AM');
    assert.match(content, /AB Function Hall \(AC\)/, 'Venue must be AB Function Hall (AC)');
    assert.match(content, /Behind SSGS Degree College,\s*SN Pet,\s*Guntakal/, 'Address must be Behind SSGS Degree College, SN Pet, Guntakal');
    assert.match(content, /https:\/\/maps\.app\.goo\.gl\/V26a9HupTv4vn8A28/, 'Must contain valid Google Maps URL for ceremony');
  });

  await t.test('Engagement is recorded as completed milestone with 4 Feb 2026 date', () => {
    assert.match(content, /id:\s*["']engagement["'][\s\S]*?status:\s*["']completed["']/, 'Engagement must be marked as status: completed');
    assert.match(content, /4\s*Feb(?:ruary)?\s*2026/i, 'Engagement date must be 4 February 2026');
  });

  await t.test('Contact numbers contain all three family numbers with correct designations', () => {
    assert.match(content, /9652296062/, 'Must contain Vasu (Groom) phone number');
    assert.match(content, /6281047922/, 'Must contain Hoshi (Groom Brother) phone number');
    assert.match(content, /8978148996/, 'Must contain N. Jephaniah (Groom Father) phone number');
    assert.match(content, /Vasu\s*\(Groom\)/i, 'Must label Vasu as Groom');
    assert.match(content, /Hoshi\s*\(Groom'?s\s*Brother\)/i, 'Must label Hoshi as Groom Brother');
    assert.match(content, /Jephaniah\s*\(Groom'?s\s*Father\)/i, 'Must label Jephaniah as Groom Father');
  });

  await t.test('Minister of the ceremony is accurately defined', () => {
    assert.match(content, /heading:\s*["']The Minister of the Ceremony["']/, 'Must define heading: The Minister of the Ceremony');
    assert.match(content, /Rev\.\s*A\.\s*P\.\s*Solomon Vijay Raj/, 'Must define minister name Rev. A. P. Solomon Vijay Raj');
  });

  await t.test('All referenced media assets physically exist on disk', () => {
    const mediaFiles = [
      'assets/images/hero.jpg',
      'assets/images/groom.jpg',
      'assets/images/bride.jpg',
      'assets/images/groom-parents.jpg',
      'assets/images/bride-parents.jpg',
      'assets/images/gallery-1.jpg',
      'assets/images/gallery-2.jpg',
      'assets/images/gallery-3.jpg',
      'assets/images/gallery-4.jpg',
      'assets/images/gallery-5.jpg',
      'assets/images/gallery-6.jpg',
      'assets/music/wedding.mp3',
      'assets/videos/wedding.mp4'
    ];

    for (const relPath of mediaFiles) {
      const fullPath = path.join(ROOT, relPath);
      assert.ok(fs.existsSync(fullPath), `Media file must exist: ${relPath}`);
      const stats = fs.statSync(fullPath);
      assert.ok(stats.size > 0, `Media file must not be empty: ${relPath} (size: ${stats.size})`);
    }
  });
});
