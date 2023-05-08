---
title: 'Google I/O: Unlocking more Chrome Enterprise collaboration opportunities with new solution areas and features'
metadesc: A year in review of ChromeOS and Chrome browser in enterprise focusing on new solution areas and third party collaboration opportunities.
tags:
  - event
authors:
  - drobledo
date: 2023-05-10
---

Chrome Enterprise continues to help organizations of all sizes deploy modern, secure cloud-based tools to keep employees productive and happy wherever they work. In 2022, we saw more than 22% growth in active ChromeOS devices year over year (YoY)[^1]; and in a recent study, IDC found businesses can reduce three-year cost of operations by 44% and drive an average ROI of 245% over three years by deploying ChromeOS[^2] . In partnership with our enterprise developer community, we continued to drive further innovations to take our delightful and productive employee experience one step further this past year.

## Building a more integrated ecosystem to keep enterprises secure

Security is at the core of Chrome browser and ChromeOS’ DNA, but protecting against online threats requires more than securing an endpoint or browser—it requires securing the full computing stack. Last spring, we launched the [Chrome Enterprise Connectors Framework](https://cloud.google.com/blog/products/chrome-enterprise/extending-chrome-enterprise-through-new-security-partner-integration), a collection of connectors and APIs that simplify the steps needed to integrate Chrome browser and ChromeOS with solution providers. Available security connectors include:

- **Identity and access**: Offers your enterprise customers more control over who has access to which data and applications.
- **Endpoint management**: Enables Unified Endpoint Management providers to offer enterprise customers Chrome browser management capabilities on Windows, Mac, or Linux computers, or on ChromeOS devices.
- **Security insights and reporting**: Enables security providers to offer their customers proactive reporting insights on security events thus reducing threats to those organizations.

This year, we continue to invest in Chrome browser and ChromeOS capabilities that allow you to deliver better protection for your customers and those customers’ endpoints. In Chrome browser, we added [data loss prevention features](https://cloud.google.com/blog/products/chrome-enterprise/secure-enterprise-browsing-more-data-protections-visibility-and-insights) to deliver a more stable, secure experience for browser users. In ChromeOS, we [brought endpoint detection and monitoring tools](https://cloud.google.com/blog/products/chrome-enterprise/protect-business-data-chromeos-data-controls-and-new-security-integrations) into our platform that enable you to quickly integrate and deploy secure solutions to your customers.

[CrowdStrike](https://www.crowdstrike.com/press-releases/crowdstrike-introduces-industrys-first-native-xdr-offering-for-chromeos/) is leveraging our connectors to broaden protection for users; they support Chrome Browser with Falcon LogScale, and just launched support for ChromeOS with Falcon Insight XDR. Our portfolio of ChromeOS and browser security tools will continue growing in 2023 as we work with additional security providers to bring even more of these integrations to market.

> CrowdStrike collaborated closely with the Google ChromeOS team to provide our joint customers with complete visibility and threat detection for their ChromeOS devices, as part of the CrowdStrike Falcon platform. We developed an elegant, innovative XDR offering for ChromeOS devices that significantly reduces the added drain on resources caused by agent-based MDM solutions.
> {cite="Michael Sentonas, President, CrowdStrike"}

Learn more about [Chrome Enterprise Connectors Framework](https://support.google.com/chrome/a/answer/12166576?hl=en).

## Redefining customer experiences with ChromeOS solutions for kiosk and digital signage

ChromeOS is a great choice for kiosks and signage. Remote management features, including 500+ configurable policies, allow admins to access, control, and monitor distributed devices from anywhere using the Google Admin console. ChromeOS is secure by design, which means no third-party antivirus software is required, giving customers peace of mind regardless of the number of devices deployed. Seamless OS updates install in the background, reducing concerns about downtime or costly on-site support. Overall, ChromeOS’ flexibility, security, and reliability make it a great choice for the delivery of modern kiosk and signage solutions.

Last June, we launched even more tools to make it easier for developers and customers alike to adopt ChromeOS and bring the most delightful kiosk and signage experiences to their end users.

- **Kiosk and Signage Upgrade**: A management license designed to specifically provide the advanced security and remote management capabilities customers need to successfully deploy and manage kiosk and signage devices running ChromeOS. Developers can now focus on building great features with the backing of a seamless deployment and device management experience provided by Google.
- **ChromeOS Flex**: A sustainable and cost effective way to modernize and extend the life of devices an organization already owns. Customers can install ChromeOS Flex on purpose-built kiosk and signage devices, or PCs and Macs, to get the stability, security, management features, and energy savings[^3] of ChromeOS. This allows ChromeOS kiosk and signage solution providers to bring a more sustainable array of device options to their customers.

Check out the Google I/O session, [**Developing kiosk apps for ChromeOS**](/{{locale.code}}/kiosk), to learn more about all the ways ChromeOS simplifies and adds value to this segment.

## Contact centers improve agent productivity by 19% with ChromeOS

![Four ways to increase agent productivity with ChromeOS: customer satisfaction improvements, security, cost management, and ease of deployment.](ix://posts/io-2023-enterprise/call-center.gif)

In 2021, we launched our fully integrated ChromeOS solution for contact centers, and it has quickly become a valuable tool for our customers. A research study from IDC reports that contact centers using ChromeOS not only improve agent productivity by 19%, they also resolve tickets 33% more quickly[^4]. With the help of our contact center developer ecosystem, we’re striving to raise the bar even higher:

- **ChromeOS Desk Connector**: Last fall, we [launched the ChromeOS Desk Connector](https://cloud.google.com/blog/products/chrome-enterprise/customer-success-starts-chromeos) to Trusted Tester, an agent productivity capability that integrates with communications apps to automatically create a new desk for each customer interaction, organizing all the apps, windows, and tools an agent needs in one neat box. Leading contact center solutions have already integrated and more are planned for 2023.
- **ChromeOS Telemetry API**: Contact center providers can integrate the [ChromeOS Telemetry API](https://developers.google.com/chrome/management/guides/telemetry_api) into their own contact center dashboards to offer customers better application and device monitoring capabilities, thus minimizing issues that could impact customer experience and agent productivity.
- **WebHID:** [WebHID](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) helps contact center providers integrate their Human Interface Device headsets with their PWAs, reducing the need for siloed, proprietary SDK integrations for each specific headset provider.
- **Screen Capture**: Screen capture, sharing, and recording have a multitude of benefits for contact centers, including aiding in quality assurance, training or compliance–and they are great use cases for web standards. [`getDisplayMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) is an extension of the [Media Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API) that enables the capture of a user's display(s) or parts thereof, in the form of a video track. We are also currently testing a new API with select partners that enables multi-screen capture in contact center environments.

Check out the Google I/O session, [**Building communications and contact center apps for the web**](/{{locale.code}}/posts/io-2023-contact-centers), to learn more.

## Enhanced clinician productivity, mobility, and collaboration with ChromeOS

There are many powerful ways ChromeOS modernizes and enhances the delivery of care: its ease of management and deployment, security, and sustainable devices allow providers to focus on what matters most—the patient. We are working with leading healthcare solutions to offer these benefits to complex and nuanced healthcare use cases, such as:

- Mobile healthcare devices
- In-room entertainment and information
- Shared workstations
- Virtual care and telehealth
- Digitized training and communications
- Self-serve patient kiosks

Earlier this year, we announced an expansion of our partnership with leading identity and access management provider Imprivata, and new collaborations with best-in-class electronic health record (EHR) providers athenahealth, CareCloud, eClinicalWorks, Flatiron, PointClickCare, and Practice Fusion. These partners excel in access and management of patient health information across healthcare contexts—inpatient and outpatient care, ambulatory care, long-term care, oncology, and behavioral health.

![Imprivata, Practice Fusion, athena health, PointClickClare, Flatiron, CareCloud, and eClinicalWorks logos](ix://posts/io-2023-enterprise/health.png)

Read all about our exciting [advancements in healthcare](https://cloud.google.com/blog/products/chrome-enterprise/modernize-healthcare-delivery-chromeos).

## Best-in-class web app experiences on ChromeOS

[Progressive Web Apps](/{{locale.code}}/web) (PWAs) bring secure, installable, and linkable app experiences to ChromeOS through existing web technology and is our recommended platform for enterprise applications. PWAs are web applications, so they can be accessed directly from the browser or [distributed in other convenient ways](/{{locale.code}}/enterprise/app-distribution), giving enterprise users greater flexibility.

Solution providers who originally launched enterprise solutions using other technologies have been able to provide [great experiences on ChromeOS](/{{locale.code}}/stories) thanks to the powerful [capabilities](https://web.dev/tags/capabilities/) available to PWAs:

![Zoom, Webex, and Cameyo logos](ix://posts/io-2023-enterprise/enterprise.png)

- **Zoom**: Zoom migrated millions of users from a meetings-only Chrome App experience to a PWA that offers customers expanded capabilities that better match the feature set available in their native Windows and macOS Zoom application, such as Whiteboard, Team Chat, and VoIP Phone.
- **Webex by Cisco**: Webex leveraged web technologies to launch a [new PWA](https://blog.webex.com/video-conferencing/webex-and-google-improve-collaboration/) that offers integrated meetings, messaging and VoIP cloud calling features, allowing users to join a unified and installable app-like experience on a Chromebook.
- **Cameyo**: Provides a Virtual App Delivery (VAD) solution that enables IT teams to provide users with access to their applications on ChromeOS devices by publishing them as PWAs. [Cameyo implemented](/{{locale.code}}/stories/cameyo) advanced capabilities like [File System Access API](https://web.dev/file-system-access/), [WebUSB](https://developer.chrome.com/articles/usb/), and [Keyboard Lock API](https://web.dev/keyboard-lock/) to bridge the gap between native and the web.

Developers can start building PWAs from the ground up or enhance existing web applications, by making them more capable, reliable and installable. Start your PWA journey with the [Learn PWA course](https://web.dev/learn/pwa/).

## Stay informed

Over the last year, we’ve seen a lot of exciting developments in Chrome Enterprise solutions. From kiosk and digital signage to contact center development, the Chrome and ChromeOS ecosystem continues to expand, improving experiences for IT and users alike in a growing number of use cases.

We’re committed to bringing ChromeOS and Chrome browser’s delightful, secure, and modern experience to every worker wherever they are. And we couldn’t do it without the collaboration of the enterprise developer community—thank you!

We can’t wait to share with you what we have in store for 2023 and beyond. Stay ahead of the curve by visiting the [enterprise](https://chromeos.dev/enterprise) documentation, joining the [ChromeOS Discord channel](https://chromeos.dev/discord), and signing up for our [developer newsletter](https://chromeos.dev/subscribe).

[^1]: Google Internal Data, includes unmanaged devices, 2023.
[^2]: IDC Business Value Paper, sponsored by Google, The Business Value of ChromeOS, doc #49920522, stat refers to performance over three years of ChromeOS deployment, March 2023.
[^3]: Sutton-Parker, J. (2022), 'Quantifying greenhouse gas abatement delivered by alternative computer operating system displacement strategies'. Pre-Print for Science Direct. Berlin, Germany: ResearchGate.
[^4]: [IDC Use Case Brief, sponsored by Google ChromeOS, The Business Value of ChromeOS for Contact Centers, doc #49610022, October 2022](https://services.google.com/fh/files/misc/idc-business-value-report-chrome-enterprise.pdf)
