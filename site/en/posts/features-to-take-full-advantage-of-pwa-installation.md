---
title: 'Features to take full advantage of PWA installation'
metadesc: Recap the I/O 2022 talk (Making the most of PWA install) and highlights the APIs that can create enhanced experiences for your PWA after installation.
tags:
  - web
  - product news
hero:
  youtube: tj0_4pcrj7s
  alt: This talk walks you through the existing tools in PWAs to create enhanced experiences after install.
authors:
  - joycetoh
date: 2022-05-24
---

Progressive Web Apps (PWAs) are a great way to get your web app to Chrome OS users. Users can install your app from the browser, and you can [list your PWA in Google Play](/{{locale.code}}/publish/pwa-in-play/) for users to discover. Once installed, your PWA will show up in the launcher where the user can pin it to their shelf and quickly access it, opening a new opportunity for your users to engage with your app. The Google I/O 2022 talk, Making the most of PWA install, walks you through the tools to further enhance your PWA with [powerful APIs](/{{locale.code}}/web/powerful-pwas) that create new experiences after installation.

## Installation

Many of the capabilities discussed here only apply to apps that are installed, and won’t work if run from a tab. Therefore, the first step is to [ensure that your app is installable](https://web.dev/codelab-make-installable). Chrome browser provides a default install experience but you may want to create a [custom install flow](https://web.dev/customize-install/) to display the install prompt and also collect useful metrics during the process.

## Notifications

Notifications are a good way to let users know about important and time-sensitive events or actions they need to take. Some users may be wary of turning on notifications, so you should clearly state the purpose of your notifications and let them opt-in before requesting permission. In a settings menu, you should allow users to enable and disable notifications and set their notification preferences.

![Example of what a notification looks like on Chrome OS.](ix://posts/take-full-advantage-of-pwa-installation/notifications.png)

Implementing notifications consists of a few things including visual elements on the frontend and push messaging from your backend. On the frontend, it’s important to implement the visual and behavioral aspects of [displaying a notification](https://web.dev/push-notifications-display-a-notification/). Then, you will likely use your backend server to [push messages to the client where the service worker will process the notification](https://web.dev/push-notifications-overview/).

## Badging

Similarly to notifications, badging alerts users to new activity happening in your PWA. Use the [badging API](https://web.dev/badging-api) to provide visual cues on the app icon on the shelf. On Chrome OS, this looks like a small circle on the app’s home icon.

![Example of what a badge looks like on Chrome OS. Red arrow points to the small circle badge on app icon in the shelf.](ix://posts/take-full-advantage-of-pwa-installation/badging2.png)

## Sharing

The Web Share and Web Share Target APIs lets you share content like links, texts, or files to and from your app. With the [Web Share API](https://web.dev/web-share/), your PWA is able to use the same system-provided share capabilities as platform-specific apps.

The [Web Share Target API](https://web.dev/web-share-target/) lets your PWA register with Chrome OS as a share target to receive certain types of shared content from other apps. To ensure that your app will always be able to process the shared data, it’s also a good idea to implement the action page that handles the shared content to work offline.

## File handling

The [File Handling API](https://web.dev/file-handling/) lets a PWA register itself as a file handler for certain file types. This allows a user to see the app as an option to "Open with…" when they try to open a file. Much like with the Web Share Target API, it’s recommended that the action page that handles the incoming file should work offline in the scenario when a user is unable to get online but would still like to edit or view (or whatever your app does) their local file.

![Screen recording shows the Chrome OS Files app open. Cursor hovers over a .txt file, right-click to use the “Open with…” option to select the sample PWA to open the file.](ix://posts/take-full-advantage-of-pwa-installation/open_file_handling.gif)

## Window controls overlay

The [window controls overlay](https://web.dev/window-controls-overlay/) feature, which we expect to be available within the next few releases of Chrome OS, lets PWAs provide a more app-like feel by allowing a customized overlay containing the window controls to replace the normal title bar. You can even build some basic actions and UI elements into the custom overlay for users to interact with.

![Screen recording shows what the window controls overlay looks like on Chrome OS. Cursor toggles between hiding and showing the title bar to enable and disable the overlay.](ix://posts/take-full-advantage-of-pwa-installation/wco.gif)

## App shortcuts

App shortcuts help your users quickly start common or recommended tasks by navigating to specific pages within your PWA. The shortcuts menu is accessed by right-clicking on the app icon. This can be [implemented by defining the shortcuts in the web app manifest](https://web.dev/app-shortcuts/).

![Example of what app shortcuts look like in the right-click menu of an app in the Chrome OS shelf.](ix://posts/take-full-advantage-of-pwa-installation/app_shortcuts.png)

## Identification

Previously, it was up to the discretion of browsers to decide how to identify your app. Some browsers relied on the app’s manifest field path or `start_url` which meant developers couldn’t change either without it being identified as a different app. Starting in Chrome 96, you can [uniquely identify your app](https://developer.chrome.com/blog/pwa-manifest-id/) by using the `id` field in the web app manifest, removing the dependency on `start_url` and manifest path. It also makes it possible to serve multiple PWAs from the same URL as long as there is a manifest with a unique `id`.

## And more!

These are just some of the powerful APIs available for you to make your PWAs more capable for your users. There are many more APIs (like the [Launch Handler API](/{{locale.code}}/posts/customize-pwa-window-launch)) that can make your PWA work more seamlessly with the Chrome OS desktop and other apps. Check out the [web](https://io.google/2022/program/?q=1cf58852-f96e-4549-92c4-f02f47b941d7) and [Chrome OS](https://io.google/2022/program/?q=5e8f505e-5ce1-428d-ac5f-f7deafd0dbae) sessions at Google I/O 2022 and learn more about [adapting web apps for Chrome OS](/{{locale.code}}/web) .
