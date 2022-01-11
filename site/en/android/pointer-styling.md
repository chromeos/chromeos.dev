---
title: Mouse pointer icons
metadesc: How to style your pointer icons for different use cases.
date: 2020-06-17
weight: -5
tags:
  - input devices
  - trackpad support
  - mouse support
---

Android users come to your app from all different types of form factors i.e., phones, tablets, foldables, and Chromebooks. When interacting with your application, especially on larger screens, users may also use some sort of pointing device like a three-button mouse. Android applications have support for applying different styling to the mouse pointer to help those users have a visual indication that they can interact with an object.

## Using the system default cursors

Users are familiar with different conventions for interacting with different types of objects on large screen devices. Android out of the box luckily provides developers with some of the most common cursor icons that users are familiar with. Adding in some of these system default cursor icons is easy. Let's take a look at the following Kotlin snippet:

```kotlin {title="Sample Kotlin" .code-figure}
myView.setOnHoverListener { view, _ ->
      view.pointerIcon =
         PointerIcon.getSystemIcon(applicationContext, PointerIcon.TYPE_HAND)
      false // Listener did not consume the event.
}
```

`myView` is the view that will be set to a pointer icon under certain conditions. The condition that is demonstrated is a hover state in this scenario. This is when the mouse is hovering over a view. (In other scenarios, it may be desirable to have a waiting icon when processing or a crosshair when playing a game). Here the `setOnHoverListener` is used to listen for when the pointer has entered that hover state and then act upon that event. Inside the event listener, `view.pointerIcon` is called to set the pointer icon for that particular view. An existing system icon is used to set the pointers icon. There are several system icons already built into Android and a full list can be found at the [bottom of this page](/{{locale.code}}/android/pointer-styling#system-default-cursors). The `TYPE_HAND` icon was used which will show a closed hand with the index finger extended.

## Using your own special cursor

You may find that the Android system icons don’t cover all your needs. For example, if you have a stock trading app, you may want to show a green “\$” as the mouse pointer when users hover over the buy button. Let’s break down the following Kotlin snippet:

```kotlin {title="Sample Kotlin" .code-figure}
// Loading a bitmap to use as a pointer icon
val dollarBitmap = Bitmap.createScaledBitmap(
    BitmapFactory.decodeResource(
        this.resources,
        R.drawable.dollar_sign
    ), CURSOR_WIDTH, CURSOR_HEIGHT, false
)

// Creating the pointer icon and sending clicks from the center of the mouse icon
PointerIcon.create(dollarBitmap, (CURSOR_WIDTH/2).toFloat(), (CURSOR_HEIGHT/2).toFloat())
```

First, create a bitmap for the icon. Here it is loaded from a drawable resource. Then, create the `PointerIcon` object using the bitmap. Set the hotspot (the pixel location clicks will originate from) to be the middle of the icon.
!!! aside.message--note
Note: The location of the hotspot depends on your use case. For example, a drawing app would set the hotspot to be the tip of the pen or paintbrush.
!!!

## Examples

Adding pointer icons to your application is a great way to help enable your users to have more intuitive experiences across the different device form factors they use. There are plenty of great [default system icons](/{{locale.code}}/android/pointer-styling#system-default-cursors) available and if those do not suit your needs, you are always able to load or create your own.

- **Drag and Drop -** If your application supports dragging from another application and dropping into your application you could implement the `TYPE_NO_DROP` icon. This would give a visual indication that your application does not support the mime type that is trying to be dropped into your app.
- **Mapping -** If you have a mapping application and you want to show users that they can pan the map, they could have an option to have the `TYPE_GRAB` icon when you are hovering over the map and when the user clicks, update the icon to a grabbing showing that they are currently panning the map.
- **Photo Editing -** Photo editing users like to have controls that allow them to select a magnifying glass to zoom in. You could change the cursor to a magnifying glass with the `TYPE_ZOOM_IN` icon when zoom in mode is selected.
- **And many more opportunities**

!!! aside.message--tip
To see different pointer changes in action check out this [GitHub Pointer Sample](https://github.com/chromeos/pointer-icon-sample)

![Custom pointer icons in an Android app.](ix://android/pointer-styling/pointer-icon.gif)

!!!

## Appendix

### Additional Reading

- [GitHub Pointer Sample](https://github.com/chromeos/pointer-icon-sample)
- [PointerIcon Android Class Documentation](https://developer.android.com/reference/android/view/PointerIcon)
- [Optimizing Apps for Chrome OS : Custom Cursors](https://developer.android.com/topic/arc/optimizing#custom-cursors)

### System Default Cursors

These are the available cursors by default in the Android System.

| Cursor Name                          | Icon                                                                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE_ALIAS                           | ![Alias Cursor Icon](ix://android/pointer-styling/Mouse-Pointer0.png 'Alias Cursor')                                                      |
| TYPE_ALL_SCROLL                      | ![All Scroll Cursor Icon](ix://android/pointer-styling/Mouse-Pointer1.png 'All Scroll Cursor')                                            |
| TYPE\_\_ARROW                        | ![Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer2.png 'Arrow Cursor')                                                      |
| TYPE_CELL                            | ![Cell Cursor Icon](ix://android/pointer-styling/Mouse-Pointer3.png 'Cell Cursor')                                                        |
| TYPE_CONTEXT_MENU                    | ![Context Menu Cursor Icon](ix://android/pointer-styling/Mouse-Pointer4.png 'Context Menu Cursor')                                        |
| TYPE_COPY                            | ![Copy Cursor Icon](ix://android/pointer-styling/Mouse-Pointer5.png 'Copy Cursor')                                                        |
| TYPE_CROSSHAIR                       | ![Crosshair Cursor Icon](ix://android/pointer-styling/Mouse-Pointer6.png 'Crosshair Cursor')                                              |
| TYPE_DEFAULT                         | ![Default Cursor Icon](ix://android/pointer-styling/Mouse-Pointer7.png 'Default Cursor')                                                  |
| TYPE_GRAB                            | ![Grab Cursor Icon](ix://android/pointer-styling/Mouse-Pointer8.png 'Grab Cursor')                                                        |
| TYPE_GRABBING                        | ![Grabbing Cursor Icon](ix://android/pointer-styling/Mouse-Pointer9.png 'Grabbing Cursor')                                                |
| TYPE_HAND                            | ![Hand Cursor Icon](ix://android/pointer-styling/Mouse-Pointer10.png 'Hand Cursor')                                                       |
| TYPE_HELP                            | ![Help Cursor Icon](ix://android/pointer-styling/Mouse-Pointer11.png 'Help Cursor')                                                       |
| TYPE_HORIZONTAL_DOUBLE_ARROW         | ![Horizontal Double Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer12.png 'Horizontal Double Arrow Cursor')                 |
| TYPE_NO_DROP                         | ![No Drop Cursor Icon](ix://android/pointer-styling/Mouse-Pointer13.png 'No Drop Cursor')                                                 |
| TYPE_NULL                            | No Cursor Will Display                                                                                                                    |
| TYPE_TEXT                            | ![Text Cursor Icon](ix://android/pointer-styling/Mouse-Pointer14.png 'Text Cursor')                                                       |
| TYPE_TOP_LEFT_DIAGONAL_DOUBLE_ARROW  | ![Top Left Diagonal Double Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer15.png 'Top Left Diagonal Double Arrow Cursor')   |
| TYPE_TOP_RIGHT_DIAGONAL_DOUBLE_ARROW | ![Top Right Diagonal Double Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer16.png 'Top Right Diagonal Double Arrow Cursor') |
| TYPE_VERTICAL_DOUBLE_ARROW           | ![Vertical Double Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer17.png 'Vertical Double Arrow Cursor')                     |
| TYPE_VERTICAL_TEXT                   | ![Vertical Text Cursor Icon](ix://android/pointer-styling/Mouse-Pointer18.png 'Vertical Text Cursor')                                     |
| TYPE_WAIT                            | ![Wait Cursor Icon](ix://android/pointer-styling/Mouse-Pointer19.gif 'Wait Cursor')                                                       |
| TYPE_ZOOM_IN                         | ![Zoom In Cursor Icon](ix://android/pointer-styling/Mouse-Pointer20.png 'Zoom In Cursor')                                                 |
| TYPE_ZOOM_OUT                        | ![Zoom Out Cursor Icon](ix://android/pointer-styling/Mouse-Pointer21.png 'Zoom Out Cursor')                                               |
