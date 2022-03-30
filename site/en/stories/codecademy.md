---
title: 'Coding class is in session: How Codecademy’s  Progressive Web App enhanced the Chromebook experience'
metadesc: Find out how Codecademy built a PWA to make its online coding education platform more discoverable, installable, and immersive for Chrome OS users.
date: 2022-03-29
app:
  name: Codecademy
  logo: ix://stories/codecademy/codecademy.png
hero:
  image: ix://stories/codecademy/hero.png
  alt: Screenshot of the Codecademy, showing the most popular page with a mosaic of topics, including Python, Front-End Engineering, Learn JavaScript, Learn HTML, Web Development, and Data Science.
featured: true
tags:
  - pwa
  - web
---

Since 2018, Codecademy has helped millions of people unlock modern technical skills and reach their full potential through code. In a world filled with software job opportunities but limited resources, Codecademy bridges that gap with interactive classes on the web and a mobile app — Codecademy Go — with practice problems and quizzes.

Codecademy’s web-based platform is ideal for teaching users on all devices within a real, integrated coding environment. After joining Chromebook’s [exclusive perks](https://www.google.com/intl/en_us/chromebook/perks/), the brand noticed an uptick of Chrome OS users engaging with its content. Plus, many were activating a discount for Codecademy Pro, a membership plan that includes access to real-world projects and the full catalog, beyond introductory courses. That’s when Codecademy saw an opportunity to build a more engaging and capable web experience for Chrome OS — and reach even more Chromebook users down the line.

Here’s how Codecademy built a Progressive Web App (PWA) to bring a native-like experience to Chrome OS and make it easy for users to explore all the platform has to offer.

## Creating a PWA fit for Play

Codecademy’s lean development team was able to package its entire existing site architecture into the new PWA in almost no time. With just two senior developers working part-time and a third brought on for two weeks to help with payment architecture, the team whipped up a brand-new web experience in under a month.

> Codecademy’s lean development team was able to package its entire existing site architecture into the new PWA in almost no time.

Before the PWA work started, the team had already prototyped adding a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers) to the production website to help pages load faster. Working on a PWA was a good reason to finish that project and ship the service worker to production. The team used a set of service worker libraries called [Workbox](https://developers.google.com/web/tools/workbox) to handle the heavy lifting and make it easy to set up a basic service worker.

But service workers can be tricky to work with. If the team accidentally shipped a bad update, it could break the site and frustrate users. To prevent this from happening, Codecademy put a lot of validation on the service worker before production — and only released it to Chrome OS users as a first step.

To streamline the checkout experience in Google Play and make it easier for coders to upgrade to a Pro plan, the Codecademy team introduced the [Digital Goods API](https://chromeos.dev/en/publish/pwa-play-billing) (DGAPI) — a new kind of payment architecture that uses Play’s familiar billing flow to simplify subscriptions and in-app purchases on PWAs. Codecademy’s existing services weren’t built to support the DGAPI, so the team refactored about 100 lines of payment code and migrated from DGAPI 1.0 to 2.0 after the initial release.

> The Codecademy team introduced the Digital Goods API (DGAPI) — a new kind of payment architecture that uses Play’s familiar billing flow to simplify subscriptions and in-app purchases on PWAs.

Because the Digital Goods API spec was still in the alpha stage, the team experienced a few breaking changes when they first released it to users. So they ended up shipping conditional logic to check which API to use and set up a variety of hardware devices to test different Chrome OS versions for good measure. But aside from that, the team found the API straightforward and easy to understand.

The team used [Bubblewrap](https://chromeos.dev/en/publish/pwa-in-play) to package the PWA, and Chrome OS engineers provided support during setup to avoid snags. Finally, to make sure end-to-end payments in Play were working as expected, the team wrapped a new version and pushed it to Chromebook users for testing.

## Engaging more Chrome OS users than ever

The Codecademy team kept a close eye on all kinds of user data after launching the PWA — from the time users spent coding in the PWA to how much learning content they engaged with — and the results were even more impressive than they expected.

After comparing activity between users who downloaded the PWA and regular website visitors, the team found that PWA users are twice as active, finish more practice work, and are more likely to submit their first code.

**Compared to regular site visitors, Codecademy's PWA users are…**

%[(24.5%, More likely to submit their first code), (2x, More active), (2x, Amount of learning content completed)]

## Setting Codecademy students up for success on Chromebooks

When Codecademy beginners are ready to level up on Chromebooks, they can easily find the app on Google Play, upgrade to a Pro plan with the same quick process they’re used to, and start unpacking unlimited practice and application resources.

Plus, Codecademy has made the PWA even more discoverable by setting up promotion placements in Play and targeted messaging on the website to encourage Chrome OS users to download the app.

> At Codecademy, we believe anyone should have the opportunity to learn the skills of the future in an engaging and accessible way. By supporting our users who want to learn from Codecademy on their Chromebooks, we’re doubling down on that mission.
> {cite="Arpan Somani, Strategic Partnerships, Codecademy"}

Thanks to the new PWA, more Chrome OS users are finding and exploring Codecademy’s web experience than ever before. Now, signing up for coding classes and embarking on an exciting learning journey is just a few clicks away.
