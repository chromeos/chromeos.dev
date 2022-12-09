---
title: Managing Video Storage on the Web
metadesc: Video is a tough asset to manage; streaming takes a lot of bandwidth and caching is not straightforward. Learn how to improve both with the Cache storage API, service workers, and Workbox.
date: 2022-07-27
weight: -8
---

Video is a tough asset to manage; streaming takes a lot of bandwidth and caching is not straightforward. These issues are compounded when videos play on a loop, like in a [kiosk display](/{{locale.code}}/education/whats-kiosk-mode). If, for instance, a company has hundreds of devices playing 30 videos on repeat all day, every day, it could quickly overwhelm their network. By serving the videos from cache instead of streaming them, you incur the download cost only once, make subsequent plays faster, and make them available to play offline. To do this, you can take advantage of the [browser's storage capabilities](https://web.dev/storage-for-the-web/), of which the [Cache storage API](https://web.dev/cache-api-quick-guide/) and [IndexedDB](https://web.dev/cache-api-quick-guide/) are the most suitable to store video files. While both are good options, we’ll focus on the Cache storage API for its integration with the popular [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) library [Workbox](https://developer.chrome.com/docs/workbox/).

## Caching video from a service worker

Because downloading and caching large assets like videos can be a particularly time and processor intensive task, you should do it in the background off the main thread. [Service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) are particularly useful for offloading caching tasks. They act as a proxy between the page and the network, allowing it to intercept requests and apply additional logic to the network response, for example, a [caching strategy](https://developer.chrome.com/docs/workbox/caching-strategies-overview/).

There are many different caching strategies and each of them are designed to help in different use cases. For example, to serve a file from a cache if available, or fall back to the network if not, you can write the following code.

```js
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});
```

Managing this for different asset types or URLs that require different caching strategies can be a repetitive and error-prone process. [Workbox](https://developer.chrome.com/docs/workbox/) provides a set of tools, including [routing helpers](https://developer.chrome.com/docs/workbox/modules/workbox-routing/) and [caching strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/), that let you write service worker code in a more declarative and reusable way.

The previous strategy is called [cache first](https://web.dev/offline-cookbook/#cache-falling-back-to-network). To write the same thing using Workbox, you’d include the following:

<!-- prettier-ignore -->
```js
registerRoute(
  ({ request }) => request.destination === 'video',
  new CacheFirst()
);
```

Workbox provides similar recipes for [other caching strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/) and common service worker tasks, including integration with build tools like [Webpack](https://developer.chrome.com/docs/workbox/reference/workbox-webpack-plugin/#type-InjectManifest) and [Rollup](https://www.npmjs.com/package/rollup-plugin-workbox).

With Workbox set up, you then need to choose when you’re going to cache your videos. Here, there are two approaches: eagerly on page load, or lazily when the video is requested.

### Eager approach

[Precaching](https://developer.chrome.com/docs/workbox/modules/workbox-precaching/) is a technique in which files are saved to the cache during service worker [installation](https://web.dev/service-worker-lifecycle/#install), making them available as soon as the service work is. Workbox can automatically set up precaching for files it can access during your build process.

The following Workbox code can be used in your service worker to to precache files:

```js
import { addPlugins, precacheAndRoute } from 'workbox-precaching';
import { RangeRequestsPlugin } from 'workbox-range-requests';

addPlugins([new RangeRequestsPlugin()]);
precacheAndRoute(self.__WB_MANIFEST);
```

- `import`(s) - Load the bindings required from the corresponding [Workbox modules](https://developer.chrome.com/docs/workbox/modules/). Because service workers don't support ESModules universally yet, your Workbox-powered service worker will need to be passed through a bundler for it to work in production.
- `RangeRequestsPlugin` -` `Makes it possible for a request with a `Range` header to be fulfilled by a cached response. This is necessary because browsers typically use a `Range` header for media content.
- `addPlugins` - Allows you to add [Workbox plugins](https://developer.chrome.com/docs/workbox/using-plugins/) to every Workbox request.
- `precacheAndRoute` - Adds entries to the precache list and creates a route to handle the corresponding fetch requests.
- `__WB_MANIFEST` - A placeholder that the [Workbox CLI](https://developer.chrome.com/docs/workbox/modules/workbox-cli/) (or build tool plugins)replaces with the precache manifest.

Pass your service worker into either the Workbox CLI or your build tool of choice and configure how your precache should be generated; a `workbox-config.js` file, like the following,will tell the CLI how it should render your service worker:

```js
module.exports = {
  globDirectory: '.',
  globPatterns: ['**/*.{html,mp4}'],
  maximumFileSizeToCacheInBytes: 5000000,
  swSrc: 'sw.js',
  swDest: 'sw.js',
};
```

- `globDirectory` - The root folder to start searching for precache files from
- `globPatterns` - The file patterns ([“globs”](https://github.com/isaacs/node-glob#glob-primer)) that should be precached.
- `maximumFileSizeToCacheInBytes` - An upper limit for the size a file can be to be precached, in bytes.
- `swSrc` - The location of the file that will be used to generate your service worker.
- `swDest` - The destination for the generated service worker (it can be the same as the source file, but make sure `self.__WB_MANIFEST` is present for each run).

When the build process runs, a new version of the service worker is generated, and `self.__WB_MANIFEST` is replaced with a list of files, each with a hash to denote their revision:

```js
precacheAndRoute([
  {
    revision: '524ac4b453c83f76eb9caeec11854ca5',
    url: 'ny.mp4',
  },
]);
```

Every time the build process runs, this list is rewritten with the current set of matching files and their current revision hashes. This ensures that whenever a file is added, removed, or changed, the service worker will update the cache on its next install.

### Lazy approach

When you don’t have all of the videos available at build time, or only want to cache videos when they’re needed, you should employ a lazy approach. This approach requires the caching and serving to be separated; because only partial content is fetched from the network during video playback, caching files as they stream won’t work.

#### Caching the files

Caches can be created using [Cache.open()](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open), and then files can be added to the cache using [Cache.add()](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add) or [Cache.addAll()](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll). If your app receives a JSON list of videos to cache, they can be added to a video cache as follows:

```js
// Open video cache
const cache = await caches.open('video-cache');
// Fetch list of videos
const videos = await (await fetch('/video-list.json')).json();
// Add videos to cache
await cache.addAll(videos);
```

The advantage of this approach is that you can control the caching step independently of the [service worker lifecycle](https://web.dev/service-worker-lifecycle/), even from other [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). The downside is that the storage management part is up to the developer: you need to write your own algorithm to track file changes, track the currently cached files in the browser, and manage file updates to ensure that only changed files get updated.

!!! aside.message--note
**Note:** You should disallow playback until after the required video has been fully cached as your users may not have enough bandwidth to both download the video to cache and stream it to your user.
!!!

#### Serving cached video files

A service worker [runtime caching strategy](https://web.dev/runtime-caching-with-workbox/), like [cache first](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/#cache-first-cache-falling-back-to-network) can then be used to serve the video files previously cached:

```js
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { RangeRequestsPlugin } from 'workbox-range-requests';

registerRoute(
  ({ request }) => request.destination === 'video',
  new CacheFirst({
    cacheName: 'video-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new RangeRequestsPlugin(),
    ],
  }),
);
```

- `import`(s) - Loads the bindings required from the corresponding [workbox modules](https://developer.chrome.com/docs/workbox/modules/).
- `registerRoute` -Routes requests to functions (caching strategies and plugins) that provide responses.
- `CacheFirst` - Caching strategy that fulfills the request from the cache, if available, otherwise fetches it from the network and updates the cache.
- `CacheableResponsePlugin` - Used to indicate what headers need to be present for the response to be cacheable. Be sure to only include 200 statuses for routes caching video to avoid partial content responses (206) being cached as videos are streamed.
- `RangeRequestsPlugin` - Plugin that makes it possible for a request with a `Range` header to be fulfilled by a cached response. This is necessary because browsers typically use a `Range` header for media content.

---

Optimizing video loading is an important task for apps that do intensive streaming. By leveraging the browser’s Cache storage API and Workbox, you can make this otherwise hard task manageable, saving your users’ bandwidth, reducing server load, achieving faster video playback, and letting your videos run even when offline.
