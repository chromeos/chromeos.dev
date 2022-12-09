---
title: Integrating Steam into Chrome OS
metadesc: Steam runs in a virtual machine on ChromeOS, but the user experience needs to be seamless. Here's how we're balancing security and usability.
tags:
  - games
  - technical
authors:
  - cpelling
  - davidriley
date: 2022-06-14
---

<!-- prettier-ignore -->
*[MOBAs]: Multiplayer Online Battle Arena

Steam on ChromeOS [runs in a virtual machine](https://chromeos.dev/en/posts/bringing-steam-to-chromeos) (VM), with clear benefits for security, distribution, and simplicity. At the same time, we want the experience to be seamless; users shouldn’t need to know or care that a virtual machine is in use. In addition to making performance optimizations towards this goal, we’ve been hard at work on integrating the user experience with the rest of ChromeOS.

## A seamless experience

Installed Steam apps show up in the ChromeOS launcher alongside system apps, web apps, Android apps, and Linux apps. We achieve this using existing support in Steam and [Crostini](https://chromeos.dev/en/linux) for the [Desktop Entry Specification](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html) standard: a small program called garcon running inside the VM watches for `.desktop` files created by Steam and forwards them to the host system, which creates corresponding launcher entries. Garcon also provides their icons to the host, on request. When the user selects one of these launcher entries, the system starts the Borealis VM (if it’s not already running), waits for garcon to start, and sends it a Remote Procedure Call (RPC) requesting that it launch the named .desktop file (or rather, the executable referenced in its `Exec` field).

Besides the launcher integration, garcon handles an assortment of other communications with the host, including notifying the host of VM startup/shutdown, and forwarding URLs launched from within the VM (via `xdg-open`) to the host Chrome browser.

Once launched, Steam game windows appear seamlessly alongside other ChromeOS apps, rather than being combined into a single “desktop” window. This functionality has existed for Linux apps in ChromeOS for some time, so this is another case where Borealis leverages existing functionality. Under the hood, Chrome implements a Wayland server called Exo. Another program running inside the VM, called sommelier, serves as the [X window manager](https://en.wikipedia.org/wiki/X_window_manager) and proxies Wayland connections between Exo and [XWayland](https://wayland.freedesktop.org/xserver.html). Finally, XWayland accepts X11 connections from the Steam client and from games.

!!! aside.message
For those familiar with how GUI applications traditionally work under Linux, XWayland is simply the widely-used X11 server “Xorg” with a Wayland backend. Most Linux distributions which have adopted Wayland use XWayland for backwards compatibility with X11 apps.
!!!

#[Window management diagram for Steam apps in ChromeOS](ix://posts/integrating-steam-into-chromeos/steam-chromeos-ui-01.svg [A diagram showing how different parts of the window management system communicate in Borealis. Within the virtual machine, Steam and games connect to XWayland using the X11 protocol. XWayland connects to sommelier using the Wayland protocol. Sommelier connects back to XWayland using the X11 protocol, to serve as the X11 window manager. Sommelier also connects to the Chrome UI shell, which runs outside the virtual machine, using the Wayland protocol over virtio.])

## Making immersive gaming better on ChromeOS

There are some changes from Crostini, to better support the gaming use case. We are tweaking the availability of certain keyboard shortcuts, to avoid gameplay disruptions caused by accidental Launcher key presses. We’ve modified ChromeOS’s fullscreen behavior for Steam apps; mousing to the bottom of the screen normally brings up the [shelf](https://support.google.com/chromebook/answer/3113576), but that makes it hard to pan the camera in MOBAs and many strategy games, so we’ve disabled this for Steam. To support first-person games, we’ve made mouselock generally available; this allows apps to capture mouse input and use it to turn a 3D camera, rather than moving the mouse pointer. Given ChromeOS’s usability and security goals, these changes required careful UI design to make users aware of the fullscreen and mouselock states and clearly indicate a method of escaping them. Our solution was to promote the “Overview” key, present in the top row on all Chromebook keyboards, which brings up a window switching UI. From there, users can switch to other windows or close troublesome apps.

At the end of a session, once the user closes Steam and any running games, the VM automatically shuts down to save battery life, memory, and other system resources. We consider a "running” app to be one that has an active window open, with a grace period of 30 seconds to allow for load times and permit games to shut down gracefully. While game process lifetime might seem a more obvious signal, we found that has a number of edge cases in practice, and is less legible to users. Users have a reasonable expectation that an app that doesn't appear to be running won't be consuming system resources; tying VM lifetime to window visibility ensures that expectation is met.

## More fonts for more languages

There are numerous smaller integration points too. For example, fonts from the ChromeOS host system are mounted into the VM (at `/usr/local/share/fonts`), allowing us to support languages with large character sets such as Chinese, Japanese, and Korean with minimal additional disk usage. We also install additional fonts from the Arch Linux distribution, available within the VM at `/usr/share/fonts`.

---

Making the VM completely invisible is an ambitious goal, and we may never achieve it completely, but we believe we’ve already struck a good balance between security and usability. We’ll continue to make improvements as we work towards making Steam on ChromeOS more widely available.
