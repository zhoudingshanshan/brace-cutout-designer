// Service worker: once the app has been opened over https (e.g. on the iPad via Tailscale), it keeps
// a copy of every file so the home-screen app also works offline.
// tools/publish.py replaces VERSION, so every published version installs fresh and the page offers "Reload".
const VERSION = 'web-0.8-20261125104535';
const CACHE = `brace-${VERSION}`;
const FILES = [
  './', 'index.html', 'manifest.webmanifest',
  'icon.png', 'icon-180.png', 'icon-192.png', 'icon-512.png',
  'vendor/three/build/three.module.js',
  'vendor/three/examples/jsm/controls/OrbitControls.js',
  'vendor/three/examples/jsm/lines/LineSegments2.js',
  'vendor/three/examples/jsm/lines/LineSegmentsGeometry.js',
  'vendor/three/examples/jsm/lines/LineMaterial.js',
  'data/pattern.json', 'data/body.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('brace-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => { if (event.data === 'skipWaiting') self.skipWaiting(); });

// cache first, so it works offline; anything not cached goes to the network
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith((async () => {
    const hit = await caches.match(req, { ignoreSearch: true, cacheName: CACHE });
    if (hit) return hit;
    try {
      return await fetch(req);
    } catch {
      return (req.mode === 'navigate' && (await caches.match('./', { cacheName: CACHE }))) || Response.error();
    }
  })());
});
