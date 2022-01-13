---
title: Input compatibility
metadesc: How to support all of the different input types that are available to chromebooks.
date: 2020-05-01
weight: -5
tags:
  - input devices
  - keyboard support
  - stylus support
  - mouse support
  - trackpad support
  - touchscreen support
---

On Chrome OS devices, many users interact with apps using a keyboard, mouse,
trackpad, stylus, or gamepad. While these input devices are also used on Android
phones, they are not as common and are often overlooked by developers.

Developers who want their app to work well with input on Chrome OS, and other
large screen Android capable devices, should look at the
following optimizations:

- Add and test basic keyboard support, such as keyboard navigation via arrow and
  tab keys, Enter key for confirming text entry, and Space for play/pause in media
  apps.
- Add standard keyboard shortcuts where applicable, for example [[Ctrl]]+[[Z]] for undo, [[Ctrl]]+[[S]] for save.
- Test basic mouse interactions in the manner of right-click for context menu, icon changes on hover, and mouse wheel/trackpad scroll events on custom views.
- Test app-specific input devices such as stylus for drawing apps, game controllers for games, and MIDI controllers for music apps.
- Consider advanced input support that could make the app stand-out in desktop environments: touchpad as a cross-fader for DJ apps, mouse capture for games, and extensive keyboard shortcuts for power users.

@[youtube](https://youtu.be/FPuaaYpUd5s)

## Keyboard

The way your app responds to keyboard input contributes to a good desktop
experience. There are three kinds of keyboard input: [Navigation](#navigation),
[Keystrokes](#keystrokes), and [Shortcuts](#shortcuts).

### Navigation

Keyboard navigation is rarely implemented in touch-centric apps, but users
expect it when they are using an app and have their hands on a keyboard.
It can also be essential for users with accessibility needs on both phones
and desktop devices.

For many apps, simple arrow key and tab navigation is all that is needed and is
mostly handled automatically by the Android framework. For example, a view of
a `Button` is focusable by default, and keyboard navigation should generally
work without any additional code. In order to enable keyboard navigation for
views that are not focusable by default, developers should mark them as
focusable. This can be done programmatically or in XML, as shown below. See the
[Focus Handling](https://developer.android.com/reference/android/view/View.html#FocusHandling)
documentation for more information.

```kotlin {title="Sample Kotlin" .code-figure}
yourView.isFocusable = true
```

Alternatively you can set the `focusable` attribute in your layout file:

```xml {title="Sample XML" .code-figure}
android:focusable="true"
```

Once focus is enabled, the Android framework will create a navigational mapping
for all focusable views based on their position. This usually works as expected
and no further work is needed. When the default mapping is not correct for an
app's needs, it can be overridden as follows:

```kotlin {title="Sample Kotlin" .code-figure}
// Arrow keys
yourView.nextFocusLeftId = R.id.view_to_left
yourView.nextFocusRightId = R.id.view_to_right
yourView.nextFocusTopId = R.id.view_above
yourView.nextFocusBottomId = R.id.view_below

// Tab key
yourView.nextFocusForwardId = R.id.next_view
```

It is good practice to try to access every piece of your app's functionality
before each release using the keyboard only. It should be easy to access the
most common actions without mouse of touch input.

!!! aside.message--note
Remember, keyboard support might be essential for users with accessibility needs.
!!!

### Keystrokes

For text input that would be handled by an on-screen virtual keyboard
([IME](https://developer.android.com/guide/topics/text/creating-input-method)) such as an `EditText`,
apps should behave as expected on Chrome OS with no additional work from the
developer. For keystrokes that cannot be anticipated by the framework, apps
will need to handle the behavior themselves. This is especially true for apps
with custom views.

Some examples are chat apps that use the enter key to send a message,
media apps that start/stop playback with the space key, and games that control
movement with the [[w]],[[a]],[[s]], and [[d]] keys.

Most apps override the
[onKeyUp](<https://developer.android.com/reference/android/view/KeyEvent.Callback#onKeyUp(int,%20android.view.KeyEvent)>)
event and add the expected behavior for each received keycode, as shown below.

```kotlin {title="Sample Kotlin" .code-figure}
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

Using `onKeyUp` prevents apps from receiving multiple events if a key is held
down or released slowly. Games and apps that expect users to hold down keyboard
keys can look for the
[onKeyDown](<https://developer.android.com/reference/android/view/KeyEvent.Callback#onKeyDown(int,%20android.view.KeyEvent)>)
event.

Depending on an app's needs, overriding `onKeyUp` for the entire Activity
usually provides the needed behavior. If desired, an
[onKeyListener](https://developer.android.com/reference/android/view/View.OnKeyListener) can be added to a
specific view instead. For example an app may only listen for the Enter key in
specific EditText, and not the Activity, in order to implement send
functionality only when the user is typing in a chat box.

When you add keyboard support, follow the Android
[Keyboard handling documentation](https://developer.android.com/training/keyboard-input/commands.html).

### Shortcuts

Common [[Ctrl]], [[Alt]], and [[Shift]]-based shortcuts are expected in desktop
environments. If an app does not implement them, the experience can feel
frustrating and broken to users. Advanced users also
appreciate shortcuts for frequently used app-specific tasks. Shortcuts make an
app easier to use and differentiate it from apps that don't have shortcuts.

Some common shortcuts include save ([[Ctrl]]+[[S]]), undo ([[Ctrl]]+[[Z]]), and
redo ([[Ctrl]]+[[Shift]]+[[Z]]). For an example of some more advanced shortcuts, see the
list of
[VLC Media Player shortcut keys](https://www.vlchelp.com/vlc-media-player-shortcuts/).

Shortcuts can be implemented using
[dispatchKeyShortcutEvent](<https://developer.android.com/reference/android/view/Window.Callback.html#dispatchKeyShortcutEvent(android.view.KeyEvent)>).
This intercepts all meta-key combinations ([[Alt]], [[Ctrl]], and [[Shift]]) for a given
keycode. To check for a specific meta-key, use
[KeyEvent.isCtrlPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isCtrlPressed()>),
[KeyEvent.isShiftPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isShiftPressed()>),
[KeyEvent.isAltPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isAltPressed()>),
or [KeyEvent.hasModifiers()](<https://developer.android.com/reference/android/view/KeyEvent.html#hasModifiers(int)>).

Separating shortcut code from other keystroke handling (such as `onKeyUp` or
`onKeyDown`) can make code maintenance easier and maintains the default acceptance
of meta-keys without having to manually implement meta-key checks in every case.
Allowing all meta-key combinations can also be more convenient for users who
are accustomed to different keyboard layouts and operating systems.

```kotlin {title="Sample Kotlin" .code-figure}
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

You can also implement shortcuts in `onKeyUp` by checking for
[KeyEvent.isCtrlPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isCtrlPressed()>),
[KeyEvent.isShiftPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isShiftPressed()>),
or [KeyEvent.isAltPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isAltPressed()>)
in the same manner as above. This can be easier to maintain if the meta-behavior
is more of a modification to an app behavior than a shortcut. For example, when
[[W]] means "walk forward" and [[Shift]]+[[W]] means "run forward".

```kotlin {title="Sample Kotlin" .code-figure}
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

Chrome OS automatically handles most mouse and trackpad events so that they act
like touch events on an Android phone. This includes two-finger touchpad/mouse
wheel scrolling. Most apps generally only need to handle three
desktop-centric events: [Right-click](#right-click), [Hover](#hover), and
[Drag-and-Drop](#drag-and-drop).

### Right-click

Any actions that cause an app to show a context menu, like a long-press on a
list item, should also react to right-click events. To handle right-click
events, apps should register a
[`View.OnContextClickListener`](https://developer.android.com/reference/android/view/View.OnContextClickListener).
For details on constructing a context menu, see the Android
[context menu documentation](https://developer.android.com/guide/topics/ui/menus#context-menu)

```kotlin {title="Sample Kotlin" .code-figure}
yourView.setOnContextClickListener {
  showContextMenu()
  true
}
```

!!! aside.message--note
**Note:** any views that have been registered for a context menu using [Activity.registerForContextMenu()](<https://developer.android.com/reference/android/app/Activity#registerForContextMenu(android.view.View)>) should automatically work with both long-press and right-click without the need to register a context click listener.
!!!

### Hover

Developers can make their app layouts feel polished and easier to use by
handling hover events. This is especially true for custom views. The two most
common examples of this are:

- Indicating to users if an element has interactive behavior, such as being clickable or editable, by changing the mouse pointer icon
- Adding visual feedback to items in a large list or grid when the pointer is hovering over them

```kotlin {title="Sample Kotlin" .code-figure}
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

In a multi-window environment, users expect to be able to drag-and-drop items
between apps. This is true for Chrome OS devices as well as
tablets, phones, and foldables in split-screen mode.

Developers should consider whether users are likely to drag items into their
app. Some common examples include: photo editors should expect to receive
photos, audio players should expect to receive audio files, and drawing programs
should expect to receive photos.

To add drag-and-drop support, follow the Android
[Drag-and-Drop documentation](https://developer.android.com/guide/topics/ui/drag-drop.html) and take a look
at this
[Chrome OS blog post](https://medium.com/androiddevelopers/android-on-chrome-os-implementing-drag-drop-2cc2bdcdc621).

**Special considerations for Chrome OS**

- To handle files from the Chrome OS Files app, look for the MIME type `application/x-arc-uri-list`
- Remember to request permission via `requestDragAndDropPermissions` to access items dragged in from outside the app
- An item must have the `View.DRAG_FLAG_GLOBAL` flag in order to be dragged out to other applications

### Multi-select support

If your app contains lists or grids, consider whether your users would benefit from support for multi-select. A high-quality multi-select experience with mouse and trackpad often includes features such as band selection. Implementing this on your own can be challenging, but you can leverage [the Recyclerview Selection library](https://developer.android.com/reference/androidx/recyclerview/selection/package-summary).
![An example of band multi-select with a mouse and pointer](ix://android/input-compatibility/RecyclerView-Selection-Demo.gif)

### Advanced pointer support

Apps that do advanced handling of mouse and touchpad input should follow the
Android documentation for
[View.onGenericMotionEvent()](<https://developer.android.com/reference/android/view/View#onGenericMotionEvent(android.view.MotionEvent)>)
and use
[`MotionEvent.getSource()`](<https://developer.android.com/reference/android/view/MotionEvent#getSource()>)
to distinguish between
[SOURCE_MOUSE](https://developer.android.com/reference/android/view/InputDevice#SOURCE_MOUSE) and
[SOURCE_TOUCHSCREEN](https://developer.android.com/reference/android/view/InputDevice#SOURCE_TOUCHSCREEN).

Examine the `MotionEvent` to implement the required behavior:

- Movement generates `ACTION_HOVER_MOVE` events
- Buttons generate `ACTION_BUTTON_PRESS` and `ACTION_BUTTON_RELEASE` events. You can also check the current state of all mouse/trackpad buttons using `getButtonState()`.
- Mouse wheel scrolling generates `ACTION_SCROLL` events

## Stylus

Many Chromebooks come with a stylus, and Android apps handle that as touchscreen input.
Some devices might also have a USB or bluetooth drawing table, like the
[Wacom Intuos](https://www.wacom.com/en-us/products/pen-tablets/wacom-intuos).
Android apps can receive bluetooth input, but won't work with USB input.

A stylus event is reported as a touchscreen event via
[View.onTouchEvent()](<https://developer.android.com/reference/android/view/View#onTouchEvent(android.view.MotionEvent)>)
or [View.onGenericMotionEvent()](<https://developer.android.com/reference/android/view/View#onGenericMotionEvent(android.view.MotionEvent)>),
and contains a
[`MotionEvent.getSource()`](<https://developer.android.com/reference/android/view/MotionEvent#getSource()>)
of type [SOURCE_STYLUS](https://developer.android.com/reference/android/view/InputDevice#SOURCE_STYLUS).
The `MotionEvent` will also contain additional data:

- [MotionEvent.getToolType()](<https://developer.android.com/reference/android/view/MotionEvent#getToolType(int)>) will return [TOOL_TYPE_FINGER](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_FINGER), [TOOL_TYPE_STYLUS](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_STYLUS), or [TOOL_TYPE_ERASER](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_ERASER) depending on the tool that made contact with the surface
- [MotionEvent.getPressure()](<https://developer.android.com/reference/android/view/MotionEvent#getPressure(int)>) will report the physical pressure applied to the stylus pen, if supported
- [MotionEvent.getAxisValue()](<https://developer.android.com/reference/android/view/MotionEvent#getAxisValue(int,%20int)>) with [MotionEvent.AXIS_TILT](https://developer.android.com/reference/android/view/MotionEvent#AXIS_TILT) and [MotionEvent.AXIS_ORIENTATION](https://developer.android.com/reference/android/view/MotionEvent#AXIS_ORIENTATION) which can be used to read the physical tilt and orientation of the stylus, if supported

### Historical points

Android batches input events and delivers them once per frame. A stylus pen can
report events at much higher frequencies than the display. When creating
drawing apps, it is important to check for events that may be in the recent past
by using the `getHistorical` APIs:

- `MotionEvent.getHistoricalX()`
- `MotionEvent.getHistoricalY()`
- `MotionEvent.getHistoricalPressure()`
- `MotionEvent.getHistoricalAxisValue()`

### Palm rejection

Chrome OS attempts to recognize when a user's palm is resting on the
touchscreen. However, this is not always possible. Sometimes a touch event might
be reported to the app before the OS recognizes it as a palm. In that case,
touches will be cancelled by reporting an `ACTION_CANCEL` event.

This event tells the app that certain touches are invalid and it should undo all
interactions caused by those touches. For example, a drawing app might
temporarily draw new lines as soon as they are received to provide the lowest
latency, but only commit them permanently to the canvas once the touch series is
finished cleanly. If touch events are cancelled in the meantime, the temporary
lines can be easily erased.

!!! aside.message--note
**Note:** One way to reduce extraneous palm and finger events in drawing and writing
apps is to provide a UI setting that disables drawing via touch, and only uses
stylus events for drawing when in this mode.
!!!

### Note-taking apps

Chrome OS has a special intent that surfaces registered note-taking apps to
users. To register an app as a note-taking app, add the following to the
Android manifest:

```xml {title="Sample XML" .code-figure}
  <intent-filter>
    <action android:name="org.chromium.arc.intent.action.CREATE_NOTE" />
    <category android:name="android.intent.category.DEFAULT" />
  </intent-filter>
```

When an app is registered, the user can select it as the default note-taking
app. When a new note is requested, the app should create an empty note ready
for stylus input. When the user wishes to annotate an image (such as a screenshot
or downloaded image), the app launches with `ClipData` containing one
or more items with `content://` URIs. The app should create a note that uses the
first attached image as a background image and enter a mode where the user can
draw on the with a stylus.

#### Testing note-taking intents without a stylus

To test if an app responds correctly to note-taking intents without an active
stylus, use the following method to display the note-taking options:

1. [Switch to dev mode and make the device writable](https://chromium.googlesource.com/chromiumos/docs/+/refs/heads/master/developer_mode.md)
2. Press [[Ctrl]]+[[Alt]]+[[F2]] to open a terminal
3. Run the command `sudo vi /etc/chrome_dev.conf`
4. Press `i` to edit and add `--ash-enable-palette` to a new line at the end of the file
5. Save by pressing Esc and then typing :, w, q and pressing Enter
6. Press [[Ctrl]]+[[Alt]]+[[F1]] to return to the regular Chrome OS UI
7. Log out and back in

There should now be a stylus menu in the shelf:

- Tap the stylus button in the shelf and choose **New note**. This should open a blank drawing note
- Take a screenshot. From shelf select **stylus button > Capture screen** or download an image. There should be the option to "Annotate image" in the notification. This should launch the app with the image ready to be annotated.

## Game Controllers

Chromebooks support up to four game controllers. Developers should use the
standard Android [Game Controller APIs](https://developer.android.com/training/game-controllers) to handle
them.

Buttons are mapped to common values following a
[common mapping](https://developer.android.com/training/game-controllers/controller-input#button).
Unfortunately, not all game controller manufacturers follow the same mapping
conventions. You can provide a much better experience if you allow users to
select different popular controller mappings.

## Input translation mode

Chrome OS enables an input translation mode by default. For most Android apps
this mode helps apps work as expected in a desktop environment. Some
examples include automatically enabling two-finger scrolling on the touchpad,
mouse wheel scrolling, and mapping raw display coordinates to window
coordinates. Generally, app developers do not need to implement any of these
behaviors themselves.

If an app implements custom input behavior, for example defining a custom
two-finger touchpad pinch action, or these input translations do not provide
the input events expected by the app, you can disable the input translation mode
by adding the following tag to the Android manifest:

```xml {title="Sample XML" .code-figure}
<uses-feature
  android:name="android.hardware.type.pc"
  android:required="false" />
```
