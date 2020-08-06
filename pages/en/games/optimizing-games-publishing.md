---
title: Publishing considerations
metadesc: Architecture considerations like x86/arm support to take into account when publishing your game.
date: 2020-06-16
weight: -5
---

The same Android apps that run on phones and tablets can run on Chromebooks without compromising their speed, simplicity, or security. To develop the best experience for Android apps across Chromebooks, you should test your app on a suite of devices that consists of the following categories:

- ARM architecture
- Intel x86 architecture
- Touch
- Non-touch (uses fake-touch)
- Convertible
- Stylus-capable

To learn more about Google Play Store support on Chromebooks, see the following [Google Chrome blog post](https://chrome.googleblog.com/2016/05/the-google-play-store-coming-to.html).

## Chipsets

Many Chrome OS devices use x86 chipsets, which contrasts with the mobile market where, in 2020, the majority of Android phones have ARM chipsets. For basic apps and games written in Kotlin or Java, this is not a concern. For those with native code, as many games do, including those created with game engines, this is an important concern.

Ideally, all apps and games with native code would ship with all [four major Android ABIs](https://developer.android.com/ndk/guides/abis): armeabi-v7a (arm32), arm64-v8a (arm64), x86 (x86_32), and x86_64.

This provides the maximum available for Android devices and will provide the best performance and lowest battery consumption for each device. An example cmake based build.gradle file might contain:

```groovy {title=build.gradle}
externalNativeBuild {
  cmake {
    abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
  }
}
```

## APK size

Each additional ABI will increase the file size for a monolithic APK. This can have important implications for your users’ disk usage, download size, and may bring you up against Play Store size limits. The best way to address this is with [Android App Bundles](https://developer.android.com/guide/app-bundle) (AAB). AABs allow you easily bundle all 4 ABIs from within Android Studio, but does not increase download size for your users. It also makes it easy to take advantage of [Dynamic Delivery](https://developer.android.com/guide/app-bundle/dynamic-delivery) to allow users to download large game content only when requested. If AABs are not a possibility for you, you can use the older [multi-APK](https://developer.android.com/google/play/publishing/multiple-apks) solution to accomplish some of this behaviour.

## 32 vs 64-bit

All Android apps need to provide a 64-bit version of whatever architectures they support, see [Android 64-bit documentation](https://developer.android.com/distribute/best-practices/develop/64-bit) for more information. This means if you support ARM devices, your AAB must have either arm64 only or else both arm32 and arm64 binaries. The same is true for x86.

- **Supports ARM?** arm64 or arm32/arm64
- **Supports x86?** x86_64 or x86_32/x86_64

While only providing 64-bit builds does reduce the number of build targets needed and your testing surface, it will reduce the number of devices available your game can run on. For example, many older Chromebooks can only run 32-bit Android apps, despite having 64-bit CPUs, due to other hardware limitations. To ensure your app can run on these devices, include both 32 and 64-bit support.

## ARM translation

x86 Chromebooks will try to translate ARM code whenever possible. This means apps and games with only arm32 builds should run on all x86 Chromebooks that can run Android apps. However, translation necessarily slows performance and increases battery usage. Even “simple” games should consider providing x86 builds to provide the best overall experience for users.

While arm32 translation is available on all Android capable Chromebooks, not all Chromebooks are able to translate arm64 code yet. This means that if your game only has arm64 build targets, it will not be available on a large number of Chrome OS devices. If you are unable to ship x86 binaries, include both arm32 and arm64 ABIs in your builds.

| Included ABIs             | Support for Chrome OS |
| ------------------------- | --------------------- |
| arm64                     | Poor                  |
| arm32/arm64               | OK (with translation) |
| arm32/arm64/x86_32/x86_64 | Best                  |
