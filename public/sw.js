const CACHE_NAME = "swagat-v2";
const APP_SHELL = [
  "/",
  "/menu",
  "/about",
  "/reservation",
  "/contact",
  "/cart",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/_next/") ||
    url.searchParams.has("_rsc") ||
    request.headers.has("RSC") ||
    request.headers.has("Next-Router-Prefetch") ||
    request.headers.has("Next-Router-State-Tree") ||
    request.headers.get("Accept")?.includes("text/x-component")
  ) {
    return;
  }

  const networkResponse = fetch(request);

  event.respondWith(
    networkResponse.then(
      async (response) => {
        if (response.ok && response.type === "basic") {
          try {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response.clone());
          } catch (error) {
            console.warn("Service worker cache update failed", error);
          }
        }
        return response;
      },
      async (error) => {
        const cached = await caches.match(request);
        if (cached) return cached;

        if (request.mode === "navigate") {
          const fallback = await caches.match("/");
          if (fallback) return fallback;
        }

        throw error;
      }
    )
  );
});
