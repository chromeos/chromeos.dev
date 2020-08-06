---
title: Glossary
metadesc: Glossary of terms related to running Linux environments on Chrome OS.
date: 2020-05-01
weight: 12
---

[9s](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/9s/)
: A server for the [9P](http://man.cat-v.org/plan_9/5/intro) file system protocol. There is one instance of 9s for each [VM](#term--vm) and it provides that VM with access to the user's data stored outside the VM. This includes things like the Downloads folder, Google Drive, and removable media. The lifecycle of each 9s instance is managed by [Seneschal](#term--seneschal). Each 9s instance starts with no access to any files. Access to specific paths is granted by sending a message to Seneschal, which makes the requested path available to the specified 9s instance. Requests to share paths can only be triggered by some user action.

[AMD-V](https://en.wikipedia.org/wiki/AMD-V)
: AMD Virtualization, AMD's marketing name for hardware virtualization extensions.

ARC
: App Runtime for Chrome; the old/deprecated method of running Android apps in a Chrome [NaCl](https://developer.chrome.com/native-client) (Native Client) sandbox. Had random compatibility issues.

ARC++
: Android Runtime for Chrome [plus plus]; the current method for booting Android in a container under Chrome OS.

[Cicerone](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/cicerone/)
: A daemon that runs in Chrome OS which handles all communication directly with the [VM](#term--vm) and container once the container starts running. Specifically, it communicates with [Tremplin](#term--tremplin) (which runs inside of the VM, and [Garcon](#term--garcon) (which runs in a container inside the VM).

[Concierge](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/concierge/)
: A daemon that runs in Chrome OS which handles lifecycle management of VMs and containers and uses gRPC over vsock to communicate with [Maitred](#term--maitred).

[crosh](https://chromium.googlesource.com/chromiumos/platform2/+/master/crosh/)
: Chrome OS shell; a restricted developer shell for running a handful of commands.

Crostini / Linux on Chrome OS
: The umbrella term for making Linux application support easy to use and integrate well with Chrome OS. It largely focuses on getting you a [Terminal](#term--terminal-app) with a container with easy access to install whatever developer-focused tools you might want. It's the default first-party experience.

[crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/)
: A custom virtual machine monitor that takes care of managing [KVM](#term--kvm), the guest [VM](#term--vm), and facilitating the low-level ([virtio](http://docs.oasis-open.org/virtio/virtio/v1.0/virtio-v1.0.html)-based) communication.

[FUSE](https://github.com/libfuse/libfuse/)
: Filesystem handling in [userland](#term--userland) which enables a wider variety of formats, remote filesystems, and improves overall security/stability.

[Garcon](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/garcon/)
: A daemon that runs inside a container within the [VM](#term--vm) and provides integration with [Cicerone](#term--cicerone)/Chrome for more convenient/natural behavior. For example, if the container wants to open a URL, Garcon takes care of plumbing that request back out.

[KVM](https://www.linux-kvm.org/)
: Kernel Virtual Machine; the Linux interface for managing virtual machines.

[kvmtool](https://git.kernel.org/pub/scm/linux/kernel/git/will/kvmtool.git/)
: A simple/fast virtualization tool.

[LXC](https://linuxcontainers.org/lxc/introduction/)
: Linux container solution.

[Maitred](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/maitred/)
: The init and service/container manager inside of the [VM](#term--vm), which is responsible for communicating with [Concierge](#term--concierge) (which runs outside of the VM). Concierge sends it requests and Maitred is responsible for carrying those out.

[QEMU](https://www.qemu.org/)
: A large/complete virtual machine emulator.

[Seneschal](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/seneschal/)
: A daemon that runs in Chrome OS that handles lifecycle management of [9P](http://man.cat-v.org/plan_9/5/intro) servers. When [Concierge](#term--concierge) starts a [VM](#term--vm), it sends a message to Seneschal to also start a [9s](#term--9s) instance for that VM. Then, while configuring the VM, Concierge sends a message to [Maitred](#term--maitred) instructing it to connect to the 9s instance and mount it inside the VM.

[Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/)
: A [Wayland](#term--wayland) proxy compositor that runs inside the container. Sommelier provides seamless forwarding of contents, input events, clipboard data, etc…, between Wayland applications inside the container and Chrome. Chrome does not run an [X](#term--x) server or otherwise support the X protocol; thus Sommelier is also responsible for starting up [XWayland](#term--xwayland) (in rootless mode), acting as the X window manager to the clients, and translating the X protocol inside the container into the Wayland protocol for Chrome.

[SVM](https://en.wikipedia.org/wiki/AMD-V)
: Secure Virtual Machine, AMD's short name for [AMD-V](#term--amd-v).

[Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/)
: A [VM](#term--vm) image with a stripped-down Chrome OS Linux kernel and [userland](#term--userland) tools. Its only goal is to boot up as quickly as possible and start running containers. Many of the programs/tools are custom here. In hindsight, we might not have named it one letter off from “Terminal”, but so it goes.

Terminal App
: The first entry point into the Linux on Chrome OS. It takes care of kicking off everything else in the system that you’ll interact with. The default container launched via Terminal is [Debian](https://www.debian.org/) with custom packages, by default named `penguin`. See [cros-container-guest-tools](https://chromium.googlesource.com/chromiumos/containers/cros-container-guest-tools/) for more details.

[Tremplin](https://chromium.googlesource.com/chromiumos/platform/tremplin/+/master/)
: A daemon that runs in the [VM](#term--vm) to provide a gRPC wrapper for LXD. This includes basic functionality such as creating and starting containers, but also provides other Linux on Chrome OS-specific integration such as setting up a container's primary user, and setting up apt repositories in the guest to match the Chrome OS milestone.

[userland](https://en.wikipedia.org/wiki/User_space)
: Everything not running inside of the kernel. Also known as user space.

[VM](https://en.wikipedia.org/wiki/Virtual_machine)
: Virtual Machine; a way to boot a different operating system in a strongly isolated environment.

[vmc](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/concierge/)
: [crosh](#term--crosh) command to manually manage custom [VM](#term--vm) instances via [Concierge](#term--concierge).

[VMX](https://en.wikipedia.org/wiki/Intel%20VT-x)
: Virtual Machine Extensions; Intel's short name for [VT-x](#term--vt-x).

[vsh](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/vsh/)
: Shell that runs inside the [VM](#term--vm) (not inside of the container).

[VT-x](https://en.wikipedia.org/wiki/Intel%20VT-x)
: Virtualization Extensions; Intel's marketing name for hardware virtualization extensions.

[Wayland](https://wayland.freedesktop.org/)
: The new graphics stack in the Linux world.

[WM](https://en.wikipedia.org/wiki/X_window_manager)
: Window Manager; program responsible for managing windows that other programs create. e.g. window borders, maximizing/minimizing, etc...

[X](https://en.wikipedia.org/wiki/X_Window_System)
: Umbrella term for the large classical project tasked with making graphics and inputs work in UNIX environments. May refer to the server, client, protocol, [WM](#term--wm), or many other facets depending on context. a.k.a. X11, X<span>.</span>Org, and XFree86.

[XWayland](https://wayland.freedesktop.org/xserver.html)
: An [X](#term--x) server that outputs to [Wayland](#term--wayland).
