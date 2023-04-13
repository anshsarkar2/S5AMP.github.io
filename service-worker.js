const CACHE_NAME = 's5amp-cache-v1';
const urlsToCache = [
  'https://anshsarkar2.github.io/S5AMP.github.io/index.html',
  'https://anshsarkar2.github.io/S5AMP.github.io/index.css',
  'https://anshsarkar2.github.io/S5AMP.github.io/try.html',
  'https://anshsarkar2.github.io/S5AMP.github.io/try.css',
  'https://anshsarkar2.github.io/S5AMP.github.io/login.html',
  'https://anshsarkar2.github.io/S5AMP.github.io/login.css',
  'https://anshsarkar2.github.io/S5AMP.github.io/login/login1.html',
  'https://anshsarkar2.github.io/S5AMP.github.io/login/login1.css',
  'https://anshsarkar2.github.io/S5AMP.github.io/Screenshot from 2023-01-08 17-48-22.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
