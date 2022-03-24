---
title: Developing Chrome Cursive, a PWA for Chrome OS
metadesc: Learn about how the Chrome Cursive team built a Progressive Web App to offer a snappy note-taking app for Chromebooks.
tags:
  - web
  - technical
  - productivity
  - stylus support
  - pwa
  - built-in
authors:
  - edwintay
  - dstockwell
date: 2022-03-29
---

_Since its creation, Chrome OS has showcased the best apps that the Web has to offer. However, there are certain experiences that users expect to have built-in on their devices but were missing on Chrome OS. We started building our own apps to meet these needs. While we have all sorts of technologies available to us as part of the operating system, we decided that the best way to meet user needs was building a Progressive Web App (PWA) using all the same technologies available outside of Google. Today we want to share some of the details behind building our latest app, [Chrome Cursive](http://cursive.apps.chrome)._

[Chrome Cursive](http://cursive.apps.chrome) is a note-taking app built for the growing number of Chromebook owners using a stylus. As we looked at our requirements, we realized that a Progressive Web App was the best fit, allowing us to rely on the web platform for many of our features and make it easier to build stylus apps on the web at the same time.

![Animation of Chrome Cursive being used. First, a stylus circles a hand-written word, the circle starts to glow, then the stylus is used to drag and drop the word elsewhere in the canvas. Next, a hand written word is scribbled over by a stylus, the scribble stats to glow, then the stylus taps the scribble and the underlying word and scribble are removed from the canvas. Finally, a straight line is drawn with a stylus at the top of the canvas, it starts to glow, the stylus presses down in the middle and an anchor with up and down becomes visible on the line, and the stylus drags the anchor down, pushing the drawings below the line in the canvas down and adding whitespace on top.](ix://posts/developing-chrome-cursive/R_GIf2.gif)

## App performance

For a note-taking app, nothing is more critical than speed. Whether you're trying to capture a fleeting idea or searching for a specific subject, you don't want your tool to get in the way. Cursive took advantage of multiple existing web platform technologies to ensure it would keep up with our users' thoughts.

The central feature of Cursive is the page that users write on with their stylus. Google already had a heavily-optimized, vector-based inking library written in C++. [WebAssembly](https://webassembly.org/) allowed us to bring all the benefits of this existing codebase to the web, ensuring our users would have a fully capable and high-performance writing experience. [Emscripten](https://emscripten.org/) helped us to translate our codebase to compiled WebAssembly, and framework improvements such as thread support and SIMD have helped us to further optimize the app towards speed.

We also wanted to make sure the app stayed responsive, even if the user was offline – ideas don't wait for WiFi. To achieve this, service workers provided the perfect tool to ensure that the application's resources are available at all times. Frameworks like [Workbox](https://developers.google.com/web/tools/workbox) exist to help ramp new PWA developers up quickly and have them deploy their own PWAs and service workers with minimal boilerplate.

While WebAssembly and service workers formed a strong foundation for the app, we had some ideas for new stylus-specific capabilities that would help not only Cursive but other developers building similar apps. A new [Handwriting Recognition API](https://github.com/WICG/handwriting-recognition/blob/main/explainer.md) enables Cursive to automatically recognize note titles while taking advantage of Chrome OS's hardware-accelerated machine learning service and Google's handwriting recognition. A [Note Taking manifest entry](https://github.com/WICG/manifest-incubations/blob/gh-pages/note_taking-explainer.md) allows users to jump straight to a new note from a button on the Shelf. And while it wasn't entirely new, we reused the [desynchronized canvas hint](https://developers.google.com/web/updates/2019/05/desynchronized) to get the same incredibly low-latency inking that we launched with Chrome Canvas in 2019.

## Developer experience

Finally, let's switch to another type of performance – developer velocity. In order to both create consistency across our built-in apps and move quickly we wanted a way to share UI components. A natural solution for building the UI was [Web Components](https://developers.google.com/web/fundamentals/web-components). The Web Components APIs offered by the browser is a powerful, extensible way to build new custom components. It provides a way to isolate styles and create self-contained elements, which has helped us share components with other apps in Chrome OS. Using frameworks like [Lit](http://lit.dev), we’ve been able to continue to iterate on and create the right building blocks to solve problems for our users.

## #UseThePlatform

Both the web platform and ChromeOS have provided solutions for each of Chrome Cursive’s requirements. Each of the technologies we’ve used continue to see investment and improvement. As they evolve, we’re excited to take advantage of [new capabilities](https://chromeos.dev/en/web) the web and ChromeOS continue to offer, and to see what new apps you’ll be building on top of these platforms.
