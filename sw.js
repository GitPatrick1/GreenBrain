const CACHE_NAME = 'greenbrain-cache-v2';
const ASSETS_TO_CACHE = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'think-green.png',
  'day-and-night.png',
  'shop.png',
  // Aggiungi altre risorse e immagini necessarie
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                  .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});
