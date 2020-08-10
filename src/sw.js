/**
 * Copyright 2019 Google LLC
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
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import * as googleAnalytics from 'workbox-google-analytics';
import { i18nHandler } from 'service-worker-i18n-redirect';
import { preferences } from 'service-worker-i18n-redirect/preferences';
import { serviceWorkerIncludePlugin } from 'service-worker-includes';

importScripts('/js/languages.js');

precacheAndRoute(self.__WB_MANIFEST);

googleAnalytics.initialize();

// Handle navigation requests with htmlHandler.
const htmlCachingStrategy = new StaleWhileRevalidate({
  cacheName: 'pages-cache',
  plugins: [
    serviceWorkerIncludePlugin,
    new CacheableResponsePlugin({
      statuses: [200],
    }),
    new BroadcastUpdatePlugin(),
  ],
});

// Offline Indexes
registerRoute(
  ({ request }) => request.url.includes('js/indexes'),
  new NetworkFirst({
    cacheName: 'indexes',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

registerRoute(({ request }) => request.mode === 'navigate', i18nHandler(languages, preferences, htmlCachingStrategy));

// Cache stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({ request }) => request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'stylesheets',
  }),
);

// Cache stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'scripts',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Year
      }),
    ],
  }),
);

// Cache font files with a cache-first strategy for 1 year.
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Year
      }),
    ],
  }),
);

// Cache images with a cache-first strategy for 30 days
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  }),
);

setCatchHandler(async ({ event }) => {
  const dest = event.request.destination;

  if (dest === 'document') {
    const lang = await preferences.get('lang');
    return matchPrecache(`/${lang}/404/index.html`);
  }

  return Response.error();
});

addEventListener('message', event => {
  if (event.data && event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
