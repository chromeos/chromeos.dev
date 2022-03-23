---
title: Making Android Runtime on Chrome OS more secure and easier to upgrade with ARCVM
metadesc: From creating games that instantly adapt to different devices to making styluses feel just like drawing on paper, here’s a wrap-up of the latest improvements in Chrome OS for 2021.
tags:
  - base os
  - android
  - technical
authors:
  - hikalium
  - suleiman
  - sxm
date: 2022-03-29
---

Chromebooks can run Android apps, but do you know how this is achieved? We recently made a huge update to the architecture of Android Runtime on Chrome OS (ARC). This change not only allowed us to upgrade Android from P to R, but it also improved Chrome OS, too!

## What is ARC?

Enabling Android on Chrome OS was a long and complicated project, but doing so was necessary to unlock more apps for users.

Since ARC's first launch in 2014, there have been several versions of ARC with each having its own tradeoffs.

The first version of ARC used [NaCl](https://developer.chrome.com/docs/native-client/) to sandbox the Android environment and run applications safely on Chrome OS. However, because it required recompiling, only a limited number of apps chosen by Google were available.

The second version, called ARC++, was [introduced in 2016](https://events.static.linuxfound.org/sites/events/files/slides/ContainersPresoLCE.pdf). It used Linux kernel features [cgroups](https://en.wikipedia.org/wiki/Cgroups) and [namespaces](https://en.wikipedia.org/wiki/Linux_namespaces) to make containers that ran Android apps in an isolated environment. It was initially launched with Android 6.0 Marshmallow. Over time, it was updated, first to Android 7.0 Nougat in 2017, and then Android 9 Pie in 2018. Since Android apps could now run without recompiling in ARC++, the Google Play Store became available, expanding what users can do on their Chromebooks.

The latest version of ARC, ARCVM, launched in 2021 with Android 11 and is currently rolling out to devices. As you may guess from the name, it uses virtual machines (VM) to enhance the isolation of the Android environment in order to improve security and maintainability.

## What is ARCVM?

ARCVM is the evolution of our previous Android offering on Chrome OS, ARC++. There are many reasons why we decided to evolve to use VMs, but the two largest reasons are security and upgradeability.

#[ARCVM adds a new layer of protection by leveraging VMs (crosvm and KVM) to separate the Android environment completely into an isolated virtual machine. This also enables us to use a separate kernel for the guest environment.](ix://posts/making-android-more-secure-with-arcvm/ARCPP_TO_ARCVM.svg)

ARCVM is a special VM appliance that has a tight integration with the host so that the user experience is transparent, allowing all apps running within it to look and behave as if they are native applications. To achieve this seamless consolidation, we are deeply involved in multiple layers from top to bottom: the guest (Android) framework, the host operating system (Chrome OS), the virtual machine monitor (VMM, crosvm), and the host and the guest kernels.

## Security in ARCVM

Chrome OS has [four core principles](https://www.chromium.org/developers/core-principles/): Speed, Security, Stability, and Simplicity.

Among these principles, Security is an essential pillar that we in Chrome OS consider a necessity, not a luxury. This is where VMs become valuable. While containers (cgroups) provide some level of security, after careful evaluation, we decided that containers do not meet our strict security standards. In particular, as Android is capable of running untrusted third-party code, encapsulating the executables in a VM boundary is a necessary evolution to guarantee [the security promises](https://www.youtube.com/watch?v=A9WVmNfgjtQ) we have been providing so far.

Also, we are pushing forward the usage of Rust programming language not only in crosvm but also other services in ChromeOS to improve reliability while keeping performance.

### Simplicity means upgradability

ARCVM decouples the Android environment naturally with a VM boundary. Doing so relaxes the entanglement between ChromeOS and Android. Let’s look at the ARCVM kernel as an example.

The ARCVM kernel is a unified guest kernel (for each architecture, in our case, x86_64 and aarch64) which is provided as part of the ARCVM package. This is a customized Linux kernel based off of the Android Common Kernel (ACK) with integration patches to work in harmony with the host operating system (in this case, ChromeOS), such as Virtio support for Wayland.

With the container-based offering, we made Android work in conjunction with the host kernel, which may or may not be the same kernel version that the Android version we are shipping supports. This made the maintenance and quality guarantees of the kernel incredibly frustrating and required us to rebase a set of patches for each Chrome OS target that used a different host kernel version. It was also very difficult to scale to a wide range of devices and turned into a common source of bugs that required a large amount of effort to backport. Because of this, we had to be very conservative about upgrading Android, as the amount of effort required to upgrade each host kernel version required a superhuman effort.

Now, we have control over the host, hypervisor, and guest kernel. This allows us to further optimize the behavior and performance of ARCVM, as the host and guest work in harmony to enable optimal performance characteristics and user experience for even the lowest-powered of devices.

## Future work

Using KVM-based VMs on battery-powered devices like Chromebook is not common and still has some unexplored areas that we can improve.

For example, memory usage optimization is critical since our devices have far less RAM than traditional KVM deployments on massive servers. Applying [multi-generational LRU](https://www.phoronix.com/scan.php?page=news_item&px=Linux-Multigen-LRU) (MGLRU) was a huge win for our memory usage, so we are working on [upstreaming the changes into the Linux Kernel](https://www.phoronix.com/scan.php?page=news_item&px=Linux-MGLRU-v6-Linux).

Additionally, we have an experimental project called [ManaTEE](https://www.youtube.com/watch?v=BD_lcnkNAk4&t=508s) which pushes VM usage forward and provides software-based Trusted Execution Environments (TEEs) without dedicated TEE hardware. This opens up an opportunity for us to store data which should not be exposed even to the host OS, such as biometrics and encryption keys.

If you’re interested in helping us continue to improve the user experience on Chromebooks, [please join the effort](https://careers.google.com/jobs/results/?distance=50&hl=en_US&jlo=en_US&q=chrome%20os)!
