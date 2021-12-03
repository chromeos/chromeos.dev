---
title: Evernote launches on Chrome OS and sees 3X increase in time spent on larger screen devices
metadesc: By making their app available on Chromebooks through the Google Play Store, Evernote experienced an increase of 3x time spent on large screen devices since their launch on Chrome OS.
app:
  name: Evernote
  logo: gs://stories/evernote/evernote-icon
  company: Evernote Corporation
hero:
  image: gs://stories/evernote/hero
  alt: A desk with a computer showing the Evernote app
  position: center
tags:
  - productivity
  - stylus support
  - keyboard support
  - touchscreen support
  - large screens
date: 2019-12-26
updated: 2020-04-01
featured:
  images:
    - image: gs://featured/evernote-featured-flat
      alt: Laptop device.
---

[Evernote's](https://play.google.com/store/apps/details?id=com.evernote) mission is to help individuals and groups remember everything, turn ideas into action, and work effortlessly together. Their Android app gives people the tools they need to get organized, take and save notes, and collaborate with others.

Whenever Evernote sees a major new platform on the horizon, they set a goal to make sure Evernote is available from day one! Seeing the opportunity with Google Play available on Chrome OS, they decided to bring their app to the platform.

## What they did

Evernote focuses on making one app available on multiple platforms and form factors, so they used Chrome OS as an opportunity to improve the development processes for Evernote as a whole. They spent some time making their code more modular to make the Evernote app not only great on mobile devices but also on larger form factors. There were specific features that Evernote took advantage of on Chrome OS.

Evernote translates handwriting into text, and were very excited to use the new **low latency stylus API** to quickly implement touchscreen handwriting. Google's API renders strokes very quickly by allowing apps to bypass parts of the OS and draw directly to the display. The user experiences no latency, so it feels like they're actually drawing on paper. According to Evernote, people can't stop drawing because it's so fast, natural and smooth. It even pushed the Evernote team to level up on what their handwriting feature could be capable of doing.

Since the keyboard experience on Chrome OS is different than a mobile keyboard experience, the team added keyboard shortcuts so people could quickly make a note. They also had to carefully consider how they wanted their toolbar to work on both mobile form factors and the larger Chromebook form factor, so they made some adjustments to make it more modular going forward. Additionally, they made sure the navigation supported their app hierarchy without the presence of a Back button.

Evernote also had fun thinking through the opportunity a touchscreen provided. May Allen, product manager of Evernote, commented:

> This was such an interesting project because it wasn't just about optimizing for the keyboard, it was optimizing for the touchscreen. That is what is so awesome about Chromebook is it has both of those physical properties.

May Allen, product manager of Evernote {.cite}

## Results

Evernote has received positive feedback from users about their Chrome OS experience and found that users are spending more time on the platform than the average app user. The average Evernote user is spending 3x more time on large screen devices and 4x more time when using the Google Pixelbook.

## Get started

Learn how to best [optimize your apps for Chrome OS](/{{locale.code}}/android/optimizing).
