---
title: High engagement, larger screens
metadesc: Android fuels mobile apps on devices that range far beyond your typical small-screen smartphone.
tags:
  - leader's corner
  - trend
  - large screens
  - window management
  - mouse support
  - keyboard support
  - android
  - optimization
authors:
  - allanl
date: 2019-10-24
---

_This article originally appeared on Android Developers Blog._

Android fuels mobile apps on devices that range far beyond your typical small-screen smartphone, from new Chromebooks like the lightweight, high-performance [Google Pixelbook Go](https://store.google.com/us/product/pixelbook_go) to multi-display devices and foldable phones like the [Samsung Galaxy Fold](https://www.samsung.com/us/mobile/galaxy-fold/). Not to mention the [more than 175M Android tablets](/{{locale.code}}/posts/expand-your-app-beyond-mobile-to-reach-android-users-at-large) that have the Google Play Store installed.[^1]

[^1]: The number of tablets only accounts for devices that have the Google Play Store installed (e.g., excluding tablets in China); the actual number of tablets capable of running Android applications is much larger.

These large-screen devices set the stage for more engaging and visually immersive experiences, whether by [creating a larger canvas for creativity](/{{locale.code}}/stories/concepts) or by giving users [faster, more flexible ways to work](/{{locale.code}}/stories/infinite-painter). As we’ve continued to prioritize large-screen devices with OEM partners like Samsung, Asus, and Lenovo, we’ve been able to expand our reach to a huge new audience of users.

During the week of Black Friday in 2018, 1 in 3 notebooks sold in the U.S. were Chromebooks.[^2] Chromebook unit sales also increased 22% YoY, while the rest of the notebook category decreased -6.1%.[^3] And we’re not just reaching more users — we’re reaching more _engaged_ users. In fact, in just the last year, the total amount of time spent in Android apps on Chrome OS has grown 4X.[^4]

[^2]: The NPD Group, Inc., Retail Tracking Service, U.S., Notebook Computers, Chrome OS, based on units, Nov. 18, 2018–Nov. 24, 2018 vs. Nov. 19, 2017–Nov. 25, 2017.
[^3]: The NPD Group, Inc., U.S. Retail Tracking Service, Notebook Computers, based on units, Sept. 2018–Aug. 2019. Sales are adjusted for 5 weeks in Jan. 2018 vs. 4 weeks in Jan. 2019.
[^4]: Google Internal Data, March 2018–March 2019.

![YoY notebook sales in the U.S.](ix://posts/high-engagement-larger-screens-how/yoy-notebook-sales.gif)

By making adjustments for larger screens, you can provide richer experiences across all these devices and tap into a wider audience of app users. Development teams around the world — including Adobe Lightroom, [Evernote](/{{locale.code}}/stories/evernote), and [Gameloft](/{{locale.code}}/stories/asphalt-8), among many others — have already seen some incredible results:

## App developers driving engagement on larger screens

With the goal of allowing users to play any video file, anywhere, on any device or screen size, the developers at VideoLAN project [decided to adapt VLC](/{{locale.code}}/stories/vlc) — an open source, cross-platform multimedia player — for all screens. The team started by adding keyboard and mouse support before designing multiple versions of the layout to allow users to easily scale and resize the app.

Users can now enjoy the same immersive experience across a range of different devices and form factors, and VideoLAN has already received overwhelmingly positive feedback from users around the world.

[War Robots](/{{locale.code}}/stories/war-robots) — a 12-player real-time battle game developed by Pixonic — was originally designed for early-generation phones. The team enabled windowed gameplay so users could play in one window while watching their favorite streamers or upgrading their robots in another, created new tutorials and controls that appear whenever players switch between desktop and tablet mode, and added support for keyboard and mouse input.

More than 100,000 players have already played War Robots on Chrome OS since Pixonic rolled out the latest optimizations, which made War Robots’ battles even more thrilling and engaging on larger screens, and Pixonic has seen 25% longer user sessions on Chromebooks as a result.

## Is your app optimized for large-screen devices? Here are a few things to consider

### 1) Laptop and tablet mode

Test your core app functions to make sure everything works smoothly without crashing as users switch between different modes.

### 2) Window management and layout

Support multi-window mode and free-form window resizing, and be sure to design optimized layouts for both landscape and portrait orientations. Set up your app to correctly handle configuration changes to avoid crashes when people rotate their devices.

![Suite of devices](ix://posts/high-engagement-larger-screens-how/suite-of-devices.png)

### 3) Keyboard and mouse input

Make sure your app is fully functional without touch input, and add support for keyboards, mice, and game controllers (if applicable).

### 4) Hardware support

If you’re using NDK, be sure to support x86 (32 and 64bit) ABIs to ensure the highest possible performance.

## Build, test, and run Android apps on a Chromebook

From the start, our goal has been to make the Chromebook a simple, secure, and speedy environment for everyone. The launch of [Linux on Chrome OS](/{{locale.code}}/linux) allowed Android developers to build and test apps with a Chromebook. And earlier this year at I/O, we announced that [Android Studio 3.5 now fully supports Chrome OS](/{{locale.code}}/posts/chromeos-io-19) with a simple one-click installation.

Since then, we’ve been working on a few improvements that make Chromebooks an even better place for safe and seamless Android app development. Let’s start with the biggest one:

### Deploying an app directly to Chrome OS to enable full Android development

In the past, you could only test your apps by deploying them to Android phones. With Chrome OS’s upcoming M80 release, you’ll be able to deploy Android apps directly to your Chromebook. That way, you can develop and test your app on the same machine, all without a connected device or needing to put your laptop in developer mode. Developers can start testing this feature in developer channel in November.

### GPU acceleration for a snappier, jank-free UI (now in beta channel)

We’ve enabled GPU support to reduce latency and deliver a snappier UI. That goes for developer apps such as Android Studio, Unity Editor, or Visual Studio Code. And for developers who also work on web apps, GPU acceleration means faster testing with Chrome Canary or Firefox.

### Container backup and restore to easily move between devices

Previously, Linux files and apps were tied entirely to the device — if you lost your device, you lost all the work inside of it. Now, Chrome OS’s container-based architecture allows you to pack up your entire workspace and export it to external storage or Drive. The backup file can be restored at any point, either on the same machine — which is helpful when jumping back to a previous state — or to move to another Chromebook.

You can now find import and export buttons in your Linux settings.

### Picture-in-picture (PiP) support

If you’ve built PIP support into your Android apps, you’ll see that function work seamlessly in Chrome OS in 2020. But you can start testing this feature now by enabling PiP in Android settings → Developer options.

## Build your apps with larger screens in mind

With millions of users on Chromebooks, tablets, foldables, and now multi-display devices, designing app experiences with larger screens in mind is crucial. Seize this opportunity to engage more users by optimizing your existing apps to work great across all screens. And the latest Linux features on Chrome OS give you the power to use a single machine to build and run Android apps. Don’t hesitate to take action to ensure your apps work seamlessly on larger screens with Linux on Chrome OS.
