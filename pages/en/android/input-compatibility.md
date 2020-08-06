---
title: Input compatibility
metadesc: How to support all of the different input types that are available to chromebooks.
date: 2020-05-01
weight: -5
tags:
  - input devices
  - keyboard support
  - stylus support
  - trackpad support
---

On Chrome OS devices, many users interact with apps using a keyboard, mouse, trackpad, stylus, or gamepad. While these input devices are also used on Android phones, they are not as common and so often overlooked by developers.

Developers wishing their app to work well with input on Chrome OS, and other large screen Android capable devices, should follow the following steps:

1.  Add and test **basic keyboard** support: keyboard navigation via [[←]][[↑]][[→]][[↓]] and [[Tab]] keys, [[Enter]] key for confirming text entry, [[Space]] for play/pause in media apps, etc.
2.  Add expected [[Ctrl]]/[[Shift]]/[[Alt]] based **shortcuts** depending on the app's functionality: [[Ctrl]]+[[Z]] for undo, [[Ctrl]]+[[S]] for save, etc.
3.  Test **basic mouse** interactions: right-click for context menu, icon changes on hover, mouse wheel/trackpad scroll events on custom views, etc.
4.  Test **app-specific** input devices: stylus for drawing apps, gamepads for games, MIDI controllers for music apps, etc.
5.  Consider **advanced input** support that could make the app stand-out in desktop environments: touchpad as a cross-fader for DJ apps, mouse capture for games, extensive keyboard shortcuts for power users, etc.

## Keyboard

Handling keyboard input correctly is essential to providing a good desktop experience. This can be broken into three categories: [Navigation](#navigation), [Keystrokes](#keystrokes), and [Shortcuts](#shortcuts).

### Navigation

Keyboard navigation, while not always evident for touch-centric apps, is expected by users who have their hands on a keyboard while interacting with an app. It can also be essential for users with accessibility needs on both phones and desktop devices.

For many apps, simple [[←]][[↑]][[→]][[↓]] key and [[Tab]] navigation is all that is needed and is mostly handled automatically by the Android framework. For example, views such as [[Buttons]] are `focusable` by default, and keyboard navigation should generally work without any additional code. In order to enable keyboard navigation for views that are not focusable by default, developers should mark them as `focusable`. This can be done programatically or in XML. See the [Focus Handling](https://developer.android.com/reference/android/view/View.html#FocusHandling) documentation for more information.

A good practice is: before each release, try to access every piece of functionality in the app only using the keyboard (no mouse or touch input allowed). The most common actions should be the easiest to access.

!!! aside.message--note
**Remember:** for users with different accessibility needs, keyboard support may be essential to being able to use the app in an effective way.
!!!

```kotlin
yourView.isFocusable = true
```

```xml
android:focusable="true"
```

Once enabled, the Android framework will create a navigational mapping for all focusable views based on their position. This usually works as expected and no further work is needed. In case that the default mapping is not correct for an app's needs, it can be overridden manually as follows:

```kotlin
// Arrow keys
yourView.nextFocusLeftId = R.id.view_to_left
yourView.nextFocusRightId = R.id.view_to_right
yourView.nextFocusTopId = R.id.view_above
yourView.nextFocusBottomId = R.id.view_below

// Tab key
yourView.nextFocusForwardId = R.id.next_view
```

### Keystrokes

For text input that would be handled by an on-screen virtual keyboard ([IME](https://developer.android.com/guide/topics/text/creating-input-method)) like with an `EditText`, apps should behave as expected on Chrome OS with no additional work from the developer. For keystrokes that cannot be anticipated by the framework, apps will need to handle the behaviour themselves. This is especially true for apps with custom views.

Some common examples of this are handling the [[Enter]] key for apps with text input or chat functionality, the [[Space]] key for media apps, and the [[W]][[A]][[S]][[D]] keys for movement in games.

The Android [Keyboard handling documentation](https://developer.android.com/training/keyboard-input/commands.html) should be followed to implement this. Specifically, most apps will wish to override the [onKeyUp](<https://developer.android.com/reference/android/view/KeyEvent.Callback#onKeyUp(int,%20android.view.KeyEvent)>) event and add the expected behaviour for each received keycode.

```kotlin
override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
    return when (keyCode) {
        KeyEvent.KEYCODE_ENTER -> {
            sendChatMessage()
            true
        }
        KeyEvent.KEYCODE_SPACE -> {
            playOrPauseMedia()
            true
        }
        else -> super.onKeyUp(keyCode, event)
    }
}
```

Using `onKeyUp` prevents apps receiving multiple events if a key held down or released slowly. Games and apps that expect users to hold down keyboard keys and need to react accordingly can look for the [onKeyDown](<https://developer.android.com/reference/android/view/KeyEvent.Callback#onKeyDown(int,%20android.view.KeyEvent)>) event.

!!! aside.message--note
**Note:** depending on an app's needs, overriding `onKeyUp` for the entire Activity usually provides the needed behaviour. If desired, a [onKeyListener](https://developer.android.com/reference/android/view/View.OnKeyListener) can be added to a specific view instead. For examplem an app may only wish to listen for the [[Enter]] key in specific EditText, and not the Activity, in order to implement send functionality only when the user is typing in a chat box.
!!!

### Shortcuts

Common [[Ctrl]]/[[Alt]]/[[Shift]]-based shortcuts are expected in desktop environments. If an app does not implement them, the experience can feel frustrating and broken to users. In addition to common shortcuts, more advanced users will appreciate shortcuts for frequently used app-specific tasks, making the app easier to use and differentiating it from others without convenient shortcuts.

Some common shortcuts include [[Ctrl]]+[[S]](save), [[Ctrl]]+[[Z]](undo), and [[Ctrl]]+[[Shift]]+[[Z]](redo). For an example of some more advanced shortcuts, see this list of [VLC Media Player shortcut keys](https://www.vlchelp.com/vlc-media-player-shortcuts/).

Shortcuts can be implemented using [dispatchKeyShortcutEvent](<https://developer.android.com/reference/android/view/Window.Callback.html#dispatchKeyShortcutEvent(android.view.KeyEvent)>). This will intercept all meta-key combinations for a given keycode ([[Alt]]/[[Ctrl]]/[[Shift]]). To check for a specific meta-key, use [KeyEvent.isCtrlPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isCtrlPressed()>), [KeyEvent.isShiftPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isShiftPressed()>), [KeyEvent.isAltPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isAltPressed()>), or [KeyEvent.hasModifiers()](<https://developer.android.com/reference/android/view/KeyEvent.html#hasModifiers(int)>).

Separating shortcut code from other keystroke handling (`onKeyUp` or `onKeyDown`) can make code maintenance easier while also defaulting to accepting all meta-keys without manually implementing repetitive meta-key state checking. Allowing all meta-key combinations can be more convenient for some users who may be accustomed to different keyboard layouts/operating systems.

```kotlin
override fun dispatchKeyShortcutEvent(event: KeyEvent): Boolean {
  return when (event.keyCode) {
    KeyEvent.KEYCODE_O -> {
      openFile() // Ctrl+O, Shift+O, Alt+O
      true
    }
    KeyEvent.KEYCODE_Z-> {
      if (event.isCtrlPressed) {
        if (event.isShiftPressed) {
          redoLastAction() // Ctrl+Shift+Z pressed
          true
        } else {
          undoLastAction() // Ctrl+Z pressed
          true
        }
      }
    }
    else -> {
      return super.dispatchKeyShortcutEvent(event)
    }
  }
}
```

If desired, shortcuts can also be implemented in `onKeyUp` by checking for [KeyEvent.isCtrlPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isCtrlPressed()>), [KeyEvent.isShiftPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isShiftPressed()>), or [KeyEvent.isAltPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isAltPressed()>) in the same manner as above. This can be easier to maintain if the meta-behaviour is more of a modification to an app behaviour than a shortcut. For example: if [[W]] means "walk forward" and [[Shift]]+[[W]] means "run forward".

```kotlin
override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
  return when(keyCode) {
    KeyEvent.KEYCODE_W-> {
      if (event.isShiftPressed) {
        if (event.isCtrlPressed) {
          flyForward() // Ctrl+Shift+W pressed
          true
        } else {
          runForward() // Shift+W pressed
          true
        }
      } else {
        walkForward() // W pressed
      }
    }
    else -> super.onKeyUp(keyCode, event)
  }
}
```

## Mouse and touchpad support

Chrome OS automatically handles most mouse and trackpad events so that they act like touch events on and Android phone. This includes two-finger touchpad/mouse wheel scrolling. Most apps generally only need to think about 3 desktop-centric events: [Right-click](#right-click), [Hover](#hover), and [Drag-and-Drop](#drag-and-drop).

### Right-click

Any actions that cause an app to show a context menu, like a long-press on a list item, should also react to right-click events. To handle right-click events, apps should register a [`View.OnContextClickListener`](https://developer.android.com/reference/android/view/View.OnContextClickListener). For details on constructing a context menu, see the Android [context menu documentation](https://developer.android.com/guide/topics/ui/menus#context-menu)

Kotlin:

```kotlin
yourView.setOnContextClickListener {
  showContextMenu()
  true
}
```

**Note**: any views that have been registered for a context menu using [Activity.registerForContextMenu()](<https://developer.android.com/reference/android/app/Activity#registerForContextMenu(android.view.View)>) should automatically work with both long-press and right-click without the need to register a context click listener.

### Hover

Developers can make their app layouts feel polished and easier to use by handling hover events. This is especially true for custom views. The two most common examples of this are:

- Indicating to users if an element is clickable, editable, etc. by changing the mouse pointer icon
- Adding visual feedback to items in a large list or grid when the pointer is hovering over them

```kotlin
// Change the icon to a "hand" pointer on hover,
// Highlight the view by changing the background.
yourView.setOnHoverListener { view, _ ->
  addVisualHighlighting(true)
  view.pointerIcon =
    PointerIcon.getSystemIcon(applicationContext,
    PointerIcon.TYPE_HAND)
  false // listener did not consume the event.
}
```

### Drag-and-Drop

In a multi-window environment, users expect to be able to drag-and-drop items between apps. This is true for Chrome OS devices as well as tablets/phones/foldables in a split-screen mode.

Developers should consider whether users are likely to drag items into their app. Some common examples include: photo editors should expect to receive photos, audio players should expect to receive audio files, and drawing programs should expect to receive photos.

To add drag-and-drop support, follow the Android [Drag-and-Drop documentation](https://developer.android.com/guide/topics/ui/drag-drop.html) and take a look at this [Chrome OS specific blog post](https://medium.com/androiddevelopers/android-on-chrome-os-implementing-drag-drop-2cc2bdcdc621).

**Special considerations for Chrome OS**

- To handle files from the Chrome OS Files app, look for the MIME type: application/x-arc-uri-list
- Remember to request permission via requestDragAndDropPermissions to access items dragged in from outside the app
- An item must have the flag View.DRAG_FLAG_GLOBAL in order to be dragged out to other applications

### Advanced pointer support

Apps wishing to do advanced handling of mouse and touchpad input support should follow the Android documentation for [View.onGenericMotionEvent()](<https://developer.android.com/reference/android/view/View#onGenericMotionEvent(android.view.MotionEvent)>) and use [`MotionEvent.getSource()`](<https://developer.android.com/reference/android/view/MotionEvent#getSource()>) to distinguish between [SOURCE_MOUSE](https://developer.android.com/reference/android/view/InputDevice#SOURCE_MOUSE) and [SOURCE_TOUCHSCREEN](https://developer.android.com/reference/android/view/InputDevice#SOURCE_TOUCHSCREEN).

Examine the `MotionEvent` to implement the required behaviour.

- Movement generates `ACTION_HOVER_MOVE` events
- Buttons generate `ACTION_BUTTON_PRESS` and `ACTION_BUTTON_RELEASE` events. You can also check the current state of all mouse/trackpad buttons using `getButtonState()`.
- Mouse wheel scrolling generates `ACTION_SCROLL` events

## Stylus

Many Chromebooks come with a stylus or can operate with an external bluetooth drawing tablet like the [Wacom Intuos](https://www.wacom.com/en-us/products/pen-tablets/wacom-intuos). (Note: currently, USB only devices are not supported)

A stylus event will be reported similar to a touchscreen event via [View.onTouchEvent()](<https://developer.android.com/reference/android/view/View#onTouchEvent(android.view.MotionEvent)>) or [View.onGenericMotionEvent()](<https://developer.android.com/reference/android/view/View#onGenericMotionEvent(android.view.MotionEvent)>), and contain a [`MotionEvent.getSource()`](<https://developer.android.com/reference/android/view/MotionEvent#getSource()>) type of [SOURCE_STYLUS](https://developer.android.com/reference/android/view/InputDevice#SOURCE_STYLUS). The `MotionEvent` will also contain additional data:

- [MotionEvent.getToolType()](<https://developer.android.com/reference/android/view/MotionEvent#getToolType(int)>) will return [TOOL_TYPE_FINGER](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_FINGER), [TOOL_TYPE_STYLUS](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_STYLUS), or [TOOL_TYPE_ERASER](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_ERASER) depending on the tool that made contact with the surface
- [MotionEvent.getPressure()](<https://developer.android.com/reference/android/view/MotionEvent#getPressure(int)>) will report the physical pressure applied to the stylus pen, if supported
- [MotionEvent.getAxisValue()](<https://developer.android.com/reference/android/view/MotionEvent#getAxisValue(int,%20int)>) with [MotionEvent.AXIS_TILT](https://developer.android.com/reference/android/view/MotionEvent#AXIS_TILT) and [MotionEvent.AXIS_ORIENTATION](https://developer.android.com/reference/android/view/MotionEvent#AXIS_ORIENTATION) which can be used to read the physical tilt and orientation of the stylus, if supported

### Historical points

Android batches input events to be delivered once per frame. A stylus pen can report events at much higher frequencies than the display. When creating drawing apps, it is important to check for events that may be in the recent past by using the `getHistorical` APIs:

- `MotionEvent.getHistoricalX()`
- `MotionEvent.getHistoricalY()`
- `MotionEvent.getHistoricalPressure()`
- `MotionEvent.getHistoricalAxisValue()`

### Palm rejection

Chrome OS attempts to recognize when a user's palm is resting on a touchscreen. However, this is not always possible. Sometimes a touch event may be reported to the app before the OS recognizes it as a palm. In that case, touches will be cancelled by reporting an `ACTION_CANCEL` event.

This event tells the app that certain touches are invalid and it should undo all interactions caused by those touches. For example, a drawing app might temporarily draw new lines as soon as they are received to provide the lowest latency, but only commit them permanently to the canvas once the touch series is finished cleanly. If touch events are cancelled in the meantime, the temporary lines can be easily erased.

!!! aside.message--note
**Note:** One way to reduce extraneous palm/finger events in drawing/writing apps is to provide an easy UI setting to
disable drawing via touch, and only use stylus events for drawing when in this mode.
!!!

### Note-taking apps

Chrome OS has a special intent that surfaces registered note-taking apps to users. To register an app as a note-taking app, add the following to the Android manifest:

```xml
  <intent-filter>
    <action android:name="org.chromium.arc.intent.action.CREATE_NOTE" />
    <category android:name="android.intent.category.DEFAULT" />
  </intent-filter>
```

Once registered, users can select that app to be the default note-taking app. When a new note is requested, the app should create an empty note ready for stylus input. When the user wishes to annotate an image (e.g. a screenshot or downloaded image), the app will be launched with `ClipData` containing one or more items with content:// URIs. The app should create a note that uses the first attached image as a background image in a mode where the user can draw on it using a stylus.

#### Testing note-taking intents without a stylus

To test if an app responds correctly to note-taking intents without an active stylus, using the following method to show the note-taking options:

1. [Switch to dev mode and make the device writable](/{{locale.code}}/android/sideload)
2. Press [[Ctrl]]+[[Alt]]+[[F2]] to open a terminal
3. Run the command `sudo vi /etc/chrome_dev.conf`
4. Press [[i]] to edit and add `--ash-enable-palette` to a new line at the end of the file
5. Save by pressing [[Esc]] and then typing [[:]][[w]][[q]] and pressing [[Enter]]
6. Press [[Ctrl]]+[[Alt]]+[[F1]] to return to the regular Chrome OS UI
7. Log out and back in

There should now be a stylus menu in the shelf:

- Tap the stylus button in the shelf and choose “New note”. This should open a blank drawing note
- Take a screenshot (from shelf: `stylus button > Capture screen`) or download an image, there should be the option “Annotate image” in the notification. This should the app with the image ready to be annotated

## Gamepads

See our [Input Support](/{{locale.code}}/games/optimizing-games-inputs#game-controllers) page under Games for details on controller support.

## Input translation mode

Chrome OS enables an input translation mode by default. For most Android apps, this mode will help apps "just work" as expected in a desktop environment. Some examples include automatically enabling two-finger scrolling on the touchpad, mouse wheel scrolling, and mapping raw display coordinates to window coordinates. Generally, app developers do not need to implement any of these behaviours themselves.

If an app wishes to define custom input behaviour - for example defining a custom two-finger touchpad pinch action - or these input translations do not provide the input events expected by the app, this mode can be disabled by adding the following tag in to the Android manifest:

```xml
<uses-feature
  android:name="android.hardware.type.pc"
  android:required="false" />
```

<!--- hadrosaur: commenting out the DecorCaptionView section, I believe it is not longer relevant. This should be tested before it is removed completely.
## Beware the `DecorCaptionView`

In free-form window mode, the apps caption bar is part of your view hierarchy and under your control. You generally do not have to be aware of this, but there are cases where you have to be careful:

- Do not make modifications using `Window.getDecorView()`. If you want to add top-level views, add them to the view you have set as `Activity.setContentView()`.
- Do not expect your `Activity.setContentView()` to be at `(0, 0)` of your app. That’s where the caption bar is.
- If possible, avoid using `MotionEvent.getRawX()` or `MotionEvent.getRawY()`. If you do use them, use them in conjunction with
  `View.getLocationOnScreen()` to transform coordinates to view-space coordinates.
--->
