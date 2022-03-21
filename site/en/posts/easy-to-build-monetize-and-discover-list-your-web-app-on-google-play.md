---
title: 'Easy to build, monetize, and discover: List your web app on Google Play'
metadesc: Build Android apps for devices other than mobile to reach more users.
tags:
  - web
  - product news
  - trend
authors:
  - pjmclachlan
  - tbuckley
date: 2020-12-08
---

_This article originally appeared on the Chromium Blog._

App developers should be able to make money from their creations, whether via ads, purchases, or subscriptions. The first step to successfully monetizing is getting your app discovered.

Now that Progressive Web Apps (PWAs) can be listed in Google Play, we’re excited to announce that web developers can use Google Play payments in their PWA on Chromebooks and Android devices. This makes it even easier to get your PWA in front of more users and start accepting simple, secure payments by listing in Google Play.

## A new way to connect with Chromebook users

Since their release, [Chromebooks and Chrome OS](https://chromeos.dev/en) have proven that a device built around the web can make computing easier, faster, and more secure. Last year, we expanded high-quality app experiences beyond mobile by [adding support for PWAs on Chrome OS](https://www.youtube.com/watch?v=2KhRmFHLuhE). And that’s clearly resonated with users — in the past year, Chromebook unit sales have grown 85% year over year (YOY),[^1] and PWA installs more than doubled.[^2]

[^1]: The NPD Group, Inc., U.S. Retail Tracking Service, Notebook Computers, based on unit sales, Jan.–Aug. 2020.
[^2]: Chrome usage metrics, Dec. 2019–Dec. 2020.

![Chromebook sales have increased 85% year over year and PWA installs have increased 175% year over year.](ix://posts/easy-to-build-monetize-and-discover-list-your-web-app-on-google-play/yoy_growth.png)

With all the new capabilities being added to web apps — from saving to the local file system to device communication — we saw an opportunity to highlight the best experiences for Chromebook users.

Search continues to be a quick and easy way to discover new web apps, but many people are also turning to app stores to find the best software for their device in one place. That’s why we gave developers the ability to list their PWA in Google Play on Chrome OS using [Trusted Web Activity](https://developers.google.com/web/android/trusted-web-activity). Now, users can discover web apps by browsing through collections and curated recommendations in the Play Store. And once they install it, they’ll be able to enjoy the full-screen app experience they love, powered by Chrome.

Brands like [Kapwing](https://www.kapwing.com/), an online image, video, and GIF editing platform, have already seen impressive results after launching their PWA:

> In the first five weeks of launching our PWA-ified website, the number of people creating videos through the PWA grew 36%. This growth in usage outpaced overall growth on the website, indicating higher retention among creators who installed the PWA.

Julia Enthoven, CEO of Kapwing {.cite}

## Streamlined secure payments

If your app accepts payments, you can simplify the process by using [the Digital Goods API with Google Play](https://developer.android.com/google/play/billing). This feature is ready to start testing behind a flag in Chrome OS 88 and will launch with Chrome OS 89 in March 2021.

These APIs allow you to offer in-app payments and subscriptions with a single click, and users see the same, familiar Google Play billing flow with the ability to save credits or payment information.

![A laptop showing a Google Play Billing subscription checkout flow on Clipchamp](ix://posts/easy-to-build-monetize-and-discover-list-your-web-app-on-google-play/play_billing_subscription.png)

## More amazing apps coming to Chrome OS

We’ve already seen [great responses to PWAs on Chromebooks](https://blog.google/products/chromebooks/whats-new-chrome-os/dec2020/) — users enjoying the advanced graphics on [Adobe Spark](https://spark.adobe.com/) and [Corel’s Gravit Designer](http://web.dev/gravit-designer), sharper video editing with [Clipchamp](http://web.dev/clipchamp), and more powerful viewing experiences on [YouTube TV](https://tv.youtube.com/). We’re excited to share that all of these experiences will arrive in the Play Store as soon as the Digital Goods API arrives in Chrome OS 89.

It’s incredible to see the journey of developers as they build their web apps for larger screens. We can’t wait to showcase amazing web apps like these on Google Play — and we hope to see yours there soon!
