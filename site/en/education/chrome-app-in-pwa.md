---
title: Communicate with a Chrome Extension in a Chrome PWA Kiosk App
metadesc: Understand how to bridge the gap between Chrome Extensions and PWAs.
date: 2021-03-21
weight: -1
tags:
  - web
---

Chrome apps will be deprecated after M102 for Windows, Linux, and MacOS. For ChromeOS, Chrome Apps will be [supported until at least January 2025](https://blog.chromium.org/2021/10/extending-chrome-app-support-on-chrome.html), but we strongly recommend migrating to web apps as Chrome Apps are scheduled for deprecation. Previously, Chrome Apps had extra functionality available to them in kiosk mode that is not supported by web apps available in the browser. You can continue to use some of these additional functions by deploying an extension with your kiosk web application.

## How are extensions deployed?

Extensions are deployed through the Chrome Admin Console in the kiosk configuration screen (found by navigating Devices > Chrome > Apps & Extensions > Kiosks). The extensions can either be self hosted at a publicly accessible link or by hosting the extension in the Chrome Web Store. For more information on managing extensions in an enterprise or education setting, please refer to [this document](https://docs.google.com/document/d/1pT0ZSbGdrbGvuCsVD2jjxrw-GVz-80rMS2dgkkquhTY/edit#).

## How can I call extension APIs from my web app?

### Extension setup

In order for your extension to call kiosk APIs, you will need to expose a background script that listens for messages to arrive from the client (your web app) and then proxy those requests to a corresponding API call. In the following example, we proxy a request to restart the Chrome OS device when our web app sends a custom message object that contains a methodName of `callRestart`.

```javascript {title="background.js" .code-figure}
// message handler - extension code
chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  if (request.methodName == 'callRestart') {
    chrome.runtime.restart();
  }
});
```

The manifest for the extension can be configured to allow external function calls to the extension via the [`externally_connectable`](https://developer.chrome.com/docs/extensions/mv3/manifest/externally_connectable/) key which specifies what sites and extensions are allowed to call methods in your extension. More information about Chrome extensions and manifest v3 can be found in the [official documentation](https://developer.chrome.com/docs/extensions/mv3/intro/).

```javascript {title="manifest.json" .code-figure}
{
    "background": {
       "service_worker": "background.js"
    },
    "description": "This restarts your Chrome OS device. Lucky you!",
    "externally_connectable": {
       "accepts_tls_channel_id": false,
       "matches": [ "\*://chromeos.dev/\*" ]
    },
    "manifest_version": 3,
    "name": "Restart your kiosk app",
    "version": "1.0"
 }

```

This is the minimum amount of code required in an extension to listen for messages from a web app.

## Web App Setup

To call the extension from a web app, we would need to know our static extension id. This id can be found in the `chrome://extensions` page, shown when we install our Chrome extension, or from the Chrome Web Store after the extension has been uploaded. This allows our web app to specify the exact extension that they wish to communicate with. After that, all we need to do is call [chrome.runtime.sendMessage](https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage) and pass in the extension id with a message that we wish to send and we have called a kiosk API from a web app.

```javascript {title="your_site.js" .code-figure}
const STATIC_EXTENSION_ID = 'abcdefghijklmnopqrstuvwxyz'; // found from chrome extensions page of chrome web store.
const callExtensionAPI = function (method) {
  chrome.runtime.sendMessage(STATIC_EXTENSION_ID, {
    methodName: method,
  });
};
callExtensionAPI('callRestart');
```

For more information on connecting web pages to extensions for message passing, please refer to [this documentation](https://developer.chrome.com/docs/extensions/mv3/messaging/#external-webpage).

!!! aside.message--note

Extensions and web apps cannot arbitrarily communicate with each other. The extension will only attempt to listen to messages from domains listed in the `externally_connectable` section of its manifest. Similarly, a web app must know the static id of the extension it wishes to communicate with.

!!!
