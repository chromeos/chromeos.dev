---
title: 'ADB over Wi-Fi and Ethernet'
metadesc: Test Android apps on real devices with ADB over Wi-Fi and Ethernet.
date: 2023-08-18
tags:
  - android
---

Android developers need to test their apps on real devices. [Android Debug Bridge (ADB)](https://developer.android.com/tools/adb) is the tool of choice for pushing apps and debugging. There are three main ways ADB can be used:

1.  ADB over USB
1.  ADB over Wi-Fi
1.  ADB over Ethernet

For most phones and tablets, you can connect an Android device to your development machine using a USB-C cable and ADB will "just work." As of June 2023, most Chromebooks do not support ADB over USB, leaving the two other methods: Wi-Fi and Ethernet.

!!! aside.message--note
**Note:** You can also use [ADB over Bluetooth](https://developer.android.com/training/wearables/get-started/debugging) for WearOS devices
!!!

## ADB over Wi-Fi

If your device is running Android 11 (API 30) or higher, you can use the [**Pair Devices Using Wi-Fi**](https://developer.android.com/tools/adb#connect-to-a-device-over-wi-fi) functionality that ships with Android Studio.

For devices running Android 10 or lower, or if you are having trouble pairing via Android Studio, you can manually connect using an IP device and the terminal.

1.  Ensure that your development machine and Android device are on the same wireless network.
1.  Ensure that your network allows traffic on port `5555` (or another manually chosen port). Some enterprise and home networks have firewalls that will prevent ADB from functioning. You can also use a mobile phone as a wireless network hub to provide a network that allows port `5555` traffic, although this may result in a large amount of network traffic and battery drain for the phone.
1.  For non-ChromeOS phones and tablets, you need to enable TCP/IP mode. To do so, connect your Android device to your development machine via USB and run the command `adb tcpip 5555` on the development machine. This will put the device into TCP/IP mode listening on port 5555. Once enabled, you can disconnect the USB cable.
1.  Determine the IP address of your device. [IPv4 addresses](https://en.wikipedia.org/wiki/Internet_Protocol_version_4) are the most common type of addresses and look something like this: `192.168.1.4`. [IPv6 addresses](https://en.wikipedia.org/wiki/IPv6_address) are becoming more prevalent and look something like this: `2001:0db8:3c4d:0015:0000:0000:1a2f:1a2b`. If your device lists both, use the IPv4 address.
    1.  On phones/tablets, go to Android settings, information, and scroll down until you see your **IP address**.
    1.  On ChromeOS, click the clock at the bottom right, click the drop-down under the network icon, and then click on the network you are currently connected to. Under the **Network** heading you will see the IP address assigned to your Chromebook.
1.  On your development machine, type `adb connect IP_ADDRESS_FROM_STEP4`, e.g., `adb connect 192.168.1.4`. You can also manually specify the port like `adb connect 192.168.1.4:5555`.
1.  Use ADB or Android Studio as usual. You can verify the connection by running `adb devices`.

!!! aside.message--tip
**Tip:** For more information, see [Connect to a device over Wi-Fi](https://developer.android.com/tools/adb#wireless).
!!!

## ADB over Ethernet

In some cases, it may not be possible to use a Wi-Fi network due to firewall restrictions, or a wired solution may simply be preferable. In these cases, you can connect over an Ethernet cable. The steps are similar to ADB over Wi-Fi but using an Ethernet cable.

## Prerequisites

Before you get started, you need to ensure that your device supports Ethernet connectivity:

- **Ethernet cable:** A physical cable to run between your devices. Ethernet types Cat 5/5e/6/6a are all fine.
- **Ethernet port:** An Ethernet port for both your test device and your development machine.

!!! aside.message--note
**Note:** If your device does not have an Ethernet port, you can instead use an Ethernet dongle that connects to your device via USB and provides Ethernet capability.
!!!

![A USB-A Ethernet dongle.](ix://android/adb/ethernet.jpg)
_A USB-A Ethernet dongle._

#[A complete ADB over Ethernet setup including USB-A Ethernet dongle, CAT6 Ethernet cable, USB-A Ethernet dongle, and USB-A to USB-C adapter.](ix://android/adb/double-ethernet.jpg)

## Connecting ADB over Ethernet

Once you have physically connected your devices with an Ethernet cable, you can enable ADB over the connection.

!!! aside.message--note
**Note:** These instructions assume your local network is running on the `192.168.1.x` address space.
!!!

!!! aside.message--alert
**Alert:** For non-ChromeOS phones and tablets, you may need to enable TCP/IP mode. To do so, connect your Android device to your development machine via USB and run the command `adb tcpip 5555` on the development machine. This will put the device into TCP/IP mode listening on port 5555. Once enabled, you can disconnect the USB cable.
!!!

1.  On your development machine, take note of the IP address assigned to the Ethernet adapter. If no address is assigned, you may need to manually set this address, either to something in the `192.168.1.x` range like `192.168.1.3`, or configure your adapter to connect on the local network only and not to use DHCP:
    1.  For Windows, see [Change TCP/IP settings](https://support.microsoft.com/en-us/windows/change-tcp-ip-settings-bd0a07af-15f5-cd6a-363f-ca2b6f391ace), section "To specify IPv4 settings manually." Set the IP address to `192.168.1.3`.
    1.  For Mac, see [Use DHCP or a manual IP address on Mac](https://support.apple.com/guide/mac-help/use-dhcp-or-a-manual-ip-address-on-mac-mchlp2718/mac), and follow the directions for a manual IP address. Set the IP address to `192.168.1.3`.
    1.  For Linux, use your distributions graphical tool to manually set the ip address or set it from the terminal as follows: run `ifconfig` to find your adapter's identification, then use it in place of `enx00eXXXXXXXXX` when running `sudo ifconfig enx00eXXXXXXXXX 192.168.1.3 broadcast 192.168.255.255 netmask 255.255.0.0`. This will change the IP address to `192.168.1.3.`
1.  On the Chromebook you will be debugging, set the Ethernet address to be in the same network range as your development machine:
    1.  Press [[CTRL]]+[[ALT]]+[[T]] to open crosh, the ChromeOS shell.
    1.  Type `shell` and press Enter.
    1.  Type `ssh root@localhost`
    1.  Type `yes` to accept the SSH (Secure Shell Protocol) fingerprint if asked
    1.  The default password is `test0000`
    1.  Type `ifconfig eth0 192.168.1.2`. This will set the first Ethernet device to the address `192.168.1.2` (remember this for later). If `eth0` does not exist, use `ifconfig` to list all the network devices and determine the correct identifier for your Ethernet port or dongle.
1.  On your development machine, type `adbconnect 192.168.1.2`. You can also manually specify the port with `adb connect 192.168.1.2:5555`.
1.  Use ADB or Android Studio as usual. You can verify the connection by running `adb devices`.
