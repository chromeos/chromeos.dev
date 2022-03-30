---
title: Improving ChromeOS performance with core scheduling
metadesc: ChromeOS takes security seriously and CPU security bugs shouldn't slow you down.
tags:
  - base os
  - technical
authors:
  - jsbarnes
  - joelaf
  - bgeffon
date: 2022-03-29
---

In the age of CPU hardware vulnerabilities that have shaken the personal computing industry, the discovery of [microarchitectural data sampling (MDS) attacks](https://mdsattacks.com/), such as [Rogue In-Flight Data Load (RIDL)](https://mdsattacks.com/files/ridl.pdf), have caused serious security problems for hyperthreading technology. These vulnerabilities allow one hyperthread of a core to observe the memory side effects left by another hyperthread using side-channel attacks. As with many CPU bugs the easiest mitigation is simply disabling the buggy feature; however, when doing so would cause serious performance regressions, it puts users in a difficult position. ChromeOS believes a user should not be forced to choose between performance and security.

## MDS attacks from untrusted Chrome processes

Each Chrome tab runs in a sandboxed process known as a "renderer". The sandboxing design makes use of seccomp-bpf and namespace technologies to dramatically limit any runaway exploit’s attack surface, such as malicious code executed by JavaScript.

However, this sandboxing isolation breaks down due to MDS and related attacks. A cleverly crafted JavaScript program running in one renderer can observe the effects of renderers running on a neighboring hyperthread. Imagine typing a password into one website and having another website observe it!

## Rethinking core sibling isolation

For a long time in the industry, disabling hyperthreading was the only way to defend against these attacks. Even though microcode was released by CPU vendors to address many issues, new variants of the same issue came about for which more microcode updates were needed. Additionally, these microcode updates tended to be incomplete and would not always provide hyperthread protection. This brought things full circle to needing to disable hyperthreading to provide an adequate security boundary. On low end Chromebooks with only 4 CPUs, disabling hyperthreading means only 2 out of 4 logical CPUs would be available for use. That’s a huge issue for performance.

When working on this problem in early 2020, we observed that not everything in the OS needs to have hyperthreading disabled. Only threads that cannot be trusted, like renderers, need such isolation. As a result, other trusted threads, such as the browser process and GPU process, can take full advantage of the performance provided by hyperthreading. As our group strives to work closely with the upstream Linux kernel community, we participated in, and led, the development and upstreaming of core scheduling patches (which had largely stalled at the time). These patches got merged in [kernel v5.14](https://www.google.com/url?q=https://lwn.net/Articles/861251/&sa=D&source=docs&ust=1647891931882016&usg=AOvVaw2sXjKPhUrzdTxYxqDQInkM)!

In our user-driven field trial tests, core scheduling showed big improvements in key press latency and page load times, dramatically improving the user experience.

## Core scheduling in ChromeOS

In order to use core scheduling, userspace has to define groups of tasks that trust each other. The kernel’s scheduler makes sure that only tasks within the same group can share a core’s hyperthreads simultaneously, while doing its best to ensure maximum performance and fairness. This is a balancing act, where tasks on different hyperthreads (and hence different CPU runqueues) have to be scheduled like they were on one hyperthread (one runqueue). In other words, core scheduling makes quick transition back and forth from 2-runqueue-mode to 1-runqueue mode, and selects the highest priority task in the new mode. The exact mode chosen depends on the priorities of the tasks queued on both hyperthreads, and their compatibility with each other.

In ChromeOS there are 3 users of core scheduling:

- Chrome browser: When a renderer is created, Chrome requests the kernel to assign a unique group to the renderer, before entering the restricted sandbox mode. This novel design allows ChromeOS to perform the privileged operation of group assignment during the renderer thread startup, but disables any changes to the group assignment once the sandbox is entered.
- Virtual machines: ChromeOS includes several Virtual Machines (VMs). Using core scheduling, each VM is assigned a unique group that can be shared by all virtual CPU threads in the VM. This protects the host, ChromeOS, from all VMs, the VMs from each other..
- Android containers: Some ChromeOS devices use an Android container. When the container is created, the initial process that starts in the Android container is assigned a unique group. As a result, the Android container and all the processes in it are protected from the host, ChromeOS, and vice versa. Finally, the individual processes in the Android container are protected from each other via a "tag-on-fork" mechanism which guarantees that new processes will be isolated from their parent and siblings.

There is still a concern, although mostly theoretical, that even kernel space should be afforded the same level of isolation even if the user space process is "trusted". This is because any hyperthread can enter the kernel while its sibling hyperthreads are still in userspace. To solve this problem, ChromeOS uses per-CPU counters to track a core-wide kernel state. This state, also called an "unsafe state", is entered when any of the hyperthreads of a core transitions into kernel mode, either via a syscall or IRQ entry point. As long as ChromeOS is in this mode, all of the hyperthreads will be taken out of userspace via Inter-processor interrupts (IPI) unless they are already idle. Our testing has shown that the performance hit due to this mechanism is minimal. The following is a diagram showing an example:

![Diagram showing a Sys Call at HT0, then an IRQ at HT1 starting during HT0's call, then a Sys call at HT3 also starting during HT0's call but ending before HT1, and User-mode at HT4 starting after HT0 starts and ending hafter HT1 ends. Dotted lines are drawn from the top of HT0 and the bottom of HT1 (which ends before user-mode but after the other calls) going across the chart. The area between those two dotted lines is labeled Core-wide unsafe state.](ix://posts/improving-chromeos-performance-with-core-scheduling/core-schduling-perf-hit.png)

---

At ChromeOS, we work closely with the Linux kernel community to bring improvements, like core scheduling, to all Linux users, because our priority is to enable users to do more with their devices without sacrificing security.
