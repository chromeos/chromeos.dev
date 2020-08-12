---
title: Desktop Progressive Web Apps
metadesc: How to take your current web site and enhance it to make it installable, work great with touch and stylus, and make it even more capable.
date: 2020-05-29
weight: -7
resources:
  - title: What are Progressive Web Apps?
    url: https://web.dev/what-are-pwas
  - title: PWA checklist
    url: https://web.dev/pwa-checklist
  - title: PWABuilder
    url: https://www.pwabuilder.com
  - title: New capabilities tracker
    url: https://goo.gle/fugu-api-tracker
---

<!-- prettier-ignore -->
*[PWAs]: Progressive Web Apps
*[PWA]: Progressive Web App
*[OTs]: Origin Trials
*[OT]: Origin Trial

Desktop [Progressive Web Apps](https://web.dev/what-are-pwas/) (PWAs) are a great cross-platform, cross-browser way to build apps with a security model that centers user safety and privacy and get built-in sharing with the web’s inherent linkability. Build new or enhance your existing web app with modern APIs to give them native-like capabilities, reliability, and installability. PWAs are the best way to deliver your web app for Chrome OS.

On Chrome OS, the power of the web platform is front and center; web apps are first-class citizens. Installed PWAs show up in the Chrome OS launcher, can be pinned to the shelf, and integrate deeply with the rest of the OS.

Get started by reviewing the [PWA Checklist](https://web.dev/pwa-checklist/) and making sure your web app passes the core PWA checklist. You can use [PWABuilder](https://www.pwabuilder.com/) to help you provide a custom offline page and make your app installable. Then, use these recommendations to make your PWA shine on Chrome OS.

## Make it installable

One of the great advantages of PWAs over regular web apps is the ability for them to be installed, just like native apps. The Progressive Web App path on web.dev has a section dedicated to [making your PWA installable](https://web.dev/progressive-web-apps/#installable); use that to get started. In order for a PWA to be identified as installable on Chrome OS, the following criteria must be met, which can be checked using [Lighthouse’s installable audit](https://web.dev/lighthouse-pwa/#installable):

- It must have a valid [web app manifest](https://web.dev/add-manifest/)
- It must meet Chrome’s [install criteria](https://web.dev/install-criteria/)
  - For PWAs on Chrome OS, an install prompt will show in the omnibar _without_ a user engagement heuristic threshold being met.

Icons are an important part of your PWA’s identity, so make sure they are interesting and unique; they can even include transparency! As PWAs have one codebase that’s shared across all platforms, you should ensure you have a [maskable icon](https://web.dev/maskable-icon/) available. Ensure you also include normal icons, too, for operating systems that don’t support maskable icons.

With your PWA installable, it’ll now show up across Chrome OS, from the launcher to the shelf. Having your PWA installed also opens up some additional [capabilities](#make-it-capable) to make your app really shine.

### A note on working offline

There are plenty of discoverability, usability, and capability advantages simply by making your app installable. Making your PWA installable does _not_ mean your whole experience must work offline. In order for an installed app to feel native, though, it should have some form of offline functionality. A basic custom offline page is enough to get started; users expect that installed apps don’t crash when connection status changes. Just as a native app never shows a blank page when it is offline, PWAs should never show the browser default offline page. Custom offline pages can range from a message letting the user know they need a connection to a game to let them pass the time until they’re connected again. Providing this custom offline experience for uncached pages or features that require a connection helps to bridge the native-web user experience app gap.

You can create a simple offline page during a service worker’s `install` event by precaching the desired page for later use and responding with it if a user is offline. You can follow our [custom offline page sample](https://googlechrome.github.io/samples/service-worker/custom-offline-page/) to see an example of this in action and learn how to implement it yourself.

If you want to provide a more robust experience, in addition to the [Cache Storage API](https://web.dev/service-workers-cache-storage/), you can use features like [IndexedDB](https://developers.google.com/web/ilt/pwa/working-with-indexeddb) for in-browser NoSQL storage and [background sync](https://developers.google.com/web/updates/2015/12/background-sync) to allow users to take actions while offline and defer server communication until the user has a stable connection again. You can also implement patterns like [safe, long-lived sessions](https://developers.google.com/web/updates/2016/06/2-cookie-handoff) to keep users authenticated and [skeleton screens](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a) to quickly let users know you’re loading content that can fall back to cached content or an offline indicator if needed.

## Make it touchable

Almost all Chrome OS devices support touch and many support styluses, too, so you need to ensure that your app works seamlessly with both inputs in addition to the normal keyboard and mouse. The [pointer events API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) is designed specifically to handle this! Some fundamental pointer-related events you likely won’t have to change, like `click` events. Other events, like `mouseup` or `touchstart`, should be migrated over to their pointer events counterparts to make them seamlessly work across any kind of pointer. You can even manage [different input types](https://developers.google.com/web/updates/2016/10/pointer-events#different_input_types) separately if you’d like. For apps and games that rely heavily on tactile user input, moving to the pointer events API will make a world of difference on Chrome OS devices.

### Smooth drawing on the web

If you’re building an app that has users drawing with their fingers or styluses, keeping latency between their input and your output fast enough to feel fluid has historically been difficult. When building these kinds of [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) powered apps for Chrome OS, we recommend using the `desynchronized` hint for `canvas.getContext()` to provide [low-latency rendering](https://developers.google.com/web/updates/2019/05/desynchronized). To use the `desynchronized` hint for a canvas, do the following:

```js
const canvas = document.createElement(‘canvas’); // or select one from the DOM
const ctx = canvas.getContext(‘2d’, {
  desynchronized: true,
  // Other options here…
});

if (ctx.getContextAttributes().desynchronized) {
  // Low-latency supported! Do something awesome with it.
} else {
  // Low-latency not supported! Fall back to less awesome stuff
}
```

### Design considerations for touch

It is important to take touch and stylus support into consideration when designing your web apps. Interactions that you may take for granted, like hover, don’t work well, if at all, for other input methods. Here are some best practices to keep in mind when designing touch and stylus friendly interfaces:

- Don’t make input assumptions based on screen size. Instead, use [feature detection](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection), ideally at input time, to determine how to respond. Remember, on Chrome OS, users can and do seamlessly swap between mouse, touch, and stylus all within one session.
- Ensure that elements you expect a user to touch have a [minimum target size](https://material.io/design/usability/accessibility.html#layout-and-typography) large enough so surrounding elements aren’t accidentally hit instead.
- Treat hover as [progressive enhancement](https://alistapart.com/article/understandingprogressiveenhancement/) and ensure the interaction can be accomplished through other means for touch and stylus (a long press or a tap, for example).
- Touch users expect to be able to directly interact with on-screen elements, for instance pinch-to-zoom on maps instead of using zoom in/out buttons. Adding [common touch gestures](https://www.lukew.com/ff/entry.asp?1071), where appropriate, can go a long way to making your app feel natural.

## Make it capable

While some PWA capabilities are commonly known, like the [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) that lets a web app receive and publish native notifications, there are a number of new and upcoming features that are coming to the web to superpower your apps. The Chromium [Web Capabilities project](https://www.chromium.org/teams/web-capabilities-fugu), also known as Project Fugu 🐡, is an effort to enable new, powerful web standards preserving what makes the web unique: it’s user-centric security, low-friction, and cross-platform compatibility.

!!! aside.message--note
**Note:** These capabilities are in various states of completeness, ranging from under consideration to shipped, and they may only be targeted for desktop or mobile devices, not both. While Chrome OS users are likely to get desktop targeted features as they become available, cross-platform support, even stable support in Chrome OS, can sometimes be a multi-year process.
!!!

### Bridging the native app gap

@[youtube](https://www.youtube.com/watch?v=JKVZMqpiY7w)

Most of these capabilities are built around bridging the gap between native apps and web apps, with the first major capabilities to ship allowing web apps to access native [contact pickers](https://web.dev/contact-picker/) and [share capabilities](https://web.dev/web-share/), and installed PWAs to register as a [native share target](https://web.dev/web-share-target/) and [show icon badges](https://web.dev/badging-api/), [to name a few](https://goo.gle/fugu-api-tracker).

Each capability goes through an [extensive standardization process](https://developers.google.com/web/updates/capabilities) to solicit community feedback to help shape the API and ensure the final design is secure, private, and trustworthy. New capabilities are tracked in an [open tracker](https://goo.gle/fugu-api-tracker) and can divided into one of five categories:

Shipped
: Available for use in the latest stable version of Chrome. Can be reliably used provided its use is properly feature detected.

In Origin Trial
: Available as a Chrome [origin trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md) (OT), allowing experimental features and APIs to be validated by the Chrome team in real-world usage and allowing you to provide feedback on API usability and effectiveness. OTs are opt-in and allow you to beta test this functionality with your users without requiring them toggle any special flags in their browser. APIs may change after an OT, and OTs are guaranteed to not be available for a period of time before launch, so they shouldn’t be treated as an early launch mechanism for new APIs.

In Developer Trials
: Available behind a flag in Chrome. These APIs are experimental and still under active development. They are _not_ ready for production use, with a good chance that there are bugs and that the APIs will change. It is highly recommended _not_ to encourage users to change flags to enable features. Developers can use this time to experiment with experimental features on their own.

Started
: Development has started, but no usable API currently exists.

Under Consideration
: APIs that users have expressed interest in, but implementation hasn’t started yet. If an API hasn’t been started yet, please star it or add your use cases to its issue to help the Chromium team prioritize it.

### What to expect

With so many new capabilities coming up, it is hard to narrow down a list of what’s going to have the most impact to building web apps on Chrome OS. These are a few key APIs that will expand what kinds of apps can be built on the web and, in turn, for Chrome OS.

#### Origin Trial

Native File System API
: The [Native File System API](https://web.dev/native-file-system/) ([spec](https://wicg.github.io/native-file-system/)) web apps that interact with files on the user’s local device, like photo, video, and text editors. After a user grants access, this API allows web apps to read or save changes directly to files and folders on the user’s device.

#### Developer Trial

Screen Enumeration and Window Placement
: The [Screen Enumeration API](https://github.com/webscreens/screen-enumeration/blob/master/EXPLAINER.md) and the [Window Placement API](https://github.com/webscreens/window-placement/blob/master/EXPLAINER.md) are two complimentary APIs that, when used together, allow web apps to understand what displays are available and open and position windows programmatically across those screens. With these APIs, web apps like presentations with speaker notes, multi-window dashboards, or canvases with toolbars.

File Handling
: The [File Handling API](https://github.com/WICG/file-handling/blob/master/explainer.md) allows installed PWAs to register their ability to handle (read, stream, edit) files with given MIME types and/or file extensions. This API allows installed PWAs to show up in native file systems’ “open with…” dialogs when opening a file, and allow users to set the PWA as the default application for supported file types.

Tabbed Application Mode
: [Tabbed application mode](https://github.com/w3c/manifest/issues/737) allows developers to specify that their PWA should divide its window into tabs, similar to a tabbed web browser, except that all of the tabs belong to the app (and don’t have a URL bar).
