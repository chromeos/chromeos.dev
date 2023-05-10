---
title: 'Storytelling for all: How LumaTouch created its celebrated touchscreen video editor for ChromeOS and Android'
metadesc: Discover how LumaTouch created its touch-centric video editing app for ChromeOS and Android.
date: 2023-05-10
app:
  name: LumaFusion
  logo: ix://stories/lumafusion/lumalogo-1.png
  company: LumaTouch
hero:
  image: ix://stories/lumafusion/banner.png
  alt: A screenshot of the LumaFusion app running on ChromeOS, with thumbnails of video clips in the top left of the screen, a vintage red car in the top right, and the editing timeline on the bottom.
featured: true
tags:
  - android
  - kotlin
  - high-performance graphics
---

Everyone has a story to tell. As technology becomes more intuitive and accessible, millions around the world are finding new ways to share their stories on their own terms.

Terri Morgan and Chris Demiris, cofounders of [LumaTouch](https://luma-touch.com/), know the power of video storytelling first-hand, having worked in the video editing industry for over 35 years. When they first experienced a tablet's touch interface, they knew it could expand the possibilities of video editing: making it intuitive, mobile, accessible, and fun. Inspired, they built [LumaFusion](https://play.google.com/store/apps/details?id=com.luma_touch.lumafusion)—a powerful, touch-first video editing app—for iOS in 2016.

In the beginning LumaFusion was focused on serving the needs of on-the-go journalists, providing them with desktop-quality video editing and customization in a nimble, powerful app.

But Terri and Chris wanted to make video editing more accessible by putting LumaFusion in the hands of storytellers on a wider range of platforms. "Storytelling is the key to our customers and why they want to use LumaFusion because the product allows them to tell their story in any way they want," said Terri.

> Storytelling is the key to our customers and why they want to use LumaFusion because the product allows them to tell their story in any way they want.
> {cite="Terri Morgan"}

The LumaTouch team knew there was a vast, untapped audience of Android and ChromeOS users—from aspiring video editors to journalists—who were hungry to tell their own stories.

Here's how Terri and Chris brought the magic of LumaFusion to ChromeOS and Android.

## Building a compositing engine from scratch with core components

The iOS version of LumaFusion was constructed on an existing framework (AVFoundation). This made recreating LumaFusion's multilayered compositing engine from scratch the most pressing technical challenge. It was essential to create the smooth video editing, scrubbing, and playback performance that the app was known for.

Chris brought aboard software development company SolbegSoft to create a proof-of-concept demo. The demo consisted of multiple videos playing back, animating, and showcasing various effects and filters. Video and audio effects had to be built from the ground up for ChromeOS by using OpenGLES shaders, recreating audio filters, and optimizing decoders. Check out the proof-of-concept demo [open-sourced on GitHub](https://github.com/chromeos/video-composition-sample).

Another puzzle was making sure LumaFusion delivered the same experience on Android and ChromeOS that users had come to love and expect.

The wide range of screen sizes and performance parameters across ChromeOS and Android devices meant that windowed layouts, control panels, and other major user interface components needed to be optimized across devices. The team had to create a common JSON-based project archive format to allow projects to be transferred between users of both platforms.

And while LumaFusion has and always will be focused on touch controls, Chromebooks' ability to work interchangeably with touch, trackpad, mouse, and keyboard brought back an element of traditional track-based editing.

![A video clip of a user interacting with the LumaFusion app on a Chromebook, including tapping the screen, dragging a clip onto the timeline, and adjusting the brightness.](ix://stories/lumafusion/lumafusion.gif)

Over the course of three years a team of four engineers worked on the primary development phase. The team paid special attention to conforming video—ensuring that no matter what video resolution, frame rate, file format, or color space a user fed into the backend, the final user-facing product would be seamless and functional.

In November of 2022 a ChromeOS version of LumaFusion was ready for beta testing.

## Coding in Kotlin brings the LumaFusion app to life

LumaTouch's dev team wrote the demo in Java but were eager to use a more modern programming language and avoid “coding themselves into a corner.” They landed on Kotlin, a programming language that helps boost productivity and maintain code safety. "Kotlin protects you against making simple mistakes," said Chris. "It helps you write code better the first time, and the integration that Kotlin has with the Android SDK is perfect."

> [Kotlin] helps you write code better the first time and its integration with the Android SDK is perfect.
> {cite="Chris Demiris"}

The team focused on thoroughly testing the beta version's performance across a variety of premium and affordable devices to ensure that no matter what device a user was editing on, they would get the best LumaFusion experience possible.

LumaFusion went into open beta on November 8, 2022. Following the open beta announcement, more than 12,000 customers signed up, eager to dive in.

Both Terri and Chris were already familiar with bug tracking software [Firebase Crashlytics](https://firebase.google.com/products/crashlytics), so the tool was a natural choice to track performance—and it proved essential during the open beta. The team received daily emails about what issues were trending among users so they could prioritize and fix them, while [event analytics](https://firebase.google.com/docs/analytics) provided valuable insight into user journeys.

After three months of bug bashing and polish, LumaFusion was ready for a [public launch](https://chromeos.dev/en/posts/lumafusion-brings-its-award-winning-video-editing-to-chromeos-and-android).

## Sharing the power of video storytelling with the world

Shortly after the beta launched in October of 2022, Amy Benson, a LumaFusion Customer Support and QA Specialist and documentary filmmaker, traveled to Nepal, where she'd previously filmed a documentary about a local family. In Nepal, access to and ownership of costly technology such as iPhones is scarce, making user-friendly and affordable devices essential for work and communication.

Amy taught local journalists and filmmakers how to use LumaFusion on their Android phones, allowing them to craft videos in the field, documenting everything from local elections to their daily lives without the need for expensive video equipment. Enabling people from all over the world to create professional-quality videos remains a north star of the LumaTouch team.

LumaFusion has seen strong and continuous growth in app installations across all devices since its release—particularly on larger screens. The LumaTouch team specifically optimized the app for large-screen devices to reach new audiences, and more than 50% of new Android users who downloaded LumaFusion did so on tablets and Chromebooks. Moreover, users spend 71% more time on larger screens compared to mobile.

%[(>50%, New Android users on tablets and Chromebooks), (71%, More large screen usage time than mobile)]

> Making sure anyone and everyone can tell their stories through video, regardless of budget or skill, is something that has always been important to us, and this is one of the key factors in keeping LumaFusion a one-time purchase. Bringing LumaFusion to ChromeOS and Android truly helps us achieve that goal.
> {cite="Teri Morgan"}

Terri and Chris are excited to see the stories that the upcoming generation of authors will develop for Android and ChromeOS.
