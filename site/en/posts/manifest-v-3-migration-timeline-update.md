---
title: An update to the transition of Chrome extensions to Manifest V3
metadesc: To provide a smoother transition phase for developers to update their extensions to Manifest V3, Chrome updated the Manifest V2 sunset timeline.

tags:
  - announcement
  - web
  - product news
authors:
  - ikarahan
date: 2022-10-17
updated: 2023-11-16
---

!!! aside.message--warning
The Manifest V2 support timeline has been updated. See Chrome's [November 2023 blog post](https://developer.chrome.com/blog/resuming-the-transition-to-mv3/) and the [Manifest V2 support timeline page](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/) for details.
!!!

Last year, Chrome browser [announced a timeline](https://developer.chrome.com/blog/mv2-transition/) for sunsetting Manifest V2 extensions, and migrating them to Manifest V3 to promote safety and privacy for Chrome users.

To provide a smoother transition phase for developers to update their extensions to Manifest V3, Chrome recently [updated the timeline](https://developer.chrome.com/blog/more-mv2-transition/). With this new timeline:

- Starting in January with **Chrome 112**, Chrome may run experiments to turn off support for Manifest V2 extensions in Canary, Dev, and Beta channels.
- Starting in June with **Chrome 115**, Chrome may run experiments to turn off support for Manifest V2 extensions in all channels, including Stable channel.

Admins of managed Chromebook devices can extend support for Manifest V2 to January 2024 by enabling [the `ExtensionManifestV2Availability` admin policy](https://bugs.chromium.org/p/chromium/issues/detail?id=1347794).

The updated Manifest V2 phase-out timelines on the Chrome Web Store are as follows:

- In **January 2023**, use of Manifest V3 will become a prerequisite for the [Featured badge](https://blog.google/products/chrome/find-great-extensions-new-chrome-web-store-badges/) in the Chrome Web Store.
- In **June 2023**, the Chrome Web Store will no longer allow Manifest V2 extensions to be published with [visibility](https://developer.chrome.com/docs/webstore/cws-dashboard-distribution/#setting-the-visibility) set to Public. All existing Manifest V2 extensions with visibility set to Public at that time will have their visibility changed to Unlisted.
- In **January 2024**, following the expiry of the Manifest V2 enterprise policy, the Chrome Web Store will remove all remaining Manifest V2 items from the store.

Visit Chrome’s [Manifest V2 support timeline page](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/) for further details.
