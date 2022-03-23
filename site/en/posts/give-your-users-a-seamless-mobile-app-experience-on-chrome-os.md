---
title: 'Give your users a seamless mobile app experience on Chrome OS'
metadesc: Learn about the latest improvements for Android mobile apps on Chrome
tags:
  - android
  - product news
authors:
  - fahdi
featured:
  title: A seamless mobile app experience
  desc: Learn about the latest improvements for Android mobile apps on Chrome
  images:
    - image: ix://posts/give-your-users-a-seamless-mobile-app-experience-on-chrome-os/hero.png
      alt: An app shown on phone, tablet, and Chromebook
hero:
  image: ix://posts/give-your-users-a-seamless-mobile-app-experience-on-chrome-os/hero.png
  alt: An app shown on phone, tablet, and Chromebook
  position: center
date: 2021-09-10
---

In the Google Play Store, Chromebook users can find Android apps to do just about anything: get lost in a medieval role-playing game, make a weekly to-do list, listen to their favorite podcasts, or stay connected with friends and family. Users can even download and save content onto their Chromebooks to use their apps offline whenever they want.

But for the most part, Android’s rich app experiences are designed for smartphones with much smaller screens than Chrome OS devices. When people use their apps on a laptop or tablet, a number of screen compatibility issues can crop up: content gets cut off in split-screen mode, portrait-mode-only apps launch in fullscreen, and in some cases, desktop use can even cause the app to crash.

That’s why Chrome OS is introducing improvements to ensure a great mobile app experience, no matter what device users are on. And the best part is developers don’t need to do anything — we’ll be rolling out these changes along with the Android 11 update over the next few months.

## Improved window management for Android mobile apps

Starting in Chrome OS 93, improved window compatibility for mobile apps is now available on Android 11-enabled Chromebooks. With this first in a series of upcoming updates, apps will run in a window locked to phone or tablet orientations.

Users can easily [switch between a predefined phone and tablet view](https://support.google.com/chromebook/thread/124854535/introducing-chrome-os-93-to-the-stable-channel?hl=en) by using a simple window resize UI that appears when they hover over the top of the app screen. Users can also disable this window management feature to enable full resizability by clicking the “Resizable” option.

![](ix://posts/give-your-users-a-seamless-mobile-app-experience-on-chrome-os/window-management.jpg)

This feature applies to most apps available in the Play Store not currently optimized for desktop use. Games and Media apps that have fullscreen mode enabled to [deliver more immersive experiences](https://developer.android.com/training/system-ui/immersive) will continue to launch in fullscreen mode, but users can change the window view at any time.

For more details and tips, check out our post about [optimizing your Android apps for desktops.](/{{locale.code}}/android)

## Check your app’s performance on desktop

Here’s how you can get a better idea of how your users will experience your app on Chrome OS:

- Make sure your Android device is running on version 11 or newer. You can check the Android version on your Chrome OS device under Settings > Apps > Google Play Store > Manage Android Preferences > System > About Device.
- Confirm that the Chrome OS version of your device is 93 or later. You can check the Chrome OS version of your device under Settings > About.
- If your app is already installed on your Chrome OS device, uninstall and reinstall it.
- Launch the application on your Chrome OS device.
- Ensure that the application is in freeform window mode (not maximized or fullscreen).
- Check if the top bar of the app has the UI element to switch window orientations.

!!! aside.message--note
**Note:** This window management feature applies for apps installed via Play Store, not adb (Android Debug Bridge).
!!!

## Adapt your Android apps for Chrome OS

Better window management for Android mobile apps is an important step toward creating a seamless user experience on larger screens. But the best way to make sure users get the most out of your app on Chrome OS is to adapt it for desktop use.

We broke down some [helpful steps](/{{locale.code}}}/posts/optimizing-android-app-experiences-for-chromeos) to ensure your app looks and works great across form factors and screen sizes, as well as some [tips for optimizing for Chrome OS.](/{{locale.code}}/android)

If you have questions or feedback about improved window management for Android mobile apps on Chrome OS, reach out to us at chromeos-developer-feedback@google.com.
