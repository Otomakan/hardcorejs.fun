self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('autonomy').then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/js/bundle.js`,
        `/main.css`,
        `/assets/images/autonomy_logo.png`,
        `/assets/images/wind_turbine_back_no_man_nothing_cropped.jpg`,
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


addEventListener('fetch', function(event) {
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
