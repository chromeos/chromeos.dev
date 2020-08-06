---
title: Window management
metadesc: This page describes the window manager on Chrome OS.
date: 2020-05-01
weight: -4
tags:
  - window management
  - device configuration
---

The implementation of Android apps on Chrome OS includes basic multi-window support. Instead of always taking up the full screen, Android renders apps on Chrome OS into free-form window containers that are appropriate for this form factor, as shown in [Figure 1](#figure-1).

#1[An app in different window sizes](/images/android/optimizing/fullscreen-and-windows.png)

Users can resize the window that hosts your Android app, as shown in [Figure 2](#figure-2). To ensure that your free-form windows resize smoothly and are able to display their entire contents to the user, read the guidelines and things to watch out for below.

#2[A resizable app window](/images/android/optimizing/resizable.png)

This poses some lifecycle challenges and new things to consider with a free-form environment. The free-form environment allows a much higher likelihood of your app being visible but not the active app or having multiple apps competing for exclusive resources such as the camera or microphone. Check out the [Multi-window docs](https://developer.android.com/guide/topics/ui/multi-window) here for more information on these, and how to best handle these!

## Resize tasks and windows

Because the activity's window size can change, activities should read the activities' resolution upon start. Activities should react to resolution changes by calling `onConfigurationChanged(..)` or letting the activity be restarted by the system. For example, to avoid losing user's work upon maximization, you can do either of the following:

- Restore the previous state by using the [ViewModel architecture component](https://developer.android.com/topic/libraries/architecture/viewmodel) and `onSaveInstanceState` to make the transition as simple as possible. This is applicable where requesting a restart is the best option.
- Handle configuration changes dynamically by adding `android:configChanges="screenSize|smallestScreenSize|orientation|screenLayout"` to the activity's manifest.

There is more information on handling configuration changes like resizing in the [handling configuration change docs](https://developer.android.com/guide/topics/resources/runtime-changes)

When looking for the current configuration, always use the configuration from your current activity in `getResources().getConfiguration()`. Do not use the configuration from your background activity or the one from the system resource. The background activity does not have a size, and the system's configuration may contain multiple windows with conflicting sizes and orientations, so no usable data can be extracted.

Another important consideration is that window content bounds can change. For example, the area within the window that is used by the app can change if the window gets too big to fit the screen. Consider the following guidelines:

- Apps that utilize Android's layout process should automatically be laid out in the available space.
- Native apps should read the available area and monitor size changes to avoid having inaccessible UI elements. Call the following methods to determine the initial available size for this surface:

  - `NativeActivity.mLastContent[X/Y/Width/Height]()`
  - `findViewById(android.R.id.content).get[Width/Height]()`

  Continuous monitoring can be done via observer:

  - `NativeActivity.onContentRectChangedNative()`
  - `NativeActivity.onGlobalLayout()`
  - Add a listener to `view.addOnLayoutChangeListener(findViewById(android.R.id.content))`If the app is pre-scaling its artwork, it should do this every time the resolution changes.

The system supports free resizing; however, not all apps were written with resizing in mind. Here are some potential issues to look for:

- Handle resizing seamlessly. You can get resized at any point in time because of all kind of reasons. As such it is really important to be able to save and restore your state as well as possible via `onSaveInstanceState` if a restart becomes necessary. Note that this is also beneficial for Android in general.
- Also make sure that an activity restart is fast by caching objects you have previously allocated. If you do not use the frameworks layout mechanisms—so your app would for example use OpenGL and scale the content, or some other logic kicks in—you should listen to `onConfigurationChanged` events to avoid activity restarting. Make sure to specify all change events you can handle dynamically.
- If you do not want to get resized you should specify this in your manifest file accordingly.
- It is important to note that the window size is not the screen size and that you probably never need the screen size anyways. To get the window size you should use `Activity.getResources().getConfiguration().screenWidth` and `Activity.getResources().getConfiguration().screenHeight` in DP.

To get your current configuration, always use your activity's resource and get the configuration from there, since otherwise you might end up looking at "something," such as the screen properties.

Note that the screen position can change as well. So be sure to always use the system to do window-to-screen space calculations or vice versa.

If you are using Android's view system, your window should get layed out automatically with a size change.

If you do not use the view system and take over the surface, your app must handle size changes on your own.

Native apps should use the `mLastContent` members—or getting the content view to get the initial size.

Once the app is running it should listen to `onContentRectChangedNative` or `onGlobalLayout` events to react to size changes.

Note that with a size change an app should rescale or reload layouts, artwork and update input areas.

## The root activity rules

A window on Chromebooks consists of a stack of activity windows. Each window in this stack has the same size and orientation.

To avoid sudden orientation and size changes—which are confusing for the user in a desktop environment—the window manager on Chromebooks does the
same as the window manager in Android when the side by side mode is used:

- The activity at the bottom of the stack dictates the attributes of all activities above. This can lead into unexpected situations where a newly
  started activity which is portrait unresizable becomes landscape resizable.

Device mode has an effect here: in tablet mode the orientation is not locked and each orientation dictates its own orientation as it is normal on Android. However, the app size locks, if the activity targets Android 6.0 (API level 23) or lower.

## Orientation

The most common orientation is portrait as phones are mostly held this way. This mode is good for phones, but terrible for laptops. On the other hand, landscape is good for laptops and good for tablets. To get the best results for your application with a window manager, you should consider supporting both orientations.

Some Android apps assume that when a device is held in the portrait mode, the rotation value is always [`Surface.ROTATION_0`](https://developer.android.com/reference/android/view/Surface#ROTATION_0). This may be true for most Android devices. However, when the app is in a certain [ARC](https://developer.chrome.com/apps/getstarted_arc) mode, the rotation value for the portrait orientation may not be [`Surface.ROTATION_0`](https://developer.android.com/reference/android/view/Surface#ROTATION_0).

To get an accurate rotation value while reading the accelerometer or similar sensors, use the [`Display.getRotation()`](<https://developer.android.com/reference/android/view/Display.html#getRotation()>) method and swap the axis accordingly.

If you support only one, add the information to the manifest so that the window manager knows about this before starting the application. When specifying an orientation, make sure that you specify sensor orientations when possible as Chromebooks are often convertibles and upside down apps are annoying. Please do stick with a selected orientation - and most important of all: Avoid requesting one orientation in the manifest and then set another programmatically later. If you change the orientation based on window size, you might get stuck in a small portrait size window, and the user cannot get back into a big landscape window.

## Launch size

Apps can change their launch size by using one of the following ways:

- Use a launch size only in desktop environments. This helps the window manager to give you the proper bounds and orientation. To indicate a preferences when used in desktop mode, add the following meta tags inside the [`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element) tag:

  ```xml
  <meta-data android:name="WindowManagerPreference:FreeformWindowSize"
             android:value="[phone|tablet|maximize]" />
  <meta-data android:name="WindowManagerPreference:FreeformWindowOrientation"
             android:value="[portrait|landscape]" />
  ```

- Use static launch bounds. Use `<layout>` inside the manifest entry of your activity to specify a "fixed" starting size. See this example:

  ```xml
    <layout android:defaultHeight="500dp"
            android:defaultWidth="600dp"
            android:gravity="top|end"
            android:minHeight="450dp"
            android:minWidth="300dp" />
  ```

- Use dynamic launch bounds. An activity can create and use `ActivityOptions.setLaunchBounds(Rect)` when creating a new activity. By specifying an empty rectangle, your app can be maximized.
  !!! aside.message--note
  **Note:** All these possibilities work only if the activity started is a root activity. You can also do this using springboard activity, that is, cleaning
  the activity stack in the task with a new start.
  !!!

## Monitor view hierarchy changes

Adding a window control caption can cause some problems. Consider the following recommendations:

- Don't expect your content to start at (0,0) of the window. The window content might be offset by the height of the caption. Look at the view's screen location using `View.getLocationInWindow()` to get the correct offset.
- Don't expect that the `DecorView` is the holder of the `contentView`. The caption is part of the window hierarchy and if it exists, it is located between the `DecorView` and the content view. As such, adhere to the following:
  - Don't change the view hierarchy directly below `DecorView`.
  - Don't assume that the child from `DecorView` is of type `LinearLayout`.
- Don’t make the assumption that `Configuration.screenHeightDp` is the height of your app’s content area. Part of this height is taken up by the caption view, if one exists. The same applies to `Display.getSize()`, and so on.

## Full screen

This works the same way as on stock Android: If the window is not covering the full screen, requests for full screening (hiding all system-UI) are ignored. When the app is maximized the normal methods / layouts / functions to get into fullscreen mode apply. This way the system UI (window control bar and the shelf) goes away.

## Other considerations

Here are some other aspects to consider:

- If your activity is always intended to run in full screen, add the `android:resizeableActivity="false"` flag to your manifest.
- End users are presented with window controls to toggle among all available layouts. By choosing the correct orientation option, you can ensure that the user has the correct layout upon launching the app. If an app is available in portrait and landscape, it defaults to landscape, if possible. After this option is set, it is remembered on a per-app basis.
- Try to avoid unnecessary orientation changes. For example, if the activity orientation is PORTRAIT, but the app calls `setRequestedOrientation(LANDSCAPE)` at runtime, this causes unnecessary window resizing, which is annoying to the user and possibly restarts if your app cannot handle it. The preferred option is to set the orientation once, for example, in the manifest, and only change it if necessary.
- Don’t call `finish()` in your activity’s `onDestroy` method. This causes the app to close upon resize and not restart, assuming your app has to restart.
- Don’t use window types that aren't compatible, such as `TYPE_KEYGUARD` and `TYPE_APPLICATION_MEDIA`.

!!! aside.message--note
**Note:** We recommend that you test your app to ensure that it handles changes in window size appropriately.
!!!
