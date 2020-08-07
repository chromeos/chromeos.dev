---
title: Android development
metadesc: This document will teach you how to install Android Studio and Flutter on Chrome OS.
date: 2020-06-08
weight: -7
tools:
  - name: Android Debug Bridge (ADB)
    url: https://developer.android.com/studio/command-line/adb
    versions:
      min: any
---

Chrome OS devices bring the unique benefit that you can build Android apps on them, and you can run Android apps on Chrome devices as well. You can deploy directly to the device you are coding on, which can make building and testing easier.
Testing your app on Chrome OS helps you better understand the user experience and how to optimize your app’s experience for [large screens](/{{locale.code}}/android/design#layouts-for-larger-screens) and [input support](/{{locale.code}}/android/input-compatibility). Additionally, you will be able to deploy and test your app from your Chrome OS device to a phone, tablet, or another Chrome OS device.

### Install Android Studio on Chrome OS

Android Studio has been officially supported on Chrome OS since [version 3.5](https://developer.android.com/studio/releases#chrome-os-support). To install Android Studio please follow the Android Studio [Chrome OS install instructions](https://developer.android.com/studio/install#chrome-os).

#### System requirements for Android Studio

- 8 GB RAM or more recommended
- 4 GB of available disk space minimum
- 1280 x 800 minimum screen resolution
- Intel i5 or higher (U series or higher) recommended

#### Recommended devices for Android Studio

- **Acer:** Chromebook 13/Spin 13, Chromebox CXI3, Chromebook 712 [C871]
- **ASUS:** Chromebox 3, Chromebook Flip C436FA
- **CTL:** Chromebox CBx1
- **Dell:** Inspiron Chromebook 14, Latitude 5300 2-in-1 Chromebook Enterprise, Latitude 5400 Chromebook Enterprise
- **HP:** Chromebook x360 14, Chromebox G2, Chromebook x360 14c
- **Lenovo:** Yoga C630 Chromebook, Flex 5 Chromebook
- **ViewSonic:** NMP660 Chromebox

### Install Flutter on Chrome OS

Along with using Android Studio on your Chromebook, you may also want to use Flutter to help you build beautiful and fast experiences into your Android and Chrome OS apps. Flutter provides additional support and tooling tailored specifically for keyboard and mouse input and window management which are important to support when adapting your app from a traditional Android phone experience to a Chromebook experience.

Find out more about why [Flutter and Chrome OS are better together](/{{locale.code}}/posts/flutter-and-chromeos-better-together). To start using Flutter on Chrome OS, follow the [Chrome OS install instructions](https://flutter.dev/docs/get-started/install/chromeos) on the Flutter site.

### Android Emulator support

Supported Chromebooks can now run a full version of the Android Emulator, which allows developers to test apps on any Android version and device without needing the actual hardware. Android app developers can simulate map locations and other sensor data to test how an app performs with various motions, orientation, and environmental conditions. With the Android Emulator support in Chrome OS, developers can optimize for different Android versions and devices — including tablets and foldable smartphones — right from their Chromebook.

#### Supported devices for the Android Emulator

- **Acer:** Chromebook 712 [C871]
- **ASUS:** Chromebook Flip C436FA
- **Dell:** Latitude 5300 2-in-1 Chromebook Enterprise, Latitude 5400 Chromebook Enterprise
- **HP:** Chromebook x360 14c
- **Lenovo:** Flex 5 Chromebook
