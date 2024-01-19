---
title: 'ChromeOS 120 release notes'
metadesc: 'ChromeOS 120 arrives with improved virtual disk management, new UX configuration options, and updated administrative policies.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2024-01-18
---

ChromeOS 120 reached stable release on January 4, 2024, introducing a new method of managing virtual disks and deprecating support for legacy ChromeOS media containers and codecs.

## Quickly manage virtual disks with the Bento Button

ChromeOS 120 introduces fast access to operations such as desk visualization, desk switching, desk creation, and desk ordering via a new shelf button. The ChromeOS Virtual Desk Button ("Bento Button") is now available for all users who utilize virtual desks.

![Bento button in action. A user clicks a button on their task bar, positioned to the left of their applications, to switch between two saved desks titled "Biology" and "Art Class."](ix://posts/m120/inline-1.gif)

## Deprecation of support for legacy ChromeOS media containers and codecs

ChromeOS 120 deprecates support for MPEG4 Part 2 video codec and AVI container. You can temporarily re-enable support for this functionality using `chrome://flags/#cros-legacy-media-formats` until ChromeOS 125, after which support will be removed.

## Also released in ChromeOS 120

You now have more options for configuring your on-screen, keyboard, mouse, and emoji experiences on ChromeOS. ChromeOS 120 included the following changes:

- **Disable and adjust mouse scroll acceleration.** ChromeOS 120 adds new controls to let users disable mouse scroll acceleration and adjust scroll speed.
- **Configure and customize keyboard keys.** Configure settings for actions such as [[Right-Click]], [[Home]], [[End]], and [[Page Up]] in the **Customize keyboard keys** subpage.
- **Resize PiP with pinch.** Picture-in-Picture (PiP) windows can now be resized with a pinch gesture. Place two fingers on the window and pinch or spread to adjust the window size to your screen.
- **New look for the Emoji Picker.** ChromeOS 120 brings a new dynamic color palette to the floating Emoji and GIF Picker.
- **Enable XDR Authentication Events.** Authentication events (login/out lock/unlock) can now be enabled as part of Extended Detection and Response (XDR) on ChromeOS. Once rollout is complete, XDR systems will be able to use these events to provide insights on the device security posture.
- **View App Details in App Management.** Get details about installed apps. Navigate to **Settings > Apps > Manage** your apps, select an app to view the app's storage usage, version number, and information about how it was installed.

Finally, administrators will see the following new or updated ChromeOS policies in the **Admin console**:

<table>
  <thead>
    <tr>
      <th>Policy name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://chromeenterprise.google/policies/#PowerManagementIdleSettings">PowerManagementIdleSettings</a></td>
      <td>Manage screen dim, screen off, and idle actions.</td>
    </tr>
    <tr>
      <td><a href="https://chromeenterprise.google/policies/#ScreenLockDelays">ScreenLockDelays</a></td>
      <td>Set the length of time before a screen lock when a user is idle. </td>
    </tr>
    <tr>
      <td><a href="https://chromeenterprise.google/policies/#LidCloseAction">LidCloseAction</a></td>
      <td>Specify the action to take when the lid of the device is closed.</td>
    </tr>
    <tr>
      <td><a href="https://chromeenterprise.google/policies/#ChromeOsLockOnIdleSuspend">ChromeOsLockOnIdleSuspend</a> </td>
      <td>Set whether the screen locks after the device's lid is closed. </td>
    </tr>
    <tr>
      <td><a href="https://chromeenterprise.google/policies/#PrivateNetworkAccessRestrictionsEnabled">PrivateNetworkAccessRestrictionsEnabled</a></td>
      <td>Specify whether to apply restrictions to requests to more-private network endpoints.</td>
    </tr>
    <tr>
      <td><a href="https://chromeenterprise.google/policies/#DeviceFlexHwDataForProductImprovementEnabled">DeviceFlexHwDataForProductImprovementEnabled</a></td>
      <td>Send hardware data to Google to support improvements to ChromeOS Flex.</td>
    </tr>
    <tr>
      <td><a href="https://chromeenterprise.google/policies/#IPv6ReachabilityOverrideEnabled">IPv6ReachabilityOverrideEnabled</a></td>
      <td>Enable IPv6 reachability check override.</td>
    </tr>
    <tr>
      <td><a href="https://chromeenterprise.google/policies/#DataUrlInSvgUseEnabled">DataUrlInSvgUseEnabled</a></td>
      <td>Enables Data URL support for SVGUseElement, which will be disabled by default starting in ChromeOS 119. </td>
    </tr>
  </tbody>
</table>

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes⁠](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](/{{locale.code}}/subscribe) or join the [ChromeOS Discord](https://chromeos.dev/discord).
