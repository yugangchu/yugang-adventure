const CACHE_NAME='yugang-mobile-v2.5';
const ASSETS=['./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ASSETS);
    }).then(function(){return self.skipWaiting();})
  );
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE_NAME;}).map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
  );
});

// stale-while-revalidate: 캐시 즉시 반환 + 백그라운드에서 네트워크 갱신
// → 현재 실행은 구 버전으로, 다음 앱 실행부터 새 버전 적용
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'){return;}
  e.respondWith(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.match(e.request).then(function(cached){
        var networkFetch=fetch(e.request).then(function(resp){
          if(resp&&resp.ok){cache.put(e.request,resp.clone());}
          return resp;
        }).catch(function(){return cached||cache.match('./index.html');});
        return cached||networkFetch;
      });
    })
  );
});
