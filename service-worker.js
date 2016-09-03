const cacheName = 'vou-static-v1'
const dataCacheName = 'vou-data-v1'

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
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
      ]).then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate',  event => {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', function(event) {
  console.log('fetch', event.request.url)
  if (event.request.url.indexOf('netflixroulette.net') !== -1) {
    event.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(event.request).then(function(response){
          cache.put(event.request.url, response.clone())
          return response
        }).catch(err => {
          console.log('getting from cache', event.request.url)
          return cache.match(event.request.url)
            .then(resp => resp)
            .catch(err => 'There is nothing on the cache')
        })
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request)
      })
    )
  }
})
