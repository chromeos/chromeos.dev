---
title: Testing Chrome OS Kiosk Mode
metadesc: Understand how to test your Chrome OS kiosk apps.
date: 2021-03-21
weight: -3
tags:
  - web
---

Chrome OS Kiosk Apps have a few basic requirements in order to test the applications:

- A Chrome Enterprise Domain ([Find out how to get one here](https://support.google.com/chrome/a/answer/9147838?hl=en#zippy=))
- A Chromebook (or [a Chrome OS Flex device](https://chromeenterprise.google/os/chromeosflex/)) that can be enterprise enrolled to your domain
- A web app that can be accessed across the web (if you want one for testing, try this site)

The first steps for testing your application is to set up your Chrome Enterprise Domain to have a test Organizational Unit associated with it. This can be done by going to [admin.google.com](https://admin.google.com) in a browser window and logging in with your administrator account and [creating a new organizational unit](https://support.google.com/a/answer/182537?product_name=UnuFlow&hl=en&visit_id=637808048512931898-3997595330&rd=1&src=supportwidget0&hl=en).

Then, from the admin console, you will need to go to `Devices > Chrome > Apps & Extensions > Kiosks` and select your newly created Organizational Unit in the left hand pane. From this section you can select what kiosk applications you would like to deploy to Chrome OS devices in that organizational unit by clicking on the yellow floating action button in the lower right hand corner.

![Expanded add app buttons with three child buttons, the top with a globe, the middle a black box with a three by three grid of circles, and the bottom the Chrome icon.](ix://education/testing-kiosk-apps/buttons.png 'Add app buttons')

Since you are deploying a Progressive Web Application (PWA), you should select the top globe icon. This icon will allow you to paste the URL of a PWA and have it deployed to Chrome OS devices as a kiosk application.

![Add by URL dialog box, with chromeos.dev entered in the field.](ix://education/testing-kiosk-apps/add-by-url.png 'Add by URL Dialog Box')

You should now see your kiosk application listed in your organizational unit with some extra kiosk settings that can be managed. See [this document](https://support.google.com/chrome/a/answer/9273974?hl=en) for more information on what those specific settings do.

![Kiosk Settings](ix://education/testing-kiosk-apps/kiosk-settings.png 'Kiosk Settings')

The app is now set to “installed” but not it's not set to be launched automatically on enterprise enrolled devices. This allows you to continue to use the Chrome OS device as usual with a normal boot and login sequence and then selectively launch kiosk apps, ideal for testing. To launch it, click the apps icon in the bottom left corner of the login screen on the Chrome OS device.

![Home Screen buttons with Shut Down, Apps, and Add Person](ix://education/testing-kiosk-apps/appLauncher.png 'Home Screen Launch App Button')

Now that you have the Chrome Admin console configured, it is time to enterprise enroll your Chromebook and then assign that Chromebook to the organizational unit. [This document](https://support.google.com/chrome/a/answer/1360534?hl=en) provides the most up to date information on enrolling a Chrome OS device. After your device is enrolled, visiting `Devices > Chrome > Devices` will provide the opportunity to move the device to the organizational unit that you originally configured kiosk mode for. This then provides the Apps icon as in the figure above. If you do not see the Apps icon, login to the Chrome OS device and visit `chrome://policy` and click the **Reload Policies** button to reload the policies, then logout of the device. You should see the apps button appear. Otherwise, you can set the app to autolaunch in the Chrome Admin Console.
