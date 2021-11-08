---
title: Testing the Digital Goods API Integration
metadesc: How to ensure that your Digital Goods Integration is working properly.
date: 2021-11-05
weight: -3
---

# Test cases

Testing the digital goods api integration can help make sure that there are no unexpected bugs for your users in production. In order to better check for these integrations, we recommend testing the following in your application:

- **Upgrade and Downgrade Flow -** If you sell multiple subscriptions, you want to ensure that the right subscription is granted to your user when they upgrade and downgrade from different tiers of the subscription. You also want to make sure that the billing options such as a free trial or special pricing incentive are enabled. If you have a user that changes their subscription, check that the proration occurs correctly and that granting / removing entitlements also happens correctly.
- **Onetime purchases and repeatable purchases are handled correctly -** One time purchases only occur once and cannot be accidentally purchased again. Repetable purchases can happen immediately after they are created. Entitlments are generated on the beackend for both.
- **Cancel Subscriptions From App -** You want to make sure that subscriptions from your app are handled correctly. (See the section titled [Let users manage subscriptions](https://chromeos.dev/en/publish/pwa-play-billing#let-users-manage-subscriptions) for information on how to direct your users to cancel from within the app) **Note:** When a user cancels their subscription, the subscription doesn’t officially expire until the end of their current billing period. So, the user should still have access to their subscription plan features until the subscription expires.
- **Digital Goods and other payment options are served correctly -** If a user enters a digital storefront from an app context, they should see Google Play Billing available when going to subscribe. If the user enters the payment flow from a browser context, they should see the alternative payment flows served.
- **[Out of App Purchase](https://chromeos.dev/en/publish/pwa-play-billing#out-of-app-purchases) Flows**
  - **Subscription from promo code -** Subscriptions come in as unacknowledged purchases. When the user subscribes and opens the app, the subscription should be verified, entitlements should be granted, and the subscription should be acknowledged.
  - **One time purchase from promo code -** One time purchases should be acknowledged but entitlements may not be granted. Once the user logs into the app, make sure that the entitlement is granted.
  - **Consumable from promo code -** Consumable purchases should be acknowledged but entitlements may not be granted. Once the user logs into the app, make sure that the entitlement is granted and then consume the purchase so the user can repurchase the item.
  - **Cancel subscription from store account management -** When the user manages their subscription outside of your application (such as from the store page) make sure that their subscription is canceled correctly in your backend and entitlements are not continuing to be granted.
  - **Pause subscription from store account management -**
  - **Resubscribe from store management**
    - If canceling and resubscribing right away, the cancelation should just be undone.
    - If canceling and waiting for the subscription to expire and then resubscribing from the store management page, this would be considered an out of app purchase and would need to be acknowledged in app.
- **After a user is subscribed, they have a clear way to cancel their subscription -** Make sure that there is a clear path to cancel their subscription in the app. You can [direct users](https://chromeos.dev/en/publish/pwa-play-billing#let-users-manage-subscriptions) to the Google Play management page.
- **Entitlements are available across store contexts -** Entitlement for their subscriptions and purchases should be available across contexts, i.e., if they access from the app or from the website, their entitlements should carry over.
- **Entitlements are reflected accurately across stores -** Entitlements should be granted across stores. If a user subscribed or purchased via one store and then accesses it from another device, the entitlements should be carried over.

# Extra notes on using the Google Play Store

When testing using the Google Play Store and using [application license testing](https://support.google.com/googleplay/android-developer/answer/6062777), subscription licenses are set to renew every five minutes rather than the time interval set by your license.
