---
title: 'GDC 2019 recap: Optimizing Android games for larger screens & foldables'
metadesc: A recap of Google at the Game Developer Conference 2019 with some helpful coding tips and tricks.
tags:
  - events
  - technical
  - success story
  - gaming
  - large screens
  - high-performance graphics
  - android
  - device configuration
  - window management
  - input devices
  - keyboard support
  - mouse support
authors:
  - bgable
hero:
  image: ix://posts/gdc-2019-recap/hero.png
  alt: Illustration of laptop and foldable device.
date: 2019-05-02
---

_This article originally appeared on Google Play Medium._

At this year’s Game Developer Conference, we were thrilled to share how versatile devices have sparked a new evolution in gaming. Thanks to improved mobile hardware capabilities such as 3D displays and higher resolution screens, we’re seeing more and more titles pop up in the Play Store that pull gamers in with immersive graphics and gameplay.

Naturally, these gaming experiences look and play even better on big screens. That means developers can gain access to a massive and fast-growing audience by optimizing their games for different form factors and larger displays.

If you have a game in the Google Play Store, it’s probably already running on Chrome OS. Chromebooks run a full version of the Android framework inside a container, so it’s just like running your game on an Android device. But, by making a few more adjustments, developers can optimize their games to look and run their best on large-screen devices, as well as set the foundation for optimal gameplay on foldables.
Check out a recap below of what we covered during our GDC session, along with helpful coding tips and tricks.

## Common issues with games on larger screens

As game developers, you want to provide the best possible gaming experience on every device — whether users are playing on a phone in portrait mode, a device with a keyboard and mouse, or a foldable with multiple display configurations and resolutions. By following Android best practices, developers can deliver a great baseline experience across all these scenarios.

In the APK, this starts with a configuration change. The system detects a device configuration change and will automatically restart your activity with new resources that allow your game or app to adapt to the new configuration.

```java
public void onConfigurationChanged(Configuration newConfig) {
    //Scale UI
    //Toggle control scheme
    //Adjust orientation
    //etc
}
```

By default, the system will handle configuration changes automatically by invoking `onSaveInstanceState` before restarting the activity. That can take longer for resource-heavy games, so you’ll want to set this up yourself.

Here’s how you can use configuration changes to adapt games across larger screen devices — starting with the screen.

### Screen and window management

On devices such as Chromebooks and Samsung DeX, games are launched in a windowed environment by default where they can be dynamically resized by the user. On devices such as the Samsung Galaxy Fold, the screen and aspect ratio will change when the user opens the device with the larger screen. Each of these cases will fire off `onConfigurationChanged` events.

Here’s how you can configure for changes in screen size and orientation in your manifest:

```xml
<activity android:name=".MyActivity"
  android:configChanges="screenSize|orientation"
  android:label="@string/app_name">
```

### Configuration changes

In your code, your activity will invoke `onConfigurationChanged` whenever your declared configuration change happens. Now, you can handle whatever the change is. For example, you could scale your OpenGL content to match the new resolution or aspect ratio to prevent inaccessible UI elements.

```java
public void onConfigurationChanged(Configuration newConfig) {
  //Get native surface size
  //NativeActivity.mLastContent[X/Y/Width/Height]()
  //findViewById(android.R.id.content).get[Width/Height]()
}
```

### Dynamic resizing

It’s also important to remember that every time the screen size changes, your input areas will change as well. If your game is always intended to run in full screen, or you need to quickly prevent configuration change problems while you iron out the bugs, you can simply set [`resizableActivity`](https://developer.android.com/guide/topics/manifest/activity-element#resizeableActivity) to false in your manifest. This will prevent dynamic resizing but it’ll also prevent split-screen views, so use it sparingly to avoid limiting the user experience.

```xml
<activity android:name=".MyActivity"
  android:resizeableActivity="false"
  android:label="@string/app_name">
```

### Device orientation

On mobile, the default screen orientation is portrait. On other devices, it could be landscape. In your manifest, specify the sensor orientations you support to have the system handle them and make sure your game doesn’t flip upside down unexpectedly.

```xml
<activity … android:screenOrientation=”...”>
```

Or, if you’re dynamically handling orientation in `onConfigurationChanged`, use `Display.getRotation()` to get the current screen orientation in code.

```java
Display.getRotation()
```

Keep in mind that the values you’re expecting might be swapped on different devices, depending on the default hardware orientation.

### Device resolution

You’ll also need to consider the resolution of the user’s device. Bigger screens call for higher resolution assets, so you can use app bundles to package your game’s code and assets for different device configurations. That way, Google Play will only deliver the correct assets for the particular device your game is downloaded on — for example, omitting ultra-high-resolution assets for smaller screened devices. This saves you valuable download space and the trouble of maintaining multiple APKs for different screen densities.

![Android App Bundle components](ix://posts/gdc-2019-recap/android-app-bundle.png)

Remember that with more pixels comes greater flexibility on UI and HUD design. When users are playing on a larger screen — and they’re likely to be sitting farther from the screen — consider the elements you can expand, add, or change to make sure everything on screen is readable and identifiable.

### Input

A growing number of mobile games are delivering experiences that feel more like playing on a desktop or a console. That’s why more Android devices are offering a variety of different inputs, including keyboard and controller extensions. Although Android has APIs for keyboards, mice, and controllers, game developers might not support those controls if they assume people are playing on a touch screen. But without support for additional inputs, gamers are going to be disappointed when they try to play with a keyboard on a Chromebook without a touch screen, or they attach a mouse to play their favorite first-person shooter game.

A lot of new devices are also convertibles that can switch configurations on the fly, like shifting from clamshell to tablet mode. The best way to support these control scheme changes is to detect the hardware available on the device that will give players the best experience.

To start, you might declare support for configuration events related to input devices, such as keyboards.

![Code snippet for declaring keyboard support for configuration changes. Image shows keyboard instructions displayed during gameplay.](ix://posts/gdc-2019-recap/config-keyboard-support.png)

Then, you can query `InputManager` at startup or during configuration changes and switch from a touch-based control scheme to a keyboard control scheme if there is no touch screen or a keyboard becomes available. In this case, you also want to make sure the keyboard is usable even though `InputManager` says there’s one available. After all, it could be a Chromebook in tablet mode.

![Code snippet for detecting keyboard and mouse presence. Image shows keyboard instructions displayed during gameplay.](ix://posts/gdc-2019-recap/detect-keyboard-and-mouse.png)

If keyboard support was an afterthought when designing your game, consider implementing some features like the ones below to drastically improve its accessibility:

- Skill keybindings
- WASD/Arrow key navigation
- Menu navigation
- Enter
- Tab
- Page up/down
- Back button
- Custom key mappings

Don’t forget about gamers who use mice — especially when it comes to first-person shooting games or third-person gaming in Android.

### Mouse capture

```java
public void onClick(View view) {
    view.requestPointerCapture();
}

public boolean onCapturedPointerEvent(MotionEvent motionEvent) {
  // Get the coordinates required by your app
  float verticalOffset = motionEvent.getY();
  float horizontalOffset = motionEvent.getX();
  return true;
}

...

  view.releasePointerCapture();
```

Finally, consider implementing controller support if you haven’t already because standard Android controller APIs work on devices such as Chromebooks and Samsung DeX.

## Build

Now, let’s move on to building and configuring your APK to make sure it supports various large-screen devices running Android.

The first step is **reviewing your permissions** to determine whether you really need the permissions your game is asking for. Some permissions aren’t supported on certain devices like Chrome OS, such as the following:

- `android.hardware.location.gps` — GPS
- `android.hardware.nfc` — Near-field Communication
- `android.hardware.camera`— Back facing camera

Also, think about the **hardware** profile your game is running on and consider adjusting the following:

- Automatic quality control: Adjust your automatic quality control logic or create a new quality configuration to best optimize for a particular device.
- x86 and ARM: Try to provide an x86 build for best performance on devices such as Chromebooks. ARM will still work, but you’ll incur overhead with instruction translation.
- Vulkan support: Most devices now support Vulkan, which provides a big boost in speed and graphics performance.

The final step is **testing** across all large-screen devices. Add test cases that cover additional flows for different devices, such as minimizing maximizing, switching between the small and large screens, input, and resizing. You can use tools such as the Android and Chrome OS emulator or Firebase Test Lab to help automate the testing process.

The emulator app, which can run on Android devices and Android Studio AVD, is provided to test for changing screen size and density.

```bash
$ adb install FoldableEmulator.apk
$ adb shell pm grant com.samsung.android.foldable.emulator android.permission.WRITE_SECURE_SETTINGS
$ adb shell pm grant com.samsung.android.foldable.emulator android.permission.SYSTEM_ALERT_WINDOW
```

Be sure to check out Samsung’s developer blog for [more information on testing for foldable devices](https://developer.samsung.com/galaxy-fold/testing-app-continuity.html).

## The future of foldables

Foldable smartphones are a new generation of devices that offer gamers the best of two worlds. By merging a smartphone and a tablet into one, foldables provide the benefit of multi-active windows and twice as much screen to play on. And because they share similar optimization principles, building for Chromebooks already sets the foundation for gameplay on foldable Android smartphones such as the Galaxy Fold. There are just four key things to consider:

### Maximum aspect ratio

Supporting full screen mode is critical to ensure that gamers get the best and most immersive experience. The cover display will have a long (21:9) aspect ratio, so take the following steps to ensure your game can handle a maximum aspect ratio to fill the entire screen:

- Declare the target SDK version: Games that target Android 8.0 (API level 26) or higher will fill the entire screen.
- Declare the `resizeableActivity` (only declare as “true” if your game supports multi-window): `android:resizeableActivity=[“true” | “false”]`
- Declare a max aspect ratio: The cover screen aspect ratio is 21:9, and that requires you to mention the max aspect ratio as 2.4. Here’s how to declare maximum aspect ratio in your manifest file (this metadata needs to be set under the Application tag):

```xml
<!-- Render on full screen up to aspect ratio of 2.4 -->
<!-- Use a letterbox on screens larger than 2.4 -->
<meta-data android:name="android.max_aspect" android:value="2.4" />
```

### Display cutout

The Galaxy Fold has a display cutout in the top-left corner when unfolded, so it’s important to ensure no necessary or helpful information is obstructed in the game’s display.

If you are rendering into the cutout area, you can use `WindowInsets.getDisplayCutout()` to retrieve a `DisplayCutout` object.

1.  `LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT`
2.  `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES`
3.  `LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER`

- **`MODE_DEFAULT`**: Content renders into the cutout area while in portrait mode but is letterboxed while in landscape mode.
- **`MODE_SHORT_EDGES`**: Content renders into the cutout area in both portrait and landscape modes.
- `MODE_NEVER`: Content never renders into the cutout area.

Below defines a style that you can use to apply the `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES` attribute to the activity.

```xml
<style name="ActivityTheme">
   <item name="android:windowLayoutInDisplayCutoutMode">
       shortEdges <!-- default, shortEdges, never -->
   </item>
</style>
```

[Click here](https://developer.android.com/guide/topics/display-cutout) to read more best practices when coding for display cutout.

### Game continuity

When users unfold their devices, you’ll want to ensure your game seamlessly transitions to full width. That means it can handle two physical screens, react to the physical device-folding mechanism and its states, and be resizable.

1.  Ensuring your game can handle two screen sizes is no different from other methods of supporting different screen sizes on Android. The only difference is that it’ll happen more often on a foldable smartphone. [Click here](https://developer.android.com/training/multiscreen/screensizes.html) for more details on support for different screen sizes.
2.  For folding and unfolding, developers don’t need to handle special events or APIs on the Galaxy Fold because it follows conventional Android platform behavior for screen size changing. The configuration will be changed to the following: `Screensize`, `smallestScreenSize`, `ScreenLayout`.
3.  Finally, consider making the game resizeable for a seamless experience between displays. Once a resizable game properly handles the changed configuration, the user will experience an intuitive and seamless transition between the cover and the main displays.

### Multi-resume

Multi-resume means resuming all top visible activities in multi-window. In Android P, if game and OEM opt in, all top visible activities are resumed. All Samsung devices above Android Pie — including Galaxy Fold — support multi-resume.

Applying multi-resume is simple. Just add meta-data into the manifest file of your application. Then, if your game is top visible with a multi-window situation, your activity will be resumed.

```xml
<application>
  <meta-data
    android:name="android.allow_multiple_resumed_activities"
    android:value=”true” />
  <activity ... />
</application>
```

## How Gameloft designed Asphalt 9 for large-screen experiences

Gameloft took advantage of the opportunity to optimize Asphalt 9’s gameplay for experiences on larger screens. The team built the game with various input methods and display sizes in mind, as well as ensured consistent, high-speed performance across devices.

See how they did it:

@[youtube](https://www.youtube.com/watch?v=ZfBeab5u534)

Google also worked with Gameloft to optimize Asphalt 9’s predecessor, Asphalt 8: Revolution, for Chrome OS and foldables. Read more [here](/{{locale.code}}/stories/asphalt-8).

## Build for the future of mobile gaming

Android gaming isn’t a mobile-exclusive experience anymore. Players today are experiencing games across a wide variety of devices and form factors. By following Android best practices and spending a little extra time thinking about your user experience on larger screens, you can take your game beyond mobile and provide the best possible gaming experience for every gamer.
