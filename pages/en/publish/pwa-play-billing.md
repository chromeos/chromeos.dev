---
title: Implement Play Billing in your PWA
metadesc: How to monetize your Progressive Web App in Google Play by selling digital goods with Play Billing.
date: 2021-05-14
weight: -4
---

If your PWA is listed in Google Play and you want to monetize it by selling in-app products or subscriptions, [Play policy](https://support.google.com/googleplay/android-developer/answer/9858738#gbwa:~:text=Play%2Ddistributed%20apps%20must%20use%20Google%20Play's,app%20functionality%2C%20digital%20content%20or%20goods.) will require you to implement Play Billing. There are two APIs that you will need to implement in your PWA: the [Digital Goods API](https://github.com/WICG/digital-goods/blob/main/explainer.md) and the [Payment Request API](https://www.w3.org/TR/payment-request/).

@[youtube](https://www.youtube.com/watch?v=Ge7VkPC2eM0)

## Digital Goods API

The [Digital Goods API](https://github.com/WICG/digital-goods/blob/main/explainer.md) is an interface between your app and Google Play. It allows you to retrieve the digital products and details you’ve entered for your in-app products and subscriptions in the Play Console as well as retrieve existing purchases a user has made. If you haven’t added in-app products or subscriptions in the Play Console yet, make sure to follow the [Play Console setup for Play Billing](/{{locale.code}}/publish/play-console-setup-for-billing).

### Register for the Origin Trial

Note that the Digital Goods API is currently available through an [Origin Trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md) - a mechanism that allows developers early access to new Web APIs. You will need to [register for the trial](https://developer.chrome.com/origintrials/#/view_trial/-5451607348931985407) and request a token. You will see a “Valid Until” date which is when your token is guaranteed to work until. Remember to renew your token when that date approaches to continue participating in the trial. APIs offered as an origin trial are subject to change, in case of any issues, refer to the [Digital Goods API documentation](https://github.com/WICG/digital-goods/blob/main/explainer.md).

## Payment Request API

The [Payment Request API](https://www.w3.org/TR/payment-request/) handles the actual payment transaction when a purchase is made. It utilizes the item details that the Digital Goods API provides to make the in-app purchase using the appropriate payment method, which in our case is Google Play Billing.

## Feature detect the Digital Goods API

The Digital Goods API is currently only supported by Chrome if your PWA was installed via a Google Play app. You can detect if the API is available by checking for the `getDigitalGoodsService` method in the `window` object.

```js
if ('getDigitalGoodsService' in window) {
  // Digital Goods API is supported!
} else {
  console.log('DigitalGoodsService is not available.');
  // Use another payment method
}
```

## Connect to the Google Play Billing service

The Digital Goods API was designed to be compatible with various browsers and digital stores, similar to how the Payment Request API is browser-agnostic and can be used with different payment providers. To obtain an instance of the service associated with Google Play Billing, pass the string `"https://play.google.com/billing"` as the payment method to `getDigitalGoodsService()`.

```js
if ('getDigitalGoodsService' in window) {
	// Digital Goods API is supported!
	const service = await window.getDigitalGoodsService('https://play.google.com/billing');
	if (service) {
		// Google Play Billing service is available!
	} else {
		console.log('Google Play Billing is not available');
	}
}
```

If the Google Play Billing payment method is not available (e.g. the user is accessing your PWA through the browser), you may offer another payment method for transactions.

## Get item details

Once you have the Digital Goods service connected to Google Play, you can use the API to retrieve information about products and purchases.

The `getDetails()` method lets you get information about the items you’ve set up in the Play Console. Information like the product title, description, and price should be displayed to the user in your app UI so they know what is available for purchase and for how much.

The `getDetails()` method will need a list of item IDs which correspond to the product IDs of the in-app products and subscriptions you created in the Play Console.

```js
const itemDetails = await service.getDetails(['product_1', 'product_2', 'product_3']);
for (const item of itemDetails) {
  // Display item information to user
  displayItem(item.title, item.description, item.price);
}
```

To get the appropriate price for the user’s locale, you will need to do some additional formatting:

```js
const localePrice = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: item.price.currency }).format(item.price.value);
```

!!! aside.message--note
**Note:** The Digital Goods API does not provide you with a method to get a list of item IDs. Instead, you will either need to hard-code them into your client or fetch them from your back-end server. The Google Play Developer API does let you [query the list of item IDs](https://developers.google.com/android-publisher/api-ref/rest/v3/inappproducts/list) from a back-end. (Check out more about [implementing key Play Billing components in your back-end server](/{{locale.code}}/publish/play-billing-backend). Whichever solution you choose, make sure to keep the item IDs consistent with what you have in the Play Console.
!!!

## Purchase an item

Once your products and details are displayed to the user, you can build the purchase flow with the Payment Request API. When used in conjunction with the Digital Goods API, only one input parameter is required: `methodData`.

Play Billing only allows the purchase of a single item at a time; the price and details of the item are already known by the Play server, so the [`details`](https://www.w3.org/TR/payment-request/#dom-paymentrequest) parameter is not necessary. See the [explainer](https://github.com/WICG/digital-goods/blob/main/explainer.md#making-a-purchase) for a more detailed explanation.

Use the `supportedMethods` member of the [`methodData`](https://www.w3.org/TR/payment-request/#dom-paymentrequest) parameter in the `PaymentRequest` to identify Google Play Billing as the payment method with the string `"https://play.google.com/billing"`. Then in the `data` member, pass along the item ID as the `sku`.

```js
const paymentMethodData = [
  {
    supportedMethods: 'https://play.google.com/billing',
    data: {
      sku: item.itemId,
    },
  },
];
```

Then create the payment request and call `show()` to start the payment flow:

```js
const request = new PaymentRequest(paymentMethodData);
const paymentResponse = await request.show();
```

This will display the Play purchase UI to the user, where they’ll see the details about the product they’re trying to purchase. They can either abandon the transaction or proceed with the payment. If the user cancels the payment, the promise returned by `show()` will be rejected with an error. If they successfully pay and complete the purchase, the promise will resolve with a `PaymentResponse`. In the `details` property of the payment response, a purchase token is returned.

To prevent fraud, it’s critical to verify the purchase and purchase token on your back-end server. It’s also a good idea to keep track of users and their associated purchase tokens. Learn how to [implement the verification on your back-end server](/{{locale.code}}/publish/play-billing-backend).

After validating the purchase, call `complete()` on the payment response to finish the payment flow and close out the billing UI. You can also pass in an optional `result` string to indicate the state of the payment process. It is up to the browser whether to provide any indication of this result to the user. Chrome does not create any user-visible cues so it is recommended that you display your own error or success messages in your PWA.

```js
const { purchaseToken } = paymentResponse.details;

let paymentComplete;
if (validatePurchaseOnBackend(purchaseToken)) {
  paymentComplete = await paymentResponse.complete('success');
  // Let user know their purchase transaction has successfully completed and been verified
} else {
  paymentComplete = await paymentResponse.complete('fail');
  // Let user know their purchase transaction failed to verify
}
```

### Subscription upgrades and downgrades

This purchase flow is the same for both in-app products and subscription purchases. However, for subscriptions, Google Play has additional purchase options you can implement: upgrade and downgrade. When building the `data` for the payment method, you’ll need to pass in the following to initiate an upgrade or downgrade flow:

- `sku`: This is the item ID for the new subscription to be upgraded or downgraded to.
- `oldSku`: This is the item ID for the user’s current subscription.
- `purchaseToken`: This is the purchase token for the user’s current subscription. Like it was noted earlier, it’s a good idea to keep track of the purchase tokens in your backend. And for this scenario and others, you should associate a user to their current purchases and purchase tokens as well.
- `prorationMode`: This is how the new subscription will be charged when it replaces the user’s current subscription.

| Proration Mode                            | Description                                                                                                                                                                                                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| immediateAndChargeProratedPrice           | The subscription is upgraded immediately, and the billing cycle remains the same. The price difference for the remaining period is then charged to the user.                                                                                                        |
| immediateWithoutProration                 | **TEMPORARILY DISABLED** There is a potential fraud path with this proration mode where users could get an upgraded subscription without extra payment for one billing cycle. Please be aware that we have temporarily disabled this mode while we work on the fix. |
| immediateWithTimeProration                | The subscription is upgraded or downgraded immediately. Any time remaining is adjusted based on the price difference, and credited toward the new subscription by pushing forward the next billing date. This is the default behavior.                              |
| deferred                                  | The subscription is upgraded or downgraded only when the subscription renews. This is useful for downgrades especially.                                                                                                                                             |
| unknownSubscriptionUpgradeDowngradePolicy | No set policy. This is not recommended.                                                                                                                                                                                                                             |

Learn more about the different proration modes in the Google Play Billing Library [reference documentation](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.ProrationMode). Check out the Android developer docs for more on [subscription upgrade and downgrades](https://developer.android.com/google/play/billing/subscriptions#change) and [proration mode recommendations](https://developer.android.com/google/play/billing/subscriptions#proration-recommendations).

The usage of these additional fields will look something like this:

```js
const paymentMethod = [{
	supportedMethods: 'https://play.google.com/billing',
	data: {
		sku: item.itemId,
		oldSku: oldPurchase.itemId,
		purchaseToken: oldPurchase.purchaseToken,
		prorationMode: 'immediateAndChargeProratedPrice',
	}
}];

```

Here, `item` is the `ItemDetails` of the new subscription the user is trying to upgrade or downgrade to, and `oldPurchase` is the `PurchaseDetails` of the user’s current subscription.

## Acknowledge a purchase

After a user purchases an item, you should grant them the proper entitlements (access to the item or content they’ve just purchased). Then, use the Digital Goods API to acknowledge the purchase. Acknowledging a purchase lets Google Play know that you’ve received and processed the purchase appropriately.

!!! aside.message--note
**Note:** If a purchase is not acknowledged within 72 hours of the purchase time, the payment is refunded to the user and the purchase is revoked. The purchase token will no longer be valid, so when you [query for existing purchases](#check-existing-purchases) the revoked purchase won’t be returned. This ensures that a user isn’t improperly charged in the event of a network error which causes them to not be granted the entitlement to their item.
!!!

The Digital Goods API requires a purchase to be acknowledged with a `PurchaseType` of either `"onetime"` or `"repeatable"`. This is something that you determine client-side and is not something you set when you create your [in-app products and subscriptions in the Play Console](/{{locale.code}}/publish/play-console-setup-for-billing). It is recommended that you keep track of each item’s purchase type in your back-end server. If you also fetch your list of item IDs from the back-end server, you can store the item ID and purchase type as a key-value database.

| Play Console   | PurchaseType | Description                                                                                                                                                                                                 |
| -------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| in-app product | onetime      | When a user should only buy a product once and will own it forever (non-consumable item), or when a user can only own one instance of it at a time (needs to be consumed before they can purchase another). |
|                | repeatable   | When a user can buy and own multiples of a product (consumable item).                                                                                                                                       |
| subscription   | onetime      | Subscriptions are always acknowledged as 'onetime' because a user should only have at most one instance of each subscription.                                                                               |

Call `acknowledge()` with the `purchaseToken` string that was returned earlier by the payment response in the `data` member, along with the appropriate purchase type.

```js
service.acknowledge(purchaseToken, getPurchaseType(item.itemId));
```

### Consume a `onetime` purchase

When you acknowledge a purchase with the `onetime` purchase type, this lets Google Play know that the user now owns the item and should not be allowed to purchase it again. If this is an item that the user will only need to purchase once and will own forever (e.g. a game character skin), then the item is not consumable.

Alternatively, the item may be something that you limit a user to one of at a time. Then the user will need to use or consume the item before they can purchase another one. To let Google Play know that the user has consumed the item, you should call the `acknowledge()` method with the `"repeatable"` purchase type. Google Play will then make the item available for the user to purchase again.

```js
// After the user purchases the item, acknowledge it right away
service.acknowledge(purchaseToken, 'onetime');

…
// When the user consumes or uses the item, acknowledge as `repeatable`
service.acknowledge(purchaseToken, 'repeatable');
```

## Check existing purchases

The last key user flow is to check for existing entitlements (in-app products that haven’t been consumed yet and on-going subscriptions). These existing entitlements will be from previous Google Play purchases on any device made in-app or on the Play Store, or from a redeemed promo-code.

This is also a good place to check the purchase status and acknowledge any purchases that were previously made but did not properly get acknowledged. It is recommended that purchases get acknowledged as soon as possible so the user's entitlements are up-to-date and properly reflected in the app.

`listPurchases()` will return a list of `PurchaseDetails` that has more information about the purchases.

```js
const existingPurchases = await service.listPurchases();
for (const purchase of existingPurchases) {
  if (purchase.purchaseState == 'purchased' && !purchase.acknowledged) {
    await service.acknowledge(purchase.purchaseToken, getPurchaseType(purchase.itemId));
  }
  // Update UI with user’s existing entitlements
  displayPurchase(purchase.itemId, purchase.purchaseState);
}
```

To protect your app from potential bad actors, you should not rely only on the client side to get purchases. Learn more about how to [verify purchases on your back-end server before granting entitlements](/{{locale.code}}/publish/play-billing-backend#verify-purchases-before-granting-entitlements).

## Let users manage subscriptions

For a good user experience, it is important to provide a way for users to manage and cancel their subscriptions in-app. We recommend creating a deep link, on a settings page or menu, that will redirect the user to the Play Store's subscription management page for your app. Replace the following URL with your appropriate "sub-product-id" and "app-package-name":

```
https://play.google.com/store/account/subscriptions?sku=sub-product-id&package=app-package-name
```

## Next steps

These user flows and code snippets are a basic implementation to demonstrate how to use the DIgital Goods API and Payment Request API in your PWA to implement Play Billing. You should utilize the APIs as it makes sense in your app’s context and use cases. For an example of an end-to-end implementation, check out our [open-source sample](https://github.com/chromeos/pwa-play-billing).

Then, take a look at how to [implement crucial Play Billing components in your back-end server](/{{locale.code}}/publish/play-billing-backend) to keep your app secure and always updated with your user’s entitlements.
