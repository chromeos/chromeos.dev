---
title: Android 13 on the Desktop AVD
metadesc: Learn how Android 13 impacts the Desktop AVD when testing and optimizing your Android app's experience on ChromeOS.
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
  - jhale
date: 2023-11-09
---

At ChromeOS, we strive to bring the community impactful tools that will enable Android developers to adapt their apps for Chromebooks—and enhance the overall experience of building for [large screen experiences](https://developer.android.com/large-screens).

Over the last year, the team has worked on bringing Android 13 to the Desktop AVD, along with some additional enhancements to input support within the emulator. The Android 13 release of the Desktop AVD is now available within Android Studio. To test using this emulator, [create a new virtual device](https://developer.android.com/studio/run/managing-avds).

## What is the Desktop AVD?

Android Studio comes bundled with various virtual devices that run on different API levels and architectures. These emulators help developers test Android apps across a variety of devices, allowing for testing across different screen sizes, form factors, and APIs.

When an Android app runs on a Chromebook, it uses functionality that mirrors desktop behaviors, such as minimizing, maximizing, or resizing to a user-specified size. The Desktop Android Virtual Device (AVD) is an emulator that allows testing in a freeform windowing mode, similar to a Chromebook, to support this functionality.

!!! aside.message--note
**Note:** For a deeper dive into the Desktop AVD, check out [Desktop AVD in Android Studio](/{{locale.code}}/posts/desktop-avd-in-android-studio).
!!!

![The Desktop AVD emulator, rendering a clock app, browser window, and downloads folder in freeform windowing mode.](inline.png)

## What enhancements come with Android 13?

Most laptops use a keyboard—and it's a common input device for increased productivity with tablets and foldables. Prior to Android 13, the Desktop AVD relied solely on uncustomizable input mapping built into Android Studio, which can cause friction points for users who rely on physical devices for mapped input and shortcuts. The Android 13 release of the Desktop AVD adds support for common keyboard interactions with Android apps. You can now test shortcuts, support keys, and mouse support to help you adhere to the [large screen app quality guidelines](https://developer.android.com/docs/quality-guidelines/large-screen-app-quality#large_screen_ready_tests).

### Shortcuts

The majority of apps within Google Play are designed for mobile usage and as such do not always support keyboard interactions. In Android 13, the Desktop AVD adds support for commonly used shortcuts, such as [[Ctrl]]+[[C]] (Copy) and [[Ctrl]]+[[V]] (Paste). These shortcuts can be used when copying text within a `TextView` or pasting text into an `EditText` widget. These shortcuts are intercepted by the system and automatically applied.

Custom shortcuts (which are not intercepted by the system) are also included in this release. An example of this type of shortcut: a media player app that uses the [[Spacebar]] to play or pause media. You must use the new Hardware Input feature within Android Studio Hedgehog to use custom shortcuts. This will allow Android Studio to pass custom shortcuts directly to the emulator. If this is not enabled, Android Studio may consume the key combination.

### Support keys

Android 13 supports additional keymappings for support keys. These keys are mapped to controls that are similar to experiences for keyboard shortcuts on a desktop. Some examples of these support keys include:

- **Esc:** Dismisses pop-ups and notifications.
- **Delete / Backspace:** Deletes text within an `EditText` field.
- **Arrow Keys:** Provides in-app navigation ([[&uarr;]]/[[&darr;]] to scroll).

### Mouse support

In addition to enhanced keyboard support, there are additional mouse controls integrated into the Desktop AVD. Using the scroll wheel within an Android app will send a mouse scroll event to the app. Right-clicking on a mouse will send a right-click event—which can be used to show context menus, if the app supports it.

## Where can you start?

To create high quality large screen apps across all form factors, there is additional guidance provided for [large screen app quality](https://developer.android.com/docs/quality-guidelines/large-screen-app-quality). This guidance outlines a comprehensive set of quality requirements for most types of Android apps. Not all requirements need to be met, but it's best practice for you to adhere to the requirements that make sense for your apps.

Create a desktop emulator today in [Android Studio Hedgehog](https://developer.android.com/studio/preview) to see how your Android app responds to keyboard and mouse inputs and freeform window resizing.
