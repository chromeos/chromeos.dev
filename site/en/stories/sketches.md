---
title: 'Calling all creatives: How Tayasui Sketches charmed digital artists with a canvas fit for ChromeOS'
metadesc: Find out how the Tayasui Sketches team scaled their existing iOS drawing app to Android and ChromeOS to delight artists on larger screens.
date: 2022-10-19
app:
  name: Sketches
  logo: ix://stories/simplifi/logo.png
  company: Tayasui
hero:
  image: ix://stories/sketches/hero.png
  alt: A toucan drawn in the Tayasui Sketches app. The toucan is surrounded by design tools.
featured: true
tags:
  - android
  - flutter
---

Eight years ago, the Tayasui team launched their drawing app — Tayasui Sketches — to empower creatives with an intuitive tool for creating digital art, ranging from [scenic sketches to detailed portraits](https://tayasui.com/sketches/artists/).

To make the most of its lean development team’s resources, Tayasui Sketches decided to start by building for one form factor at a time — with sights set on scaling to others after assessing performance. Digital artists intuitively look for apps that mimic real-life pen-to-paper sensations, so Tayasui Sketches’ developers rolled out their app to iOS tablets first, followed by mobile and laptops.

But every time they expanded to another device in the iOS ecosystem, the team essentially had to create a new UX from scratch. This heavy lift proved to be an invaluable lesson: The more flexible your codebase, the easier it is to scale.

> The more flexible your codebase, the easier it is to scale.

Fast forward to 2019, when the Tayasui Sketches team decided to move beyond iOS to connect with even more artists on Android. ChromeOS runs a full Android framework, so Tayasui Sketches decided to create a Chromebook-tailored experience. This would then automatically scale across all of artists’ go-to Android devices — from mobile phones fit for on-the-go inspiration to tablets that offer creatives more room to play, along with ChromeOS’ seamless stylus support.

The picture was crystal clear for Tayasui Sketches’ developers. By building for ChromeOS and Android, they’d be able to cover multiple form factors and delight more artists than ever. Plus, the number of Android app users [increased 50% year over year](/{{locale.code}}/posts/chromeos-100#:~:text=Android%20apps%20have%20quickly%20evolved,increased%2050%25%20year%20over%20year.) in 2021 on Chromebooks alone, illustrating people’s growing love for large-screen devices — and a can’t-miss growth opportunity for Tayasui Sketches.

Here’s how Tayasui Sketches’ lean dev team optimized for a growing range of Android and ChromeOS devices in one go.

## Scaling for Android and ChromeOS with Flutter

The Tayasui Sketches team considered building their Android app natively. But they ultimately decided to run with [Flutter](https://flutter.dev/) — Google’s open-source UI software development kit (SDK) for developing cross-platform apps from the same codebase — for the much-needed flexibility.

Lead developer Florian Paillard took the charge by using OpenGL in Flutter while scaling for Android and ChromeOS, which was the same engine Tayasui Sketches used for iOS. This enabled the team to carry over the app’s existing logic smoothly while optimizing the UX for larger screens.

> The Tayasui Sketches team used Flutter to carry over the app’s existing logic to Android and ChromeOS smoothly while optimizing the UX for larger screens.

The Tayasui Sketches team rolled out 20 realistic drawing tools that would seamlessly respond to the touch of a finger — including watercolors that remain “wet” until users tap to dry the ink. They also implemented tapping and direction arrows for focusing elements, built in multiple options to change the background and switch up button sizes, and added rules limiting the number of on-screen items to maintain a sleek look and feel.

From there, optimizing for ChromeOS laptops was simple: The team used an existing SDK to enable the stylus input and added keyboard shortcuts to copy and paste folder names.

![Tayasui Sketches’ in-app drawing experience on Chromebooks.](ix://stories/sketches/inline.png)

## Troubleshooting with an experimental mindset

While testing on Chromebooks, the Tayasui Sketches team realized they had one issue to solve before launch. When they resized the app, the configuration of the widget they were using to integrate the drawing view detached — causing the drawings on the screen to disappear.

To work around this challenge, Tayasui Sketches’ dev team disabled app resizing across devices. Then, they worked with the Google team to debug and optimize before rolling out their Android app. With simple, powerful tools such as Flutter, one developer was able to build, test, and publish the app in just three months.

## Delighting users with cross-platform experiences

After its launch in 2020, [Tayasui Sketches](https://play.google.com/store/apps/details?id=com.tayasui.sketches&hl=en_US&gl=US) won Google Play’s [“Best Hidden Gems” award](https://play.google.com/store/apps/topic?id=campaign_editorial_bestof2020_hiddengem). It was recognized for the same award in Japan a year later, and it’s still one of the leading painting and design apps on Google Play — with over 1 million downloads (and counting).

Tayasui’s founder Yann Le Coroller is thrilled to see more artists embrace the new design. “There’s nothing I’m more proud of than seeing the fabulous work that people are making with our apps.”

%[(1M+, Downloads on Google Play)]

Moving forward, the team is focused on inspiring even more creatives by scaling to Windows and Linux — and looking for an opportunity to build a smoother drawing experience with the [low latency stylus API](https://github.com/chromeos/low-latency-stylus) once there’s a better integration with OpenGL. They’re also seeking to further monetize their app by displaying AdMob ads with a [SDK made for Flutter](https://developers.google.com/admob/flutter/quick-start) — because what’s better than getting some extra coin for your creations?
