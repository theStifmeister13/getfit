const CACHE_NAME = 'getfit-v8';
var urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/manifest.json',  
  '/pages/home.html',
  '/pages/nutrition.html',
  '/pages/training-plan.html',
  '/pages/foods.html',
  '/css/materialize.min.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/img/workout1.jpg',
  '/img/workout2.jpg',  
  '/img/icons/icon-192x192.png',
  '/img/icons/icon-256x256.png',
  '/img/icons/icon-512x512.png',
  '/img/icons/icon-32x32.png',
  '/img/icons/icon-48x48.png',
  '/img/icons/icon-64x64.png',
  '/img/icons/icon-144x144.png',
  '/img/workout3.jpg',
  '/img/diet1.jpg'  
  
];
 
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
})


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

