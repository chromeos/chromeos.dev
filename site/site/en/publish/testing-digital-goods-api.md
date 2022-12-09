---
title: Testing the Digital Goods API Integration
metadesc: How to ensure that your Digital Goods Integration is working properly.
date: 2021-11-05
weight: -3
---

Testing the Digital Goods API integration can make sure that there are no unexpected bugs for your user experience in production. This list of test cases, while not comprehensive, aims to help create a testing plan for your team to address the most common issues when releasing your application to the Google Play Store with the Digital Goods API enabled.

## License testing on the Play Store

We recommend testing the Google Play Billing scenarios on this page with [application license testing](https://support.google.com/googleplay/android-developer/answer/6062777). It lets the licensed testers you designate make test payments instead of charging them real money. License testing also speeds up the subscription renewal periods for more efficient testing.

## Test cases

We recommend testing the following in your application:

- **Upgrade and Downgrade Flow -** If you sell multiple subscriptions, you want to ensure that the right subscription is granted to your user when they upgrade and downgrade from different tiers of the subscription. You also want to make sure that the billing options such as a free trial or special pricing incentive are enabled. If you have a user that changes their subscription, check that the proration occurs correctly and that granting and removing entitlements also happens correctly.
- **Onetime purchases and repeatable purchases -** Onetime purchases only occur once and cannot be accidentally purchased again. Repeatable purchases can happen again immediately after they are purchased. Ensure that entitlements are generated on your backend for both.
- **Digital Goods and other payment options are served correctly -** If a user enters a digital storefront from an app context, they should see Google Play Billing available when going to subscribe. If the user enters the payment flow from a browser context, they should see the alternative payment flows served.
- **[Out of App Purchase](https://chromeos.dev/en/publish/pwa-play-billing#out-of-app-purchases) Flows**
  - **Subscription from promo code -** Subscriptions come in as unacknowledged purchases. When the user subscribes and opens the app, the subscription should be verified, entitlements should be granted, and the subscription should be acknowledged.
  - **One time purchase from promo code -** One time purchases will already be acknowledged by Play, but the user won't have the entitlement yet. Once the user logs into the app, make sure that the entitlement is granted.
  - **Consumable from promo code -** Consumable purchases will already be acknowledged by Play, but the user won't have the entitlement yet. Once the user logs into the app, make sure that the entitlement is granted and then consume the purchase so the user can repurchase the item.
  - **Cancel subscription from store account management -** When the user manages their subscription outside of your application (such as from the store page) make sure that their subscription is canceled correctly in your backend and entitlements are not continuing to be granted.
  - **Pause subscription from store account management -** The user can also manage their subscription from outside the application and [pause their subscription](https://support.google.com/googleplay/answer/7018481). The benefits of the subscription should be suspended during the paused period and resumed when the pause has ended.
  - **Resubscribe from store management**
    - If canceling and resubscribing right away, the cancelation should just be undone.
    - If canceling and waiting for the subscription to expire and then resubscribing from the store management page, this would be considered an out of app purchase and would need to be acknowledged in app. There will be a confirm subscription message in red text in the Play Store Subscription management page if the subscription is not acknowledged.
- **After a user is subscribed, they have a clear way to cancel their subscription -** Make sure that there is a clear path for users to cancel their subscription in the app. You can [direct users](https://chromeos.dev/en/publish/pwa-play-billing#let-users-manage-subscriptions) to the Google Play management page. **Note:** When a user cancels their subscription, the subscription doesn’t officially expire until the end of their current billing period. So, the user should still have access to their subscription plan features until the subscription expires. **Note:** When a user cancels their subscription, the subscription doesn’t officially expire until the end of their current billing period. So, the user should still have access to their subscription plan features until the subscription expires.
- **Entitlements are available across store contexts -** Entitlement for their subscriptions and purchases should be available across contexts, i.e., if they access from the app or from the website, their entitlements should carry over.
- **Entitlements are reflected accurately across stores -** Entitlements should be granted across stores. If a user subscribed or purchased via one store and then accesses it from another device, the entitlements should be carried over.
- **User accounts -** If your app has user accounts, be sure to test the sign-up and purchase flow for first time users.
