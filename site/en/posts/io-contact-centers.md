---
title: 'Google I/O: Building communications and contact center applications for the web'
metadesc: Learn how modern Web standards and Google ChromeOS APIs help to empower communications and contact center developers.
tags:
  - event
  - web
hero:
  youtube: nP-nMZpLM1A
  alt: Building communications and contact center applications for the web. Talk delivered at Google I/O 2023 by Raluca Monet and Austin David Christopher.
authors:
  - rmonet
  - adchristopher
date: 2023-05-10
---

_Edited transcript of "Building communications and contact center applications for the web" talk at Google I/O 2023 by Raluca Monet (Global Partnerships Lead for ChromeOS) and Austin David Christopher (Partner Engineering)._

Modern Web standards and Google ChromeOS APIs help empower communications and contact center developers to build, optimize, and most importantly, differentiate their applications from the competition.

Today, many agents are no longer workingn from a large facility. Instead, they are highly distributed, even in their own homes—taking calls on earbuds and using a laptop to get their job done. This is the reality for many contact centers today. [77% of service organizations](https://www.deloittedigital.com/us/en/offerings/customer-led-marketing/digital-customer/elevating-customer-service.html) are adopting or accelerating remote work options.

In the last few years, we've seen a [24x increase](https://www.forbes.com/sites/forrester/2021/02/18/adopt-three-practices-to-boost-resiliency-for-customer-service/?sh=25120d2e21f9) in migration to cloud technologies. Moving communications and contact center solutions to the cloud also allows your customers to embrace automation and rethink business continuity.

But the web is _not a replacement platform,_ it's an **_expansion_** platform. Customers can be anywhere, and you are making **_your_** experience available to them wherever they are.

Through Progressive Web Apps, you can:

- Write apps that easily reach a broad audience across desktop and mobile devices —write it once and it works everywhere!
- Quickly launch and deploy app enhancements and fixes without requiring user intervention. You're no longer dependent on flaky end users who like to hit the "remind me tomorrow" option whenever there's an update available.
- Increase your development **_and_** test speeds by leveraging Web standards
- Contribute to building a safer, faster, and stabler way for **_all_** Internet users.

## Progressive web apps

Building for the Web starts with how you build applications. At their heart, Progressive Web Apps are just Web applications! Progressive web apps or PWAs are designed to provide all of the great capabilities you would get from a native, installed application, with all of the reach and engagement capabilities of Web apps.

Here are a few examples of Google Chrome Enterprise Recommended communications partners that have optimized their solutions for Web with Progressive Web Apps.

- **Webex** leveraged web technologies to launch a new PWA by offering integrated meetings, messaging and calling features, allowing users to join a unified and installable app-like experience on a Chromebook.
- **Zoom** recently migrated millions of users to their PWA from the Chrome App, which was previously a meetings-only experience.

With the PWA architecture they have been able to expand the capabilities to better match the full feature set that is available in their native Zoom application.

We will use these examples to see how we can customize these apps for enterprise.

### Traditional vs. Progressive Web Apps

Upon logging into your OS, the typical user experience of launching a web app requires two steps:

- The user typically needs to launch the browser first.
- Then the user has to navigate to your web app via a bookmark or URL.

For PWAs, the user launches your app directly from an icon on their home screen or shelf. This provides a user experience similar to launching native desktop applications, which many users are accustomed to. Once logged in—and on subsequent launches—the PWA presents the full experience that matches the native desktop application.

A progressive web app can be installed for enterprise or managed users. An enterprise administrator can apply app management policies through the Chrome Enterprise admin console.Enterprise managed PWAs can also take advantage of additional capabilities, such as web managed configurations. Web managed configurations allow admins to specify things like app settings through the admin console.

Further, users can login using their Zoom accounts and Google Sign-in crdentials. Zoom created web-managed configurations to restrict certain authentication options. Administrators can apply their web-managed configuration to disable Google Sign-in from the Chrome management console using a JSON object. After applying the web managed configuration through the admin console, the user can no longer use the Google Sign-in authentication option.

As a developer, you can expose any of your app settings as web-managed configurations which will make deploying your app more seamless and customizable for Enterprises.

There are few limitations with the web app compared to Native applications. Project Fugu is an effort to close the gap in web's capabilities, thereby enabling new applications to run on the web.

### Chromium WebHID standard

Another great Web optimization capability is delivered through the Chromium WebHID standard. WebHID enables web applications to interact with human interface devices (HIDs) other than the standard supported devices like (mice, keyboards, touchscreens, and gamepads). However, there are many other HID devices that are currently inaccessible to the web. This API allows web applications to request access to these devices, send and receive HID reports, and retrieve information about the report descriptor.

In communications and contact center environments, the primary WebHID use case is for Computer Telephony Integration with headsets. Leading headset integrators like HP/Poly, Jabra, and EPOS offer several models of headsets that are WebHID compatible.

The benefits of WebHID are:

- No more siloed, proprietary SDK integrations
  - By leveraging the new Chromium WebHID standard within communications and contact center applications, providers can easily integrate their WebHID call control into any compliant headsets
- Supported across all major operating systems
  - WebHID headset controls have been validated with Chrome Browser across ChromeOS, Windows, Mac, and Linux operating systems
- Supported across all Chromium-based browsers
  - WebHID is also available for any Chromium-based browser

Screen capture, screen sharing, and screen recording are other great communications and contact center use cases that can benefit from Chromium Web standards.

- `getDisplayMedia` is an extension of the Media Capture API (`getUserMedia`) that enables the acquisition of a user's display(s) or part thereof, in the form of a video track
- In some cases, system, application or window audio can also be captured and presented in the form of an audio track
- This enables a number of applications, including screen sharing using WebRTC or contact center screen recording
- Multi-display capture extends `getDisplayMedia` to support use cases where multiple screens need to be shared or recorded without requiring users to accept recording. Our Chrome Enterprise Recommended partners, like Dialpad that you see here, are now integrating to this new Web Standard to optimize for screen recording on ChromeOS
- Finally, ChromeOS completes the experience with always on, non-closable, screen recording support

## ChromeOS benefits for communications

If you've not used a ChromeOS device yet, you really should—it's simple, fast, and secure—zero reported ransomware attacks ever. These benefits are inherent to every Chrome device out there—Chromebooks, Chromebases, Chromeboxes—whatever, for whatever use case—consumer, enterprise, education. It doesn't matter.

But for the enterprise, because each use case and each company and each vertical all have different security concerns and compliance needs, what if we make the ability to implement policies flexible and customizable? What if we keep all this up to date as frequently as possible in a seamless fashion that doesn't require human action, interrupt workflows, or mandate significant downtime? That's what an Enterprise upgrade license affords you.

But more than that, Chrome Enterprise Upgrade licensing also unlocks new abilities that allow partners to differentiate their products on ChromeOS and deliver experiences only available on our cloud-first platform.

### ChromeOS desk connector

Last fall, the ChromeOS team introduced a new Chrome Enterprise capability called the ChromeOS Desk connector with leading partners like NICE and RingCentral. In contact center use cases, 53% of agents say they use 3 or more systems during a single call, and at Google, we've seen customers with extreme cases where they're opening over 20 apps and tabs to support a single customer inquiry! This poses a productivity challenge for users, as they either end up with a cluttered and complex desktop to navigate throughout their day, or need to spend the time manually managing windows and apps and getting back to their optimal starting point in between customer interactions.

With the ChromeOS Desk Connector, your communications and contact center solutions can automatically create a new "desk" for each customer interaction. Once the interaction ends, the desk with all its case-specific windows can be closed with one click.

### ChromeOS telemetry API

The users of your applications can often be impacted by device and OS performance, and business managers don't always have visibility into IT monitoring tools that power root cause analysis and proactive resolutions. The ChromeOS `Telemetry API` enables you to monitor the operation and health of devices running ChromeOS.

By incorporating ChromeOS Telemetry signals into your own communications and contact center dashboards, your customers can easily drill down from app or use-case specific KPIs into root cause issues with the devices they use. Our Chrome Enterprise Recommended partners, like Dialpad and UJET are working to integrate the ChromeOS `Telemetry API` into their reporting and dashboarding solutions to better monitor and troubleshoot device and application level issues that could be impacting customer experience.

## Conclusion

It's so exciting to see Chrome Enterprise powering the future of communications and contact centers and giving businesses around the world an opportunity to work smarter, faster, and more securely.

To close things out, if you are a communications or contact center partner, consider building or optimizing your application for the Web! This gives you an opportunity to become part of our ecosystem and work with our teams at ChromeOS, Chrome Browser, Google Workspace, and others and also work with great Software and OEM partners like the ones shown here.
