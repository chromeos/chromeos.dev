/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* global importScripts, languages  */
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// import * as navigationPreload from 'workbox-navigation-preload';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import * as googleAnalytics from 'workbox-google-analytics';
import { warmStrategyCache } from 'workbox-recipes';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import { i18nHandler } from 'service-worker-i18n-redirect';
import { preferences } from 'service-worker-i18n-redirect/preferences';

importScripts('/js/_data/_languages_.js');

// Enable navigation preload.
// navigationPreload.enable();

/**
 * Base Strategies
 */
// Long-lived HTML gets cached w/a Stale While Revalidate strategy
const cacheHTMLStrategy = new StaleWhileRevalidate({
  cacheName: 'pages-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
    new BroadcastUpdatePlugin({
      headersToCheck: ['etag'],
    }),
  ],
});

// Short-lived HTML gets cached w/a Network First strategy
const liveHTMLStrategy = new NetworkFirst({
  cacheName: 'pages-cache',
  networkTimeoutSeconds: 2,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
  ],
});

// Assets now have hashes in their URLs so they get a Cache First strategy
const assetStrategy = new CacheFirst({
  cacheName: 'assets-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Year
    }),
  ],
});

// Search indexes should try and always be fresh
const indexesStrategy = new NetworkFirst({
  cacheName: 'indexes',
  networkTimeoutSeconds: 3,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
  ],
});

// Fonts get a long-lived cache, so Cache First
const fontStrategy = new CacheFirst({
  cacheName: 'fonts',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Year
    }),
  ],
});

// 3P images get long-lived cache and max entries
const imageStrategy = new CacheFirst({
  cacheName: 'image-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
    new ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 60 * 60 * 24 * 30, // 1 Year
    }),
  ],
});

/**
 * Manifest management and precaching
 */
// Manage and filter injected Workbox manifest
const manifest = self.__WB_MANIFEST;
const precache = manifest.filter(entry => entry.url.startsWith('offline/') || entry.url.startsWith('js/') || entry.url.startsWith('images/icons/') || entry.url.startsWith('_components')).map(entry => ({ revision: entry.revision, url: `/${entry.url}` }));
const html = manifest.filter(entry => entry.url.endsWith('.html') && !entry.url.startsWith('offline/') && !entry.url.startsWith('_components')).map(entry => `/${entry.url}`);
const assets = manifest.filter(entry => entry.url.startsWith('assets/')).map(entry => `/${entry.url}`);

// Precache offline
precacheAndRoute(precache);

// Warm HTML and asset caches
warmStrategyCache({ urls: html, strategy: liveHTMLStrategy });
warmStrategyCache({ urls: assets, strategy: assetStrategy });

/**
 * Routing
 */
// Google Analytics
googleAnalytics.initialize();

// Short links
//   Read live from a database, need to be network only
registerRoute(({ url }) => url.pathname.startsWith('/l/'), new NetworkOnly());

// Offline Indexes
registerRoute(({ request }) => request.url.includes('js/indexes'), indexesStrategy);

// Live HTML
registerRoute(({ request, url }) => {
  const nav = request.mode === 'navigate';
  if (!nav) return false;
  const isIndex = languages
    .map(lang => [`/${lang}/`, `/${lang}`])
    .flat()
    .includes(url.pathname);
  const isNews = languages
    .map(lang => [`/${lang}/news/`, `/${lang}/news`])
    .flat()
    .includes(url.pathname);

  return isIndex || isNews;
}, i18nHandler(languages, preferences, liveHTMLStrategy));

// Long-term HTML
registerRoute(({ request }) => request.mode === 'navigate', i18nHandler(languages, preferences, cacheHTMLStrategy));

// Cache assets
registerRoute(({ request }) => request.destination === 'script' || request.destination === 'worker' || request.destination === 'style', assetStrategy);

// Font cache
registerRoute(({ request }) => request.destination === 'font', fontStrategy);

// 3P Images cache
registerRoute(({ url }) => url.hostname === 'chromeos-dev.imgix.net' && url.protocol === 'https:', imageStrategy);

/**
 * Catch handler
 */
setCatchHandler(async ({ event }) => {
  const dest = event.request.destination;

  if (dest === 'document') {
    const lang = await preferences.get('lang');
    return matchPrecache(`/offline/${lang}/index.html`);
  }

  return Response.error();
});

// addEventListener('message', event => {
//   if (event.data && event.data === 'SKIP_WAITING') {
//     self.skipWaiting();
//   }
// });
