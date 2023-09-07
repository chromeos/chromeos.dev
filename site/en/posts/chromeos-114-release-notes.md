---
title: 'ChromeOS 114 release notes'
metadesc: 'ChromeOS 114 includes updates to Cursive, Passpoint, Extensions, and audio controls.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2023-06-06
---

ChromeOS 114 reached stable release [on June 6, 2023](https://chromiumdash.appspot.com/schedule), bringing with it a pre-installed stylus-first notes app, streamlined Wi-Fi access, and a new audio indicator for ChromeVox, the built-in screen reader on Chromebooks.

## Cursive notes app now available for Chromebook

[Cursive](http://cursive.apps.chrome/), a stylus-first notes app, will be pre-installed for all Enterprise and Education accounts on stylus-enabled Chromebooks. If you want to [block access to the app](https://support.google.com/a/answer/181865), you can prevent Chromebooks in your enterprise from accessing `cursive.apps.chrome`.

## Streamlined Wi-Fi access with Passpoint

Starting with ChromeOS 114, Passpoint will streamline Wi-Fi access and eliminate the need for users to find and authenticate a network each time they visit. Once a user accesses the Wi-Fi network offered at a location, the Passpoint-enabled client device will automatically connect upon subsequent visits.

## Extensions for Incognito navigation

Extensions allow admins to enforce security features and customizations in their organizational unit but they cannot be enforced in Incognito mode without user consent. This can be a problem as users can bypass extension-set features, for example, proxies by using Incognito mode for navigation.The [MandatoryExtensionsForIncognitoNavigation](https://chromeenterprise.google/policies/#MandatoryExtensionsForIncognitoNavigation) policy allows you to configure a list of extensions that users need to explicitly allow to run in Incognito, to use Incognito mode for navigation.

## Audio controls in ChromeOS settings

Settings on ChromeOS now have a more native OS settings experience housed in the Settings app, available through App Launcher or the cog icon in the Quick Settings menu. In ChromeOS 114, users can now find all sound controls in the ChromeOS Settings apps.

## Audio indicator for ChromeVox earcons

[ChromeVox](https://support.google.com/chromebook/answer/7031755) is the built-in screen reader on Chromebooks. In ChromeOS 114, an audio indicator (an earcon) now plays when a user with ChromeVox enabled uses the ChromeVox keyboard shortcut to toggle selection on or off.

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](/{{locale.code}}/subscribe) or join the [ChromeOS Discord](/discord).
