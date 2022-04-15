---
title: Recommendations on using WebViews
metadesc: Recommendations for developers to stay compliant with content filtering requirements that schools may have when using embedded webviews.
date: 2022-04-19
weight: -3
tags:
  - web
---

Education institutions use content filtering products to prevent their users from accessing inappropriate content on their Chromebooks. There are a handful of ways that their users are able to escape this content sandbox and access content that they should otherwise not be able to access. We have compiled a list of recommendations for Android and Chrome App developers targeting the education market that should help with making sure that your applications work well for education users.

## Understanding WebViews in school scenarios

If your app uses WebViews to allow students to login to your service or to display documentation, it may enable students to browse the web without the content filtering protections provided by their schools. Some of the most popular content filtering products used by schools on Chromebooks are deployed as Chrome extensions, which can only see traffic within browser tabs. Since web content is often unpredictable, students can often traverse links within the WebView to browse the web freely, without content filtering protections. Carefully evaluate the use of WebViews in your app and consider the alternatives below.

## General app development advice

### Reduce or remove use of web browser content

By reducing the amount of browser based content shown in your application, you can reduce the likelihood of unwanted content being accessible within your application. If this is not possible, then ensure your WebView only serves content you want and does not link out to a search engine or the open web.

### Ristrict content in your WebViews

If your app requires a WebView, make sure that the content within your WebView is not able to escape your application and navigate to content that you do not own or control. This can be done by modifying the [WebView client to override loading certain URLs via an allowlist](<https://developer.android.com/reference/android/webkit/WebViewClient#shouldOverrideUrlLoading(android.webkit.WebView,%20android.webkit.WebResourceRequest)>) on Android or by manually parsing through your site and validating that the links do not link out to third party content that you cannot control as this may enable your users to go to inappropriate content. For Chrome Apps, you can use the [WebRequestEventInterface](https://developer.chrome.com/docs/extensions/reference/webviewTag/#type-WebRequestEventInterface) to also modify requests and validate that they are allowed to navigate to your allowed list of sites.

## Android apps

### Use Chrome Custom Tabs instead of WebViews

By employing Chrome Custom Tabs, you are simply redirecting your users to the Chrome Browser on the device that they are using. This is most useful for when you may have a third party identity provider that relies on implementing OAuth in a WebView. For Chrome OS, this will launch the normal browser and allow users to navigate within the page as normal but it will allow the enforcement of browser policies on the content that the students are accessing. For most educational organizations, this means that the content that would be displayed would be visible to content filtering extensions running on the browser.

### Using Google Sign In without an additional identity provider

If your Android application only uses Google Sign in, do not redirect to the WebView to sign in but rather handle it with the [One Tap sign-in and sign-up flow](https://developers.google.com/identity/one-tap/android). Links in this sign-in flow start a browser intent rather than an embedded WebView so your data can be viewed in the Chrome browser of the device, not a WebView which may not have the same filtering controls applied to it.

## Chrome Apps

### Launch external sites in the browser rather than an embedded WebView

If you have content such as help articles or other content that is not owned or controlled by you, it would help to link to that article in a new tab rather than open within the WebView that is running. To open a new tab from your Chrome App, you can modify your anchor tags to set the [target attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) to point to `_blank` which will allow the link to open in a new tab.

```html
<a href="https://google.com" target="_blank">External Site</a>
```

### Using a WebView for SSO authentication

When using a WebView for single sign on authentication, ensure that the identity provider you choose to use either opens new links in new tabs using the aforementioned target attribute of `_blank` or does not link to any content that allows them to escape to a search engine or other content that could give them broad internet access.
