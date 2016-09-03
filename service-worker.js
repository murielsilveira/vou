self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('vou-static-v1').then(function(cache) {
      return cache.addAll([
        '/apis.html',
        '/main.js',
        '/worker.js',
        '/img/kirby.gif',
        'http://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/fonts/roboto/Roboto-Regular.woff2',
        'https://code.jquery.com/jquery-2.1.1.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js'
      ])//.then(() => self.skipWaiting())
    })
  )
})

// self.addEventListener('activate',  event => {
//   event.waitUntil(self.clients.claim())
// })

self.addEventListener('fetch', function(event) {
  console.log('fetch', event.request)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    })
  )
})
