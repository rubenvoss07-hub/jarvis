// Network-first service worker.
// Always tries the network so deployed changes show up immediately,
// falls back to cache only when offline.

const CACHE = 'jarvis-shell-v3';

self.addEventListener('install', (event) => {
  // Take over immediately — don't wait for old tabs to close.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept external APIs or fonts.
  if (url.hostname.includes('anthropic.com') ||
      url.hostname.includes('groq.com') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com')) {
    return;
  }

  // Network-first: try the network, cache the response, fall back to cache offline.
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.ok && event.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, clone));
        }
        return res;
      })
      .catch(() =>
        caches.match(event.request).then(
          (cached) => cached || caches.match('./index.html')
        )
      )
  );
});
