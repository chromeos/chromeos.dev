---
title: Input support
metadesc: Learn about keyboard, mouse, controller, and stylus input handling.
date: 2020-06-16
weight: -9
tags:
  - keyboard support
  - mouse support
  - input devices
  - stylus support
---

While many Chrome OS devices have touch screens, for games the best interaction experience on these large-screen devices is often delivered through mouse, keyboard, and gamepad. The mobile gaming world is often touch-centric and some thought needs to be given into how to provide the best experience for users not using touch.

Begin by checking out the best practices for adding [keyboard](/{{locale.code}}/android/input-compatibility#keyboard), [mouse](/{{locale.code}}/android/input-compatibility#mouse-and-touchpad-support), and [game controllers](/{{locale.code}}/android/input-compatibility#game-controllers) support. You will want to pay special attention to the case where users have keys held down or may be pressing multiple keys.

Touch-based actions are okay for Chromebooks with touchscreens, but it’s important to also include thoughtful physical controls for a great experience. For example, mouse input is great for adjusting the view or aiming, but should not be required for performing actions - if a mobile game has an on-screen menu that allows a user to use a torch, a sword, or a shield by pressing a button with their thumb, requiring them to click these buttons with a mouse will provide a poor experience. Instead, keyboard keys should be designated to trigger each action by overriding `onKeyUp` or `onKeyDown`. See the [input compatibility page](/{{locale.code}}/android/input-compatibility) for details and code.

## Mouse capture

First person viewpoint games look best on the desktop when they implement mouse capture. This hides the mouse pointer and allows the user to move the viewpoint, to aim, to steer, etc., by using the mouse. Below is a basic mouse capture demo that records the pointer position and button states after the user clicks a text view named `text_clickme`. See the Android [pointer capture documentation](https://developer.android.com/training/gestures/movement#pointer-capture) for more information.

```kotlin {title="Kotlin" .code-figure}
class MainActivity : AppCompatActivity() {

    var mouse_x: Float = 0f
    var mouse_y: Float = 0f
    var mouse_left_pressed = false
    var mouse_center_pressed = false
    var mouse_right_pressed = false
    var mouse_scrolling = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        text_clickme.setOnClickListener {
            text_clickme.requestPointerCapture()
        }

        text_clickme.setOnCapturedPointerListener { view, motionEvent ->
            // Get the coordinates required by your app
            mouse_x = motionEvent.x
            mouse_y = motionEvent.y

            when (motionEvent.action) {
                ACTION_DOWN -> {
                    when (motionEvent.buttonState) {
                        BUTTON_PRIMARY -> mouse_left_pressed = true
                        BUTTON_SECONDARY -> mouse_right_pressed = true
                        BUTTON_TERTIARY -> mouse_center_pressed = true
                    }
                    mouse_scrolling = false
                }

                ACTION_CANCEL,
                ACTION_UP -> {
                    when (motionEvent.actionButton) {
                        BUTTON_PRIMARY -> mouse_left_pressed = false
                        BUTTON_SECONDARY -> mouse_right_pressed = false
                        BUTTON_TERTIARY -> mouse_center_pressed = false
                        0 -> {
                            mouse_left_pressed = false
                            mouse_right_pressed = false
                            mouse_center_pressed = false
                        }
                    }
                    mouse_scrolling = false
                }
                ACTION_SCROLL -> {
                    mouse_scrolling = true
                }
                else -> {
                    mouse_scrolling = false
                }
            }

            // Indicate event was consumed
            true
        }
    }

    // Release pointer capture when escape pressed
    override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KEYCODE_ESCAPE) {
            text_clickme.releasePointerCapture()
            return true;
        }
        return super.onKeyUp(keyCode, event)
    }
}
```

## Chat

Chat features can be an important component of multiplayer games. Take some time to think about how users will interact with your game’s chat feature while playing. In particular, if they are playing with the keyboard, they should not have to use the mouse or touchscreen to access chat or send messages.

One pattern could be to have a keyboard key focus the chat box, and handle the [[enter]] key to send messages.

```kotlin {title="Kotlin" .code-figure}
override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
  return when(keyCode) {
    KeyEvent.KEYCODE_C -> {
      edittext_chatbox.requestFocus()
      true
    }
    KeyEvent.KEYCODE_ENTER -> {
      submitChatMessage()
      true
    }
    else -> super.onKeyUp(keyCode, event)
  }
}
```

Check out the [keyboard documentation](/{{locale.code}}/android/input-compatibility#keyboard) on the Android input compatibility page.

## Stylus support

Drawing apps and swipe-based games can take advantage of stylus input on Chrome OS devices. See the [stylus input](/{{locale.code}}/android/input-compatibility#stylus) page for more details.

## Game controllers

Chromebooks support up to four game controllers. Developers should use the standard Android [Game Controller APIs](https://developer.android.com/training/game-controllers) to support them.

Buttons are mapped to common values following a [common mapping](https://developer.android.com/training/game-controllers/controller-input#button). Unfortunately, not all game controller manufacturers follow the same mapping conventions. Allowing your users to select from different popular controller mappings can provide a much better experience.
