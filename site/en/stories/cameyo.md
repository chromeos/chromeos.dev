---
title: 'How Cameyo seamlessly delivers enterprise applications as PWAs to ChromeOS'
metadesc: Cameyo's Virtual App Delivery (VAD) solution enables IT teams to provide users with applications as advanced web apps.
date: 2023-04-13
app:
  name: Cameyo
  logo: ix://stories/cameyo/cameyo.png
hero:
  image: ix://stories/cameyo/hero.png
  alt: Screenshot of the Cameyo system running solutions including Visual Studio, Power BI, and OneDrive.
featured: true
tags:
  - pwa
  - web
---

Every year, more companies find themselves relying on ChromeOS. But one question is common: how can companies keep access to their legacy apps? While ChromeOS offers many options to build apps—including [Progressive Web Apps](https://web.dev/progressive-web-apps/) (PWAs), [Chrome Extensions](https://developer.chrome.com/docs/extensions/), and [Android apps](/{{locale.code}}/android)—migrating a large number of legacy applications to a new platform can be a challenge.

Cameyo provides a Virtual App Delivery (VAD) solution that enables IT teams to provide their users with access to all their applications on ChromeOS devices by publishing them as PWAs—including Windows, Linux, SaaS, and internal web apps.

Cameyo's VAD platform distributes and runs applications from a Windows or Linux host server, either fully-hosted by Cameyo on Google Cloud or self-hosted by the company in the cloud or on-premise. Users can run and interact with these applications in real-time without installing them on their machine; the experience is fully virtualized. As with application streaming, because no portion of the application is downloaded, there are fewer software and hardware limitations.

Cameyo's approach is also distinct from traditional virtual desktop infrastructure (VDI), which requires users to log into a virtualized operating system to access their apps and data. Cameyo is the only virtualization solution that delivers only the apps, without delivering the operating system. Extensive integration with ChromeOS, Google Cloud, and the [Google Admin Console](https://support.google.com/domains/answer/6319254?hl=en#:~:text=The%20Google%20Admin%20console%20is,%2C%20create%20groups%2C%20and%20more.) enables IT teams to publish any application—including legacy apps—as an advanced web application. ChromeOS users maintain their secure, high-performance experience without sacrificing their existing apps.

## A seamless app experience on ChromeOS, without compromise

Cameyo considered multiple options for delivering apps to ChromeOS, but ultimately settled on PWAs. When paired with ChromeOS, PWAs have a number of advantages that align with Cameyo's mission of delivering seamless, virtualized apps:

- PWAs provide an app-like user experience—making virtual apps look and feel like installed apps, with their own window and taskbar icon that can be pinned to the shelf.
- PWAs can be centrally deployed using the [Google Admin console](https://admin.google.com) and delivered to specific users or groups with the [Directory API](https://developers.google.com/admin-sdk/directory/v1/guides).
- PWAs can be [associated with file extensions](https://developer.chrome.com/en/articles/file-handling/). For example, users can associate [PSD files](https://www.adobe.com/creativecloud/file-types/image/raster/psd-file.html#:~:text=frequently%20asked%20questions-,What%20is%20a%20PSD%20file%3F,image%20data%20storage%20and%20creation.) with a virtual instance of Adobe Photoshop. When users double-click on PSD files, a virtual instance of Photoshop will open—without needing to upload the file to the app first.

> This level of integration removes a potential barrier for IT teams that have been considering ChromeOS but were concerned about enabling legacy apps.
> {cite="Mark Bowker, Senior Analyst at Enterprise Strategy Group"}

Because advanced web apps integrate deeply with ChromeOS, they blur the line between virtualized and installed experiences. Leveraging the [File System Access API](https://web.dev/file-system-access/), Cameyo replaces classic Windows file **Open** and **Save** dialogs with ones that open the ChromeOS file picker, letting users work directly on local files. They also integrate with the [Google Drive API](https://developers.google.com/drive) on the backend OS to redirect legacy apps' input and output directly to the company's or user's Google Drive, letting apps use files stored in Drive without needing to be modified to support it.

![A video showing Cameyo's File Picker UI, from the integration with Native File System API. The video shows a user's cursor opening a local file on their device.](insert_image_url_here)

Virtualized apps also have direct access to device hardware and OS-level features, as if they were installed. Connected hardware, like thermal receipt printers for point-of-sale systems, can be used directly with virtualized apps, as if they were running locally through [WebUSB](https://developer.chrome.com/articles/usb/). The [Keyboard Lock API](https://web.dev/keyboard-lock/) lets users continue to use the productivity shortcuts they're used to, by letting users interact with their apps using reserved system keys and keyboard combinations, like [[ALT]]+[[TAB]] and [[CTRL]]+[[T]].

Even copying and pasting to virtualized apps works seamlessly, because the [Clipboard API](https://web.dev/async-clipboard/) grants read and write access to the clipboard programmatically. And thanks to Chrome's built-in [WebCodecs](https://developer.chrome.com/en/articles/webcodecs/), Cameyo can make graphically-intensive apps feel seamlessly integrated without needing to build and maintain their own video decoding libraries.

## Virtualized apps you can take anywhere

Cameyo's virtualized apps can be accessed from any device, with just a web browser—and with user preferences following users wherever they go. Cameyo integrates with [Google's OpenID Connect](https://developers.google.com/identity/protocols/oauth2/openid-connect) to provide users with a seamless single-sign-on experience that, when combined with the [Google Cloud Storage API](https://cloud.google.com/storage/docs/json_api/v1), allows user identities to be carried all the way down into the virtualized operating system, without having to connect to Active Directory, and with persistent data across sessions.

> Instead of the app needing to be physically installed and managed on each device, users can access those apps through the browser. For our employees, the experience is seamless. We've surveyed users to collect feedback on their experience using their apps and the results were phenomenal.
> {cite="Mario Zúñiga, IT Director, Digital Workplace at Sanmina"}

Because these apps tend to be business-critical, ensuring high availability is essential. Cameyo integrates closely with Google Cloud to help provide elasticity and flexibility. Leveraging the [Google Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1), Cameyo provisions backed OS virtual machines (VM) on demand. With the [Google Cloud DNS API](https://cloud.google.com/dns/docs/reference/v1), each VM gets its own DNS name and HTTPS certification to ensure transmission is kept secure—a big win for IT administrators who often find SSL setup and management a headache. Combined, these technologies let Cameyo's fleet of VMs scale with an organization's needs.

## Simplicity and security with Cameyo on ChromeOS

[ESG's Economic Value Validation report](https://services.google.com/fh/files/misc/esg_economic_value_validation_google_chromebook.pdf) found that the average cost savings for a medium-sized organization after switching to Chromebooks was $1.5M over three years. Still some organizations worry that they will lose access to their legacy apps by switching to ChromeOS. For three of Cameyo's customers, switching to ChromeOS led to significant cost reductions—without sacrificing the apps they needed or the speed and security they expect:

%[(85%, Reduction in remote desktop costs), (80%, Reduction in installation and maintenance time), (40%, Reduction in device costs)]

- Klarahill kept access to its critical legacy applications while switching to Chromebooks. Now, Klarahill pays [only 15%](https://cameyo.com/news/klarahill-reduces-remote-desktop-costs-by-85-percent-with-cameyo/) of what it used to pay for its remote desktop solution—and sees far fewer support issues.
- Nordward successfully converted their existing [Windows PCs to ChromeOS Flex](https://cameyo.com/news/nordward-selects-cameyo-to-transition-to-chrome-os/), seeing at least an 80% reduction in the time required for installation and ongoing maintenance.
- Sanmina achieved [40% cost reduction](https://cameyo.com/news/sanmina-selects-cameyo-virtual-app-delivery/) in devices, a seamless user experience, and [bolstered security](https://cameyo.com/news/sanmina-selects-cameyo-virtual-app-delivery/). Further, they were able to continue using legacy applications and interfacing with remote workers.

Solutions such as Cameyo make it possible for businesses to transition to (and gain the benefits of) Chromebook and ChromeOS Flex with reduced disruption. With Cameyo, organizations can orchestrate large scale Chromebook and ChromeOS Flex deployments without requiring expensive remote desktop solutions–or losing access to their legacy products.
