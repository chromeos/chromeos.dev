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

Android apps have an important role to play in redefining what modern computing looks like on large screens. That said, simply running your phone app on a Chromebook won’t give your users the best experience. This page details some ways that you can tailor your experience towards laptop and convertible form factors. See our [comprehensive list of tests](/{{locale.code}}/android/tests) to learn more about testing your app for compatibility on these devices.

## Leverage support for free-form multi-window

The implementation of Android apps on Chrome OS includes basic multi-window support. Instead of always taking up the full screen, Android renders apps on Chrome OS into free-form window containers which is more appropriate for these devices.

Users can resize the window that contains your Android app, as shown in figure 1. To ensure that your free-form windows resize smoothly and are able to display their entire contents to the user, read the guidelines in [Window Management](/{{locale.code}}/android/window-management).

#1[A resizable app window](/images/android/optimizing/resizable.png)

You can improve the user experience when your app runs on Chrome OS by following these best practices:

- Handle the [activity lifecycle](https://developer.android.com/guide/topics/ui/multi-window) correctly in multi-window mode and make sure you're continuing to update the UI even when your app is not the topmost focused window.
- Make sure that your app adjusts its layout appropriately whenever the user resizes its window.
- Customize the initial dimensions of the app's window by specifying its [launch size](/{{locale.code}}/android/window-management#initial-launch-size).
- The orientation of the app's root activity affects all of its windows. Be aware of the [root activity rules](/{{locale.code}}/android/window-management#the-root-activity-and-orientation).

For more information, read about [window management](/{{locale.code}}/android/window-management).

## Customize the top bar color

Chrome OS uses the app theme to color the top bar displayed on top of the app, which shows when users hold the window controls and the back button. To make your app look polished and customized for Chrome OS, define [`colorPrimary`](https://developer.android.com/reference/android/R.attr.html#colorPrimary) and (if possible) [`colorPrimaryDark`](https://developer.android.com/reference/android/R.attr.html#colorPrimaryDark) values in your app's theme. The latter is used to color the top bar. If only `colorPrimary` is defined, Chrome OS uses a darker version of it in the top bar. For more information, see [Using the material theme](https://developer.android.com/training/material/theme.html).

## Support the keyboard, trackpad, and mouse

All Chromebooks have a physical keyboard and a trackpad, and some have a touchscreen as well. Some devices can even convert from laptop to tablet form.

All apps for Chrome OS should support mouse, trackpad and keyboard and be usable without a touchscreen. Many apps already support mouse and trackpad with no extra work required. However, it's always best to customize your app's behavior appropriately for mouse, and you should support and distinguish between mouse and touch inputs. Read more about mouse support in [Input compatibility for Chromebooks](/{{locale.code}}/android/input-compatibility).

You should ensure that:

- All targets are clickable with mouse
- All touch scrollable surfaces scroll on mouse wheel events
- Hover states are implemented with intention and best judgment to improve UI discovery without overwhelming the user.

#2[Scrolling with mouse wheel](/images/android/optimizing/scroll-on-mousewheel.png)

#3[Button hover states](/images/android/optimizing/hover-states.png)

Where appropriate, you should differentiate between mouse and touch inputs. For example, long pressing an item could trigger a multi-select UI while right clicking the same item could trigger an options menu instead.

### Custom cursors

Apps should customize mouse cursors to indicate what element of their UI can be interacted with and how. You can set the [`PointerIcon`](https://developer.android.com/reference/android/view/PointerIcon.html) to use when users interact with a view by calling the [`setPointerIcon()`](<https://developer.android.com/reference/android/view/View.html#setPointerIcon(android.view.PointerIcon)>) method.

Apps should show:

- I-beam pointers for text.
- Resize handles at resizable layer edges.
- Open hand / closed hand pointers for content that can be panned or dragged through a click and drag gesture.
- Processing spinners.

The `PointerIcon` class provides [constants](https://developer.android.com/reference/android/view/PointerIcon.html#constants) that you can use to implement custom cursors.

### Keyboard shortcuts and navigation

Since every Chromebook has a physical keyboard, you should provide hotkeys to allow your users to be more productive. For example, if your app supports printing, you can use **Control + P** to open a print dialog. Similarly, all important UI elements should also be handled by [tab navigation](https://developer.android.com/training/keyboard-input/navigation.html#Tab). This is especially important for accessibility. To meet accessibility standards, however, all UI surfaces should have obvious and accessibility-compliant focused states.

#4[Transversal tabbing](/images/android/optimizing/transversal-tabbing.png)

#5[Replacing a swipe gesture with a control that appears on hover](/images/android/optimizing/hover-controls.png)

You should also make sure to implement keyboard or mouse alternatives to core features hidden under touch-specific interactions, such as long presses, swipes, or other multi-touch gestures. An example solution would be to provide buttons that appear on a surface on hover.

## Further enhance user input

To attain desktop grade functionality for your app, consider these extra, productivity-oriented inputs.

### Context menus

![A context menu appearing on right click](/images/android/optimizing/contextual-menu.png)

Android context menus, which are another accelerator for taking users to features of your app, can be triggered by a click of a mouse or trackpad's secondary button, or through a long press on a touchscreen.

### Drag and drop

![Drag and drop in a file tree interface](/images/android/optimizing/drag-and-drop.png)

Building drag and drop interactions can bring efficient, intuitive productivity functionality to your app. For more information, see [Drag and drop](https://developer.android.com/guide/topics/ui/drag-drop.html).

### Stylus support

Stylus support is crucial for drawing and note taking apps. Provide enhanced support for stylus-equipped Chromebooks and tablets by implementing interactions tailored to the usage of stylus input. Be considerate of the potential variations in different stylus hardware when designing your stylus interactions. See [Input compatibility for Chromebooks](https://developer.android.com/topic/arc/input-compatibility.html) for an outline of the stylus APIs.

## Make your layouts responsive

![Responsive Layout](/images/android/optimizing/responsive-layout.png)

Your app should make good use of the screen real estate available regardless of the visual state (fullscreen, portrait, landscape, windowed). Some examples of good space usage include but are not limited to:

- Displaying app architecture.
- Limiting text length and image size to a max-width.
- Making better use of real estate in the app's toolbar.
- Improving placement of UI affordances, by adapting it to mouse usage instead of thumb usage.
- Optimizing the size for videos and images, establishing a set of max-width and height for all media, and maximizing readability and scannability.
- Implementing a responsive column system. For more information, see [Responsive UI](https://material.io/guidelines/layout/responsive-ui.html).
- Resizing and modifying the UI when needed using the column system, and avoiding opening a new windows when possible.
- Removing or reducing the importance of horizontal scrolling components.
- Avoiding fullscreen modal UI. Use inline UI, such as progress indicators and alerts, for all non-critical actions
- Using improved UI components, such as time and date picker, text fields, and dropdowns, that are designed for mouse, keyboard and larger screens.
- Using inline edits, additional column or modal ui instead of a new activity for small to medium edit feature.
- Removing or modifying floating action buttons (FAB) for better keyboard navigation. By default, a FAB is positioned last in transversal tabbing order. It should be made first because it is the primary action or it should be replaced by another higher level affordance.

## Change navigation patterns

As your app becomes increasingly customized for a laptop environment, consider moving towards a navigation pattern that de-emphasizes the back button. The app should be able to handle its own history stack by providing in-app back buttons, breadcrumbs, or other escape routes like close or cancel buttons as part of its large screen UI. A system-level back button is a pattern carried over from Android's handheld roots—one that doesn't fit as well in a desktop context.

You can control whether or not your app displays a back button in its window by setting a preference inside the [`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element.html) tag. A setting of **true** will hide the back button:

```xml
<meta-data android:name="WindowManagerPreference:SuppressWindowControlNavigationButton" android:value="true" />
```

## Resolve issues with camera preview images

Camera problems can arise when the app can only run in portrait orientation but the user runs it on a landscape screen. In this case, the preview, or the captured result, could be incorrectly rotated.

Compatibility mode changes how the system handles events, such as orientation changes, in Chrome OS. This helps to prevent issues when the camera is used in the wrong orientation mode. To enable compatibility mode:

- Target at least Android 7.0 (API level 24). You can still pick a lower minimum SDK level.
- Allow your app to be resizable.

## Handle device settings

### Change volume

Chrome OS devices are _fixed volume_ devices. Apps that play sound should have their own volume controls. Follow the guidelines for [Working with fixed volume devices](https://developer.android.com/guide/topics/media-apps/volume-and-earphones.html#fixed-volume).

### Change screen brightness

You cannot adjust device brightness on Chrome OS. Calls to the [`system settings`](https://developer.android.com/reference/android/provider/Settings.System.html) and [`WindowManager.LayoutParams`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams.html) are ignored.
