const cacheName = "HardcoreJSCache"
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
				`/js/main.js`,
        `/js/history.js`,
        `/index.css`,
        `/manifest.json`,
      ])
          .then(() => self.skipWaiting())
          .catch((e) => {console.log('err installing');console.log(e)})
    }).catch((e)=>{
      console.log('there was a problem installing')
      console.log(e)
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

