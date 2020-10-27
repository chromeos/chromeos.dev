---
title: Large screens and external displays
metadesc: Window management for games on Chrome OS.
date: 2020-06-16
weight: -7
---

One of the most obvious advantages of Chrome OS devices is their big beautiful screens and the ease with which you can use external monitors. So much screen real-estate offers a lot of potential for games, but using it well can require some extra thought and design work.

## Orientation and configuration changes

Some mobile apps are specifically designed for small phones and have the orientation locked to portrait. This offers some seemingly quick wins by reducing the number of configuration changes the game is likely to receive and by reducing the number of different layouts needed. However, there can be some hidden surprises with this choice - by choosing not to handle orientation changes, many apps will be unprepared for other configuration changes such as window resizing, keyboard attachment, external displays, etc. These can cause unexpected crashes and restarts, see [runtime changes](https://developer.android.com/guide/topics/resources/runtime-changes) for more information. While these changes also happen on phone devices, they happen frequently on foldables and Chrome OS devices and should be handled well.

In addition, on large screen devices with landscape screens or foldables with squarer aspect ratios, games with a fixed portrait orientations will appear with large black bars on the side.

Some other phone-first games may choose to lock their apps in landscape mode. Tablet or convertible users will be forced to hold the device in the landscape orientation which may feel more aggressive than on a phone and degrade the experience of your game. For large-screen tablets and convertibles, it is possible the game has enough real-estate in portrait mode. For certain people, it may be more comfortable to hold the device in that orientation - allowing them to interact with your game for longer periods of time.

Depending on the scope and maturity of your games, there are different ways to address this. Ideally, your game could dynamically adjust to different screen sizes, offering an enhanced, immersive experience for users with larger screens. Another approach is to find creative ways to fill the empty black space with useful information like stats, maps, or chat windows or else to include game-relevant images as a background in place of black that provide a nicer framing for the principal game play.

When possible, allow your users to use your app in both orientations, where screen-size permits.

### Example 1

![(Left) An example puzzle game with black bars on a landscape screen. (Right) The same puzzle game now with an image background to replace the black bars.](/images/games/optimizing-games-windowing/puzzle-example.jpg)

A puzzle game is a mature Android game that was designed for portrait phones. On large, landscape screens, it runs with black bars on the side. Because the game had a large, active user base and the developer is focusing on their next title, they chose to add a soft-focus image to the background for each level and menu in order to frame the game, without requiring a UI rewrite. Because they are in active development for the next game, the developer is including landscape support in the new title.

### Example 2

![Racing example](/images/games/optimizing-games-windowing/racing-example.jpg)

A car racing game designed for mobile is locked to landscape mode, to optimize screen real-estate for phones. Lately, tablet and Chrome OS users have been complaining that it is hard to play and asking for portrait support. The developer includes a screen-size check in their code, and if the screen is large enough, portrait mode is permitted. To still allow for the wide-angle view required for the game, the content is placed in the middle of the screen while an additional car-stereo UI bar appears along the bottom of the screen allowing users to easily change the radio station, and map and race statistics are moved up to the top of the screen, freeing the windshield view and improving game play.

See also [Android large screen guidelines](/{{locale.code}}/android/design) and [Android screensize documentation](https://developer.android.com/training/multiscreen/screensizes).

## Multi-window capability

Games often provide users with an immersive, full-screen experience. Some users on desktops or foldables, however, like to have chat, music, or video streaming services open and visible at the same time in a separate window. If they are recording or sharing their own screen, it can also be useful to have extra windows open and visible.

Multi-window capability is the default behaviour for Android apps and games, which applies to Chrome OS desktops, as well as phones and tablets in split-screen mode. If you wish to prevent your game from being resized, declare that it is non-resizable in `AndroidManifest.xml`.

```xml {title=AndroidManifest.xml}
android:resizeableActivity="false"
```

There are some important considerations if your game is resizeable:

- When the window is resized, by default Android will “destroy” and re-”create” your game (see [Android lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle)). Your game should either gracefully keep track of state during these re-creations (see [Jetpack ViewModel documentation](https://developer.android.com/topic/libraries/architecture/viewmodel)), or else [manually handle these configuration changes](https://developer.android.com/guide/topics/resources/runtime-changes) and prevent re-creation, having your game engine handle the new screen size. For more information, see this video from the [Game Developer Conference 2019](https://www.youtube.com/watch?time_continue=2515&v=AbZ40kPqht4).
- Handling `onPause` correctly in case your app is visible and [`STARTED`](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.State), but not [`RESUMED`](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.State). See [Multi-window lifecycle](https://developer.android.com/guide/topics/ui/multi-window#lifecycle).
- Consider different aspect ratios for resized windows (cropping versus scaling of assets)

Read more about [window management](/{{locale.code}}/android/window-management).

## Full-screen mode

When your game is running in a full-screen window, you may wish to put it into immersive mode to remove window borders and other distracting screen elements. See the Android [full-screen documentation](https://developer.android.com/training/system-ui/immersive) for more information.

```kotlin
private fun hideSystemUI() {
    // Enables regular immersive mode.
    window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_FULLSCREEN)
}
```
