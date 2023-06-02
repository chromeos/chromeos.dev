---
title: Improving WebView Compatibility
metadesc: Recommendations for developers to stay compliant with content filtering requirements that schools may have when using embedded webviews.
date: 2022-04-19
weight: -3
tags:
  - web
---

Education institutions may use content filtering solutions to control access to content on managed Chromebooks. These Android and Chrome App recommendations aim to help developers ensure their apps work well with content filtering solutions.

## Reduce web content in your app

If your app uses WebViews to allow students to login to your service or to display documentation, it may enable students to browse the web without the content filtering protections provided by their schools. Some popular content filtering products used by schools on Chromebooks are deployed as Chrome extensions, which can only see traffic within browser tabs..

By reducing the amount of browser based content shown in your application, you can reduce the likelihood of unwanted content being accessible within your application. If this is impossible, then ensure your WebView only serves content you want and does not link out to a search engine or the open web.

### Restrict content in your WebViews

If your app requires a WebView, you can limit the websites users can visit from your applications. This can be done by modifying the [WebView client to override loading certain URLs via an allowlist](https://developer.android.com/reference/android/webkit/WebViewClient#shouldOverrideUrlLoading(android.webkit.WebView,%20android.webkit.WebResourceRequest)) on Android or by manually parsing through your site and validating that the links  do not link out to third party content that you cannot control. For Chrome Apps, you can use the [WebRequestEventInterface](https://developer.chrome.com/docs/extensions/reference/webviewTag/#type-WebRequestEventInterface) to also modify requests and validate that they are allowed to navigate to your allowed list of sites.

## Launch external sites in the browser

You can reduce the risk of users getting past content filtering if you open web content in their built-in web browsers.

In Android apps, consider using [Chrome Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs/) instead of WebViews. On Android, the custom tab will open a browser tab that is themed like your application. For Chrome OS, this will launch the normal browser and allow users to navigate within the page as normal. Because it’s their normal browser, it will allow the schools to apply their existing enforcement of browser policies on the content. This means that the content that would be displayed would be visible to content filtering extensions running on the browser. This is especially useful for third party identity providers that rely on implementing OAuth in a WebView.

In Chrome Apps, links to content not owned by you should be opened  in a new tab rather than within the WebView that is running. To open a new tab from your Chrome App, you can modify your anchor tags to set the [target attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) to point to `_blank` which will allow the link to open in a new tab.

```html
<a href=”https://google.com” target=”_blank”>External Site</a>
```

!!! aside.message--note
**Note:** If you need to use a WebView in a Chrome App for single sign on authentication, ensure that the identity provider you choose to use either opens new links in new tabs using the aforementioned target attribute of `_blank` or does not link to any content that allows them to access  unintended content.
!!!

## Use Google Sign In

If your application only uses Google Sign in, do not use a WebView to sign in. Instead, handle it with the [One Tap sign-in and sign-up flow](https://developers.google.com/identity/one-tap). Links in this sign-in flow start from the browser instead of an embedded WebView, which may not have the same filtering controls applied to it.