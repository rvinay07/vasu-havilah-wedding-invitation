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

  await t.test('Scripture and reference are Matthew 19:6', () => {
    assert.match(content, /Therefore what God has joined together, let no one separate\./, 'Must contain Matthew 19:6 verse');
    assert.match(content, /Matthew 19:6/, 'Must reference Matthew 19:6');
  });

  await t.test('Upcoming events are strictly Ceremony and Reception (No Thanksgiving)', () => {
    assert.match(content, /id:\s*["']ceremony["']/, 'Must have ceremony event');
    assert.match(content, /id:\s*["']reception["']/, 'Must have reception event');
    assert.doesNotMatch(content, /thanksgiving/i, 'Must NOT contain any Thanksgiving service or event');
  });

  await t.test('Ceremony date, timing and venue are correct', () => {
    assert.match(content, /2027-02-03T09:00:00/, 'Ceremony date must be 3 Feb 2027 9:00 AM');
    assert.match(content, /Mahendra Kalyana Mandapam/, 'Venue must be Mahendra Kalyana Mandapam');
    assert.match(content, /Tilak Nagar,\s*Guntakal/, 'Address must be Tilak Nagar, Guntakal');
    assert.match(content, /https:\/\/maps\.app\.goo\.gl\/Mic6WHfh54kWS1m6A/, 'Must contain valid Google Maps URL for ceremony');
  });

  await t.test('Reception date, timing and venue are correct', () => {
    assert.match(content, /2027-02-04T19:00:00/, 'Reception date must be 4 Feb 2027 7:00 PM');
    assert.match(content, /Sri Thimmaih Kalyana Mandapam/, 'Venue must be Sri Thimmaih Kalyana Mandapam');
    assert.match(content, /Bollavaram Rural,\s*Proddatur/, 'Address must be Bollavaram Rural, Proddatur');
    assert.match(content, /https:\/\/maps\.app\.goo\.gl\/g9VhPVfzPj7Lbq7h9/, 'Must contain valid Google Maps URL for reception');
  });

  await t.test('Engagement is recorded as completed milestone', () => {
    assert.match(content, /id:\s*["']engagement["'][\s\S]*?status:\s*["']completed["']/, 'Engagement must be marked as status: completed');
  });

  await t.test('Contact numbers contain all three family numbers', () => {
    assert.match(content, /8978148996/, 'Must contain general phone number');
    assert.match(content, /9652296062/, 'Must contain Vasu groom phone number');
    assert.match(content, /6281047922/, 'Must contain Hoshi family phone number');
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
