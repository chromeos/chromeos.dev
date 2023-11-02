---
title: 'ChromeOS 118 release notes'
metadesc: 'ChromeOS 118 brings tabbed PWAs, improved touch text editing, and streamlined password recovery.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2023-11-02
---

# ChromeOS 118 release notes

ChromeOS 118 reached stable release on October 17, 2023, introducing a variety of user experience improvements. One notable feature is the introduction of [Tabbed PWAs](https://developer.chrome.com/articles/tabbed-application-mode/)—with a small modification to your web manifest, you can choose to display your PWA with tabbed navigation. Other changes include improved touch text editing, streamlined password recovery, in-context printer setup assistance.

## Display apps in tabbed mode with Tabbed PWAs

Let your users manage multiple tabs within a single window by displaying your Progressive Web App (PWA) in tabbed application mode. Tabbed application mode provides an intuitive, familiar tab navigation strip for users to manage multiple files, documents, or conversations simultaneously.

![A PWA displayed in tabbed application mode.](ix://posts/m118/pwa-tabs.png)

To use tabbed application mode with your PWA, update `display_override` in your web app manifest:

```json
{
  "display": "standalone",
  "display_override": ["tabbed"]
}
```

## Also released in ChromeOS 118

ChromeOS 118 updates user experience with improved touch text editing, streamlined password recovery, and in-context printer setup assistance.

- **Touch text editing:** Touch text editing is easier and more intuitive. Updates to touch text editing include a more intuitive gesture system, usability improvements around gesture intentions and text legibility, and a brand new magnifier that automatically shows precise cursor positions.
- **Password recovery:** Password recovery is faster. ChromeOS users who have forgotten their password can now recover their account along with all associated local data, rather than losing their local data. Administrators can control this feature with the `RecoveryFactorBehavior` policy.
- **Printer setup assistance:** ChromeOS now provides more in-context help for printing, including an easier way to save printers, new set up instructions and help content, and printer status directly integrated on the settings page.

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes⁠](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter]({{locale.code}}/subscribe) or join the [ChromeOS Discord](/discord).
