---
title: Pixonic grew engagement by 25% on Chrome OS by optimizing for large screens
metadesc: More than 100,000 players have already played War Robots, averaging longer sessions on Chromebooks compared other Android devices, thanks to just two weeks time of a five member team.
date: 2019-11-01
app:
  name: War Robots
  logo: gs://stories/war-robots/war-robots-icon
  company: Pixonic
hero:
  image: gs://stories/war-robots/hero
  alt: War robots gameplay.
  position: center
tags:
  - gaming
  - keyboard support
  - mouse support
  - touchscreen support
  - device configuration
---

[Pixonic](https://play.google.com/store/apps/details?id=com.pixonic.wwr), a team of video game developers headquartered in Moscow, prides itself on pursuing every opportunity to upgrade its mobile apps and reach an even wider audience of gamers. One of the company's best-known titles is [War Robots](https://play.google.com/store/apps/details?id=com.pixonic.wwr&hl=en_US), a 12-person Player-vs-Player (PvP) experience where players operate and duel customized robots on a live battlefield.

Released in 2014, War Robots was originally designed for Android's early-generation devices with touchpad-based movement and no mouse input. The Pixonic team, being avid gamers themselves, recognized the app needed a few modifications to deliver a great user experience on a wider range of devices, like laptops and tablets. War Robots was already playable on any Android device since [Chromebooks run a full version of the Android framework](/{{locale.code}}/posts/expand-your-app-beyond-mobile-to-reach-android-users-at-large) inside a container. By making a few more coding tweaks, Pixonic was able to take advantage of Chrome OS' full capabilities.

Here's how the Pixonic team optimized War Robots for an optimal experiences on larger screens.

## What they did

To kick off the optimizations, Pixonic added a metadata tag in AndroidManifest.xml that tells the system it's ready for full Chrome OS support and needs to disable touch emulation:

```markup
<uses-feature android:name="android.hardware.type.pc" android:required="false" />
```

Pixonic also set the app's minSdk to 24 so that the Unity gaming engine can directly receive mouse clicks and all movement-related API events (not just touchpad events).

### ![](/images/icons/keyboard.png){.icon--rounded} Keyboard and mouse support

In third-person PvP games like War Robots, moving and aiming is a lot easier using a keyboard and mouse, especially on larger-screen devices. So, the next step was to rewrite the code for keyboard and mouse support for the game's battle mode while retaining touchscreen controls.

To provide the right controls at the right time, Pixonic's team wrote new code to check the user's current gameplay mode:

```java
@Override
public void onConfigurationChanged(Configuration newConfig) {
    boolean hasQwertyKeyboard = newConfig.keyboard == Configuration.KEYBOARD_QWERTY && newConfig.hardKeyboardHidden == Configuration.HARDKEYBOARDHIDDEN_NO;
    try {
        UnityPlayer.UnitySendMessage("Receiver", "ConfigChange", new JSONObject().put("keyboard", hasQwertyKeyboard).toString());
    } catch (JSONException e) {
        e.printStackTrace();
    }
}
```

If a QWERTY keyboard is detected, the game adapts to desktop mode. The movement joystick in the bottom-left corner disappears, and all available actions (such as sorting through weapons, abilities, and menus) are labeled with keyboard shortcuts.

#[War Robots in laptop mode.](gs://stories/war-robots/war-robots-1 [A laptop computer showing War Robots gameplay.])

If a keyboard isn't detected, the movement joystick appears in the bottom-left corner, and the keyboard shortcuts are hidden on the bottom-right menu buttons.

#[War Robots in tablet/mobile gameplay mode.](gs://stories/war-robots/war-robots-2 [A tablet device showing war robots gameplay.])

Next, Pixonic wanted to make sure the cursor stays hidden when a player uses their mouse to rotate the camera. By targeting Android 7.0 (API level 24) or higher, the team could set any pointer icon. In this case, the team used a transparent bitmap to make the cursor invisible during gameplay:

```java
public boolean setPointerVisibility(boolean visible) {
    View = activity.findViewById(android.R.id.content);
    view.setPointerIcon(PointerIcon.getSystemIcon(activity, visible ? PointerIcon.TYPE_DEFAULT : PointerIcon.TYPE_NULL));
}
```

This ensured the cursor would be disabled and invisible when all other windows are closed and a battle is in progress. If any pop-up windows appear, such as the pause menu, Pixonic made the cursor visible, displaying its default icon.

### ![](/images/icons/videogame.png){.icon--rounded} Adapting gameplay tutorials and mechanics

For a better user experience, Pixonic also wrote new code to display different gameplay tutorials based on a user's current device mode. If a player switches between tablet and laptop gameplay during battle and they haven't yet seen a tutorial for the different mode, the tutorial is shown before gameplay resumes.

#[Gameplay tutorials in laptop mode with keyboard and mouse input.](gs://stories/war-robots/war-robots-3 [Two laptop computers showing War Robots gameplay with keyboard and mouse input.])

#[Gameplay tutorial in tablet mode with touchscreen controls.](gs://stories/war-robots/war-robots-4 [A tablet device with touchscreen showing war robots gameplay.])

When players are in laptop mode, Pixonic also disables touchscreen camera control (since players will control the camera with a mouse) while all the gameplay buttons work as usual. To differentiate touches from mouse movements, the team uses the `Input.touchCount` property (in Unity scripts):

```java
if (Input.touchCount > 0) {
  // this is screen touch event
} else {
  // this is mouse (touchpad) event
}
```

### ![](/images/icons/dynamic_feed.png){.icon--rounded} Multi-window support

For the final step, Pixonic wanted to make sure the game didn't lock itself in fullscreen mode when launched. Enabling windowed gameplay in Chrome OS allows users to simultaneously watch their favorite streamers while playing, upgrade their robots while reading about new abilities on the [game's website](https://warrobots.com/), or spectate a battle in passive mode while watching a separate video.

To do this, Pixonic marked `UnityPlayerActivity` as resizable:

```markup
<activity android:name="com.unity3d.player.UnityPlayerActivity" ....
android:resizeableActivity="true">
```

Keeping in mind that the game interface only looks playable in a certain dimension range, the team set minimum supported window sizes:

```markup
<activity … >
    <layout android:gravity="center" android:minHeight="800dp" android:minWidth="1200dp" />
</activity>
```

For the most immersive gameplay, Pixonic used meta tags to set fullscreen mode as default and landscape orientation as desirable.

```markup
<application>
    <meta-data android:name="WindowManagerPreference:FreeformWindowSize" android:value="maximize" />
    <meta-data android:name="WindowManagerPreference:FreeformWindowOrientation" android:value="landscape" />
    ….
</application>
```

#[War Robots launched in windowed mode.](gs://stories/war-robots/war-robots-5 [An open laptop computer showing War Robots dashboard.])

These optimizations also ensured that the game didn't pause and that the battle HUD scales accordingly as players expand and shrink their gameplay windows.

## Results

Thanks to an extensive library of [online resources](/{{locale.code}}/android/), the entire process took Pixonic's five-member development team just two weeks.

More than 100,000 players have already played War Robots on Chrome OS since Pixonic rolled out the latest optimizations. Because the gameplay can now take advantage of the added space on larger screens, War Robots battles are even more immersive and engaging than before. In fact, user sessions are 25% longer on Chromebooks compared with other Android devices. Early feedback has been incredibly positive, and some players have even noted that the Chromebook-optimized game runs smoother than BlueStacks' emulator.

Based on their success, Pixonic's developers plan to update War Robots' graphics on all Android devices to make the gameplay even closer to a PC-quality experience.

Check out some best practices to [optimize your apps for Chrome OS](/{{locale.code}}/android/optimizing).
