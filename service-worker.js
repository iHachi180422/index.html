self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("calculakitty-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "manifest.json",
        "moka-chan-osiete-kureta.mp3",
        "icono_aplicacion.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
