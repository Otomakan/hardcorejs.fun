self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('autonomy').then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
				`/js/main.js`,
        `/js/history.js`,
				
        `/index.css`,
        `/manifest.json`,
        `/offline.html`
      ])
          .then(() => self.skipWaiting())
          .catch((e) => {console.log('err installing');console.log(e)})
    }).catch((e)=>{
      console.log('there was a problem istalling')
      console.log(e)
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open('autonomy')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
                .catch((e)=>{throw e})
            })
            .catch(function(err) {       // fallback mechanism
              console.log(err)
              return caches.open('error_cache')
                .then(function(cache) {
                  return cache.match('/offline.html');
                }).catch((e)=>{console.log('couldnt open errir cache'), onsole.log(e)});
            });
        }
      })
      .catch((e)=>{console.log(e)})
  );
}); 


self.addEventListener('load', () => {
  const code = document.querySelector('#code');
  const worker = new Worker('worker.js');
  worker.onmessage = (event) => { code.innerHTML = event.data; }
  worker.postMessage(code.textContent);
});