---
title: Optimizing Android app experiences for Chrome OS
metadesc: Learn about ways to optimize your Android app for a richer user experience on Chrome OS.
tags:
  - technical
  - trend
  - android
  - keyboard support
  - trackpad support
  - large screens
authors:
  - nataliagvak
hero:
  image: ix://posts/optimizing-android-app-experiences-for-chromeos/hero.png
  alt: Illustration of smartphone, laptop, and tablet devices with dotted line connections.
date: 2019-09-09
---

_This article originally appeared on Google Play Medium._

From releasing our first-ever tablets and detachables to launching Chromebooks in new markets like [Japan](https://www.google.com/intl/ja_jp/chromebook/) and [Germany](https://www.google.com/intl/de_de/chromebook/), we’ve worked hard to adapt the ecosystem of Chrome OS devices to today’s app users. And as people increasingly use apps on devices with larger screens and versatile form factors, we’ve been able to engage a huge new group of users.

Android powers a growing variety of large-screen devices, from tablets and foldables to Chrome OS laptops. Because Chromebooks specifically run a full version of the Android framework inside a container, most Android apps already run on Chrome OS. That means devs can take their single Android APK and scale it to work on any Chrome OS device, allowing for even more immersive and engaging experiences on devices with bigger screens.

> Devs can take their single Android APK and scale it to work on any Chrome OS device, allowing for even more immersive and engaging experiences on devices with bigger screens.

Total time spent in Android apps on Chrome OS has also grown 4X in the last year,[^1] and in Q4 2018, 21% of notebooks sold in the U.S. were Chromebooks — a 23% YoY growth.[^2]

[^1]: Google Internal Data, March 2018 to March 2019.
[^2]: The NPD Group, Inc., Retail Tracking Service, U.S., Notebook Computers, Chrome OS, based on units, Oct. 8, 2017- Jan. 6, 2018 vs. Oct. 7, 2018- Jan. 5, 2019

Delivering an optimal experience on Chrome OS only takes a few tweaks, but they make a major impact. After Gameloft and TopHatch optimized their apps for larger screens, Gameloft’s [Asphalt 8](/{{locale.code}}/stories/asphalt-8): Airborne drove 6X more daily app users and 9X more revenue on Chrome OS devices, while TopHatch has seen twice as many paid conversions on Chromebooks and 20X more time spent on Pixelbooks for its [Concepts](/{{locale.code}}/stories/concepts) app.

[At I/O this year](https://www.youtube.com/watch?v=06xJOOs_KvQ&list=PLNYkxOF6rcIBqW90ghQOTs9MqN5KxqESw), we broke down some helpful steps to ensure your app will look and work great across a variety of form factors and screen sizes. Check out the highlights below along with a couple exciting new updates for Android developers in Chrome OS.

## Optimizing your app experience for Chrome OS

The way someone uses your app depends entirely on his or her device. There are a few things you should consider to ensure your app delivers an optimal user experience:

### Keyboard input

If your app doesn’t already support keyboards, here’s the code to make sure it does:

```kotlin {title="Sample Kotlin" .code-figure}
override fun onKeyUp(code: Int, ev: KeyEvent?): Boolean {
  return when (code) {
    KeyEvent.KEYCODE_J -> {
      // Do something here
      true
    }
      else -> super.onKeyUp(code, ev) // Important
  }
}
```

The `// Important` line is a way to pass unused keys up to super. This allows Chrome OS to handle those commands rather than negate the functionality of every unassigned key.

### Refresh key

The Chrome OS keyboard has a special refresh key with its own keycode (`KEYCODE_REFRESH`), so make sure your app can handle `KEYCODE_REFRESH` events. If you’re already using `SwipeRefreshLayout`, Chrome OS is wired to ensure that layout will work automatically with the refresh button.

### Touchpad

When someone’s using your app on desktop with a touchpad, they’ll expect to scroll with a two-finger touchpad swipe. But on mobile, users typically scroll by holding and dragging the screen. Chrome OS automatically interprets these types of different motion events so, for example, a drawing app won’t mark on the screen when someone tries to scroll on mobile.

For apps that require more advanced touch motion events, you can use `ignore MotionEvents when (event.getButtonState() == 0)` to check the button state and ignore undesired events (as in drawing app example above).

### NDK

Games and apps on Chrome OS automatically receive ARM to x86 translation. But if performance is your priority, it’s essential to support x86. [Most of the top Chrome OS devices](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices) have 64-bit x86 chipsets and more are on the horizon. To provide the best performance and support across all devices, be sure to provide ARM, ARM64, x86, and x86_64 build targets if you have Android NDK code.

Android Studio makes supporting this simple: Using Android app bundles, it packages all your build targets up ready for the Play Store, which then only sends the build targets your app users need to keep download sizes at a minimum.

### Layout

You’ve probably seen a mobile app that hasn’t been designed for a larger screen — lots of wasted space and clunky navigation. To ensure your app looks great on several layouts, you can use one resource file with multiple layout buckets for each screen size.

![Multiple activity_main.xml files for different layouts](ix://posts/optimizing-android-app-experiences-for-chromeos/multiple-activity-main-xml.png)

### Navigation patterns

Your app should also be easy to use on different screen sizes. [Build for portrait, landscape wide portrait, and wide landscape layouts](https://github.com/google/chromeosnavigationdemo) by switching between a bottom navigation, side navigation, and expanded side navigation pattern, depending on the available screen width.

Reply, an email app, [redesigned its layout](https://material.io/design/material-studies/reply.html#about-reply) for functionality and ease-of-use on multiple screens, and while Adobe Acrobat optimized its app functionality for Chrome OS, the brand also redesigned its entire layout for different devices.

![Different navigation patterns on different screen sizes and orientations](ix://posts/optimizing-android-app-experiences-for-chromeos/navigation-patterns.png)

### Multi-monitor

When someone uses multiple monitors, there will typically be a density difference between the two screens. Change your app density on the fly by listening to “density” `onConfigurationChanged` changes inside your Chrome activity.

## New updates for developing on Chromebooks

At I/O, we also [announced more ways](/{{locale.code}}/posts/chromeos-io-19) we’ve made Chrome OS a faster, simpler, and more secure environment for Web and Android developers, including:

### One-click installation for Android Studio

Just download, click, and install — no more using a terminal.

### Improved ADB over USB debugging

No more developer mode — simply plug in your phone and debug via USB on [supported devices](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-adb-debugging-over-usb).

### Lint checks

Highlights locked or unfriendly orientations, non-resizable activities, incorrect hardware requirements, and other features that aren’t ideal for Chrome OS.

### Audio playback in Linux

The Chrome OS container supports all audio tools from Linux, such as Audacity.

### Virtual desktops

A flag in M76, our current stable channel, enables turning on a virtual desktop when your screen gets clogged with different windows and platform use cases.

### Multi-monitor/full HDCP support

Project and watch DRM-protected video content on external monitors.  
_\*Use the `SurfaceView.setSecure()` to take advantage of this feature_

### ARCore integration

ARCore is available to applications with a world-facing camera.

### Instant app support

Users on Android P devices can now [try an app or game without installing it first](https://developer.android.com/topic/google-play-instant).

### External storage for Android apps

External discs can be read and scanned by Android apps.

### Play files

The file manager from Chrome OS can show the `/sdcard` folder from Android under play files, enabling access to read and write Android files from the Chrome container.

### Android Cloud storage with DocumentsProvider and Custom document provider apps

Support for the Android `DocumentsProvider` interface in Chrome OS.

### Profiling your app to detect animation jank

An integrated profiling tool allows devs to monitor system status over time — including buffer use, v-syncs, CPU use, GPU and CPU frequency, and system temperature — to see what’s causing animation jank and/or system slowness.

## Deliver an optimal experience on every screen

The app experience has expanded far beyond mobile. In an era of versatile devices and variable form factors, users will expect a well-designed, user-friendly experience every time they open your app. Take advantage of the opportunity to support various input methods, optimize your layout and navigation for a variety of screen sizes, utilize extra screen real estate, and support x86 with Android NDK code.

If you’d like to hear more about building Android apps for Chrome OS, [check out our full session](https://www.youtube.com/watch?v=06xJOOs_KvQ&list=PLNYkxOF6rcIBqW90ghQOTs9MqN5KxqESw) from I/0 2019.
