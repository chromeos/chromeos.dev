---
title: Steam on Chromebook, now in beta
metadesc: Steam for Chromebooks is now in beta, available on ChromeOS Beta 108.0.5359.24, with broader availability, improved user experience, and better performance and compatibility
tags:
  - games
  - announcement
authors:
  - zalcorn
date: 2022-11-03
---

Earlier this year, the ChromeOS gaming team and our partners at Valve collaborated to [release an alpha version](/{{locale.code}}/posts/bringing-steam-to-chromeos) of Steam on Chromebook. Since then, we’ve received thousands of gameplay reports from the amazing ChromeOS community and invested in improving the experience at every level of the stack. Today, we’re excited to announce that Steam on Chromebook is entering beta with ChromeOS 108, featuring broader availability, an improved user experience, and better performance and compatibility for more of your favorite games.

## Broader availability

Because switching to the ChromeOS Dev channel isn’t an option for many due to its inherent instability, a big component of this release is availability in the ChromeOS Beta channel. Users of supported devices on ChromeOS Beta 108.0.5359.24 or greater will be able to set up Steam using the instructions at g.co/SteamOnChromeOS.

We’ve also heard loud and clear from the community that folks want to try Steam on more devices. With this release we’re adding support for devices with AMD Ryzen 5000 C-Series and Intel 12th Gen Core CPUs and lowering the minimum CPU requirement to i3 / Ryzen 3. This more than triples our supported devices, and notably includes the new [cloud gaming Chromebooks](https://blog.google/products/chromebooks/gaming-chromebooks/) from Acer, ASUS, and Lenovo.

Of course, local gaming is still heavily hardware dependent, so your experience will vary based on your device’s particular specs. We still recommend 16GB RAM and an i5 / Ryzen 5 or higher for the best experience.

## Improved user experience

The most valuable aspect of the alpha release was the ability to hear directly from the community what’s working, and what’s not. Thanks to your feedback, we’ve improved usability throughout the Steam on Chromebook experience, in ways both big and small.

One big way is how we manage storage within the Steam on ChromeOS environment. Previously we managed storage based on a game’s reported installation size on Steam. However, this prevented games that download content from outside Steam from being able to access the storage they needed. Our entirely reworked solution uses a sparse disk and ballooning, and has additional benefits like improved file access performance for Proton games. Stay tuned for a future ChromeOS.dev post that dives deep into how this works.

Another area we invested in was power management. There’s nothing worse than losing game progress because you didn’t know your laptop was running low on power, so we now ensure power notifications are displayed in full screen games. We also extended battery life while gaming by reducing CPU overhead in Vulkan and DirectX titles.

And as much as we love our `insert_coin` ASCII art, we’ve made it much easier to start the installation process. With the `#enable-borealis` flag enabled in `chrome://flags`, search for “Steam” in the ChromeOS launcher to start the installation.

## Better performance and compatibility

The Steam on Chromebook project is about bringing the best and most innovative games to Chromebook users with the performance they need to shine. That means everything from adding support for major graphics libraries like DirectX 12 and Vulkan 1.3 to improving how shaders are stored and persisted.

One of the most wide-ranging performance improvements relates to high resolution displays, which previously incurred a significant performance hit even when the game itself was running at a much lower resolution. We’ve improved our scaling system so you can now performantly play many more games on QHD and UHD displays, and see the performance benefits of reducing in-game resolution on all displays.

As a result of our work on performance and compatibility, there are now 50 new titles added to our [recommended games list](https://www.chromium.org/chromium-os/steam-on-chromeos/#game-list), with more on the way. If you try Steam on Chromebook and find a great game, please let us know in a gameplay report!

## Let’s play!

To get started with Steam on Chromebook beta, head to g.co/SteamOnChromeOS for setup instructions, supported devices, known issues, recommended games, and more. We look forward to your feedback as we continue our work with Valve and the entire Chromebook community.

### Detailed changelog

- Added various game-specific tweaks
- AMD Ryzen 5000 C-series support
- Avoid sleeping when game indicates activity via dbus
- Changed shader cache format to reduce disk footprint
- Initial DX12 support
- Enable pointer lock by default (without the #exo-pointer-lock flag)
- Fixed some cases previously resulting in GPU hangs
- i3/R3 device support
- Improved battery life from reduced CPU overhead in Vulkan and DirectX titles
- Optimized display pipeline when scaling
- Improved GPU rendering performance with transparent huge page support
- Improved handling switching between apps and full-screen
- Improved keyboard handling; for example, the launcher key now works when the Steam client is focused
- Improved window management support
- Include Chinese, Japanese, Korean, and Thai fonts
- Increased size of shader caches
- Intel 12th Gen core support
- Low battery notifications
- Mouse cursor fixes
- New installer and splash screen
- Revamped storage management
  - Fixes games that install additional content outside of Steam
  - Improves file access performance for Proton games
  - Note: alpha users will need to uninstall and reinstall Steam so these changes can take effect
- Device no longer sleeps while games are downloading in the background.
- Shader caches persist until software update
- Show all low-battery notifications while gaming in fullscreen
- Vulkan 1.3 support
- Vulkan and GL performance improvements
- xshape support for games/launchers with transparency
