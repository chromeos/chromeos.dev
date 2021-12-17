---
title: More tools for Android developers
metadesc: Learn about additional tools useful for Android development.
date: 2020-07-15
weight: -4
tags:
  - developer tools
  - flutter
---

There are many additional tips and tools available to Android developers to debug and build apps for Chrome OS devices.

## Android developer options

You can configure additional Android developer options:

1.  Open Settings
2.  Navigate to **Apps** and select **Google Play Store**.
3.  Click **Manage Android preferences** to bring up the Android settings. You may want to right-click on the Android settings icon in the shelf and pin it there to get faster access in the future.

![The Chrome OS and Android settings icons look very similar, but for Android settings, the gear is slightly larger and the background color is green.](ix://develop/android/developer-options/android_settings.png)

4.  Go to **System**, you should see the **Developer options** menu. If you don't, then do the following:
    - Click **About device**.
    - Click **Build number** seven times to move into developer mode.
    - Click the arrow in the top-left area of the window to go back to the main System screen.
5.  Click **Developer options** and choose the configuration you need, one flag that might be particularly useful is:
    - **Show debug information in caption title** - Displays debugging information for Android applications in the window title bar.

## Install Flutter on Chrome OS

Along with using Android Studio on your Chromebook, you may also want to use Flutter to help you build beautiful and fast experiences into your Android and Chrome OS apps. Flutter provides additional support and tooling tailored specifically for keyboard and mouse input and window management which are important to support when adapting your app from a traditional Android phone experience to a Chromebook experience.

Find out more about why [Flutter and Chrome OS are better together](/{{locale.code}}/posts/flutter-and-chromeos-better-together). To start using Flutter on Chrome OS, follow the [Chrome OS install instructions](https://flutter.dev/docs/get-started/install/chromeos) on the Flutter site
