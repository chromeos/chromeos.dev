---
title: Cross-publishing Google Play Games for PC
metadesc: How to optimize and publish simultaneously for Google Play Games on PC and Chrome OS.
date: 2022-05-02
weight: -7
---

Chromebooks are not the only large screen platform where Android games can be played. Google also provides a platform to play your Android games on PC through [Google Play Games](https://developer.android.com/games/playgames/overview). The requirements are similar enough that if you optimize your game for Google Play Games, you'll have done the work of optimizing for Chrome OS.

## Optimizing and publishing for Google Play Games

1. Build a version of your game that works on large screen devices. The [Google Play Games documentation](https://developer.android.com/games/playgames/start) details the approval requirements for Google Play Games as well as how to [test on a ChromeOS device](https://developer.android.com/games/playgames/development-test).If you had previously optimized your game for Chromebooks, make sure they meet the additional [requirements](https://developer.android.com/games/playgames/start#requirements-checklist) for Google Play Games as well.
1. [Package](https://developer.android.com/games/playgames/development-package) your game for Google Play Games, and ensure that you include x86 and x86_64 binaries. Be sure to include these binaries for Chrome OS submissions as well. When possible, you should use the same APKs or App Bundle on PC as you do for mobile builds.
1. [Publish](https://developer.android.com/games/playgames/development-submit) your game to the “Google Play Games for PC” track within the Play Console.

## Publishing a Google Play Games build for Chromebooks

Publishing to the Google Play Games track will not automatically make your game available on Chromebooks. For developers who want their large screen game version to be available on Chromebooks, there are two options: maintain a combined project (recommended) or create separate projects.

### Combined project

We recommend that you maintain a single code base for both your mobile game and large screen platforms like PC and Chromebooks. This will streamline your publishing process and reduce the maintenance overhead of maintaining continuity and parity across screens. With a single codebase, as long as you haven’t restricted Chromebooks from the Production track of the standard release type, Chrome OS devices will get your Google Play Games for PC optimized game whenever you publish an update for this track. If your game isn’t showing up, review [publishing for Chrome OS quickstart](/{{locale.code}}/publish#quickstart) to help you debug.

### Separated projects

If you need to separate your large screen version from your mobile version, there is still a path forward. Using the same build for Google Play Games, create a bundle that targets only Chromebooks and upload it to the same Play Store listing as your mobile version. This will keep your reviews and ratings in one place. There are some considerations that need to be made for this, though:

- Keep the package name the same between builds.
- Increase the version code of the ChromeOS (large screen) build to a number much higher than the current Android (mobile) version.
- Add the following Chrome OS-specific feature to the app manifest in order to restrict your large screen version to only be discoverable on Chromebooks.
  ```xml {title="AndroidManifest.xml" .code-figure}
  <uses-feature android:name="org.chromium.arc" android:required="true" />
  ```
- Upload the new build in the Production track for the Standard release type alongside the phone build.

!!! aside.message--warning
**Warning:** Uploading a mobile Android app with a higher version number than your Chrome OS only app _will replace your Chrome OS only app_ if the mobile Android app is also compatible with Chromebooks! As a best practice, set the Chrome OS app several versions higher than your mobile Android app. For instance 1000 for Chrome OS if the Android version is 1. Then as you create new releases for each, you can increment the version numbers accordingly as long as the Chrome OS version is always larger. When Play distributes your app, it uses the highest version available that is compatible with the given device.

When creating the Chrome OS release, make sure to include the latest released Android App Bundle. If the latest mobile package is not included in the Chrome OS release, users on mobile Android devices will not be able to install your app. In the “Previous release” section, find the APK or AAB that corresponds to the latest Android mobile version and select “Include”.

![When you create a new release in the Play Console, you can include APKs or AABs from previous releases.](ix://publish/pwa-in-play/play-console-include.png)

Similarly, when creating an Android release, you also need to include the latest released App Bundle for Chrome OS. Otherwise, users on Chrome OS will get the Android app when installing your app for the first time on their device, instead of the Chrome OS app.
!!!
