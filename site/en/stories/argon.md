---
title: 'Argon brings modern retro gaming to Chromebooks'
metadesc: Mark/Space devs optimized their modern retro gaming app for ChromeOS—and discovered a hidden advantage.
date: 2023-06-15
app:
  name: Argon
  logo: ix://stories/codecademy/codecademy.png
featured: false
tags:
  - games
  - android
  - keyboard support
  - large screens
  - input devices
---

Open [Argon](https://play.google.com/store/apps/details?id=com.markspace.retro) and you can browse hundreds of games for free—games developed for game consoles and home computers of the 70s, 80s, and 90s, and modern homebrew games from the indie retro scene. Select a game and Argon renders it alongside its original controls, adjusting on-the-fly to your device's screen size and input types.

Seeking a broader audience, Argon's developer [Mark/Space](https://www.markspace.com/) initially released the retro gaming platform for Chromebook—without optimization. But it saw poor adoption at sub-1% of its weekly installs. The Argon team made the decision to improve Argon's reach by optimizing it for the Chromebook platform: [large screens](/{{locale.code}}/games/optimizing-games-windowing) and [multiple input types](/{{locale.code}}/games/optimizing-games-inputs).

> Where most apps have separate UI for phone vs desktop vs TV, we challenged ourselves to create a universal UI that works across across everything—all screen sizes and layouts, and equally well with touch input or game controller.
> {cite="Brian Hall, CEO of Mark/Space"}

During their optimization journey, the Mark/Space team discovered that many of the adjustments needed were best practices that ultimately improved their performance on other form factors. Following optimization, Argon's team found their overall reach dramatically improved—with 40% to 60% of their installs now occurring on Chromebook.

## A gaming platform built for everyone

> Our goal was to be available on as many device types and form factors as we could. By taking this approach, we're often the very best option for a particular use case, and a first mover amongst our peers.
> {cite="Brian Hall, CEO of Mark/Space"}

For the Mark/Space team, Chromebooks and Argon appeared to be the perfect match. Chromebooks were an opportunity to expand the app's reach to millions of users with reasonable and incremental effort.

In Argon, the games are ad-free—without the monetization models that could make the platform unsuitable for devices frequently used in an educational setting. Additionally, Mark/Space devs felt that the Chromebook platform still had untapped gaming potential, with less competition on the platform for game developers.

To kick off the transition from Android to ChromeOS, the Mark/Space team made a few minor changes to their app manifest on Google Play—making Argon available for Chromebooks. But, with sub-1% weekly installs, it quickly became clear that they [needed to optimize](/{{locale.code}}/games/adapting-games-android) for their new environment.

## Best practices for every form factor

> When we set out to understand ChromeOS, our first step was to obtain Chromebooks and do a deep dive on the platform. We needed to understand the opportunities for gaming with this form factor and user experience.
> {cite="Brian Hall, CEO of Mark/Space"}

Soon after their initial release, the Argon team attended sessions on [Chromebook Optimization at Google I/O](https://www.youtube.com/watch?v=FJmpyniOg58&t=6s)—and studied the related Google Developer YouTube videos to better understand the features they wanted to support.

To optimize Argon for Chromebooks, the dev team needed to:

- Improve keyboard support
- Add mouse/trackpad, stylus, and pen support
- Optimize the Argon UI for large format screens
- Change the Argon package format from APK to AAB
- Adopt the In-App Review API

Mark/Space has a small development team. They need to carefully weigh their priorities against their ROI. But as the Argon team worked toward Chromebook optimization, they realized that the bulk of it fell under the category of general best practices that would support them on other platforms.

## Bring your own input

Before optimization, Argon detected whether a keyboard was available. If a keyboard was available, it was prioritized. But when a foldable Chromebook was used as a tablet, the keyboard was still available and prioritized—even if it wasn't usable.

To optimize Argon for Chromebook, the development team had to support touch, keyboard, mouse, and game controller input. This was well-aligned with Argon's goals: gamers should be able to play with the device and inputs they had available. But they also had to deeply understand the user experience and how gamers were actually using their devices.

Brian notes, "When you use a Chromebook foldable as a laptop, you peck at the screen. When you use it as a tablet, you swipe."

## Optimize once for every device

Argon's UI was originally supported by dozens of XML layouts. Each pose—such as moving from one screen to dual screens, or horizontal to vertical—was a separate layout. Additionally, there were custom control layouts for each gaming platform.

When optimizing for ChromeOS, they switched to [Compose](https://developer.android.com/jetpack/compose). With Compose, they were able to build their UI once and have it work on everything—including foldables and multi-screen devices.

## App size cut by more than a half

One requirement for Chromebook optimization was to transition the package format from APK to AAB. Argon supports four CPU architectures and the bulk of its code is native. Before optimization, the APK was around 50 MB. The AAB is well under 20 MB.

Mark/Space quickly discovered that supporting the new AAB package format made Argon accessible to a much wider audience. The reduced package size made a big difference in download size and installation time—"We now see more installs from a lot of markets where there may not be unlimited Wi-Fi or may be paying by the megabyte."

## Adoption of the App Review API

During the transition from a free beta to a premium, paid app, Mark/Space saw Argon's user reviews fluctuating. The dev team embraced the new optimizations as a chance to get meaningful user feedback. Parallel to the optimizations, the Argon team implemented [In-App Reviews API](https://developer.android.com/guide/playcore/in-app-review).

Argon saw a steady increase in the number of 5 star reviews, as In-App Reviews API engaged its most active users. Over the first six weeks, Argon's overall star rating improved from 3.2 to over 4.0.

## Making way for future developers

> Our mission with Argon is to bring modern retro gaming to a worldwide audience, across multiple age groups, form factors, and devices. That you can play with the devices and controllers you already own—wherever and whenever you want.
> {cite="Brian Hall, CEO of Mark/Space"}

Mark/Space was focused on improving user experience on Chromebooks—and that effort paid off.

While featured on the Play Store for Chromebook users, Mark/Space saw 15% to 50% of their weekly installs coming from Chromebooks. As of February 2023, it ranged between 40% to 60%. And following the implementation of App Review API, they have seen their ratings and installs increase across all platforms.

Looking to the future, Mark/Space's "Powered by Argon" game engine lets other developers create standalone apps that they can then [publish to Google Play](/{{locale.code}}/publish). The work the Argon team did toward Chromebook optimization didn't just fortify them on other platforms—it now makes it possible for other developers to publish their game [optimized for Chromebooks](/{{locale.code}}/games/adapting-games-android).
