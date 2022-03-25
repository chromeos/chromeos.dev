---
title: How Simplifi by Quicken is giving Chrome OS users a fit-for-Chromebook experience with its Progressive Web App
metadesc:
date: 2022-03-28
app:
  name: Simplifi
  logo: ix://stories/simplifi/logo.png
  company: Quicken
hero:
  image: ix://stories/simplifi/hero.png
  alt: Different screenshots of the Simplifi user interface, focusing in on the Reports and Spending Plan screens.
featured: true
tags:
  - web
  - pwa
---

Quicken's no stranger to user-friendly digital tools. After all, its desktop and cloud product suite has helped over 17 million people manage their finances for more than 30 years. In 2020, the brand further expanded its lineup of products tailored to different devices and financial needs with its mobile and web app, Simplifi.

But the way people use their favorite apps is changing. And as browsers have evolved over time, so have web apps — which are more powerful than ever. With app usage on Chromebooks [almost doubling](https://chromeos.dev/en/posts/simple-payments-that-users-trust-monetizing-web-apps-in-google-play) throughout 2020 and 2021, Quicken saw an opportunity to fuel better user experiences with the web's latest capabilities.

Here's how the brand built a more responsive, reliable in-browser experience for Chrome OS users by developing a [Progressive Web App](https://chromeos.dev/en/web/desktop-progressive-web-apps) (PWA).

## Going from tabs to top-level apps

When Quicken launched Simplifi in 2020, the made-for-mobile Android app wasn't optimized for Chromebooks. And while the brand did have a web app, it wasn't available on the Chrome Web Store where people could find Simplifi.

With a PWA, Quicken was able to address these pain points by rolling out modern APIs to its existing web app. The brand kicked off this transformation by deploying the [web app manifest](https://web.dev/add-manifest/) with the [Webpack manifest plugin](https://webpack.js.org/concepts/plugins/) to unlock a native-like look and feel. Quicken then used [Workbox](https://developers.google.com/web/tools/workbox) to create a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers) so its PWA could access the [Cache API](https://web.dev/cache-api-quick-guide/) and work offline.

> With a PWA, Quicken was able to address pain points by rolling out modern APIs to its existing web app.

To make sure users were running the latest version of the PWA, the developers ensured it updated automatically when people were in-app or went idle for more than five minutes — or they could simply update manually.

Quicken also implemented support for push notifications to encourage people to come back to the PWA. The developers added the brand's own enabling layer following web optimization [best practices](https://web.dev/push-notifications-overview/), which displays before the browser permission prompt.

## Preparing the PWA for Play and pay

For ultimate "appiness", Quicken made sure that its PWA was [installable](https://web.dev/install-criteria/). The brand then went through Google's documentation to prepare a [Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity/) (TWA) so it could list its PWA in the Google Play store. With [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), Quicken had no problem generating a TWA, and the entire development process took close to one week with a specialized, streamlined team.

Once its PWA and TWA were ready to go with manifest and asset links, the brand deployed the former to its stage environment and the latter to the internal testing track. To move forward with no-fuss monetization, Quicken implemented the [Digital Goods API](https://developer.chrome.com/docs/android/trusted-web-activity/receive-payments-play-billing/).

The brand's back-end service and RDNS were built as part of the Android app's Google Play billing integration, so the development team was able to implement the Digital Goods API with minimal changes. This meant people could follow a familiar Google Play billing flow while the brand could easily accept in-app payments for subscriptions.

## Meeting users across any and all devices

One of Quicken's goals is to provide an easy and customizable experience for customers no matter what device they're using. Many people gravitate toward larger screens simply because they want to see and do more at the same time than they can on mobile. That's why Quicken made sure its PWA offers unique features that make the most of Chromebooks' screen real estate.

For instance, cash flow projection in the brand's mobile app is only available as a table. But in Quicken's PWA, the information can be displayed as a graph — complete with estimates that extend further into the future. Other PWA-exclusive features include additional data visualization and import options as well as advanced spending, income, and savings reports.

![Simplifi dashboard.](ix://stories/simplifi/dashboard.png)

Once these large-screen experiences and monetization were ready, Quicken pushed its PWA live alongside its mobile Android app in the [Google Play store](https://play.google.com/store/apps/details?id=com.quicken.acme&hl=en_US&gl=US). Thanks to this unified listing, the brand can ensure that users always download the version of the app most fit for their preferred device.

To gauge success, Quicken is currently measuring the number of PWA trials and installs, the percent of users who upgrade from a trial subscription to a paid one, and the net promoter scores of users on a Chromebook compared to other devices.

These metrics are all trending up at two months in — and the brand's already planning to invest more in PWAs. "We believe PWAs could be the future of running applications locally on many devices," says Kristen Dillard, senior director of product management at Quicken. "We're able to provide our customers with an experience that feels native, without having to invest in native applications for every platform."
