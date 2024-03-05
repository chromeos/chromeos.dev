---
title: 'ChromeOS 122 release notes'
metadesc: 'ChromeOS 122 introduces three Generative AI features to Chrome  (tabs, themes, and writing) along with updates to screencasting and enterprise controls.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2024-03-05
---

Released on March 5, 2024, ChromeOS 122 introduced improved screencast recording, new enterprise controls, and a few generative AI features.

## Edit your transcribed Screencast recordings

Create and share transcribed screen recordings. You can now trim your screencasts sentence-by-sentence, add and remove paragraph breaks, mute segments of your recordings, and title sections to make long recordings easier to navigate.

## Enjoy a new look for ChromeOS media player

ChromeOS media player now has bigger buttons—and colors to match your wallpaper. Play video or audio to reveal the media player under **Quick Settings** and click the **Pin icon** to move the media player to the shelf. ChromeOS media player lets you control media being cast or start casting media to speakers and screens on your local network.

![Media controls box, with a pin selected in the upper right corner. The media player shows the media source, [youtube.com](youtube.com), the title of the content, the producer of the content, and the thumbnail associated with the content. At the bottom are the following media controls: go back, play, go forward, and fullscreen.](insert_image_url_here)

## Extend battery time with the updated Battery Saver

Battery Saver will now reduce brightness on your display and keyboard backlighting, throttle display refresh rate and available compute budget, and turn off certain energy-intensive background functions to let you squeeze more battery life out of your devices. When enabled, Battery Saver switches on automatically when your battery level reaches 20%.

## Generative AI features introduced to Chrome 122

Three new Generative AI (GenAI) features are now available for managed users signed into Chrome browser:

- **Tab organizer:** Chrome can automatically suggest tab groups based on the URL and title of opened websites. To use this feature, right-click on any tab and select **Organize similar tabs**.

- **Create themes with AI:** Create a unique Chrome theme (a combination of a color and a wallpaper image) using GenAI. To use the feature, open a new tab. At the bottom right click **Customize Chrome**. Select **Change theme** > **Create with AI**. You can then choose from preset options for subject, mood, style, and color.

- **Get help writing on the web with AI:** Kickstart the writing process, and write with more confidence, in free-form text fields across the web. To use this feature, right-click on a text field and select **Help me write**.

Initially, these three features will only be available to users in English in the US. Admins can control these settings using the following policies: [TabOrganizerSettings](https://chromeenterprise.google/policies/#TabOrganizerSettings), [CreateThemesSettings](https://chromeenterprise.google/policies/#CreateThemesSettings) and [HelpMeWriteSettings](https://chromeenterprise.google/policies/#HelpMeWriteSettings).

!!!aside.message--note
**Note:** Find more information in the [Tab group suggestions](https://support.google.com/chrome/a/answer/14534722?visit_id=638423239461713615-4199251238&p=tab_organizer_settings&rd=1), [Create themes](https://support.google.com/chrome/a/answer/14534723?visit_id=638423239464030884-3741476412&p=create_theme_settings&rd=1), and [Help me write](https://support.google.com/chrome/a/answer/14533935?visit_id=638423239464030884-3741476412&p=help_me_write_settings&rd=1) help center articles.
!!!

## Also released in ChromeOS 122

ChromeOS for enterprise got a few updates to authentication flows, data controls, and badge-based authentication. Updates to ChromeOS 122 include:

- **Content scanning with BCE.** [BeyondCorp Enterprise (BCE)](https://cloud.google.com/security/products/beyondcorp-enterprise) enables continuous and real-time end-to-end protection. Content scanning with BCE is a new way to evaluate and enforce data controls restrictions on file transfers based on signals from BeyondCorp Enterprise.

- **Enhanced SAML reauthentication flows.** We've introduced certain internal changes to our SAML single sign-on implementation. These changes will impact customers with misconfigured SAML settings. In particular, if you set the policy [LoginAuthenticationBehavior](https://chromeenterprise.google/policies/#LoginAuthenticationBehavior) to **Redirect to SAML IdP by default**, ensure that the [Single Sign-on](https://support.google.com/chrome/a/answer/2657289?#zippy=%2Csingle-sign-on) policy is set to **Enable SAML**—otherwise your SAML-based IdP won't be loaded.

- **Badge-based authentication.** From ChromeOS 122 on, certain third-party Identity Management Providers (IdPs) can use badge authentication on ChromeOS devices. Users can simply start a session with a badge tap, and leave the session with another badge tap. To learn more, see [Set up badge-based authentication](https://support.google.com/chrome/a/answer/14587225).

- **IKEv2 VPN support.** ChromeOS 122 includes new options in the **Admin console** for Internet Key Exchange Protocol Version 2 ([IKEv2](https://datatracker.ietf.org/doc/html/rfc5996)) VPN protocols.

- **Mandatory extensions in Incognito.** Admins can now specify if there are certain extensions that users must turn on to use Incognito mode. There is a new toggle in **Admin console** > **Apps & extensions** that can be applied for individual extensions. To use Incognito mode, users need to turn on **Allow in Incognito** for all required enterprise extensions.

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes⁠](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](https://chromeos.dev/en/subscribe) or join the [ChromeOS Discord](https://chromeos.dev/discord).
