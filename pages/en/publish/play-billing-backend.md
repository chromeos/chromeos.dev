---
title: Play Billing components in your back-end server
metadesc: How to implement key Play Billing components in your back-end server with the Play Developer API to help fight fraud and abuse.
date: 2021-05-13
weight: -6
---

You’ve just implemented Play Billing in your Android app or Progressive Web App and your users are able to purchase your digital goods. Now is the time to implement some key Play Billing components in your backend server.

## Google Play Developer API

The Google Play Developer API has two components: the [Subscriptions and In-app Purchases API](https://developers.google.com/android-publisher#subscriptions) and the [Publishing API](https://developers.google.com/android-publisher#publishing). The Subscriptions and In-app Purchases API consists of the following REST resources to help manage products and purchases:

- [`inappproducts`](https://developers.google.com/android-publisher/api-ref/rest/v3/inappproducts): in-app products and subscriptions catalog management
- [`purchases.products`](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.products): in-app products purchase status
- [`purchases.subscriptions`](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions): subscriptions purchase status and management

You can use the Google Play Developer API directly as a REST API, or the [client libraries](https://developers.google.com/android-publisher/libraries) can help you quickly start developing. The client libraries for all supported languages can be found [here](https://developers.google.com/api-client-library). Follow the [Getting Started guide](https://developers.google.com/android-publisher/getting_started) for the Google Play Developer API to link your API project and set up API access clients.

## List all in-app products

When querying for available product details on the frontend (on your Android app or Progressive Web App), you must specify the list of product IDs. You can implement this in your back-end server with the Play Developer API [`inappproducts.list`](https://developers.google.com/android-publisher/api-ref/rest/v3/inappproducts/list) method which will list all in-app products and subscriptions you’ve created in the Play Console. Make sure to check the `status` of each product and only send the `active` ones to your app client.

## Verify purchases before granting entitlements

A crucial part of implementing Play Billing in your Android app or Progressive Web App is ensuring you are verifying purchases before granting entitlement to the user. When you grant a user an entitlement, you are giving access to the benefits or content associated with the item they purchased. Because this requires handling sensitive data, it should be handled on the backend server.

The Google Play Developer API provides the [`purchases.products:get`](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.products/get) and [`purchases.subscriptions:get`](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/get) methods. Use these with purchase tokens retrieved in-app or stored on your back-end server to verify a purchase is legitimate. You should keep track of purchase tokens on your back-end server for additional purchases and user entitlements verification. Check the [Google Play Billing documentation](https://developer.android.com/google/play/billing/security#verify) on verifying purchases for more details about the steps you should take.

### In-app purchases

After receiving the purchase token from the client, your backend should call Google Play Developer API and validate that it has not been consumed already. A valid purchase’s `purchaseState` field is 1.

If the purchase is valid, the client should acknowledge the purchase and grant the entitlement after receiving the response from the server.

### Subscription purchases

Similar to verifying in-app purchases, your back-end server should call the Google Play Developer API after receiving the purchase token from the client, and validate that the subscription is still valid.

Your client should grant the entitlement if the subscription’s `expiryTimeMillis` field is greater than the current time.

This is also a good time to check the `linkedPurchaseToken` field and update your subscription database appropriately to handle upgrades, downgrades and other subscription flows. The rest of this page will go into further details.

## Keep backend state updated

If your app is available on different platforms (that may also use different payment methods), then keeping track of your users and their purchases on your back-end server will ensure that your users can access their same entitlements across the devices and platforms they use your app.

This can be as simple as having a database where you keep a record of your users and their current entitlements. Then as they make purchases or consume their entitlements, you update it accordingly. The next time they access your app from a different platform, you can retrieve their proper entitlements from your backend so your user can access it.

### Handle subscription state changes

A subscription can go through various state changes throughout its lifecycle and you should make sure to respond accordingly to each. Learn more about [handling the subscription lifecycle](https://developer.android.com/google/play/billing/subscriptions#lifecycle) to keep your backend always up to date.

### Subscription `linkedPurchaseToken`

As outlined in the [subscriptions documentation](https://developer.android.com/google/play/billing/billing_subscriptions#Allow-upgrade), every new Google Play purchase flow (initial purchase, upgrade, or downgrade) generates a new purchase token. The `linkedPurchaseToken` field makes it possible to recognize when multiple purchase tokens belong to the same subscription.

Every time you verify a subscription, your backend should check if the `linkedPurchaseToken` field is set. If it is, the value in that field represents the previous token that has now been replaced. You should immediately mark that previous token as invalid so that users cannot use it to access your content.

For example, when the backend receives the purchase token A for the initial purchase, with an empty `linkedPurchaseToken` field, it enables entitlement for that token. Later, when the backend receives the new purchase token B after the upgrade, it checks the `linkedPurchaseToken` field, sees that it is set to A, and disables entitlement for purchase token A.

![How to handle linked purchase tokens during a subscription upgrade.](/images/publish/play-billing-backend/linked-purchase-token.png)

For a detailed discussion of `linkedPurchaseToken` implementation, visit [Implementing `linkedPurchaseToken` correctly to prevent duplicate subscriptions](https://medium.com/androiddevelopers/implementing-linkedpurchasetoken-correctly-to-prevent-duplicate-subscriptions-82dfbf7167da).

### Real-Time developer notifications

The [`purchases.subscriptions:get`](https://developers.google.com/android-publisher/api-ref/purchases/subscriptions/get) method of the Google Play Developer API is the source of truth for managing user subscriptions. If you manage the state of your subscribers on a secure backend server, you should keep its state in sync with Google servers. However, frequent polling of Google Play Developer API can lead to hitting the API quota restrictions and delays in receiving notifications for important user actions (like cancelling or upgrading of a subscription).

[Real-Time Developer Notifications (RTDN)](https://developer.android.com/google/play/billing/getting-ready#configure-rtdn) is a Google Play Billing feature that sends your server an instant notification when a subscriber entitlement state changes (e.g. subscription purchased, subscription cancelled, subscription on hold). With RTDN, you can keep your subscriber database in sync only by responding to these notifications, instead of polling the Google Play Developer API regularly.

Your back-end server will receive a [`SubscriptionNotification`](https://developer.android.com/google/play/billing/rtdn-reference#sub) for events affecting subscription state such as renewals and cancellations. Then, call the Google Play Developer API with the purchase token in the notification to get the complete status and update your own backend state.

You can configure RTDN for your app by following [these instructions](https://developer.android.com/google/play/billing/getting-ready#configure-rtdn). Then you should set up your back-end server to consume these messages.

Check the full [RTDN reference](https://developer.android.com/google/play/billing/rtdn-reference) for more.
