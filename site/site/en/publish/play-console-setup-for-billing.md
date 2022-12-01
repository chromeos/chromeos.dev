---
title: Play Console setup for Play Billing
metadesc: How to set up the Play Console to monetize your app with Play Billing
date: 2021-05-13
weight: -7
---

To sell digital content and goods in your Play app, you’ll need to first set up the products and subscriptions in the [Play Console](https://play.google.com/console/developers).

In the left-hand menu for your app, there should be a “Monetize” section. Expand the “Products” item to see the three ways to monetize your app.

![To set up in-app products, subscriptions, and promo codes, expand the "Monetize" section of the menu.](ix://publish/play-console-setup-for-billing/play-console-monetize-menu.gif)

Before setting up your in-app products and subscriptions, first make sure that you’ve uploaded your APK or Android App Bundle (AAB) to a production or testing track. You will also need to add the `BILLING` permission to your app. For an Android app, follow the steps to [enable billing-related features](https://developer.android.com/google/play/billing/getting-ready#enable) in the Google Play Console. If you have a Progressive Web App, [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap/tree/main/packages/cli) lets you enable support for Play Billing in one of the prompts during the `init` setup.

## In-app products

“In-app products” is where you can add the information for the digital goods you want to make available for purchase in your app. Click “Create Product” and enter the appropriate information for the product.

Product ID
: This is a unique identifier for the product. It cannot be changed once the product is created, so be careful when creating the product ID. The product ID will not be shown to users and is mainly for identification purposes by Play. Also referred to as a product “SKU”.

Product details
: Choose an appropriate user-facing name and description for your product to give more information about the item to the user. These can be edited in the future, so feel free to change them as often as you see fit.

Price
: Set a default price for this product. This is how much it will cost to the user, unless there is an ongoing promotion at the moment. This field can also be changed after the product is created.

## Subscriptions

“Subscriptions” are another type of digital product. Instead of a one time payment for an item, a subscription is a recurring payment that should also have a recurring benefit to the user. Click “Create Subscription” to get started. You’ll see that most of the fields are similar to that of in-app products with a few differences.

Product ID
: Once again, this needs to be unique and cannot be changed once created.

Subscription details
: There is an additional field for “Benefits” where you can add the benefits that come with the subscription. This gives the user more information about what they would be getting.

Price
: Along with the default price, you’ll also need to set the billing period which is how often the subscription is renewed and the user is billed.

Subscription options
: These are additional options specific to subscriptions. You can give first-time subscribers a free trial to try it out first, or a reduced introductory price as an incentive. You can also set a grace period which lets users keep their subscription for that duration while they resolve their payment issues. Finally, you can also enable resubscribe to allow users to resubscribe from the Play Store after they cancel the subscription. For detailed information about how different subscription options work and can benefit your users, see the [subscriptions documentation](https://developer.android.com/google/play/billing/subscriptions).

## Promo codes

You can create promotional offers to get users interested in your app and digital content. In the “Monetize” section of the left-hand menu, select “Promo codes”. Click “Create promo code” and fill in the required fields.

Promotion name
: This won’t be shown to users and is just for you to identify the promo.

Start date and time
: Choose on what day and at what time you would like the promotion to start.

End date and time
: Choose on what day and at what time you would like the promotion to end. Note that promotions can last up to one year.

Promotion type
: Choose what kind of promotion you want to create.

    Paid app
    : If your app is paid, you can make it free for a limited time.

    In-app product
    : Offer your items free to users (e.g. let users unlock a special item that is not normally available) for purchase.

    Subscription
    : Promo codes offer free trials to subscriptions (not free subscriptions).You will need to enter the number of days the free trial is active for before requiring payment.

Promo codes
: Choose from two types of promo codes.

    One-time use codes
    : These are automatically-generated unique codes that users can redeem only once. Users redeem these codes either directly from the Play Store or from within your app.

    Custom codes
    : Also known as “Vanity codes”. These are custom promo codes specified by you that can be redeemed multiple times up to your predefined limit. Eg. “SPRING10DAYSFREE”. Custom codes are available only for subscriptions and can be redeemed only by users who have not previously subscribed.

## Payments profile

Lastly, you’ll want to access your revenue. If you haven’t set up your [payments profile](https://play.google.com/console/developers/paymentssettings) and merchant account before, in the main Play Console menu (not the one for your app), under “Settings” and “Developer account”, go to “Payments profile”. Fill in your business information to set up your payments profile which will then be automatically linked to your Play Console and developer account. Then in the “Payments profile” menu add a payment method to receive your earnings.

You can see more about your app’s financial data by going to the app’s menu and going to “Monetize” then “Financial reports”. There you can see various breakdowns of your revenue by your items, subscriptions, and buyers.
