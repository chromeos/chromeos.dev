---
title: Publishing on Google Play
metadesc: How to publish, distribute, and monetize your app and game on Chrome OS.
hero:
  image:
    top: ix://landings/heroes/publish.svg
    bottom: ix://landings/heroes/publish-small.svg
date: 2020-05-18
weight: -8
---

Chrome OS [supports](https://chrome.googleblog.com/2016/05/the-google-play-store-coming-to.html) the Google Play Store for users to discover and install apps and games. Developers can use Google Play to seamlessly distribute and monetize apps & games across Chrome OS and Android (mobile, tablets, foldables, TV, and Wear). Learn about the benefits and features of publishing your app to the [Google Play Store](https://developer.android.com/distribute/google-play). If you have a Progressive Web App (PWA), you can also create a [listing for it in Google Play](/{{locale.code}}/publish/pwa-in-play).

## Google Play Billing

If you charge money for your app or game you can also use the Play Billing APIs for in-app purchases and subscriptions. You can [add Play billing to your app](https://developer.android.com/google/play/billing/getting-ready) and offer [subscriptions](https://developer.android.com/google-play/guides/subscriptions). Games developers using Unity can use the [Google Play Billing Library with Unity](https://developer.android.com/google/play/billing/unity). Starting in Chrome OS 88, [Google Play Billing is also available for PWAs](/{{locale.code}}/publish/pwa-play-billing) via the Digital Goods API, currently available through an origin trial. Whether you're an Android, game, or web developer, you will need to also make sure that your [Play Console is set up for Google Play Billing.](/{{locale.code}}/publish/play-console-setup-for-billing)

## Quickstart

- Follow the [Google Play Launch Checklist](https://developer.android.com/distribute/best-practices/launch/launch-checklist).
- Review your [app's device compatibility](https://support.google.com/googleplay/android-developer/answer/7353455) to ensure it's installable on all Chromebooks.
- If you are using the Android NDK, review [publishing considerations](/{{locale.code}}/games/optimizing-games-publishing) for best performance.
- Test before launch using [testing tracks](https://developer.android.com/distribute/best-practices/launch/test-tracks).
- Learn how to [Grow your audience by optimizing your app for Chrome OS](https://playacademy.exceedlms.com/student/activity/19745-grow-your-audience-by-optimizing-your-app-for-chrome-os).
- Implement [Play Billing components in a back-end server](/{{locale.code}}/publish/play-billing-backend) to prevent against fraud
