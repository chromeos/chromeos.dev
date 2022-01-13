---
title: ADB and testing Android apps
metadesc: Walkthrough the different ways developers can deploy their apps to Chromebooks, in order to debug and verify their app performance in the Chrome OS form factors.
date: 2021-08-13
weight: -6
tags:
  - android studio
---

Being able to run Android apps on a Chromebook is great, it gives users access to the vast Android ecosystem offerings and it gives Android developers the opportunity to reach Chrome OS users.

Developers should make a point to verify their apps on different form factors, since this will help improve users' experiences. This is why Chrome OS provides Android developers with the tools to deploy and test their apps on Chromebooks.

Whether developers are deploying their Android app directly from Chrome OS (using Android Studio in your Chromebook) or from another device, developers can use [ADB](https://developer.android.com/studio/command-line/adb) to deploy their apps and debug different interactions with Chromebooks. For more details checkout the steps below.

## Enable ADB debug

Previously, using ADB on your Chromebook was only possible while in developer mode, which requires powerwashing (resetting) the device and can reduce security. Luckily since Chrome 81, developers can keep their devices out of developer mode and still deploy apps they develop directly in Chrome OS, with the flip of a switch. Here is how:

First, make sure the Chromebook is not in [developer mode](https://chromium.googlesource.com/chromiumos/docs/+/master/developer_mode.md). Then go to settings and [turn on Linux](/{{locale.code}}/linux) (if you haven't done so before).

![Turn on Linux on Chrome OS](ix://develop/android/deploy/turnon_linux.gif)

Once Linux is available open the Linux settings and you'll find a new option 'Develop Android apps', open that option.

Toggle enable ADB debugging and the computer will restart.

![Enable Chrome OS' ADB debug settings](ix://develop/android/deploy/debug_settings.gif)

!!! aside.message--note
**Note:** If the ADB toggle is not available after enabling Linux, or if it can’t be toggled, you may have to factory reset your device.
!!!

When the computer restarts you'll see a message that lets you know that there may be applications that were not downloaded from the app store on the device.

![This device may contain apps that haven't been verified by Google](ix://develop/android/deploy/login_notice.jpg)

ADB is now available to deploy apps to your Chromebook, run debugging commands and interact directly with the device.

To ensure that your Android app works well on a variety of Chromebook devices and available form factors, Google recommends that you test your app on the following devices:

- An ARM-based Chromebook
- An x86-based Chromebook
- A device with a touchscreen and one without one
- A convertible device; that is, one that can change between a laptop and a tablet
- A device with a stylus

## Deploy from Chrome OS

After enabling ADB debugging, you can load an Android app directly onto your Chrome OS device using [Android Studio](#deploy-with-android-studio) or if you have an APK you can [load it using the Terminal.](#deploy-with-terminal)

### Deploy with Android Studio

After you have set up [Android Studio](https://developer.android.com/studio/install#chrome-os) and
ADB as described above, you can push your apps to the Chromebook's Android container directly from Android Studio.

The Chromebook will appear as an option in the device drop down:

![Android Studio devices dropdown](ix://develop/android/deploy/as_devices.png)

Now you can push your app like any other Android device! The ADB authorization
dialog appears the first time you try to push to a new device. After you authorize it, your application will launch in a new window.

![Deploy your app directly into Chrome OS](ix://develop/android/deploy/run_app.gif)

That's it, you can now deploy the app to the Chromebook, test and debug _without_ the hassle of being in developer mode.

### Deploy with Terminal

Install ADB if necessary:

```bash {title="Sample Bash" .code-figure}
sudo apt install adb
```

Connect to the device:

```bash {title="Sample Bash" .code-figure}
adb connect arc
```

An authorization popup for USB debugging appears the first time you try to deploy to the device, and you'll need to allow it.

![Authorization to connect to the device](ix://develop/android/deploy/usb_dialog.png)

Install your app from the terminal:

```bash {title="Sample Bash" .code-figure}
adb install [path to your APK]
```

![Connect to the device through ADB in the terminal](ix://develop/android/deploy/adb_connect.gif)

## Deploy from another device

If you can't use the method described above and need to push your app from another device, you can connect the device to ADB using [USB](#connect-to-adb-over-usb) or a [network address](#connect-to-adb-over-a-network).

### Connect to ADB over a network {: #adb-ip}

1. Make sure you [enabled ADB debugging.](#enable-adb-debug)

Get the IP address of your Chromebook:

1.  Click the clock in the bottom-right area of the screen.
1.  Click the gear icon.
1.  Click the network type you are connected to (Wi-Fi or Mobile data) then the name of the network.
1.  Take note of the IP Address.

!!! aside.message--tip
**Tip:** Another quick way to find your chromebook's IP address is to click the clock in the bottom-right, click the wifi icon, and click the info button.
!!!

Connect to your Chromebook:

1.  Return to your development machine and use ADB to connect to your Chromebook using its IP address:

    ```bash {title="Sample Bash" .code-figure}
    adb connect <ip_address>
    ```

1.  On your Chromebook, click Allow when prompted whether you want to allow the debugger. Your ADB session is established.

#### Troubleshooting ADB debugging over a network

!!! aside.message--note
**Note:** If your network prohibits these kinds of connections, you can set up your own router or hotspot, or you can try ethernet via a port or dongle.
!!!

Sometimes the ADB device shows that it's offline when everything is connected properly. In this case, complete the following steps to troubleshoot the issue:

1.  Deactivate **ADB debugging** in _Developer options_.
2.  In a terminal window, run `adb kill-server`.
3.  Re-activate the **ADB debugging** option.
4.  In a terminal window, attempt to run `adb connect`.
5.  Click **Allow** when prompted whether you want to allow debugging. Your ADB session is established.

### Connect to ADB over USB

To push your APK from another device into the Chromebook via USB, you must start your Chrome OS in [developer mode](https://chromium.googlesource.com/chromiumos/docs/+/master/developer_mode.md) so that you can configure the Chromebook and push apps from the host machine. This is the only method that currently requires Developer Mode, and [it only works on a small number of devices](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-adb-debugging-over-usb). Because of this, it's recommended to [use ADB over the network instead](#connect-to-adb-over-a-network). If you'd still like to proceed, follow these steps to get into [developer mode](/{{locale.code}}/productivity/experimental-features#developer-mode).

!!! aside.message--warning
**Caution:** After switching your Chrome OS device to developer mode, it restarts
and clears all existing data on the device. The security level of the device is
also significantly reduced.
!!!

1. Make sure you [enabled ADB debugging.](#enable-adb-debug)
1. Determine if your device [supports USB debugging](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-adb-debugging-over-usb)
1. Press [[Control]]+[[Alt]]+[[T]] to start the Chrome OS terminal.
1. Type `shell` to get to the bash command shell:

   ```bash {title="Sample Bash" .code-figure}
   crosh> shell
   chronos@localhost / $
   ```

1. Type the following commands to set up your device:

   ```bash {title="Sample Bash" .code-figure}
   $ sudo crossystem dev_enable_udc=1
   $ sudo reboot
   ```

1. After rebooting, open the terminal again and run the following command to enable ADB on the Chromebook's USB port:

   ```bash {title="Sample Bash" .code-figure}
   $ sudo ectool usbpd <port number> dr_swap
   ```

Use this command each time you disconnect and reconnect a USB cable. To ensure your Chromebook is in UFP mode, you can run `ectool usbpd <port number>`.

1. Plug in a USB cable to a [supported port](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-adb-debugging-over-usb) on your device
2. Run `adb devices` from the Android SDK platform tools on your host machine to see your Chromebook listed as an ADB supported device
3. On your Chromebook, click **Allow** when prompted whether you want to allow the debugger. Your ADB session is established.
