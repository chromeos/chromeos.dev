---
title: 'From made-for-mobile to made-for-all: A roundup of tools to adapt your Android apps for Chrome OS'
metadesc: From creating games that instantly adapt to different devices to making styluses feel just like drawing on paper, here’s a wrap-up of the latest improvements in Chrome OS for 2021.
tags:
  - android
  - technical
  - trend
  - large screen
  - window management
  - input devices
  - device configuration
  - android studio
  - gaming
authors:
  - fahdi
  - sanjn
featured:
  title: '2021 Recap: Android on Chrome OS'
  desc: 'From made-for-mobile to made-for-all: a roundup of tools to adapt your Android apps for Chrome OS'
  images:
    - image: ix://posts/android-recap-2021/hero.png
      alt: Illustration of a Chromebook with stylized windows with the Android "droid" logo in the middle.
hero:
  image: ix://posts/android-recap-2021/hero.png
  alt: Illustration of a Chromebook with stylized windows with the Android "droid" logo in the middle.
date: 2021-12-20
---

Large screens are getting a lot of love from Android users. Not only has Chrome OS [grown 92% in the past year](https://chromeos.dev/en/posts/whats-new-in-chrome-os-announcements-news-and-resources-from-io-21), but there are currently [more than 250 million](https://android-developers.googleblog.com/2021/10/ads21-keynote-wrap.html) active large-screen devices running Android around the world.

Whether they’re unleashing their creativity on [Concepts](https://chromeos.dev/en/stories/concepts), playing games like [Crypt of the NecroDancer](https://play.google.com/store/apps/details?id=com.braceyourselfgames.necrodancer&hl=en_US&gl=US), or taking notes on [Squid](https://chromeos.dev/en/stories/squid), more people are craving their favorite smartphone experiences on large-screen devices, such as Chromebooks, tablets, and foldables. On Chromebooks alone, the number of users engaging with Android apps increased 50% year over year (YOY).^[Source: Google Internal Data, 2020-2021]

![Illustration showing a 50% increase in Chromebook users engaging with Android apps year-over-year](ix://posts/android-recap-2021/engagement.svg)

To help you build apps fit for all screens and form factors, we’ve continued to share new tools and guidance throughout 2021 to bulk up your Android toolkit. From creating games that instantly adapt to different devices to making styluses feel just like drawing on paper, here’s a wrap-up of the latest improvements in Chrome OS:

## Android 11 rollout

We’ve been steadily updating all Chromebooks to [support Android 11](https://chromeos.dev/en/posts/whats-new-in-chrome-os-announcements-news-and-resources-from-io-21#updates-for-android-developers), giving you the ability to test new runtime improvements, such as better app resizing, scaling, and rendering. And to empower you to create more stable, secure, and high-performing user experiences, we also moved Android from a container to a virtual machine.

## Improved window management for Android apps

Android 11-enabled Chromebooks on Chrome OS 93 or higher now automatically run made-for-mobile apps in a window [locked to phone or tablet orientations](https://chromeos.dev/en/posts/give-your-users-a-seamless-mobile-app-experience-on-chrome-os#improved-window-management-for-android-mobile-apps). Depending on which layout they prefer, users can disable the window management feature by clicking the “Resizable” option. Best of all, these updates are available by default across most apps in the Play Store without any developer intervention.

#[The window management feature lets users easily transform apps to the window size they prefer.](ix://posts/android-recap-2021/amac-e.jpg)

## Nearby Share in Android apps

Content sharing got a whole lot faster this year, now that Android’s [Nearby Share](https://developers.google.com/nearby) functionality is available in apps on Chrome OS devices running Chrome 96 or higher. With support for both Android 9 and Android 11 on Chrome OS, more people can share files, pictures, and links instantaneously with other Android and Chrome OS users.

## Jetpack Compose for large screens

We launched a declarative UI toolkit, [Jetpack Compose 1.0](https://developer.android.com/jetpack/compose), to simplify [building adaptive layouts](https://developer.android.com/jetpack/compose/layouts/adaptive). The UI’s appearance is described in the code, which means developers can easily decide at runtime how an app should render across a variety of screen sizes.

Jetpack Compose also has built-in support for desktop input primitives like mice, trackpads, or keyboards, making it easier to build adaptive UI to scale well across multiple screen sizes and input types.

## Layout Validation

If you’re dipping your toes into adaptive layouts, you can start with the new Layout Validation tool within [Android Studio Chipmunk](https://developer.android.com/studio/preview). This visual linting tool surfaces UI warnings and suggestions in Layout Validation, including which reference devices are affected — giving you a chance to get ahead of potential pain points.

#[Developers can proactively troubleshoot UI pain points in Layout Validation](ix://posts/android-recap-2021/layout-validation.png)

## Resizable emulator in Android Studio

With Android Studio Chipmunk’s [new resizable emulator configuration](https://android-developers.googleblog.com/2021/10/12L-preview-large-screens.html), you can test apps at runtime by quickly toggling between four reference devices — phone, foldable, tablet, and desktop. This makes it easier to validate app layouts at design time and test the behavior at runtime across the same reference devices.

## Low-latency stylus library

The [Chrome OS low-latency stylus library](https://github.com/chromeos/low-latency-stylus) helps you deliver fast and seamless touch-to-draw and stylus-to-draw experiences. The API minimizes latency by rendering pen strokes directly through the hardware compositor and predicting where the next part of the stroke will be drawn. Both CPU- and GPU-based rendering can use the library, so we’d love to hear your feedback about the API in the [GitHub issue tracker](https://github.com/chromeos/low-latency-stylus/issues).

## x86 support with Unity

We [partnered with Unity](https://chromeos.dev/en/posts/google-unity-partner-to-support-chromebooks) — a widely used game engine for Android games — to make building everything from simple card games to immersive RPGs for Chrome OS easier than ever. With Unity 2021, 2020, and 2019 LTS, you can support both x86 and x86_64 based-Chrome OS devices using your IDE to reduce duplicate code and streamline publishing.

## Deliver optimal app experiences on all screens

As app experiences continue to evolve, there’s no doubt adapting for larger screens will be a priority for developers in 2022. Check out these helpful resources to get a head start:

- Guidance for adapting [Android apps for Chrome OS](https://developer.android.com/chrome-os/intro)
- Steps for creating [responsive layouts for large screen development](https://developer.android.com/large-screens)
- How-tos for optimizing for [large-screen Android devices](https://developer.android.com/chrome-os/intro)
- Replay of [Android Dev Summit 2021](https://www.youtube.com/playlist?list=PLWz5rJ2EKKc99PA-mKk2rz0jYXshN94sM) with the latest tools, tips, and APIs for large screens

Like developers, our top priority is finding ways to deliver better experiences for every user. We’ll keep rolling out guidance and easy-to-use tools in 2022, so stay tuned for updates that’ll help you whip up even more immersive, engaging apps in the new year.
