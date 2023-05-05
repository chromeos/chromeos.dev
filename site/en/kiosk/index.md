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

[Kiosk mode](https://chromeenterprise.google/os/kiosk-and-digital-signage/) is a specialized way of running ChromeOS that focuses on just one application at a time. Set by an administrator, kiosk applications are locked in full screen and run without user login to the device. This differs from the traditional user session or managed guest session modes which allows the user or guest to access multiple apps and the browser.

Kiosk mode can be used for:

- Standardized testing applications deployed in schools
- Digital signage for businesses and enterprises
- Self-service kiosks for retail and hospitality

Kiosk mode provides a locked down, secure environment, admin-controlled user experience.

## Enable kiosk mode

To enable kiosk mode, you will need a [management license](https://services.google.com/fh/files/misc/kiosk_signage_upgrade.pdf) which gives you the tools to set up and manage your own fleet of kiosk devices. A managed device lets you set security controls and remote management capabilities that can control device policies, deploy apps, control OS updates, capture screenshots and monitor device status, all via the cloud-based Google Admin console.

## Kiosk application and capabilities

ChromeOS kiosk mode supports web apps, and building a Progressive Web App is a great way to provide a stellar kiosk experience for your users:

- Store offline content, [like videos](/{{locale.code}}/kiosk/managing-video-storage-on-the-web), with service workers and data storage APIs like Cache API and IndexedDB.
- Persist application state even without an internet connection by using the [Workbox](https://developer.chrome.com/docs/workbox/) library to implement service worker routing and caching.
- Unlock even more features in your kiosk app with [Project Fugu](https://developer.chrome.com/capabilities/), the Chromium Web Capabilities project.

You can also build a [companion extension that pairs with your PWA in kiosk mode](/{{locale.code}}/kiosk/connecting-an-extension-from-a-kiosk-pwa). Doing so lets you take advantage of [Chrome APIs](https://developer.chrome.com/docs/extensions/reference/) (such as `chrome.runtime`) and advanced capabilities, like configuring display settings, controlling connected audio, and rebooting devices, that kiosk and enterprise extensions can be enabled to do.

Kiosk on ChromeOS gives you a secure and reliable platform to deliver a single-app focused experience to your customers, whether they need to display static informational pages or create interactive experiences. With built-in tooling to manage and deploy kiosk devices, ChromeOS kiosk lets you get started with developing today and prioritize building great features for your users.
