---
title: SAML authentication in ChromeOS
metadesc: Perform SAML authentication in ChromeOS with the Credentials Passing API, password scraping, or enterprise enrollment.
date: 2022-11-11
---
# SAML authentication in ChromeOS

By default, Google's externally accessible account service handles
authentication for Google accounts. When an unauthenticated user visits a
[Google page](https://accounts.google.com/) that requires authentication, the
Google login form requests the user's email address and password. After the user
submits their email and password, Google authentication verifies that the
credentials entered are correct. If the credentials are correct, Google
authentication sets the user's login cookies.

Some enterprises use a more sophisticated model in which  a third-party identity
provider (IdP) handles authentication. Google authentication supports this model
via the industry-standard
[Security Assertion Markup Language (SAML)  protocol](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language).
An administrator can [configure](https://support.google.com/a?p=sso) a domain to
use SAML authentication.

## Obtaining the user's password

ChromeOS needs to identify the user's password entered during login to:

-  Encrypt the user's data stored on the disk drive.
-  Protect the lock screen.
-  Enable offline login when there is no network accessibility.

When using  SAML, the password is not entered on a ChromeOS system dialog
directly, but inside a webview hosted by the identity provider. While ChromeOS
has access to the HTML, there is no simple, canonical way to get the password as
it is unclear which form fields contain the data.

There are two ways to get a user's password when using SAML: the Credentials
Passing API and password scraping.

## Chrome Credentials Passing API

Google provides a
[Credentials Passing API](https://www.chromium.org/administrators/advanced-integration-for-saml-sso-on-chrome-devices)
that identity providers can implement on SAML pages, in JavaScript, to pass the
required data to ChromeOS. Google authentication uses this API, but any SAML
identity provider could use it as well.

## Password scraping

A SAML identity provider may use password scraping when they don't support the
Credentials Passing API.

In this method: 

1. The authentication screen injects a
    [content script](https://cs.chromium.org/chromium/src/chrome/browser/resources/gaia_auth_host/saml_injected.js)
    into the webview that hosts the login process. 
1. The content script identifies HTML input fields of type password and
    copies their contents into an array. The array is updated whenever the
    contents of a password field changes. 
1. Scraped passwords are sent to a background page that accumulates them.
    This way, the password can be captured even if the login flow spans
    multiple redirects to different HTML pages.

At the end of the login flow, the array of scraped passwords is retrieved from
the background page. Three cases are possible: no password was scraped, exactly
one password was scraped, or more than one password was scraped.

### No password was scraped 

The content script fails to locate the password in the HTML pages served by the
identity provider. The identity provider may not use traditional passwords.

In this scenario, ChromeOS will prompt the user to
[pick a manual password for the device](https://cs.chromium.org/chromium/src/chrome/browser/resources/chromeos/login/screen_gaia_signin.js?rcl=c4dd0ee9aebc827a18caa7cb0fdcf7c123d1a29f&l=981).
If the password does not exist (e.g. authentication by smart cards, NFC,
biometry), the ChromeOS authentication process may
[proceed without the password](https://cs.chromium.org/chromium/src/chrome/browser/resources/gaia_auth_host/authenticator.js?rcl=faf24c60e6177fe0dcda857ec257d84ebabddc0e&l=799).

### Exactly one password was scraped 

The content script identifies exactly one password. Most likely, this is the
user's password used for authentication.

In this scenario, we most likely scraped the user's password correctly. ChromeOS
will use the scraped
password[ as the user's password to continue the authentication process](https://cs.chromium.org/chromium/src/chrome/browser/resources/gaia_auth_host/authenticator.js?rcl=faf24c60e6177fe0dcda857ec257d84ebabddc0e&l=708).

### More than one password was scraped 

The content script identifies multiple passwords. This may happen under
circumstances such as an identity provider requiring a user to enter a permanent
password and a one-time password into the login form.

In this scenario, we probably scraped the user's actual password and some
additional password fields that are not of interest to ChromeOS. To determine
which one is the correct password, ChromeOS will prompt the user to enter the
password once more into an additional password prompt. 

If the password entered matches one of the scraped passwords, the user's actual
password has been identified and the authentication process will continue. If
there is no match, the user will be prompted to enter their password again.
After two mismatches, login fails with an error message.

## Enterprise enrollment

For Enterprise enrollment, the enrolling user's email address is needed to
associate the device with the correct domain. The email is sent from the Device
Management (DM) Server to Chrome in the
[username field of the PolicyData message](https://cs.chromium.org/chromium/src/components/policy/proto/device_management_backend.proto?rcl=d477c3a9479cbebc4c7c36b7b89d641abda404a2&l=448)
during device policy fetch.  There is no need to determine the user's
password.

