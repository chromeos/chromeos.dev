---
title: Publishing considerations
metadesc: Architecture considerations like x86/arm support to take into account when publishing your game.
date: 2020-06-16
weight: -5
---

Most Android phones have ARM chipsets. However, many Chrome OS devices use x86 chips. The difference is not important for basic apps written in Kotlin or Java. However, for apps written in native code, including those created with game engines, the chipset in the device can be an important concern.

Ideally, all apps with native code should ship with all [four major Android ABIs (Application Binary Interfaces)](https://developer.android.com/ndk/guides/abis): armeabi-v7a (arm32), arm64-v8a (arm64), x86 (x86_32), and x86_64.

This provides the best performance and lowest battery consumption for each device. For example, a cmake-based `build.gradle` file may contain:

```groovy {title=build.gradle}
externalNativeBuild {
  cmake {
    abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
  }
}
```

## APK size

Each ABI in a monolithic APK increases its size. This can affect your users’ disk usage, app download size, and might come up against the Play Store size limits. The best way to avoid this is to use [Android App Bundles](https://developer.android.com/guide/app-bundle). App Bundles let you easily bundle all four ABIs from within Android Studio, but do not increase the download size for your users. They also make it easy to take advantage of [Dynamic Delivery](https://developer.android.com/guide/app-bundle/dynamic-delivery) allowing users to download large game content only when requested. If App Bundles are not a possibility for you, you can use the older [multi-APK](https://developer.android.com/google/play/publishing/multiple-apks) for similar behaviour.

## 32 vs 64-bit

All Android apps must provide a 64-bit build version. A 32-bit build is optional for both ARM and x86 devices. See [Android 64-bit documentation⁠](https://developer.android.com/distribute/best-practices/develop/64-bit) for more information.

While only providing 64-bit builds reduces the number of build targets needed and your testing surface, it also limits the kinds of devices that can run your game. For example, due to other hardware limitations many older Chromebooks can only run 32-bit Android apps, despite having 64-bit CPUs. To ensure your app can run on these devices, include both 32 and 64-bit support.

## ARM translation

x86 Chromebooks try to translate ARM code whenever possible. However, translation slows performance and increases battery usage. Even simple games should consider providing x86 builds for the best user experience. If you can't provide x86 builds note that some x86 Chromebooks can't translate arm64 code. In this case you should include both arm32 and arm64 ABIs in your builds.

While arm32 translation is available on all Android-capable Chromebooks, not all Chromebooks can translate arm64 code. This means that if your game only has arm64 build targets, it will not be available for a large number of Chrome OS devices. If you are unable to ship x86 binaries, include both arm32 and arm64 ABIs in your builds.

| Included ABIs             | Support for Chrome OS |
| ------------------------- | --------------------- |
| arm64                     | Poor                  |
| arm32/arm64               | OK (with translation) |
| arm32/arm64/x86_32/x86_64 | Best                  |
