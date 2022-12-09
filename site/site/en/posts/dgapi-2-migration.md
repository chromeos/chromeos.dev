---
title: 'Digital Goods API 1.0 to 2.0 Migration Guide'
metadesc: Digital Goods API 2.0 is coming in Chrome 96. Make sure you update your app to ensure it continues to work.
tags:
  - announcement
  - web
  - product news
authors:
  - ikarahan
date: 2021-10-01
---

We are making some changes to the Digital Goods API (DGAPI) that will address feedback we’ve heard from you and other developers, as well as close some potential fraud avenues. DGAPI 2.0 will require some changes in your web app and backend, but you won’t need to upload a new package to the Play Store.

The new API will land in Chrome 96 whose stable launch is scheduled for November 15th on Android, and November 30th on Chrome OS.

!!! aside.message--note
**Note:** Some of your users might be still using Chrome 95 or earlier even after Chrome 96 is available, so please ensure your app works with both DGAPI 1.0 and 2.0 until all users upgrade to Chrome 96.
!!!

This guide will take you through the steps to update your web app and backend in order to make it compatible with both DGAPI 1.0 and 2.0. In order to avoid breakage, please make your changes before the Chrome 96 launch date.

## API Changes

### `getDigitalGoodsService()` now rejects promises

Both DGAPI 1.0 and 2.0 use the async `getDigitalGoodsService()` method to retrieve the service object. In DGAPI 1.0, this method would return `null` if the given service URL is not supported. In DGAPI 2.0, the method throws an error instead.

In order to handle this change, use the following snippet to instantiate your service object:

```js {title="JavaScript" .code-figure}
if (window.getDigitalGoodsService === undefined) {
  // Digital Goods API is not supported in this context.
  return;
}

try {
  const service = await window.getDigitalGoodsService('https://play.google.com/billing');

  if (service === null) {
    // DGAPI 1.0
    // Play Billing is not available. Use another payment flow.
    return;
  }

  // Use the service here.
} catch (error) {
  // DGAPI 2.0
  // Play Billing is not available. Use another payment flow.
  return;
}
```

### Introduced `consume()` for item consumption

In DGAPI 1.0, the acknowledgement and consumption of items that can be purchased multiple times is handled by calling the `acknowledge()` method with `“repeatable”` argument.

DGAPI 2.0 introduces the `consume()` method to mark such items as consumed.

If you offer consumable in-app purchases in your app, follow these steps:

1. Check if the `DigitalGoodsService` contains the `acknowledge()` method.
2. If yes, this means the client is running DGAPI 1.0 on Chrome 95 or earlier. Use the `acknowledge()` method to consume the item.
3. Otherwise, the client is running DGAPI 2.0 on Chrome 96 or later. Use the `consume()` method to consume the item.

Here’s a snippet:

```js {title="JavaScript" .code-figure}
if ('acknowledge' in service) {
  // DGAPI 1.0
  service.acknowledge(purchaseToken, 'repeatable');
} else {
  // DGAPI 2.0
  service.consume(purchaseToken);
}
```

### Purchase acknowledgement moves to backend

DGAPI 2.0 removes the `acknowledge()` method. Purchase acknowledgement must be made instead on the backend using Google Play Developer API’s acknowledge methods.

If you currently acknowledge purchases on the client, follow these steps to move it to your backend:

1. Remove all references to the DGAPI `acknowledge()` method called with the `'onetime'` purchase type in your web app.

```js {title="JavaScript" .code-figure}
service.acknowledge(purchaseToken, 'onetime');
```

2. Pass the `purchaseToken` and `itemId` to your backend.
3. On your backend, call:
   - [purchases.products.acknowledge](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.products/acknowledge) for in-app items.
   - [purchases.subscriptions.acknowledge](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/acknowledge) for subscriptions.

### Entitlement must be granted by checking with backend

In DGAPI 1.0, the `purchaseDetails` object returned by the `listPurchases()` method includes the `purchaseState` field that can be used to determine whether to grant entitlements.

DGAPI 2.0 reduces the `purchaseDetails` object to contain only the `purchaseToken` and the `itemId`. Thus, you must grant entitlement to a purchase by checking with your backend instead.

Follow our guideline to [verify purchases on your back-end server before granting entitlements](/{{locale.code}}/publish/play-billing-backend#verify-purchases-before-granting-entitlements) to replace your client side code.

## Origin Trials

Please note that Digital Goods API 2.0 will be run as a new origin trial. The Digital Goods API 1.0 origin trial will still last until its expiry date but will apply only to users on M95 and below.

You will need to register separately for the 1.0 and the 2.0 origin trials, and place both keys in your website in order to keep compatibility with both APIs.

Here are the links to both Origin Trials:

- [Digital Goods API 1.0](https://developer.chrome.com/origintrials/#/view_trial/-5451607348931985407)
- [Digital Goods API 2.0](https://developer.chrome.com/origintrials/#/view_trial/888335026498830337)

## Digital Goods API 2.0 Explainer

The full interface to DGAPI 2.0 is available in the [explainer](https://github.com/WICG/digital-goods/blob/main/explainer.md)

## Timeline

As announced at [Chromium Dash](https://chromiumdash.appspot.com/schedule):

- October 21: Chrome 96 beta
- November 15: Chrome 96 stable. DGAPI 2.0 is available on Android.
- November 30: Chrome OS 96 stable. DGAPI 2.0 is available on Chrome OS.
