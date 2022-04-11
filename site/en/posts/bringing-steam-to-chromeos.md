---
title: Bringing Steam to Chrome OS
metadesc: A brief overview of how the world of Steam games is opening up to Chrome OS.
tags:
  - games
  - technical
authors:
  - davidriley
  - cpelling
  - marcheu
date: 2022-04-12
---

_We recently announced the [Steam on Chrome OS Alpha](https://www.chromium.org/chromium-os/steam-on-chromeos/) which allows users to play [Steam](https://store.steampowered.com/) games on some recent Chromebooks. Over the next few months we'll be writing a series of blog posts diving into the technology behind it and what that means for developers._

Steam is coming to Chrome OS! Chrome OS users can look forward to playing favorites like [Portal 2](https://store.steampowered.com/app/620) locally, and game developers can look forward to a whole new set of players without requiring any changes to their games if it already runs on Linux. A lot of things have had to come together to make this a reality; we'll start off with an overview of how it all fits together. In this first article, discover why we’re using virtual machine technology to deliver Steam games on Chrome OS, and how we overcame some fundamental hurdles in doing so.

## Leveraging virtual machines

Steam on Chrome OS leverages the work we've been doing for years with Crostini and Chrome OS' own virtual machine monitor (VMM), [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/+/HEAD/README.md). Running Steam, and its games, within a VM is the best way to deliver on Chrome OS' goals of speed, security, and simplicity. Having a clear security boundary allows us to keep our users and their data safe. Games don't get direct access to a user's files, host GPU, or host kernel. Instead, separation is maintained by our proven VMM used for Crostini, Android, and Parallels. This provides another layer of security above normal Linux systems.

Building off of Valve's great work to make games compatible with the [Steam Deck](https://store.steampowered.com/steamdeck), our VM runs a modified version of [Arch Linux](https://archlinux.org/) designed specifically for gaming. This image, codenamed “Borealis”, is automatically kept up to date and updated with each Chrome OS release, ensuring users don’t need to deal with updating drivers or libraries themselves. Because Steam and all of its games are kept within a single VM image, if a user ever needs to uninstall it, they know everything will be removed in a single step, in keeping with Chrome OS’s goal of simplicity.

To guarantee high levels of performance, we have aimed to make the VM invisible to the user -- from both an operational and from a performance perspective. crosvm relies upon Linux's [KVM](https://www.linux-kvm.org/page/Main_Page) hypervisor and uses paravirtualized virtio-based devices instead of emulation. In order to play the latest games we built [Venus](https://docs.mesa3d.org/drivers/venus.html), a very low overhead Vulkan virtualization driver, that offers near native performance.

## Distributing Steam on-demand

Borealis is distributed through Chrome OS' [Downloadable Content (DLC) system](https://chromium.googlesource.com/chromiumos/platform2/+/HEAD/dlcservice/docs/developer.md), and only downloaded if a user chooses to install Steam. Once installed, the DLC system automatically keeps the VM image up to date with every Chrome OS release. Just like the main Chrome OS image, the DLC payload is fully verified to ensure it hasn't been tampered with or modified. Finally, since the host OS and the guest OS are updated together, they are fully tested together with each release; there’s never a question of drivers not matching after an OS update.

## Borealis vs Crostini

Borealis and Crostini have a lot more in common than they have differences. Both are managed by crosvm and make use of the same Chrome OS kernel. The core graphics and display pipeline remain constant. Applications use Vulkan and OpenGL to render frames via Mesa. Frames are passed to [Xwayland](https://wayland.freedesktop.org/xserver.html), and then to sommelier, our proxying Wayland compositor, and finally to Chrome's Wayland display server, exo, via the crosvm virtwl device. In general, unless something only makes sense for one application, we have worked hard to keep leveraging the same stack so they can both benefit from any fixes or improvements.

While Borealis and [Crostini](/{{locale.code}}/linux) share a lot of the same technology, they differ in a few key ways. It starts at the user experience. Borealis offers a turnkey experience for Chrome OS users of all technical levels. Crostini, on the other hand, is developer focussed; users are usually pretty comfortable with the command line and installing packages. When Steam on Chrome OS fully launches, users can expect a one-click installation process that they don't need to maintain instead of manually installing packages and their dependencies. Gamepad support for a wide variety of controllers has also been added, along with support for features such as pointer lock.

In addition to making the user experience more seamless and effortless, Borealis differs under the covers. While Crostini is based on Debian and is run from within a container inside the Chrome OS [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) VM, Borealis is based on Arch Linux running directly as the VM image. Crostini users need to keep their installed packages up-to-date themselves, but Borealis is automatically updated with the packages necessary for proper functionality. This extends to the Borealis VM itself. Because the VM image is mounted read-only with a separate read-write partition for data, system drivers and libraries cannot be accidentally modified, providing greater security and easier updates. This assures users that they are running what we’ve validated. Borealis also ships with a newer version of [Mesa](https://www.mesa3d.org/) that more closely tracks upstream, important since good gameplay relies heavily on great drivers. Finally, we have designed a resource manager which recognizes when users are playing games and optimizes system performance for them. All this is tied together with more extensive testing of games for a great experience with every release.

---

We're just getting started, both with these blog posts and the product. We'll be doing some deep dives on our Steam integration, our Vulkan virtualization story, developing games for Chrome OS, system optimizations, and other topics in the upcoming months. As for Steam on Chrome OS itself, expect to see new devices, new features, better integration and improved performance – and look out for the beta release coming later this year!
