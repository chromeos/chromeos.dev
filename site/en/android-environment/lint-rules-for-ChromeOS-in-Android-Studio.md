---
title: ChromeOS lint rules in Android Studio
metadesc: An in-depth guide on how to improve the experience of large screens on 
ChromeOS with lint rules in Android Studio.
date: 2020-09-23
weight: 1
tags:
  - android studio
  - large screens
---

# ChromeOS lint rules in Android Studio

We, at ChromeOS, are committed to enhancing developer tools and frameworks that
enable Android app developers to optimize their apps for Chromebooks seamlessly.
In doing so, we need to look consistently at ways to bring impactful tool sets
to developers to enhance the experience of building for large screens and
ChromeOS.

ChromeOS has evolved through the years as new challenges have presented
themselves. One of these challenges is identifying critical issues to engineers
early and often. Lint rules are at the heart of quality, as they provide flare
signals to developers for issues that will arise if not remedied. Our updated
lint rules provide developers with more visibility into how their apps run on
ChromeOS, showcasing issues, both software and hardware, that will undoubtedly
cause issues for Android applications that are run on any ChromeOS device.

To get more background context on the existence of these lint rules and their
importance, read through our blog post.

# Where are these lint rules?

We have been in active development for a few months now. With the release
schedule of Android Studio, some lint rules are being introduced with the
Electric Eel Canary builds. A few of these lint rules are also now available in
the Flamingo Canary releases. We will continue to build towards having these in
the stable versions of Android Studio in the coming months.

Another major thing to note is that these rules will be ***enabled by
default*** in newer versions of Android Studio. The goal of this is to have more
strongly opinionated guidance on how we want to help engineers build for
ChromeOS and larger screens going forward.

# New lint rules (updated as of Flamingo Canary 3)

### x86/x86_64 ABI support

The majority of Chromebooks run on the Intel architecture, thus making them a
predominantly x86 architectural platform. For ChromeOS to properly be supported
when NDK code is included as part of the binary, having x86 is a performance
boost due to removing the translation required from ARM libraries. Therefore, it
is strongly recommended that your development team adds `x86` or preferably
`x86_64` architecture support as it would be a performance boon for any native
code on ChromeOS or any Intel device.

#### Remedy

If possible, add `x86` and `x86_64` inside of your `abiSplits` within your
`build.gradle`. Also, ensure that you are adding the code to the appropriate
folders to support these ABIs. To get more information, reference the
documentation on [Android ABIs](https://developer.android.com/ndk/guides/abis)
and the talk on [ABI Support from ADS](https://youtu.be/C0IuT0O2wlM?t=229).

!!! aside.message--note
**Note:** Ensure that whatever included third-party libraries that are being
utilized also have x86 and x86_64 binaries. 
!!!

### ChromeOS hardware limitation

The majority of ChromeOS devices come with a smaller sample set of hardware
sensors and other features compared to an Android phone. The goal of this rule
is to flag to developers that if you are using the flag `<uses-feature>` with
`android:required=true`, your app will not be available on the Google Play Store
on ChromeOS. A strong recommendation to ensure that your app can be accessed on
as many devices as possible is to ensure that the hardware feature is not
required by default. Instead, you can add defensive code to check for specific
hardware at run time rather. An example of this would be

```
<uses-feature android:name="android.hardware.camera" android:required="true">
```

#### Remedy

Ensure that the features that are within your application are actually
required, and if they are not, change the `android:required` parameter to
`false` and add defensive programming when API calls are required. To get more
information, reference the documentation on
[explicitly declared features.](https://developer.android.com/guide/topics/manifest/uses-feature-element#declared)

![Feature 'camera flash required' rule, showcasing the lint warning and the inspection description](ix:copyoflintrule--hllqtj3ml4.gif)

### Non-resizable activities

By default, Android Runtime for ChromeOS, running Android R or higher on
Chromebooks, starts an Android app in either the phone or tablet version of the
application, based on the default UI state. However, there is a third option
that is a better experience for ChromeOS users, the Resizable mode. By enabling
this flag as part of your Activity, users that can use your application in any
multi-window environments can take advantage of resizing your application to the
appropriate size. These changes will allow users to scale the UI to meet their
needs. After adding these changes to your Manifest, test your application
against the Desktop Emulator referenced below.

![Android Virtual Device Creation for Desktop Emulator](ix:copyoflintrule--tky4el3vzwh.gif)

Alt Text: Android Virtual Device Creation for Desktop Emulator

#### Remedy

Add the `resizableActivity="true"` attribute to your Activity in your
`AndroidManifest.xml` file. To get more information, reference the documentation
on
[large screen restrictions](https://developer.android.com/guide/topics/large-screens/multi-window-support#resizeableActivity).

### Configuration changes

One major caveat to resizable screens is that every time a user changes the
size of the application, `onConfigurationChanged()` is called. If your app is
issuing a full redraw inside of that method, there will be performance
implications associated with it. Currently, we are checking to ensure that
`finish()` is not called within `onConfigurationChanged`, as you should be
handling the savedInstanceState with more granularity versus enforcing a full
redraw. We will continue to find cases where performance degradation will occur
and update this rule accordingly.

#### Remedy

Ensure that `finish()` is not called within the `onConfigurationChanged()` API
in your Activities and Fragments. To get more information, reference the
documentation on
[handling configuration changes](https://developer.android.com/guide/topics/resources/runtime-changes).

### Keyboard and mouse support

With the increased adoption of Jetpack Compose, we wanted to ensure that
building with those libraries also included functionality for mouse and keyboard
support going forward. Over time, we will continue to increase the usability of
mouse, keyboard, trackpad, and other peripheral interactions. In order to get
the baseline experiences, you'll have to update your Gradle dependencies to the
minimum required versions.

#### Remedy

Update `androidx.compose.foundation:foundation` to a minimum version of 1.2. To
get more information, reference the
[compose version release notes](https://developer.android.com/jetpack/androidx/releases/compose#versions).

!!! aside.message--tip
**Tip:** 90% of users interact with apps on Chromebooks by using a keyboard and
mouse. (Source:
    [2022 Google Internal Data*](https://chromeos.dev/en/posts/game-controls-for-android-games#fn1))
!!!

## Feedback

The team is constantly looking to improve these tools and documentation
surrounding optimizations for large screens. A critical step in this process is
to give us feedback on the accuracy and usefulness of the lint rules that are
deployed in Android Studio. You can do this by providing feedback for the rule.
When the lint rule shows up in Android Studio, click on "Provide feedback on
this warning". You should be taken to a dialog that looks similar to the one
below. The more accurate and descriptive the information given, the more we are
able to iterate quickly on making the appropriate changes.

![Provide Feedback Dialog in Android Studio](copyoflintrule--9tk44djq6er.png)