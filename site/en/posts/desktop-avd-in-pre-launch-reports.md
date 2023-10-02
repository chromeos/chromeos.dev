---
title: Desktop AVD in pre-launch reports
metadesc: Test application stability, performance, accessibility, and security with Desktop AVD in pre-launch reports.
tags:
  - android
  - optimization
  - developer tools
  - technical
  - large screens
  - window management
  - input devices
authors:
  - jhale
date: 2023-06-29
---

At ChromeOS, we are committed to enhancing the developer tools and frameworks that enable Android app developers to seamlessly adapt their apps for Chromebooks. In doing so, we explore ways to bring impactful tool sets to developers that enhance the experience of building for [large screens and ChromeOS](/{{locale.code}}/android/design).

There are two tools you can use together to gather a more comprehensive picture of your app quality: pre-launch reports and Desktop AVD (Android Virtual Device).

- **Pre-launch reports:** A crawl-based test of the application's stability, performance, accessibility, and security.
- **Desktop AVD:** An emulator that allows for the testing of applications in freeform windowing mode, with functionality that mimics desktop behaviors.

## What are pre-launch reports?

[Pre-launch reports](https://play.google.com/console/about/pre-launchreports/) are a free opt-in service within Google Play. The Play Console publishes a new report for each APK upload, giving you insight into various portions of your application along with critical metrics. After you upload a test APK or a test [Android App Bundle](https://developer.android.com/guide/app-bundle), Google Play then installs it on a set of Android devices in the test lab. The application is launched and crawled through for several minutes. Actions such as typing, tapping, and swiping are performed by the crawler.

Once the crawl has finished, the results are compiled into a pre-launch report. Issues that the crawler was able to identify are grouped into four categories: Stability, Performance, Accessibility, and Security and Trust. The report will also show you the number of devices an application was run on including a device breakdown.

### Stability

- **Errors:** Crashes, defective libraries, or the usage of restricted and unsupported APIs.
- **Warnings:** Slow startup/load times, usage of unsupported (but not restricted) APIs, or issues with sign-in, crawl, or memory.
- **App compatibility:** Potential OS issues or detection of an unsupported or non-SDK interface.

### Performance

- **[Average frames per second](https://developer.android.com/training/testing/performance.html):** Average rate at which frames are displayed (Note: these tests are only available for tests using game loops).
- **Average CPU:** Percentage of average CPU usage by your app.
- **[Average network sent/received](https://developer.android.com/topic/performance/power/network/index.html):** Average number of bytes per second sent or received by your app over a network connection.
- **[Average memory](https://developer.android.com/topic/performance/memory.html):** Average memory used with your app over the selected duration.

!!! aside.message--note
**Note:** These tests do not run on emulated devices.
!!!

### Accessibility

- **[Content labeling](https://support.google.com/accessibility/android/answer/7158690?sjid=12195638577274532122-NA):** Elements in your app that are labeled incorrectly for screen readers.
- **[Touch target size](https://support.google.com/accessibility/android/answer/7101858):** Elements in your app that do not meet the recommended touch target size.
- **[Implementation](https://support.google.com/accessibility/android/answer/6376559):** Layout issues that can make your app difficult to use for users with motor impairments.
- **[Low contrast](https://support.google.com/accessibility/android/answer/7158390):** Low contrast color issues in your app that may impact readability.

### Security and Trust

Your pre-launch report will include a list of security vulnerabilities discovered, including the name and description of the vulnerability. We recommend resolving these issues before publishing.

!!! aside.message--note

**Note:** For more information on pre-launch reports, [check out the deep dive from Google Play](https://play.google.com/console/about/pre-launchreports/)

!!!

## What is Desktop AVD?

Android Studio comes bundled with various virtual devices that run on different API levels and architectures. These emulators help developers test with devices that are not readily available, allowing for testing across various screen sizes and APIs.

Desktop AVD is an emulator that allows for testing in a freeform windowing mode, similar to a Chromebook. Android apps that are run on a Chromebook have functionality that mirror desktop behaviors, like minimizing and maximizing and resizing the app to a user-specified size.

!!! aside.message--bonus

**Bonus:** For a deeper dive into Desktop AVD, see [Desktop AVD in Android Studio](/{{locale.code}}/posts/desktop-avd-in-android-studio).

!!!

![Screenshot of the Desktop AVD emulator, rendering a clock app, browser window, and downloads folder in freeform windowing mode. Each is in a separate window.](ix://posts/desktop-avd-in-pre-launch-reports/freeform_windows.jpg)

## How do these work together?

Desktop AVD is now available as a device that runs when a pre-launch report is triggered. You are now given insight on how your application will run in a desktop form factor, with no additional lift.

Additionally, pre-launch reports show screenshots of how your application performs on that device. With the additional functionality of Desktop AVD to change the window size, pre-launch reports showcase how an application behaves, and looks, when it is minimized or maximized. Visual issues on how that particular app behaves can be seen in the various screenshots taken. Errors due to the application being resized will also be highlighted as part of the pre-launch report.

![Screenshot of Desktop AVD emulation settings, reflecting a Generic Small Desktop on x86 architecture.](ix://posts/desktop-avd-in-pre-launch-reports/small_desktop_image.png)

## What's next?

With the introduction of Desktop AVD in pre-launch reports, there is now more information on how an application performs in this larger form factor. A critical piece of closing this loop is ensuring that issues showcased through pre-launch reports regarding a given device are handled effectively for each app's unique situation. You have the ability to make your apps work in a more performant way when targeting these form factors, so long as the issues that arise are fixed.

Another great starting point is to use Desktop AVD as a target device when developing your applications. As with any device, the more you use the platform during your development cycle, the better your software performs against it.

Lastly, you could create custom [robo scripts](https://firebase.google.com/docs/test-lab/android/robo-scripts-reference) that can be input into pre-launch reports. You have the ability to create robo scripts that can target specific devices and handle nuances of that particular device form factor. As an example, you could create robo scripts that can target Desktop AVD to minimize, maximize, and resize your applications at various parts through the pre-launch report crawler cycle.

While pre-launch reports generate a lot of helpful information for you, it is not a catch all. You will still need to use best practices when it comes to testing their applications across the wide variety of form factors and device sizes that Android supports. Still, utilizing pre-launch reports is a great starting point to understand how a particular application works, and allows you to make your large screen applications even better.

To learn more about how to make Android apps shine when publishing for ChromeOS, check out the section of [ChromeOS.dev on publishing](//{{locale.code}}//publish).
