---
title: Game engines
metadesc: Optimizing usage of game engines for building on Chrome OS.
date: 2020-06-16
weight: -2
---

Games engines with an Android target should produce builds that run well on Chrome OS. If you are building on a game engine:

- Create x86_32, x86_64, ARM32, and ARM64 binaries to provide the best performance and battery life for your users
- Test input and window resizing thoroughly
- Report issues with builds to the game engine creator. If there appears to be an OS side issue as well, in addition to the game engine report, please file feedback with Chrome OS by typing [[alt]] + [[shift]] + [[i]] on a Chromebook or at [Chromium issues](https://bugs.chromium.org/p/chromium/issues/list).

## Overriding input events with Unity

The Unity engine interprets Android input events and translates them into the Unity input system. If you need to intercept the raw Android events, for example to implement [mouse capture](/{{locale.code}}/games/optimizing-games-inputs#mouse-capture), you can do so by choosing “Export” in the Unity Editor under the Android build settings and choosing a target directory.

After exporting, you will be able to import the target directory into Android Studio. This will allow you to debug, profile, etc. from within Android Studio.

You can also edit the `UnityPlayerActivity` in order to intercept input events before they are sent to the game activity. It is in this file that you can insert mouse capture and keyboard shortcut logic. Once you are done, build your Android App Bundles or APKs from within Android Studio.

Also see the [Unity Android build process documentation](https://docs.unity3d.com/Manual/android-BuildProcess.html).

!!! aside.message--note
Note: the “Export” command in the Unity Editor is like a build step as far as the editor is concerned. The one-way developer flow should go: Edit in Unity -> Export -> Edit in Android Studio -> Build from Android Studio/Gradle. Changes made in Android Studio will not be imported back into the Unity Editor
!!!
