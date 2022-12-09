---
title: Google & Unity partner to support Chromebooks
metadesc: Google is partnering with Unity to bring x86 build support and input and windowing improvements starting in Unity 2021.2.0a14.
tags:
  - announcement
  - product news
  - gaming
  - unity
  - keyboard support
  - mouse support
  - large screens
  - window management
  - android
  - high-performance graphics
  - optimization
  - developer tools
authors:
  - mmonasch
featured:
  title: Google & Unity
  desc: We've partnered with Unity to support building games for Chromebooks
  images:
    - image: ix://posts/google-unity-partner-to-support-chromebooks/featured.png
      alt: Chrome OS gaming banner
date: 2021-04-21
---

Chrome OS users like to play Android games of all sorts, from card games to fully immersive open world RPGs. In the past year alone, time spent playing Android games on Chromebooks tripled. In order to bring the widest variety of games to our users, we enabled ARM games to run on Chrome OS [with Houdini](/{{locale.code}}/games/optimizing-games-publishing) and continue to invest heavily in Android gaming performance improvements. Our ultimate goal is to ensure that developers have the tools they need to build great games and empower them to bring incredible experiences to the platform.

[Unity](https://unity.com/) is the most widely used game engine for developing Android games. To bring more popular and new games to our users, we’re excited to announce that Google has partnered with Unity to optimize their game engine for Chrome OS!

## An optimized engine for optimized games

Starting today with the alpha release of Unity 2021.2.0a14, any developer can begin building for Chrome OS. After selecting Android as the build target, developers can choose to also build for Chrome OS through the Player Settings. Allowing a Chrome OS artifact to be built from the same project and build target is convenient as it reduces duplicate code and streamlines the publishing pipeline. Additionally, by the end of 2021, the same features and toolset found in Unity's Android environment will be available for Chrome OS.

![Unity's Player Settings with x86 and x86_64 options](ix://posts/google-unity-partner-to-support-chromebooks/unity-x86-support.png)

Here are a couple of highlights that we're particularly excited about:

### x86 and x86_64 build support

While ARM translation through Houdini provides a great solution to allow Chromebook's largely x86 ecosystem to play ARM-only titles, it does incur a cost. Stability and performance are at their peak when you build the right ABI for the target architecture. With x86 support built into Unity, developers can build with confidence knowing they are providing the best experience possible for their players.

### Improved input support and window management fixes

Input and window management have often been problematic when it comes to porting an Android game to Chrome OS. We've been fixing mouse, keyboard, and window issues both in Unity and in Chrome OS so developers can worry more about making their game and less about if scrolling the mouse or resizing the window is going to cause instability.

## What’s next

As this build moves from Alpha to full release, Google and Unity will continue working together to further improve the performance and stability of Unity 2021’s Chrome OS support. By the end of 2021, Unity 2020LTS will receive a backport of all Chrome OS improvements and build options. For more details, check out [Unity's release announcement](https://forum.unity.com/threads/google-chrome-os-support-is-now-available-as-of-2021-2-0a14.1096996/).

No matter if the game is launched, in progress, or just starting out, this new partnership will make it even easier to expand to new platforms. We can't wait to see what new titles will make their way onto Chrome OS.
