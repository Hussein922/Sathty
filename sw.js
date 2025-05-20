const CACHE_NAME = "satha-cache-v1";
const urlsToCache = [
  "./",
  "index.html",
  "data.json",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

// تثبيت الكاش
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// تفعيل الكاش وتحديثه
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// جلب المحتوى من الكاش أو الشبكة
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
