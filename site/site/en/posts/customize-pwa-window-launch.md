---
title: 'Customize how your PWA window launches'
metadesc: The Launch Handler API lets you choose how your PWA handles all launch triggers, including from in-scope links.
tags:
  - web
  - product news
authors:
  - joycetoh
date: 2022-04-05
---

On Chrome OS, an installed Progressive Web App (PWA) will appear in the launcher drawer or shelf (if the user has the app opened or pinned) much like an Android or Linux app would. This lets the PWA launch without needing to open the browser and navigate to the right URL. That’s not the only way to launch a PWA, though. Users can choose to open in-scope links in the PWA window, or your app might be a [share target](https://web.dev/web-share-target/) receiving shared content from another app. You can customize the launch experience of your PWA to provide the best experience for your users.

The previously proposed [Declarative Link Capturing API](https://web.dev/declarative-link-capturing) let developers declare what happened when the browser navigated to a URL within a PWA’s scope from an external context. Going forward, the [Launch Handler API](https://github.com/WICG/sw-launch/blob/main/launch_handler.md) and link capturing user preferences will replace the Declarative Link Capturing API.

## Launch Handler API

The Launch Handler API lets you control how you want your app to react to all launch triggers, and is available in [origin trial](https://developer.chrome.com/origintrials/#/view_trial/2978005253598740481) starting in Chrome 98. It’s important to handle the incoming navigation to your app properly, as the default behavior may not be the preferred experience for your users.

For example, suppose a user is watching a video in an installed PWA. A friend sends them a link to another video, which they click on. The default behavior on Chrome OS is that clicking on the link will open it in a new window. So now, the user will have two PWA windows open for the same app, one for each video. While this experience won’t make the user lose their place in the video they were originally watching, the number of windows might slowly start piling up. Instead, the app might want to give a different customized experience like queueing up the new video instead.

With the Launch Handler API, you can choose and implement the launch experience that is most appropriate for your users:

- **New client** - default behavior on Chrome OS. A new browsing context is created in a web app window to load the launch’s target URL.
- **Existing client** - an existing browsing context is used. If none exist, a new browsing context is created. If multiple browsing contexts exist, the most recently used one is used, either overriding the current context, or notifying it of an incoming launch request.
  - **Navigate (default)** - the most recently interacted with browsing context in a web app window is navigated to the launch’s target URL, overriding whatever was previously in that browsing context.
  - **Retain** - the most recently interacted with browsing context won’t be overridden but is chosen to handle the launch. A new `LaunchParams` with its `targetURL` set to the launch URL will be enqueued in the document’s [`window.launchQueue`](https://web.dev/launch-handler/#the-window.launchqueue-interface). You can then customize how to handle the launch. If you don’t handle the incoming `LaunchParams`, the app will come into focus but no navigation is made. So make sure to handle the launch appropriately for a good experience for your users.

Note: For these scenarios, browsing context usually means the installed PWA window. However, in the case of tabbed application mode (currently in [developer trial behind a flag](https://web.dev/tabbed-application-mode/)), browsing context means a tab within the installed PWA window.

### Try it out!

Read the [explainer](https://github.com/WICG/sw-launch/blob/main/launch_handler.md) and [web.dev article](https://web.dev/launch-handler/) to learn more about how to implement the Launch Handler API. To see the API in action, check out the [demo](https://launch-handler.glitch.me/). If you want to start implementing the API in your own app, you can try it out by turning on the `#enable-desktop-pwas-launch-handler` flag in `chrome://flags` or sign up for the [origin trial](https://developer.chrome.com/origintrials/#/view_trial/2978005253598740481).

## Link Capturing

As was previously mentioned, one of the more common ways for your PWA to be launched is from a link. Chrome OS 98 introduces Link Capturing as a user preference which allows users to customize how to open supported in-scope links: in the Chrome browser or in the installed PWA.

Users will get visual cues from Chrome browser to opt-in to link capturing. The current UI and UX may change in the future as the team continues to work on improvements to make the feature more discoverable to users.

By default, links are set to open in the Chrome browser. There are two ways for a user to change their preference, through either the omnibox or system settings.

### Setting preferences through the omnibox

In the browser, a user can navigate to an in-scope link and in the omnibox select the “Open with” icon. This will show an intent picker asking them to choose which app to open the link with and a checkbox to remember their choice. If your PWA is installed, it will be available as an option.

![Screen capture of link capturing preferences in the "Open with" intent picker](ix://posts/customize-pwa-window-launch/link_capturing_open_with.gif)

### Setting preferences through system settings

In the Chrome OS Settings app, a user can go to the “Apps” menu, select “Manage your apps” and find the app they’re interested in (your PWA). Under “Opening supported links”, there are radio button options for opening links in the app or in the Chrome browser.

![Screen capture of link capturing preferences in the settings app](ix://posts/customize-pwa-window-launch/link_capturing_settings_menu.gif)
