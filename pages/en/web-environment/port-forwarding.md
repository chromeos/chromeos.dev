---
title: Port forwarding
metadesc: How to configure port forwarding on your Chrome OS device to access local servers on other devices
date: 2020-06-01
weight: -7
---

When developing web apps, testing across multiple devices is vital to ensure that what you’re building will work for you users. Chrome OS’s built-in port forwarding allows you to open the port to your local development server, allowing access from phones or other computers.

!!! aside.message--warning
**Warning:** Launching in Chrome OS version 85, built-in controls for managing port forwarding are a new feature still under development, so the UI may change and the feature may break until it is stable. You can start using this with Chrome OS version 84 by enabling the _Crostini Port Forwarding_ flag (`chrome://flags/#crostini-port-forwarding`).
!!!

Start by going to the Linux (Beta) settings on Chrome OS and clicking the Linux box. There should be an option _Port forwarding_. Click on that.

![Linux settings page.](/images/develop/web/linux-settings.jpg)

This will open up the Port forwarding screen. When you set up ports to be forwarded, they’ll show up here. Click the _Add_ button to forward a port.

![Empty port forwarding settings page.](/images/develop/web/port-forward-empty.jpg)

When forwarding a port, you have three options: the port number to forward, the connection type, either [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) (default) or [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol), and if you want to label the port.

![Configuring port forwarding to forward port 3000 using TCP with a label "Server".](/images/develop/web/port-forward-configure.jpg)

Once added, your ports will show up in the Port forwarding list, where you can toggle them on or off or remove them entirely.

![Port forwarding settings page with a configured port of 3000 using TCP labeled "Server".](/images/develop/web/port-forward-configured.jpg)

In order to get the IP address to use with that port, in your Terminal app, run `hostname -I`. This IP address, combined with the port you’re forwarding, will allow any device on the network access to the server on the port you’ve forwarded.
