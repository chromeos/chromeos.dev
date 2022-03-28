---
title: Expand your app beyond mobile to reach Android users at large
metadesc: Build Android apps for devices other than mobile to reach more users.
tags:
  - leader's corner
  - trend
  - large screens
  - android
authors:
  - ssamat
date: 2019-09-05
---

_This article originally appeared on Android Developers Blog._

From day one, we designed Android to be a flexible, adaptive platform.

Most people picture a smartphone when they think of Android, but Android also powers an amazing number of large-screen devices. In fact, there are more than **175 million** Android tablets with the Google Play Store,[^1] making Android tablets a vital form factor for Google and our OEM partners today. Android apps also run on [Chrome OS laptops](/{{locale.code}}/posts/chromeos-io-19), and the number of monthly active users who enabled Android apps grew 250% in just the last year.[^2]

[^1]: The number of tablets only accounts for devices that have the Google Play Store installed (for example, this excludes tablets in China); the actual number of tablets capable of running Android applications is much larger.
[^2]: Google Internal Data, March 2018 to March 2019.

Here at Google, we’re excited to see how you can take advantage of large-screen formats - including Samsung’s new [Galaxy Tab S6](https://www.samsung.com/us/mobile/tablets/tab-s6/), the upcoming Lenovo™ Smart Tab M8 with Google Assistant, the upcoming Samsung Galaxy Fold, and other devices launching this week at [IFA](https://b2b.ifa-berlin.com/). Our OEM partners are building experiences that help users every day:

> As consumers demand more meaningful innovation, we will continue to work closely with Google and Android developers to create seamless mobile experiences that inspire creativity, boost productivity, and keep up with our users' busy lifestyles. By enhancing multi-tasking tools, such as our signature S Pen and Samsung DeX on the Galaxy Tab S6, we're offering users a more advanced large screen experience.

Woncheol Chai, Senior Vice President and Head of Product Strategy Team, Mobile Communications Business, Samsung Electronics {.cite}

> As part of our mission to enable smarter technology for all, Lenovo has been innovating a broad range of Android tablets over the past decade for different user needs and budgets based on customer insights. We're committed to the consumer tablet category and excited to bring smarter, more powerful tablets in even thinner and lighter designs to more people.

Tony Chen, Vice President and General Manager of Android Devices, Intelligent Devices Group, Lenovo {.cite}

From the start, Android was designed as a platform that could handle multiple screen sizes. Over the years, we’ve continued to add functionality for developers to accommodate new devices and form factors.

- We started with a **phone**. Developers could write Android apps that would work on phones of all sizes, all over the world. Part of what made this work was Android’s resource and layout system, which enabled applications to smoothly adapt to different screen sizes.
- In Android 3.0 Honeycomb, we added support for **tablets**. In particular, capabilities like `Fragment`'s allow you to create applications that work across vastly different form factors.
- Android 7 Nougat brought multi-window and multi-display capabilities, including the ability to drag-and-drop across apps. Meanwhile, Chrome OS added the [capability](/{{locale.code}}/android) to run Android applications on **laptops**. With some adjustments to handle different inputs and windowing dynamics, you could now reach app users in a desktop-style environment.

#[Android's layout system helps applications smoothly resize and adjust their layout interactively.](ix://posts/expand-your-app-beyond-mobile-to-reach-android-users-at-large/free-form-resizing.gif)

- Now, in [Android 10](https://developer.android.com/about/versions/10), we’ve made even more enhancements for development on large screens. We’ve improved multi-window capabilities, making it easier to use multiple apps in parallel. We also continued improving multi-display support, enabling more multi-monitor use cases. And we made it easy for you to experiment and test new form factors by adding dedicated emulator for **foldables** as well as publishing a [foldables guide](https://developer.android.com/guide/topics/ui/foldables).

By optimizing your app to take advantage of different form factors, developers have an opportunity to deliver richer, more engaging experiences to millions of users on larger screens. And if you don’t have access to physical devices, the Android Emulator supports all of the form factors mentioned above, from [Chrome OS to phones and tablets](https://developer.android.com/studio/run/emulator).

Developers of apps like [Mint](https://developer.android.com/stories/apps/intuit-mint), [Evernote](/{{locale.code}}/stories/evernote), and [Asphalt](/{{locale.code}}/stories/asphalt-8) are just a few who have seen success from taking their existing APK to larger screens.

> At Gameloft, we want to extend players' fun across platforms by giving them more ways to experience our games. So we always thrive to be one of the first developers to release games that are optimized for every Google platform.

Damien Marchi, VP of Marketing, Gameloft {.cite}

To learn more about optimizing your Android apps for richer experiences on [tablets](https://developer.android.com/docs/quality-guidelines/tablet-app-quality), [Chrome OS laptops](/{{locale.code}}/android/optimizing), [foldables](https://developer.android.com/guide/topics/ui/foldables), and more, join us at the [Android Developer Summit](https://developer.android.com/dev-summit) on October 23-24 — either in person or via the [livestream](https://www.youtube.com/watch?time_continue=4&v=Hx3aTcv2KlE) — or check out our recap videos on YouTube.
