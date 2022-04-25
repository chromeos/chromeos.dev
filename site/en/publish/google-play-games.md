---
title: Cross-publishing Google Play Games for PC
metadesc: How to ensure the Play Store will surface your Google Play Games titles listed on PC.
date: 2022-05-02
weight: -8
---

Chromebooks are not the only large screen platform where Android games can be played. Google also provides a platform to play your Android games on PC through [Google Play Games](https://developer.android.com/games/playgames/overview). The requirements are similar enough that if you optimize your game for Google Play Games, you'll have done the work of optimizing for Chrome OS in the process. The steps below detail how Android game developers should build a large screen form factor version that can be published to both Google Play Games and Chrome OS.

_If you wish to publish your android game on Google Play Games for PC, then follow the steps under [Optimizing and Publishing for Google Play Games](#optimizing-and-publishing-for-google-play-games)._

_If you already have a Google Play Games title built and want to bring it to Chromebooks, then follow the steps under [Publishing a Google Play Games build for Chromebooks](#publishing-a-google-play-games-build-for-chromebooks)._

## Optimizing and Publishing for Google Play Games

1. Build a version of your game that works on large screen devices. The [documentation](https://developer.android.com/games/playgames/start) details how to build for Google Play Games and [test on a ChromeOS device](https://developer.android.com/games/playgames/development-test).
   - Optimizing for Google Play Games is similar to optimizing for Chromebooks. If you've done the work for Google Play Games, you're game is already prepared for Chromebooks!
1. When [packaging](https://developer.android.com/games/playgames/development-package) a game for Google Play Games or ChromeOS, please ensure you include x86 or x86-64 binaries. When possible, you should use the same APK or App Bundle on PC as you do for mobile builds.
1. Once testing and packaging is complete, please follow the [steps to publish](https://developer.android.com/games/playgames/development-submit) the game to the “Google Play Games for PC” track within the Play Console.

## Publishing a Google Play Games build for Chromebooks

Publishing to the Google Play Games track will not automatically make your game available on Chromebooks. For developers who want their large screen game version to be available on Chromebooks, there are two options - [Combined Project](#combined-project-flow) (recommended) and [Separated Project](#separated-project-flow).

### Combined Project Flow

We advise that you maintain a single code base when optimizing your game for large screen platforms like PC and Chromebooks. This will significantly streamline your publishing process as well as reduce overhead for maintaining continuity and parity across screens.

**If you have combined your mobile code and large screen code into a single build/package**, then the next time you publish an update for mobile devices (via standard release type), ChromeOS devices will also benefit from your optimizations for Google Play Games for PC. As long as you haven't restricted Chromebooks from this track, the listing will appear for Chromebooks. You can find debugging help for Play Store visibility on Chromebooks [here](/{{locale.code}}/publish).

### Separated Project Flow

If your project cannot support large screen improvements in the same project or build as Android, there is still a path forward. The goal is to take the same build for Google Play Games and target only Chromebooks while still being part of the same Play Store listing, thus keeping your reviews and ratings in one place. Keep in mind that the package name must match between builds.

**If you have separated your mobile and large screen builds**, then please follow these steps to list your large screen build alongside your mobile build and target it to Chromebooks.

1. Increase the version code of the ChromeOS (large screen) build to a number much higher than the current Android (mobile) version.
   - **Warning**: Uploading a mobile Android app with a higher version number than your Chrome OS only app will replace your Chrome OS only app if the Android app is also compatible with Chromebooks! As a best practice, set the Chrome OS app several versions higher than your mobile Android app. For instance 1000 for Chrome OS if the Android version is 1. Then as you create new releases for each, you can increment the version numbers accordingly as long as the Chrome OS version is always larger. When Play distributes your app, it uses the highest version available that is compatible with the given device.
   - When creating the Chrome OS release, make sure to include the latest Android App Bundle. In the “Previous release” section, find the APK or AAB that corresponds to the latest Android mobile version and select “Include”.
1. Add the following Chrome OS-specific feature to the app manifest in order to restrict your large screen version to only be discoverable on Chromebooks.  
   `<uses-feature android:name="org.chromium.arc" android:required="true" />`
1. Upload the new build in the Production track for the Standard release type alongside the phone build.
