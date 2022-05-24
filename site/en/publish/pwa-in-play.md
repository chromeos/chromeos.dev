---
title: List your Progressive Web App in Google Play
metadesc: How to publish and distribute your Progressive Web App through Google Play.
date: 2021-05-14
weight: -5
---

By listing your PWA on Google Play, it becomes discoverable in the world’s largest app store. Google Play also offers app ratings and reviews, giving users insight into your PWA before installing it. Finally, when you list your app in Google Play, you also get the power of Google Play Billing, giving users a familiar payment platform to work with while supporting payments from multiple countries.

@[youtube](https://www.youtube.com/watch?v=ddbHp8tGBwQ)

## Bubblewrap

[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) is a CLI to take your Progressive Web App and wrap it in an Android App Bundle for distribution through app stores, like Play on Chrome OS and Android, all without requiring Android app development knowledge.

To get started, install Bubblewrap from NPM:

```bash {title="Bash" .code-figure}
$ npm install -g @bubblewrap/cli
```

To initialize your project, pass in your PWA’s [web app manifest](https://web.dev/add-manifest/) as input and Bubblewrap will generate an Android project to build your PWA Play package from.

```bash {title="Bash" .code-figure}
$ bubblewrap init --manifest="<web-manifest-url>"
```

Then build the project and Bubblewrap will create the packages (APK or AAB) that can be uploaded to Google Play to be distributed.

```bash {title="Bash" .code-figure}
$ bubblewrap build
```

Check the [official CLI documentation](https://github.com/GoogleChromeLabs/bubblewrap/tree/main/packages/cli) for a quickstart guide and more details about the commands.

### Chrome OS only

If you already have a platform specific Android app, or do not wish to have a mobile experience, you can make your application available only on Chrome OS by adding the `--chromeosonly` flag in the init command:

```bash {title="Bash" .code-figure}
$ bubblewrap init --manifest="<web-manifest-url>" --chromeosonly
```

If you have already initialized your application, you can change this configuration by setting the `isChromeOSOnly` flag to `true` in the `twa-manifest.json` file and running Bubblewrap’s `update` command.

### Signing Key

Your signing key designates you as the original author of the app and any updates that are made to that app need to use the original signing key. When initializing your project, Bubblewrap will ask for your existing key or create a new key for you.

!!! aside.message--warning
It is very important to protect and not lose this key. If this key is lost, it may make it very difficult to update to your application in Google Play.
!!!

### Digital Asset Links

Setting up Digital Asset Links requires multiple steps: you need to gather information on your app from Google Play and deploy files at specific places in your web application. For tips on how to set up Digital Asset Links for your PWA, watch the video below:.

@[youtube](https://www.youtube.com/watch?v=3bAQPnxLd4c)

!!! aside.message--warning
Since the time of publishing this video, Bubblewrap no longer generates the Digital Asset Links file for you anymore. Check out the [`fingerprint`](https://github.com/GoogleChromeLabs/bubblewrap/tree/main/packages/cli#fingerprint) command in the tool instead.
!!!

## Publishing your app to Google Play

When you’re ready to publish your app to Google Play, do the following:

- Make sure your [Google Play Developer account is set up](https://support.google.com/googleplay/android-developer/answer/6112435?authuser=1).
- Check that your [developer account details](https://support.google.com/googleplay/android-developer/answer/139626?authuser=1) are accurate.
- If you’re using Google Play Billing, [set up your Google Payment Merchant account](https://support.google.com/googleplay/android-developer/answer/3092739?authuser=1) and link it to your Google Play account.
- [Create your app’s listing in Google Play](https://developer.android.com/distribute/best-practices/launch/store-listing?authuser=1).

You can now release your app to Google Play! We recommend first releasing to a [testing track](https://support.google.com/googleplay/android-developer/answer/9845334?authuser=1&authuser=1&visit_id=637556446686565231-2880420394&rd=1) with a trusted testers list to validate the app works as expected.

!!! aside.message--note
**Note:** We do not recommend the paid app option for PWAs published on Google Play. The installed PWA needs to be accessible from the user’s browser and the only means for determining if a navigation comes from a Play installed app are reliant on client-side checks and may not fire for every navigation. Because of this, there’s no secure way of limiting access in the same way that other paid apps can, so we instead recommend [monetizing through in-app purchases and/or subscriptions](/{{locale.code}}/publish/pwa-play-billing).
!!!

### List a PWA for Chrome OS and a platform specific Android app under one listing

If you already have a well established Android presence with a platform specific Android application and would like to release a PWA to Google Play that is targeted just for Chromebooks, you can do it all in the same listing. Make sure that when you package your PWA, use the aforementioned [Chrome OS only flag](#chrome-os-only). This will ensure that the PWA version will only be available to Chromebooks. The same signing key needs to be used for both the PWA and Android app that are going to be sharing a Play Store listing.

!!! aside.message--warning
**Warning:** Uploading a mobile Android app with a higher version number than your Chrome OS only app _will replace your Chrome OS only app_ if the mobile Android app is also compatible with Chromebooks! As a best practice, set the Chrome OS app several versions higher than your mobile Android app. For instance 1000 for Chrome OS if the Android version is 1. Then as you create new releases for each, you can increment the version numbers accordingly as long as the Chrome OS version is always larger. When Play distributes your app, it uses the highest version available that is compatible with the given device.

When creating the Chrome OS release, make sure to include the latest released Android App Bundle. If the latest mobile package is not included in the Chrome OS release, users on mobile Android devices will not be able to install your app. In the “Previous release” section, find the APK or AAB that corresponds to the latest Android mobile version and select “Include”.

![When you create a new release in the Play Console, you can include APKs or AABs from previous releases.](ix://publish/pwa-in-play/play-console-include.png)

Similarly, when creating an Android release, you also need to include the latest released App Bundle for Chrome OS. Otherwise, users on Chrome OS will get the Android app when installing your app for the first time on their device, instead of the Chrome OS app.
!!!

### Complying with Google Play payment policies

If your PWA sells digital goods that fall under the [Play payments policy](https://support.google.com/googleplay/android-developer/answer/9858738#gbwa:~:text=Play%2Ddistributed%20apps%20must%20use%20Google%20Play's,app%20functionality%2C%20digital%20content%20or%20goods.), you must integrate Play billing into your app before it can be launched. Learn more on [integrating Google Play Billing with your web app](/{{locale.code}}/publish/pwa-play-billing).

### Updating your PWA in Play

Because users are using your live web app after installing your PWA through Google Play, there are only a few scenarios when you’ll need to update your deployed app. These include:

- If the app is over a year old. In this case, you should update in order to ensure that your app works with the latest Android SDK.
- If you have separate mobile and Chrome OS-only packages under the same listing, and the platform specific Android version number exceeds your Chrome OS-only PWA version. In this case, you need to bump the PWA version and redeploy the app while retaining your platform specific Android app release.
- If there are new features you would like to take advantage of.
- If you have changed your web app manifest, for instance updating icons or the theme color, and want those changes applied to your PWA in Play. In this case, you should recompile your Bubblewrap project and redeploy the app.
