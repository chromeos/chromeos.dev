---
title: Powerful PWAs
metadesc: New and upcoming features coming to the web to superpower your apps, plus a checklist to help you track adding them to your app.
date: 2020-11-23
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

While some PWA capabilities are commonly known, like the [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) that lets a web app receive and publish platform notifications, there are a number of new and upcoming features that are coming to the web to superpower your apps. The Chromium [Web Capabilities project](https://www.chromium.org/teams/web-capabilities-fugu), also known as Project Fugu 🐡, is an effort to enable new, powerful web standards while preserving what makes the web unique: it’s user-centric security, low-friction, and cross-platform compatibility.

!!! aside.message--note

**Note:** These capabilities are in various states of completeness, ranging from under consideration to shipped. This document focuses on features that work on desktops. While Chrome OS users are likely to get desktop targeted features as they become available, cross-platform support, even stable support in Chrome OS, can sometimes be a multi-year process. Check the [capabilities tracker](https://goo.gle/fugu-api-tracker) for more precise information on capability releases.

!!!

## Bridging the app gap

@[youtube](https://www.youtube.com/watch?v=JKVZMqpiY7w)

Most of these capabilities are built around bridging the gap between traditional desktop or mobile apps and web apps, with the first major capabilities to ship allowing web apps to access the platform's [contact pickers](https://web.dev/contact-picker/) and [share capabilities](https://web.dev/web-share/), and installed PWAs to register as a [platform share target](https://web.dev/web-share-target/) and [show icon badges](https://web.dev/badging-api/), [to name a few](https://goo.gle/fugu-api-tracker).

Each capability goes through an [extensive standardization process](https://developers.google.com/web/updates/capabilities) to solicit community feedback to help shape the API and ensure the final design is secure, private, and trustworthy. New capabilities are tracked in an [open tracker](https://goo.gle/fugu-api-tracker) and can be divided into one of five categories:

Shipped
: Available for use in the latest stable version of Chrome. Can be reliably used provided its use is properly feature detected.

In Origin Trial
: Available as a Chrome [origin trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md) (OT), allowing experimental features and APIs to be validated by the Chrome team in real-world usage and allowing you to provide feedback on API usability and effectiveness. OTs are opt-in and allow you to beta test this functionality with your users without requiring them toggle any special flags in their browser. APIs may change after an OT, and OTs are guaranteed to not be available for a period of time before launch, so they shouldn’t be treated as an early launch mechanism for new APIs.

In Developer Trial
: Available behind a flag in Chrome. These APIs are experimental and still under active development. They are _not_ ready for production use, with a good chance that there are bugs and that the APIs will change. While developers can use this time to try out experimental features on their own, they _should not_ instruct their users to enable flags to use their features.

Started
: Development has started, but no usable API currently exists.

Under Consideration
: APIs that users have expressed interest in, but implementation hasn’t started yet. If an API hasn’t been started yet, please star it or add your use cases to its issue to help the Chromium team prioritize it.

## Enhancing your PWA

When building out your PWA, consider implementing the following APIs and best practices to greatly improve the feel of your web app. Broken down by general use-case, your app may benefit from one or more APIs to improve your overall user experience. APIs marked with a 🔮 are in origin trial, those marked with 🚩 are in developer trial, those marked with 📱 are currently stable on mobile and their desktop implementations have started, with any other API mentioned being stable (although possibly not available on all platforms). Only APIs that are available in the current stable, beta (marked with **β**), or canary (marked with **α**) versions of Chrome are included; expect this list to be updated regularly to reflect APIs being released.

### App installation

If you want your web app to be available along-side other installed apps, like in the taskbar, launcher, desktop, and app switcher, consider implementing the [following APIs](https://web.dev/progressive-web-apps/#installable) so your PWA is [installable](https://web.dev/install-criteria/). Optionally following [this codelab](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0).

- **[Web App Manifest](https://web.dev/add-manifest/)**{.api data-categories="creative, media"} - Provide information about your web app to the browser and operating system, for instance name, logo, what URL to start the app at, and how to display your web app.
- **[Service Workers and Cache Storage API](https://web.dev/service-workers-cache-storage/)**{.api data-categories="creative, media"} - Allow your web app to create a proxy server and control how browser cache is handled. A service worker that reacts to a browser’s _fetch_ event and can respond to a fetch request for the start URL specified in the web app manifest with content when offline is a requirement for being installable.
- **[Run on Login](https://chromestatus.com/feature/5534549008187392) 🚩β**{.api} - Allows you to configure your PWA to launch automatically when the user logs in.
- **[App Icon Shortcuts](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Shortcuts/explainer.md)**{.api} - Provide shortcuts to specific URLs with your web app (for instance, start a chat, upload a photo, etc…) from your installed app icon’s context menu (i.e. long-hold on mobile devices, right-click on desktops), on supported platforms.
- **[getInstalledRelatedApps](https://developers.google.com/web/updates/2018/12/get-installed-related-apps)**{.api} - Allows your web app to check if your PWA, Android app, or Windows (UWP) app has already been installed.

### Adaptive & accessible

If you want your web app to be usable by users with different devices and different physical and/or mental needs, you should consider implementing the following:

- **[Responsive Design](https://web.dev/responsive-web-design-basics/)**{.api data-categories="creative, media"} - Ensure your web app provides a usable, or at least not broken, experience for small through large screen sizes to allow for users of different devices and window placements to use your app.
- **[WCAG 2.0 Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)**{.api data-categories="creative, media"} - Ensure your web app is usable by people with a spectrum of physical and mental abilities, not just neurotypical and able-bodied individuals. See also the UK Government’s _[Do’s and don’ts on designing for accessibility](https://accessibility.blog.gov.uk/2016/09/02/dos-and-donts-on-designing-for-accessibility/)_.

### Monetization & distribution

- **[Web Payments](https://developers.google.com/web/fundamentals/payments)**{.api data-categories="creative, media"} - Flexible, standard interface for online payments intended to work on any browser or device and with any payment or payment service provider.
- **[Digital Goods API](https://github.com/WICG/digital-goods/blob/master/explainer.md) 🔮**{.api data-categories="creative, media"} - Flexible, standard interface for querying and managing in-app purchases from web applications, including support for common purchase types like one-time purchases, repeatable purchases (like in-game gems/currency), and subscriptions. Works in conjunction with Web Payments.
- **[Trusted Web Activity](https://web.dev/using-a-pwa-in-your-android-app/)**{.api data-categories="creative, media"} - Create an Android app for your PWA so it can be listed for download in compatible stores, for instance Google Play.

### Clipboard access

- **[Async Clipboard](https://web.dev/async-clipboard/)**{.api data-categories="creative"} - Read and write text and images to the user’s clipboard, and listen for copy and paste events from the user.

### Notifications

If your web app needs to notify users, for instance a chat app or background encoding being worked on, you may want to consider implementing the following APIs:

- **[Web Push Notifications](https://developers.google.com/web/fundamentals/push-notifications)**{.api data-categories="media"} - Once a user has opted-in, allows your web app to push notifications to them.
- **[Badging API](https://web.dev/badging-api/)**{.api data-categories="media"} - Allows your installed web app to set an application-wide badge on the app icon, optionally with a number.
- **[Notification Triggers](https://github.com/beverloo/notification-triggers) 🔮**{.api} - Send notifications to users when a triggering condition has been met, for instance time-based or location based (think calendar event notifications)

### Intent sharing & protocol handling

- **[URL protocol registration](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/master/URLProtocolHandler/explainer.md) 🚩α**{.api} - Enable web applications to register themselves as handlers of custom URL protocols/schemes using their installation manifest.
- **[Web Share](https://web.dev/web-share/)**{.api data-categories="creative"} - Use the built-in system sharing UI on supported devices to share URLs, text, and files to other installed apps on their device. Your app does not need to be installed.
- **[Web Share Target](https://web.dev/web-share-target/)**{.api data-categories="creative"} - Have your installed PWA available in built-in system sharing UI on supported devices to allow users to share text and files to your app from other apps.

### Opening & saving files

- **[File Handling API](https://github.com/WICG/file-handling/blob/master/explainer.md) 🚩**{.api data-categories="creative"} - Have your installed web app register with the operating system their ability to handle (read/stream/edit) files with given MIME types and/or file extensions, allowing for, for instance, them to be an option in a context menu’s “Open With Application…” list.
- **[File System Access API](https://web.dev/file-system-access/)**{.api data-categories="creative"} - Robust access to the user’s file system per session, allowing for the following interactions (as needed by your app)
  - **Read files from the local file system** - Shows a file picker and allow a user to pick one or, optionally, multiple files to open, including limiting allowed file types by MIME type and extension.
  - **Save changes to open file** - Save changes to a file opened with FSA directly, without prompting the user to choose where to save the file or have them download a copy.
  - **Create a new file on the local file system** - Allow a user to create a new file, optionally with default file extension, on their local file system, that your app then has access to save to.
  - **Recently opened files** - File handlers created with FSA can be stored in IndexedDB allowing you to show a list of recently used files between user sessions (although editing permissions still don’t persist between sessions)
  - **Read, write, and manipulate a directory** - Allow a user to choose a directory on their local file system that your app then can read the contents of, create, read, and delete files and subdirectories in, and determine relative file path within.
- **[Compression Streams](https://github.com/WICG/compression/blob/master/explainer.md#compression-streams-explained)**{.api} - Compress or decompress using the _gzip_ and _deflate_ compression algorithms.

### Window Management

- **[Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide)**{.api data-categories="media"} - Allow a user to make an element in your web app, for instance a video, take up the whole screen
- **[Cross-Screen Window Placement API](https://web.dev/multi-screen-window-placement/) 🔮**{.api data-categories="creative"} - Allows your web app to get information about connected displays and position windows relative to those displays allowing for multi-window, multi-display web apps.
- **[Tabbed Application Display Mode](https://github.com/w3c/manifest/issues/737) 🚩**{.api data-categories="creative"} - Allow your installed web app to be displayed in one or more tabs, not just in a single window.

### Deeper OS integration

- **[Local Fonts API](https://web.dev/local-fonts/) 🔮**{.api data-categories="creative"} - Allows your web app to list locally installed fonts and request low-level (byte-oriented) SFNT container access that includes the full font data, allowing your app to custom-render locally installed fonts.
- **[Wake Lock](https://web.dev/wake-lock/)**{.api data-categories="creative"} - Allows your web app to prevent a screen from going to sleep, allowing your web app to perform long-running tasks without fear of interruption (i.e. file transcoding, or keeping a recipe up while cooking)
- **[Idle Detection](http://web.dev/idle-detection) 🔮**{.api} - Allows your web app to detect when the user isn’t actively using their device.

### Expanded offline support

If you want your web app to work even better offline, you may want to consider implementing the following APIs:

- **[Background Sync](https://developers.google.com/web/updates/2015/12/background-sync)**{.api data-categories="media"} - When offline, queue requests that need a connection then sync your web app’s data in the background, when the network is available, instead of not processing requests offline at all. For instance, allowing messages to be sent or incremental changes to a document synced when back online.
- **[Periodic Background Sync](https://web.dev/periodic-background-sync/)**{.api data-categories="media"} - Allow your installed and frequently used web app to have its service worker periodically woken up, based on a minimum amount of time passing, and run, for instance to update a cache, allowing content to be up-to-date for when a user opens the app.
- **[Content Indexing API](https://web.dev/content-indexing-api/)**{.api data-categories="media"} - Allow your web app to tell the browser what content is available offline to allow the browser to surface it to users.
- **[Background Fetch](https://developers.google.com/web/updates/2018/12/background-fetch)**{.api data-categories="media"} - Allow for long-running background fetches, such as downloading movies or uploading videos and images, without risking the service worker being killed.

### Media streaming, encoding, & decoding

If your web app plays back media files, like video or audio files, you may want to consider implementing the following APIs:

- **[Adaptive Streaming](https://web.dev/prepare-media/)**{.api data-categories="media"} - Allow video streams to switch between bit rates based on network performance
- **[Picture-in-Picture](https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture)**{.api data-categories="media"} - Allow a user to pop video out of your web app into an always-on-top window, which then can be moved and resized independently
- **[Media Session API](https://web.dev/media-session/)**{.api data-categories="media"} - Allow a user to control media playback for your web app using hardware and OS-level software functionality (like play/pause/stop buttons in keyboards or on lock screens), as well as control OS-level media notifications (like title, artist, album, and artwork)
- **[Chromecast API](https://developers.google.com/cast/docs/chrome_sender)**{.api data-categories="media"} - Allow a user to cast media to an available Chromecast receiver, for instance to play a video from your web app on their TV.
- **[Web Codecs](https://github.com/WICG/web-codecs/blob/master/explainer.md) 🔮**{.api data-categories="creative, media"} - Access to built-in hardware and software media encoders and decoders, useful for both real-time usecases like low-latency live streaming and encoding, decoding, and transcoding of files.

### Expanded input support

- **[Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)**{.api data-categories="creative"} - React to touch, stylus, and mouse events using a single API, allowing more input options for your users. See also best practices for [touch-friendly UIs](https://developers.google.com/web/fundamentals/design-and-ux/input/touch) and [user input and controls](https://developer.mozilla.org/en-US/docs/Web/Guide/User_input_methods).
- **[Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)**{.api} - Allows your web app to respond to input from common gamepads
- **[Web HID](https://web.dev/hid/) 🚩**{.api} - Allows your web app to access non-standard human interface devices (like custom controllers)

### Advanced peripheral support

- **[Web USB](https://developers.google.com/web/updates/2016/03/access-usb-devices-on-the-web)**{.api} - Allows your web app to access non-standard (i.e. keyboards and mice) USB devices from your app
- **[Serial API](https://web.dev/serial/) 🔮**{.api} - Adds an API for communicating with hardware devices over a physical or virtual serial port.

## Your PWA checklist{data-pwa-checklist}

Ready to start enhancing your PWA with these new powerful APIs? Choose one of the usecases below to see a recommended set of APIs to use, or make your own checklist, and work towards completing it!
