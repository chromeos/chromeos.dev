---
title: Start building
metadesc: Chrome OS supports the Google Play Store and Android apps. Learn how a few key tweaks to your existing Android app can enable them to run on Chromebooks and expand your app's reach.
weight: -7
tools:
  - name: Android
    url: https://www.android.com/versions/pie-9-0
    versions:
      min: 6.0 Marshmallow
      max: 9.0 Pie
  - name: Android Studio
    url: https://developer.android.com/studio
    versions:
      min: 3.0
      max: latest
date: 2020-05-01
---

Chrome OS devices, such as Chromebooks, now support the Google Play Store and Android apps. This article assumes you have an existing Android app designed for phones or tablets that you want to optimize for Chromebooks. To learn the basics of building Android apps, see [Build your first app.](https://developer.android.com/training/basics/firstapp/index)

## Update your app's manifest file

To get started, update your manifest file to account for some key hardware and software differences between Chromebooks and other devices running Android.

As of Chrome OS version M53, all Android apps that don't explicitly require the [`android.hardware.touchscreen`](https://developer.android.com/guide/topics/manifest/uses-feature-element.html#touchscreen-hw-features) feature will also work on Chrome OS devices that support the `android.hardware.faketouch` feature. However, to ensure your app works on all Chromebooks, go to your manifest file and adjust the settings so that the `android.hardware.touchscreen` feature is not required, as shown in the following example. Removing the requirement for touch input means you should also review your app's support for [mouse and keyboard interactions](https://developer.android.com/training/gestures/movement).

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" ... >
  <!-- Some Chromebooks don't support touch. Although not essential,
        it's a good idea to explicitly include this declaration. -->
  <uses-feature android:name="android.hardware.touchscreen"
                android:required="false" />
</manifest>
```

Different hardware devices come equipped with different sets of sensors. Although Android handheld devices often have GPS and accelerometers, these sensors are not guaranteed to be available in every Chromebook. However, there are cases where the functionality of a sensor is provided in another way. For example, Chromebooks may not have GPS sensors, but they still provide location data based on Wi-Fi connections. See the [Sensors overview](https://developer.android.com/guide/topics/sensors/sensors_overview) document for an overview of all of the sensors that the Android platform supports. If you want your app to run on Chromebooks regardless of sensor availability, you should update your manifest file so that none of the sensors are required.

Note: If you don't require a particular sensor for your app but still use measurements from the sensor when it's available, make sure you dynamically check for the sensor's availability before trying to gather information from it in your app.

Some software features are unsupported on Chromebooks. For example, apps that provide custom IMEs, app widgets, live wallpapers, and app launchers aren't supported and won't be available for installation on Chromebooks. For a complete list of software features that aren't currently supported on Chromebooks, see [incompatible software features](/{{locale.code}}/android/manifest#software-features).

## Update your target SDK

By updating the [`targetSdkVersion`](https://developer.android.com/reference/android/R.attr#targetSdkVersion) attribute to the latest API level available, your app can take advantage of all the improvements in the Android platform. For example, Android 7.0 (API level 24) brings enhancements to multi-window support. It allows you to resize activities with free-form resizing, making them feel more natural. You can also access APIs for drag-and-drop operations across apps and custom mouse cursors.

## Check for networking requirements

Chromebooks run the entire Android OS in a container, similar to Docker or LXC. This means that Android will not have direct access to the system's LAN interface. Instead, IPv4 traffic will pass through an internal layer of network address translation (NAT), and IPv6 unicast traffic will be routed through an extra hop. Outbound unicast connections from an Android app to the internet should mostly work as-is; but in general, inbound connections are blocked. Multicast or broadcast packets from Android will not be forwarded to the LAN through the firewall.

As a special exception to the multicast restriction, Chrome OS runs a service that forwards mDNS traffic between Android and the LAN interface, so the standard [Network Service Discovery](https://developer.android.com/training/connect-devices-wirelessly/nsd) APIs are the recommended way to discover other devices on the LAN segment. After finding a device on the LAN, an Android app can use standard TCP or UDP unicast sockets to communicate with it.

IPv4 connections originating from Android will use the Chrome OS host's IPv4 address. Internally, the Android app will see a private IPv4 address assigned to the network interface. IPv6 connections originating from Android will use a different address from the Chrome OS host, as the Android container will have a dedicated public IPv6 address.

## Use cloud and local storage effectively

One of the strongest features of Chromebooks is that users can easily migrate from one device to another. That is, if someone stops using one Chromebook and starts using another, they simply have to sign in, and all of their apps appear.

To further improve this experience, you should back up your app's data to the cloud to enable syncing across devices. That said, apps should not depend on an internet connection for normal operation. Apps should save a user's work locally if the device is offline and sync to the cloud once the device is back online. For example, Google Docs allows users to edit their docs offline and sync the changes to the cloud once the device gets connectivity.

Chromebooks can also be shared among a large number of people, such as in schools. Since local storage is not infinite, entire accounts—together with their storage—can be removed from the device at any point. For educational settings, it's a good idea to keep this scenario in mind.

## Update the NDK libraries

If your app uses the Android NDK libraries, and its target SDK version is 23 or higher, ensure that text relocations are removed from both the ARM and x86 versions of your NDK libraries, as they're not compatible in Android 6.0 (API level 23) and higher. By leaving text relocations in your NDK libraries, you may also cause incompatibility errors with Chromebooks, especially when running on a device that uses an x86 architecture.

Note: To view more details on updating NDK libraries properly, see the [Runtime](https://developer.android.com/about/versions/marshmallow/android-6.0-changes#behavior-runtime) section of the Android 6.0 Changes document.

## Develop new test cases for your app

First, make sure that the proper manifest flags are specified. These flags include the desired orientation, where setting [`screenOrientation`](https://developer.android.com/reference/android/R.attr#screenOrientation) `unspecified` is best. If you specify the orientation as `landscape`, consider using `sensorLandscape` instead to make sure that the experience on a tablet is optimal. If you have special size or orientation requests you should also consider adding the new meta tags as size or orientation hints—which only affects desktop environments. If you also want to change it on phones, you should specify layout [`defaultHeight`](https://developer.android.com/reference/android/R.attr.html#defaultHeight), [`defaultWidth`](https://developer.android.com/reference/android/R.attr.html#defaultWidth), or [`minHeight`](https://developer.android.com/reference/android/R.attr.html#minHeight) instead.

If you are interested in specific input device handling for specific device categories, you should specify `android.hardware.type.pc` to disable the input compatibility mode.

If you are using any kind of networking, make sure that the app is able to reconnect to the network after a connection problem is resolved or the device wakes from sleep mode.

Google recommends checking the [Test cases for Android apps on Chrome OS](/{{locale.code}}/android/tests), which you can use in your own test plan. The test cases cover a wide array of common scenarios that Android apps should be prepared for if they are expected to run on Chrome OS devices.

### Multi-window and orientation changes

Chrome OS's multi-window environment can make state persistence and recall issues more obvious. You should
use [`ViewModel`](https://developer.android.com/topic/libraries/architecture/viewmodel) to save and restore your state when appropriate.

To test state persistence you should minimize your app for some time, start another resource intensive process and then restore your app to validate that it returns to the state in which you left it.

Test window resizing by pressing the full screen key (F4), maximizing, and restoring. Test free resizing by enabling it in the developer options and checking that your app smoothly resizes without crashing.

If your Chrome OS device supports it, change from laptop into tablet mode to see that everything works as expected. Rotate the device once in tablet mode to test orientation changes. Transition back into laptop mode. Repeat this step a few times.

Make sure that the top bar is not breaking your app by offsetting UI elements or location-based touch input. For Chrome OS devices, make sure that your app does not place important information in the status bar area.

If you are using the camera or other hardware features—like the pen—make sure that it behaves properly when performing the window and device changes as outlined above.
