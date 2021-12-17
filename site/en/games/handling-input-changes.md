---
title: Handling input changes
metadesc: Learn how to handle input method changes while your app is running.
date: 2021-05-18
tags:
  - keyboard support
  - mouse support
  - input devices
  - stylus support
  - game controller support
weight: -8
---

Chromebooks offer users many different input options: keyboard, mouse, trackpads, touchscreens, stylus, MIDI, and gamepad/blue controllers. This means the same device can become a DJ’s station, an artist’s canvas, or a gamer’s preferred platform for AAA streaming games.

As a developer, this gives you the opportunity to create versatile and exciting app experiences for your users that leverage the input devices they already have at their fingertips - from an attached keyboard to a stylus to a Stadia game controller. However, all of these possibilities also require you to think about your UI to make your app experience smooth and logical. This is especially true if your app or game was designed with mobile phones in mind. For example, if your game has an onscreen touch-controlled joystick for phones, you will probably want to hide this when a user is playing with the keyboard.

On this page you will find the main issues to keep in mind when thinking about multiple sources of input and strategies for addressing them.

## User discovery of supported input methods

Ideally, your app will seamlessly respond to whatever input the user chooses to use. Often this is simple and doesn’t require you to provide the user with extra information. For example, a button should work if the user clicks on it with a mouse, a trackpad, the touchscreen, a stylus, etc. and you do not need to tell the user they can use these different devices to activate the button.

However, there are situations where the method of input can improve the user’s experience and it may make sense to let them know your app supports it. Some examples:

- A media playing app may support many handy keyboard shortcuts the user may not be able to guess easily.
- If you have created a DJ app, the user may use the touchscreen at first and may not realise that you have allowed them to use their keyboard/trackpad to provide tactile access to some of the features. Likewise, they may not realise that you support a number of MIDI DJ controllers and encouraging them to check out supported hardware might make for a more authentic DJing experience.
- Your game may be great with touchscreen and keyboard/mouse, but users may not realise it also supports a number of bluetooth game controllers. Connecting one of these could increase user satisfaction and engagement.

You can help users discover input options with messaging at an appropriate time. The implementation will look differently for each app. Some examples include:

- First-run or tip-of-the-day popups
- Configuration options in settings panels can passively indicate to users that support exists. Eg. a “game controller” tab in a game’s settings panel indicates controllers are supported.
- Contextual messages. Eg. if you detect a physical keyboard and find the user is clicking an action using a mouse or touchscreen, you may want to show a helpful hint that suggesting a keyboard shortcut
- Keyboard shortcut lists. When a physical keyboard is detected, providing an indication in the UI of a way to bring up a list of available keyboard shortcuts serves the dual purpose of advertising keyboard support is present, and providing an easy way for users to see and remember the supported shortcuts

## UI labeling/layout for input variation

Ideally your visual interface should not need to change very much if a different input device is used, all possible inputs should “just work”. However, there are important exceptions. Two of the major ones are touch-specific UI and on-screen prompts.

### Touch-specific UI

Any time your app has touch-specific UI elements, e.g. an on-screen joystick in a game, you should consider what the user experience will be when touch is not being used. In some mobile games, a significant part of the screen is used up by the controls which are necessary for touch-based play, but are unnecessary if the user is using a gamepad or keyboard to play. Your app or game should provide logic to detect which input method is being actively used and adjust the UI accordingly. See the [Implementation section](#implementation) below for some examples of how to do this.

![Car racing game UIs - one with on-screen controls and one with keyboard](ix://games/optimizing-games-input/input-on-screen-horizontal.png)

### On-screen prompts

Your app may be providing helpful on-screen prompts to your users. Be careful that these are not input-device dependent. For example:

- Swipe to…
- Tap anywhere to close
- Pinch-to-zoom
- Press ‘X’ to…
- Long-press to activate

Some apps may be able to adjust their wording to be input agnostic. This is preferable where it makes sense, but in many cases specificity is important and you may find yourself needing to show different messages depending on the input method being used, particularly in tutorial-type modes like on the apps first run.

### Multiple-language considerations

If your app supports multiple languages, you will want to think through your string architecture. For example, if you support 3 input modes, and 5 languages, that could mean 15 different versions of every UI message. This is going to increase the amount of work required to add new features and amplify the likelihood of spelling errors.

One approach is to think of interface actions as a separate set of strings. For example, if you define the “close” action as its own string variable with input-specific variants like: “Tap anywhere to close”, “Press ‘Esc’ to close”, “Click anywhere to close”, “Press any button to close”, then all of your UI messages that need to tell the user how to close something can use this single “close” string variable. When the input method changes, simply change the value of this one variable.

### Soft keyboard / IME input

Remember that if a user is using an app without a physical keyboard, text input can occur via an on-screen keyboard. Be sure to test that necessary UI elements are not occluded when an on-screen keyboard appears. See the [Android IME visibility documentation](https://developer.android.com/training/keyboard-input/visibility) for more information.

## Implementation

In most cases, apps or games should respond correctly to all valid input, regardless of what is shown on screen. If a user is using the touch-screen for 10 minutes, but then suddenly switches to using the keyboard, the keyboard input should work, regardless of visual prompts or controls on screen. In other words, functionality should take priority over visuals/text.This helps guarantee your app/game will be usable even if your input detection logic has an error or an unexpected situation arises.

The next step is to show the correct UI for the input method currently being used. How do you accurately detect this? What happens if users are switching between different input methods while using your app? What if they are using multiple methods at the same time?

### Prioritized state machine based on received events

One approach is to keep track of the current “active input state” - representing the input prompts currently shown on-screen to the user - by keeping track of actual input events being received by the app and transitioning between the states using prioritized logic.

#### Prioritize

Why prioritize input states? Users interact with their devices in all sorts of ways and your app should support their choice. For example, if a user chooses to use the touchscreen and a bluetooth mouse at the same time, that should be supported. But which on-screen input prompts and controls should you display? Mouse or touch?

Defining each set of prompts as an “input state” and then prioritizing them can help decide this in a consistent way.

#### Received input events determine the state

Why only act on received input events? You might be thinking that you could keep track of bluetooth connections to indicate if a bluetooth controller was attached or watch USB connections for USB devices. This is not a recommended approach for two main reasons.

First of all, the information you are able to guess about connected devices based on API variables is not consistent and the number of bluetooth/hardware/stylus devices is continually growing.

The second reason to use received events instead of connection status is that users may have a mouse, bluetooth controller, MIDI controller, etc. connected but not be actively using it to interact with your app or game.

By responding to input events that have been actively received by your app, you ensure you are responding to your users real actions in real-time, and not trying to guess their intentions with incomplete information.

### Example: game with touch, keyboard/mouse, and controller support

Imagine you have developed a car racing game for touch-based mobile phones. Players can accelerate, decelerate, turn right, turn left, or use nitro for a speed boost.

The current touchscreen interface consists of an on-screen joystick on the bottom left of the screen for the speed and direction controls, and a button on the bottom right for nitro. The user can collect nitro canisters on the track and when the nitro bar at the bottom of the screen is full, a message appears above the button that says “Press for Nitro!”. If it’s the user’s first game or no input is received for a while, “tutorial” text appears above the joystick showing the user how to make the car move.

You would like to add keyboard and bluetooth game controller support. Where do you begin?

![Car racing game with touch controls](ix://games/optimizing-games-input/input-touch.png)

#### Input states

Begin by identifying all of the **input states** your game might be running in and then listing all the parameters that you would like to change in each state.

|                        | Touch                                  | Keyboard/Mouse                                   | Game Controller                      |
| ---------------------- | -------------------------------------- | ------------------------------------------------ | ------------------------------------ |
| **Reacts to**          | All input                              | All input                                        | All input                            |
| **On-screen controls** | - On-screen joystick<br>- Nitro button | - No joystick<br>- No nitro button               | - No joystick<br>- No nitro button   |
| **Text**               | Tap for Nitro!                         | Press “N” for Nitro!                             | Press “A” for Nitro!                 |
| **Tutorial**           | Image of joystick for speed/direction  | Image of arrow keys and WASD for speed/direction | Image of gamepad for speed/direction |

Keep track of the "active input" state, and then update the UI as needed, based on that state.

!!! aside.message--note
Remember: your game/app should respond to all input methods, regardless of state. For example, if a user is driving the car with the touchscreen, but presses N on the keyboard - the nitro action should be triggered.  
!!!

#### Prioritized state changes

Some users may use the touchscreen and keyboard input at the same time. Some may begin using your game/app on the couch in tablet mode, and then switch to using the keyboard on the table. Others may connect or disconnect game controllers mid-game.

Ideally, you do not want to have incorrect UI elements - like telling the user to press the [[N]] key when they are using the touchscreen. At the same time, in the case of users simultaneously using multiple input devices, like touchscreen and keyboard, you do not want to have the UI swap back and forth constantly between the two states.

One way to handle this is to establish input type **priorities**, and build in a delay between state changes. For the car game above, you would always want to ensure the on-screen joystick was visible anytime screen touch events were being received, otherwise the game might seem unusable to the user. This would make the touchscreen the highest priority device.

If keyboard and touchscreen events were being received simultaneously, the game should stay in touchscreen mode - though it would still react to keyboard input. If no touchscreen input was received after 5 seconds and keyboard events were still being received, perhaps the on-screen controls would fade and the game would move to the keyboard state.

Game controller input would follow a similar pattern: the controller UI state would be given a lower priority than keyboard/mouse and touch and only appear if game controller input and not other forms of input were being received. The game would always respond to controller input.

Below is a state diagram and a transition table for the example. Adapt the idea to your app or game.

![Prioritized state machine - touchscreen, keyboard/mouse, game controller](ix://games/optimizing-games-input/input-state-machine.png)

|                | #1 Touchscreen                                                                   | #2 Keyboard                                                                       | #3 Gamepad                                                              |
| -------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Move to #1** | N/A                                                                              | - Touch input received<br>- Move immediately to Touch input state                 | - Touch input received<br>- Move immediately to Touch input state       |
| **Move to #2** | - No touch for 5s<br>- Keyboard input received<br>- Move to Keyboard input state | N/A                                                                               | - Keyboard input received<br>(move immediately to Keyboard input state) |
| **Move to #3** | - No touch for 5s<br>- No keyboard for 5s                                        | - No keyboard for 5s<br>- Gamepad input received<br>- Move to Gamepad input state | N/A                                                                     |

!!! aside.message--note
Notice how prioritization helps make it clear which type of input should be dominant. Input state **instantly** moves “up” in priority:

<p style="padding-left: 3em">3. Gamepad -> 2. Keyboard -> 1. Touch</p>

as soon as a higher priority device is used, but it **slowly** moves “down” in priority, only after a delay period and only if the lower priority device is actively being used.
!!!

### Input events

Here is some example code of how to detect input events from various kinds of input devices using the standard Android APIs. Use these events to drive your state machine, like above. You should adapt the general concept to the types of input events you expect and to your app or game.

#### Keyboard and controller buttons

```kotlin
// Drive the state machine based on the received input type
// onKeyDown drives the state machine, but does not trigger game actions
// Both keyboard and game controller events come through as key events
override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    if (event != null) {
        // Check input source
        val outputMessage = when (event.source) {
            SOURCE_KEYBOARD -> {
                MyStateMachine.KeyboardEventReceived()
                "Keyboard event"
            }
            SOURCE_GAMEPAD -> {
                MyStateMachine.ControllerEventReceived()
                "Game controller event"
            }
            else -> "Other key event: ${event.source}"
        }
        // Do something based on source type
        findViewById<TextView>(R.id.text_message).text = outputMessage
    }
    // Pass event up to system
    return super.onKeyDown(keyCode, event)
}
```

```kotlin
// Trigger game events based on key release
// Both keyboard and game controller events come through as key events
override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
   when(keyCode) {
       KeyEvent.KEYCODE_N -> {
           MyStateMachine.keyboardEventReceived()
           engageNitro()
           return true // event handled here, return true
       }
   }
   // If event not handled, pass up to system
   return super.onKeyUp(keyCode, event)
}
```

!!! aside.message--note
**Note**: for KeyEvents, you can choose to use either [`onKeyDown()`](<https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent)>) or [`onKeyUp()`](<https://developer.android.com/reference/android/app/Activity#onKeyUp(int,%20android.view.KeyEvent)>). Here, [`onKeyDown()`](<https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent)>) is used for controlling the state machine whereas [`onKeyUp()`](<https://developer.android.com/reference/android/app/Activity#onKeyUp(int,%20android.view.KeyEvent)>) is used for triggering game events.

If a user presses and holds a button, [`onKeyUp()`](<https://developer.android.com/reference/android/app/Activity#onKeyUp(int,%20android.view.KeyEvent)>) will only be triggered once per keypress whereas [`onKeyDown()`](<https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent)>) will be called multiple times. If want to react to the down press, you should handle game events in [`onKeyDown()`](<https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent)>) and implement logic to address the repeated events. See [Handling Keyboard Actions](https://developer.android.com/training/keyboard-input/commands#SingleKey) documentation for more info.
!!!

#### Touch and Stylus

```kotlin
// Touch and stylus events come through as touch events
override fun onTouchEvent(event: MotionEvent?): Boolean {
   if (event != null) {
       // Get tool type
       val pointerIndex = event.action and ACTION_POINTER_INDEX_MASK shr ACTION_POINTER_INDEX_SHIFT
       val toolType = event.getToolType(pointerIndex)

       // Check tool type
       val outputMessage = when (toolType) {
           TOOL_TYPE_FINGER -> {
               MyStateMachine.TouchEventReceived()
               "Touch event"
           }
           TOOL_TYPE_STYLUS -> {
                MyStateMachine.StylusEventReceived()
               "Stylus event"
           }
           else -> "Other touch event: ${toolType}"
       }

       // Do something based on tool type, return true if event handled
       findViewById<TextView>(R.id.text_message).text = outputMessage
   }
   // If event not handled, pass up to system
   return super.onGenericMotionEvent(event)
}
```

#### Mouse and joystick

```kotlin
// Mouse and joystick events come through as generic events
override fun onGenericMotionEvent(event: MotionEvent?): Boolean {
   if (event != null) {
       // Check input source
       val outputMessage = when (event.source) {
           SOURCE_JOYSTICK -> {
                MyStateMachine.ControllerEventReceived()
               "Controller event"
           }
           SOURCE_MOUSE -> {
                MyStateMachine.MouseEventReceived()
               "Mouse event"
           }
           else -> "Other generic event: ${event.source}"
       }
       // Do something based on source type, return true if event handled
       findViewById<TextView>(R.id.text_message).text = outputMessage
   }
   // If event not handled, pass up to system
   return super.onGenericMotionEvent(event)
}
```
