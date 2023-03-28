---
title: Extension development
metadesc: An overview of Chrome extensions development for education on Chrome OS
date: 2021-03-29
weight: -3
tags:
  - web
---

[Chrome extensions](https://developer.chrome.com/docs/extensions/mv3/) are software programs built on web technologies that customize the browser experience for a user.

Extensions are run in a sandboxed environment but can interact with web content, which makes them suitable for some education use cases like:

- Browser filtering and monitoring
- Inserting specialized characters such as mathematical symbols and equations
- Content enrichment, for example identifying spelling and grammatical errors
- Policy enforcement (e.g. limiting time on social media)

When building solutions for education use cases on Chromebooks, you can create an extension, a web app, or both. If you need to run your program in a cross-site context, then an extension is a good option to consider. Your extension can interact with web apps that you don’t own. For example, an extension may detect grammatical errors on a Google doc and provide comments and recommendations to fix them. Another extension may help students with note-taking by accumulating text the student highlights on any web page into one doc.

If your program does not need to run on other websites, then creating a web app might be a better option. If you have a web app, an accompanying extension can enhance your user’s experience by bringing functionality and APIs that may not be available on the web platform.

## Chrome apps migration

If you previously had a Chrome app, we strongly recommend [migrating to web apps](https://developer.chrome.com/docs/apps/migration/). Chrome apps are being deprecated, but will be [supported until at least January 2025 for Chrome OS](https://blog.chromium.org/2021/10/extending-chrome-app-support-on-chrome.html). During this transition period, some Chrome app features may not have a suitable web platform equivalent. For these, you may need to implement an extension along with your web app to achieve similar results via [message passing](https://developer.chrome.com/docs/extensions/mv3/messaging/). One specific example of this is if you want to [utilize kiosk mode-specific APIs in your PWA kiosk application](/{{locale.code}}/education/connecting-an-extension-from-a-kiosk-pwa).

## Developing Chrome OS extensions

The Chrome Developers website has an excellent [getting started guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/) to begin Chrome extension development. You should also check out samples available on the official Chrome [GitHub repository](https://github.com/GoogleChrome/chrome-extensions-samples).

### APIs

When developing extensions, there are a number of [APIs](https://developer.chrome.com/docs/extensions/reference/) to help you achieve the functionality you’re building.

Additionally, there are a few Chrome OS-only APIs to keep in mind as well:

- [`fileBrowserHandler`](https://developer.chrome.com/docs/extensions/reference/fileBrowserHandler/) extends Chrome OS file browser
- [`fileSystemProvider`](https://developer.chrome.com/docs/extensions/reference/fileSystemProvider/) creates virtual file systems which can be accessible by Chrome OS file manager
- [`input.ime`](https://developer.chrome.com/docs/extensions/reference/input_ime/) implement custom IME for Chrome OS
- [`idle.getAutoLockDelay`](https://developer.chrome.com/docs/extensions/reference/idle/#method-getAutoLockDelay) returns the time (in seconds) it takes for the screen to automatically lock while idle.

## Publishing and hosting

When you’re done building your extension, you’ll want to publish it it can be installed and used. There are two officially [supported distribution mechanisms](https://developer.chrome.com/docs/extensions/mv3/hosting/): Chrome Web Store and self-hosting.

The Chrome Web Store lets you make your extension available to users everywhere. Since your extension will be hosted and signed by the Chrome Web Store, you will also need to comply with the [store policies](https://developer.chrome.com/docs/webstore/program_policies/). One policy to keep in mind is the “single purpose” policy which requires extensions to have only a single purpose with respect to its subject matter or browser function. If you don’t want to make your extension available to the public, you also have the option to list your extension as [private or unlisted](https://docs.google.com/document/d/1pT0ZSbGdrbGvuCsVD2jjxrw-GVz-80rMS2dgkkquhTY/edit#heading=h.575t72ucj4bh). This lets you restrict access to users in your domain or a group of trusted testers you can set up.

[Self-hosting](https://docs.google.com/document/d/1pT0ZSbGdrbGvuCsVD2jjxrw-GVz-80rMS2dgkkquhTY/edit#heading=h.gb2ntk6856ld) extensions are more common in managed environments, like education, where system administrators can implement policies to control school-issued devices. When deciding whether to self-host your extension or not, consider the setup and security tradeoffs of hosting your extension on your own server. Once you’ve appropriately packaged and hosted your extension, you’ll need to share the URL to your self-hosted extension’s XML manifest file so that admins can add a policy to force install the extension on their managed devices.

## Managed extensions

Oftentimes, your extension may be used by students on managed devices. It’s important to understand the following [management policies](https://chromeenterprise.google/policies/#Extensions) that administrators may put on student devices and how they can affect the functionality of your extension:

- Pin an extension to a specific version.
- Block external extensions (extensions not on the Chrome Web Store) from being installed.
- Add a list of blocked or allowed hosts, which controls whether an [extension can alter the webpages at those URLs](https://support.google.com/chrome/a/answer/9031935#all-apps&zippy=%2Cstep-prevent-or-allow-all-apps-from-altering-pages).
- Block extensions that [request certain permissions](https://support.google.com/chrome/a/answer/6177431#permissions&zippy=%2Cblock-apps-and-extensions-based-on-permissions).
