---
title: Rendering differences
metadesc: How apps render differently on Chromebooks.
date: 2020-05-01
weight: -2
---

Because Android apps run in a window under Chrome OS, there are small differences in how apps are rendered on Chromebooks. These differences are outlined below.

## Tasks, windows, and transparency

A [task](https://developer.android.com/guide/components/activities/tasks-and-back-stack) consists of a stack of activities that the user interacts with when running an app. Tasks are presented on Chrome OS as a window with a title bar, with the apps layered on top of each other. Each activity can then be partially translucent, allowing the lower layers to show through.

In a conventional Android app, the previous task or the desktop shows through beneath the task. In this way there is always something visible beneath a translucent task.

This does not work in a window environment for the following reasons:

- The visible content below a window cannot be controlled and could therefore be anything.
- All fully transparent pixels would "magically" swallow all touch/mouse events.
- Window elements might visually be disconnected from the caption and confuse the user with possibly unconnected visual elements.

To mitigate this problem, Play for Chrome OS draws a semi-transparent rectangle behind each window. For this reason, apps can never be 100% transparent when running under Chrome OS, even when using the `Theme.Translucent.NoTitleBar` theme.
