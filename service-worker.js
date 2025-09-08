// Nombre del cache (cambia la versión si actualizas la app)
const CACHE_NAME = 'calculakitty-cache-v1';

// Archivos que queremos cachear
const urlsToCache = [
  '/index.html',
  '/manifest.json',
  '/logo_aplicacion.png',
  '/moka-chan-osiete-kureta.mp3'
];

// Instalación del service worker y cache de archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // activa inmediatamente
});

// Activación del service worker y limpieza de cachés viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // toma control de las pestañas abiertas
});

// Intercepta las solicitudes para servir los recursos cacheados
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
