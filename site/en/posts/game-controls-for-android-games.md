---
title: Game controls for Android games
metadesc: Play Android touchscreen games with your keyboard on ChromeOS with the new game controls feature.
tags:
  - games
  - input devices
  - keyboard support
authors:
  - gdomergue
  - cuicuiruan
  - tgorkin
date: 2022-09-01
---

ChromeOS users already have access to hundreds of thousands of Android games via Google Play, but many of these games are not yet optimized for keyboard and mouse use. Beginning with ChromeOS 105, we’re introducing an early Alpha of the game controls feature for a select set of touchscreen-only Android games. The game controls feature translates key presses into simulated touch events, bridging the gap for touchscreen-only games.

![Screen capture of the game Archero with the character running around the screen and shooting arrows at enemies. The character’s movements are controlled via a virtual joystick near the bottom of the screen, which has an overlay of W, A, S, D keyboard keys. The W, A, S, D, keys control the character in the up, left, down, and right directions, respectively.](ix://posts/game-controls-for-android-games/archero2.gif)

## Keyboards are critical

Keyboard support is critical for ChromeOS; the majority of ChromeOS users interact with apps using a mouse and keyboard, but many apps from Google Play are only designed with touch interactions in mind. It's an especially important problem for games, which often require quick movements or button taps that are difficult or impossible to perform with a mouse. By translating key presses into simulated touch events, the game controls feature allows players to use their keyboard to interact with on-screen buttons and virtual joysticks, resulting in a vastly improved experience for games with limited or missing keyboard support.

The new game controls feature can rapidly improve the gaming experience, particularly for ChromeOS devices without a touch screen. It doesn’t replace the existing need for developers to [implement keyboard support](/{{locale.code}}/games/optimizing-games-inputs) in their apps, though. To provide the best and most consistent gameplay across phone, tablet, desktop, and large-screen devices, we recommend developers support a [breadth of input modes](/{{locale.code}}/android/input-compatibility), including mouse, keyboard, and gamepads. We see game controls as a way to overcome initial challenges with the ChromeOS gaming experience while users wait for developers to fully optimize their apps for ChromeOS.

## Getting started

For the Alpha release, we’re introducing the most necessary elements to enable keyboard support on a handful of pre-selected games. This includes the ability to customize key assignments, show/hide the key overlay, and disable the game controls feature on a given game. This all lives within the game controls menu displayed within a supported app. The game controls feature is available on any device running ChromeOS 105 or later and is connected to both a keyboard and an input pointer device (such as a mouse or touchpad).

### What to expect

When first opening a game with game controls support, there will be an overlay showing the keys you can use to simulate various touches on screen via the keyboard. Currently, game controls can send keyboard input as tap actions and simulate touch-and-drag interactions commonly used for on-screen virtual joysticks/dpads. You can customize the key bindings via the game controls menu, which you can access by clicking the white square hovering on the right center portion of the game’s window.

![Screen capture of an AXES.io game showing a joystick controlled by W, A, S, and D keys, and a button to throw axes, controlled by the C key. The user clicks on the hovering game controls menu button at the right center portion of the screen, which opens a menu. The user clicks on the edit button next to the “Key Mapping” descriptor, moves their mouse to click on the C key associated with the throw axes button, and hits the spacebar, causing the displayed key for the button to turn to display “Space” instead. The user then hits the save button.](ix://posts/game-controls-for-android-games/axe.gif)

This release is intended for use in active gameplay. You should still use your mouse for menu navigations and in-game dialogs. It doesn’t address existing strange behavior some games have in certain window sizes or when resizing.

### Supported games

For the initial release, we handpicked a collection of games that we hope will reach a wide range of ChromeOS gamers. The categories we focused on were: joystick, single button, multi-button, and swipe games.

| Joystick Games                                                                                                                    | Single Button Games                                                                                                              | Multi-Button Games                                                                                                        | Swipe Games                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------- |
| [Archero](https://play.google.com/store/apps/details?id=com.habby.archero&hl=en_US&gl=US)                                         | [Geometry Dash Lite](https://play.google.com/store/apps/details?id=com.robtopx.geometryjumplite)                                 | [Hill Climb Racing](https://play.google.com/store/apps/details?id=com.fingersoft.hillclimb&hl=en_US&gl=US)                | [2048 (Androbaby)](https://play.google.com/store/apps/details?id=com.androbaby.game2048)        |
| [AXES.io](https://play.google.com/store/apps/details?id=com.yuriychechulin.throwio)                                               | [Stack Ball - Crash Platforms](https://play.google.com/store/apps/details?id=com.azurgames.stackball)                            | [Ninja Arashi 2](https://play.google.com/store/apps/details?id=com.blackpanther.ninjaarashi2&hl=en_US&gl=US)              | [2048 Original](https://play.google.com/store/apps/details?id=com.androbaby.original2048)       |
| [Heroics Epic Legend of Archero](https://play.google.com/store/apps/details?id=com.datavisionstudio.roguelike)                    | [Fire Balls 3D](https://play.google.com/store/apps/details?id=com.NikSanTech.FireDots3D)                                         | [Ninja Arashi](https://play.google.com/store/apps/details?id=com.blackpanther.ninjaarashi)                                | [2048 (Solebon LLC)](https://play.google.com/store/apps/details?id=com.gabrielecirulli.app2048) |
| [Wizard Legend: Fighting Master](https://play.google.com/store/apps/details?id=com.loongcheer.neverlate.wizardlegend.fightmaster) | [Stack Smash](https://play.google.com/store/apps/details?id=com.stack.ball.destroy.wood)                                         | [Ninja warrior: legend of adventure games](https://play.google.com/store/apps/details?id=com.tohsoft.arashi.ninja.shadow) | [2048 Number puzzle game](https://play.google.com/store/apps/details?id=com.estoty.game2048)    |
| [Pixel Blade R - Revolution](https://play.google.com/store/apps/details?id=com.pixelstar.pbr&hl=en_US&gl=US)                      | [Drop Stack Ball - Fall Helix Blast Crash 3D](https://play.google.com/store/apps/details?id=com.match3blaster.DropStackBallFall) | [Power Hover](https://play.google.com/store/apps/details?id=com.oddrok.powerhover)                                        | [2048 (S2 Apps)](https://play.google.com/store/apps/details?id=com.s2apps.game2048)             |
| [Zombero: Archero Hero Shooter](https://play.google.com/store/apps/details?id=com.aldagames.zombero.bullet.hell)                  | [Helix Smash](https://play.google.com/store/apps/details?id=com.nama.stackball)                                                  | [Grimvalor](https://play.google.com/store/apps/details?id=com.direlight.grimvalor)                                        |                                                                                                 |
| [Archer Hunter - Offline Action Adventure Game](https://play.google.com/store/apps/details?id=co.imba.archero)                    | [Stack Crush Ball](https://play.google.com/store/apps/details?id=com.stack.ball.crush)                                           |                                                                                                                           |                                                                                                 |
| [Mr. Autofier](https://play.google.com/store/apps/details?id=games.lightheart.mrautofire)                                         | [Crush Stack Ball Blast](https://play.google.com/store/apps/details?id=com.elegant.stack.ball.blast.crush)                       |                                                                                                                           |                                                                                                 |
|                                                                                                                                   | [Stack Fall](https://play.google.com/store/apps/details?id=com.Stellar.StackFall)                                                |                                                                                                                           |                                                                                                 |
|                                                                                                                                   | [Helix Stack Jump: Smash Ball](https://play.google.com/store/apps/details?id=com.hiroba.helix)                                   |                                                                                                                           |                                                                                                 |
|                                                                                                                                   | [Tap Titans 2](https://play.google.com/store/apps/details?id=com.gamehivecorp.taptitans2)                                        |                                                                                                                           |                                                                                                 |

---

This is just the beginning! We will be adding an editor to make adding game controls support possible for any game from Google Play that your Chromebook runs, mouse and gamepad support, handling more types of touch interactions, plus more! Have any games or requests you want to see prioritized? Submit your ideas via the Send Feedback button in the hovering menu on any game where game controls are enabled.
