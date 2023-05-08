---
title: 'Google I/O: Level up! Build great games for large screens'
metadesc: 'Large screens, input handling, and distribution—start building games on ChromeOS.'
tags:
  - event
  - games
hero:
  youtube: I5ubmoSgaXE
  alt: 'Google I/O talk on building apps for large screens, covering large screens, input handling, and distribution.'
authors:
  - dlevy
  - scui
  - mmonasch
date: 2023-05-10
---

_Edited transcript of "Level up! Build great games for large screen" talk at Google I/O 2023 by Daniel Levy (Developer Relations Engineer on Android Large Screen Gaming), Shenshen Cui (Developer Relations Engineer on Google Play Games), and Matt Monasch (Developer Relations Engineer on ChromeOS)._

---

As a game developer, you know that new opportunities to distribute your game and reach a wider audience are crucial. Today we'll discuss the best practices for bringing your game to large screen opportunities like Android tablets, foldables, ChromeOS, and Google Play Games on PC.

## The case for large screens

In 2022, 52% of players said that they use large screen devices to play games. In addition, we expect revenue from mobile games to grow almost 30% by 2027.

Our research also shows that there is a strong crossover in gamers that play on both mobile phones and large screen devices like PCs. So, by optimizing for more platforms, like large screen devices, you can grow your audience.

Let's dive into the technical best practices for how to level up your game for large screen devices: input handling, windowing and resizing, and build submission and distribution.

## Part 1: Input handling

As we transition to these large screen surfaces, we're also transitioning to new modes of input. Adding mouse, keyboard, and gamepad support is often necessary for desktop and laptop form factors. It's also beneficial for foldables, tablets, and smartphones, too. Mobile players might use a desktop experience mode or enjoy playing docked at a desk. They'll appreciate the inclusion!

### Keyboards

While some games, like Match-3 or Merge games, can play just fine with just a mouse, there are many games where playing solely with a mouse is either difficult or impossible. Think about MOBAs or Action RPGs, where one hand could control movement and the other controls actions. It's in these situations that adding keyboard controls could better immerse your players, especially when touch isn't involved. It's important that all the core on screen actions have a keyboard counterpart—movement: jumping, abilities, dodging, pausing, opening menus, and so on.

Keyboards also present a unique problem around activity recreation. Changes in keyboard status, like a built-in keyboard being revealed or a keyboard being connected, trigger a configuration change. This in turn causes activity recreation which will destroy and then create your activity. Good news is, we can fix it! If we declare in the manifest that the game will handle these configuration changes itself, then no activity recreation will happen.

Here's a sample manifest with that `configChange` declaration written in.

```xml {title="XML" .code-figure}
<activity
   android:name=".MyActivity"
   android:configChanges="keyboard|keyboardHidden"
   android:label="@string/app_name">

override fun onConfigurationChanged(newConfig: Configuration) {
   super.onConfigurationChanged(newConfig)
}
```

The `configChange` parameters will make it so that keyboard changes don't reload your game. Instead, the `onConfigurationChanged` method will get invoked and you can handle the change however you wish. Beyond controls, it's important to handle input fields gracefully. There are two pitfalls we commonly see:

- First, make sure that the on-screen keyboard doesn't cover the input field. Typing when you can't see the text entered is not a good experience. This can happen on Chromebooks as well as tablets and foldables so there's broad impact for getting this right.
- Second, check for keyboard configuration changes and preserve input text. It's possible a player may decide to switch from the on-screen keyboard to a hardware one while an input field is focused. If that happens, the input field loses focus, erasing all the text. That loss of progress will be a frustrating memory for players.

In short, thoroughly test around the IME and switching from it for the best player experience.

### Mouse handling

While touch to mouse emulation exists for all our platforms, that won't cover all cases. For FPS or other 3D titles where the camera would be controlled through a virtual joystick, the matching paradigm on desktop would use a mouse to control the camera direction. Here, you'll want to enable mouse capture in order to receive mouse movement events without concern that the mouse will leave the window. There are three function calls to be aware of—capture, update, and release.

```java {title="Java" .code-figure}
override fun onClick(view: View) {
   view.requestPointerCapture()
}

override fun onCreate(savedInstanceState: Bundle) {
   …
   gameView.focusable = View.FOCUSABLE
   gameView.setOnCapturedPointerListener { _, motionEvent ->
      // Use the coordinates from motionEvent to update your view
      // return true if the event is successfully processed.
      true
   }
   …
}

fun onMenuOpen(view: View) {
    view.releasePointerCapture()
}
```

### Input emulation

The emulation on ChromeOS and Google Play Games on PC automatically converts events from a mouse or touchpad input into screen taps. This is great for getting games with simple interactions working quickly on the platform.

However, this also means that certain actions like right click won't function or that scrolling becomes a touch event instead of a scroll event. Toggling off **Input Emulation** is easy and only requires setting this uses feature to false.

When you turn off **Input Emulation**, your application will start receiving:

- Left and right mouse clicks (instead of just left)
- Scroll wheel and touchpad scroll events
- Updates to the position of the cursor (which allows you to implement mouse-over functionality, like highlighting on hover)

In Unity, there is an option in **Player Settings** called **ChromeOS Input Emulation** that you can toggle off which will make this manifest change for you.

```xml {title="XML" .code-figure}
<users-feature
   android:name="[android.hardware.type.pc](android.hardware.type.pc)"
   android:required="false" />
```

### Gamepads

The [Game Controller Library](https://developer.android.com/games/sdk/game-controller) is part of the [Android Game Development Kit](https://developer.android.com/games/agdk) and will help you implement robust support for game controllers. This C++ NDK library provides:

- Callbacks for detecting controller connections and disconnections
- Controller device information, including button style and layout
- Controller input data, standardized around modern dual-stick controller designs
- And, extended features on supported controllers, like vibration, lights, motion axis data, and battery life and charge status

Whether you're using this API, another, or rolling your own solution, test across multiple popular controllers to ensure broad compatibility.

Exclusively for Google Play Games on PC is the [`Input SDK`](https://developer.android.com/games/playgames/input-sdk) which is built to surface input mappings to players. By providing a mapping of all the controls that your game uses, the Input SDK can provide a unified interface from which players can discover the mouse and keyboard bindings for any game they wish to play on Google Play Games. At any point during gameplay, a player can summon the Input SDK overlay to view the controls or to remap them.

So, let's say you've implemented handling for these new modes of input. Your game can gracefully handle touch, keyboard and mouse, and gamepads. How do you switch between them?

We've found that the best method is to actively listen for all modes of input and adjust any tooltips to match the most recently used input. This allows your players to be flexible and switch between inputs at their leisure without any menu friction. So long as there's not a competitive or skill reason to lock a player into one specific mode of input, we recommend this flexible approach.

Read more about [Input support](/{{locale.code}}/games/optimizing-games-inputs) and [Handling input changes](/{{locale.code}}/games/handling-input-changes).

## Part 2: Windowing and resizing

Expanding your game beyond phones and onto all of our great multi-platform opportunities introduces some additional considerations regarding window management.

On ChromeOS and Google Play Games on PC, your game can run in a windowed mode over a main desktop interface. And on Android tablets and foldables, your game can be run side-by-side with other applications, resized, and even moved between inner and outer displays on foldable devices.

As a baseline, there are a few things you should check to ensure your game is playable across platforms.

For both ChromeOS and Google Play Games on PC, explicitly define the minimum and maximum aspect ratio your game supports. The aspect ratios you define will be respected and the window size locked to the optimal dimensions automatically.

At a minimum, for Google Play Games on PC, you need to at least support 16:9 aspect ratio if your game's primary orientation is landscape and 9:16 aspect ratio if your game is portrait mode. But, for the best experience, explicitly support 21:9, 16:10, and 3:2 aspect ratios.

On ChromeOS, to provide the best possible experience for players in full-screen, support full-screen immersive mode. This means hiding the system bars, which you can do by setting flags on `decorView`'s `systemUIVisibility` field or through the `WindowInsetsCompat API`, and maximizing the viewable area for your players.

You'll also want to gracefully handle rotation and resizing configuration events or prevent these from happening when running on ChromeOS devices.

On Android devices with larger screens, running your game in its primary orientation will work exactly the same as on a phone. On certain devices, however, your game can be run in configurations that you might not already handle.

Check the behavior of your game on first launch in different orientations, after rotation, multi-window resizing, and on fold or unfold on new tablets and foldable devices running Android 13. Out of the box, if your game doesn't support all configurations, we will help by letterboxing your game if necessary and by prompting the player before changing orientation.

To help motivate optimization, note that on some devices when a player moves to an unsupported configuration, they're given the option to reload the game to best fit the new screen layout.

But, there's better ways to provide a more seamless experience for your players. Let's overview how you can level up the large screen experience.

First, declare your main activity as `resizeableActivity`. This will get you out of compatibility mode. Note that an unset `resizeableActivity` will default to `true`.

```xml {title="XML" .code-figure}
<application
   android:name="MyGame"
   android:resizableActivity="true" />
```

Next, declare explicit support for `orientation`, `screenSize`, `smallestScreenSize`, and `screenLayout` to receive all Large Screen configuration events and avoid Activity recreation.

Now that windowing is in your control, you'll need to explicitly handle these screen layout configuration events. In your `OnConfigurationChanged` event handler, you'll receive a Configuration object containing useful metadata like the current orientation, width, and height. You can also query the `WindowManager` to check the current screen rotation.

Using this metadata, there are a few different approaches you can take. Ideally, check the new screen dimensions and render to the full window size. This might not work in all cases due to aspect ratio differences. So, alternatively, you could anchor your game UI to the new window size and letterbox your core gameplay content. If there are technical or design limitations that prevent this approach, you could instead do your own in-engine letterboxing to preserve aspect ratio and scale to the best possible dimensions.

```java {title="Java" .code-figure}
override fun onConfigurationChanged(newConfig: Configuration) {
   super.onConfigurationChanged(newConfig)
   val density: Float = resources.displayMetrics.density
   val newScreenWidthPixels =
      (newConfig.screenWidthDp * density).toInt()
   val newScreenHeightPixels =
      (newConfig.screenHeightDp * density).toInt()

   // Configuration.ORIENTATION_PORTRAIT or ORIENTATION_LANDSCAPE
   val newScreenOrientation: Int = newConfig.orientation

   // ROTATION_0, ROTATION_90, ROTATION_180, or ROTATION_279
   val newScreenRotation: Int = windowManager.defaultDisplay.rotation
}
```

Regardless of the approach you take, test your game in various configurations and ensure there are no cut-off or overlapping in-game UI elements, issues with touch target accessibility, or aspect ratio issues that might cause game content to become stretched, squashed, or otherwise distorted. Also keep in mind that larger screens usually means bigger pixels, because you have the same number of pixels for a much larger area. This can cause pixelation for downsized render buffers or lower resolution assets.

If possible, consider using your highest quality assets on Large Screen devices. If you have a level of quality system implemented, ensure that it accounts for these new devices. If you're going above and beyond to support full resizability, definitely performance profile your game now that you're pushing more pixels than you might on phones. Going above and beyond on Large Screen devices is a great way to keep players engaged with your game.

Games like Diablo Immortal and Minecraft implemented great support for game controllers to better immerse their players and support for resizability, allowing their players the ability to resize windows, play in multi-window mode and stream video or communicate with friends without losing their in-game session.

- Diablo Immortal implemented great support for game controllers to better immerse their players and support for resizability, allowing their players the ability to resize windows, play in multi-window mode and stream video or communicate with friends without losing their in-game session.
- Minecraft implemented great support for game controllers to better immerse their players and support for resizability, allowing their players the ability to resize windows, play in multi-window mode and stream video or communicate with friends without losing their in-game session.

When you implement great support for game controllers you can better immerse your players in-game and with support for resizability, you allow your players the ability to resize windows, play games in multi-window mode, and stream video or communicate with friends without losing their in-game session.

There are even more ways to provide great experiences for players on new Large Screen devices.

For example, consider using the [Jetpack WindowManager Library](https://developer.android.com/jetpack/androidx/releases/window) to support new device form factors like foldables. You can query the `DeviceState` and implement posture handling. One example, would be triggering a virtual control pad on the bottom of a foldable when in the HALF-OPENED state.

```java {title="Java" .code-figure}
fun isTableTopPosture(foldFeature: FoldingFeature?) : Boolean {
   contract { returns(true) implies (foldFeature != null) }
   return foldFeature?.state == FoldingFeature.State.HALF_OPENED &&
   foldFeature.orientation == FoldingFeature.Orientation.HORIZONTAL
}
```

Read more about [Large screens and external displays](/{{locale.code}}/games/optimizing-games-windowing) and [Optimizing display size](/{{locale.code}}/games/optimizing-games-display).

## Part 3: Build submission and distribution

To gain the best performance for your games on more large screen devices, we highly recommend you to include x86_64 ABI architecture in your game. X86_64 can bring the best performance on ChromeOS & Google Play Games on PC for your game. Google worked with the game engines and third-party library providers to ensure the support is in place. You should be able to get your x86_64 version of the game with very minimal work. Our collaboration with engines like Unity and Cocos goes beyond just architecture, with improvements in areas like input and windowing support.

### File sizes

Don't worry about the size of the extra .so files. With Android AppBundle, the increase is only affecting a bit of the upload size to the Play console. Appbundle will deliver only the necessary ABI to each device, that says the download size won't be affected. You could find out more of your device reach and download size through the App bundle explorer inside your Play console. You could also look into the Device catalog in the Play console to find out how many devices your game supported.

### Permissions

Exclude those permissions you don't need in the Android manifest. It is better to check if the feature is supported at runtime to determine whether to enable it or not. Check out the [Android Developer Documents](https://developer.android.com/docs) to see which Android features and permissions are not supported on ChromeOS and Google Play Games on PC.

While you optimize these for large screen devices, you could also examine your game to see if it is asking for unnecessary permissions on mobile. For example, many games request network related permissions just to check if a player is on a metered network but could instead use the `ConnectivityManager` API without requesting any extra permissions.

### Form factors

Play Console provides the form factor support on the release tracks. Mobile, tablets and ChromeOS share the same release form factor. And you can add Google Play Game on PC form factor to your Play Console if you want to separate it with different builds.

It is important to polish the store listing for different form factors to attract more players. We recommend you also upload specific screenshots for ChromeOS and Google Play Games on PC.

Our best practice is to use the single release artifact for all the form factors. This is the most efficient way to manage the game update and QA testing. We just released Google Play Games on PC Emulator that can help developers to develop games for large screen devices.

### App bundling and delivery

You could leverage [Android AppBundle](https://developer.android.com/guide/app-bundle), [Play Asset Delivery](https://developer.android.com/guide/playcore/asset-delivery), and [Play Feature Delivery](https://developer.android.com/guide/playcore/feature-delivery) to distribute your assets and libraries in a smart way. For example: use Device Tier Targeting to only distribute high resolution assets to large screen devices.

Read more about [Publishing considerations](/{{locale.code}}/games/optimizing-games-publishing).

## Conclusion

Much of the work we discussed today provides value across large screen opportunities. The improvements you make to optimize for Android tablets and foldables, for example, can also help for ChromeOS and Google Play Games on PC.

To recap, we learned how you can meet the aspect ratio requirements for ChromeOS and Google Play Games on PC and how to provide a great experience on Android tablets and foldables by going above and beyond by supporting full resizability. We also saw how important thoughtful input support for keyboards, mice, and game controllers provides value across large screen devices and can help better immerse your players.

Finally, once you've updated your game to support all of these great large screen opportunities, ensure you follow the best practices to build, release, and distribute your game. Support additional ABIs, audit for unnecessary feature declarations in your manifest, and streamline your application delivery with App Bundles and Play Asset Delivery.

We look forward to seeing how you level up your game! Get more information about development on ChromeOS by signing up for the [ChromeOS Developer Newsletter](/{{locale.code}}/subscribe).
