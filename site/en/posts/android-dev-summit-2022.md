---
title: 'Tips from Android Dev Summit 2022: How to scale made-for-mobile apps to ChromeOS'
metadesc: Learn how Android devs can offer the best experiences across a variety of form factors by tailoring their apps to ChromeOS and larger screens.
tags:
  - event
  - android
hero:
  youtube: C0IuT0O2wlM
  alt: Why and how to optimize your app for ChromeOS
authors:
  - pfuentes
date: 2022-12-05
---

People’s appetite for apps on larger screens is growing fast. In Q1 2022 alone, there were [270 million active Android users](https://chromeos.dev/en/posts/io-2022) across Chromebooks, tablets, and foldables. So if you want to grow reach, engagement, and loyalty, taking your app beyond mobile will unlock a world of opportunity.

If your app is available in Google Play, there’s a good chance users are already engaging with it on ChromeOS. And if you’re just starting to think about larger screens, tailoring your app to ChromeOS — which runs a full Android framework — is a great place to start. What’s more is that optimizing for ChromeOS is very similar to optimizing for other larger-screen devices, so any work you do for one will scale to the other.

At [Android Dev Summit 2022](https://developer.android.com/events/dev-summit), I shared [a few ChromeOS-specific nuances](https://www.youtube.com/watch?v=C0IuT0O2wlM) to keep in mind when tailoring your app to larger screens. Let’s explore the top five things devs should consider, as well as workarounds to common challenges.

## 1) Finessing input compatibility

One of the biggest differences between user behavior on mobile and larger-screen devices is people’s preference for input devices. About 90% of ChromeOS users [interact with apps using a mouse and keyboard](https://chromeos.dev/en/posts/game-controls-for-android-games), and Android users across tablets and foldables often do the same.

%[(~90%, ChromeOS users interact with apps using a mouse and keyboard)]

The first step to meeting people’s expectations is testing your app’s support for a keyboard, mouse, and stylus. Once you’ve got your basics covered, you can add enhancements such as thoughtful focus states and context menus. You can also further [enhance input compatibility on larger screens](https://developer.android.com/guide/topics/large-screens/input-compatibility-large-screens) by testing app-specific input devices, such as game controllers.

![Focus states and context menus shown on Chromebooks. ](ix://posts/android-dev-summit-2022/ADS+Blog_ChromeOS_02.png)

## 2) Creating a fit-for-larger-screen UI

People freely resize apps on ChromeOS, so it’s important to think about how your app looks and feels in a variety of aspect ratios — including landscape orientations. Although ChromeOS [offers automatic windowing compatibility support](https://chromeos.dev/en/posts/give-your-users-a-seamless-mobile-app-experience-on-chrome-os) for made-for-mobile experiences, apps that specifically optimize for larger screens tend to drive more engagement.

The extra screen real estate on Chromebooks, tablets, and foldables gives both you and your users more room to play, explore, and create. So why not make the most of it? You can [implement a responsive UI](https://www.youtube.com/watch?v=fQjDtCtri4s) for larger screens with toolkits such as [Jetpack Compose](https://developer.android.com/jetpack/compose) and [create adaptive experiences](https://www.youtube.com/watch?v=FrkIa9vZjCI) by sticking to [design best practices](https://d.android.com/large-screens/gallery)**.**

## 3) Implementing binary compatibility

If you’ve exclusively run your app on Android phones, you might only be familiar with ARM devices. But Chromebooks and many other desktops often use x86 architectures, which makes [binary support](https://developer.android.com/ndk/guides/abis) critical. Although Gradle builds for all non-deprecated ABIs by default, you’ll still need to specifically account for x86 support if your app or one of your libraries includes C++ code.

Thanks to binary translation, many Android apps will run on x86 ChromeOS devices even if a compatible version isn’t available. But this can hinder app performance and hurt battery life, so it’s best to [provide x86 support explicitly](https://developer.android.com/topic/arc/device-support#overview) whenever you can.

## 4) Giving apps a thorough test run

The surefire way of ensuring a great user experience? [Run rigorous checks](https://developer.android.com/docs/quality-guidelines/large-screen-app-quality) to make sure your apps and games work as expected on the devices you’re optimizing for. When you’re building for ChromeOS, testing your apps on Chromebooks or another larger-screen device is ideal. But you've still got options if a physical device isn’t available.

For instance, you can still test a keyboard or mouse on an Android handset by plugging them into the USB-C port. And with the [new desktop emulator in Android Studio](https://chromeos.dev/en/posts/desktop-avd-in-android-studio), you can take your app for a spin in a larger-screen setting and test desktop features such as window resizing.

![A Chromebook featuring the Desktop Android Virtual Device in Android Studio. ](ix://posts/android-dev-summit-2022/ADS+Blog_ChromeOS_03.png)

## 5) Polishing apps for publishing

Sometimes, even apps tested on Chromebooks — and listed in Google Play — aren’t actually available to ChromeOS users. This usually happens because there’s an entry in the app’s manifest declaring it requires features that aren’t available on the unsupported device.

Let’s say you specify your app requires “android.hardware.camera.” That entry refers to a rear-facing camera — so any devices with only a user-facing camera would be considered unsupported. If any camera will work for your app, you can use “android.hardware.camera.any” instead. And if a hardware feature isn’t a must for your app, it’s best to specify in your manifest that it’s not required by using `required=false`.

![ A Chromebook featuring recommended manifest entries for hardware features. These manifest entries are also featured on their own next to the Chromebook.](ix://posts/android-dev-summit-2022/ADS+Blog_ChromeOS_04.png)

Once you’ve got your manifest squared away, your app is ready to ship. Your app listing is often your first chance to impress and attract users. That’s why we’re excited the Play Console now enables you to upload screenshots specific to different form factors. With this new functionality, you can show off [what your app experience is like](https://www.youtube.com/watch?v=xLecR6zYiFY) on users’ favorite devices and entice them to download.

## Connect with millions of larger-screen users

As people’s love for desktops, tablets, and foldables continues to grow, building for these form factors is becoming more and more important. Check out [other talks from Android Dev Summit 2022](goo.gle/ADS-FormFactors) as well as resources on [ChromeOS.dev](https://chromeos.dev/en/android/) and [developer.android.com](https://d.android.com/large-screens) for more inspiration and how-tos as you optimize for larger screens. And don’t forget to [sign up for the ChromeOS newsletter](https://chromeos.dev/en/subscribe) to keep up with the latest.
