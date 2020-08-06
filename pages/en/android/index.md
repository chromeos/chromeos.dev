---
title: Android apps on Chrome OS
metadesc: An introduction to the Play Store and Android Applications on Chrome OS
hero:
  image: /images/landings/adapting-android.svg
  alt: Illustration of an Android phone and Chrome OS device showing the same application running on both.
date: 2020-05-27
weight: -8
---

In 2016, the Google Play Store was brought to Chrome OS, allowing the same apps that
run on phones and tablets to run on Chromebooks without compromising their
speed, simplicity or security. Because Chromebooks run a full
version of the Android framework, your app is most likely
running on Chrome OS devices today! That means devs can take their single
Android APK and scale it to work on any Chrome OS device, allowing for even more
immersive and engaging experiences on devices with bigger screens. There are a
few differences between phones and Chrome OS devices (and other larger screen
form-factors) that can add challenges and opportunities for different experiences
such as:

- Larger landscape-first screens
- x86 architecture devices
- Free form windows and resizing
- Keyboard, mice, & trackpads as first class input methods

To jump in to how you can start building Android apps for Chrome OS,
[learn more here](/{{locale.code}}/android/start). Read below for more information
on resources we have and topics to keep in mind.

## Where do I start?

- Publishing your app for Chrome OS devices can seem challenging or confusing, but
  it is the same APK that you ship for phones and tablets. For more information
  check out our resources on publishing through the [Play Store for Chrome OS](/{{locale.code}}/publish) including [optimizing for x86](/{{locale.code}}/games/optimizing-games-publishing) if you use the NDK.
- Chrome OS allows your app to bring new experiences and patterns to your users,
  but it does come with some challenges. Read what is involved to [optimize
  your app](/{{locale.code}}/android/optimizing) or check out a [blog
  post](https://medium.com/androiddevelopers/android-at-large-how-to-bring-optimized-experiences-to-the-big-screen-a50a6784e59d) for more information on what your app on Chrome OS and other larger screen
  devices involves.
- There are design considerations to keep in mind on larger screen devices, and we've
  created some [recommendations and guidelines](/{{locale.code}}/android/design)
  to keep in mind when thinking about how your app looks and behaves on Chrome OS.
- There are a few ways to develop for Chrome OS, you can build [directly on your
  Chrome OS device](/{{locale.code}}/android-environment/deploying-apps#deploy-from-chrome-os) using the Linux (Beta) for Chrome OS or you can connect your
  [Chrome OS device to your main workstation](/{{locale.code}}/android-environment/deploying-apps#deploy-from-another-device) and
  develop that way.
