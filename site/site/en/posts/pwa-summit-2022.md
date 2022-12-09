---
title: 'Building the future of web apps: Highlights from PWA Summit 2022'
metadesc: With talks on PWA foundation, nuts and bolts for practitioners, inspiration from global brands, and improvements to the ecosystem, recap everything that happened at PWA Summit 2022!
tags:
  - event
  - web
hero:
  youtube: m-2lLWI_csE
  alt: PWA Summit 2022, block 1
authors:
  - samrichard
date: 2022-11-04
---

What sets the web apart from every other development platform? It belongs to all of us. The web’s communal nature is what helps us realize its potential, and no one knows this better than web devs. They enhance the web bit by bit every day to help all of us build better experiences for [more than 5 billion internet users worldwide.](https://www.statista.com/statistics/617136/digital-population-worldwide/) And Progressive Web Apps (PWAs) that make the most of the web’s capabilities while feeling “appy” are a big part of this effort.

That’s why a team of tech experts and enthusiasts from Google, Intel, Microsoft, and Samsung Internet [kicked off the PWA Summit](https://pwasummit.org/) last year — to create a space for the kind of knowledge sharing that defines our community. We recently held our second PWA Summit, complete with a variety of PWA-centric talks. From tips for making the most of web APIs and handy tools to inspiration and app standards, let’s dive into highlights from PWA Summit 2022.

## Foundations for newbies and pros alike

Whether you’re on your first codebase or your hundredth, brushing up on the basics can set you up for success. Check out the talks below to engage with the essentials.

**[How well do you know PWAs?](https://www.youtube.com/watch?v=WjQ8BaYYuFc) by Samsung Internet Web Developer Advocate Laura Morinigo**

The first step toward building PWAs is understanding exactly what they are — and what they’re not. Although modern APIs give advanced PWAs a native look and feel, PWAs are still web apps. That means all you need to get started is the must-have trio: HTML, CSS, and JavaScript. And because PWAs are web-based, they can coexist with and within native apps. This is a strategy that brands such as Pinterest have embraced to boost user retention.

One of the biggest advantages of PWAs is that they benefit from the web’s unrivaled reach. But it’s important to remember that not every browser implements all web features. For instance, Safari and Firefox don’t currently support installation on desktops. To get to know PWAs even better, explore [Laura’s talk](https://www.youtube.com/watch?v=WjQ8BaYYuFc).

**[From starter app to store package with PWABuilder](https://www.youtube.com/watch?v=fp7Y_ulGMlY), by Microsoft Software Engineer Justin Willis**

If you’re looking for PWA tools, the web dev community has you covered. The [PWABuilder toolchain](https://www.pwabuilder.com/) is a Microsoft-sponsored, open-source collection of everything you need to create powerful PWAs from scratch or add PWA capabilities to an existing project.

One of these tools is the [PWA Starter](https://docs.pwabuilder.com/#/starter/quick-start) — an app code template that has everything you need to kick things off, complete with a fast stack and [Workbox](https://workboxjs.org). You can use the [PWABuilder Studio](https://docs.pwabuilder.com/#/studio/quick-start), a Visual Studio Code extension, to do everything from manifest management to PWA validation. Once your PWA is ready to ship, you can package it on [PWABuilder.com](https://www.pwabuilder.com/).

The PWABuilder toolchain is constantly evolving. And like any open-source project, the door’s always open. You can interact with the PWABuilder community on its [Discord](https://aka.ms/pwabuilderdiscord) and contribute to projects on [GitHub](https://github.com/pwa-builder/PWABuilder). To dig deeper into PWABuilder, head on over to [Justin’s talk](https://www.youtube.com/watch?v=fp7Y_ulGMlY).

## The nuts and bolts of PWAs for practitioners

Getting a handle on the more intricate elements of development will help you take your PWAs to the next level. Explore the talks below to get into the details of storage and real-life use cases.

**[Challenges in storing large amounts of client-side data](https://www.youtube.com/watch?v=tEOzwbvmTpA), by ZenGM Indie Video Game Developer Jeremy Scheff**

If you’re storing a lot of data locally, you’re likely familiar with [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). Although the API has come a long way, with better cross-browser support and wrapper libraries such as [idb](https://www.npmjs.com/package/idb) and [Dexie.js](https://www.npmjs.com/package/dexie), it still has its drawbacks. For instance, you can’t run more complex queries such as joins and aggregations.

But the web dev community has been finding workarounds. Libraries such as absurd-sql and wa-sqlite let devs run SQL queries on top of data stored in IndexedDB by connecting it to the back end of SQLite.

Another challenge when working with IndexedDB is inadvertent data loss. Browser data might be cleared — either automatically or manually — or simply evicted when disk space is low. The [Origin Private File System](https://web.dev/file-system-access/) (an API for high-performance file system access) is a potential solution, but that depends on browser support. To learn more about how client-side data storage is evolving, explore [Jeremy’s talk](https://www.youtube.com/watch?v=tEOzwbvmTpA).

**[Web apps for everyone, everywhere: PWAs to the rescue of people in low-internet areas](https://www.youtube.com/watch?v=3vG6cWW7_n0), by Telos Labs Software Developer Alicia Rojas**

Not everyone has the web at their fingertips at all times, which makes better offline support critical to accessibility. So when Alicia’s team was asked to create an app that farmers in low-connectivity areas could use to troubleshoot issues with their fields, they homed in on the factors critical to offline PWA use: installability and support for offline create, read, update, and delete (CRUD) actions.

The [Background Sync API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API) — which lets web apps defer actions until there’s stable network connection — and IndexedDB were critical to supporting these CRUD actions. Let’s say a farmer tried to create a new diagnosis survey without the internet. IndexedDB, a local database, would store this request as a JSON object. Then, once the farmer was back online, Background Sync would detect this connection to synchronize with the server. To learn more about what web apps can offer and how you can enhance offline capabilities, check out [Alicia’s talk](https://www.youtube.com/watch?v=3vG6cWW7_n0).

## Inspiration from leading global brands

More and more businesses are creating PWAs to delight their users. Press play on the talks below for some pointers from YouTube and Flipkart.

**[YouTube’s PWA journey](https://www.youtube.com/watch?v=YgyacSnI--4&t=1s), by YouTube Software Engineers Bogdan Balas and Thibault Poisson**

When YouTube realized its users wanted offline capabilities the most, the team decided to [make the web app installable](https://chromeos.dev/en/stories/youtube). One of their main challenges was navigating multi-tab experiences. People could have multiple videos running at once in different tabs, but issues would pop up if all tabs talked to the download server at the same time. So the team introduced leader election to the client, which effectively limited downloads to one tab at a time with the [Web Locks API](https://github.com/w3c/web-locks/blob/main/EXPLAINER.md).

YouTube also has its own in-house browser, Cobalt, and improving it is a critical part of elevating the UX. A handful of the latest tweaks to Cobalt include support for service workers to improve latency, further optimizations for Core Web Vitals, and progressive degradation to video rendering, which improved metrics 4X. To learn more about how devs brought YouTube offline, take a spin through [Bogdan’s and Thibault’s talk](https://www.youtube.com/watch?v=YgyacSnI--4&t=1s).

**[Building Flipkart Ads PWA — The journey](https://www.youtube.com/watch?v=8vtiGogoaNk), by Flipkart AdTech Engineering Manager Abinash Mohapatra**

With mobile use continuing to gain steam, the Flipkart team knew their users were craving reliable on-the-go experiences. This inspired them to create a PWA version of the company’s Flipkart Ads desktop app, built in 2019 to help advertisers configure and run campaigns. One of the team’s main priorities for their PWA was network resiliency. By implementing a slightly altered version of the [stale-while-revalidate](https://developer.chrome.com/docs/workbox/caching-strategies-overview/#stale-while-revalidate) strategy, they were able to check this off and make the most of cached data.

Another nonnegotiable for the team was a tailored, frictionless UX. With the app rich install via manifest, they were able to control the install prompt and tailor it to local heuristics. For instance, a campaign manager might be asked whether they’d like to download the PWA after successfully creating an ad campaign. To find out more about how you can delight users, get advice from [Abinash’s talk](https://www.youtube.com/watch?v=8vtiGogoaNk).

## Collaborative projects to lead the way

Developers and industry players are constantly teaming up to improve PWA development and capabilities. Dive into the talks below to get an idea of what’s in store for our community.

**[Modern PWA: A winning combo for the best client experience](https://www.youtube.com/watch?v=tOlApKqoo7Q), by Intel Principal Engineer of Web Platform Engineering Kenneth Christiansen**

The right software and hardware are two sides of the same coin. They’re both essential to build powerful PWAs, so the Intel team is constantly working with devs on each front. For instance, one of the APIs in the works is [WebGPU](https://developer.chrome.com/docs/web-platform/webgpu/) — which, tests indicate, is 3.7X faster than WebGL. Another one is the [Compute Pressure API](https://wicg.github.io/compute-pressure/), which will indicate whether a client device is being overworked or throttled.

What’s more is that all of Intel’s new chipsets use hybrid architecture. That means one die has two different kinds of cores — heavy-duty Performance-cores and efficiency-maximizing Efficient-cores. Because threads and tasks can be tagged with their roles instead of priority, PWAs can take up less power consumption without sacrificing performance. To find out more about how Intel is working with and for the dev community, check out [Kenneth’s talk](https://www.youtube.com/watch?v=tOlApKqoo7Q) and [slides](https://noti.st/kennethchristiansen/T90KFJ/modern-pwa-a-winning-combo-for-the-best-client-experience).

**[Expanding developer control on PWA installation](https://www.youtube.com/watch?v=Ua1b88-cJn0), by Google Senior Developer Relations Engineer Adriana Jara**

When PWAs first rolled out, people used them simply to add a website to home screens. These apps have since evolved into a world of immersive experiences, but installability continues to be a core feature. That’s why the Chrome team is currently working on ways to give devs more control over the install process.

The approach? Chrome will soon support default offline experiences for PWAs, and service workers will no longer be essentials for meeting the install criteria. With this requirement removed, devs will be able to harness their understanding of their PWAs and users to onboard people in the most intuitive, seamless way. This will empower devs to build even stronger relationships with their users in the long run. To discover more about this improvement that’s right around the corner, dive into [Adriana’s talk](https://www.youtube.com/watch?v=Ua1b88-cJn0).

## Keep up with the PWA Summit community

We’re already rolling up our sleeves to map out our next event. In the meantime, all of our talks will be waiting for you whenever you need them on our [YouTube channel ](https://www.youtube.com/c/PWASummit/featured)— and you can stay in touch with us on [Twitter](https://twitter.com/PwaSummit) and our [Discord server](https://discord.com/invite/3NXBUQAVnA).
