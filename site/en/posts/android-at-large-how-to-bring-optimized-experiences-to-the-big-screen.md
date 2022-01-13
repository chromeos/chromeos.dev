---
title: 'Android at large: how to bring optimized experiences to the big screen'
metadesc: 'Discover how to build great experiences for the larger display devices: tablets, foldables, laptops, and desktop devices.'
tags:
  - technical
  - trend
  - large screen
  - window management
  - input devices
  - device configuration
  - mouse support
  - android
  - android studio
authors:
  - kennethford
hero:
  image: ix://posts/android-at-large/hero.jpg
  alt: Blueprint design showing various android devices and formfactors.
date: 2020-04-21
---

_This article originally appeared on Android Developers Medium._

For many people, Android is synonymous with smartphones, unsurprising considering that over 2.5 billion users run Android on smartphone devices. However, Android devices now come in many different shapes, sizes, and form factors: from wearables and fitness devices to cars, laptops, and TVs.

![Suite of Android devices](ix://posts/android-at-large/android-devices.jpg)

In this article, we’re looking at how to build great experiences for the larger display devices: tablets, foldables, laptops, and desktop devices. We are going to cover:

- UI and UX considerations
- App continuity
- Multi-window environments
- Multi-display environments
- Testing

## A paradigm shift

When it comes to readying your app for bigger screens it isn’t just the screen size you need to consider. Larger screen form factors affect the way people use your app, how they interact with the UI, and the focus they give your apps.

People use a smartphone for quick actions, usually while on the move, in portrait mode, interacting with the UI through touch. Smartphone users rarely hook up a second screen, keyboard, and mouse to their phone.

The tablet form factor is not as mobile: we don’t see people running around cities on their tablets. Users generally do more complex actions on tablets, spend more time in an app, and commonly work in landscape. However, UI interaction remains touch focused.

Spanning both of these interaction paradigms are foldable devices. While you will largely apply the learnings from smartphone and tablet form factors, foldable bring the challenge of extreme aspect ratios, from 21-to-9 when folded to nearly 1-to-1 when unfolded.

In desktop environments we have the largest screens, users interacting with apps for longer, focused on achieving specific tasks. It is also, keyboard and trackpad first. Some devices don’t have touch screens, so many of the assumptions about how people interact with a UI are no longer valid. This environment is landscape first. Users also have expectations from other desktop environments, particularly the ability to use multiple windows where apps can be resized at will to take on almost any orientation or aspect ratio.

So, compared to it’s smartphone version, as you think about how to handle different screen sizes and aspect ratios, you will need to consider new layouts and navigation patterns, and the resources to support them.

## UX and UI considerations

### Handle diverse aspect ratios

On devices where your app takes up the entire screen, large-screen form factors mean you need to allow for aspect ratios of 1 to 1 all the way to 21 by 9. On desktop form factors users may apply even more extreme aspect ratios. Take a communication app, users may place it in a tall, narrow window at the edge of the screen so they can view and respond to messages while working with another app that occupies the rest of the screen.

There is no magic bullet to addressing this diversity of aspect ratios, you will need to test and support these as best as possible.

However, if your app’s content is unsuitable for certain aspect ratios use the `minAspectRatio` flag, introduced in Android 10, or the [`maxAspectRatio`](https://developer.android.com/guide/topics/manifest/activity-element.html#maxaspectratio) flag to constrain your app within workable aspect ratios.

### Navigation patterns

Navigation patterns can break when you start supporting a variety of different devices. For example, take bottom navigation, here in a simple photo viewer app.

![Bottom navigation on a phone and desktop environment](ix://posts/android-at-large/bottom-navigation.jpg)

This navigation works well on smartphones. It’s easy to tell where the touch targets are, where one item ends and the other begins. However, when running on a desktop environment, with a wide display, it becomes hard to figure out where items end and what is actionable.

For large-screen, a better approach is to place options on the left side of the screen. If somebody is using your app on a tablet, this position places the options close to where their hand holds the device, making selection more convenient.

![Left-side navigation on desktop environment](ix://posts/android-at-large/left-navigation.jpg)

Left-side navigation is also a paradigm people are used to from web pages.

### Layouts

The photo viewer example shows that when you simply reuse a smartphone layout on wide screens, lists of items leave a lot of whitespace. Making better use of the space doesn’t mean applying a main/detail pattern and adding in as much content on the screen as possible. You should think about ways to surface more information or make tasks more efficient.

For example, option items in an overflow menu could be pulled out. So, instead of having to make three taps to edit, people can select that option directly now that there’s room to place it there.

![Pulled out options menu displaying all options on extra screen space.](ix://posts/android-at-large/pulled-out-options-menu.jpg)

Larger screens also make it possible to deliver more immersive experiences. For example, in a media-viewing or productivity app, there are many more ways to keep people engaged. It’s worth noting though, there is no one-size-fits-all solution to using this extra space.

Meanwhile, it’s worth checking out the [Material Studies](https://material.io/design/material-studies/about-our-material-studies.html) for inspiration. The Material design team have created design studies for several products with complete design mockups.

One of the studies is [Reply](https://material.io/design/material-studies/reply.html), an email client created with designed goals of clarity, legibility, intuition, and ease of use while projecting friendliness and competence for its brand.

![Reply application on various screen sizes.](ix://posts/android-at-large/reply-various-screen-sizes.jpg)

In this study, the message content is not changed significantly between the various screen sizes. However, navigation changes from a bottom nav in the smartphone layout to a nav drawer on larger screens, which pops out by default on the largest screens.

This example shows how the extra space on larger screens doesn’t need to be overloaded with additional information, but that whitespace can be used to make content easier to read.

Another study is [Rally](https://material.io/design/material-studies/rally.html), a finance app, that is designed to show as much information as possible so users can quickly see what they need to make decisions about their finances, then get out and get on with their life.

![Rally appliation on various screen sizes.](ix://posts/android-at-large/rally-various-screen-sizes.jpg)

### Input patterns

As form factors move towards the desktop, it becomes less likely that touch is the input medium used. Input could be through a stylus or mouse and keyboard. Therefore, you need to consider how to bring some of the input paradigms you see on desktop platforms to your app.

For example, consider handling right-click (context) actions, which you do by setting a `contextClickListener` and mapping long-press behavior to right clicks.

Another useful technique to help show people that things are actionable are hover actions. For example, you can change colors or elevation when hovering over action items using `setOnHoverListener` like this:

```kotlin {title="Sample Kotlin" .code-figure}
yourView.setOnHoverListener{ view, motionEvent ->
  when (motionEvent.actionMasked) {
    MotionEvent.ACTION_HOVER_ENTER -> {
      // UI change to highlight item
    }
    MotionEvent.ACTION_HOVER_EXIT -> {
      // Undo highlight
    }
  }
}
```

Or update the mouse pointer, for example to change it to a hand icon to indicate a grab or select function. This is a simple one-line implementation:

```kotlin {title="Sample Kotlin" .code-figure}
yourView.setOnHoverListener { view, motionEvent ->
 // Change to the hand icon that users expect when
 // hovering over something actionable
 View.pointerIcon =
   PointerIcon.getSystemIcon(context, PointerIcon.TYPE_HAND)
 false
}
```

### App continuity

App continuity is the capability of an app to seamlessly restore the user state when it receives a configuration change, for example, making sure it is in the same edit position in text or playback location in a video.

In smartphones the main case, rotation, is generally context-based, such as switching to landscape to view a video. On larger screen devices, with their support for multi-window, the focus for app continuity becomes the need to redraw and re-layout your app with minimal jank. In this animation, the Play Store app goes from a smaller window with a bottom nav to a large window with left-side nav.

![Smooth app transition on foldable phone](ix://posts/android-at-large/foldables.gif)

To achieve a smooth transition make sure your onCreate and lifecycle methods can be cycled quickly. To do this, ensure you’re not performing network operations or large memory reads on those methods. In addition, these types of task performed on those methods often cause crashes, making for a bad user experience.

The [`resizeableActivity`](https://developer.android.com/guide/topics/manifest/activity-element.html#resizeableActivity) flag is a manifest flag introduced to indicate whether an app supports multi-window and multi-display environments. Although, setting this to false does not mean that your activity never needs to resize. For example, on a foldable, if somebody unfolds the device you have to handle configuration changes correctly and make sure that you’re restoring the correct state.

But, if you have an activity that is set so it cannot be resized and its orientation is locked the new compat mode in Android 10 help guarantees that your app won’t get a configuration change when a device is unfolded.

![Activity running in compat mode on foldable device when unfolded](ix://posts/android-at-large/folded-to-unfolded.jpg)

In compat mode, in the bottom-right corner, there is an activity or application restart button for the user to restart the app. This button enables your app to get the new global config and draw on the available screen.

### Handling configuration changes

When a device is unfolded, apps get configuration changes for `smallestScreenSize`, `screenSize`, and `screenLayout`. If you’re not handling this yourself, you should use `onSaveInstanceState` and `ViewModel`'s to store your data and the user state as the configuration changes.

If you are handling it yourself in your manifest, you’ll get a callback for `handleConfigChange` and can swap out layouts or resources.

For the best experience, you should declare `resizeableActivity` to be `true` in your manifest. And, it’s recommended that you let the OS handle as many of these configuration changes as possible, given the number of edge cases where you may miss something, such as swapping out resources for different display densities.

## Multi-window

### Multi-resumed

On devices with large displays, people want to use apps side-by-side in a multi-window environment. Android 10 introduces an important change for managing this type of environment: multi-resumed.

Prior to Android 10, in a multi-window environment, only one of the visible activities is in the `RESUMED` state. This can be confusing for the user, as there is no visual indication of which activity is `RESUMED`.

With multi-resumed, all the visible activities are in the `RESUMED` state. However, apps can still end up in a `PAUSED` state where, for example, a transparent activity is on top of the activity or the activity is not focusable, such as in a picture-in-picture.

This change has been made in a way that minimizes the alterations you need to make: in most cases there should be no changes required to your app to work in multi-resumed. However, you may need to make changes for resources that can only handle exclusive access.

![Three activities wanting to use camera on the same device](ix://posts/android-at-large/multiple-camera-activities.jpg)

For example, if there are three activities wanting to make use of the camera, only one can access the camera. In this case you need to handle the `onDisconnect` callback from the camera and listen for camera availability. Note that setting `resizeActivity` to `false` won’t guarantee access to these resources because you can have a floating activity on top of your activity or secondary display with an activity that wants to use the camera.

Android 10 introduces a new callback, [`onTopResumedActivityChanged`](<https://developer.android.com/reference/android/app/Activity.html#onTopResumedActivityChanged(boolean)>), where the activity is notified when it’s the “top” resumed one.

```kotlin {title="Sample Kotlin" .code-figure}
protected void onTopResumedActivityChanged(boolean topResumed) {
  if (topResumed) {
    // Top Resumed activity
    // Can be a signal to re-acquire exclusive resources
  } else {
    // No longer the top resumed activity
  }
}
```

This translates to the `RESUMED` state for Android 9 and earlier.

### Drag-and-drop

Drag-n-drop is not a new feature in Android, but it’s something that makes a lot of sense when working in a multi-window environment. Especially for productivity applications, users want to use drag-n-drop for text and images.

As adding drag-n-drop can be involved, we recommend that you check out the [Android Developer guide on drag-n-drop](https://developer.android.com/guide/topics/ui/drag-drop), where you can find comprehensive documentation and some great code examples.

## Find out more

We have covered a lot of ground in this article and reviewed most of the key things you need to be doing to get your app working on larger screens. Find out more on the [Android Developer foldables guide](https://developer.android.com/guide/topics/ui/foldables) or [start building apps for ChromeOS](/{{locale.code}}/android).

For further insights, tune into the [Apps, Games, and Insights podcast](https://developer.android.com/podcasts/apps-games-insights) episode [_Building for larger screens and better game experiences_](http://appsgamesinsights.googledevelopers.libsynpro.com/building-for-larger-screens-and-better-game-experiences-episode-7?linkId=86702316) featuring insights from game developer Gameloft.
