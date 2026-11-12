import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { handleRequest } from '../server.js';

function simulateRequest(method, pathname, headers = {}) {
  return new Promise((resolve) => {
    const req = new EventEmitter();
    req.method = method;
    req.url = pathname;
    req.headers = { host: 'localhost:8080', ...headers };

    let customStatusCode = null;
    const resHeaders = {};
    const chunks = [];

    const res = new EventEmitter();
    res.statusCode = 200;
    res.setHeader = (name, val) => {
      resHeaders[name.toLowerCase()] = val;
    };
    res.writeHead = (status, headersObj) => {
      customStatusCode = status;
      if (headersObj) {
        for (const [k, v] of Object.entries(headersObj)) {
          resHeaders[k.toLowerCase()] = v;
        }
      }
      return res;
    };
    res.write = (chunk) => {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return true;
    };
    res.end = (chunk) => {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      resolve({
        statusCode: customStatusCode !== null ? customStatusCode : res.statusCode,
        headers: resHeaders,
        body: Buffer.concat(chunks).toString('utf8'),
        buffer: Buffer.concat(chunks)
      });
    };

    handleRequest(req, res);
  });
}

test('HTTP Server & Static Asset Delivery', async (t) => {
  await t.test('Root (/) serves HTML with 200 OK', async () => {
    const res = await simulateRequest('GET', '/');
    assert.equal(res.statusCode, 200);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.match(res.body, /<div id="root">/);
  });

  await t.test('SPA route /our-story serves HTML entry point with 200 OK', async () => {
    const res = await simulateRequest('GET', '/our-story');
    assert.equal(res.statusCode, 200);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.match(res.body, /<div id="root">/);
  });

  await t.test('SPA route /wedding-details serves HTML entry point with 200 OK', async () => {
    const res = await simulateRequest('GET', '/wedding-details');
    assert.equal(res.statusCode, 200);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.match(res.body, /<div id="root">/);
  });

  await t.test('Legacy route /events redirects to /wedding-details with 301', async () => {
    const res = await simulateRequest('GET', '/events');
    assert.equal(res.statusCode, 301);
    assert.equal(res.headers['location'], '/wedding-details');
  });

  await t.test('Compiled CSS stylesheet is served with text/css Content-Type', async () => {
    const indexRes = await simulateRequest('GET', '/');
    const cssMatch = indexRes.body.match(/href="(?:\.\/)?(assets\/[^"]+\.css)"/);
    assert.ok(cssMatch, 'Should find CSS bundle link in index.html');
    const cssUrl = '/' + cssMatch[1];

    const res = await simulateRequest('GET', cssUrl);
    assert.equal(res.statusCode, 200);
    assert.match(res.headers['content-type'], /text\/css/);
    assert.ok(res.body.length > 500, 'CSS content should not be empty');
  });

  await t.test('Compiled JS module is served with application/javascript Content-Type', async () => {
    const indexRes = await simulateRequest('GET', '/');
    const jsMatch = indexRes.body.match(/src="(?:\.\/)?(assets\/[^"]+\.js)"/);
    assert.ok(jsMatch, 'Should find JS bundle script in index.html');
    const jsUrl = '/' + jsMatch[1];

    const res = await simulateRequest('GET', jsUrl);
    assert.equal(res.statusCode, 200);
    assert.match(res.headers['content-type'], /application\/javascript/);
    assert.ok(res.body.length > 500, 'JS content should not be empty');
  });

  await t.test('Media image is served with image/jpeg Content-Type', async () => {
    const res = await simulateRequest('GET', '/assets/images/hero.jpg');
    assert.equal(res.statusCode, 200);
    assert.match(res.headers['content-type'], /image\/jpeg/);
    assert.ok(res.buffer.length > 1000, 'Image should have non-zero binary length');
  });

  await t.test('Audio supports HTTP Range streaming request with 206 Partial Content', async () => {
    const res = await simulateRequest('GET', '/assets/music/wedding.mp3', { range: 'bytes=0-1023' });
    assert.equal(res.statusCode, 206);
    assert.equal(res.headers['accept-ranges'], 'bytes');
    assert.match(res.headers['content-range'], /bytes 0-1023\/\d+/);
    assert.match(res.headers['content-type'], /audio\/mpeg/);
    assert.equal(res.buffer.length, 1024);
  });

  await t.test('Missing file with extension returns 404 (never HTML fallback)', async () => {
    const res = await simulateRequest('GET', '/assets/missing-asset-file.css');
    assert.equal(res.statusCode, 404);
  });

  await t.test('Directory traversal attempts are forbidden with 403', async () => {
    const res = await simulateRequest('GET', '/../package.json');
    assert.equal(res.statusCode, 403);
  });
});
