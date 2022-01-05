---
title: YouTube gives its Premium users offline access through a Progressive Web App
metadesc: YouTube's mission is to give everyone a voice and show them the world. But without an Internet connection sometimes users had to put the conversation on pause.
app:
  name: YouTube
  logo: ix://stories/youtube/icon.png
  company: Google
hero:
  image: ix://stories/youtube/banner.png
  alt: Illustration of being able to download a recipe video from YouTube and watch it while offline
tags:
  - touchscreen support
  - web
  - video and media
  - optimization
date: 2021-11-17
featured:
  images:
    - image: ix://stories/youtube/device.png
      alt: A Chromebook
    - image: ix://stories/youtube/browser.png
      alt: The YouTube PWA installed on a Chromebook
---

YouTube’s mission is to give everyone a voice and show them the world. But without an internet connection, users had to put the conversation on pause.

To make sure Premium users can watch anytime, anywhere, YouTube built a [Progressive Web App](https://chromeos.dev/en/web/desktop-progressive-web-apps) (PWA) to deliver an immersive video experience across browsers, devices, and form factors — even offline.

PWAs allow developers to introduce modern APIs to new and existing apps, combining the rich capabilities of platform apps with the extensive reach of web apps. Here’s how YouTube’s team of developers created a PWA with secure offline playback and made the experience even better on Chromebooks.

## Using a PWA to deliver a seamless offline experience

Before YouTube launched its PWA, Premium users on Chrome OS had to use the Android app if they wanted to watch videos offline. YouTube wanted its web users to have access to these capabilities so they could watch videos no matter where or how they tune in. Building the installable PWA and setting up offline playback took a lot of learning and experimenting.

YouTube already had a [service worker](https://web.dev/service-workers-cache-storage/) with [push notifications](https://web.dev/push-notifications-overview/) in place, but it didn’t include a [fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch) handler. The YouTube team was also concerned that adding one could break the site for users, so to prevent site crashes, the team created a no operation service worker that brings users back to a browser-like default site.

To make sure users always have the most up-to-date version of YouTube, the team made it so the PWA always served from the network and only fell back to the cache when needed. They also needed to get the service worker’s latency as close to zero as possible, which they achieved with this network-first caching approach and use of [Navigation Preloads](https://developers.google.com/web/updates/2017/02/navigation-preload). The team also introduced [service worker monitoring](https://web.dev/service-worker-mindset/) to detect breakages.

Because YouTube is a large Polymer app with one JavaScript file, one CSS file, and one HTML file, the team could start caching these files once they loaded them with the service worker. YouTube’s cached set of resources is a lot like an application binary you’d find in an app store. When loaded, the HTML file loads the JavaScript bundle, and the JavaScript can handle additional network calls.

After the team got the service worker to cache the core application, they were ready to set up offline playback.

![Downloading a video for offline playback using YouTube on a Chromebook](ix://stories/youtube/offline.gif)

First, everything on the back end that assumed users were always online needed to be adjusted. Then, the team had YouTube’s custom video player download the encrypted bytes for a video and store them locally using the [IndexedDB API](https://developers.google.com/web/ilt/pwa/working-with-indexeddb). This keeps offline playback secure while allowing the ability to store even multiple large video files.

## Experimenting with the PWA on Chromebooks

Chromebook users were ideal candidates to test these updates with because they all have the latest APIs — so the YouTube team was able to run experiments with real users. The team started by optimizing the app for Chrome OS with several new features:

- New gestures with [touch support](https://chromeos.dev/en/android/input-compatibility) in addition to mouse and keyboard interactions
- Double-tap to seek in the player
- Voice search

And to make the PWA even more useful on Chromebooks, YouTube incorporated [Web Share](https://web.dev/web-share/), [App Shortcuts](https://web.dev/app-shortcuts/), and [Declarative Link Capturing](https://web.dev/declarative-link-capturing/).

## Creating a default app experience for users

Watching videos offline on laptops and hybrid devices was one of the top requested features from YouTube Premium users, and the YouTube team has already heard great feedback about the offline experience.[^1]
With the new PWA, YouTube Premium users can get nonstop access to the content they love — even when they’re on the go. A user can download their favorite creator’s latest videos to watch on their Chromebook on a plane, in a coffee shop, or anywhere they might not have a stable internet connection.

And now, the PWA is quickly becoming Chromebook users’ primary destination for YouTube content.

> What’s the best part about designing the web app for Chrome OS? Because Chrome’s APIs aren’t OS-specific, the experience is scalable across even more devices and browsers.

Instead of having to refine the app for different user segments, creating a PWA for Chrome OS let the YouTube team deliver a reliable, rich, and app-like experience.

[^1]: YouTube internal data.
