import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const origin = 'https://juvanga.example';
function worker({ fail = false, headers = {}, denyOpen = false, denyPut = false } = {}) {
  const events = {}, stores = new Map(), requests = [];
  let activated = false;
  class PublicRequest extends Request {
    constructor(input, options) { super(typeof input === 'string' ? new URL(input, origin) : input, options); }
  }
  const caches = {
    keys: async () => [...stores.keys()],
    delete: async key => stores.delete(key),
    open: async key => {
      if (denyOpen) throw new Error('Cache Storage denied');
      if (!stores.has(key)) stores.set(key, new Map());
      const entries = stores.get(key);
      return { match: async key => entries.get(key)?.clone(), put: async (key, value) => { if (denyPut) throw new Error('Quota exceeded'); entries.set(key, value.clone()); } };
    },
  };
  const config = { cacheName: 'juvanga-public-current', precache: ['/', '/offline', '/learn/public/v/1/lesson', '/assets/app.js'], optional: ['/media/published.png'] };
  const self = { addEventListener: (type, callback) => { events[type] = callback; }, location: { origin }, clients: { claim: async () => {} }, skipWaiting: () => { activated = true; } };
  vm.runInNewContext(fs.readFileSync(new URL('../scripts/public-worker.js', import.meta.url), 'utf8').replace('__PUBLIC_CONFIG__', JSON.stringify(config)), {
    self, caches, URL, Request: PublicRequest, Response,
    fetch: async request => {
      requests.push(request);
      if (fail) throw new Error('Network unavailable');
      return new Response(new URL(request.url).pathname === '/offline' ? 'Offline explanation' : 'Public content', { headers });
    },
  });
  async function lifecycle(type) {
    let promise;
    events[type]({ waitUntil: value => { promise = value; } });
    await promise;
  }
  async function fetchPath(path, { navigate = false, method = 'GET', headers = {} } = {}) {
    const request = new Request(new URL(path, origin), { method, headers });
    if (navigate) Object.defineProperty(request, 'mode', { value: 'navigate' });
    let response;
    events.fetch({ request, respondWith: value => { response = value; } });
    return response;
  }
  return { lifecycle, fetchPath, stores, requests, config, events, activated: () => activated };
}

test('worker installs exactly public resources with credentials omitted and preserves unrelated caches', async () => {
  const w = worker();
  w.stores.set('other-app', new Map()); w.stores.set('juvanga-public-old', new Map());
  await w.lifecycle('install');
  assert.deepEqual([...w.stores.get(w.config.cacheName).keys()], w.config.precache);
  assert.ok(w.requests.every(request => request.credentials === 'omit' && request.redirect === 'error'));
  await w.lifecycle('activate');
  assert.deepEqual([...w.stores.keys()], ['other-app', w.config.cacheName]);
});

test('query, credentials, private paths, unknown versions and non-GET resources never enter public cache', async () => {
  const w = worker(); await w.lifecycle('install');
  for (const path of ['/progress', '/account', '/api/me', '/content/drafts/course.json', '/learn/private/v/1/lesson', '/learn/public/v/2/lesson', '/?token=secret', 'https://other.example/assets/app.js']) {
    assert.equal(await w.fetchPath(path), undefined);
  }
  assert.equal(await w.fetchPath('/', { method: 'POST' }), undefined);
  assert.equal(await w.fetchPath('/', { headers: { Authorization: 'Bearer fictional' } }), undefined);
  await w.fetchPath('/account', { navigate: true });
  assert.equal(w.stores.get(w.config.cacheName).has('/account'), false);
  assert.equal(w.stores.get(w.config.cacheName).has('/media/published.png'), false);
  await w.fetchPath('/media/published.png');
  assert.equal(w.stores.get(w.config.cacheName).has('/media/published.png'), true);
});

test('offline public document is returned exactly and an unknown document receives an honest 503', async () => {
  const w = worker({ fail: true });
  const cache = new Map([['/offline', new Response('Offline explanation')], ['/learn/public/v/1/lesson', new Response('Exact version 1')]]);
  w.stores.set(w.config.cacheName, cache);
  assert.equal(await (await w.fetchPath('/learn/public/v/1/lesson', { navigate: true })).text(), 'Exact version 1');
  const response = await w.fetchPath('/learn/public/v/2/lesson', { navigate: true });
  assert.equal(response.status, 503);
  assert.equal(await response.text(), 'Offline explanation');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(cache.has('/learn/public/v/2/lesson'), false);
});

test('failed or non-public install leaves the previous release intact', async () => {
  for (const options of [{ fail: true }, { headers: { 'cache-control': 'private' } }, { headers: { vary: 'Cookie' } }]) {
    const w = worker(options); w.stores.set('juvanga-public-old', new Map());
    await assert.rejects(w.lifecycle('install'));
    assert.deepEqual([...w.stores.keys()], ['juvanga-public-old']);
  }
});

test('runtime public cache rejects private, no-store and varying responses', async () => {
  for (const headers of [{ 'cache-control': 'no-store' }, { 'cache-control': 'private' }, { vary: 'Authorization' }, { vary: '*' }]) {
    const w = worker({ headers });
    await w.fetchPath('/media/published.png');
    assert.equal(w.stores.get(w.config.cacheName).size, 0);
  }
});

test('new worker activates only on an explicit same-origin client message', () => {
  const w = worker();
  w.events.message({ data: 'activate-public-release', source: { url: 'https://other.example/' } });
  assert.equal(w.activated(), false);
  w.events.message({ data: 'anything', source: { url: origin } });
  assert.equal(w.activated(), false);
  w.events.message({ data: 'activate-public-release', source: { url: origin } });
  assert.equal(w.activated(), true);
});

test('Cache Storage denial or quota does not turn a successful network response into an offline error', async () => {
  for (const options of [{ denyOpen: true }, { denyPut: true }]) {
    const w = worker(options);
    const response = await w.fetchPath('/media/published.png');
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'Public content');
    assert.equal(w.requests[0].credentials, 'omit');
  }
});
