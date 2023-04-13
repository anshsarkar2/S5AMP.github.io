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

self.addEventListener('load', () => {
  if (navigator.serviceWorker.controller) {
    // Service worker is active
    navigator.serviceWorker.ready
      .then(reg => {
        reg.showNotification('Welcome to S5AMP', {
          body: 'Install this app to access it even offline',
          icon: 'https://anshsarkar2.github.io/S5AMP.github.io/162b6e383bb6dc469d22a3f6bea7e066.ico/favicon-96x96.png',
          tag: 's5amp-notification'
        });
      })
      .catch(e => {
        console.error(e);
      });
  }
});
