---
title: Improving Vulkan availability with Venus
metadesc: We recently launched Venus to enable better native graphics performance for Borealis Steam games, Android ARCVM and other virtual machine applications in Chrome OS.
tags:
  - games
  - technical
  - high-performance graphics
authors:
  - jbates
  - marcheu
  - ryanneph
date: 2022-05-10
---

Chrome OS currently uses the [VirGL framework](https://docs.mesa3d.org/drivers/virgl.html) to enable accelerated graphics via OpenGL for applications such as Steam games, Android apps and [Linux apps](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-linux/), all while maintaining the security advantages of running these apps in a virtual machine (VM). However, OpenGL has been around for 30 years and while it has clearly stood the test of time, it has some design quirks like statefulness and implicit fencing that can get in the way of efficiency. That’s where Vulkan comes in. We recently launched [Venus](https://docs.mesa3d.org/drivers/venus.html) to enable the graphics performance improvements of Vulkan for Steam and Android games, and other applications in Chrome OS.

## The need for Vulkan

[Vulkan](https://www.vulkan.org/) is a low-overhead graphics API designed for modern CPU and GPU architectures. Because the Vulkan API is lighter weight than OpenGL and doesn’t need complicated state tracking, you can achieve better performance with it. This also makes it more suitable for virtualization of graphics: the virtualization layer in the guest OS (VM) knows exactly what state to send to the host OS (Chrome OS).

Chrome OS games benefit from Vulkan the most, so we brought Vulkan into [Borealis (Steam VM)](https://chromeos.dev/en/posts/bringing-steam-to-chromeos) and [ARCVM (Android VM)](https://chromeos.dev/en/posts/making-android-more-secure-with-arcvm). For Borealis, an increasing number of Linux Steam games already target Vulkan, and supporting Vulkan lets us gain access to a larger library of games via [Steam Play](https://www.chromium.org/chromium-os/steam-on-chromeos/#steam-play). And because new Android devices support hardware-accelerated Vulkan, more apps and game engines are using the API to achieve better performance.

## Venus: virtualized Vulkan

To make Vulkan available to applications and games in Chrome OS, we collaborated with the open source community to build [Venus](https://docs.mesa3d.org/drivers/venus.html) (named after Vulcan’s wife in Roman mythology).

Venus is an efficient framework for virtualized Vulkan, providing the accelerated Vulkan API to Chrome OS guest VM applications. Venus has a lightweight guest-side implementation that streams Vulkan API calls into a shared memory buffer that the host-side renderer asynchronously consumes. Its predecessor, VirGL, in contrast has a guest-side driver that interprets OpenGL calls to synchronously return OpenGL state and error results at the expense of additional CPU overhead.This causes a performance hit twice, once when the renderer interprets and submits those commands to the host, and again for error checking and state tracking, as required by [the spec](https://www.khronos.org/registry/OpenGL/index_es.php).

One of the big design changes from VirGL is Venus’s process isolation. In the event of an attack on the host through the guest graphics API, the Venus architecture limits the attack to the guest application’s own graphics data as opposed to the guest OS’s system memory.

![Diagram that shows how VirGL has one host process managing multiple guest rendering contexts while Venus has a separate host process for each guest rendering context.](ix://posts/improving-vulkan-availability-with-venus/virgl-venus.svg)

## Venus for Android

Android apps and games are an important use case for graphics performance in Chrome OS. For a while now, multiple teams have been developing a library called [ANGLE](https://chromium.googlesource.com/angle/angle) that provides the OpenGL ES API on top of a native Vulkan driver (among others). By layering ANGLE-on-Venus in the guest VM, the added performance and security benefits of Venus can also be applied to Android apps that still rely on OpenGL ES. Compared to VirGL, we found in internal testing that ANGLE-on-Venus was faster for several graphics benchmarks and popular games on ARM and X86 devices. This gain came from efficiencies granted by Vulkan and the Venus virtualization design. These are promising results for the future of Vulkan.

## Future

There is still much work to be done to bring Venus to more devices and guest VMs and to optimize its performance.

The Android and Chrome OS ecosystem is gradually shifting focus from OpenGL to Vulkan. Vulkan’s efficient low level design unlocks new possibilities for simplifying graphics architectures. One example is leveraging [ANGLE](https://chromium.googlesource.com/angle/angle) on Vulkan to support OpenGL ES 3.1+ without a dedicated OpenGL ES driver. This could allow driver vendors to shift development efforts from OpenGL to Vulkan. In the long run, efforts like this gradually improve the quality and performance of Vulkan drivers and lead to a positive feedback loop as more applications and engines build on Vulkan to gain its benefits.

As of May 2022, Venus has shipped on [Chromebooks](https://www.chromium.org/chromium-os/steam-on-chromeos/) that support Steam and Pixelbooks for ARCVM. Venus is [open source](https://docs.mesa3d.org/drivers/venus.html) and has been [contributed to QEMU](https://www.collabora.com/news-and-blog/blog/2021/11/26/venus-on-qemu-enabling-new-virtual-vulkan-driver/) where it benefits other virtualization efforts outside of Chrome OS. Look out for more Vulkan support in Chrome OS Linux and Android as we roll out Venus to new devices.
