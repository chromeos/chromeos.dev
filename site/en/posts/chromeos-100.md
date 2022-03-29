---
title: 'Celebrating Chrome OS 100: Recapping how we’ve grown with developers over the years'
metadesc: In honor of the 100th stable channel release on Chrome OS, we’ve highlighted some new announcements and the best features for developers to date.
tags:
  - announcement
  - trends
  - technical
  - android
  - web
  - games
  - linux
hero:
  image: ix://posts/m100/m100-laptop.png
  alt: Asus chromebook, opened at an angle, screen and keyboard facing away
theme:
  eyebrow: Chrome OS 100
  icon: ix://posts/m100/icon.svg
  theme: m100
  background:
    top: /images/posts/m100/m100-top.svg
    bottom: /images/posts/m100/m100-bottom.svg
featured: true
authors:
  - ieinvaldez
date: 2022-03-30
---

On March 31, Chrome OS reaches its 100th software release. Along the way, we’ve continued to grow and evolve into a versatile platform for building amazing app and game experiences — and for connecting all kinds of developers with users worldwide.

Thanks to partnerships with top OEMs like Acer, Asus, Samsung, Dell, HP, and Lenovo, our hardware suite has expanded far beyond traditional laptops. Since we introduced our [first two Samsung and Acer Chromebooks](https://chrome.googleblog.com/2011/05/new-kind-of-computer-chromebook.html) in 2011, Chromebooks are now available in thousands of retail stores across the world. And we’ve continued to reach even more segments, particularly education: Chromebooks are now the No. 1 device in K-12 education globally and used by 50 million students and educators.[^1]

> Chromebooks are now the No. 1 device in K-12 education globally and used by 50 million students and educators.

We’ve got even more hardware innovation in the works. At CES this year, the **HP Elite Dragonfly** and the **Asus Chromebook Flip CX5** made their debut — two powerful devices for prosumers, enterprise, and developers alike with impressive software capabilities baked in.

Speaking of new capabilities for our developer community, your one-stop shop for all things Chrome OS got a major facelift.

## A refreshed ChromeOS.dev

We’ve come a long way in the past decade, and it’s been incredibly rewarding to see how developers have used Chrome OS to grow their businesses and create innovative app experiences for users across devices.

Every new feature we launch is designed to empower developers to keep growing and engaging wider audiences — no matter what they’re building or who they’re trying to reach. To make sure they have the resources they need to succeed, we created [ChromeOS.dev](https://chromeos.dev) in 2020 to give a home to all these new features, including code samples, best practices, technical guidance, and developer success stories.

We're excited to announce ChromeOS.dev has a new look and a lot more great content on the way — including dedicated resources for developers building apps for education, and content for enterprise coming later this year. There will also be a series of posts focused on the foundational tech behind Chrome OS … and there might even be a fun Easter egg for developers to discover. So be sure to check out the site, explore the latest content, and look for clues.

![Chromebook showing the redesigned ChromeOS.dev homepage](ix://posts/m100/inline/laptop.png)

To mark the Chrome OS 100 milestone, here’s a recap of some features and tooling updates that have helped developers do what they do best.

## Expanding the Android developer experience

Android apps have quickly evolved beyond mobile — more and more people are using them on large-screen devices. On Chromebooks alone, the number of Android app users increased 50% year over year in 2021.[^2]

> On Chromebooks alone, the number of Android app users increased 50% year over year.

We’ve rolled out loads of exciting features to help Android developers create memorable experiences for Chromebook users. Here are just a few that have made the biggest splash:

- **Stronger performance and memory.**[^3] An upgrade to Android 11 brings better performance, increased stability, and support for the latest APIs.
- **Guidance for Android design on large screens.** We’ve created [comprehensive resources](/{{locale.code}}/android/design) for developers adapting Android apps to large-screen devices. Developers who have existing Android apps can use these guidelines to build high-quality large-screen experiences.
- **UI toolkit and component updates.** [Jetpack Compose](https://github.com/android/compose-samples/tree/master/JetNews) simplifies UI development on Android and lets developers build adaptive apps. With improvements to peripheral input handling in Jetpack Compose, developers also benefit from keyboard and mouse interactions right out of the box. And with Jetpack WindowManager 1.0, developers can easily support new device form factors and multiwindow environments.
- **Android Studio support.** [Building for Chromebooks](https://blog.google/products/chromebooks/linux-on-chromebooks/) is easier than ever with one-click install, improved ADB over USB and WiFi, [layout validation](https://blog.esper.io/android-12l-announced/#new-tools-to-build-apps-for-large-screens), and a resizable emulator.
- **Low-latency library for stylus capable apps.** [Mechanisms for reducing the touch-to-draw latency](https://github.com/chromeos/low-latency-stylus) on Chrome OS devices make styluses feel just like putting a pen to paper.

## Helping web developers engage more users

As people spend more time using apps on desktops, developers have whipped up all kinds of web apps to support existing users and connect with new ones.

Here are only a handful of web feature announcements that have helped developers deliver better experiences:

- **Packaging Progressive Web Apps (PWAs) for Play.** Users benefit from a native-like experience by opting to have a PWA open by default when they click a PWA-supported link. Plus, [developers can control how their PWAs should launch](https://web.dev/launch-handler/) and make their apps more discoverable by distributing in the Google Play Store on Chromebooks and Android.
- **Seamless billing integration.** The Digital Goods API, which will be stable in Chrome OS 100, weaves into Google Play’s billing system to help developers [monetize their apps through a familiar user experience](/{{locale.code}}/posts/simple-payments-that-users-trust-monetizing-web-apps-in-google-play).
- **Web development on Chrome OS.** Any code editor, integrated development environment, tool, or language that runs on Linux also runs on Chrome OS. That means you can test on built-in Chrome, any Linux browser, or mobile browsers [through Play](/{{locale.code}}/web-environment#more-than-chrome) — all on your Chromebook.

Developers have harnessed these features along with the latest web APIs to launch immersive and capable PWAs and web experiences. [Quicken’s Simplifi PWA](/{{locale.code}}/stories/simplifi) is a great example. The brand was able to monetize its PWA in Google Play and revamp its existing web app to be more desktop integrated, reliable, and full-featured.

Coding education platform [Codecademy’s PWA](/{{locale.code}}/stories/codecademy) boosted user engagement and retention rates far beyond its previous web learning platform. The development team found PWA users completed more than twice the amount of learning content. Meanwhile, [YouTube’s new PWA](/{{locale.code}}/stories/youtube) gave Premium users a highly requested feature: the ability to enjoy their favorite content offline. And we built a PWA called [Cursive](/{{locale.code}}/posts/developing-cursive) that lets Chromebook users take quick notes with their stylus — just like jotting something in a notebook.

Here are some other brands that have created engaging PWAs:

#[Pixlr, Sumo Beatport, Wideo, Cloud Stop Motion, Colorcinch, Simplifi by Quicken, Codecademy, Tinkercad, Tiktok](ix://posts/m100/inline/logos.png)

## Making Chrome OS a top destination for gamers

Gaming has always been a huge draw for Chrome OS users, and we’ve expanded that capability so people can stream their favorite games directly on their Chromebooks. Cloud Gaming from Stadia, GeForce NOW, and Amazon Luna offer more than 1,400 gaming titles on Chromebooks. To serve the growing popularity of gaming on Chrome OS, we’ve unveiled a number of updates to help developers create desktop-competitive gaming experiences.

Just recently, we announced the [Steam on Chrome OS alpha release](https://www.chromium.org/chromium-os/steam-on-chromeos/), which brings games like Portal 2, Skyrim, and The Witcher to supported Chrome OS devices.

Last year, we announced our partnership with Unity to fully support Chromebooks. Today, Unity 2019 LTS and onward allows game developers to bring their Android titles to Chrome OS with support for x86 32/64 Chromebooks, and a streamlined publishing process.

Many developers have found success adapting gaming experiences for Chrome OS. Brace Yourself Games, an independent games studio, saw an opportunity to bring its games to Chromebooks starting with Crypt of the NecroDancer to reach an even wider audience and give gamers a PC-like experience in a secure, cloud-first computing environment. The studio was even one of the first on Chrome OS to enable music track playback.

And hit title Minecraft created an experience [optimized for Chrome OS](https://education.minecraft.net/en-us/chromebook) — Minecraft: Education Edition — to connect with millions of students on Chromebooks.

And don’t miss these in-depth case studies on some of the incredible work from fellow Chrome OS developers:

- [Celebrating developers with Chrome OS's 100th release](/{{locale.code}}/posts/celebrating-developers-with-chromeos-100)
- [Developing Chrome Cursive, a PWA for Chrome OS](/{{locale.code}}/posts/developing-cursive)
- [Making Android Runtime on Chrome OS more secure and easier to upgrade with ARCVM](/{{locale.code}}/posts/making-android-more-secure-with-arcvm)
- [Improving Chrome OS performance with core scheduling](/{{locale.code}}/posts/improving-chromeos-performance-with-core-scheduling)
- [Helping students fall in love with building technology with Piper's Shree Bose](/{{locale.code}}/posts/iwd-2022-shree-bose)
- [Empowering creators, educators, and entrepreneurs with Kapwing's Julia Enthoven](/{{locale.code}}/posts/iwd-2022-julia-enthoven)

To keep up with the latest Chrome OS announcements, be sure to bookmark ChromeOS.dev (don’t forget about the Easter egg), sign up for our [newsletter,](/{{locale.code}}/subscribe) and [tune into Google I/O May 11 and 12](https://io.google/2022/) for even more Chrome OS insights, hardware and software news, and inspiration from your fellow developers.

[^1]: Google Internal Data, 2020–2021
[^2]: Google Internal Data, Jan. 2022
[^3]: Actual local storage might be less depending on the size of the operating system (including any upgrades) and other native software.
