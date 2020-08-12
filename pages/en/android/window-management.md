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
device, as shown in Figure 1.

#1[An app window on different devices](/images/android/optimizing/fullscreen-and-windows.png)

## Resizing windows

In Chrome OS users can resize an app's window in the usual way, by dragging
the lower right corner, as shown in Figure 2.

#2[A resizable app window](/images/android/optimizing/resizable.png)

There are two options for handling window resizing:

- Respond to configuration changes dynamically by calling
  `onConfigurationChanged(..)` and adding, for example,
  `android:configChanges="screenSize|smallestScreenSize|orientation|screenLayout"`
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
**Note:** In addition to window management, Android apps that run on Chrome OS pose
lifecycle management challenges. There are also other issues to consider, such
as multiple apps competing for exclusive resources like camera or microphone,
and the possibility that a visible app is not necessarily the active app. Read
[Multi-window docs](https://developer.android.com/guide/topics/ui/multi-window) for information on how to
handle these issues.
!!!

## Window dimensions

An activity should read its window dimensions every time it starts, and
arrange its content according to the current configuration.

To determine the current configuration, call `getResources().getConfiguration()`
on the current activity. Do not use the
configuration of the background activity or the system resource.
The background activity does not have a size, and the system configuration may
contain multiple windows with conflicting sizes and orientations, so no usable
data can be extracted.

Note that the _window_ size and the _screen_ size are not the same. To get the
window size in DP, use `Activity.getResources().getConfiguration().screenWidth`
and `Activity.getResources().getConfiguration().screenHeight`. You probably
never need to use the screen size.

### Content bounds

A window's content bounds can change upon resizing. For example, the area within
the window that is used by the app can change if the window becomes too big to
fit on the screen. Follow these guidelines:

- Apps that use Android's layout process are automatically laid out
  in the available space.
- Native apps should read the available area and monitor size changes to avoid
  having inaccessible UI elements. Call the following methods to determine the
  initial available size for this surface:

  - `NativeActivity.mLastContent[X/Y/Width/Height]()`
  - `findViewById(android.R.id.content).get[Width/Height]()`

  Continuous monitoring can be done via observer:

  - `NativeActivity.onContentRectChangedNative()`
  - `NativeActivity.onGlobalLayout()`
  - Add a listener to `view.addOnLayoutChangeListener(findViewById(android.R.id.content))`
    If the app is pre-scaling its artwork, it should do this every time the resolution changes.

### Free-form resizing

Chrome OS allows any window to be freely resized: the user can change a window's
width, height, and position on the screen. Many Android apps are written without
free-form resizing in mind. Consider these issues:

- The screen position might change. Always use the
  system to perform window-to-screen and screen-to-window coordinate transformations.
- If you are using Android's view system, your window layout
  automatically changes when its size changes.
- If you do not use the view system and take over the surface, your app must
  handle size changes on its own.
- Native apps should use the `mLastContent` members, or use the content view to
  determine the initial size.
- When the app is running it should listen to `onContentRectChangedNative` or
  `onGlobalLayout` events to react to size changes.
- When the app's size changes, it should rescale or reload layouts, artwork
  and update input areas.

### Full screen mode

Full screen mode works the same way as on stock Android.
If the window is not covering the full screen, requests for full screening
(hiding all system-UI) are ignored. When the app is maximized
the normal fullscreen methods, layouts, and functions are performed.
This hides the system UI elements (window control bar and the shelf).

## Screen orientation

The most common orientation for an Android app is portrait, since that's how
most phones are held. While portrait is good for phones, it's terrible for
laptops and tablets, where landscape is preferred. To get
the best results for your app consider supporting both orientations.

Some Android apps assume that when a device is held in the portrait mode, the
rotation value is always [`Surface.ROTATION_0`](https://developer.android.com/reference/android/view/Surface.html#ROTATION_0).
This may be true for most Android devices. However, when the app is in a
certain mode, the rotation value for the portrait orientation may not be
[`Surface.ROTATION_0`](https://developer.android.com/reference/android/view/Surface.html#ROTATION_0).

To get an accurate rotation value while reading the accelerometer or similar
sensors, use the [`Display.getRotation()`](<https://developer.android.com/reference/android/view/Display.html#getRotation()>)
method and swap the axis accordingly.

### The root activity and orientation

A Chromebook window consists of a stack of activity windows. Each window
in the stack has the same size and orientation.

Sudden orientation and size changes are confusing in a desktop
environment. The Chromebook window manager avoids this in a way that's similar
to Android's side by side mode: The activity at the bottom of the stack controls
the attributes of all activities above. This can lead to unexpected situations
where a newly started activity which is portrait unresizable becomes landscape
resizable.

Device mode has an effect here: In tablet mode the orientation is not locked and
each window preserves its own orientation as it is normal
on Android.

### Orientation guidelines

Follow these guidelines for handling orientation:

- If you support only one orientation, add the information to the manifest so
  the window manager knows about it before starting the application. When you
  specify the orientation, also specify the sensor orientations when possible.
  Chromebooks are often convertibles and upside down apps are annoying.
- Try to stay with a single selected orientation. Avoid requesting one orientation
  in the manifest and setting another programmatically later.
- Be careful changing the orientation based on window size. The user might get
  stuck in a small portrait-size window, and not be able to return to a larger
  landscape window.
- There are window controls in Chrome to toggle between all available
  layouts. By choosing the correct orientation option, you can ensure that the user
  has the correct layout upon launching the app. If an app is available in portrait
  and landscape, it defaults to landscape, if possible. After this option is set,
  it is remembered on a per-app basis.
- Try to avoid unnecessary orientation changes. For example, if the activity
  orientation is PORTRAIT, but the app calls `setRequestedOrientation(LANDSCAPE)`
  at runtime, this causes unnecessary window resizing, which is annoying to the
  user and possibly restarts the app if you cannot handle it. It's better to set
  the orientation once, for example, in the manifest, and only change it
  if necessary.

## Initial launch size

Apps can specify their initial launch size in the following ways:

- Use a launch size only in desktop environments.
  This helps the window manager to give you the proper bounds and
  orientation. To indicate a preferences when used in desktop mode, add
  the following meta tags inside the
  [`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element.html):

      <meta-data android:name="WindowManagerPreference:FreeformWindowSize"
                 android:value="[phone|tablet|maximize]" />
      <meta-data android:name="WindowManagerPreference:FreeformWindowOrientation"
                 android:value="[portrait|landscape]" />

- Use static launch bounds. Use `<layout>` inside the manifest entry of your
  activity to specify a "fixed" starting size. See this example:

      <layout android:defaultHeight="500dp"
              android:defaultWidth="600dp"
              android:gravity="top|end"
              android:minHeight="450dp"
              android:minWidth="300dp" />

- Use dynamic launch bounds. An activity can create and use
  `ActivityOptions.setLaunchBounds(Rect)` when creating a new activity. By
  specifying an empty rectangle, your app can be maximized.

!!! aside.message--note
Note: All these possibilities work only if the activity started is a root
activity. You can also do this using springboard activity, that is, cleaning
the activity stack in the task with a new start.
!!!

## Other considerations

Here are some other aspects to consider when working with Android apps in
Chrome OS:

- Don’t call `finish()` in your activity’s `onDestroy` method. This causes the
  app to close upon resize and not restart, assuming your app has to restart.
- Don’t use window types that aren't compatible, such as `TYPE_KEYGUARD` and
  `TYPE_APPLICATION_MEDIA`.
- Be sure that an activity restart is fast by caching objects that have been
  previously allocated.
- If you do not want the user to resize your app, specify
  <code>android:resizeableActivity=false</code> in your manifest file.
- Test your app to ensure that it handles changes in
  window size appropriately.
