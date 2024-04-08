import {
  CacheFirst,
  NetworkFirst,
  NetworkOnly,
  StaleWhileRevalidate,
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { warmStrategyCache, googleFontsCache } from 'workbox-recipes';
import { cacheNames } from 'workbox-core';
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  getCacheKeyForURL,
} from 'workbox-precaching';
import {
  registerRoute,
  setCatchHandler,
  setDefaultHandler,
} from 'workbox-routing';

setDefaultHandler(new NetworkOnly());

// HTML gets cached w/a Network First strategy
const liveHTMLStrategy = new NetworkFirst({
  cacheName: 'page-cache',
  networkTimeoutSeconds: 2,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

// Assets now have hashes in their URLs so they get a Cache First strategy
const assetStrategy = new CacheFirst({
  cacheName: 'assets-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Year
    }),
  ],
});

const searchStrategy = new StaleWhileRevalidate({
  cacheName: 'search-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

// 3P images get long-lived cache and max entries
const imageStrategy = new CacheFirst({
  cacheName: 'image-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 60 * 60 * 24 * 30, // 1 Year
    }),
  ],
});

// Manage and filter injected Workbox manifest
const manifest = self.__WB_MANIFEST;
const precache = manifest
  .filter(
    (entry) => entry.url.startsWith('images/icons/') || entry.url === 'offline',
  )
  .map((entry) => ({ revision: entry.revision, url: `/${entry.url}` }));

const html = ['/', '/en'];

const assets = manifest
  .filter((e) => e.url.endsWith('.css') || e.url.endsWith('.js'))
  .map((e) => `/${e.url}`);

const search = manifest
  .filter((entry) => entry.url.startsWith('pagefind/'))
  .map((entry) => `/${entry.url}`);

// Precache offline
cleanupOutdatedCaches();
precacheAndRoute(precache);

// Warm HTML and asset caches
warmStrategyCache({ urls: html, strategy: liveHTMLStrategy });
warmStrategyCache({ urls: assets, strategy: assetStrategy });
warmStrategyCache({ urls: search, strategy: searchStrategy });

// Short links
//   Read live from a database, need to be network only
registerRoute(({ url }) => url.pathname.startsWith('/l/'), new NetworkOnly());

// Long-term HTML
registerRoute(({ request }) => request.mode === 'navigate', liveHTMLStrategy);

// Cache assets
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'worker' ||
    request.destination === 'style',
  assetStrategy,
);

// Font cache
googleFontsCache();

// Image CDN
registerRoute(
  ({ url }) =>
    (url.hostname === 'chromeos-dev.imgix.net' ||
      url.hostname === 'chromeos.imgix.net') &&
    url.protocol === 'https:',
  imageStrategy,
);

const offlineHandler = async (options) => {
  const dest = options.request.destination;

  if (dest === 'document') {
    const cache = await caches.open(cacheNames.precache);
    return cache.match(getCacheKeyForURL(`/offline`));
  }

  return Response.error();
};

setCatchHandler(offlineHandler);
