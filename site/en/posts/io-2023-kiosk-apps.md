---
title: 'Google I/O: Developing kiosk apps for ChromeOS'
metadesc: Discover everything you need to develop a powerful kiosk app, without worrying about app deployment or device management.
tags:
  - event
  - web
hero:
  youtube: gQ6arLknnMY
  alt: Developing kiosk apps for ChromeOS. Talk delivered at Google I/O 2023 by Mike Rumely and Joyce Toh.
authors:
  - mrumely
  - joycetoh
date: 2023-05-10
---

_Edited transcript of "Developing kiosk apps for ChromeOS" talk at Google I/O 2023 by Mike Rumely (Partner Engineer on ChromeOS) and Joyce Toh (Developer Relations Engineer on ChromeOS)._

---

If you're familiar with ChromeOS, then you probably already know that it's a platform that supports Android, web, Linux apps, and Chrome extensions. Users can access their favorite apps by logging into a ChromeOS device. However, there's also another way to use ChromeOS to deliver your apps and services to users: kiosk mode.

Kiosk mode on ChromeOS allows apps to run fullscreen, in a locked down environment and without a user login. They can be deployed in schools for a secure and safe standardized testing environment. They can also serve as digital signage to display information or as customer-facing kiosks that provide self-service utilities in businesses.

ChromeOS allows you, the developer, to focus on releasing great features for your application, and leave app deployment and device management to Google's tooling.

## Getting started and requirements

To set up and manage a kiosk device, you'll need three things: a compatible device, a management license, and a kiosk app.

### Compatible devices

When it comes to hardware, ChromeOS offers a number of OEM choices or the option to convert devices through ChromeOS Flex.

#### OEM

ChromeOS OEM partners include HP, Acer and Lenovo and many others that produce Chromebooks, our laptops, and Chromeboxes, our desktops. They come in a variety of form factors and hardware configurations that can be customized for almost any use case. They are built with efficient power management capabilities that enable as much as [46% less energy consumption](https://chromeenterprise.google/os/sustainability/) than comparable competitor devices which is great for always on devices like kiosks or digital signage.

#### ChromeOS Flex

If you have a niche use case requiring specialized hardware or would like to extend the life of existing hardware, you can take advantage of ChromeOS with ChromeOS Flex. [ChromeOS Flex](https://chromeenterprise.google/os/chromeosflex/), is a cloud-first, fast, easy-to-manage, and secure operating system for PCs and Macs that comes with the same OS architecture, approach to management, UI/UX, and security controls as ChromeOS. Flex was also designed to be sustainable, reducing electricity consumption and associated [emissions by an average of 19%](https://chromeenterprise.google/os/sustainability/).

Flex can be installed on x86 based devices and to ensure a consistent and high-quality experience, Google individually certifies and maintains a [list of models](https://support.google.com/chromeosflex/answer/11513094?hl=en) that you can use with ChromeOS Flex. As of today, there are over 400 devices that have been certified.

To try Flex out, you only [need three things](https://support.google.com/chromeosflex/answer/11552529?hl=en&visit_id=638137373836865508-473284254&ref_topic=11551271&rd=1): an 8GB or larger thumb drive, a computer you want to modernize, and a few minutes.

So, whether it's for energy savings, reusing existing hardware or just trying out ChromeOS, you can [install ChromeOS Flex](https://support.google.com/chromeosflex/answer/11552529) today.

### Managed license

Just as important as the right hardware devices is a way to easily and efficiently manage them. Kiosk apps can only be deployed to managed devices so you will need a Chrome Enterprise, Chrome Education, or Kiosk and Signage license upgrade.

Once a device is enrolled and licensed in the admin console, you'll be able to configure policies for the fleet, lock them into kiosk mode, and get information and management controls via the **Google Admin** console.

## Google Admin Console

The **Google Admin** console is your one stop shop for managing ChromeOS devices. You can manage users if you've just hired new employees or started the school year, monitor device stats for fleet management workflows, and configure apps and extensions installed on your devices.

Let's take a closer look at some of the information and tools available in the **Google Admin** console.

### The Device Details page

On the left side of the **Google Admin** console, we have a set of commands we're able to perform on our enterprise managed devices. With managed ChromeOS devices, no middleware or additional software is needed to perform these commands. They are sent directly to the device and performed by the OS. The ability to perform remote commands such as **screenshot**, **remote desktop access**, and **reboots** are critical for kiosks which are often remotely installed and unattended.

Important components of the Device Details page include:

- **Hardware and OS:** Here, we can see device specs alongside platform and OS level information.
- **OS version policy compliance:** Administrators have complete control over device policies and settings which the OS management components ensure are enforced.
- **Custom fields:** These allow you to set commonly used administrative attributes, like IDs associated with asset tags or the location a device will reside in. These values are readable by the kiosk mode application running on the device.
- **System activity and troubleshooting:** Telemetry data like CPU utilization, temperature and RAM usage. System logs are also available here for remote collection and debugging.

### Policy management

One of the key features of all ChromeOS devices and especially in kiosk mode is the ability to centrally configure policies across a wide range of capabilities and features. There are hundreds, but let's focus on just a few key policies.

- **Kiosk settings:** There are high level policies that control device monitoring and alerting, URL blocking and virtual keyboard behavior.
- **Kiosk power settings:** Sustainability is a key consideration in "always on" kiosk and signage installations, so there are a set of policies that allow administrators to shape the idle and sleep timeouts to be more economic and energy efficient.
- **Kiosk accessibility:** And to support accessibility for your application, there are policies to support inclusiveness through accessibility features exposed at the OS level.

Many of these fields and functions available in the Admin console are also accessible through the [Directory](https://developers.google.com/admin-sdk/directory/v1/guides) and [Telemetry APIs](https://developers.google.com/chrome/management/guides/telemetry_api). These APIs allow for automation of tasks and management outside of the Admin Console.

## Creating a kiosk app

If you're creating a new kiosk app, you'll need to create a web app.

This means you can take advantage of the web technologies and Chrome features that you may already be familiar with. The web is a powerful platform that gives you the opportunity to unlock experiences for your users, and we're continuing to invest heavily to bring more features.

The advanced web capabilities efforts, also known as project Fugu, will make it possible for you to build great web apps and therefore, kiosk apps, with more native platform capabilities. For example, you can use the [`Web USB API`](https://developer.chrome.com/en/articles/usb/) to communicate with USB devices, like a receipt printer. Or save a user's edits to a photo on the local device with the [`File System Access API`](https://developer.chrome.com/articles/file-system-access/).

Kiosk mode PWAs also have the ability to store offline content, such as videos or other large files, using Service Workers and a data store like the [`Cache API`](https://web.dev/cache-api-quick-guide/) or [`IndexedDB`](https://web.dev/indexeddb/). Augmented with Workbox, a popular service worker library, your kiosk app can seamlessly run with or without an internet connection and persist any required application state.

For any capabilities that aren't available on the Web platform, you can enhance your kiosk app with an extension, allowing you to also take advantage of extension APIs.

Here are some APIs relevant to kiosk that you might be interested in:

- [`chrome.runtime.restart()`](https://developer.chrome.com/docs/extensions/reference/runtime/#method-restart) will restart the ChromeOS device that your kiosk app is running on.
- [`chrome.system.display`](https://developer.chrome.com/docs/extensions/reference/system_display/) lets you query and set display layout and properties.
- If your kiosk app plays audio, you can use the [`chrome.audio API`](https://developer.chrome.com/docs/extensions/reference/audio/) to get information and configure audio devices.

As extensions in your kiosk app are installed and managed by enterprise policy, there are also enterprise mode utilities available to you that lets you read device, hardware, and networking attributes. These are the `chrome.enterprise.*` APIs.

### Extension message passing

To protect user security, privacy, and trust on the open web, many of these APIs are only available to Chrome extensions installed via the Admin console or enforced by enterprise policy. So, you'll need to create a companion extension to use these APIs. Companion extensions can then connect to your kiosk-enabled PWA using message passing through `chrome.runtime`.

This paradigm helps make sure that these APIs, which provide access to sensitive information and capabilities, are not abused and are only allowed in managed devices and kiosk apps.

Let's take a look at what you'll need to set up for message passing.

1.  First up, is the extension manifest. In your manifest.json file you'll need to set the `externally_connectable` property which declares the extensions and web pages that can connect to your extension via `runtime.connect()` or `runtime.sendMessage()`. In our case, let's say we want to connect to chromeOS.dev.
1.  Then from your web page, send a message to the extension with `runtime.sendMessage()`. In this example, we're sending a custom message object with a `methodName` property set to the string `callRestart`. You'll also need to specify the ID of the extension that you want to connect to.
1.  And from your extension service worker, you can listen to the message with `runtime.onMessageExternal` or `runtime.onConnectExternal`. We'll also check the `methodName` property and if it matches `callRestart`, that's our cue that the kiosk app has requested to restart the device, which we can do by calling `chrome.runtime.restart()`.

One major difference to note is that in kiosk mode, the Chrome browser address bar and extension icons aren't visible to the user. The app essentially takes up the full screen. So, make sure that you implement your extension so that no direct user interaction with a popup, options, or any other extension HTML page is required.

## Publishing and deployment

Since your app is a web app running in ChromeOS kiosk mode, you can publish your app just like any other web app—self hosted or on any cloud service. You can then deploy it for your own managed domain, or send your app's URL to your customer for them to deploy it to their domain.

To deploy your app to your fleet:

1.  Navigate to the **Kiosk settings** page on **Google Admin Console**.
1.  Choose the organizational unit you'd like to deploy to then click the "plus sign" floating action button and choose **Add by URL**.
1.  Enter in the URL of your web app.
1.  You should then see a prompt about permission granting. Normally, applications that utilize permissions, such as the use of cameras, would need to be accepted by the user. In kiosk mode, permissions are automatically granted on behalf of the managed user. This ensures the application works without the user being prompted.

Once you've added your kiosk app, you can also optionally set it to auto-launch. In the same Kiosk page, you'll see the **Auto-launch app** option and a dropdown to choose between all the kiosk apps you've installed. If you also have a companion extension, you can install your extension with your kiosk app. Click on your kiosk app and click **Add Extension**.

These changes will automatically be rolled out to the devices you've specified so that on the next reboot, they'll be able to launch your kiosk app.

## Partners

Enterprises big and small are using ChromeOS in a variety of ways to modernize and digitize their in person customer and user experiences.

[Arreya Digital Signage](https://arreya.com/features/chrome/) is a software service and a Chrome Enterprise Recommended Partner, who uses ChromeOS for Kiosk and Digital Signage deployments. They align with ChromeOS in the value of automatic updates, the ease of intuitive remote management tools, the security built-in to the OS itself and reduction in overhead for customers through reduced deployment time.

And if you've been to a Buffalo Wild Wings in the last couple years, you've experienced a ChromeOS device running [UPshow](https://www.upshow.tv/). UPshow delivers a unified customer and employee experience with their performance marketing cloud, all powered by ChromeOS.

## Stay tuned for more about kiosk

Whatever your use case, ChromeOS is a secure and reliable platform that can help you deliver an integrated solution for your customers and users. Kiosk mode gives you the built-in security and capabilities of ChromeOS while also giving you and your customers the tools to manage and monitor devices and apps.

Our team is continuing to improve the kiosk development experience for you, so be on the lookout for more APIs and features coming soon to kiosk. A good way to stay up-to-date on kiosk news is to go to sign up for [our developer newsletter](/{{locale.code}}/subscribe).
