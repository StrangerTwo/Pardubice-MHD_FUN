self.addEventListener('install', evt => {
    console.log("installing file");
    evt.waitUntil(
        caches.open('static-v1')
            .then(cache => cache.addAll([
                '../index.html',
                '../css/style.css',
                '../js/pardubice.js',
                '../js/model.js',
                '../js/app.js'
            ]))
    );
});  


self.addEventListener('activate', evt => {
    console.log("service worker byl aktivovan");
});


self.addEventListener('fetch', evt => {
    console.log("fetching file", evt);
    evt.respondWith(
        caches.match(evt.request)
            .then(response => response || fetch(evt.request))
            .catch(() => {
                if(evt.request.mode == 'navigate'){
                    return caches.match('./index.html');
                }
            })
    )
});
