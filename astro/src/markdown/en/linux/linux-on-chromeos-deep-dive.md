---
title: Internals deep dive
metadesc: Low-level technical documentation on running custom Linux containers on Chrome OS, including runtime features, security, their lifecycles, and device support.
date: 2020-05-01
---

!!! aside.message--warning
This is an advanced process that we don’t recommend for new Linux users.
!!!

Chrome OS supports running arbitrary code inside of [VMs](https://en.wikipedia.org/wiki/Virtual_machine). This is the low-level documentation on that support; for a more user-friendly view, see the [faq](/{{locale.code}}/linux/linux-on-chromeos-faq)

## Prerequisites

- Ensure that your Chrome OS device [supports Linux on Chrome OS](https://sites.google.com/a/chromium.org/dev/chromium-os/chrome-os-systems-supporting-linux)
- Make sure you're running Chrome OS release 72 (M72+) or greater (released February 2019).
  - Start a [system update](https://support.google.com/chromebook/answer/177889) if need be and reboot.
  - This should work in the [stable channel](https://support.google.com/chromebook/answer/1086915).
  - You do **not** need to put it into developer mode.
- [Enable the Linux container](/{{locale.code}}/linux/setup)

## Runtime features

You should expect the following features to work when running your Linux container:

- Outbound network connections (IPv4).
- Unaccelerated graphics.
- Accelerated graphics (via OpenGL).
- [Wayland](https://wayland.freedesktop.org/) programs (preferred; via [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/)).
- [X](https://en.wikipedia.org/wiki/X_Window_System) programs (compatibility via [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) and [XWayland](https://wayland.freedesktop.org/xserver.html)).
- Audio output in M74+ and experimental [capture/microphone](https://crbug.com/932268) in R79+ images.

### Missing features

There‘s a lot of low-hanging fruit we’re working on fleshing out. A couple of clear examples are:

- Video hardware decoding.
- [IMEs](https://crbug.com/826614).

While there are more things being considered, the Chrome OS team takes a measured approach to rolling out new features in order to ensure overall system security isn't compromised. See the [Crostini FAQ]({{page.url}}../linux-on-chromeos-faq) for more detailed information that cover most topics around Linux on Chrome OS development.

## Security

While running arbitrary code is normally a security risk, the Chrome OS team believes the runtime model employed by Linux on Chrome OS container sufficiently mitigates and contains that security risk. The [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine) (VM) is the security boundary, and everything inside of it is considered untrusted. The current VM guest image is also running a custom-hardened kernel to further improve the security of the containers, but that is considered a nice feature to have rather than it being relied on to ensure overall system security.

In this model, the rest of the Chrome OS system should remain protected from arbitrary code (malicious or accidental) that runs inside of the containers inside of the VM.

The only contact with the outside world is via [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/), and each channel talks to individual processes (each of which are heavily sandboxed).

### User data in the container

With the shift to cloud services, current security thinking highlights the fact that getting account credentials (e.g. [your Google/Facebook passwords](https://xkcd.com/1200/)) is a more lucrative attack vector than attacking your desktop or laptop. They are not wrong. The current VM/container Chrome OS solution does not currently improve on this. Put plainly, anything entered into the container is the responsibility of the user currently. So, if you run an insecure or compromised container, and then type your passwords into the container, they can be stolen even while the rest of the Chrome OS system remains secure.

### Process persistence

Processes in VMs and containers do not survive logout (since they live in the user‘s encrypted storage) and are killed automatically. They also do not automatically start at login (to avoid persistent attacks), nor can they automatically run at boot (without a login session) since they wouldn’t be accessible (as they‘re in the user’s encrypted storage).

### Executable and writable code

The [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) VM disk image is downloaded to the writable stateful partition like other [Chrome components](https://chromium.googlesource.com/chromium/src/+/lkgr/components/component_updater/README.md). In order to make sure the contents aren't modified, [dm-verity](https://gitlab.com/cryptsetup/cryptsetup/wikis/DMVerity) is used. This also means only images signed by Google may be loaded, and the image is always read-only.

### Hardware attacks

The Meltdown/Spectre vulnerabilities have implications for safely using VMs. We‘ve applied fixes and mitigations to make sure VMs can’t attack the host system or other VMs. See the Chromium OS wiki page on the [Meltdown and Spectre vulnerability status for Chrome OS devices](http://dev.chromium.org/chromium-os/meltdown-spectre-vulnerability-status) for more details.

## Lifecycles

Once you've [enabled the Linux container](/{{locale.code}}/linux/setup) (which takes care of installing all the other necessary components like Termina), the system is ready to use.

While these components may be installed, nothing starts running right away. When you log out, everything is shut down and killed, and when you log in, nothing is automatically restarted.

When you run the Terminal app, or any other Linux app that starts the container, and its parent container isn't running yet, the Termina VM will be started automatically, and the default Linux on Chrome OS container (also known as Crostini) will be started in that. This allows you to connect to the container via SSH or SFTP (via the Files app).

When you close all visible applications, the VM/containers are not shut down. If you want to, you can manually [stop and start them](/{{locale.code}}/linux/setup#restarting-the-linux-container), as well as spawn more containers than just the default one.

### Data persistence

All of the VMs and containers created, and the data within those containers, will persist across user sessions (logout/login). They are kept in the same per-user encrypted storage as the rest of the browser's data.

If a VM or container is stopped or killed ungracefully (e.g. powerloss), then data might be lost and need recovery like anything else in the system.

## Device support

While the desire is to have Linux on Chrome OS work with all Chromebooks, the required kernel and hardware features limit where it can be deployed. The team has focused on system security and stability while backporting features where it makes sense. This is an area of ongoing effort.

### Supported now

For a list of devices that are currently supported, please refer to [Chrome OS systems supporting Linux](https://sites.google.com/a/chromium.org/dev/chromium-os/chrome-os-systems-supporting-linux).

### Hardware requirements

While there is not currently a minimum amount of RAM, storage, or CPU speed required to run the Linux on Chrome OS container, the more you have of each, the better the system will perform.

That said, you will need a CPU that supports [hardware virtualization](https://en.wikipedia.org/wiki/Hardware_virtualization). On x86 platforms, this has [many names](https://en.wikipedia.org/wiki/X86_virtualization). Intel refers to it as [VT-x](https://en.wikipedia.org/wiki/Intel%20VT-x) and [VMX](https://en.wikipedia.org/wiki/Intel%20VT-x). AMD refers to it [AMD-V](https://en.wikipedia.org/wiki/AMD-V) & [SVM](https://en.wikipedia.org/wiki/AMD-V).

#### BayTrail systems

Chromebooks using Intel’s BayTrail do not include VT-x. While this CPU normally includes VMX, the variant in Chromebooks does not, and therefore, unfortunately, will never be supported.

You can look up if a board is supported by searching our public [device list](http://dev.chromium.org/chromium-os/developer-information-for-chrome-os-devices) for `BayTrail` under the `Platform` column.

### Old kernels

**There are no plans to support Linux 3.14 or older.** These require backports of new features that are extensive and often invasive. For example:

- [vsock](https://crbug.com/763970)
- [aarch64 kvm](https://crbug.com/846515)
- [Foreshadow/L1TF](https://crbug.com/875512)

You can look up if a board is supported by searching our public [device list](http://dev.chromium.org/chromium-os/developer-information-for-chrome-os-devices) for version numbers less than 3.14 under the `Kernel` column.

### 32-bit ARM CPUs

Getting virtual machines working under 32-bit ARM CPUs is difficult, non-standard, and requires coordination with the firmware. Unfortunately, Chrome OS firmware has tended to not configure the extensions. As such, these systems are not supported.

You can look up if a board is supported by searching our public [device list](http://dev.chromium.org/chromium-os/developer-information-for-chrome-os-devices) for `arm` under the `Kernel ABI` column.
