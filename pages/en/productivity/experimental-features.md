---
title: Experimental features
metadesc: Enable experimental features in Chrome OS by changing releases, toggling flags, or enabling developer mode.
date: 2020-05-01
weight: 3
---

Being on the cutting edge allows you to try out new features before they're ready, letting you provide feedback to Google or modify your operating system more deeply than what's otherwise available in the normal, stable Chrome OS release.

!!! aside.message--warning
**Warning:** Enabling experimental features of any kind are not supported by Google and may void your warranty. Modifications and experimental features may cause hardware, software, or security issues.
!!!

## Change Chrome OS channel

Your Chrome OS device is normally on a stable channel. The **stable** channel is fully tested and supported by Google, and is the best to avoid crashes or other issues with your operating system. There are two other channels: **beta** and **developer**. The **beta** channel allows you to see what's next with minimal risk, although it is not fully supported by Google. It's usually updated every week. The **developer** channel gets updated multiple times per week, shipped with whatever code is currently available.

To change what channel you're on, open "Settings"->"About Chrome OS"->"Additional Details" and click the "Change channel" button. This will show you a dialog box where you can change your Chrome OS channel. Changing channels will require a download of the new chanel information and a restart in order to apply.

#1[Chrome OS channel selection dialog box](/images/productivity/change-channels.png)

## Experimental feature flags

Chrome feature flags are experimental features shipped with your current Chrome OS channel but are not enabled by default as they have not been fully tested yet. They provide a look at what Google is working on with some level of implementation available for you to try out until it's shipped. [Hyper-Threading](https://support.google.com/chromebook/answer/9340236), enabling use of all of the threads of your CPU, is an example of an experimental feature flag that can be enabled.

!!! aside.message--note
**Note:** Feature flags should only be enabled on your local device to test their functionality if you accept the risk of doing so, and you should not develop against them for a production implementation in your app or have end-users of apps you're developing enable them for extra functionality.
!!!

If you want to enable feature flags on your machine, navigate to `chrome://flags` in your Chrome browser's omnibox; a list of flags will be available in either the "Default", "Enabled", or "Disabled" state. Find the feature flag you're interested, and change the state to have it take effect.

## Developer mode

Developer mode on Chrome OS unlocks deeper access to the operating system than you have in a normal stable mode by removing some protections and surfacing some functionality that otherwise are enabled or hidden in order to ensure a secure, stable experience. In this way, it's different than the developer channel, which is instead a frequently updated version of the operating system that otherwise runs in a stable mode. Developer mode gives you more power, but with great power comes great responsibility; you should only enable it if you are comfortable with the risks associated with doing so.

!!! aside.message--warning
**Warning:** Enabling experimental features of any kind are not supported by Google and may void your warranty. Modifications and experimental features may cause hardware, software, or security issues.
!!!

To enter developer mode, complete these steps:

1.  Invoke _Recovery_ mode by pressing and holding the [[ESC]] and **Refresh** ([[F3]]) keys, then pressing the **Power** button.

!!! aside.message--note
**Note:** On most devices, both the _recovery_ button and the _dev-switch_ button are virtualized. If these instructions don't work for you, see the [specific instructions for your device](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices).
!!!

2.  When the _Recovery_ screen appears, press [[Control]] + [[D]]. There's no prompt for this action, so you must simply complete it. Afterwards, you are prompted to confirm and reboot into developer mode.

If you see one of the screens from [Figure 2](#figure-2) when you turn on your device, you've successfully entered developer mode.

#2[Developer mode confirmation screens.](/images/android/dev-mode/verification.jpg)

!!! aside.message--note
**Note**: To skip the OS loading screen, either wait 30 seconds or press [[Control]] + [[D]], and your Chromebook will continue starting.
!!!
