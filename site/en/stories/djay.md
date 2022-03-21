---
title: Algoriddim gives mobile users the full power of djay by optimizing for Chrome OS
metadesc: Since launching on Chrome OS, djay has seen a higher engagement on desktop and mobile, as well as as large boost to app downloads.
date: 2019-11-26
app:
  name: Djay
  logo: ix://stories/djay/djay-icon.240.png
  company: Algoriddim
hero:
  image: ix://stories/djay/hero.1500.jpg
  alt: Screenshot of Djay command controls
tags:
  - android
  - music
  - large screens
  - keyboard support
  - touchscreen support
  - mouse support
---

[djay](https://www.algoriddim.com/djay-android) — one of the most successful music apps on Android developed by Germany-based [Algoriddim](https://www.algoriddim.com/) — is rooted in the desktop experience. Back in 2006, the team designed the first iteration of djay for laptops to empower every DJ, from beginners to professionals, with reliable performance and support for external hardware like MIDI controllers and audio interfaces. As smartphones took off soon afterward, Algoriddim reinvented djay for mobile and put the turntables at millions of people’s fingertips for the first time.

Fast-forward to today: more devices like Chromebooks are bridging the gap between desktop and mobile experiences, and high-performance, professional setups are becoming more relevant for DJs on mobile platforms. Chrome OS presented Algoriddim with an opportunity to bring together everything they’d learned about designing for desktop and mobile and deliver an incredible experience on a single platform.

Here’s how they combined the touchscreen functionality of mobile with desktop’s high performance, immersive large-screen display, and support for essential external hardware.

## What they did

Because they’d already designed djay’s layout for large-screen desktops from day one, most of Algoriddim’s optimizations involved taking advantage of the full performance and functionality of Chrome OS. Enabling the audio support that every DJ needs was priority number one:

### ![](ix://icons/audiotrack.png){.icon--rounded} Multi-channel audio and MIDI support

Multi-channel audio is critical to allow DJs to seamlessly prep the next track in their headphones before the audience hears it on the main mix. A lot of DJs also hook up external MIDI hardware devices like beatpads and samplers to their laptops, so being able to send and receive MIDI signals with a low-latency response on the app is just as essential.

The original djay for Android app had basic MIDI functionality, but it was far from ideal for professional DJs. Chrome OS presented an opportunity to give DJs full-scale support on mobile. Algoriddim worked closely with Android’s audio team to implement the [Android MIDI API](https://developer.android.com/reference/android/media/midi/package-summary) with djay’s internal MIDI stack and use the [Android audio SDK](https://developer.android.com/ndk/guides/audio) to optimize the app for multichannel audio, allowing DJs to route separate stereo channels from the app to a pair of speakers and their headphones.

Both optimizations ultimately brought djay’s original, high-end audio functionality full circle by putting desktop-level power into mobile users’ hands.

### ![](ix://icons/tablet-android.png){.icon--rounded} Optimizing full-screen layout for tablets

When Algoriddim considered how artists might use the app on devices with larger screens, they saw an opportunity to deliver an experience more unique than on a typical phone or desktop.

Rather than simply scaling the mobile UI, Algoriddim specifically positioned certain app elements and features like FX pads and EQs for tablet and touchscreen laptop users. This was hugely beneficial for performing DJs who frequently need to access multiple controls at the same time to achieve different effects, like seamlessly mixing songs by decreasing the bass of one song while simultaneously increasing the volume and bass on the next — not to mention moving the crossfader and applying multiple FX.

With the added screen real estate, Algoriddim was able to add core functionality to the main UI rather than hide it in auxiliary views that cover the main UI on phones and smaller devices, allowing for a powerful multi-touch experience that doesn’t disrupt a DJ’s workflow.

![A close up of a laptop with an Algoriddim music app.](ix://stories/djay/algoriddim.1500.png)

Best of all, the extra screen space allowed the team to empower DJs in an entirely new way by combining a touchscreen interface with keyboard and MIDI control, allowing for innovative workflows during live performance.

## Results

> We’ve always worked to create one ecosystem where every DJ has the tools they need on whatever device they choose, whether they’re a kid aspiring to be the next star or a professional with years of experience. Bringing djay to Chrome OS is a big step toward inspiring and empowering the next generation of DJs and giving them a new path to grow as an artist, which is right in line with our vision for the app.

Frederik Seiffert, chief technical officer of Algoriddim {.cite}

By bringing together the best of djay’s desktop and mobile features on large-screen devices, Algoriddim was able to reach millions more artists around the world. With a unique combination of MIDI support, multichannel audio, touchscreen functionality, and keyboard and mouse input, djay gives performing DJs the low-latency, high-performance setup they crave — and first-time DJs everything they need to get started.

Algoriddim has already seen millions of new app downloads, amounting to a 25% increase overall since the app was launched on Chrome OS. The team has continually received positive feedback from DJs around the world, and engagement is noticeably higher on desktop and mobile.

Frederik Seiffert, Algoriddim’s chief technical officer, was thrilled with how seamlessly everything came together: “We’ve always worked to create one ecosystem where every DJ has the tools they need on whatever device they choose, whether they’re a kid aspiring to be the next star or a professional with years of experience. Bringing djay to Chrome OS is a big step toward inspiring and empowering the next generation of DJs and giving them a new path to grow as an artist, which is right in line with our vision for the app.”

## Get started

Check out some best practices to [optimize your apps for Chrome OS](/{{locale.code}}/android/optimizing).
