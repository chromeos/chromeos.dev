---
title: 'Windows games on ChromeOS with Proton'
metadesc: 'Discover how Proton and Steam make it possible to play Windows games on ChromeOS.'
tags:
  - games
  - technical

authors:
  - renatopereyra
date: 2023-01-03
---

[Steam is now available on ChromeOS](https://www.chromium.org/chromium-os/steam-on-chromeos/)
and many users are already enjoying some of their favorite games. But you may be
wondering how the magic happens.
[Borealis is a VM running Arch Linux](https://chromeos.dev/en/posts/bringing-steam-to-chromeos),
so Linux titles run the same way that they run on any Linux distribution. For
Windows games, the story is more complex. Windows games run through a
compatibility layer called Proton, which Steam downloads automatically when a
user installs a Windows game on a Linux system.

# So…what exactly is Proton?

Scrolling through the [Proton
repository](https://github.com/ValveSoftware/Proton), you'll quickly notice that
the vast majority of Proton consists of git submodules. Proton is\* *a collection
of modules that grew organically in the open-source community out of a desire to
bring widely-available cross-platform support to the world. Proton's real
value-add is sorting out *how\* to get all of these modules working together
properly and with good performance. This is no easy goal since the support
offered by Proton is fraught with corner cases. Achieving synergy of these
modules requires applying and maintaining meaningful modifications on top of
upstream open source projects.

Proton support is still growing and can vary a lot even between similar games.
The dedicated Linux gaming community has created
[ProtonDB](https://www.protondb.com/) to keep track of supported games. Most of
the time, titles marked as Platinum and Gold work well on most Linux systems.
Being an Arch Linux VM, Borealis often supports most of these titles as well,
when device hardware specs allow.

Windows games can be installed by Steam on ChromeOS after either enabling
Proton in the Steam Play tab of the Steam settings or enabling Proton for a
specific game in the Compatibility tab of the game properties. Proton is
automatically installed by Steam alongside game installations that require it.

# Standardizing Proton dependencies

In general, software will work best when the runtime system has libraries with
ABIs and APIs that match the build system's. Unfortunately, there are no strong
ABI or API guarantees in Linux across distros or library versions. Package
managers traditionally work around this issue via dependency tracking. However,
this approach breaks down when the list of dependencies is as long and as
sensitive as Proton's. Therefore, a big challenge for Proton has been ensuring
consistent behavior across devices.

The
[Steam Linux Runtime](https://gitlab.steamos.cloud/steamrt/steamlinuxruntime/-/tree/master/)
(SLR), introduced in Proton 5.13, aims to solve this. It's a [Flatpak-style
sandbox](https://flatpak.org/faq/) that bundles a specific set of libraries
known to work well with Proton. This set of libraries is referred to as the
["scout" Steam runtime](https://gitlab.steamos.cloud/steamrt/steam-runtime-tools/-/blob/master/docs/ld-library-path-runtime.md).
When a Proton game is run, a tool called
[pressure-vessel](https://gitlab.steamos.cloud/steamrt/steam-runtime-tools/-/blob/master/docs/pressure-vessel.md)
combines this scout runtime with the graphics stack installed on the host system
to round out the sandbox required by Proton games. The advantage of using a
Flatpak sandbox over containers like Docker is that Flatpak sandboxes are meant
to be
[created and run by an unprivileged user](https://docs.flatpak.org/en/latest/under-the-hood.html#underlying-technologies)
on the host system. This avoids some security concerns that would have come from
using a true Linux container to run Proton.

# Windows applications in Linux

Proton uses a [fork](https://github.com/ValveSoftware/wine/tree/proton_7.0) of
[Wine](https://www.winehq.org/) to run Windows games in Linux. This Valve-owned
fork maintains patches on top of upstream Wine to improve the compatibility of
Proton. Most of these patches are eventually improved on and merged upstream.

For performance reasons, Wine is very much _not_ an emulator or a virtual
machine. Wine does not attempt to maintain or simulate the internal state that
would be required to implement Windows at run time. Instead, Wine aims to
maintain as little state as possible and to translate incoming Windows API calls
into POSIX-compliant calls on the fly. Wine developers leverage
publicly-available Windows API documentation and black-box testing techniques in
their effort to approximate Windows API calls as closely as possible.

One of the unavoidable pieces of state that Wine requires to work correctly is
a directory structure that resembles the standard directory structure available
in Windows since applications generally expect to be able to open and load files
from pre-specified paths. This directory structure created by Wine is called a
[wineprefix](https://wiki.winehq.org/FAQ#Wineprefixes). When Steam first runs a
Proton game, it sets up this wineprefix automatically. The result is called the
game's
[compatdata directory](https://github.com/ValveSoftware/Proton/blob/proton_7.0/proton#L401).
It is within this directory structure that Proton games execute when they run
within the sandbox created by pressure-vessel.

To minimize the chance of games stepping on each other when they read or write
files, each game gets its own compatdata directory. The effect is similar to
each game
[running within its own computer](https://wiki.winehq.org/FAQ#How_can_I_run_two_programs_as_if_they_were_on_different_computers.3F),
maximizing Proton compatibility. Unfortunately, due to duplicate files and
directories, this also wastes some disk space. However, there are ongoing
efforts to de-duplicate across compatdata directories.

# Direct3D supported by Vulkan

Finally, one of the most integral parts of gaming: graphics. We've previously
discussed the importance of shifting toward low-overhead graphics APIs like
[Vulkan](https://chromeos.dev/en/posts/improving-vulkan-availability-with-venus).
ChromeOS is not the only Linux-based platform shifting toward the improved
performance that Vulkan offers, though. Many open-source projects are doing the
same. Proton leverages two such projects:
[DXVK](https://github.com/doitsujin/dxvk/tree/279b4b7ec225c2c4bddc4eb6ddfa8bfe89c8bf5c)
and
[VKD3D-Proton](https://github.com/HansKristian-Work/vkd3d-proton/tree/3e5aab6fb3e18f81a71b339be4cb5cdf55140980),
the latter being a fork of a [project driven by
WineHQ](https://source.winehq.org/git/vkd3d.git/).

Both DXVK and VKD3D-Proton translate
[Direct3D](https://docs.microsoft.com/en-us/windows/win32/direct3d) API calls
into Vulkan calls on the fly within the Borealis VM. Their difference is in the
Direct3D version that each supports. DXVK supports Direct3D versions 9 to 11 and
DXGI. VKD3D-Proton supports Direct3D 12. These two are different projects
because Direct3D 12 is
[substantially more low-level](https://www.anandtech.com/show/7889/microsoft-announces-directx-12-low-level-graphics-programming-comes-to-directx)
than Direct3D 9-11 and requires different design considerations. Given the
Direct3D version differences, it is more performant to design translation layers
independently.

While DXVK, and VKD3D-Proton are quite performant, there is a non-zero
performance cost to translate all the Direct3D API state when a Proton game
runs. A good way to counteract this is with caching. Both DXVK and VKD3D-Proton
implement caching schemes to help mitigate the cost of misses in caches managed
by device-specific graphics drivers.
[DXVK's](https://github.com/doitsujin/dxvk#state-cache) and
[VKD3D-Proton's](https://github.com/HansKristian-Work/vkd3d-proton/blob/c47a6a904bbeebcb2fbed4e7accfae5bd17cff2f/README.md#shader-cache)
caching schemes are functionally similar: both focus on caching the result of
the translation of Direct3D graphics state and shaders to Vulkan.

Despite caching efforts by DXVK and VKD3D-Proton, it is still far more
performant to avoid misses in the shader caches managed by device-specific
graphics drivers. Proton games make heavy use of shader caches to squeeze out as
much performance as possible. To improve the performance of Proton games, Steam
uses a tool called [Fossilize](https://github.com/ValveSoftware/Fossilize) to
warm up
[Mesa's Vulkan shader cache](https://gitlab.freedesktop.org/mesa/mesa/-/merge_requests/15390).
When a Steam user is presented with the "Processing Vulkan Shaders" stage before
a Proton game starts, Fossilize is warming up the shader cache behind the
scenes. Having a warm shader cache can greatly improve FPS and reduce unpleasant
jank.

—

Proton has grown thanks to the hard work of a diverse group of contributors
from all over the world. We're excited to join this effort to increase support
for gaming on Linux. Game on!
