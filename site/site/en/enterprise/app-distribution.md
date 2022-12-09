---
title: App Distribution
metadesc: Recommendations for managing and distributing your enterprise web apps, PWAs, and Chrome extensions.
date: 2022-04-30
weight: -7
---

To be successful in the enterprise world, it’s key to have fast ways to distribute applications and new releases. ChromeOS developers have a variety of options giving them the control they need over the process.

## Managing app distribution and updates

Chrome Enterprise admins can install and deploy apps to users' devices via the [Google Admin Console](https://admin.google.com/). Users can also install apps of their choice directly by accessing them from a URL or from stores, like the Google Play store, as long as policies allow them to do so.

Developers have several ways of to put their apps in the hands of admins and users and deliver new updates to their users quickly. This makes the development cycle for ChromeOS flexible to your organization’s needs.

### Access and install your web apps all from one place

Web apps are a primary app platform for ChromeOS and can be put in the hands of customers and end users with a single click. Chrome Enterprise admins can use a web app’s URL directly to install it via [Google Admin Console](https://admin.google.com/), choosing if they want it to be opened in a new window or a tab. Users can also access web apps directly by visiting the web app URL. Because web apps are accessed directly each time, releasing a new version of a web app makes them automatically available to those users that have installed them.

### A flexible way to publish extensions

Unlike web apps that can be accessed directly from a URL and opened in the browser, [Chrome extensions](https://developer.chrome.com/docs/extensions/mv3/overview/) have to be published to be made available for download. There are two main ways of publishing an extension: via the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) or by self-publishing.

The standard way of doing it is via the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) which has its own set of rules and review process and provides out of the box security. It also allows for [different ways of listing apps](https://cloud.google.com/blog/products/chrome-enterprise/publishing-extensions-for-the-enterprise): private, public, and unlisted, each of which provides a different level of visibility and sign in requirements for users that search for extensions. Once uploaded they can be shared with Chrome Enterprise Admins using the extension’s Chrome Web Store ID, and then distributed across organizational units.

The Chrome Web Store hosts extensions and provides many advantages but some developers might prefer to have more control over the process. To allow for that, you can host your extensions on your own servers, separate from the Chrome Web Store (a technique commonly known as “self-hosting”). The con of this approach is that it requires more setup (you have to host your own file server for extension files).

## Convenient release management tools

Having an efficient way to publish releases is key to making sure customers are using the latest version of your app, with any bug fixes and new features you’ve released, as soon as possible.

In the case of webapps, developers can immediately push an update and make it available to those users that have the apps installed. This is similar for self-hosted extensions, where developers have full control over their releases and can make them immediately available for admins to update.

Extensions uploaded to the Chrome Web Store have to go through a review process that can take several days. If it doesn’t pass the review process, you need to start the process over again.You can reduce the chances of not passing the review process by pushing a release into private mode early, or publishing a second version of the app (with a different app id) as a beta version, to allow for early testing to make sure that the app will pass review successfully.

Enterprise admins can also “pin” to a version of an extension via the Google Admin Console, to make sure that users only have access to that one regardless of updates (in case there are concerns with things like a future version’s feature compatibility, for example).

## Chrome OS long-term support

[Chrome OS LTS⁠](https://support.google.com/chrome/a/answer/11333726?hl=en) is the long term support channel (LTS) for Chrome OS devices and is targeted to education and enterprise users of Chrome OS. Normally, Chrome OS receives a new update every four weeks to its stable channel. The long-term support channel has a slower release cadence; devices still continue to receive frequent security fixes, but they only get feature updates every 6 months.

Developers working with organizations in the LTS channel, might need to adjust their development cycle to make sure that apps remain compatible. For more information, check out our [Chrome OS LTS guide](/{{locale.code}}/education/chromeos-lts).
