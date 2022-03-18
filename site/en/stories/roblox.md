---
title: Roblox casts a wider net for gamers with optimized Chromebook app
metadesc: By optimizing for Chromebooks, Roblox has been able to draw a lot of excitement from its player communities, resulting in a large group of dedicated players.
app:
  name: Roblox
  logo: ix://stories/roblox/roblox-icon.240.png
  company: Roblox
hero:
  image: ix://stories/roblox/hero.1500.jpg
  alt: A group of Roblox characters in the world game.
  position: top
tags:
  - games
  - keyboard support
  - device configuration
date: 2018-11-19
updated: 2020-04-01
---

With more than 40 million games created by its users, [Roblox](https://www.roblox.com/) is the largest user-generated online gaming platform and the number-one gaming site for kids and teens, according to comScore. Inspired by the Chromebook’s solid install base and the large number of devices used by educational facilities, Roblox decided to optimize its app for Chrome OS.

Roblox supports many devices, including laptops and tablets with touchscreens. So, it's able to benefit from the Chromebook’s ability to run in both laptop and tablet mode. The optimization process was fairly seamless because Roblox already supported Android, but it had to make a few tweaks within the Android build to make sure it ran smoothly on Chromebook.

![A group of Roblox characters standing next to each other.](ix://stories/roblox/roblox-feature.1500.jpg)

## What they did

First, Roblox reviewed features it had built in the Android app for compatibility with Chrome OS. Some of the Android app’s original architectural decisions were problematic when optimizing for Chrome OS, most notably the static screen render dimension. Roblox spent time testing, experimenting, and optimizing for this issue before settling on a full-screen approach for a more immersive gaming experience.

For device identification purposes, Roblox had to decide how to classify the Chromebook internally because it had the device capabilities of both a laptop and tablet, depending on which mode was running. Because Chromebooks don’t necessarily fit neatly into their current device categorization, Roblox simply created a new category for tracking user engagement and performance. The Chromebook’s screen ratio and keyboard change dynamically based on how the device is being held, so Roblox added support to detect both screen and keyboard orientation on the fly.

## Results

Chromebooks currently run Roblox’s 2D app and 3D engine extremely well, and provide users with a unique gaming experience. The ability to toggle between different device modes makes the app easy to use in a variety of locations and situations, and easy to adjust based on control and input preferences.

When Roblox first announced and released support for Chrome OS, there was a lot of excitement from its developer and player communities. This interest turned into a large group of dedicated players who love playing Roblox on their Chromebooks on a regular basis.

## Get started

Learn how to best [optimize your apps for Chrome OS](/{{locale.code}}/android/optimizing).
