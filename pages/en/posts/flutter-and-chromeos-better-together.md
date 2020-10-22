---
title: 'Flutter and Chrome OS: Better together'
metadesc: Android fuels mobile apps on devices that range far beyond your typical small-screen smartphone.
tags:
  - trend
  - flutter
  - keyboard support
  - mouse support
  - large screen
  - window management
  - android
  - android studio
  - linux
  - high-performance graphics
authors:
  - kennethford
  - csells
date: 2019-05-10
---

_This article originally appeared on Google Developers Blog._

Chrome OS is the fast, simple, and secure operating system that powers Chromebooks, including the Google Pixelbook and millions of devices used by consumers and students every day. The latest Flutter release adds support for building beautiful, tailored Chrome OS applications, including rich support for keyboard and mouse, and tooling to ensure that your app runs well on a Chromebook. Furthermore, Chrome OS is a great developer workstation for building general-purpose Flutter apps, thanks to its support for developing and running Flutter apps locally on the same device.

## Flutter is a great way to build Chrome OS apps

Since its inception, [Flutter](https://flutter.dev/) has shared many of the same principles as Chrome OS: productive, fast, and beautiful experiences. Flutter allows developers to build beautiful, fast UIs, while also providing a high degree of developer productivity, and a completely open-source engine, framework and tools. In short, it’s the ideal modern toolkit for building multi-platform apps, including apps for Chrome OS.

Flutter initially focused on providing a UI toolkit for building apps for mobile devices, which typically feature touch input and small screens. However, we’ve been building keyboard and mouse support into Flutter since before our 1.0 release last December. And today, we’re pleased to announce that Flutter for Chrome OS is now stronger with scroll wheel support, hover management, and better keyboard event support. In addition, Flutter has always been great at allowing you to build apps that run at any size (large screen or small), with seamless resizing, as shown in the [Flutter Gallery](https://github.com/flutter/gallery/).

The Gallery is an app designed to be a collection of Material Design & Cupertino widgets, behaviors, and vignettes implemented with Flutter. The app showcases responsive design as well as having keyboard navigation support throughout the app. This is a great place to look at how a well-designed app handles resizing windows and switching between different layouts, while also showcasing the built-in support for keyboard and focus navigation in the toolkit out of the box.

Because Chrome OS runs Android apps, targeting Android is the way to build Chrome OS apps. However, while building Chrome OS apps on Android has always been possible, as described in [these guidelines](/{{locale.code}}/android), it’s often difficult to know whether your Android app is going to run well on Chrome OS. To help with that problem, today we are adding a new set of lint rules to the Flutter tooling to catch violations of the most important of the Chrome OS best practice guidelines:

#[The Flutter Chrome OS lint rules in action](/images/posts/flutter-and-chromeos-better-together/flutter-chromeos-lint-rules.png)

When you’re able to put these Chrome OS lint rules in place, you’ll quickly be able to see any problems in your Android app that would hamper it when running on Chrome OS. To learn how to take advantage of these rules, see the [linting docs for Flutter Chrome OS](https://github.com/flutter/flutter/wiki/Linting-Flutter-apps-for-Chrome-OS).

But all of that is just the beginning -- the Flutter tools allow you to develop and test your apps directly on Chrome OS as well.

## Chrome OS is a great developer platform to build Flutter apps

No matter what platform you're targeting, Flutter has support for rich IDEs and programming tools like Android Studio and Visual Studio Code. Over the last year, Chrome OS has been building support for running the Linux version of these tools with the beta of [Linux on Chrome OS](/{{locale.code}}/linux) (aka Crostini). And, because Chrome OS also supports Android, you can configure the Flutter tooling to run your Android apps directly without an emulator involved.

#[The Flutter development tools running on Chrome OS](/images/posts/flutter-and-chromeos-better-together/flutter-on-chromeos.gif)

All of the great productivity of Flutter is available, including Stateful Hot Reload, seamless resizing, keyboard and mouse support, and so on. Recent improvements in Crostini, such as high DPI support, Crostini file system integration, easier adb, and so on, have made this experience even better! Of course, you don’t have to test against the Android container running on Chrome OS; you can also test against Android devices attached to your Chrome OS box. In short, Chrome OS is the ideal environment in which to develop and test your Flutter apps, especially when you’re targeting Chrome OS itself.

## Customers love Flutter on Chrome OS

With its unique combination of simplicity, security, and capability, Chrome OS is an increasingly popular platform for enterprise applications. These apps often work with large quantities of data, whether it’s a chart, or a graph for visualization, or lists and forms for data entry. The support in Flutter for high quality graphics, large screen layout, and input features (like text selection, tab order and mousewheel), make it an ideal way to port mobile applications for the enterprise. One purveyor of such apps is [AppTree](https://apptreesoftware.com/), who use Flutter and Chrome OS to solve problems for their enterprise customers.

> Creating a Chrome OS version of our app took very little effort. In 10 minutes we tweaked a few values and now our users have access to our app on a whole new class of devices. This is a huge deal for our enterprise customers who have been wanting access to our app on Desktop devices.

Matthew Smith, CTO, AppTree Software {.cite}

By using Flutter to target Chrome OS, AppTree was able to start with their existing Flutter mobile app and easily adapt it to take advantage of the capabilities of Chrome OS.

## Try Flutter on Chrome OS today!

If you’d like to target Chrome OS with Flutter, you can do so today simply by [installing the latest version of Flutter](https://flutter.dev/docs/get-started/install). If you’d like to run the Flutter development tools on Chrome OS, you can [follow these instructions](https://flutter.dev/docs/get-started/install/chromeos) to get started fast. To see a real-world app built with Flutter that has been optimized for Chrome OS, check out the [the Developer Quest sample](https://github.com/2d-inc/developer_quest) that the Flutter DevRel team launched at the 2019 Google I/O conference. And finally, don’t forget to [try out the Flutter Chrome OS linting rules](https://github.com/flutter/flutter/wiki/Linting-Flutter-apps-for-Chrome-OS) to make sure that your Chrome OS apps are following the most important practices.

Flutter and Chrome OS go great together. What are you going to build?
