---
title: 'Extending rootfs space on ChromeOS using DLC'
metadesc: 'Use DLCs to distribute features and content to ChromeOS users without compromising system partition space.'
tags:
  - foundations
  - technical

authors:
  - tbanerjee
  - jaehoonkim
date: 2023-11-16
---

The root file system (rootfs) is the most basic component of ChromeOS, containing the files and directories critical for system operation—such as the device directory and programs for booting the OS. However, ChromeOS's root file system can fill up quickly as new features and capabilities are added. As a result, rootfs performance can degrade over time. If new features and capabilities are added unchecked, rootfs will eventually be unable to boot the OS.

!!!aside.message--note
**Note:** To learn more about rootfs and how it's used by ChromeOS, see [Visualizing the Rootfs](https://www.chromium.org/chromium-os/how-tos-and-troubleshooting/visualizing-the-rootfs/).
!!!

Google introduced ChromeOS Downloadable Content (DLC) to solve this problem, allowing verified system applications and assets to expand into a stateful partition on-demand. Using DLCs, you can distribute new OS-level features and content to ChromeOS users without having to compromise on system partition space or security—specifically the rootfs storage space.

# What is DLC?

Whether a package is a few megabytes or gigabytes, the space allocated for rootfs remains static. The DLC infrastructure of ChromeOS lets you package features (e.g. a [portage ebuild](https://chromium.googlesource.com/chromiumos/docs/+/HEAD/portage/ebuild_faq.md)) and provides a way to download the package at runtime. You can trigger the download of DLC when the user toggles a feature on—or the system can trigger the download on the user's behalf.

Through DLC, developers can better manage OS space utilization. If you're a Chromium OS developer or developing for ChromeOS, DLC offers the potential to package a new feature that originally wouldn't have fit into rootfs due to space constraints. Features that couldn't fit in rootfs can be distributed as DLCs to everyone, without requiring a destructive migration to a larger rootfs. Further, DLCs can be added or removed based on feature usage.

!!!aside.message--note
**Note:** Steam on ChromeOS is [distributed as DLC](https://chromeos.dev/en/posts/bringing-steam-to-chromeos)—it is only installed if the user chooses to install Steam. Once the user installs it, the DLC automatically keeps the Steam installation updated with every subsequent ChromeOS release.
!!!

DLC is recommended for features not needed to boot the device; optional features irrespective of size. If the feature takes up a significant amount of space, it's an even more ideal candidate for DLC. On the other hand, critical features of ChromeOS, such as those required to boot the system or reach the login screen, should remain in rootfs or use DLCs more carefully. rootfs is the core of the operating system and is essential for the system to function properly. If any critical features are moved to DLC, there is a risk that they could be corrupted or deleted—which could prevent the system from starting up or working correctly with the utmost resilience due to networking dependency.

As ChromeOS has continued to integrate artificial intelligence and machine learning (AI/ML) infused capabilities, DLC has become the go-to method to deliver the very large libraries and models necessary for these features to users. Additionally, because AI/ML models are constantly being updated, delivering them as DLC ensures users can always have the latest and greatest features.

Below you will see a illustration of the 3rd version of the ChromeOS disk layout:

![Diagram of the current ChromeOS disk layout on version 3, from the first sector of the disk at the top to the last sector of the disk at the bottom.](ix://posts/rootfs/inline-1.png)

# How DLC works

A DLC installation request and response moves between ChromeOS Services and the dlcservice daemon, then a DLC payload and image fetch moves between the dlcservice daemon and Google Services.

The primary components of the DLC installation workflow are:

- **ChromeOS:** The ChromeOS platform, specifically the [`dlcservice` daemon](https://chromium.googlesource.com/chromiumos/platform2/+/HEAD/dlcservice/README.md) and [`imageloader.cc`](https://chromium.googlesource.com/chromiumos/platform/imageloader/+/refs/heads/factory-eve-9667.B/imageloader.cc).
- **ChromeOS services:** Where [ChromeOS Build and Release Console](https://chromiumdash.appspot.com/serving-builds?deviceCategory=ChromeOS) resides, handling and responding to installation requests.
- **Google Services:** Where the actual image fetching happens. Google Services provides the self-service download server that lets ChromeOS developers host downloads for end users. For stability and performance, the dlcserver daemon retrieves the payload from Google servers by querying the edge caching server(s) or BandAids (BDNs).

![Diagram of DLC installation flow between ChromeOS services, Google Services, and ChromeOS.](ix://posts/rootfs/inline-2.png)

Daemons involved in DLC installation are the following:

- [`update engine`](https://chromium.googlesource.com/aosp/platform/system/update_engine/+/HEAD/README.md#Update-Engine-Daemon) is responsible for updating the entire ChromeOS system, installing DLCs, etc.

- [`dlcservice`](https://chromium.googlesource.com/chromiumos/platform2/+/HEAD/dlcservice/README.md) is responsible for managing the lifetime of DLCs, allocating space in stateful, and communicating with other system daemons.

- [`imageloader.cc`](https://chromium.googlesource.com/chromiumos/platform/imageloader/+/refs/heads/factory-eve-9667.B/imageloader.cc) enables mounting of device images securely using [`dm-verity`](https://docs.kernel.org/admin-guide/device-mapper/verity.html).

!!!aside.message--note
**Note:** See the [Chromium DLC Developer Guide](https://chromium.googlesource.com/chromiumos/platform2/+/HEAD/dlcservice/docs/developer.md) for more information on how to build, enable, install, uninstall, and test DLCs.
!!!

When first introduced, DLC worked via ingesting and serving through server matching, with a permutation of DLCs mapped to boards. This iteration of DLC, known as Legacy DLC, did not scale well and was tied to OS releases. To address these issues, ChromeOS 109 introduced Scaled DLCs. Using Scaled DLC is almost always preferable to Legacy DLC. Scaled DLCs include a number of important optimizations:

- **Compressed archives:** During the DLC process, we now fetch compressed archive images instead of payloads.
- **Early installations:** Install DLC as soon as a ChromeOS version is built and uploaded into the server. This improves the overall development cycle because we no longer have to wait to install DLC until after an Omaha push happens.
- **Parallel installations:** The installation of DLCs occur in parallel.

# DLC, Powerwashing, and the LVM

There are other notable platform and software considerations with DLC, such as managing the interactions between DLC and Powerwash.

Powerwash erases all user data and settings, restoring the device to a state similar to its original factory state. But some DLC may be critical for users to retain even when Powerwashing their device, such as factory-installed DLC. Further, Powerwashing is limited by the size of the RAM on a ChromeOS device—because it needs to store temporary data that shouldn't be Powerwashed into memory while wiping the disk.

Because DLC can be very large, it's not practical to load it into memory during a Powerwash, even if it's critical. So, Chromium needs a fast and flexible solution for storing DLC on disk that can survive a Powerwash. The answer is a Logical Volume Manager.

Logical volume management can be used to create a logical volume/partition for each DLC. On LVM-enabled Chromebooks, the OS creates a LV (logical volume) for each DLC, which both speeds up reads of the DLC, and lets us flag DLC as needing to survive Powerwash. When a Powerwash happens, it reads the metadata from rootfs to determine what DLC needs to survive. After a powerwash, the system runs an integrity check to ensure that the DLC was preserved.

Besides managing DLC during a Powerwash, using an LVM improves performance. Compared to stateful encryption, logical volume is expected to provide:

![Graph showing 4KiB, 8KiB, and 16KiB read speeds between Encrypted Stateful Reads and Logical Volume Reads, with logical volume reads showing improvement.](ix://posts/rootfs/inline-3.png)

%[(13%, Reduction in time with 8KiB random reads), (20%, Reduction in time with 16KiB random reads)]

# Summary

Thanks to DLC, when designing a new feature for ChromeOS, you're no longer limited by rootfs storage. DLC provides the capability to install packages over the air—and those packages do not need to be ChromeOS specific. DLC infrastructure is supported across all ChromeOS board types, including multiple CPU architectures.

Using DLC will not only help keep rootfs growth in check, but will also let you take advantage of the performance improvements and dynamically loading and unloading features offered by DLC.
