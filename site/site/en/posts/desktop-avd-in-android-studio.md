---
title: Desktop AVD in Android Studio
metadesc: Learn how Desktop AVD in Android Studio helps you validate your Android app’s experience for desktop users on ChromeOS.
tags:
  - announcement
  - android studio
  - developer tools
  - technical
  - android
  - large screens
  - window management
  - input devices
authors:
  - fahdi
  - hirono
date: 2022-05-05
---

We, at Chrome OS, are committed to enhancing developer tools and frameworks that enable Android app developers to optimize their apps for Chromebooks seamlessly. Today, we’re thrilled to add to their developer tools with the addition of a Desktop Android Virtual Device (AVD) running Android 12 with the Electric Eel canary release of Android Studio.

For years, Chrome OS has offered users the ability to easily install and enjoy Android apps. Be it watching the latest TV series on Netflix, listening to your favorite music playlist or podcast on Spotify, or hanging out with your friends in one of the millions of experiences on Roblox, Chrome OS has got them covered with the apps they love.

Large screen Android devices are becoming an increasingly popular way for users to run Android apps, with a 50% YoY growth[^1] of users engaging with Android apps on Chrome OS last year. However, the Android app experience on Chromebooks is not always completely satisfying for users, as most Android apps and games are not optimized for large screens. Apps run into a variety of compatibility issues which directly impact user experience and satisfaction.

As more developers optimize their apps for Chromebooks, they are looking to test and validate their app experience on Chromebooks. Today, that journey for developers includes purchasing a physical Chromebook device, setting it up in their development environment, and finally deploying the app to the Chromebook for testing. That’s a lot of friction. We agree. It shouldn’t be that hard. With the launch of Desktop AVD, developers can now test their apps in a desktop environment without all that extra work.

## Running apps on an emulator

Android apps can run on a variety of form factors, and it’s impractical for developers to physically own each device. That’s why, for years, Android Studio has offered Android developers the ability to install and test apps on emulators across different form factors, including phones, tablets, Wear OS, Android TV, and Android Auto devices. This has enabled developers to simulate both hardware and software characteristics of these Android devices and environments. In addition to these form factors, we are expanding the emulator support to include desktop devices that can run Android apps, such as Chromebooks.

With the Desktop AVD in Android Studio, Android developers can get a taste of how Android apps function on a desktop, including some unique characteristics of desktops such as freeform window resizing and drag and drop. This enables developers to validate that their app responds accurately to app resize events, renders fine in a landscape mode, and keyboard and mouse input works as expected across the app. We have included a handful of things below you should test with your app on the Desktop AVD.

By validating the app experience on the Desktop AVD, developers can feel confident in providing a superior user experience to users on Chromebooks.

## Desktop emulator

In the Desktop AVD, apps launch in freeform windowing mode. In this mode, all apps show a caption bar allowing actions like maximize, minimize and close. Desktop AVD also introduces a taskbar on the bottom of the screen that you can use to switch between running apps by clicking their app icon. Quick settings and notification panels can be accessed from the system tray in the bottom right, instead of the traditional swipe down from top action on other touch-first devices.

![Desktop Android Virtual Device showing three apps running simulatenously in their respective windows.](ix://posts/desktop-avd-in-android-studio/freeform_windows.png)

## Try it out yourself

Over the years, we have identified common compatibility issues for Android apps on Chromebooks. Try out these actions with your app using the Desktop AVD and validate that your app behaves as expected on desktops.

### App resizing

Activities receive resize requests more frequently in a desktop environment like Chromebooks than on a phone or tablet. Try freeform resizing your app by dragging the window edges, and learn more about [`resizeableActivity`](https://developer.android.com/guide/topics/large-screens/multi-window-support#resizeableActivity).

![Desktop AVD showing an app being resized by dragging the edges of the window.](ix://posts/desktop-avd-in-android-studio/resizing-large.gif)

### Activity and display size

Another common issue we observe is that apps assume the display size and activity size to be the same, and render the app UI based on the display size. This assumption does not hold true for apps running in freeform windowing mode, or even on other Android large screens like tablets and foldables where apps may run in split screen mode. This is a [window management](https://chromeos.dev/en/android/window-management#window-dimensions) issue, and should be looked at as well.

### Freeform window management

Freeform window management gives users more freedom about how to place apps on their Chromebooks. Users may transition between several window states such as maximize, minimize or restore apps.

![Desktop AVD showing an app being launched, maximized and minimized using the buttons on the caption bar.](ix://posts/desktop-avd-in-android-studio/maximize-large.gif)

### Notifications

On phones, tablets, and foldables, app notifications are typically accessed by swiping down from the top. On desktop devices like Chromebooks, notifications are usually accessed from the system tray. Make sure to check how your app notifications render on a desktop like device, and that it doesn’t lead to any hiccups for users interacting with them.

![Desktop AVD displaying notifications being accessed using the bottom system tray.](ix://posts/desktop-avd-in-android-studio/panels.png)

## Try out the Desktop AVD

We bet you’re excited to try this out. Follow these steps to get Desktop AVD today:

- Install the [canary version of Android Studio (Electric Eel release)](https://developer.android.com/studio/preview?gclid=Cj0KCQjw06OTBhC_ARIsAAU1yOV0YRMFpeau4kIouhC7wcv7spuc3nyR-S0bgdcvIJuJNKP-EC-KrVwaAohAEALw_wcB&gclsrc=aw.ds)
- Navigate to **Tools > AVD Manager**
- Click on **Create device**
- Select **Desktop** in the category list
- Choose an AVD profile, then click **Next**
- Select an image, then click **Next**
- Click **Finish**

![Virtual Device Configuration window in Android Studio showing Desktop device definitions. A medium Desktop profile is selected.](ix://posts/desktop-avd-in-android-studio/howtocreate.gif)

To learn more about deploying your app to an AVD, or launching the Desktop AVD from Device Manager, read the [create and manage virtual devices](https://developer.android.com/studio/run/managing-avds) documentation.

!!! aside.message--note
**Note:** The Desktop AVD supports the Google Play services but does not include the Google Play Store app. The Desktop AVD images are not signed with a release key enabling developers elevated privileges (root) to aid with app troubleshooting.
!!!

If you have any feedback on Desktop AVD, follow these [instructions](https://developer.android.com/studio/report-bugs#emulator-bugs) to report a bug.

[^1]: Source: 2021-22 Google Internal Data
