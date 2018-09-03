self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('circuits').then(function (cache) {
            return cache.addAll([
                './',
                './index.html',
                './logo.png',
                './index.js',
                './style.css',
                './style.css.map',
            ])
        })
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
        })
    )
})
