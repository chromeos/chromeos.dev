---
title: Adapting web games
metadesc: Creating and optimizing web games for Chrome OS.
date: 2020-06-16
weight: -1
---

Web games look and work great on Chrome OS. You can reach more users and provide a nicer integration by packing your app as a PWA. Read up on PWAs with the following links:

- [Overview of PWAs from web.dev](https://web.dev/progressive-web-apps/)
- [Desktop PWAs on Chrome OS](/{{locale.code}}/web/desktop-progressive-web-apps)

## Touchscreens

Many Chrome OS devices have touch screens. While most touch-based input should work with no additional work for web games, you should be careful you are not using input methods that are specific to mouse input, eg. if you are watching for events like `mousedown` and `touchmove`.

Some further information and best practices can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent) and [here](https://www.html5rocks.com/en/mobile/touchandmouse/).

## Stylus support

Many Chrome OS devices come with a stylus or can operate with an external bluetooth drawing tablet like the [Wacom Intuos](https://www.wacom.com/en-us/products/pen-tablets/wacom-intuos). Drawing apps and swipe-based games can reach large numbers of users on the web, and Chrome OS is the perfect platform to play them on. In addition to the experience you would get on other platforms, Chrome OS can take advantage of a special low-latency hint that can provide super fast screen response. Check out [this article](https://developers.google.com/web/updates/2019/05/desynchronized) for more information.

## Game controllers

Some users will want to interact with your game using a game controller. This can make your game really stand out and increase user engagement. For more information check out the [Gamepad API](https://www.w3.org/TR/gamepad/).

Buttons are mapped to common values following a [common mapping](https://www.w3.org/TR/gamepad/#remapping). Unfortunately, not all game controller manufacturers follow the same mapping conventions. Allowing your users to select from different popular controller mappings will ensure the best experience.

## Game engines

Many game engines have web targets that simplify tricky inputs and complicated browser support issues, which can help you focus on building a great game for your users.

Some engines you may wish to check out are [Construct](https://www.construct.net/en), [Defold](https://defold.com/), [Phaser](https://phaser.io/), [Pixi](https://www.pixijs.com/), [Unity](https://unity.com/), and [Cocos2d-x](https://www.cocos.com/en/cocos2dx).
