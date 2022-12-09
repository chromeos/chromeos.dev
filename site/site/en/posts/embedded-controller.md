---
title: Chrome OS's Embedded Controller
metadesc: What Chrome OS's embedded controller does and how we're updating it to support the community
tags:
  - foundations
  - technical
authors:
  - keithshort
date: 2022-06-07
---

Let’s look at a simplified block diagram for a Chromebook, highlighting the main processing units found on all Chromebooks.

![Diagram of Application Processor, Embedded Controller, and Titan C chip. The AP connects to peripherals including the display, RAM, and storage, and the EC connects to peripherals including the keyboard, thermal, sensors, and power.](ix://posts/embedded-controller/chromebook-simplified-block-diagram.svg)

The application processor, or AP, is the workhorse in a Chromebook, and uses chipsets from Intel, AMD, MediaTek, or Qualcomm. This processor boots through open-source coreboot firmware and runs the Linux-based ChromeOS operating system.

Chromebooks also contain the Titan C chip, which serves as the foundation for Chromebooks hardware-based root of trust.

Finally, there is the embedded controller, or EC. The EC is an ultra low-power microcontroller that is always on. The EC handles all the things you want a Chromebook to do when the application processor is off or sleeping. This makes the EC critical to the all-day battery life of Chromebooks.

## Embedded controller’s role

The block diagram below provides a closer look at the EC.

![Embedded controller block diagram, showing the EC includes flash and ram, and that it connects to the AP through eSPI and GSC through UART/GPIO. EC connects to the keyboard through Row/Column Matrix, thermals including the temp and fans, sensors including an accelerometer, gyroscope, and light, and power including battery, charging, USB-C PD, and USB-A through 12C/GPIO.](ix://posts/embedded-controller/ec-detailed-block-diagram.svg)

The EC’s role includes:

- **AP power** - the EC manages powering up the application processor, which involves the proper sequencing and timing of multiple power rails and monitoring power state signals from the application processor.
- **Keyboard** - the EC scans the keyboard, sending key press information to the operating system over a dedicated communication channel.
- **Thermal management** - the EC continuously monitors the temperature of the application processor, RAM, and charging circuitry, automatically turning on fans to provide active cooling. During extreme temperatures, the EC can throttle or completely power down the application processor to protect the system.
- **Sensors** - for convertible Chromebooks, the EC measures lid angle using two accelerometers. This serves as an input for switching the system between laptop and tablet modes.
- **Power management** - the EC monitors battery and charging. If there are USB-A ports on the system, the EC controls when to power these ports and how much current is advertised on each port. The EC also manages all aspects of the USB-C connection, including negotiating power from the charger and enabling DisplayPort and USB4 modes.

## Supporting a healthy ecosystem

The original ChromeOS EC code was created around 2012 and has always been [open source](https://source.chromium.org/chromiumos/chromiumos/codesearch/+/main:src/platform/ec/). This code supports more than 200 Chromebook variants. The ChromeOS EC code provides a feature rich real-time operating system, or RTOS, with threads, scheduling, semaphores, mutexes, and interrupts.

Before this effort, ECs used in laptop and desktop computers were typically a closed source solution provided by the manufacturer. With the original ChromeOS EC code, chip vendors wrote drivers specifically for Chromebooks. This often meant duplicated work for the vendor if the vendor wanted to support markets other than Chromebooks.

Google recently decided to move the EC application over to a new RTOS provided by the [Zephyr Project](https://zephyrproject.org/). The Zephyr Project is a Linux Foundation hosted project with more than 1200 community contributors, making it the largest open source RTOS community.

With the switch to Zephyr, vendors can write their drivers once and capture design wins in product areas beyond Chromebooks.

The Zephyr Project also provides some immediate technical benefits for the ChromeOS EC application. Zephyr’s device model is based on the industry standards of [devicetree](https://www.devicetree.org/) and [Kconfig](https://docs.zephyrproject.org/latest/build/kconfig/index.html). These technologies simplify the customization steps needed for each Chromebook model, lessening the engineering effort for Chromebook manufacturers.

### Ensuring a successful transition

The EC application used on Chromebooks is feature rich, and Google couldn’t lose features or introduce bugs during the transition to Zephyr.

Google solved this by reusing most of the EC application feature code, creating a shim layer to map existing APIs to the Zephyr APIs.

![Embedded controller software diagram, showing the EC connection to a shim with a kernel and drivers, which then connects to Zephyr. Kconfig and devicetree connect to the shim and Zephyr, and Kconfig connects through a mapping to the EC.](ix://posts/embedded-controller/zephyr-ec-shim.svg)

With the switch to a Zephyr based EC, the public interfaces to the EC are unchanged. So regardless of whether a Chromebook uses the original EC code or the new Zephyr based EC code, you can be assured the Chromebook has passed all the same rigorous qualification tests.

### What Google brings to the Zephyr Project

Google is fully supporting the Zephyr Project and has already joined as a [platinum member](https://zephyrproject.org/project-members/).

Over the next year, Google plans to add all the features from the ChromeOS EC application directly into the [Zephyr Project main tree](https://github.com/zephyrproject-rtos/zephyr), bringing these capabilities to all Zephyr applications.

Google has already contributed a [state machine framework](https://docs.zephyrproject.org/latest/services/smf/index.html) library to Zephyr and modernized the testing [API](https://github.com/zephyrproject-rtos/zephyr/blob/a78e7c5c90d8cb31ec550ce289503bd698675585/subsys/testsuite/ztest/include/ztest_test_new.h#L115), simplifying test and test suite creation. Work is underway to add the full-featured USB-C Power Delivery implementation as well.
