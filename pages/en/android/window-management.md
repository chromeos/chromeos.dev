---
title: Window management
metadesc: This page describes the window manager on Chrome OS.
date: 2020-05-01
weight: -4
tags:
  - window management
  - device configuration
---

Chrome OS supports Android apps in multiple windows. The system renders apps
into window containers whose size is determined by the form factor of the
device.

![An app window on different devices](/images/android/optimizing/fullscreen-and-windows.png)

## Resizing windows

In Chrome OS users can resize an app's window in the usual way, by dragging
the lower right corner.

![A resizable app window](/images/android/optimizing/resizable.png)

There are two options for handling window resizing:

- Respond to configuration changes dynamically by calling
  `onConfigurationChanged(..)` and adding
  ```xml
  android:configChanges="screenSize|smallestScreenSize|orientation|screenLayout"
  ```
  to the activity's manifest. Read
  [handling configuration change docs](https://developer.android.com/guide/topics/resources/runtime-changes)
  for more information about handling configuration changes.
- Let the system restart the activity. In this case you should implement
  `onSaveInstanceState` and use the [ViewModel architecture
  component](https://developer.android.com/topic/libraries/architecture/viewmodel) to restore the previous
  saved state.

This page shows how to ensure your app's window launches correctly, resizes
smoothly, and can display all of its contents when its size changes.

!!! aside.message--note
**Note:** In addition to window management, Android apps that run on Chrome OS
should consider multiple apps competing for exclusive resources like camera or microphone,
and the possibility that a visible app is not necessarily the active app. Read
[Multi-window docs](https://developer.android.com/guide/topics/ui/multi-window) for more information on how to
handle these issues.
!!!

## Window dimensions

In windowed environments, an activity can be resized. When possible, apps should
implement a [fluid layout](https://developer.android.com/training/multiscreen/screensizes#flexible-layout)
using [ConstraintLayout](https://developer.android.com/training/multiscreen/screensizes#ConstraintLayout). Apps should consider
adding [alternative screen layouts](https://developer.android.com/training/multiscreen/screensizes#alternative-layouts)
based on window dimenstions. Further advice for thinking through your layout is offered in [Design Recommendations](/{{locale.code}}/android/design).

If your app needs to manually calculate layout dimensions at runtime, check the current dimensions in
[onCreate](<https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)>)
and on every [configuration change](https://developer.android.com/guide/topics/resources/runtime-changes) and adjust
accordingly.

```kotlin
val displayManager = getSystemService(Context.DISPLAY_SERVICE)
    as DisplayManager
val display = displayManager.getDisplay(Display.DEFAULT_DISPLAY)
val metrics = DisplayMetrics()

display.getRealMetrics(metrics)
Log.d(LOG_TAG, "DisplayMetrics - w: ${metrics.widthPixels},
    h: ${metrics.heightPixels}")
```

## Orientation guidelines

Apps designed for large screens should support both large landscape and portrait screens.
Apps that are forced to run in a single orientation will provide a poor experience for users.

If your app is designed for portrait devices and providing a optimal landscape layout is not
possible, consider adding a graphically pleasing, contextual background to the app to prevent
black bars appearing on the sides. See also [Orientation and Configuration Changes](/{{locale.code}}/games/optimizing-games-windowing#orientation-and-configuration-changes)
in [Games on Chrome OS](/{{locale.code}}/games/).

## Initial launch size

Apps can specify their initial launch size in the following ways:

- Use a launch size only in desktop environments.
  This helps the window manager to give you the proper bounds and
  orientation. To indicate a preferences when used in desktop mode, add
  the following meta tags inside the
  [<activity>](https://developer.android.com/guide/topics/manifest/activity-element.html) tag:

```xml
<meta-data android:name="WindowManagerPreference:FreeformWindowSize"
  android:value="[phone|tablet|maximize]" />
<meta-data android:name="WindowManagerPreference:FreeformWindowOrientation"
  android:value="[portrait|landscape]" />
```

- Use static launch bounds. Use `<layout>` inside the manifest entry of your
  activity to specify a "fixed" starting size. See this example:

```xml
<layout android:defaultHeight="500dp"
  android:defaultWidth="600dp"
  android:gravity="top|end"
  android:minHeight="450dp"
  android:minWidth="300dp" />
```

- Use dynamic launch bounds. An activity can create and use
  [setLaunchBounds(Rect)](<https://developer.android.com/reference/android/app/ActivityOptions#setLaunchBounds(android.graphics.Rect)>)
  when creating a new activity. By specifying an empty rectangle, your app can be maximized.

!!! aside.message--note
**Note:** All these possibilities only work if the activity started is a root
activity or when launched from a clean activity stack.
!!!
