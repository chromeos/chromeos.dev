---
title: Kiosk accessibility
metadesc: Best practices, settings, and features for accessibility on kiosk apps.
date: 2023-11-16
weight: 0
tags:
  - web
---

ChromeOS's kiosk mode runs an application and locks it in full screen, without the need for a user login. Kiosk mode offers a convenient and efficient way for people to access information and services in a controlled, focused manner. But because the experience of kiosk mode is so tightly controlled, it's important to ensure that kiosk apps are accessible to everyone. Improving kiosk accessibility can help broaden reach, by reducing barriers to information access, and improve customer satisfaction by fostering inclusivity.

Apps running in kiosk mode are web apps, so web accessibility best practices apply to them:

- **Follow Web Content Accessibility Guidelines ([WCAG 2](https://www.w3.org/WAI/standards-guidelines/wcag/)).** Even when deploying kiosk apps internally, the best way to ensure accessibility—such as screen reader usability—is to follow WCAG 2. You can also leverage other great design and development resources from those working in accessibility to improve your kiosk app:
  - The UK government offers the general [dos and don'ts on designing for users with accessibility needs](https://accessibility.blog.gov.uk/2016/09/02/dos-and-donts-on-designing-for-accessibility/), including low vision and hard of hearing users.
  - Web.dev provides information on [what accessibility means in web development](https://web.dev/accessibility/) and why it's important.
  - Material Design shares [recommendations for accessibility in design](https://m2.material.io/design/usability/accessibility.html#understanding-accessibility).
- **Offer multiple methods of input.** Don't rely on gesture-based navigation. Users may need a keyboard, mouse, or switch to interact with the app.
- **Offer multiple forms of output.** Don't rely on a single type of output, such as audio. Users may need to interact with an app entirely without sound or entirely without visual cues.
- **Test the app and its hardware with a diverse audience.** Don't rely on simply meeting best practices: test them. Users need to both physically and digitally interact with a kiosk app. Experience testing will identify areas for improvement.
  - Ensure that you include a diverse group of test users to reveal potential accessibility issues.
  - Test the kiosk app in place—in the environment and on the hardware that it will be used with.

Because kiosk apps run in a controlled environment, users may not be able to access the ChromeOS accessibility features or hardware options they would normally use. When it comes to ChromeOS kiosk accessibility, there are three levels of control to consider:

- **Policies:** Admins control the policies of their managed devices, including access to essential [kiosk accessibility settings](https://support.google.com/chrome/a/answer/1375678?hl=en#:~:text=kiosk%20power%20settings-,Kiosk%20accessibility,-By%20default%2C).
- **APIs:** Developers can control how the user interacts with their kiosk app with a companion extension that calls the [chrome.accessibilityFeatures API](https://developer.chrome.com/docs/extensions/reference/accessibilityFeatures/).
- **Hardware devices:** The type of device and attached peripherals control how the user physically interacts with the kiosk, including input devices, screen sizes, and platforms.

These levels are very much interdependent and therefore must operate in concert to provide a truly accessible kiosk app experience. Administrators must consider accessibility when deploying kiosk apps—and developers must be aware of the impact that administrative settings could have on their app once deployed.

## Policy controls for kiosk administrators

On a ChromeOS device in a normal user session, users can manage their accessibility settings by going to the **Accessibility** section in the **Settings** app. In kiosk mode, users don't have access to the Settings app by default. Instead, administrators will need to enable accessibility settings to allow users access to them while in kiosk mode.

Admins can find the "Kiosk accessibility" settings in the Google Admin Console by going to **Devices** > **Chrome** > **Settings** > **Device settings** tab.

![The kiosk accessibility settings that can be configured from the Google Admin Console.](ix://kiosk/accessibility/inline-1%20.png)

There are two main settings to look out for:

- **Kiosk floating accessibility menu**: Because the Settings app is not readily available in kiosk mode, enabling this will allow users to toggle accessibility settings via a [floating accessibility menu](https://support.google.com/chrome/a/answer/1375678?hl=en#zippy=%2Ckiosk-floating-accessibility-menu) instead. The default behavior when this setting is not configured is that the floating accessibility menu is not shown.
- **Kiosk accessibility shortcuts**: Enabling this will allow users to turn on accessibility features using [keyboard shortcuts](https://support.google.com/chromebook/answer/183101?hl=en#zippy=%2Caccessibility). Keep in mind, though, that not all features have a corresponding shortcut. The default behavior when this setting is not configured is that shortcuts are enabled.

You can also configure accessibility features individually. By default, they are configured to "Allow the user to decide," leaving it up to the user to enable or disable accessibility features as they see fit.

!!!aside.message--note
**Note:** View the complete list of [ChromeOS accessibility features](https://support.google.com/chrome/a/answer/1375678?hl=en#:~:text=kiosk%20power%20settings-,Kiosk%20accessibility,-By%20default%2C) to learn more about each setting's behavior.
!!!

## Chrome extension chrome.accessibilityFeatures API

In kiosk mode, users can toggle accessibility features using the [kiosk floating accessibility menu](https://support.google.com/chrome/a/answer/1375678?hl=en#zippy=%2Ckiosk-floating-accessibility-menu) or with the corresponding [keyboard shortcuts](https://support.google.com/chromebook/answer/183101?hl=en#zippy=%2Caccessibility). But this relies on their admin having enabled the menu and not all features have a shortcut. Therefore, a developer should integrate accessibility settings directly into their kiosk app where appropriate. For example, giving users the option to use dictation when text input is shown.

The state of ChromeOS accessibility features can be accessed through the [`chrome.accessibilityFeatures` API](https://developer.chrome.com/docs/extensions/reference/accessibilityFeatures/). When configured to "Allow the user to decide" in the admin console, the accessibility features can also be controlled through this API. This is a Chrome extension API so it must be called from a [companion extension](https://chromeos.dev/en/kiosk/connecting-an-extension-from-a-kiosk-pwa) that runs with a kiosk app. Developers can use this API to check whether each setting is controllable and interact with the respective built-in ChromeOS accessibility functions.

The chrome.accessibilityFeatures API has a corresponding [property for each accessibility feature](https://developer.chrome.com/docs/extensions/reference/accessibilityFeatures/#property). Each property is a [`type.ChromeSetting` prototype](https://developer.chrome.com/docs/extensions/reference/types/#type-ChromeSetting) which has the following methods:

- `get()`: to get the value of the setting.
- `set()`: to set the value of the setting.
- `onChange()`: to add a listener for when the setting changes.
- `clear()`: to clear the setting and restore the default values.

To get the status of a property, call `onChange()` or `get()` which returns a details object via a callback with the following relevant fields:

- [`levelOfControl`](https://developer.chrome.com/docs/extensions/reference/types/#type-LevelOfControl): The level of control of the setting. Check if the setting can be controlled by your extension before calling `set()` to change a setting's value. Keep in mind that if the admin has an explicit policy to disable or enable a setting, the `levelOfControl` will be `not_controllable` and you will not be able to configure it with the API.
- `value`: The value of the setting. All accessibility feature properties are of type boolean except for `animationPolicy` which is an enum consisting of `allowed`, `once`, or `none`.

As an example, let's toggle the virtual keyboard feature by first checking whether the property is configurable by this extension.

```js
const virtualKeyboard = chrome.accessibilityFeatures.virtualKeyboard;
virtualKeyboard.get({},
	(details) => {
		// check the level of control for virtual keyboard
		if (details.levelOfControl == 'controllable_by_this_extension' || details.levelOfControl == 'controlled_by_this_extension') {
			// disable if virtualKeyboard is currently on
			if (details.value) {
				virtualKeyboard.set({value: false}, () => console.log('Virtual keyboard has been disabled');
			} else { // enable if virtualKeyboard is currently off
				virtualKeyboard.set({value: true}, () => console.log('Virtual keyboard has been enabled');
			}
		} else {
			// the setting is not controllable by this extension because it cannot be controlled by any extension or it's being controlled by an extension with higher precedence
			console.log('Virtual keyboard setting cannot be changed.');
```

First call `get()` on the `virtualKeyboard` property to read the level of control available and the current value of the property. If it can be controlled by this extension or is already being controlled by this extension, then it's safe to call `set()`and toggle the `virtualKeyboard` property value. If the property cannot be controlled, communicate to the user that this setting cannot be toggled and recommend they reach out to their system administrator, if appropriate.

The available properties that can be configured with the
`chrome.accessibilityFeatures` API are grouped into the following categories; text-to-speech, display and magnification, keyboard and text input, cursor and touchpad.

### Text-to-speech

Text-to-speech features allow text on screen to be read aloud with the ChromeOS built-in screen reader. Whether a user has visual impairments, is unable to read, or otherwise prefers to listen to text rather than read it, these features allow those users to interact with the device.

- `selectToSpeak`: Controls the select-to-speak feature which allows users to select text on the screen to be read aloud.
- `spokenFeedback`: Controls the [ChromeVox](https://support.google.com/chromebook/answer/7031755?hl=en) feature, a screen reader that reads aloud the text on the screen, and the names of buttons, links, and other elements.

### Display and magnification

Display and magnification features change display colors and provide magnification options making the screen easier to read and objects easier to find.

- `highContrast`: Controls the color inversion feature which changes the color scheme to one with increased contrast.
- `screenMagnifier`: Controls the full-screen magnifier feature which zooms in to make items on the screen bigger.
- `dockedMagnifier`: Controls the docked magnifier feature which magnifies focused areas of the screen in a split-screen view.

![A view of the chromeOS.dev home page with the docked magnifier feature on and focused on the word "world."](ix://kiosk/accessibility/inline-2%20.png)

### Keyboard and text input

Keyboard and text input features give users different options to interact with content and input items on the screen.

- `virtualKeyboard`: This property controls the on-screen keyboard feature which lets users type without using a physical keyboard.
- `dictation`: This property controls the dictation feature which allows users to type text by speaking into a microphone, controlling input with their voice.
- `switchAccess`: This property controls the switch access feature which allows users to control their device with switches (keyboard keys, gamepad buttons, and other dedicated switch devices).
- `stickyKeys`: This property controls the sticky keys feature which lets users press one key at a time for keyboard shortcuts instead of holding down multiple keys at once.
- `focusHighlight`: This property controls the keyboard focus highlighting feature which highlights the object that has keyboard focus. Users navigate through objects using the [[TAB]] key or selecting with the mouse cursor.
- `caretHighlight`: This property controls the text cursor (caret) highlight feature which shows a focus ring around the text cursor when it appears or moves.

### Cursor

Cursor features customize the cursor making it easier to find on screen and easier to use.

- `autoclick`: This property controls the automatic clicks feature which allows the mouse cursor to automatically click where it stops.
- `largeCursor`: This property controls the large cursor feature which increases the mouse cursor size to be more visible.
- `cursorColor`: This property controls the cursor color feature. The value for the `cursorColor` property only indicates whether the feature is enabled or not. It does not indicate the cursor color.
- `cursorHighlight`: This property controls the cursor highlight feature which shows a focus ring around the mouse cursor when it's moving.

## Hardware-level kiosk accessibility

As with other apps, the accessibility of a kiosk app is also impacted by the device that it's deployed to. Developers must further work with their hardware team to ensure that their kiosk app is accessible on a hardware-level.

Kiosk apps can be installed on any ChromeOS system, ranging from non-interactive displays to interactive platforms. Whenever a user is expected to interact with a kiosk app, certain hardware-level accessibility standards are recommended:

- Kiosk apps should be reachable and accessible to those who may be using a wheelchair or similar mobility aid.
- Kiosk hardware should include the option for a physical keyboard and mouse.
- Kiosk apps should have a headphone jack and microphone support.
- Kiosk hardware should have a screen of sufficient size and resolution to ensure text and imagery are clear and visible.

Kiosk accessibiliy relies on a lot of things: policy controls, APIs, and hardware. But at its heart, kiosk accessibility is web accessibility. To achieve better accessibility in your kiosk app, follow the above recommendations and best practices, conduct thorough user testing, and review the [WCAG 2](https://www.w3.org/WAI/standards-guidelines/wcag/) guidelines.
