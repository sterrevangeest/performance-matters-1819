var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = ["/"];

self.addEventListener("install", event => {
  console.log("installing service workerSSS", event);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      console.log(urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  console.log("activate service worker", event);
});

// self.addEventListener("fetch", event => {
//   console.log("fetch event", event.request.url);
//   if (
//     event.request.method === "GET" &&
//     event.request.headers.get("accept").indexOf("images/*") > -1
//   ) {
//     event.respondWith(fetch);
//   }
// });

///https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return (
        resp ||
        fetch(event.request).then(function(response) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
