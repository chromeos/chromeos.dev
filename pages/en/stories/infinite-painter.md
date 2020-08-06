---
title: Infinite Studio ramps up active installations after optimizing for Chrome OS
metadesc: After optimizing for large screens, active Infinite Painter installations and overall in-app activity have both grown substantially.
app:
  name: Infinite Painter
  logo: gs://stories/infinite-painter/infinite-painter-icon
  company: Infinite Studio
hero:
  image: gs://stories/infinite-painter/hero
  alt: Screenshot of Infinite Studio with an in-progress painting and brush options open
  position: top
date: 2018-11-15
tags:
  - design
  - keyboard support
  - mouse support
  - touchscreen support
  - stylus support
  - trackpad support
  - input devices
  - large screens
---

With natural brushes, realistic blending, and an unparalleled toolset, [Infinite Painter](https://play.google.com/store/apps/details?id=com.brakefield.painter) is one of the most advanced painting apps available on mobile. Fueled by its mantra, “Pushing the boundaries of mobile,” the developer team at Infinite Painter saw an opportunity to boost its reach and bridge the gap between its existing mobile audience and the fast-growing Chromebook user base.

Despite more users migrating from using traditional desktops and interactive tablets to mobile devices, Infinite Studio started receiving more requests to make Infinite Painter available on wider and more immersive desktop screens. The development team realized it could bring Infinite Painter into a desktop-style environment by optimizing the app for Chrome OS. Because Android apps can run on Chrome OS, and users can easily access them via Google Play, the team was able to make these updates without much heavy lifting.

## What they did

The dev team's first step was figuring out what would make Infinite Painter's UX more attractive while running on a desktop. The team decided to tap into new Chromebook features ideal for immersive, wide-screen experiences by making three key adjustments: adding keyboard shortcuts, optimizing for new input devices, and enabling resizable windows.

### ![](/images/icons/keyboard.png){.icon--rounded} Keyboard shortcuts

The first thing Infinite Studio realized was how often designers and illustrators use keyboard shortcuts to speed up their workflow. So, the developers added 30 industry-standard shortcuts and organized them in an easily accessible dropdown menu triggered by holding down the [[CTRL]] key.

![Control display for Infinite Painter](gs://stories/infinite-painter/infinitepainter-controls)

### ![](/images/icons/mouse.png){.icon--rounded} Input devices

Next, Infinite Studio [optimized the app for various input devices](/{{locale.code}}/android/input-compatibility), such as an external mouse, fingertips (some Chromebooks come equipped with a touch screen), a stylus, or a touchpad. For touchpads, the team added the ability to easily zoom and pan the canvas with two-finger gestures. For external mouses, they added scroll wheel zooming and tooltips that appear when users hover over interface elements with their cursor.

The developers already had support for stylus and fingertip input for mobile users, but they worked closely with the Chrome OS team to make the experience even smoother with the low-latency API. This enables the app to draw strokes directly to the screen overlay, and gives users the feeling of drawing directly on the screen with their stylus or fingers.

### ![](/images/icons/aspect_ratio.png){.icon--rounded} Resizable windows

Finally, the team [optimized the app to support varying window sizes](/{{locale.code}}/android/window-management). Users can resize the app window for an optimal experience on any form factor, whether they prefer to work in full-screen mode or to open and use another app beside it. The developers also added the ability for users to drag and drop external images into the app.

![Art board view of Infinite Painter](gs://stories/infinite-painter/infinitepainter-artboards)

## Results

> Best of all, nearly all of the migration was already done for us when Google added support for Android apps on Chromebooks.

Sean Brakefield, creator of Infinite Painter {.cite}

After optimizing for wider screens on Chrome OS, active installations of Infinite Painter have grown by 55%, and overall activity in the app has nearly doubled. Sean Brakefield, the creator of Infinite Painter, couldn't be happier with his team's decision: "Between users' growing demand for touch-centric experiences and the range of stylus-based Chromebooks being released, we knew it made perfect sense to optimize for Chrome OS," he concluded. "Best of all, nearly all of the migration was already done for us when Google added support for Android apps on Chromebooks."

%[(55%, Growth in active installations), (2x, Growth in overall activity in app)]

## Get started

Learn how to best [optimize your apps for Chrome OS](/{{locale.code}}/android/optimizing).
