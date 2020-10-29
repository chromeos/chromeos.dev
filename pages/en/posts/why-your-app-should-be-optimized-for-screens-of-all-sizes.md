---
title: Why your app should be optimized for screens of all sizes
metadesc: See how Gameloft, Evernote, Slack, and 1Password have optimized for Chrome OS.
tags:
  - trend
  - success story
  - large screens
  - device configuration
  - window management
  - keyboard support
  - mouse support
  - stylus support
  - trackpad support
  - gaming
  - productivity
  - android
authors:
  - nataliagvak
hero:
  image: /images/posts/why-your-app-should-be-optimized-for-screens-of-all-sizes/hero.png
  alt: Illustration of laptop with gaming and productivity icons.
date: 2018-10-29
---

_This article originally appeared on Google Play Medium._

Since we launched our first Chromebooks in 2011, the growth of Chrome OS has been incredible. Today, Chromebooks range from traditional laptops to convertibles and tablets that are available in over 10,000 stores — thanks to close partnerships with top OEMs, including Samsung, Dell, and HP, among many others — and we’re only going to keep expanding. It’s been an exciting period of growth for us, but even more so for developers.

The evolution of Chrome OS presents an amazing opportunity for developers to boost their reach across a wider variety of devices and screens. By optimizing their apps for wider screens on Chrome OS, dev teams can drive higher engagement and reach even more users with immersive experiences.

## Tapping into a wider appeal for wider screens

Much of our growth has been fueled by new ways that people consume and engage with content. A lot of people use more than one type of device every day, and the lines between desktop and mobile experiences are getting blurrier. Today, consumers demand versatility. We’re seeing people shift their focus to devices with larger, wider screens that allow them to easily access the content they want, anywhere and anytime.

Last year, we added our four-in-one, high-performance Chromebook — [Google Pixelbook](https://store.google.com/us/product/google_pixelbook) — to the Chrome OS family. This October, we introduced the first-ever premium tablet made by Google to run Chrome OS: [Google Pixel Slate](https://store.google.com/us/product/pixel_slate?hl=en-US). Along with a rich display and performance that’s ideal for using mobile apps, the Pixel Slate also comes with a detachable keyboard that gives users a familiar laptop feel.

![Pixel Slate device in its different configurations with and without the detachable keyboard](/images/posts/why-your-app-should-be-optimized-for-screens-of-all-sizes/pixel-slate.jpg)

Like other devices powered by Chrome OS, both of these devices combine access to millions of mobile apps with a brilliant, large-screen display. Developers can reach even more users by [adapting their apps for Chrome OS](/{{locale.code}}/android/optimizing) in different ways:

1. Optimizing designs for wider screens
2. Landscape mode
3. Multi-window management
4. Keyboard, mouse, and stylus input

## How leading dev teams have optimized for Chrome OS

### Gameloft’s Asphalt 8: Airborne

Asphalt 8: Airborne is a racing game that’s all about extreme speed and complete control. The design team at Gameloft always wants its games to be available on the latest portable hardware, so as soon as the Chromebook hit the market, the team saw a new home for its Asphalt series.

Because Chrome OS treats a physical keyboard just like an external keyboard on an Android phone, Asphalt 8: Airborne could [support keyboard controls using APIs](/{{locale.code}}/android/input-compatibility) from the [Android Platform SDK 26](https://developer.android.com/studio/releases/platform-tools). This also enabled the UI to automatically switch between touchscreen and keyboard mode. After making the adjustments, Gameloft was able to run Android application packages at even higher performance levels than Chrome apps, allowing it to maintain the series’ breathtaking graphics and breakneck speeds on Chrome OS. Even better, it only took Gameloft’s developers a few days to completely integrate the new control schemes to the game.

After the optimizations, Asphalt 8 saw a 6X increase in daily active users and a 9X boost in revenue from Chrome users. Now, designing for larger screens is a rule of thumb at Gameloft — the latest edition of the series, Asphalt 9: Legends, is now [available on the Chromebook](https://play.google.com/store/apps/details?id=com.gameloft.android.ANMP.GloftA9HM&hl=en_US).

### Evernote and Slack

One of [Evernote’s](/{{locale.code}}/stories/evernote) key features is translating touchscreen handwriting into text, which people tend to use more often on larger screens. To make its app even easier to use across devices and platforms, Evernote’s development team used Google’s low-latency stylus API to quickly implement touchscreen handwriting and enhanced layouts for larger screens. The API allows apps to bypass parts of the OS and draw directly on the display, so Evernote users feel like they’re actually drawing and writing on paper.

Thanks to its new Chrome OS experience, the average Evernote user is spending 3X more time on larger screen devices and 4X more time when using the Google Pixelbook.

Meanwhile, the development team at Slack optimized its popular messaging app for Chrome OS by setting up keyboard shortcuts for its most commonly used functions. When users write a message on a Chromebook, they can simply hit the [[enter]] key — just like you would on mobile — rather than taking the extra step to click “Send” with their mouse.

@[youtube](https://www.youtube.com/watch?v=YlQVNyTDI6Y)

### 1Password

1Password worked with the Chrome OS team to drastically improve its user experience in just six weeks. To ensure the app made the best use of [window space at any screen orientation and size](/{{locale.code}}/android/window-management), the development team combined its existing designs for phones and tablets to deliver a responsive layout when users resized the app window. The team also used Chrome OS’s drag-and-drop feature so app users can easily drag content between 1Password and other Android apps on Chrome OS.

![1Password app in different configurations in different device modes](/images/posts/why-your-app-should-be-optimized-for-screens-of-all-sizes/1password.jpg)

Finally, the team enhanced support for keyboard and trackpad input so people can navigate the app without taking their hands off the keyboard. This created a more desktop-like experience on mobile, allowing users to use direction keys and keyboard shortcuts to trigger actions. Since implementing these new improvements, 1Password has seen more than 22.6% more installs on Chrome OS devices.

## Deliver the experience your app users demand

In a world where consumers increasingly demand versatility, it’s important for developers to expand their strategies beyond mobile and serve users on a variety of devices. It’s crucial to consider whether your app is set up to deliver the most engaging experiences for every user — no matter their device or screen size. Doing so may mean the difference between driving growth and missing out on a plethora of new customers.
