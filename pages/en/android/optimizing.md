---
title: Optimization guidelines
metadesc: This document describes some actions that you can take to optimize your Android apps for Chrome OS devices.
date: 2020-05-01
weight: 0
tags:
  - window management
  - keyboard support
  - mouse support
  - trackpad support
  - stylus support
---

Android apps have an important role to play in redefining what modern computing looks like on large screens. That said, simply porting your phone app to Chromebooks won't give your users the best experience. This page details some ways that you can tailor your experience towards laptop and convertible form factors. We also have a [comprehensive list of tests](/{{locale.code}}/android/tests) that we recommend using to determine where your app may be falling short on these devices.

## Leverage support for free-form multi-window

Users can resize the window that hosts your Android app, as shown in [Figure 1](#figure-1). To ensure that your free-form windows resize smoothly and are able to display their entire contents to the user, read the guidelines and things to watch out for in [Window Management](/{{locale.code}}/android/window-management).

#1[A resizable app window](/images/android/optimizing/resizable.png)

You can improve the user experience when your app runs on Chrome OS by following these best practices:

- Handle the [activity lifecycle](https://developer.android.com/guide/topics/ui/multi-window) correctly in multi-window and make sure you're continuing to update the UI while your app is not the top focused window.
- Make sure that your app adjusts its layout appropriately whenever the user resizes its window.
- Customize the initial dimensions of the app's window by specifying its [launch size](/{{locale.code}}/android/window-management#launch-size).
- The orientation of the app's root activity affects all of its windows. Be aware of the [root activity rules](/{{locale.code}}/android/window-management#the-root-activity-rules).

For more information, read about [window management](/{{locale.code}}/android/window-management).

## Customize the top bar color

Chrome OS uses the app theme to color the top bar displayed on top of the app, which shows when users hold the window controls and the back button. To make your app look polished and customized for Chrome OS, define [`colorPrimary`](https://developer.android.com//reference/android/R.attr#colorPrimary) and (if possible) [`colorPrimaryDark`](https://developer.android.com//reference/android/R.attr#colorPrimaryDark) values in your app's theme. The latter is used to color the top bar. If only `colorPrimary` is defined, Chrome OS uses a darker version of it in the top bar. For more information, see [Using the material theme](https://developer.android.com//training/material/theme).

## Support the keyboard, trackpad, and mouse

All Chromebooks have a physical keyboard and a trackpad, and some have a touchscreen as well. Some devices can even convert from laptop to tablet form.

All apps for Chrome OS should support mouse, trackpad and keyboard and be usable without a touchscreen. Many apps already support mouse and trackpad with no extra work required. However, it's always best to customize your app's behavior appropriately for mouse, and you should support and distinguish between mouse and touch inputs. Read more about mouse support in [Input compatibility for Chromebooks](/{{locale.code}}/android/input-compatibility#mouse-and-touchpad-support).
You should ensure that:

- All targets are clickable with mouse
- All touch scrollable surfaces scroll on mouse wheel events ([Figure 3](#figure-3))
- Hover states ([Figure 4](#figure-4)) are implemented with intention and best judgment to improve UI discovery without overwhelming the user.

#3[Scrolling with mouse wheel](/images/android/optimizing/scroll-on-mousewheel.png)

#4[Button hover states](/images/android/optimizing/hover-states.png)

Where appropriate, you should differentiate between mouse and touch inputs. For example, tapping an item could trigger a multi-select UI while clicking the same item could trigger a single selection instead.

### Custom cursors

Apps should customize mouse cursors to indicate what element of their UI can be interacted with and how. You can set the [`PointerIcon`](https://developer.android.com/reference/android/view/PointerIcon) to use when users interact with a view by calling the [`setPointerIcon()`](https://developer.android.com/reference/android/view/View#setPointerIcon) (`android.view.PointerIcon`) method.

Apps should show:

- I-beam pointers for text.
- Resize handles at resizable layer edges.
- Open hand / closed hand pointers for content that can be panned or dragged through a click and drag gesture.
- Processing spinners.

The `PointerIcon` class provides [constants](https://developer.android.com/reference/android/view/PointerIcon#constants) that you can use to implement custom cursors.

### Keyboard shortcuts and navigation

Since every Chromebook has a physical keyboard, you should provide hotkeys to allow your users to be more productive. For example, if your app supports printing, you could use `Control+P` to open a print dialog. Similarly, all crucial UI should also be handled by [tab navigation](https://developer.android.com/training/keyboard-input/navigation#Tab) ([Figure 5](#figure-5)). This is especially important for accessibility. To meet accessibility standards, however, all UI surfaces should have obvious and accessibility-compliant focused states ([Figure 6](#figure-6)).

#5[Transversal tabbing](/images/android/optimizing/transversal-tabbing.png)

#6[Replacing a swipe gesture with a control that appears on hover](/images/android/optimizing/hover-controls.png)

You should also make sure to implement keyboard or mouse alternatives to core features hidden under touch-specific interactions, such as long presses, swipes, or other multi-touch gestures. An example solution would be to provide buttons that appear on a surface on hover.

## Further enhance user input

To attain desktop grade functionality for your app, consider these extra, productivity-oriented inputs.

### Context menus

![A context menu appearing on right click](/images/android/optimizing/contextual-menu.png)

Android context menus, which are another accelerator for taking users to features of your app, can be triggered by a click of a mouse or trackpad's secondary button, or through a long press on a touchscreen.

### Drag and drop

![Drag and drop in a file tree interface](/images/android/optimizing/drag-and-drop.png)

Building drag and drop interactions can bring efficient, intuitive productivity functionality to your app. For more information, see [Drag and drop](https://developer.android.com/guide/topics/ui/drag-drop).

### Stylus support

Stylus support is crucial for drawing and note taking apps. Provide enhanced support for stylus-equipped Chromebooks and tablets by implementing interactions tailored to the usage of stylus input. Be considerate of the potential variations in different stylus hardware when designing your stylus interactions. See [Stylus documentation for Chromebooks](/{{locale.code}}/android/input-compatibility#stylus) for an outline of the stylus APIs.

## Make your layouts responsive

![Responsive Layout](/images/android/optimizing/responsive-layout.png)

Your app should make good use of the screen real estate available regardless of the visual state (fullscreen, portrait, landscape, windowed). For specific guidance on how to achieve this on Chrome OS and other larger screen devices, check out our [Design Recommendations](/{{locale.code}}/android/design)

## Change navigation patterns

As your app becomes increasingly customized for a laptop environment, consider moving towards a navigation pattern that de-emphasizes the back button. The app should be able to handle its own history stack by providing in-app back buttons, breadcrumbs, or other escape routes like close or cancel buttons as part of its large screen UI. A system-level back button is a pattern carried over from Android's handheld roots—one that doesn't fit as well in a desktop context.

You can control whether or not your app displays a back button in its window by setting a preference inside the [`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element) tag. A setting of `true` will hide the back button:

```xml
<meta-data android:name="WindowManagerPreference:SuppressWindowControlNavigationButton" android:value="true" />
```

Resolve issues with camera preview images

Camera problems can arise when the app can only run in portrait orientation but the user runs it on a landscape screen. In this case, the preview, or the captured result, could be incorrectly rotated.

[Compatibility mode](/{{locale.code}}/android/input-compatibility) changes how the system handles events, such as orientation changes, in Chrome OS. This helps to prevent issues when the camera is used in the wrong orientation mode. To enable compatibility mode:

- Target at least Android 7.0 (API level 24). You can still pick a lower mininum SDK level.
- Allow your app to be resizable.

## Handle device settings

### Change volume

Chrome OS devices are _fixed volume_ devices. Apps that play sound should have their own volume controls. Follow the guidelines for [Working with fixed volume devices](https://developer.android.com/guide/topics/media-apps/volume-and-earphones#fixed-volume).

### Change screen brightness

You cannot adjust device brightness on Chrome OS. Calls to the [`system settings`](https://developer.android.com/reference/android/provider/Settings.System) and [`WindowManager.LayoutParams`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams) are ignored.
