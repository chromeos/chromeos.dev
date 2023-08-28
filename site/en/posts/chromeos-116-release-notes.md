---
title: 'ChromeOS 116 release notes'
metadesc: 'A new data processor mode, expanded language and emoji support for Linux apps, and a variety of enhanced and updated features.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2023-08-22
---

ChromeOS 116 reached stable release [on August 22, 2023](https://chromiumdash.appspot.com/schedule). Features new to ChromeOS 116 include a new data processor mode, expanded language and emoji support for Linux apps, and a variety of enhanced and updated settings and features.

## Data processor mode on ChromeOS

ChromeOS 116 introduces a [data processor mode](https://support.google.com/chrome/a/answer/13605764?hl=en) for a suite of ChromeOS features and services called [Essential Services](https://support.google.com/chrome/a/answer/13598068?hl=en). Now, features and services for which Google remains solely a data controller are called "Optional Services". New tools available in data processor mode for ChromeOS include a data processor mode landing page in the Admin console, the ability to turn on/off individual Optional Services, tools to assist customers with Data Subject Access Requests (DSARs), and a tool to assist customers with data subject deletion requests.

## Expanded language and emoji support for Linux apps

Input method support within Linux apps on ChromeOS is now available by default. You can now use Chinese, Japanese, Korean, Vietnamese, and [other keyboard languages](https://support.google.com/chromebook/answer/1059492?hl=en&ref_topic=9145745&sjid=10245918070142659891-NA) in locally installed Linux apps on Chromebooks, like VS Code and LibreOffice—a long standing [feature request](https://b.corp.google.com/issues/149234835). Input method support is currently available for [GTK](https://en.wikipedia.org/wiki/GTK) and Electron apps. This update also enables use of the emoji picker.

!!! aside.message--note
**Note:** We'd love to [hear from you](https://issuetracker.google.com/issues/new?component=1161264&template=1747723) on other Linux apps that you're waiting for input method support on.
!!!

## Removal of permissive Chrome Apps webview behaviors

As early as Chrome 116, Chrome Apps [webview](https://developer.chrome.com/docs/extensions/reference/webviewTag/) usage has a new restriction. Using the webview [NewWindow](https://developer.chrome.com/docs/extensions/reference/webviewTag/#event-newwindow) event to attach to a webview element in another App window causes the window reference returned by the window.open call in the originating webview to be invalidated. A temporary policy, [ChromeAppsWebViewPermissiveBehaviorAllowed](https://chromeenterprise.google/policies/#ChromeAppsWebViewPermissiveBehaviorAllowed), is available to give enterprises time to address possible breakage related to these changes.

!!! aside.message--note
**Note:** To test whether this change is the cause of any breakage, without needing to set the enterprise policy, you can restore the previous behavior from Chrome 112 and earlier by navigating to `chrome://flags` and disabling `chrome://flags/#enable-webview-tag-mparch-behavior`.
!!!

## Enhanced autocorrect features

Autocorrect is now enabled by default for English in compatible apps, automatically fixing typos, spelling, and other errors. In addition to the new Autocorrect for physical keyboards, this update also enhances the performance of the virtual keyboard's Autocorrect and other Assistive features.

## Also released in ChromeOS 116

ChromeOS 116 additionally introduced a variety of setting updates, feature changes, and optimizations to enhance user experience.

- **ChromeOS OCR in PDFs for screen reader users:** Through Optical Character Recognition (OCR), users can convert images to text, so that they can access and read them using a screen reader.
- **ChromeVox settings move to ChromeOS setting:** In ChromeOS 116, you now access the existing settings for ChromeVox under the ChromeOS Accessibility settings pages.
- **Customizing input peripherals per device settings:** Users can now manage settings for their input peripherals, such as their mouse and keyboard, at the device level and apply different values for different devices.
- **Managing Android App permissions:** Now, users can see a detailed view of the data an Android app can access on the Apps page in Settings, and they can easily manage those permissions.
- **ChromeOS Kerberos integration enhancements:** Starting with ChromeOS 116, we streamline the end user configuration flows for ChromeOS Kerberos customers. The new UI enhancements guide users through configuring their Kerberos accounts in a guided flow, similar to Password Manager. For details, see this [help center](https://support.google.com/chrome/a/answer/10304441?hl=en#zippy=%2Cadd-a-ticke) article.
- **Commercial launch of screensaver:** The commercial launch of screensaver for the login screen or MGS lock screen allows admins to customize the appearance of idle devices. Newly added admin settings include the abilities to turn on/off the screensaver, to provide a list of screensaver images, and to customize idle times.
- **URL-keyed anonymized data collection in Kiosk mode:** The policy for URL-keyed anonymized data collection is now supported in Kiosk mode. This policy will be added to the Admin console in a future release.

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](/{{locale.code}}/subscribe) or join the [ChromeOS Discord](/discord).
