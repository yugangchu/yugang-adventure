const CACHE_NAME='yugang-mobile-v3.23';
const ASSETS=['./index.html','./manifest.json','./icon-192.png','./icon-512.png','./star.png','./btn-play.png','./btn-diff.png','./title-bg.png','./boss_bg.png'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      // cache:'reload'로 브라우저 HTTP 캐시 우회 — 항상 최신 자산 받아오기
      return Promise.all(ASSETS.map(function(a){
        return fetch(new Request(a,{cache:'reload'})).then(function(resp){
          if(resp.ok)return cache.put(a,resp);
        });
      }));
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
        // 백그라운드 갱신은 cache:'no-cache'로 HTTP 캐시 우회 (서버에 Etag/Last-Modified 검증)
        var networkFetch=fetch(e.request,{cache:'no-cache'}).then(function(resp){
          if(resp&&resp.ok){cache.put(e.request,resp.clone());}
          return resp;
        }).catch(function(){return cached||cache.match('./index.html');});
        return cached||networkFetch;
      });
    })
  );
});
