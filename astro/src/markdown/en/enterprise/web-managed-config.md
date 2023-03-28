---
title: Web Managed Configuration
metadesc: Using the Managed Configuration API to give Chrome Enterprise admins the ability to dynamically configure your web app.
date: 2022-04-30
weight: -6
---

As a developer you might want to let Chrome OS Enterprise admins dynamically configure your app. The [Managed Configuration API](https://wicg.github.io/WebApiDevice/managed_config/) offers you a powerful way of letting them manage the behavior of your app when it’s installed. You can define an interface to let admins pass configuration to your app and change its behavior dynamically, including, but not limited to:

- Set a certain window size on opening.
- Pre-populate server addresses or auth configurations.
- Enable or disable app features.

## Setting up the Web Managed Configuration API

Managed configuration requires steps to be done by both developers and Enterprise admins. Developers have to implement the API and publish their interface. Enterprise Admins have to configure their instance from the Admin Console. To illustrate these steps we’ll use configuring different login options as an example. An Enterprise admin might want to allow some users or organizational units to login with certain credentials and disable others.

### Define and share your configurable interface

As with any other type of external service, it’s a good practice to start by defining an interface that can be shared externally with any customer that wants to configure your app. Managed configuration sends a JSON dictionary to your app, so we recommend that you document each parameter with a description, type, default, and valid options. Here's what that may look like for a parameter to disable login options:

| Parameter             | Type     | Default | Options               | Description                             |
| --------------------- | -------- | ------- | --------------------- | --------------------------------------- |
| `DisableLoginOptions` | String[] | `[]`    | `"email"`, `"google"` | A list of login options to be disabled. |

Documenting the interface this way helps communicating the service with external teams and customers and can help you maintain it in the long-run. With the above, an Enterprise admin may use the following JSON to disable `"email"` login:

```json
{
  “DisableLoginOptions”: ["email"]
};
```

### Set managed configuration

​​The [Google Admin Console](https://admin.google.com/) provides an interface that allows Enterprise admins to set up a managed configuration. At the time of this writing the option appears at the right of the selected application, under the name **Managed configuration**. Entering a value and saving the configuration makes it automatically available for the managed application to use.

#[The Google Admin Console UI to insert managed config fields](ix://enterprise/web-managed-config/admin-console.png)

To disable a login, for example, the Enterprise admin can configure the app with `{ "‘DisableLoginOptions’" : ["email"]}` for all users under the root organizational unit. This will make that configuration automatically available to the managed app after saving the changes.

## Retrieve configuration from your app

With your interface defined and configuration being sent to your app, you now need to retrieve it inside your app. To do so, call the Managed Configuration API:

```js
navigator.managed
  .getManagedConfiguration(['DisableLoginOptions'])
  .then(function (result) {
    // result =  { "‘DisableLoginOptions’" : ["email"]}
    // hide email login option
  });
```

`getManagedConfiguration` is a promise-based function that receives a key as an array of strings and returns the result as a JSON object. This is the value entered by the Enterprise admin in the previous step.

!!! aside.message--note
**Note:** The Managed Configuration API is intended to be used in devices that are managed by an organization or an administrator. For apps that are not managed, the promise gets rejected.
!!!

The result can then be used to change your app's behavior,allowing administrators to configure your app dynamically and adjust it to the needs of all their organizational units.
