---
title: Linux FAQ
metadesc: Frequently asked questions about the Linux on Chrome OS container.
date: 2020-05-01
weight: 10
---

## Where can I chat with developers?

All Chromium OS development discussions happen in our [Chromebook Help Community](https://support.google.com/chromebook/community). Feel free to ask anything, but be sure to search to see if your question has already been addressed first.

## Where can I file feature requests?

As a nascent project, we‘ve got a lot on our plate and planning on releasing, so it’d be nice to hold off for now and check back in after a few Chrome OS releases.

Feel free to chat/ask on the mailing list above in the meantime.

Once we are in a more stable place, you can use our issue tracker. See the next question for details.

## Where can I file bugs?

Please first make sure you're using the latest dev channel. A lot of work is still ongoing.

Next, please make sure the issue isn't already known or fixed. You can check the [existing bug list](https://bugs.chromium.org/p/chromium/issues/list?can=1&q=component:OS%3ESystems%3EContainers).

If you still want to send feedback, you can [file a feedback report](https://support.google.com/chromebook/answer/2982029) and include `#crostini` (another name for Linux on Chrome OS) in the description. Feedback about any part of Chrome OS can be filed with [[Alt]]+[[Shift]]+[[i]].

If you still want to file a bug with the developers, use [this link](https://bugs.chromium.org/p/chromium/issues/entry?comment=Chrome%20version%3A%20%28copy%20from%20chrome%3A%2F%2Fversion%29%0AOS%3A%20Chrome%0A%0ARepro%20steps%3A%0A1.%20%0A2.%20%0A3.%20%0A%0AExpected%3A%20%0AActual%3A%20&status=Untriaged&labels=Pri-2%2COS-Chrome%2CType-Bug%2CProj-Containers&components=OS%3ESystems%3EContainers) to route to the right people.

## Why the name Crostini?

It's a play off [crouton](https://github.com/dnschneid/crouton) which is a project to easily create full Linux environments (including developer tools) for users who turned on developer mode. Crostini (Linux on Chrome OS) aims to satisfy the majority of use cases covered by [crouton](https://github.com/dnschneid/crouton), and is a larger & tastier snack than a crouton, hence the name.

## How is Crostini (Linux on Chrome OS) related to Crouton?

[crouton](https://github.com/dnschneid/crouton) helped define many of the use cases that developers wanted with Chrome OS, so it helped guide Linux on Chrome OS from a requirements perspective. We wanted to make sure that the majority of [crouton](https://github.com/dnschneid/crouton) users would be able to use Linux on Chrome OS instead for their needs, but in a secure environment.

So [crouton](https://github.com/dnschneid/crouton) helped inspire the direction of Linux on Chrome OS, but no code has been shared or reused between the two. It‘s not that [crouton](https://github.com/dnschneid/crouton) is bad, it’s simply a completely different model.

## When will my device be supported?

We are not currently publishing any information beyond this document. If your device is not listed in the [Device Support](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#Supported-Now) section of the official Chromium OS docs, then we have not yet made any decisions for that specific device that are ready for the public.

So please do not ask us for device support roadmaps as we don't have them.

## Do I need to enable developer mode?

There is no need to enable developer mode (where you see the scary screen at boot about OS verification being turned off). These features are all designed to run securely while your system is running in normal/verified mode.

For some devices you might have to switch to the [dev channel](https://support.google.com/chromebook/answer/1086915), but that is entirely unrelated to developer mode.

## Am I running Linux on Chrome OS?

If you're using the [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--terminal-app) app or programs in the default container we provide,including our programs to ease integration (e.g. [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/)), then yes.

If you're running your own container or [VM](https://en.wikipedia.org/wiki/Virtual_machine), then no.

## Why run VMs? Aren't containers secure?

While containers often isolate themselves (via Linux [namespaces](http://man7.org/linux/man-pages/man7/namespaces.7.html)), they do not isolate the kernel or similar system resources. That means it only takes a single bug in the kernel to fully exploit the system and steal your data.

That isn't good enough for Chrome OS, hence we put everything inside a [VM](https://en.wikipedia.org/wiki/Virtual_machine). Now you have to exploit [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/) via its limited interactions with the guest, and [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/) itself is heavily sandboxed.

For more details, see the [Security](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) section of the official Chromium OS docs.

## How do I share files between Chrome OS & the container?

The default Linux on Chrome OS container's storage is accessible under “Linux Files” in the Chrome OS Files app. Using [Secure Shell](https://chrome.google.com/webstore/detail/pnhechapfaindjhompbnflcldabbghjo), you can set up a SFTP mount to the other remote containers and then browse via the Files app as well.

## Can I access files when the container isn't running?

Currently, the container must be running in order to access its content. The default Linux on Chrome OS container will be started automatically when “Linux Files” is accessed from the Files app.

## Can I install custom kernel modules?

Currently, no, [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) does not include module support. That means trying to use software that requires building or loading custom kernel modules (e.g. VirtualBox) will not work. See the next question too.

## Can I run a VM inside the VM?

Currently, no, nested [KVM](https://www.linux-kvm.org/) is not supported. You could run qemu-system to emulate the hardware and boot whatever OS you want inside of that. Unfortunately, it‘ll be quite slow as [QEMU](https://www.qemu.org/) won’t be able to utilize [KVM](https://www.linux-kvm.org/) for hardware acceleration.

## Can I run a Docker container or other container inside Chrome OS’s Linux container?

Yes! You'll probably need to install the relevant packages first for whatever container format you want to run.

## What architecture works on my system?

Since everything is all machine code execution, it depends on the device you have.

If you don't know what device you have, you can find this out in two different ways:

- In a new tab, navigate to: chrome://settings/help/details and look at the Platform, then match the board name with our public [device list](http://dev.chromium.org/chromium-os/developer-information-for-chrome-os-devices). Look at the “User ABI” field to see what kind of CPU you have.
- Open up [crosh](https://chromium.googlesource.com/chromiumos/platform2/+/master/crosh/) and run `uname -m`. This will print the architecture of your current device.

If you see `x86_64`, you'll be able to run code compiled for Intel/AMD (32-bit/64-bit/x32 should all work).

If you see `arm` (or something similar like `armv7l`) or `aarch64`, you'll be able to run code compiled for ARM/ARM64.

## Can I run other architectures?

There is currently no integrated support for running e.g. ARM code on an Intel system, or vice-versa. You could handle this yourself (e.g. by using qemu-user), but if you're familiar with qemu-user, then you already know that.

## Can I run programs that keep running after logout?

Nope! All [VMs](https://en.wikipedia.org/wiki/Virtual_machine) (and their containers) are tied to your login session. As soon as you log out, all programs are shut down/killed by design.

Since all your data lives in your encrypted home, we wouldn't want that to possibly leak when you log out.

For more details, see the [Security](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) section of the official Chromium OS docs.

## Can I autorun programs when I log in?

Nope! All [VMs](https://en.wikipedia.org/wiki/Virtual_machine) (and their containers) need to be manually relaunched. This helps prevent persistent exploits.

For more details, see the [Security](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) section of the official Chromium OS docs.

## Can I autorun programs when I boot?

Nope! See the previous questions.

## Can I set environment variables for my container?

Sure! There are a few ways to do this.

- [environment.d](https://www.freedesktop.org/software/systemd/man/environment.d.html) lets you set environment variables for your `systemd --user` session, which includes the [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--terminal-app) and all GUI apps. You may need a newer container, [Debian](https://www.debian.org/) 10 “buster”, to use this method.
- If you just want environment variables in your [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--terminal-app), set those in your shell's config file, such as `~/.bashrc` or `~/.zshrc`.

Changes to environment variables only take effect for newly started programs. You may also need to restart programs or the entire container for any changes to take effect.

## Is multiprofile supported?

No, [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--terminal-app) is only supported in the primary profile (\*). Our goal is to have a fully functional and smooth experience for the primary profile, and to not crash or cause problems in secondary profiles. We don't plan on making secondary profiles more featureful.

If you're unfamiliar with [multiprofile](https://support.google.com/chromebook/answer/6088201) support, check out the general [multiprofile documentation](https://support.google.com/chromebook/answer/6088201) for more details.

(\*): The [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--terminal-app) application is disabled in all secondary profiles. People can manually start [VMs](https://en.wikipedia.org/wiki/Virtual_machine) via [crosh](https://chromium.googlesource.com/chromiumos/platform2/+/master/crosh/) and containers therein, but the UI and Files app probably won't work integrate automatically.

## Are child accounts supported?

No, [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--terminal-app) is not supported in [child accounts](https://support.google.com/families/answer/7680868). We don't have plans to make this available to such accounts.

If you're unfamiliar with [child accounts](https://support.google.com/families/answer/7680868), check out the general [child accounts documentation](https://support.google.com/families/answer/7680868) for more details.

## Are my VMs/containers/data synced/backed up?

Ultimately, you're responsible for any data going into the containers. To easily sync data such as a project folder between machines, you can [share a folder in Drive with Linux](/{{locale.code}}/linux/setup#sharing-files-to-linux). Anything you add to that folder will be backed up to Drive and synced between your devices.

## How can I backup a VM?

The simplest approach is to use the new backup functionality built into Chrome OS itself. To do so go to Settings and select “Linux (Beta)" from the left-side nav. Then navigate into “Linux”. You’ll find “Backup & restore”. If you navigate into this menu, you’ll find a “Backup” button that saves a `.tini` file for you.

If you want to back up an individual container, another approach is to use the standard [LXC](https://linuxcontainers.org/lxc/introduction/) commands.

The `vmc export` command can be used to export an entire VM manually. It will dump the qcow2 disk image to the Downloads folder by default. Note that there isn't yet a way to import a VM, so this is only useful for diagnostics or using another system to extract files.

## Can I access the VM/container files directly (e.g. via the Files app)?

Currently, no, there is no way to access the image files used by the [VM](https://en.wikipedia.org/wiki/Virtual_machine). There are no plans to change this.

If you want to back things up, you'll need to do so by hand.

## Why is the time inside the VM/container out of sync?

The clock inside of the [VM](https://en.wikipedia.org/wiki/Virtual_machine) (and by extension, the containers) is automatically kept in sync with Chrome OS's clock. So you do not have to run time keeping services yourself (e.g. ntp). That clock is based off of [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).

Starting with R75, we attempt to sync timezone data into the container via [timedatectl](https://www.freedesktop.org/software/systemd/man/timedatectl.html). If that doesn't work, we fallback with exporting the `TZ` environment variable.

We don‘t currently update the timezone details inside the [VM](https://en.wikipedia.org/wiki/Virtual_machine) itself. We also don’t try to update any other timezone settings as they are non-standard across distros. So the time might appear to be wrong at a glance in those environments, or stale if the `TZ` environment variable is used.

See [https://crbug.com/829934](https://crbug.com/829934) for some extended technical details. It's more complicated than you might think!

## What copy & paste formats are supported?

Currently, only `text/plain` content is supported. We plan on adding more formats soon (e.g. [`image/png`](https://crbug.com/789824) and [`text/rtf`](https://crbug.com/809898)).

You can see the current supported list in [exo/data_source.cc](https://chromium.googlesource.com/chromium/src/+/master/components/exo/data_source.cc).

While [X](https://en.wikipedia.org/wiki/X_Window_System)/[Wayland](https://wayland.freedesktop.org/) support an arbitrary number of [MIME](https://en.wikipedia.org/wiki/MIME) formats, our ultimate goal is to only support all the formats that Chrome itself does. See the [clipboard_constants.cc](https://chromium.googlesource.com/chromium/src/+/master/ui/base/clipboard/clipboard_constants.cc) file for that list.

Note that we're only talking about constraints on data stored in the clipboard. [Wayland](https://wayland.freedesktop.org/) apps are still free to transfer data directly between themselves in whatever arbitrary format they like.

## Can I read/write the clipboard automatically from inside the VM?

Currently, no.

From a security point of view, we don‘t want untrusted code silently or automatically extracting whatever the user has copied. Perhaps your browser session is copying personal data or passwords. It’s the same problem that the [web platform](https://developers.google.com/web/updates/2018/03/clipboardapi#security_and_permissions) runs into.

This is not the same thing as users manually pasting data (e.g. [[Ctrl]]+[[V]]). This is only about programmatic reading.

We don't expect it to stay this way forever. Once we have a permission model and UI to manage these things, we can look into allowing users to grant this permission.

If you use `xclip` or [X](https://en.wikipedia.org/wiki/X_Window_System) tools, they often have a local buffer (in [XWayland](https://wayland.freedesktop.org/xserver.html)), but it won't automatically sync with the rest of the system.

## Do I have to manage VM updates?

Nope! The [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) [VM](https://en.wikipedia.org/wiki/Virtual_machine) is a [component](https://chromium.googlesource.com/chromium/src/+/lkgr/components/component_updater/README.md) that is updated automatically.

Keep in mind that the [VM](https://en.wikipedia.org/wiki/Virtual_machine) is separate from the container.

## How do I check the Termina version?

Since [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) is a downloaded component, you can visit chrome://components in a new tab and look for `cros-termina`.

You can also connect to a [VM](https://en.wikipedia.org/wiki/Virtual_machine) via [vsh](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/vsh/) and run `cat /etc/lsb-release`.

## Do I have to manage container updates?

The Google provided packages in the container that communicate with Chrome OS or are required for Chrome OS integration will be automatically updated on a regular basis. This will install any necessary dependencies automatically.

There is no automatic upgrading of other installed packages in the container. We‘d rather avoid updating packages that might break programs already installed. The container is like any other Linux distro out there, so you’ll need to update it from time to time if you want newer software.

You can run `sudo apt-get update && sudo apt-get dist-upgrade`.

## Can I use IPv6?

Yes, starting with R81\. Both dual-stack and IPv6-only networks are supported.

Chrome OS only supports SLAAC; read more in the support page for [IPv6 support on Chrome OS](https://support.google.com/chrome/a/answer/9211990).

## Can I access layer 2 networking?

Currently, no, networking access is only at layer 3 (i.e. IP). So you won't be able to do any bridging or lower level fun stuff.

It‘s not clear if/when this will change. Bridging with the outside world is difficult with WiFi, and not many devices have Ethernet connections. We could support layer 2 between containers, but it’s not clear how many people want this in order to justify the effort involved.

## Do VPNs set up by CrOS/Android (outside of the VM/containers) work?

Currently, no. You can star [https://crbug.com/834585](https://crbug.com/834585) for updates.

## Is audio output supported?

Yes, starting with R74 ([Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) version 11707.0.0+).

If you set up your container before audio support was deployed, it might not be configured correctly (as the default before was to output to the null device). You can try these steps to recover:

```shell
# Make sure the new cros-pulse-config package is installed.
$ sudo apt-get update
$ sudo apt-get dist-upgrade

# Clear out existing pulse settings.
$ rm -rf ~/.config/pulse

# Turn it off & on again via crosh ([Ctrl]+[[Alt]]+[[T]]).
crosh> vmc stop termina
```

## Is audio capture (e.g. microphone) supported?

This is now supported in the Chrome OS M84 release. To enable audio capture go to Settings and select “Linux (Beta)" from the left-side nav. Then navigate into “Linux”. You’ll find “Allow Linux to access your microphone" as an option in that menu.

## Can I access hardware (e.g. USB/Bluetooth/serial)?

Chrome OS now allows you to share certain devices through USB. To enable USB access, go to Settings and select “Linux (Beta)" from the left-side nav. Then navigate into “Linux” and then into “USB preferences”. Here you can enable USB access on a case-by-case basis.

This is an area of active development for the team, and more devices will be supported over time.

## Can I run Wayland programs?

Yes, and in fact, these are preferred! Chrome itself deals with [Wayland](https://wayland.freedesktop.org/) clients heavily, and so you're much more likely to have things “just work” if you upgrade.

[Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) provides this support seamlessly.

## Can I run X programs?

Yes, although you might run into some compatibility kinks, and it probably will never be as perfect as running a traditional [X](https://en.wikipedia.org/wiki/X_Window_System) server. However, with the wider community moving to [Wayland](https://wayland.freedesktop.org/), it should be good enough.

[Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) takes care of launching [XWayland](https://wayland.freedesktop.org/xserver.html), acting as the [WM](https://en.wikipedia.org/wiki/X_window_manager), and otherwise translating [X](https://en.wikipedia.org/wiki/X_Window_System) and [Wayland](https://wayland.freedesktop.org/) requests between Chrome and the [X](https://en.wikipedia.org/wiki/X_Window_System) programs.

## Why are windows sometimes tiny/fuzzy?

Linux apps that are visible in the launcher shelf should have an option to use either high or low density. If you find that the resolution isn't working as desired, right-click on the icon to reveal the ability to toggle between high and low density.

While Chrome supports [high DPI](https://en.wikipedia.org/wiki/HiDPI) displays, many Linux applications don‘t. When a program doesn’t properly support [DPI](https://en.wikipedia.org/wiki/Dots_per_inch#Computer_monitor_DPI_standards) scaling, poor results follow.

Currently we expose the built-in resolution and [DPI](https://en.wikipedia.org/wiki/Dots_per_inch#Computer_monitor_DPI_standards) directly to applications. If they show up tiny or fuzzy, it‘s because they don’t support scaling properly. You should report these issues to the respective upstream projects so that, hopefully someday, it'll “just work”.

In the meantime, [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) exposes some runtime settings so you can set the scale factor on a per-program basis to work around the misbehavior. Check out [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/)'s documentation for more details.

If you're applying a system-wide zoom or otherwise changing the default display resolution, we attempt to scale the application output to match. This can lead to blurry results. You can adjust the resolution of your display, or tweak things via [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) (see above for more details). Linux apps that are visible in the launcher shelf should have an option to use either high or low density. If you find that the resolution isn't working as desired, right-click on the icon to reveal the ability to toggle between high and low density.

## Will synergy work?

[Synergy](https://symless.com/synergy) will not work (as a client or server). It requires capturing and spoofing inputs (e.g. mouse/keyboard) for all windows. Since we‘re built on top of [Wayland](https://wayland.freedesktop.org/), by design, one client cannot get access to any other client on the system. This is a strong security boundary between clients as we don’t want arbitrary code running inside of a container being able to break out and attack other clients (like the browser) and sending arbitrary keystrokes.

There are no plans to ever enable this kind of control from the container. This isn‘t to say a synergy-like solution will never happen in Chrome OS (e.g. something like [CRD](https://support.google.com/chrome/answer/1649523)), just that the solution won’t be synergy or any other tool in a container.

You can run synergy, and probably get it to convey input events for the single window that it‘s running under, but that’s as close as you'll get.

## Can I run Windows programs?

Sure, give [WINE](https://www.winehq.org/) a try. Compatibility will largely depend on [WINE](https://www.winehq.org/) though, so please don't ask us for support.

## Can I run macOS programs?

Probably not. You could try various existing Linux solutions, but chances are good that they are even rougher around the edges.

## Why implement crosvm from scratch (instead of using QEMU/kvmtool/etc...)?

We have nothing against any of these other projects. In fact, they're all pretty great, and their designs influenced ours. Most significantly, they did more than we needed and did not have as good a security model as we were able to attain by writing our own. While [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/) cannot do everything those other projects can, it does only what we need it to.

For more details, check out the [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/) project.

## Don't VMs slow everything down?

It is certainly true that [VMs](https://en.wikipedia.org/wiki/Virtual_machine) add overhead when compared to running in only a container or directly in the system. However, in our tests, the overhead is negligible to the user experience, and well worth the strong gains in system security.

For more details, see the [Security](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) section of the official Chromium OS docs.

## Why run containers inside the VM? Why not run programs directly in the VM?

In order to keep [VM](https://en.wikipedia.org/wiki/Virtual_machine) startup times low, we need [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) to be as slim as possible. That means cutting out programs/files we don't need or are about.

We use [dm-verity](https://gitlab.com/cryptsetup/cryptsetup/wikis/DMVerity) which requires the [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) image be read-only for [Security](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security), but it also means we can safely share it between [VM](https://en.wikipedia.org/wiki/Virtual_machine) instances.

Further, the versions of programs/libraries we ship are frequently newer than other distros (since we build off of [Gentoo](https://gentoo.org/)), and are compiled with extra security flags.

Allowing user modifications to the [VM](https://en.wikipedia.org/wiki/Virtual_machine) prevents a stateless image that always works and is otherwise immune from user mistakes and bugs in programs.

Altogether, it's difficult to support running arbitrary programs, and would result in a system lacking many desired properties outlined above. Forcing everything into a container produces a more robust solution, and allows users to freely experiment without worry.

Also, [we love turtles](https://en.wikipedia.org/wiki/Turtles_all_the_way_down).

## Is Foreshadow (a.k.a. L1TF / CVE-2018-3646) handled?

Yes. For more details, see our [public documentation](https://dev.chromium.org/chromium-os/containers-update).

## Can I delete containers I no longer want?

Sure, feel free to delete whatever you want. However, there is no UI or commands currently to help with this.

!!! aside.message--note
**Note:** The default Linux on Chrome OS container is named `penguin`.
!!!

## Can I delete VMs I no longer want?

Sure, feel free to delete whatever you want. The `vmc destroy` command can be used to delete them manually.

!!! aside.message--note
**Note:** The default Linux on Chrome OS [vm](https://en.wikipedia.org/wiki/Virtual_machine) is named `termina`.
!!!

## Can I disable these features?

Administrators can control access to containers/[VMs](https://en.wikipedia.org/wiki/Virtual_machine) via the management console, so enterprise/education organizations that want to limit this can.

Initially there is a “Linux (Beta)” option under the standard Chrome OS settings, but the long-term plan is to remove this knob so things work on-demand. At which point, there will be no knob for unmanaged devices.

## Can I boot another OS like Windows, macOS, Linux, \*BSD, etc...?

Currently, no, you can only boot our custom Linux [VM](https://en.wikipedia.org/wiki/Virtual_machine) named [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/). See also the next few questions.

## Can I run my own VM/kernel?

Currently, no, you can only boot [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) which uses our custom Linux kernel and configs. Stay tuned!

## Can I run a different Linux distro?

Of course! The full LXD command line is available, and the included images remote has lots of other distros to choose from. However, we don't test with anything other than the default container that we ship, so things may be broken when running another distro.

## I'm running \<insert distro here\>, how do I get {GUI apps, launcher icons, etc...}?

[Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) and [Garcon](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/garcon/) binaries are bind-mounted into every container, so no need to install or cross-compile. The systemd units and config files from [cros-container-guest-tools](https://chromium.googlesource.com/chromiumos/containers/cros-container-guest-tools/) will start these daemons in a systemd user session. It's also a good idea to run `loginctl enable-linger <user>` to allow these to remain running in the background.

## How many VMs can I run?

You can spawn as many as your system can handle (RAM/CPU-wise). They are all independent of each other.

## How many containers can I run?

You can spawn as many as your system can handle (RAM/CPU-wise). Each [VM](https://en.wikipedia.org/wiki/Virtual_machine) instance can host multiple containers.

## What container formats are supported?

[Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) currently only supports [LXC](https://linuxcontainers.org/lxc/introduction/) directly. We're aware of Kubernetes/Docker/OCI/rkt/etc... and hope to make them all easy to use.

See the previous question for a workaround in the meantime.
