const CACHE_NAME = 'cache-v1'
self.addEventListener('install', e => { //下载
    console.log('install', e)
    // e.waitUntil(self.skipWaiting())
    e.waitUntil(caches.open(CACHE_NAME).then(cache => {
        cache.addAll([
            '/',
            './index.css'
        ])
    }))
    //传入一个Promise,Promise执行完成事件才算往完成,会推迟activate
})

self.addEventListener('activate', e => { //启用
    console.log('activate', e)
    // e.waitUntil(self.clients.claim())
    e.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if(cacheName !== CACHE_NAME){
                return caches.delete(cacheName)
            }
        }))
    }))
})

self.addEventListener('fetch', e => {
    console.log('fetch', e)
    e.respondWith(caches.open(CACHE_NAME).then(cache => {
        return cache.match(e.request).then(response => {
            if(response){
                return response
            }
            return fetch(e.request).then(response => {
                cache.put(e.request, response.clone())
                return response
            })
        })
    }))
})