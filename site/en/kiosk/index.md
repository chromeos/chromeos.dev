---
title: Kiosk apps on Chrome OS
metadesc: Developing kiosk apps for Chrome OS.
hero:
  image:
    top: ix://landings/heroes/education.svg
    bottom: ix://landings/heroes/education-small.svg
interest:
  title: App optimization support
  body: If you're planning on developing a kiosk app for ChromeOS, and would like help from us, please fill out our developer interest form. After doing so, someone from Google may reach out to you to further clarify your feedback or needs. Please note that filling out this form does not constitute automatic inclusion in this program.
  cta:
    url: https://forms.gle/wPUjwhLgLnqvsqDG6
    text: Apply now
date: 2022-03-21
weight: -8
---

Kiosk apps are applications that are deployed via a Chrome OS Enterprise policy that allow an application to run fullscreen on a device device without needing to be logged in. Kiosk apps are deployed in schools for testing, enterprises for digital signage, and kiosks where enterprise customers can interact with a designated single purpose application. Android apps on kiosk mode were deprecated in June 2021. From April 2020 onwards, our recommendation is to develop web apps for kiosk mode.

## Develop a kiosk application for Chrome OS

If you are starting a new kiosk application, we strongly recommend developing a web application, and highly encourage a Progressive Web Application for offline access. If you have an existing kiosk app that is a Chrome App or Android application, you should migrate your existing application to a web application to continue receiving kiosk support. For Chrome Apps that relied on Chrome kiosk specific APIs (such as [chrome.runtime](https://developer.chrome.com/docs/extensions/reference/runtime/)) you can still call these APIs by deploying an [extension that pairs with your web application](/{{locale.code}}/education/connecting-an-extension-from-a-kiosk-pwa) in kiosk mode.

## Special Notes regarding kiosk mode

- **Kiosk mode is not ephemeral** - If there is any user data that is stored on device, it will be available next time someone uses kiosk mode. It is the app developer’s responsibility to [maintain data integrity](https://developer.chrome.com/docs/extensions/reference/browsingData/).
- **[Extensions can be run in kiosk mode](/{{locale.code}}/education/connecting-an-extension-from-a-kiosk-pwa)** - Kiosk mode can automatically install and run extensions for web apps. This can allow your app to access features not normally available as web APIs, for instance proxying data or restarting the kiosk via more privileged extension APIs.
- **Browser navigation can still occur** - Although there is no URL bar in kiosk mode, users can still navigate to other pages not within your web app by clicking on links displayed in your application. For education apps, this may mean that you need to lock down the device by deploying an extension that prevents navigation to different URLs, disabling iframes within your application, or by enforcing an [enterprise policy of blocked URLs](https://support.google.com/chrome/a/answer/1375678?hl=en#:~:text=alerting%20contact%20info-,URL%20blocking,-Kiosk%20virtual%20keyboard).
