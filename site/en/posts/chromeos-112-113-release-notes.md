---
title: 'ChromeOS 112 and 113 improve Screen Capture, screensavers, and security'
metadesc: 'The latest ChromeOS release includes updates to Screen Capture, screensavers, and security.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2023-05-06
---

ChromeOS 112 and 113 brought an array of security improvements and productivity enhancements—ranging from easy access to the Rupee symbol to the introduction of the Rupee symbol to instant administrative reboots.

## ChromeOS 112: Rupee symbol and Screen Capture updates

ChromeOS 112 released on April 6, 2023, introducing several user productivity features and application updates. Two highlights:

- **Rupee symbol:** Access the Rupee symbol faster than before. ChromeOS 112 introduced a Rupee symbol shortcut: ₹ ([[AltGr]]+[[4]]). On the virtual keyboard, you can access the Rupee symbol in the **More Symbols** menu.
- **Screen Capture:** Enhance demos made with Screen Capture by letting users see your clicks and keyboard shortcuts on screen. Screen Capture brings users closer together—and makes it easier to collaborate in a remote and hybrid world.

## ChromeOS 113: screensaver preview and custom trust anchors

ChromeOS 113 was promoted to stable release on May 4, 2023, focused primarily on security and privacy updates. Highlights of ChromeOS 113 include:

- **Screensaver preview:** In ChromeOS 113, a new option allows users to preview screensaver settings before applying the change. This preview is especially useful when using Google Photos with animations.
- **USB firmware versions:** Whenever a USB device is plugged or unplugged from a managed ChromeOS device, the USB firmware version is reported alongside existing USB events and telemetry. You can control this using the [ReportDevicePeripherals](https://chromeenterprise.google/policies/#ReportDevicePeripherals) policy, which controls reporting of existing USB events and telemetry.
- **Custom trust anchors:** ChromeOS 113 brings custom trust anchors to the lock screen. Previously, custom policy-provided CA certificates for enterprise were only honored for user traffic and inside the user session. This was an issue for customers who needed to re-authenticate at the lock screen, as the proxy set during the user session was enforced but the CA certificate was not accessible.
- **Instant reboot:** With ChromeOS 113, we give ChromeOS administrators the option to trigger ChromeOS reboots via the Admin console to facilitate support flows and apply policies instantly when required.

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](/{{locale.code}}/subscribe) or join the [ChromeOS Discord](/discord).
