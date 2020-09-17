const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    '/index.html',
    '/css/main.css',
    '/js/vendor/modernizr-3.11.2.min.js',
    '/js/main.js',
    '/js/plugins.js',
    '/img/unsplash-image.jpg',
    '/icon.png'
]

self.addEventListener('install', event => {
    console.log('SERVICE WORKER INSTALL EVENT');

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    )
})

self.addEventListener('activate', event => {
    console.log('SERVICE WORKER ACTIVATED EVENT');
})

// CACHE

self.addEventListener('fetch', event => {
    console.log('SERVICE WORKER FETCH EVENT');

    event.respondWith(caches.match(event.request).then(cached => {
        return cached || fetch(event.request);
    }));
})

// PUSH

self.addEventListener('push', event => {
    const title = 'Push Title';
    const body = 'Push Body';
    const icon = 'icon.png';
    const tag = 'push-example-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag,
        })
    )
})
