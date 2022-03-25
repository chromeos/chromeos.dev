---
title: Chrome OS LTS for Developers
metadesc: Understand how to validate your application works with the way schools deploy Chrome OS.
date: 2021-03-21
weight: -1
tags:
  - web
---

[Chrome OS LTS](https://support.google.com/chrome/a/answer/11333726?hl=en) is the long term support channel (LTS) for Chrome OS devices and is targeted to education and enterprise users of Chrome OS. Normally, Chrome OS receives a new update every four weeks to its stable channel. The long-term support channel has a slower release cadence; devices still continue to receive frequent security fixes, but they only get feature updates every 6 months. Many schools have already moved to the LTS channel as it lowers their burden to certify that the version of Chrome OS that they have deployed works with all their applications.

## How should I test my app for LTS users?

To ensure that your app works for schools and enterprises, you will want to make sure that your app can be deployed on an LTS channel and then certify that all functionality works within that LTS channel and the previous LTS channel. The LTS channel is updated every six months, with a six version difference. That means that if today the LTS channel is on Chrome 96, you can expect that the next LTS release will be Chrome 102, released six months from now. The [current release schedule](https://chromiumdash.appspot.com/schedule) is available online and shows detailed information about each release.

There is also a long-term support candidate (LTC) release that occurs every six months. Three months after the LTS release, the LTC release starts to get updated, and continues to be updated until the next LTS release. You can expect the LTC will be functionally equivalent to the next LTS release. We encourage education developers to start testing their application on the dev channel of a Chromebook to prepare for the next LTC candidate three months after release of the LTS channel.

### How can I install a Chrome OS LTS/LTC version on my Chromebook for testing?

If you are interested in using an LTS/LTC release on your Chromebook to test your application, you can follow [these instructions](https://support.google.com/chrome/a/answer/11333726) to deploy an LTS license to a device.

## What happens if I implement new features in my app or extension?

### Web Applications

#### Feature Detection

If you are planning on implementing new features within your application that are available in future versions of Chrome, you can gate those features by checking for their existence in the browser first and then if they do not exist, make sure that a graceful fallback exists. For instance, if you wanted to utilize something like WebGPU, you would do the following:

```javascript {title="JavaScript" .code-figure}
if ('gpu' in navigator) {
  // WebGPU is supported! Accelerate computation.
} else {
  // No WebGPU, fallback to JavaScript implementation.
}
```

This allows you to focus on only one application and ensures that you are not only compatible with Chrome but all browsers and is the recommended way to handle new web features.

#### Separate hosted instances

If you would rather have multiple instances of your application, you can alternatively serve the LTS version to users that have paid for an LTS version of your application after they login. This raises the burden on your organization to serve the right content to the right users, but may be a better approach as organizations know that the application won’t be changing during the six months of the LTS deployment. You can then update your application based on the subscribers' preference.

### Android Applications

#### Backwards compatibility

Android applications are also meant to be backwards compatible with previous versions of Android since there are multiple versions and form factors of Android released. The benefit of releasing your application this way is that you have one application to manage rather than multiple applications. If you are building an Android application, it is important to continue to certify your release of the application against LTS and LTC to make sure that it is compatible with both versions of Chrome OS.

#### Multiple Android Applications

An alternative to the approach above is to release an LTS version of your application to the Play Store. The caveat to this is that it could potentially confuse your users on why there are multiple instances of your application in Play and which one to use. If you are releasing an LTS version of your application only for Chrome OS, you will want to specify that the application is only for Chrome OS by placing the following in your AndroidManifest.xml file.

```xml {title="AndroidManifest.xml" .code-figure}
<uses-feature android:name="org.chromium.arc" android:required="true" />
```

This line specifies to Play that this app can only be delivered to Chrome OS devices.

### Chrome Extensions

#### Extension Version Pinning

If you want your Chrome extension to be compatible with LTS versions, you can ask your customers to pin that version of the Chrome Extension in the Chrome Admin Console. You can refer your customers to the [documentation here](https://support.google.com/chrome/a/answer/11190170?hl=en) which explains how to pin extensions and some caveats associated with pinning.
