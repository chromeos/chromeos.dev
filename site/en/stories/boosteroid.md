---
title: 'How Boosteroid grew its ChromeOS users by 60%'
metadesc: How the Ukraine-based cloud gaming service grew its user base with ChromeOS.
date: 2023-11-09
app:
  name: Boosteroid
  logo: ix://stories/boosteroid/icon.png
featured: true
hero:
  image: ix://stories/boosteroid/hero.png
  alt: The Boosteroid platform highlighting Starfield, a Bethesta Softworks game. The screenshot includes a menu bar at the top with the Boosteroid logo and a button that says Subscribe and Play. The page shows a splash image of the video game, highlighting an astronaut, and buttons reading Play, + My Games, Get the Game.
tags:
  - games
  - android
  - keyboard support
  - large screens
  - input devices
---

Ukraine-based [Boosteroid](https://boosteroid.com/) is the largest independent cloud gaming provider in the world, with over 4.5 million active users [^1]. Boosteroid operates across eighteen data centers in Europe, North America, and Latin America, deploying custom cloud gaming servers designed with partners such as Asus, AMD, Intel, and more.

Boosteroid's mission is to enable its users to play any game anywhere, from high-end AAA titles to niche indie games—regardless of operating system, user device, or processing power. In pursuit of this mission, the Boosteroid team turned to ChromeOS. By adapting their platform for Chromebooks and adding Google Play support, Boosteroid was able to increase their ChromeOS users by 60% year-over-year and ChromeOS playtime by 30%.

%[(60%+, YoY ChromeOS users), (30%, Increased playtime on ChromeOS)]

## Chromebooks: a perfect platform for cloud gaming

Boosteroid lets users stream games without the need to download or store the games on their device. By using a cloud gaming platform, users no longer need to rely upon hardware performance or platform for best-in-class gaming experiences. Gamers can use a desktop or laptop computer (PC, Mac, or Linux), smartphone or tablet (iOS or Android), smart TV—or, of course, a Chromebook. Market analysts estimate that the cloud gaming market will grow from $5.76 billion to $84.97 billion by 2030.[^2]

For Boosteroid, ChromeOS appeared to be the perfect path toward audience expansion. Chromebooks are not only powerful enough to support Boosteroid's gaming platform, but they support a breadth of input options, from keyboard and mouse to touch-based gestures. Boosteroid believed that by developing for ChromeOS, they could focus purely on their PWA and web platform—letting ChromeOS manage the platform and device. Further, a transition to the ChromeOS ecosystem benefited Boosteroid in other ways, such as easier authentication handling and access to the Google Play store.

> ChromeOS drives wider cloud gaming adoption and brings video games far beyond their traditional audiences. We believe cloud gaming on Chromebooks contributes to a gaming-as-a-lifestyle trend and plays an important role in creating the future cloud gaming market where every gamer plays via the cloud.
> {cite="Artem Skoryi, VP of Business Development, Boosteroid"}

![Boosteroid's platform, depicting a splash of the video game Shatterline alongside a list of other games: Ready or Not, Age of Empires II, Fortnite, Dust & Neon, and Endling.](inline.png)

## The journey from web client to PWA in Google Play

Boosteroid sought to create a broader web experience while improving its user experience on Chromebooks. Building a Progressive Web App made it possible for Boosteroid to optimize its performance, UI, and UX on the ChromeOS ecosystem—while still maintaining its separate web client.

### Minor input tweaks

Boosteroid provides an overlay for touchscreen device users who do not have a physical gamepad. This allows for playing games in the cloud using Boosteroid even if the device has no mouse or keyboard and no controller is available.

> This is yet another example of how cloud gaming reduces entry barriers and costs associated with playing video games. However, an overlay controller can't substitute for a physical one—and may not be ideal for certain games, like first person shooters. Anyway, it's still a great way to lower the entry barrier and start playing right away.
> {cite="Artem Skoryi, VP of Business Development, Boosteroid"}

Boosteroid's engineering and UI/UX teams worked together on the size of the overlay controller buttons and their positioning on the screen—to reflect the screen sizes and resolutions most typical for ChromeOS devices.

### A "room full of gamepads"

To ensure the best possible user experience, Boosteroid had a QA team testing dozens of gamepads to ensure that they worked well with the Boosteroid remote cloud-based gaming rigs and specific end-user devices—TVs, mobile devices, PCs, and laptops.

> In our office, there's a room full of gamepads, where you can find all kinds of controllers we've tested—whether it's a 2-dollar gamepad or the latest Xbox controller. Effectively, we need to make sure our virtual gaming rig recognizes the gamepad. Often remapping is required, because the buttons do not work as they should by default.
> {cite="Artem Skoryi, VP of Business Development, Boosteroid"}

Boosteroid tested for a broad variety of use cases, such as ensuring that two controllers would work well in a single gaming session for games with local multiplayer and multiple gamepad support. With respect to Chromebooks, Boosteroid checked the compatibility between ChromeOS devices and fixed some minor errors in how their cloud-based gaming platform recognized the functions and buttons of some gamepads.

### …and on to Google Play

Besides optimizing for ChromeOS, Boosteroid integrated Google Play billing, increasing platform visibility and ease of access. Free trial functionality was implemented exclusively for customers subscribing via Play Store.

## Gaming for everyone, everywhere

Developing their Progressive Web App took only a few weeks. Google provided Boosteroid with several ChromeOS devices for tests—while also conducting internal performance testing—to ensure that Boosteroid provided an advanced gaming experience for every Chromebook user.

> Once we received Chromebooks from Google, we could check all the details with respect to how Boosteroid runs on ChromeOS. We made a couple of optimizations for Chromebook screen ratios and resolutions, to ensure that our User Interface was displayed correctly.
> {cite="Artem Skoryi, VP of Business Development, Boosteroid"}

Boosteroid built several scenarios to test the user interface and performance on a given device. For Chromebooks, Boosteroid optimized both the interface and performance—and since Chromebooks don't have dedicated graphics cards, they optimized to distribute the load on the device.

## Organic growth led by customer satisfaction

> For us success means that every gamer is free to choose where he or she wants to play and has absolutely no limitations in terms of processing power, OS or platform.
> {cite="Vlad Kosmin, Corporate VP, Boosteroid"}

Today, Boosteroid has 4.5 million customers—with zero marketing, just organic growth. Boosteroid considers their transition to [the Google Play market](https://play.google.com/store/apps/details?id=com.boosteroid.streaming) a success: Not only did they increase their ChromeOS user base by 60%, but ChromeOS users now spend approximately 30% more time playing on the platform.

In October 2023, Boosteroid established a company in the United States to further grow its business in North America and globally. By the early 2030s, Boosteroid expects over 90% of gamers to opt for the cloud—and hopes to have over 100 million active users by 2028. Meanwhile, Boosteroid's plans for the future include supporting interactive game engine-rendered videos, VR, AR, Metaverse applications, and cloud-based access for office, video, and audio apps.

[^1]: "[Microsoft announces partnership with cloud gaming provider Boosteroid to bring more games to more players around the world](https://news.microsoft.com/2023/03/14/microsoft-announces-partnership-with-cloud-gaming-provider-boosteroid-to-bring-more-games-to-more-players-around-the-world/)," Microsoft.
[^2]: "[Cloud Gaming Market Size ... 2023-2030](https://www.fortunebusinessinsights.com/cloud-gaming-market-102495)," Fortune Business Insights.
