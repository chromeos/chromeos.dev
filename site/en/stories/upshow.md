---
title: "UPshow's path from Chrome Apps to Progressive Web Apps"
metadesc: 'How the UPshow team transitioned from Chrome Apps to Progressive Web Apps—and what they learned along the way.'
date: 2023-06-26
app:
  name: UPshow
  logo: ix://stories/upshow/icon.png
hero:
  image: ix://stories/upshow/header.png
  alt: Kiosk app in action showing a Pilates class and QR code.
  position: center
featured: false
tags:
  - pwa
  - web
---

UPshow creates interactive experiences on digital screens for brick-and-mortar businesses—encouraging customers and employees to engage with businesses using their mobile devices. To provide a full-screen, immersive, controlled experience, UPshow uses [Kiosk apps](/{{locale.code}}/kiosk). But with the [upcoming deprecation of Chrome Apps](https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html), they needed to migrate their existing kiosk solutions to Progressive Web Apps (PWAs).

To complete this migration, UPshow's team had to replicate some core functionality from their existing Chrome Apps, including uniquely identifying the device the apps run on and managing cached videos.

## Uniquely identifying a device

To provide the best in client experiences, UPshow needs to maintain a consistent set of logs and metrics—letting them debug and optimize their UX. To be truly effective, they need to be able to quickly pinpoint exact devices across a fleet. In the world of web privacy, this is known as [fingerprinting](https://web.dev/learn/privacy/fingerprinting/).

Fingerprinting may introduce privacy concerns—so there is no web API for it. But in the context of [Enterprise enrolled ChromeOS devices](https://chromeenterprise.google/), this technique can be used for legitimate purposes—such as providing better customer support. A Chrome extension installed through an admin policy can gain access to special [device attribute APIs](https://developer.chrome.com/docs/extensions/reference/enterprise_deviceAttributes/) that expose identifiers. UPshow pairs these [with a PWA](/{{locale.code}}/kiosk/connecting-an-extension-from-a-kiosk-pwa) to uniquely identify managed devices, achieving the fleet-wide logging and metrics they need.

To retrieve an enrolled device's ID, UPshow needed code for both their PWA and the extension. Retrieving the device ID starts by having the PWA send a [message](https://developer.chrome.com/docs/extensions/mv3/messaging/) to their Chrome extension, which responds with the device's ID—if one is available. This can then be used later, such as while logging.

```javascript {title="Javascript" .code-figure}
let deviceId; // Store the retrieved ID for later
const EXTENSION_ID = 'extension id'; // The specific ID of the extension to message
if (chrome) {
  chrome.runtime.sendMessage(EXTENSION_ID, { methodName: 'getDeviceId' }, function (arg) {
    if (arg?.deviceId) {
      deviceId = arg.deviceId;
    } else {
      console.error('getDeviceId', arg.error);
    }
  });
}
```

When the extension receives this message, it then calls the Enterprise [`getDirectoryDeviceId`](https://developer.chrome.com/docs/extensions/reference/enterprise_deviceAttributes/#method-getDirectoryDeviceId) API to get the device ID and send it back to the PWA.

```javascript {title="Javascript" .code-figure}
chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  if (request.methodName === 'getDeviceId') {
    if (chrome.enterprise && chrome.enterprise.deviceAttributes) {
      chrome.enterprise.deviceAttributes.getDirectoryDeviceId(function (id) {
        sendResponse({ deviceId: id });
      });
    } else {
      sendResponse({ error: 'No access to enterprise deviceAttributes' });
    }
  }
  return true;
});
```

With both the extension installed through admin policy and the PWA running in kiosk mode on an enrolled device, UPshow can identify which device across a customer's fleet their app is being run on—letting them tie logs and metrics to specific devices, aiding in optimization and maintenance.

## Managing cached videos

UPshow's application experience relies heavily on client uploaded videos. To improve application performance and reduce costs, they often need to cache very large video files on the device. This can prove challenging for two reasons:

- **Files can't be [precached](https://web.dev/precache-with-workbox/).** Because what files need to be cached aren't known in advance, they need to be cached on demand by intercepting requests as they're needed.
- **They need to handle [range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range).** Their caching strategy needed to handle range requests, as browsers typically use a Range header for media content—which could lead to [206 partial content responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206) instead of a full response.

To solve this issue, the UPshow team turned to the [Workbox](https://developer.chrome.com/docs/workbox/) service worker library. By leveraging Workbox's [runtime caching strategies](https://web.dev/runtime-caching-with-workbox/) and [plugins](https://developer.chrome.com/docs/workbox/using-plugins/), they were able to solve for both of these challenges.

### Caching video on demand

The UPshow team used a [Workbox runtime caching strategy](https://web.dev/runtime-caching-with-workbox/) to fulfill on-demand caching requests. The team selected the [`CacheFirst`](https://developer.chrome.com/docs/workbox/reference/workbox-strategies/#type-CacheFirst) strategy, ensuring that the first time a request is made, it goes to the network. That response is then cached and, from that point onward, it is served from the cache:

```javascript {title="Javascript" .code-figure}
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { RangeRequestsPlugin } from 'workbox-range-requests';
const videoCacheHandler = new CacheFirst({
  cacheName: 'cdn',
  plugins: [
    new CachePartialIfComplete(), // Custom plugin for range requests
    new CacheableResponsePlugin({
      statuses: [200],
    }),
    new RangeRequestsPlugin(),
  ],
});
```

This cache handler uses the [`CacheableResponsePlugin`](https://developer.chrome.com/docs/workbox/modules/workbox-cacheable-response/) to ensure that only successful requests (those with a status of 200) are cached. It also uses the [`RangeRequestsPlugin`](https://developer.chrome.com/docs/workbox/modules/workbox-range-request/) to allow the cache to return a specific range of a file from a fully cached response—necessary, for instance, if a user starts a video part of the way through. [Workbox Routing](https://developer.chrome.com/docs/workbox/modules/workbox-routing/) uses `videoCacheHandler` to cache video files (not shown).

The out-of-the-box plugins, though, aren't enough to handle partial responses. To do that, they needed to create a custom Workbox plugin, `CachePartialIfComplete`.

### Handling range requests

Large video files are usually served to users in small chunks, with the section sent identified with a `content-range` header and a 206 status code. This is meant to allow videos to start quickly and download more as you watch, but it can also lead to video buffering if your playback catches up with what's available.

To combat this, UPshow sends the whole file instead, but still sends it with the `content-range` header and status code for browsers that expect 206 responses for videos. To avoid caching only fragments of a file, Workbox doesn't support caching 206 responses—so to handle these requests, UPshow wrote a custom Workbox plugin to properly cache whole files sent with 206 statuses.

First, the plugin checks if the potential item has a 200 status. If it does, the item is returned, ready to cache. If the status is 206, a response from a range request, it waits to ensure it has the whole item and then returns it with an overridden 200 response code, making it cacheable:

```javascript {title="Javascript" .code-figure}
export class CachePartialIfComplete {
  async cacheWillUpdate({ response }) {
    // If the response status is 200, there is no need to modify it.
    if (response.status === 200) return response;
    // If the response status is 206, check that content-encoding is not set to make sure that the response is not compressed.
    if (response.status === 206 && !response.headers.get('content-encoding')) {
      const contentLength = parseInt(response.headers.get('content-length'));
      // Format with the syntax of the content-range header: <unit> <range-start>-<range-end>/<total-length>
      const contentLengthFormatted = `bytes 0-${contentLength - 1}/${contentLength}`;
      const contentRange = response.headers.get('content-range');
      // If content-length expressed as byte range is equal to content-range, then it is the full response
      if (contentLengthFormatted === contentRange) {
        // Convert response from 206 to 200 to make it cacheable.
        return new Response(response.body, { status: 200, headers: response.headers });
      }
    }
    return null;
  }
}
```

With this custom plugin in place, UPshow can cache any video that may be requested from their application and play it back without needing to hit their server again.

## Better reach at a lower cost

UPshow's path from Chrome Apps to PWAs has been quite smooth. Close parity between native applications and web applications means they were able to make the switch without losing any functionality. Thanks to the resources available, they were able to get up to speed with PWAs quickly, and many of their needs were already covered by existing libraries. Where they weren't, they were able to combine PWAs with Chrome Extensions to fill the gaps and take advantage of ChromeOS-specific capabilities.

Even better, the migration has had a significant impact on UPshow's business. UPshow reported that they were able to:

- **Reduce CDN data usage by 50x:** The team was able to realize significant cost reductions through their use of caching.
- **Reach 7% more customers:** Cost savings in bandwidth from video consumption opened a new market from clients that don't have dedicated hardware.

UPshow plans to continue adding more functionality to their PWAs—and hope to see these wins increase as they invest more in both PWAs and Kiosk mode on ChromeOS.
