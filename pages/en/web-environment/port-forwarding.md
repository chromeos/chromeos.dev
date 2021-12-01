---
title: Port forwarding
metadesc: How to configure port forwarding on your Chrome OS device to access local servers on other devices.
date: 2020-06-01
weight: -7
tags:
  - developer tools
---

When developing web apps, testing across multiple devices is vital to ensure that what you’re building will work for you users. Chrome OS’s built-in port forwarding allows you to open the port to your local development server, allowing access from phones or other computers.

!!! aside.message--warning
**Warning:** Launching in Chrome OS version 85, built-in controls for managing port forwarding are a new feature still under development, so the UI may change and the feature may break until it is stable. You can start using this with Chrome OS version 84 by enabling the _Crostini Port Forwarding_ flag (`chrome://flags/#crostini-port-forwarding`).
!!!

Start by going to the developer settings on Chrome OS and clicking the Linux box. There should be an option _Port forwarding_. Click on that.

![Linux settings page.](/images/develop/web/linux-settings.png)

This will open up the Port forwarding screen. When you set up ports to be forwarded, they’ll show up here. Click the _Add_ button to forward a port.

![Empty port forwarding settings page.](/images/develop/web/port-forward-empty.png)

When forwarding a port, you have three options: the port number to forward, the connection type, either [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) (default) or [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol), and if you want to label the port.

![Configuring port forwarding to forward port 3000 using TCP with a label "Server".](/images/develop/web/port-forward-configure.png)

Once added, your ports will show up in the Port forwarding list, where you can toggle them on or off or remove them entirely.

!!! aside.message--tip
If you're unable to toggle a port, make sure you have Linux running by simply opening the Terminal app. Feel free to close the Terminal app once Linux is up and running. It will continue to run in the background unless you shut it down (right-click Terminal icon and select "Shut down Linux".)
!!!

![Port forwarding settings page with a configured port of 3000 using TCP labeled "Server".](/images/develop/web/port-forward-configured.png)

The last thing you'll need is the IP address of your host Chrome OS device. In "Settings", go to "Network" and select the network your device is on. You'll be able to see the IP address here. This IP address, combined with the port you forwarded, will allow any device on the same network to connect to the server on that port. On your other device, you can access the server at this address: `<host device IP address>:<port>`.
