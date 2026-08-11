const CACHE_NAME = 'ps4-exploit-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './assets/psfree.js',
    './assets/webkit.js',
    './assets/goldhen.js',
    './assets/re.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
