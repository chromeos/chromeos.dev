---
title: 'ChromeOS 121 release notes'
metadesc: 'ChromeOS 121 sees the discontinuation of ChromeOS Flex on some device models, along with updates to App Streaming, dictation, and printing.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2024-02-08
---

ChromeOS 121 reached stable release on February 6, 2024, bringing with it updates to App Streaming on Chromebooks, dictation, and ChromeOS Flex End of Life support.

## Use ChromeVox when App Streaming on Chromebooks

When using App Streaming on Chromebooks, you can now use ChromeVox to navigate a streaming Android app. The Android app's accessibility tree is streamed in tandem with the app itself and can be interacted with using ChromeOS screen reader capabilities.

## Enable dictation using the keyboard

You can now enable dictation using [[Search]] + [[D]] on your keyboard (or the dictation key on some Logitech keyboards). When enabling dictation, a dialog will appear to inform you that you are about to enable dictation, that certain speech files may be downloaded, and where to go to change your dictation language.

![A ChromeOS desktop featuring an alert with the header ‘Turn on dictation.' The text reads: ‘You can type using your voice. To use dictation, press the dictation key or select the microphone icon at the bottom of the screen when you are on a text field. Your dictation language is English (United States). Speech files will be downloaded. To change dictation language, go to Settings > Accessibility > Keyboard and text input.' After the text, there are two prompts: ‘Cancel' and ‘Turn on'.](ix://posts/m121/1.png)

## ChromeOS Flex End of Device support

As of January 01, 2024, support has been discontinued for the ChromeOS Flex devices that officially ended support in 2023. The devices will continue to receive ChromeOS Flex updates but these updates will no longer be tested or maintained by the Flex team. For the full list of devices ending support you can review our [Certified models list](https://support.google.com/chromeosflex/answer/11513094?hl=en).

!!! aside.message--note
**Note:** We recommend that customers upgrade to newer ChromeOS Flex certified models or ChromeOS devices to benefit from new features and security improvements. You can learn more about supported devices in our [help center](https://support.google.com/chromeosflex/answer/11542901).
!!!

## Also released in ChromeOS 121

Printing, trackpad gestures, and Enterprise DataControls just got updates. Let's take a look at some of the other changes coming with ChromeOS 121:

- **Borderless printing:** With a compatible printer, you can now print photographs on photograph paper, without borders.
- **No more onboarding messages for Assistant:** ChromeOS 121 removes the welcome or onboarding messages offered to a new user when launching Assistant on ChromeOS for the first time.
- **Additional fields for security investigation:** ChromeOS Data Control events will have additional fields to enrich admin insights in the security investigation tool.
- **Enterprise DataControls (DLP) file restrictions:** Use new DLP file restrictions to control what users can do with files on ChromeOS devices through source and destination based rules. DLP file restrictions are now available for events like copy and paste, screen capture, screen sharing, and printing. IT administrators can create an information protection strategy with rules based on the data source, destination and user.

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes⁠](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](https://chromeos.dev/en/subscribe) or join the [ChromeOS Discord](https://chromeos.dev/discord).
