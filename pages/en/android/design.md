---
title: Design recommendations
metadesc: How to optimize your layouts and UI components for different screens sizes and configurations.
date: 2020-05-01
weight: -6
tags:
  - input devices
  - keyboard support
  - stylus support
  - trackpad support
---

Android makes it easy to develop an app that runs well on a wide range of device screen sizes and form factors. This broad compatibility works in your favor since it helps you design a single app that you can distribute widely to all of your targeted devices. However, to give your users the best possible experience on each screen configuration you need to optimize your layouts and other UI components for the different sizes and configurations you will encounter. On Chrome OS, optimizing your UI lets you take full advantage of the additional screen space available and offer new features, present new content, or enhance the experience in other ways to deepen user engagement.

## Layouts for larger screens

If you developed your app for handsets and now want to improve your design on Chrome OS and other large-screen form factors, you can start by making minor adjustments to your layouts, fonts, and spacing. In some cases — such as for 7-inch tablets or a game with large canvas — these adjustments may be all you need to make your app look great. In other cases, such as for larger displays, you can redesign parts of your UI to replace a "stretched UI" with an efficient multi-pane UI, easier navigation, and additional content. Take a look at the [Material Studies](https://material.io/design/material-studies/) done by the Material Design team to see examples of what this may look like for different products. Below you can see what [Reply](https://material.io/design/material-studies/reply.html) looks like for different screen sizes.

![Reply Material Study](/images/android/design/reply.png)

Here are some suggestions:

- Provide custom layouts for these larger screens. You can do this by using the screen's [shortest dimension](https://developer.android.com/guide/practices/screens_support#NewQualifiers) or the [minimum available width and height](https://developer.android.com/guide/practices/screens_support#NewQualifiers).

- Imagine how your UX and layouts work in a landscape first environment such as Chrome OS. Either adapt your layouts to look and perform well when in these orientations based on window size or provide specific landscape layouts by using the land resource qualifier. You can learn more about dynamic window resizing and other considerations for large screens on [the Window management page](/{{locale.code}}/android/window-management).

- Bottom navigation bars don't scale well when your app is stretched to be quite wide. Think about pulling out your navigation from the bottom to a left
  side menu where it's easier to find and use while also having the opportunity to surface more options. The Reply example above shows this very well.

- At a minimum, customize dimensions such as font sizes, margins, and spacing for larger screens, to improve the use of space and content legibility. Especially think about how things may look when users are a bit
  further from the device such as a Chrome OS device or other desktop environments.

- Adjust the positioning of UI controls so that they are easily accessible to users when using a mouse or holding a tablet, such as toward the sides and away from the center.

- Padding of UI elements should normally be larger on Chrome OS & other large-screen devices than on handsets. [Your margins and gutters](https://material.io/design/layout/responsive-layout-grid.html#columns-gutters-margins) should all adapt as you get to different screen sizes.

- Adequately pad text content so that it's not aligned directly along screen edges. Use a minimum 16dp padding around content near screen edges.

In particular, make sure that your layouts do not appear "stretched" across the screen:

- Lines of text should not be excessively long — optimize for a maximum of 100 characters per line, with best results being between 50 and 75.

- Lists and menus should not use the full screen width.

- Use padding to manage the widths of onscreen elements or switch to a multi-pane UI for larger screen devices (see next section).

## Take advantage of extra screen area

Chrome OS devices provide significantly more screen real estate to your app. As you consider the UI of your app when running on larger screens, make sure that it’s taking full advantage of the extra screen area available. In both the [Reply](https://material.io/design/material-studies/reply.html) example above and the [Rally](https://material.io/design/material-studies/rally.html) example below, you can see that both apps take a different approach for taking advantage of the screen size increase. Reply adds space to make it look cleaner and friendlier, while Rally throws more data on the screen so users can see more with less scrolling or taps.

![Rally Material Study](/images/android/design/rally.png)

A good place to start is by looking at things that may be hidden to the user, and how you can pull them out and make them visible. Whether that is showing more information about an item, making menu's visible that may be hidden behind a right-click or long-press, or showing different or deeper navigation options now that you have a larger left-side navigation area. These are small wins that can improve your UX and give a more native feel, without a complete re-design and overhaul of the current experience.

Here are some recommendations for your app:

- Your brand will dictate the direction that you should go when thinking about these different
  screen sizes. Deciding the things to prioritize and surface to the user is dependent on the type
  of user journey's that exist and the most commonly used features. For inspiration on how you may want
  to attack this, check out the [Material Studies](https://material.io/design/material-studies) and look at
  how each different product responds differently when you get to a larger screen.

- Think about how your app’s design should behave using a [responsive grid system](https://material.io/design/layout/responsive-layout-grid.html#), and how content/navigation/options should move as you get larger screen real-estate.

- Decide on which screen sizes you'll use a different layout, then provide the different layouts in the appropriate window size buckets (such as large/xlarge) or minimum window widths (such as sw600dp/sw720).
  Remember that as you get to these layouts, the overall context that the user was in shouldn't change, and you should try and retain all user state while transitioning between layouts (scroll position, text being written, etc)

## Use assets designed for higher density & larger screens

To ensure your app looks its best, provide icons and other bitmap assets for each density in the range commonly supported by Chrome OS. Specifically, you should design your icons for the action bar, notifications, and launcher according to the [iconography guidelines](https://material.io/design/iconography/#design-principles) and provide them in vector formats so that they can scale gracefully with the
different screens you will find your app on.

For more information on VectorDrawables and vector assets on Android, check out this
[blog post](https://medium.com/androiddevelopers/understanding-androids-vector-image-format-vectordrawable-ab09e41d5c68) by [Nick Butcher](https://twitter.com/crafty).

## Adjust font sizes and touch targets

To make sure your app is easy to use on Chrome OS and higher density screens, adjust the font sizes and touch targets in your UI, for all of the screen configurations you’re targeting. You can adjust font sizes through [styleable attributes](https://developer.android.com/guide/topics/ui/themes) or [dimension resources](https://developer.android.com/guide/topics/resources/more-resources#Dimension), and you can adjust touch targets through layouts and bitmap drawables, as discussed above.

Here are some considerations:

- Text should not be excessively large or small on larger screen sizes and densities. Make sure that labels are sized appropriately for the UI elements they correspond to and ensure that there are no improper line breaks in labels, titles, and other elements.

- The recommended touch-target size for onscreen elements is 48dp — some adjustments may be needed in your larger screen UI. Read more about [Spacing Methods](https://material.io/design/layout/spacing-methods.html#) to learn about touch targets and spacing between items as screen sizes change. These recommendations also meet minimum [accessibility guidelines](https://developer.android.com/guide/topics/ui/accessibility/apps).

- When possible, for smaller icons, expand the touchable area to more than 48dp using [TouchDelegate](https://developer.android.com/reference/android/view/TouchDelegate) or just centering the icon within the transparent button.
