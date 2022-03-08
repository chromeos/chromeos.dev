---
title: 'Powerful apps fueled by the web: How developers are engaging an expanding Chrome OS audience'
metadesc: Learn how web developers created powerful PWAs to deliver scalable and engaging experiences for desktop users on Chrome OS.
tags:
  - technical
  - trend
  - pwa
authors:
  - nataliagvak
  - vivekmistry
featured:
  title: Powerful apps fueled by the web
  desc: How web developers are engaging an expanding Chrome OS audience.
  images:
    - image: ix://posts/web-recap-2021/ChromeOS_EOY_Header.png
      alt: Illustration of three Chromebooks, one with a financial app, one with a video player, and one with a music mixing app, with a mug of coffee and a speaker on each side of the Chromebooks.
hero:
  image: ix://posts/web-recap-2021/ChromeOS_EOY_Header.png
  alt: Illustration of three Chromebooks, one with a financial app, one with a video player, and one with a music mixing app, with a mug of coffee and a speaker on each side of the Chromebooks.
date: 2022-03-01
---

The web has never been more central to how we work, play, and connect with the world around us. And as the platform continues to shine as the place for building scalable, immersive, and adaptable experiences, more developers are jumping at the opportunity to engage a wider audience of desktop users.

Just like the web, [Progressive Web Apps (PWAs)](https://web.dev/what-are-pwas/) are more capable and powerful than ever. Fueled by the open web and powered by the latest web APIs — not to mention easy to discover and monetize on Google Play — PWAs enable web developers to create reliable apps that users can install and enjoy. And that user base is expanding fast

Since the beginning of 2021, desktop PWA installs have grown by 270%.[^1]

[^1]: Google Internal Data, Feb 1 2021 to Feb 1 2022.

![Animation showing 270% increase in PWA installs year-over-year](ix://posts/web-recap-2021/ChromeOS_EOY_Inline1_R4.gif)

This growth has also paired with increasing app usage on Chromebooks by [over 190% in the same period](https://chromeos.dev/en/posts/simple-payments-that-users-trust-monetizing-web-apps-in-google-play). When you combine PWA growth with the increasing adoption of Chromebooks — which grew 92% YOY in 2020 to become the second-highest-selling desktop computer of the year — it has never been easier for developers to reach and engage users with amazing web experiences.

As we keep rolling in 2022, we’re eager to see what developers can achieve while we continue to grow the platform. Here are Chrome OS improvements that we’ve been working on and a rundown of developers who created powerful PWAs.

## Seamless visibility and monetization on Google Play

One of the biggest improvements has been making it simpler for developers to get their apps discovered and monetized. Using [Trusted Web Activity⁠](https://developers.google.com/web/android/trusted-web-activity), developers can quickly [package their PWA in Google Play](https://chromeos.dev/en/posts/easy-to-build-monetize-and-discover-list-your-web-app-on-google-play) for Chromebooks and Android-powered devices. By showing up in curated collections and recommendations on Google Play, PWAs are easier to discover on a wide variety of devices and users get to enjoy the native-like app experience they love.

And to seamlessly accept payments and subscriptions in Google Play, [developers can use the Digital Goods API](https://chromeos.dev/en/publish/pwa-play-billing) to manage in-app payments and subscriptions using more than 290 forms of payments across more than 150 countries. Developers get the benefit of accepting in-app payments and subscriptions with a single click, and users get to follow a familiar and trusted Google Play billing flow, with the ability to save credits or payment information. The Digital Goods API is also compatible with any pre-existing Play Billing integration.

## PWAs are helping developers grow their businesses

Developers big and small are taking advantage of PWAs to deliver next-level user experiences. For one example, YouTube Premium users on Chrome OS once needed the Android mobile app to watch videos offline. Building a PWA last year allowed YouTube to [give its Premium users one of their most-requested features](https://chromeos.dev/en/stories/youtube): the ability to watch their favorite content anywhere at any time.

Cloud gaming service GeForce NOW brought more than 1,200 games to Chromebooks, where users can instantly play amazing PC gaming titles like Fortnite, League of Legends, and Destiny 2. Simply plug in a mouse and find nearly 100 free-to-play titles on the platform.

![2 by 5 grid of logos, showing the BeFunky, Cloud Stop Motion, SoundCloud, Clipchamp, Amped Studio, Artboard Studio, Replit, Kapwing, and Piper Make logos](ix://posts/web-recap-2021/ChromeOS_EOY_Inline2-1600x732.png)

For some more PWA inspiration, here are a few more notable examples of development teams that have boosted their reach, engagement, and user sessions on the web:

- [Amped Studio](https://ampedstudio.com/), a music-making app, experienced a **20% growth in registrations and a 100% increase in premium membership sales** since the launch of its PWA in the Google Play Store.
- [ArtBoard Studio](https://app.artboard.studio/), a mockup design tool, quickly and easily provided its users with a highly requested desktop-like experience with **no additional maintenance required**.

> Our users requested a desktop experience for our app. Thanks to PWAs, we developed a desktop-like experience for them in less than two days — no extra future maintenance required!
> {cite="Hooman Skari, CTO and Co-founder, Artboard Studio "}

- [BeFunky](https://www.befunky.com/), a photo editor, **doubled its average user session time** after switching to the PWA version of the editor.
- [Clipchamp](https://clipchamp.com/en/), a video creation and editing suite, has seen a sharp **growth in PWA installs, increasing at a rate of 97% a month** since the launch.
- [Cloud Stop Motion](https://app.cloudstopmotion.com/), a stop-motion animation creator, saw a **quick jump in user engagement** compared to its desktop app after launching its PWA.

> Cloud Stop Motion reached more users in 12 months than our desktop app reached in 10 years!
> {cite="David Henley, Cloud Stop Motion CEO"}

- [Kapwing](https://www.kapwing.com/), an image, video, and GIF editing platform, saw **36% growth** on its PWA. Plus, the PWA’s seven-day retention rate is **1.92X higher** than the website’s, and the 28-day retention rate is **2.85X higher**.
- [Piper Make](https://make.playpiper.com/), an education technology app for young learners, saw a **38% increase** in its user base after introducing an offline-enabled, streamlined PWA.
- [Replit](https://replit.com/), a collaborative code editing tool, had **more than 10,000 PWA downloads** on Android and Chromebooks during its first month.
- [SoundCloud](https://replit.com/), a next-generation music entertainment company, saw a **40% increase in listening time** among users who accessed the platform through its PWA.

## Build for the future of web app experiences

As the web evolves and offers even more possibilities, desktop users will expect even more engaging and memorable experiences. And Chrome OS is the best place to test, create, and deliver PWAs your users will love.

Check out these helpful resources to get a head start:

- Dive into our web section on [ChromeOS.dev](https://chromeos.dev/en/web), your one-stop shop for articles and resources on PWAs.
- Use the [Chrome OS open-source Bubblewrap tool on GitHub](https://github.com/GoogleChromeLabs/bubblewrap) to help package and upload your PWA to Google Play with just five minutes of work.
- Get step-by-step instructions on adding your PWA to Google Play from [this Google Developers Codelab](https://developers.google.com/codelabs/pwa-in-play#0).
- If you have set up your PWA to process digital payments, check out our [video session on using the Digital Goods API](https://youtu.be/Ge7VkPC2eM0)⁠.
- Review our [migration guide](https://chromeos.dev/en/posts/dgapi-2-migration) from Digital Goods API 1.0 to 2.0.

We'll continue to roll out guidance and easy-to-use tools in 2022, so keep following [ChromeOS.dev⁠](https://chromeos.dev/) and be sure to [subscribe to our newsletter⁠](https://chromeos.dev/en/subscribe) to stay up to date on the latest changes.
