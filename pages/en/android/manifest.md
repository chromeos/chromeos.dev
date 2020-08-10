---
title: Manifest compatibility
metadesc: As you prepare your Android app to run on Chromebooks, you should consider the device features that your app uses.
date: 2020-05-01
weight: -1
tags:
  - touchscreen support
---

As you prepare your Android app to run on Chromebooks, you should consider the device features that your app uses. Chromebooks don't support all of the hardware and software features that are available on other devices running Android. If your app requires specific features that aren't supported on Chromebooks, it won't be available for installation on Chromebooks.

You declare your app's requirements for hardware features and certain software features in the [manifest file](https://developer.android.com//guide/topics/manifest/manifest-intro). This document describes the app manifest feature declarations that aren't compatible with Chromebooks.

## Incompatible manifest entries

The manifest entries listed in this section aren't currently compatible with Chromebooks. If your app uses any of these entries, consider removing them or including the `required="false"` attribute value with them so that your app can be installed on Chromebooks. For more information about declaring feature use without requiring that the feature be available on the device, see the guide for the [`<uses-feature>`](https://developer.android.com//guide/topics/manifest/uses-feature-element.html#market-feature-filtering) manifest element. For a complete list of app manifest features and descriptions, see the [Features reference](https://developer.android.com//guide/topics/manifest/uses-feature-element#features-reference).

!!! aside.message--note
**Note:** Android Studio 2.3 and above has built-in lint checks to automatically validate the manifest file. In Android Studio select **File > Settings > Editor > Inspections > Android > Lint > Correctness > Chrome OS**.
!!!

### Hardware features

Support for hardware features varies on Chromebooks. Some features aren't supported on any Chromebooks while others are supported on some Chromebooks.

### Special features

The following list includes features that were implemented to better support Chromebook hardware:

- `android.hardware.type.pc` - This disables the input emulation and allows you to develop custom behavior for mouse and touchpad. Note that you must indicate `required="false"` to prevent that you can only run on Chromebooks.

#### Unsupported hardware features

The following list includes the hardware features that aren't currently supported on Chromebooks:

- `android.hardware.camera` – Back-facing camera
- `android.hardware.camera.autofocus` – Camera that uses autofocus
- `android.hardware.camera.capability.manual_post_processing`  – Camera that uses the `MANUAL_POST_PROCESSING` feature, including functionality for overriding auto white balance
- `android.hardware.camera.capability.manual_sensor` – Camera that uses the `MANUAL_SENSOR` feature, including auto-exposure locking support
- `android.hardware.camera.capability.raw` – Camera that uses the `RAW` feature, including the ability to save DNG (raw) files and provide DNG-related metadata
- `android.hardware.camera.flash` – Camera that uses flash
- `android.hardware.camera.level.full` – Camera that uses `FULL`-level image-capturing support
- `android.hardware.consumerir` – Infrared (IR)
- `android.hardware.location.gps` – GPS
- `android.hardware.nfc` – Near-Field Communication (NFC)
- `android.hardware.nfc.hce` – NFC card emulation (_deprecated_)
- `android.hardware.sensor.barometer` – Barometer (air pressure)
- `android.hardware.telephony` – Telephony, including radio with data communication services
- `android.hardware.telephony.cdma` – Telephony Code Division Multiple Access (CDMA) network support
- `android.hardware.telephony.gsm` – Telephony Global System for Mobile Communications (GSM) network support
- `android.hardware.type.automotive` – Android Auto user interface
- `android.hardware.type.television` – Television (_deprecated_)
- `android.hardware.usb.accessory` – USB accessory mode
- `android.hardware.usb.host` – USB host mode

#### Partially-supported hardware features

The following list includes the hardware features that may be available on some Chromebooks:

- `android.hardware.sensor.accelerometer` – Accelerometer (device orientation)
- `android.hardware.sensor.compass` – Compass
- `android.hardware.sensor.gyroscope` – Gyroscope (device rotation and twist)
- `android.hardware.sensor.light` – Light
- `android.hardware.sensor.proximity` – Proximity (to user)
- `android.hardware.sensor.stepcounter` – Step counter
- `android.hardware.sensor.stepdetector` – Step detector

#### Touchscreen hardware support

As of Chrome OS version M53, all Android apps that don't explicitly require the [`android.hardware.touchscreen`](https://developer.android.com//guide/topics/manifest/uses-feature-element#touchscreen-hw-features) feature will also work on Chrome OS devices that support the [`android.hardware.faketouch`](https://developer.android.com//guide/topics/manifest/uses-feature-element#touchscreen-hw-features) feature. Devices that have fake touch interfaces provide a user input system that emulates basic touch events. For example, the user could interact with a mouse or remote control to move an on-screen cursor, scroll through a list, and drag elements from one part of the screen to another.

If you don't want your app to be installed on devices that have fake touch interfaces but not touchscreens, you can complete one of the following actions:

- Exclude specific devices in the [Google Play Console.](https://play.google.com/apps/publish)
- Filter devices with no touchscreen hardware by explicitly declaring [`android.hardware.touchscreen`](https://developer.android.com//guide/topics/manifest/uses-feature-element#touchscreen-hw-features) as being required in order to install your app.

### Software features

The following list includes the software features that aren't currently supported on Chromebooks:

- `android.software.app_widgets` – App Widgets on the Home screen
- `android.software.device_admin` – Device policy administration
- `android.software.home_screen` – Replaces device's Home screen
- `android.software.input_methods` – Custom input methods (instances of [`InputMethodService`](https://developer.android.com//reference/android/inputmethodservice/InputMethodService))
- `android.software.leanback` – UI designed for large-screen viewing
- `android.software.live_wallpaper` – Animated wallpapers
- `android.software.live_tv` – Streaming live TV programs
- `android.software.managed_users` – Secondary users and managed profiles
- `android.software.midi` – Musical Instrument Digital Interface (MIDI) protocol, which supports connecting to musical instruments and providing sound
- `android.software.sip` – Session Initiation Protocol (SIP) service, which supports video conferencing and instant messaging
- `android.software.sip.voip` – Voice Over Internet Protocol (VoIP) service based on SIP, which supports two-way video conferencing

## Permissions that imply feature requirements

Some permissions that you request in your manifest files can create implied requests for hardware and software features. By requesting these permissions, you'll prevent your app from being installed on Chromebooks.

For details about how to prevent permission requests from making your app unavailable on Chromebooks, see the [Incompatible manifest entries](#incompatible-manifest-entries) section of this page.

The following table shows the permissions that imply certain feature requirements which make an app incompatible with Chromebooks:

| Permission               | Implied Feature Requirement                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `CAMERA`                 | `android.hardware.camera` and `android.hardware.camera.autofocus` |
| `CALL_PHONE`             | `android.hardware.telephony`                                      |
| `CALL_PRIVILEGED`        | `android.hardware.telephony`                                      |
| `MODIFY_PHONE_STATE`     | `android.hardware.telephony`                                      |
| `PROCESS_OUTGOING_CALLS` | `android.hardware.telephony`                                      |
| `READ_SMSREAD_SMS`       | `android.hardware.telephony`                                      |
| `RECEIVE_SMS`            | `android.hardware.telephony`                                      |
| `RECEIVE_MMS`            | `android.hardware.telephony`                                      |
| `RECEIVE_WAP_PUSH`       | `android.hardware.telephony`                                      |
| `SEND_SMS`               | `android.hardware.telephony`                                      |
| `WRITE_APN_SETTINGS`     | `android.hardware.telephony`                                      |
| `WRITE_SMS`              | `android.hardware.telephony`                                      |
