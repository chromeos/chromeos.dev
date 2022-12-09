---
title: Long-term support releases
metadesc: Understand ChromOS's long-term support release cycle, why long-term releases are important, how to test with them, and how to manage changes between them.
date: 2021-03-21
weight: -7
tags:
  - web
resources:
  - title: Report Chrome or ChromOS bug
    url: https://crbug.com
  - title: Report Android bug
    url: https://issuetracker.google.com
---

Frequent operating system updates are vital to ensure security and access to the latest features. By default ChromeOS [releases a full OS update](https://support.google.com/chromebook/answer/1086915) to the stable channel (Stable) about every 4 weeks. Minor updates, such as security fixes and software updates, happen every 2–3 weeks. Developers can test their applications on the developer (Dev) or beta (Beta) channels before each new stable version is released, to make sure their apps work well. Dev gets updated once or twice weekly, and shows what the Chrome team is working on right now. This build is still subject to bugs, but gives a 9–12 week preview of what’s coming to Stable. Beta gives you a 4–6 week preview of features coming to Stable.

But, testing on a monthly basis with these existing channels can be challenging for system administrators and developers to keep up with. To provide better support and give everyone more time to test, we've created a new long-term support plan, with long-term support channels, for ChromeOS.

## Long-term support releases

ChromeOS’s long-term support releases are a powerful tool to reduce the effort to manage devices in an organization and certify that apps work well for every OS update. Both admins and developers should get familiar with them to provide a great experience to organizations adopting them.

ChromeOS offers two long-term support releases: a **long-term support candidate (LTC)** release and a **long-term stable (LTS)** release.

- **Long-term support candidate (LTC)** - used as a basis for the next LTS version and is cut from Stable three months before LTS, giving admins a preview to prepare with.
- **Long-term support channel (LTS)** - updated every 6 months, this channel has the slowest release cadence and is meant as a replacement for the normal stable channel. Except for a few users that should remain on LTC for testing purposes, most should be on LTS when adopting long-term support releases across an organization.

{% include 'lts-timeline.njk' %}

The LTC / LTS lifecycle works as follows:

- The LTC release (108 LTC in the diagram) is cut from the stable release (108 Stable), so during the first month both are identical.
- LTC starts to receive security fixes every two weeks for the next 3 months until the next LTS release (108 LTS in the diagram). This means that 3 months after the initial LTC release, LTC will mirror LTS.
- Once LTS is released, it will continue receiving security fixes every two weeks.
- Devices left on LTC after LTS is released will also continue to receive security fixes every two weeks, and will automatically update to the next LTC release when it’s cut.

In addition to operating system features and bug fixes, firmware updates are also bundled inside LTS releases up to a device's auto update expiration (AUE).

To enable either channel, you must have a [Google domain and a managed device](https://support.google.com/chrome/a/answer/1289314). You can sign up for a [Chrome Enterprise Upgrade trial](https://support.google.com/chrome/a/answer/7679452?ref_topic=9050345) to get access to the Google Admin console allowing you to setup and [deploy managed Chromebooks](https://support.google.com/chrome/a/answer/4601288). Finally, [switch your managed devices to the LTS or LTC channel](https://support.google.com/chrome/a/answer/11333726#:~:text=OS%20devices.-,Switch%20devices%20to%20the%20LTC%20channel,-Your%20current%20account) from the Admin console. [We recommend](https://support.google.com/chrome/a/answer/6025002) keeping the majority of your devices on the LTS channel and use LTC to test the upcoming LTS release.

## Testing workflow for LTC / LTS

LTC and LTS are designed to considerably reduce testing efforts for admins, while ensuring a secure operating system experience. To keep system administrators and developers in alignment with the long-term support lifecycle, you should:

- Test on Dev and Beta ahead of the stable release that matches the upcoming LTC channel release.
- Once LTC is released, test on it to ensure that any applied security fixes don't affect your work until LTS is cut.
- Once LTC gets promoted to LTS, LTS will continue to get security fixes every two weeks. You should test them, too.

Taking the [lifecycle diagram](#figure-timeline) as reference:

- Start testing on 108 Dev and 108 Beta to make sure that everything works well ahead of the 108 Stable release from which 108 LTC will be cut.
- Test on 108 LTC every two weeks until 108 LTS is released three months from the initial cut date.
- Continue testing on LTS regularly to make sure that security fixes don’t break anything.

## Managing changes between LTC/LTS versions

Whether adopting a long-term support version of ChromeOS or working with an organization that has, properly managing changes between versions is critical. You may add a feature based on new platform capabilities or rely on one that was deprecated in later versions. Or, you may rely on specific features of a specific version of an app, or want to offer users the ability to choose what version they run. To ensure seamless application access, you should work to ensure your app is backwards compatible, provide separate instances per version, or both.

### Ensure backward compatibility

Backwards compatibility allows newer versions of your application to run on older versions of their platform. You can do this with a technique called feature detection, where you check for the availability of a new feature before trying to use it. If it exists you use it; if not, optionally provide a fallback. The generalized version of this technique is called feature flags, where a codepath is loaded depending on whether a feature is enabled, either through capability availability or app or user-level configuration. Android apps, Chrome extensions, and web apps all benefit from this technique. By ensuring that newer versions of your app are backwards compatible, you’re able to manage a single application for all of your users.

A web app looking to provide compute-intensive animations may want to implement WebGPU for browsers that support it and fall back to simpler JavaScript powered animations if unavailable. To do so, they might do the following:

```javascript {title="JavaScript" .code-figure}
if ('gpu' in navigator) {
  // WebGPU is supported! Accelerate computation.
} else {
  // No WebGPU, fallback to JavaScript implementation.
}
```

### Provide separate instances

Sometimes differences between versions are too much to handle through backwards compatibility techniques. Feature differences may be too great or you may have business needs that dictate having a separate long-term support version than your main application. When this is the case, you may want to consider providing separate instances for each version. While this ensures that users are using a specific version of your app, it may raise your operational costs, so keep this in mind when opting for this solution.

For web apps, providing a separate instance usually means hosting the different versions of your application at different URLs, potentially requiring separate servers, databases, or other website infrastructure. For Android applications, this means having separate Play Store listings for each version. This may lead to confusion from your users as there would be multiple similar applications available and they may not know which one to choose. Chrome extensions can either also have multiple listings, or you can recommend your customers to pin the version of your Chrome Extension they need through the Chrome Admin console by referring them to [this documentation](https://support.google.com/chrome/a/answer/11190170?hl=en)⁠ which details how to pin extensions and some caveats associated with pinning.

An Android app looking to only provide a long-term support version to ChromeOS users may create a separate listing with the following in their AndroidManifest.xml file to specify it should only be delivered to ChromeOS devices:

```xml {title="AndroidManifest.xml" .code-figure}
<uses-feature android:name="org.chromium.arc" android:required="true" />
```
