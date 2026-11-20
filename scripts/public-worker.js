/* Generated configuration contains only build-selected public resources. */
const { cacheName, precache, optional } = __PUBLIC_CONFIG__;
const allowed = new Set([...precache, ...optional]);
function cacheable(response) {
  return response.ok && !response.redirected && response.type !== 'opaque'
    && !/no-store|private/i.test(response.headers.get('cache-control') || '')
    && !/(?:\*|cookie|authorization)/i.test(response.headers.get('vary') || '');
}
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    try {
      for (const url of precache) {
        const response = await fetch(new Request(url, { credentials: 'omit', cache: 'reload', redirect: 'error' }));
        if (!cacheable(response)) throw new Error('Public cache installation failed');
        await cache.put(url, response);
      }
    } catch (error) {
      await caches.delete(cacheName);
      throw error;
    }
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith('juvanga-public-') && name !== cacheName) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});
// A new release waits until the reader explicitly accepts it or closes all old tabs.
self.addEventListener('message', event => {
  if (event.data === 'activate-public-release' && event.source?.url
    && new URL(event.source.url).origin === self.location.origin) self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || request.headers.has('authorization')) return;
  const path = url.pathname.replace(/\/+$/, '') || '/';
  const isPublic = !url.search && allowed.has(path);
  if (!isPublic && request.mode !== 'navigate') return;
  event.respondWith((async () => {
    let cache;
    try {
      cache = await caches.open(cacheName);
      if (isPublic) {
        const cached = await cache.match(path);
        if (cached) return cached;
      }
    } catch { /* Storage refusal must not prevent online reading. */ }
    try {
      const response = await fetch(isPublic ? new Request(request, { credentials: 'omit', redirect: 'error' }) : request);
      if (isPublic && cache && cacheable(response)) {
        try { await cache.put(path, response.clone()); }
        catch { /* Keep the successful network response when the cache is full. */ }
      }
      return response;
    } catch {
      if (request.mode !== 'navigate') return Response.error();
      const offline = await cache?.match('/offline').catch(() => undefined);
      if (!offline) return Response.error();
      return new Response(await offline.text(), { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
    }
  })());
});
