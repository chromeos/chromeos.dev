---
title: What's Kiosk Mode?
metadesc: Understand what kiosk mode is for Chrome OS.
date: 2021-03-21
weight: -1
tags:
  - web
---

Kiosk apps are applications that are deployed via a Chrome OS Enterprise policy that allow an application to take fullscreen of your device and do not have a login requirement to run. Kiosk apps are deployed in schools for testing, enterprises for digital signage and kiosks where enterprise customers can interact with a designated single purpose application. Android apps on kiosk mode were deprecated in June 2021. From April 2020 onwards, our recommendation is to develop web apps for kiosk mode.

# Develop a kiosk application for Chrome OS

If you are starting a new kiosk application, we strongly recommend developing a web application, and highly encourage a progressive web application for offline access. If you have an existing kiosk app that is a Chrome App or Android application, you should migrate your existing application to a web application to continue receiving support for your kiosk application. For Chrome Apps that relied on Chrome kiosk specific APIs (such as [chrome.runtime](https://developer.chrome.com/docs/extensions/reference/runtime/)) you can still call these APIs by deploying an [extension that pairs with your web application](https://docs.google.com/document/d/1T-2RpUVKS3gMUbMU47MeyIdHRQUyloXh5vm8-0mBvOo/edit#heading=h.haxxc3hxs5wb) in kiosk mode.

# Special Notes regarding kiosk mode

- **Kiosk mode is not ephemeral** - If there is any user data that is stored on device, it will be available next time someone uses kiosk mode. It is the app developer’s responsibility to [maintain data integrity](https://developer.chrome.com/docs/extensions/reference/browsingData/).
- **[Extensions can be run in kiosk mode](https://docs.google.com/document/d/1T-2RpUVKS3gMUbMU47MeyIdHRQUyloXh5vm8-0mBvOo/edit#heading=h.haxxc3hxs5wb)** - Kiosk mode can automatically install and run extensions for web apps. This would allow your app to access features not normally available as web APIs, for instance proxying data or restarting the kiosk via more privileged extension APIs.
- **Browser navigation still can occur** - Although there is no URL bar in kiosk mode, users can still navigate to other pages not within your web app via clicking on links displayed in your application. For education apps, this may mean that you need to lock down the device by deploying an extension that prevents navigation to different URLs, disabling iframes within your application, or by enforcing an [enterprise policy of blocked URLs](https://support.google.com/chrome/a/answer/1375678?hl=en#:~:text=alerting%20contact%20info-,URL%20blocking,-Kiosk%20virtual%20keyboard).
