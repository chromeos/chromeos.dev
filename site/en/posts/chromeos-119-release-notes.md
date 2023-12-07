---
title: 'ChromeOS 119 release notes'
metadesc: 'ChromeOS 119 sees the deprecation of WebSQL and a number of user experience improvements.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2023-12-07
---

ChromeOS 119 reached stable release on November 14, 2023. As of this version of ChromeOS, WebSQL has been deprecated. ChromeOS 119 also brings with it a number of user experience improvements, such as improved access to camera and microphone settings and group tab management.

## WebSQL is no longer available as of ChromeOS 119

Chrome 119 removes WebSQL access in all contexts. Access to WebSQL is available until Chrome 123 using the [WebSQLAccess](https://chromeenterprise.google/policies/#WebSQLAccess) policy, but we recommend that WebSQL users switch to SQLite compiled to WebAssembly.

!!! aside.message--note
**Note:** Learn more about why we replaced [WebSQL](https://developer.chrome.com/blog/deprecating-web-sql/).
!!!

## Manage camera and microphone settings in Privacy Hub

Completely turn off your camera or microphone with a single click. ChromeOS users can now manage their camera and microphone settings across the operating system from one place: **Settings > Security and Privacy > Privacy controls**.

## Save, recall, and sync Tab Groups

You can now organize, save, and recall groups of tabs with Tab Groups. Tab Groups sync between devices to provide a cohesive user experience. You can disable syncing Tab Groups using the [ `SyncTypesListDisabled`](https://chromeenterprise.google/policies/#SyncTypesListDisabled) policy.

## Use Drive offline on Chromebook Plus devices

Enterprise users on [Chromebook Plus](https://support.google.com/chromebook/answer/14128000) devices can now make their My Drive section of Google Drive available offline. You can control offline syncing using the [`DriveFileSyncAvailable`](https://chromeenterprise.google/intl/en_ca/policies/#DriveFileSyncAvailable) enterprise policy.

## Also released in ChromeOS 119

ChromeOS 119 adds several features, policies, and templates to improve administrative control, user experience, and security.

- **DevTools internal errors now report to Chrome internal crash reporting.** To improve Chrome's stability, DevTools internal errors are now reported through Chrome's existing crash reporting pipeline. This provides visibility into the stability of Chrome DevTools.
- **UI strings in Chrome shift from "Clear" to "Delete" when destroying data.** This GUI improvement is targeted toward improving users' understanding of the associated effects on their data.
- **ChromeOS Admin templates introduced.** With App Launch Automation, admins can now configure groups of applications, windows and tools that can be launched automatically on startup or on-demand by users throughout their day.
- **New policy for SharedImages for PPAPI Video Decode.** Chrome 119 introduces a new [ `PPAPISharedImagesForVideoDecoderAllowed`](https://chromeenterprise.google/policies/#PPAPISharedImagesForVideoDecoderAllowed) policy to control the recent refactor for VideoDecoder APIs in PPAPI plugin.
- **Improved security with hash-prefix real-time lookups.** For standard Safe Browsing protection users, visited URLs now have their safety checked in real time instead of against a less frequently updated local list of unsafe URLs. If needed, the feature can be disabled through the policy [`SafeBrowsingProxiedRealTimeChecksAllowed`](https://chromeenterprise.google/policies/#SafeBrowsingProxiedRealTimeChecksAllowed).
- **Remove Authorization header upon cross-origin redirect.** Prior to Chrome 119, when a cross origin redirect, such as from `foo.test` to `bar.test`, happened with an Authorization header, Chrome preserved the Authorization header and `bar.test` could receive the header. Starting Chrome 119, Chrome removes Authorization headers when cross origin redirects happen.

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes⁠](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](/{{locale.code}}/subscribe) or join the [ChromeOS Discord](https://chromeos.dev/discord).
