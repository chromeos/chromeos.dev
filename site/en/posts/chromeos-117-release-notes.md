---
title: 'ChromeOS 117 release notes'
metadesc: 'ChromeOS 117 includes timelapse recording, Bluetooth stack updates, and new themes and personalization.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2023-09-28
---

ChromeOS 117 reached stable release on September 19, 2023. Features include a new timelapse recording feature, updates to the Bluetooth stack, and new themes and personalization options with Google Material 3.

## Record Timelapse video in Camera App

Take timelapse video without leaving the built-in Camera App on your ChromeOS device. To use this feature, open the **Camera** **App**, select **Video**, and then select **Timelapse**. Camera App determines the right speed for the timelapse video based on duration recorded—and you can record for as long as you have space available on your device.

![Timelapse mode in the built-in camera app, showing a timelapse video of a pink flower surrounded by green leaves. The timelapse option is available under the Video category after Normal and GIF.](Chrome-117-timelapse.png)

## Enjoy new themes and personalization with Google Material 3

Control the look of your ChromeOS device using the new **ChromeOS Personalization App**. Thanks to [Google Material 3](https://m3.material.io/), Google's new design platform, ChromeOS 117 brings with it:

- A new set of themes which dynamically update to reflect your wallpaper and style.
- A new look for almost all system surfaces with updated text, menus, icons or elements.

## Preserve battery health with Adaptive Charging

Adaptive Charging is a new ChromeOS power management feature. Devices with **Adaptive Charging** enabled via **Settings** will charge to 80% and then complete charging to 100% based on an ML model's prediction for when you will unplug your device. Reducing the time a device spends at 100% charge helps preserve the battery's health and its ability to hold a charge over the lifetime of the device.

## Built-in color correction settings for enhanced accessibility

ChromeOS now has built-in color correction settings that make it easier to see colors on your screen. In **ChromeOS Accessibility** settings, under **Display and Magnification**, you can enable color filters for protanopia, deuteranopia or tritanopia, or to view the display in grayscale. Use a slider to customize the filters' intensity to meet your needs.

## Enhanced options in clipboard history

ChromeOS 117 introduces enhancements to Clipboard History, including new entry points, ways to discover the feature, and simplifying feature comprehension—making it easier to discover and use. You can now see more detail for items in your clipboard history and access clipboard history items nested directly in context menus.

## Android 13 starts rolling out to ChromeOS

Android 13 has started to roll out to ChromeOS. Test your app with Android 13 behavior changes—and develop with Android 13 APIs—by[setting up the Android 13 SDK](https://developer.android.com/about/versions/13/setup-sdk), using an Android Virtual Device (AVD), or testing on ChromeOS devices updated with Android 13.

!!! aside.message--note
**Tip:** Additional information about Android 13 can be found on the [Android 13 features and changes list](https://developer.android.com/about/versions/13/summary).
!!!

## Also released in ChromeOS 117

You'll find a few other quality-of-life features packed into ChromeOS 117, including an update to the Android Bluetooth stack, contextual battery state sounds, and GIF support within the Emoji Picker.

- **Update to the Android Bluetooth stack:** Starting in ChromeOS 117, and gradually applying to all ChromeOS devices, this Bluetooth software change brings the Android Bluetooth stack, Fluoride, to ChromeOS. The transition happens seamlessly on login, preserving existing paired devices, and should work with Bluetooth devices today with no interruptions. If you experience issues, please file feedback and, if necessary, disable the new stack via `chrome://flags/#bluetooth-use-floss`.
- **ChromeOS battery state sounds:** Audible sounds now indicate battery status. Users can turn on and off these sounds and Admins can control them using the `[DeviceLowBatterySoundEnabled](https://chromeenterprise.google/policies/#DeviceLowBatterySoundEnabled)` policy.
- **Emoji Picker with GIF support:** The emoji picker now supports GIFs. Search and find the perfect GIF to express yourself. For managed devices, this feature is disabled by default.
- **Up Next Calendar view with Join video call integration:** See your upcoming events directly from the calendar view and join any digital meetings directly with the new Join button.
- **ChromeVox dialog changes:** We've made some changes to the initial out-of-the-box experience (OOBE) dialog that explains what ChromeVox is, who might benefit from activating ChromeVox, and requires pressing space instead of offering an on-screen button. With this update, we hope to reduce the number of users who inadvertently activate ChromeVox.
- **System answer cards in Launcher search:** When you search for the status of your OS version, battery, RAM, storage, or CPU, in Launcher, you can now see that information previewed in the search results.
- **Avoid content control escapes on the login or lock screen:** Administrators can now control and limit the available content on end-users login and lock screens when identity federation is used with a third party identity provider (using SAML or OIDC), using two new policies: `[DeviceAuthenticationURLAllowlist](https://chromeenterprise.google/policies/#DeviceAuthenticationURLAllowlist)` and `[DeviceAuthenticationURLBlocklist](https://chromeenterprise.google/policies/#DeviceAuthenticationURLBlocklist)`.
- **Nudge managed users towards enrolling non-ZTE devices:** This feature enables administrators to demand managed users to enroll their non-zero touch devices by introducing a new user policy, `UserEnrollmentNudging`, which can be configured to require enrollment of the given user. If the policy is enabled and the managed user misses the enrollment step and performs first sign in on the device, a pop-up is shown suggesting to either switch to enrollment flow or use another email for sign-in, essentially preventing the managed user from signing in without enrollment.

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](/{{locale.code}}/subscribe) or join the [ChromeOS Discord](/discord).
