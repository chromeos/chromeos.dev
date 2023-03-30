---
title: 'Storage ballooning: a novel solution to layered storage on the Steam VM'
metadesc: 'Storage ballooning lets us address data syncing and allocation issues between ChromeOS and the Steam VM.'
tags:
  - foundations
  - technical
  - games

authors:
  - dng
date: 2023-03-30
---

Late last year, Steam on Chromebooks entered beta, bringing many improvements. One particular improvement is the capability to share storage resources between the host operating system and Steam in a performant and resilient manner.

## Challenges of layered storage

Steam works on Chromebooks by using an Arch-based virtual machine (VM) that we call Borealis. Because it runs in a VM, there are two file systems that need to be considered: the file system on the host device and the file system in the VM.

In the past, we created the VM user data image as a file on the host's [ext4](https://en.wikipedia.org/wiki/Ext4) file system, which was exported into the VM as a [Btrfs](https://en.wikipedia.org/wiki/Btrfs) file system via [`virtio-blk`](https://projectacrn.github.io/latest/developer-guides/hld/virtio-blk.html). This entailed having two—potentially different—views of the underlying device.

The challenge, then, was to ensure that both views were accurate and both clients (host and VM) could access the disk resources that they needed. When we started work on Borealis, we used image files that were sparsely allocated; we would [`truncate`](https://man7.org/linux/man-pages/man2/ftruncate.2.html) the image file, rather than allocating physical space for it.

So, while the VM appeared to have access to a large amount of storage, the underlying storage layer (ie. the host file system) only allocated space once required. Truncating, rather than allocating, meant that the host also had access to this space.

![Diagram showing how a sparse image on the host file system maps to the file system in the guest (VM). The guest file system shows storage used by the guest and the remaining storage space as available. The guest file system is backed by a sparse image file on the host which is sized to be as large as the entire system, but only takes up physical space equal to how much space is being used by the guest. The host file system shows the space used by the guest and the host, and what's available. The guest file system's available storage doesn't take into account the host's space usage.](insert_image_url_here)

Since file systems maintain their own views of available disk space, both the host operating system and the VM may have had differing views on how much space was actually available. If the host were to consume remaining space on the device, the VM would still think that space was available—since its view of the world was based on the truncated image file. If the VM attempted to commit data in this state, it could lead to I/O errors and uncommitted data being lost, which may lead to the disk being corrupted.

## Previous solutions: fixed-size disks and APIs

To avoid these issues, we worked on building a solution based on fixed-size disks—preallocating space for the entire image file.

While this design guaranteed that requests from the VM would always succeed, it was also somewhat inflexible: the VM was limited by the amount of storage space allocated to it. Additionally, the host could not reclaim space from the VM, even if the VM only occupied a fraction of the disk space it had been allocated.

This could be somewhat remedied by giving users the ability to manually resize their VM disk when needed—similar to what Crostini, the ChromeOS Linux VM, does. But it was bad in terms of usability; we'd much rather the user not need to tinker with settings like this.

![Diagram showing space usage by a guest (VM) and a host file system with an allocated image. The guest file system shows the space it uses and what's available, but the total of both is only a fraction of what's available on the host. The host shows the space available, the space it uses, and the total amount of space for the guest, both used and available, as an unavailable block.](insert_image_url_here)

We worked with Valve to design an API that enabled processes in the VM, specifically Steam, to request and resize the VM disk when needed. With this, we were able to dynamically resize the disk, giving it access to the resources it needed when Steam needed more space or freeing unneeded space to keep the disk size minimal. We still restricted the host's access to disk space, but we minimized how much it was restricted by keeping disk size minimal. This solution worked pretty well: we were able to ensure that the VM had an accurate view of storage (avoiding corruption) and mostly use the disk space efficiently.

We learned, however, that this solution was not holistic enough and had some glaring usability issues. Specifically, because it is based on inter-process communication (IPC) between Steam and ChromeOS, we were only able to really fulfill Steam's storage needs. Theoretically, this should be sufficient, provided we also set aside space for the miscellaneous needs of games and other processes. In practice, some games use a lot of space—such as bootstrapping their installer (and resources) asynchronously from Steam—which makes it difficult to signal the implicit intent of requesting more disk space.

## Our new solution: storage ballooning

Inspired by memory ballooning, we've designed a novel solution which is active on Borealis today: _storage ballooning_. Storage ballooning leverages a sparsely allocated image file and a "balloon" file in the VM, which artificially limits the VM's access to storage. We monitor how much space is available on the host and then inflate or deflate the balloon file in the VM, so the VM file utilization accounts for the utilization of the host—ensuring that both clients have an accurate depiction of storage resources.

Storage ballooning lets us leverage the space-sharing efficiency of sparse images while still maintaining correctness between the file systems and mostly avoid overprovisioning.

![Diagram showing space usage by a guest (VM) and a host filesystem with a storage balloon. Here, both the guest and the host show the same amount of space used by the guest, and the same amount of total available space on the file system. The host shows the space it uses, and in the guest, there's a storage balloon taking up the same amount of space as is used by the host. Space used by the guest goes through a sparse image.](insert_image_url_here)

There are edge cases to still be concerned with however. The primary concern is not being able to update the balloon fast enough, causing the VM to be overprovisioned and potentially causing data loss. One way this can happen is if both the host and the VM are writing at the same time. We can avoid this by simply updating the balloon more frequently and adding a bit of buffer space. The more difficult race to avoid is if the host were to suddenly take up space very quickly, such as allocating space with [`fallocate`](https://man7.org/linux/man-pages/man2/fallocate.2.html). We're working on ways to avoid this error case, though it isn't a scenario we'd expect regular users to run into often. In the meantime, we've made sure to utilize ext4's resilience, following best practices and ensuring that we preallocate and protect as much metadata as possible. In this way, we're able to mostly avoid severe data corruption even in exaggerated overprovisioning instances.

---

How we handle VM storage on ChromeOS has come a long way, but there are still improvements we have planned. We'd like to continue exploring the design space at lower levels—such as how we handle errors in our hypervisor and in ext4—to further increase the resilience of the system.

Another avenue we're exploring is how this system can be used for other VMs and potentially in a multi-VM context. For the most part, we've only considered single-VM storage across our ChromeOS features, in which some of our solutions are fine. The challenge with multi-VM environments is that they often make certain storage setups less appropriate. We believe that our novel layered storage solution, storage ballooning, may be the path forward.

Following the implementation of storage ballooning, 0.0004% of feedback reports have been from users mentioning storage/disk issues—and we've had 0 records of serious data corruption recorded so far.
