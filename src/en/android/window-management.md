---
title: Window management
metadesc: This page describes the window manager on Chrome OS.
date: 2020-05-01
weight: -4
tags:
  - window management
  - device configuration
---

Chrome OS runs Android apps in individual windows. These windows can be resized or maximized, and will be resized accordingly when a tablet or convertible device is rotated.

![An app window on different devices](/images/android/window-management/fullscreen-and-windows.png)

## Resizing windows

Users can resize app windows by clicking and dragging the window borders. This brings additional considerations for Android apps that may have been designed for phones.

![A resizable app window](/images/android/window-management/resizable.png)

In the [Android lifecycle⁠](https://developer.android.com/guide/components/activities/activity-lifecycle), when an app is resized or its orientation changes, in addition to other [runtime configuration changes⁠](https://developer.android.com/guide/topics/resources/runtime-changes), the Activity’s UI is torn down and rebuilt. Specifically, [onPause()⁠](<https://developer.android.com/reference/android/app/Activity#onPause()>), [onStop()⁠](<https://developer.android.com/reference/android/app/Activity#onStop()>), and [onDestroy()⁠](<https://developer.android.com/reference/android/app/Activity#onDestroy()>) will be called to clean up the old UI, followed by [onCreate()⁠](<https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)>), [onStart()⁠](<https://developer.android.com/reference/android/app/Activity#onStart()>), and [onResume()⁠](<https://developer.android.com/reference/android/app/Activity#onResume()>)to rebuild it.

At first glance, it may seem strange to tear down and rebuild the UI on every configuration change, however it is part of what makes it possible for Android apps to run well on so many devices and in any shape of window, while looking great with quality graphics and an optimized layout.

Older apps developed for mobile phones may not be expecting to receive these types of configuration changes very frequently. In particular, some apps do intensive processing or disk/network fetches in their `onCreate` method which can cause performance issues or crashes on window resizing. In addition, state can be lost during these lifecycle events which can cause inconvenience or data loss for users.

Mobile apps that rely on forcing a portrait or landscape layout and disallowing rotation in order to avoid these lifecycle events will not behave correctly when they are resized in a windowed environment.

There are two options for handling window resizing. Most apps should implement the first one, and it is good practice across all Android devices, even if you are not targeting Chrome OS.

1. All UI state should be maintained in a [ViewModel⁠](https://developer.android.com/topic/libraries/architecture/viewmodel) combined with the [SavedState module](https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate) or an [onSavedInstanceState](<https://developer.android.com/reference/android/app/Activity#onSaveInstanceState(android.os.Bundle)>) implementation. Other data should be handled with Lifecycle aware components. See [Jetpack’s guide to app architecture⁠](https://developer.android.com/jetpack/guide) for a list of components that can make this robust and straightforward to implement.

This will ensure an app’s UI is decoupled from user data and expensive data operations. Resizing can then happen quickly and fluidly. Other mobile devices, tablets, and foldables will also benefit from this implementation by handling configuration changes well. This is not the only way to achieve this behavior, but it is the recommended way.

2. You can also handle configuration changes yourself. This requires careful attention and can lead to poor behavior if you receive unexpected configuration changes - for example if screen density changes when a user plugs in an external monitor. However, some apps, games, and games engines may wish to handle configuration changes caused by window resizing manually. To do this, add the following line to the `<Activity>` tag in your `AndroidManifest.xml` file:

```xml {title=AndroidManifest.xml}
android:configChanges="screenSize|smallestScreenSize|orientation|screenLayout"
```

and then override the `onConfigurationChanged` method in your main activity. See [handling configuration changes yourself](https://developer.android.com/guide/topics/resources/runtime-changes#HandlingTheChange) for more information and other possible configuration change events.

!!! aside.message--note
**Note:** In addition to window management, apps that access exclusive hardware resources like a camera or microphone should be aware that there may be other apps competing for the same resource. In a multi-window environment, it is possible that more than one of these apps will be visible, but only one will be active. See the [multi-window⁠](https://developer.android.com/guide/topics/ui/multi-window) documentation for more information on how to handle this.
!!!

### Non-resizable and full-screen activities

To make you app or activity non-resizable add the

```xml
android:resizeableActivity="false"
```

attribute to your AndroidManifest.xml file. See the [multi-window documentation](https://developer.android.com/guide/topics/ui/multi-window) for more information. If you are creating a game or media app, you may want to make your app [immersive](https://developer.android.com/training/system-ui/immersive).

!!! aside.message--note
**Note:** even apps/games that expect to be run in full-screen mode, should strive to implement fluid layouts and handle configuration changes gracefully.

## Window dimensions

In windowed environments, Activities can be resized. When possible, apps should implement [fluid layouts ⁠using ConstraintLayout⁠](https://developer.android.com/training/multiscreen/screensizes#flexible-layout). Apps also should consider adding [alternative screen layouts⁠](https://developer.android.com/training/multiscreen/screensizes#alternative-layouts) based on window dimensions to provide the best use of space and an optimal UI. Further advice for thinking through your layout architecture is found on the [Design Recommendations](/{{locale.code}}/android/design) page.

If your app needs to manually calculate layout dimensions at runtime, get the current window dimensions in dp ([density independent pixels](https://developer.android.com/training/multiscreen/screendensities#TaskUseDP)) using [getConfiguration](<https://developer.android.com/reference/android/content/res/Resources#getConfiguration()>) or in raw pixels using [displayMetrics](https://developer.android.com/reference/android/util/DisplayMetrics) as demonstrated below. Be sure to check for new window dimensions in every [onCreate⁠](<https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)>) call or on every [configuration change⁠](https://developer.android.com/guide/topics/resources/runtime-changes) if you are handling configurations changes yourself.

```kotlin
// Get window dimensions in dp
val config = appActivity.resources.configuration
val windowWidthDp = config.screenWidthDp
val windowHeightDp = config.screenHeightDp

// Get window dimensions in pixels
val displayMetrics = appActivity.resources.displayMetrics
val windowWidthPixels = displayMetrics.widthPixels
val windowHeightPixels = displayMetrics.heightPixels
```

!!! aside.message--note
**Note:** Beginning with Android 11 (SDK 30), use [WindowMetrics](https://developer.android.com/reference/kotlin/android/view/WindowMetrics?hl=en) to get the window size in pixels.
!!!

## Orientation guidelines

Apps designed for large screens should support both large landscape and portrait screens. Apps that are forced to run in a single orientation will provide a poor experience for users.

If your app is designed for portrait devices and providing an optimal landscape layout is not possible, consider adding a graphically pleasing, contextual, landscape background to the app to prevent black bars appearing on the sides or having your app placed in a small window. See [Orientation and Configuration Changes](/{{locale.code}}/games/optimizing-games-windowing#orientation-and-configuration-changes) on the [Games on Chrome OS](/{{locale.code}}/games/) page for more information.

## Initial launch size

Apps can specify their initial launch size in the following ways:

1. Use a specific launch size only in windowed environments: This helps the Chrome OS window manager give the desired launch bounds and orientation to an app and will not affect behaviour on mobile devices. To indicate launch preferences, add the following Chrome OS specific meta tags inside the [Activity⁠](https://developer.android.com/guide/topics/manifest/activity-element.html) element of the `AndroidManifest.xml` file:

```xml {title=AndroidManifest.xml}
<meta-data android:name="WindowManagerPreference:FreeformWindowSize"
  android:value="[phone|tablet|maximize]" />
<meta-data android:name="WindowManagerPreference:FreeformWindowOrientation"
  android:value="[portrait|landscape]" />

```

2. Use static launch bounds: Include a `<layout>` tag inside `AndroidManifest.xml` file to specify an initial window size:

```xml {title=AndroidManifest.xml}
<layout android:defaultHeight="500dp"
  android:defaultWidth="600dp"
  android:gravity="top|end"
  android:minHeight="450dp"
  android:minWidth="300dp" />

```

3. Use dynamic launch bounds: An app can use [setLaunchBounds(Rect)⁠](<https://developer.android.com/reference/android/app/ActivityOptions#setLaunchBounds(android.graphics.Rect)>) when creating a new Activity. If an empty rectangle is specified, the Activity will be started in a maximized state.

!!! aside.message--note
**Note:** All these possibilities require that an activity be started as a root activity or be launched from a clean activity stack.
!!!
