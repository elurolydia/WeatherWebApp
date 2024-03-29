// 'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-app-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  'index.html',
  'assignment.js',
  'index.css',
  './images/icons/icon-144x144.png',
  './images/icons/icon-128x128.png',
  'good-weather-.jpg'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
//   if (evt.request.mode !== 'navigate') {
//   // Not a page navigation, bail.
//   return;
// }
// evt.respondWith(
//     fetch(evt.request)
//         .catch(() => {
//           return caches.open(CACHE_NAME)
//               .then((cache) => {
//                 return cache.match('offline.html');
//               });
//         })
// );
// });

if (evt.request.url.includes('/forecast/')) {
    console.log('[Service Worker] Fetch (data)', evt.request.url);
    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
          return fetch(evt.request)
              .then((response) => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                return response;
              }).catch((err) => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
        }));
    return;
  }
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              return response || fetch(evt.request);
            });
      })
  );
});


