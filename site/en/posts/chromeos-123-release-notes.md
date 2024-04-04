---
title: 'ChromeOS 123 release notes'
metadesc: 'Improved productivity on ChromeOS: custom keyboard shortcuts, mouse button customization, and Fast Split Screen setup, along with improvements to privacy and permissions.'
tags:
  - announcement
  - product news
  - technical
authors:
  - samrichard
date: 2024-04-04
---

Promoted to stable release on April 2, 2024, ChromeOS 123 brings several productivity improvements to the ChromeOS desktop—custom keyboard shortcuts, mouse button customization, and faster split screen setup.

## Customize your keyboard shortcuts

Assign preferred key combinations to personalize your shortcuts in ChromeOS. Whether you want to improve one-handed accessibility, make them easier to remember, or bring over shortcuts you're used to in other systems, custom keyboard shortcuts can simplify your day-to-day workflows.

You can build a new shortcut through **Settings** > **Device** > **Keyboard and inputs** > **View keyboard shortcuts** > **Overview mode** > **Edit** > **Add Shortcut**.

![A user adds a custom shortcut by navigating to Device, View keyboard shortcuts, Overview mode, Edit, and Add shortcut. The user then begins to customize their new shortcut.](insert_image_url_here)

## Mouse button customization

If your mouse has more than two buttons, you can now assign them to a set of actions—such as taking a screenshot, muting and unmuting, or inserting emojis. You can also select a key combination to assign to your buttons for any action performed by a keyboard shortcut.

Access these settings through **Settings** > **Device** > **Mouse** > **Customize mouse buttons**.

![A user customizes their mouse button actions by navigating to Device, Mouse, and Customize mouse buttons. On the Customize mouse buttons screen, the user is able to select different mouse buttons and their corresponding actions.](insert_image_url_here)

## Setup Split Screen windows faster

Faster Split Screen setup offers a quicker way to set up your window layout by showing an overview of your open windows on the other side of the screen. With Faster Split Screen, once you snap (or lock) a window in place on one side, you can choose an already-open window from **Overview** to snap into the other side—or select something from the shelf (the row of apps located at the bottom or side of your screen).

![A user chooses to dock an application to one side of their screen by choosing from a set of template options: split, partials, fullscreen, and float. After selecting a template option, the user is prompted to select the application that they want on the other side of their screen.](insert_image_url_here)

## ChromeOS Flex upgrades to the Floss Bluetooth stack

From ChromeOS 123, ChromeOS Flex will upgrade to the Floss Bluetooth stack. As part of this upgrade, the listed devices no longer support Bluetooth functionality. If Bluetooth functionality is critical for these devices, we recommend moving these devices to the [LTS channel](https://support.google.com/chrome/a/answer/11333726) to extend the Bluetooth functionality through to October 2024.

- HP Probook 4530s
- Lenovo ThinkPad T420
- HP Elitebook 8460p
- Apple iMac 11,2
- Lenovo ThinkPad x220
- Dell Vostro 3550
- HP 3115m
- HP Elitebook 2560p
- HP ProBook 6465b
- Lenovo ThinkPad L420

If your devices are unable to connect to Bluetooth after updating to ChromeOS 123, go to `chrome://flags` and set the flag **Use Floss instead of BlueZ** to _Disabled_.

![The Use Floss Instead of BlueZ setting which has been set to Disabled.](insert_image_url_here)

## Control privacy settings per-app

With per-app permissions for microphone and camera, you can go directly to privacy settings to view which apps need access and modify your app permissions—rather than going to two separate places. ChromeOS 123 consolidates app permissions and privacy controls, giving users more transparency by showing which apps need access to privacy sensors and how app permissions are affected by privacy control states.

## Also released in ChromeOS 123

Along with the productivity features, ChromeOS 123 introduces a few key quality-of-life improvements: per-app language preferences, natural-sounding text-to-speech voices, and Hotspot connectivity.

- **Per-app language preferences on Android:** Change to your preferred language for individual Android apps. These new settings are available in **Settings > Apps > Manage your apps > App language**.
- **New natural-sounding voices for text-to-speech:** In ChromeOS 123, we've added new natural sounding TTS voices that work offline and are available in 31 languages. Find them under **Accessibility settings**.
- **ChromeOS Tether Hotspot**: You can now share your cellular network on your Chromebook as a hotspot to other devices without an internet connection. As of ChromeOS 123, this feature only supports T-Mobile in the US. Enable a hotspot by opening **Network Settings** and toggling on **Hotspot.**
- **Data Processor mode rollout for Norway and Belgium:** In August 2023, data processor mode for ChromeOS was launched in the Netherlands to give organizations more transparency and control over data sent to and processed by Google. We have now extended this mode to Norway and Belgium. **Data Processor mode** is available in the **Admin console** through **Device > Chrome > Compliance**. For more information, see [our Help Center article](https://support.google.com/chrome/a/answer/14316192).
- **Enhanced Android security for new enterprise customers:** On new enterprise domains, ChromeOS now deactivates Android apps for unaffiliated ChromeOS users by default. Unaffiliated ChromeOS users are users on unmanaged devices or on devices that are managed by a different domain than the user. Enterprise customers who want to change the default setting, see [our Help Center article](https://support.google.com/chrome/a/answer/7131624).

## Keep up-to-date with ChromeOS

For more Chrome browser and ChromeOS updates, check out [Chrome Enterprise and Education release notes⁠](https://support.google.com/chrome/a/answer/7679408?hl=en&ref_topic=7679105&sjid=17790463155195284014-NA#). To keep up-to-date with the latest ChromeOS.dev news, sign up for the [ChromeOS developer newsletter](https://chromeos.dev/en/subscribe) or join the [ChromeOS Discord](https://chromeos.dev/discord).
