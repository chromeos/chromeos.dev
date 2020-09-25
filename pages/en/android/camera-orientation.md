---
title: Camera orientations
metadesc: An in-depth guide on how to handle orientations in Android camera apps.
date: 2020-09-23
weight: 1
tags:
  - camera orientation
  - camera preview
  - camera viewfinder
  - JPEG orientation
  - large screens
resources:
  - title: CameraX Preview Documentation
    url: https://developer.android.com/reference/androidx/camera/core/Preview
---

If your Android app uses cameras, there are some special considerations when handling orientations. This article presumes you understand the basic concepts of Android camera2 API. You can read our [blog post](https://medium.com/google-developers/detecting-camera-features-with-camera2-61675bb7d1bf) or [summary](https://developer.android.com/reference/android/hardware/camera2/package-summary) for an overview of camera2. We also recommend that you try writing a simple camera app first before approaching the article.


## Background

Handling orientations in Android camera apps is tricky due to a number of factors:

1. Natural orientation: The display orientation when the device held naturally in the palm.
2. Sensor orientation: The orientation of the sensor physically mounted on the device.
3. Display rotation: How much the device is physically rotated.
4. Viewfinder size: The size of the viewfinder used for displaying the camera preview.
5. Image size output by camera: What output size is chosen.

These factors combined introduce a huge number of possible UI and preview configurations for camera apps. This document is meant to demonstrate how developers can handle orientations in Android camera apps.

To make things a bit simpler, let’s assume we’re dealing with a rear-facing camera unless otherwise mentioned. In addition, all photos below are simulated to make illustrations visually clearer.


## All about orientations

### Natural Orientation

Natural orientation is defined as the display orientation when the device is held naturally in the palm. For phones, their natural orientation is portrait. In other words, phones have shorter widths and longer heights. For laptops, their natural orientation is landscape, meaning they have longer widths and shorter heights. Tablets are a bit more complicated than this - they can be either portrait or landscape.

![Natural orientation illustration with a phone, a laptop and an object from the observer side](/images/android/camera-orientation/natural_orientation_observer_side.png)

### Sensor Orientation

Formally speaking, sensor orientation is measured by the degrees an output image from the sensor needs to be rotated clockwise to match the natural orientation of the device. Put it differently, sensor orientation is the degrees a sensor is rotated counterclockwise before being mounted on the device. To remember that the rotation is counterclockwise, keep in mind that the sensor is installed from the “back” side.

According to [Android 10 Compatibility Definition 7.5.5 Camera Orientation](https://source.android.com/compatibility/android-cdd#7_5_5_camera_orientation), front and rear-facing cameras “MUST be oriented so that the long dimension of the camera aligns with the screen’s long dimension.”. This means natural orientation should be parallel to sensor orientation.

Adding on top of that, the output buffers from cameras are landscape-shaped. Since the natural orientation of phones is usually portrait, the sensor orientation is typically 90 or 270 degrees on phones to ensure that it matches the natural orientation. Sensor orientation is different for devices whose natural orientation is landscape, for example laptops. On these devices, image sensors are usually just mounted as is, leaving the sensor orientation untouched, or 0 degrees to be precise.

![Sensor orientation illustration with a phone, a laptop and an object from the object side](/images/android/camera-orientation/sensor_orientation_object_side.png)

In all the illustrations below, we’ll be showing <span style="text-decoration:underline;">what the camera sees</span> from the side of the observer, essentially flipping the illustrations like so:

![Sensor orientation illustration with a phone, a laptop and an object from the observer side](/images/android/camera-orientation/sensor_orientation_observer_side.png)

Suppose we have the following scene:

![A scene with a cute Android figurine (bugdroid)](/images/android/camera-orientation/scene_bugdroid.jpg)

From our perspective (imagine looking through the image sensor boxes), we would see the following:

| Phone | Laptop |
| ----- | ------ |
| ![Image illustration from looking through the back camera sensor on a phone](/images/android/camera-orientation/sensor_orientation_after_phone.png) | ![Image illustration from looking through the back camera sensor on a laptop](/images/android/camera-orientation/sensor_orientation_after_laptop.png) |

Remember sensor orientation is usually 90 degrees on phones? Before accounting for sensor orientation, the images we would get actually look like:

| Phone | Laptop |
| ----- | ------ |
| ![Image illustration from looking through the back camera sensor on a phone](/images/android/camera-orientation/sensor_orientation_after_phone.png) | ![Image illustration from looking through the back camera sensor on a laptop](/images/android/camera-orientation/sensor_orientation_after_laptop.png) |

Suppose sensor orientation is `sensorOrientation`. To compensate for sensor orientation, we need to **rotate the output buffers by `sensorOrientation` clockwise** to bring the orientation back in alignment with the natural orientation of the device.In Android, we have TextureView and SurfaceView for apps to display their camera preview. While they both handle sensor orientation, apps still need to take it into consideration. We’ll detail how we should account for sensor orientation in the following sections.

### Display Rotation

Display rotation is formally defined by the rotation of the drawn graphics on the screen, which is the opposite direction of the physical rotation of the device. This statement is equivalent to the degrees the device is rotated counterclockwise from its natural orientation. One should not confuse display rotation with display orientation. Display orientation refers to the current “shape” of the display (e.g., landscape, portrait).

In the following sections we’ll assume display rotations are all multiples of 90. If you retrieve the display rotation by its absolute degrees, round it up to the closest of {0, 90, 180, 270}.

Suppose we rotate the device by 90 degrees counterclockwise as demonstrated in the figure below:

![90-deg display rotation illustration with a phone, a laptop and an object from the observer side](/images/android/camera-orientation/display_rotation_observer_side.png)

Let’s assume sensor orientation is already taken care of, meaning that we’ve rotated the buffer based on the sensor orientation. We’re then dealing with output buffers that look like:

| Phone | Laptop |
| ----- | ------ |
| ![Image illustration before display rotation is accounted for on a phone](/images/android/camera-orientation/display_rotation_before_phone.png) | ![Image illustration before display rotation is accounted for on a laptop](/images/android/camera-orientation/display_rotation_before_laptop.png) |

It should be visually clear that if the display rotation is `displayRotation`, we should **rotate the buffers by `displayRotation` counterclockwise** to compensate for display orientation.

For front cameras, display rotation actually has the opposite effect. If we’re dealing with a front camera, we should rotate the buffers by `displayRotatation` **clockwise**. The reason for this is that display rotation actually rotates the device clockwise from the perspective of a front camera.

#### Caveats

Display rotation measures the counterclockwise rotation of the device. This isn’t true for all orientation/rotation APIs.

For example,

*   If you use [Display#getRotation()](https://developer.android.com/reference/android/view/Display#getRotation()), you’d be getting the **counterclockwise** rotation as mentioned in this article.
*   If you use [OrientationEventListner#onOrientationChanged(int)](https://developer.android.com/reference/android/view/OrientationEventListener.html#onOrientationChanged(int)), you’d be getting the **clockwise** rotation instead.

The important thing to note here is that display rotation is relative to natural orientation. For instance, if we physically rotate a phone by 90 or 270 degrees, we’d get a landscape-shaped screen. In comparison, we’d get a portrait-shaped screen if we rotate a laptop by the same amount. Apps should always keep this in mind and never make assumptions about the natural orientation of a device.

#### Examples

Let’s use the previous figures to illustrate what the orientations and rotations are.

![Combined orientation illustration with a phone and a laptop unrotated, and an object](/images/android/camera-orientation/orientations_example_display_rotation_0.png)

| Phone                           | Laptop                          |
| ------------------------------- | ------------------------------- |
| Natural Orientation = Portrait  | Natural Orientation = Landscape |
| Sensor Orientation = 90         | Sensor Orientation = 0          |
| Display Rotation = 0            | Display Rotation = 0            |
| Display Orientation = Portrait  | Display Orientation = Landscape |

![Combined orientation illustration with a phone and a laptop with a display rotation of 90 degrees, and an object](/images/android/camera-orientation/orientations_example_display_rotation_90.png)

| Phone                           | Laptop                          |
| ------------------------------- | ------------------------------- |
| Natural Orientation = Portrait  | Natural Orientation = Landscape |
| Sensor Orientation = 90         | Sensor Orientation = 0          |
| Display Rotation = 90           | Display Rotation = 90           |
| Display Orientation = Landscape | Display Orientation = Portrait  |

### Viewfinder Size

Apps should always resize the viewfinder based on the orientations, rotations and screen resolution. In general, apps should make the orientation of the viewfinder identical to the display orientation. In other words, apps should align the long edge of the viewfinder with the long edge of the screen.

### Image Output Size by Camera

When choosing the image output size for the preview, we should choose a size that is just bigger than the size of the Viewfinder whenever possible. We generally don’t want output buffers to be scaled up which would cause pixelation. We also don’t want to choose a size that’s too large which would induce bigger performance and battery impacts.


## JPEG Orientation

Let’s start off with a simpler example - JPEG. We need to handle orientations for JPEGs as well. In the camera2 API, we can pass [JPEG\_ORIENTATION](https://developer.android.com/reference/android/hardware/camera2/CaptureRequest#JPEG_ORIENTATION) in the capture request to specify how much we want our output JPEGs to be rotated clockwise.

A quick recap of what we mentioned above:

*   To handle sensor orientation, we need to rotate a buffer by `sensorOrientation` clockwise.
*   To handle display rotation, we need to rotate a buffer by `displayRotation` counterclockwise for back cameras, clockwise for front cameras.

Adding the 2 factors up, the amount we’d want to rotate clockwise is

*   `sensorOrientation - displayRotation` for back cameras.
*   `sensorOrientation + displayRotation` for front cameras.

You’ll actually see the sample code for this logic in [JPEG\_ORIENTATION documentation](https://developer.android.com/reference/android/hardware/camera2/CaptureRequest#JPEG_ORIENTATION). Note that `deviceOrientation` in this piece of code is using the clockwise rotation of the device. Hence the signs for display rotation are reversed.


## Preview

Let’s put all the factors into consideration for the camera preview. There are 2 primary ways an app can lay out its preview: SurfaceView and TextureView. They each require different approaches to handle camera preview.

### SurfaceView

SurfaceView is generally recommended for camera previews provided that we don’t need to process or animate the preview buffers. It’s more performant and less resource-demanding than TextureView.

SurfaceView is also relatively easier to lay out. We only need to worry about the aspect ratio of the SurfaceView we’re displaying the camera preview on.

#### Source

SurfaceView, or the code path to SurfaceView to be precise, rotates output buffers to match the **display orientation** of the device. In other words, it accounts for both the <span style="text-decoration:underline;">sensor orientation</span> and the <span style="text-decoration:underline;">display rotation</span>. To put it even simpler, when our display is currently landscape, we’ll get a preview that is also landscape and vice versa.

A picture is worth a thousand words. Let’s illustrate. The important thing to keep in mind here is that display rotation alone does not determine the orientation of the source.

| Display Rotation | Phone (Natural Orientation = Portrait) | Laptop (Natural Orientation = Landscape) |
| -----------------| -------------------------------------- | ---------------------------------------- |
| 0                | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_0_phone.png) | ![A landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_0_laptop.png) |
| 90               | ![A landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_90_phone.png) | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_90_laptop.png) |
| 180              | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_180_phone.png) | ![A landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_180_laptop.png) |
| 270              | ![A landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_270_phone.png) | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_270_laptop.png) |

#### Layout

As you can see, SurfaceView already handles some of the tricky things for us. But we now need to consider the size of the viewfinder, or how big we want our preview on the screen. SurfaceView scales the source to fit. We need to make sure the aspect ratio of the viewfinder is identical to that of the source. For instance, If we try to fit a portrait-shaped preview into a landscape-shaped SurfaceView, we’ll get something like this:

![Image illustration showing a stretched bugdroid as a result of fitting a portrait-shaped preview into a landscape-shaped viewfinder](/images/android/camera-orientation/surface_view_stretched_scene.png)

Now that’s an unhappy bugdroid! :( And we don’t want that.

We generally want **the aspect ratio (i.e., width/height) of the viewfinder to be identical to the aspect ratio of the source**. There are 2 cases:

##### 1. `aspectRatioActivity > aspectRatioSource`

You can sort of think of the case as the activity being “wider”. Let’s say we have a 16:9 activity and a 4:3 source.

```
aspectRatioActivity = 16/9 ≈ 1.78
aspectRatioSource = 4/3 ≈ 1.33
```

First we’d want our viewfinder to be 4:3 as well. Then we’d want to fit the source and viewfinder into the activity like so:

![Illustration of an activity whose aspect ratio is greater than the aspect ratio of the viewfinder inside](/images/android/camera-orientation/surface_view_aspect_ratio_activity_bigger.png)

In this case, we should make the height of the viewfinder match the height of the activity while making the aspect ratio of the viewfinder identical to the aspect ratio of the source. Very simple pseudo code to demonstrate:

```
viewfinderHeight = activityHeight;
viewfinderWidth = activityHeight * aspectRatioSource;
```

##### 2. `aspectRatioActivity ≤ aspectRatioSource`

The other case, as you may have figured, is when the activity is “narrower” or “taller”. Let’s reuse the example above, except that we rotate the device by 90 degrees, making the activity 9:16 and the source 3:4.

```
aspectRatioActivity = 9/16 = 0.5625
aspectRatioSource = 3/4 = 0.75
```

In this case, we’d want to fit the source and viewfinder into the activity like so:

![Illustration of an activity whose aspect ratio is less than the aspect ratio of the viewfinder inside](/images/android/camera-orientation/surface_view_aspect_ratio_activity_smaller.png)

We should make the width of the viewfinder match the width of the activity (as opposed to height in the previous case) while making the aspect ratio of the viewfinder identical to the aspect ratio of the source. Pseudo code:

```
viewfinderWidth = activityWidth;
viewfinderHeight = activityWidth / aspectRatioSource;
```

##### Sample

This isn’t the same logic but the idea is the same. This sample maintains the aspect ratio of the viewfinder but makes it “just bigger” than the activity so that the activity is perfectly covered. The tradeoff is we would have some “overflowing” pixels that get clipped.

*   [AutoFitSurfaceView.kt](https://github.com/android/camera-samples/blob/153d2d203118dacbd2afeb53b2e8be489677ed98/Common/src/main/java/com/example/android/camera2/common/AutoFitSurfaceView.kt#L52-L74)

##### Caveat

In the sample above, we try to maximize the screen real estate by making the preview just bigger than the activity so that no space is left unfilled. This relies on the fact that the overflowing parts get clipped by the parent layout (or ViewGroup) by default. The behavior is consistent with RelativeLayout and LinearLayout but NOT with [ConstraintLayout](https://developer.android.com/reference/androidx/constraintlayout/widget/ConstraintLayout). A ConstraintLayout might resize the children Views to make them fit inside the layout, which would break the desired “center-crop” effect we want and cause stretched previews. You can refer to this [commit](https://github.com/android/camera-samples/pull/281) as a reference.

### TextureView

TextureView gives maximum control over the content of the camera preview, but it carries a certain degree of performance costs. It's also harder to get the camera preview displayed just right.

#### Source

TextureView, or the code path to TextureView, rotates the output buffers according to the sensor orientation to match the **natural orientation** of the device. While TextureView handles <span style="text-decoration:underline;">sensor orientation</span>, it does not, however, handle display rotations. It simply aligns the output buffers with the natural orientation of the device, which means you’ll need to handle display rotations yourself.

Let’s also illustrate that. Try rotating the figures by their corresponding display rotation, you’ll actually get the same figures in SurfaceView.

| Display Rotation | Phone (Natural Orientation = Portrait) | Laptop (Natural Orientation = Landscape) |
| -----------------| -------------------------------------- | ---------------------------------------- |
| 0                | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/texture_view_display_rotation_0_phone.png) | ![A_landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/texture_view_display_rotation_0_laptop.png) |
| 90               | ![A portrait-shaped image with the bugdroid's head pointed to the right](/images/android/camera-orientation/texture_view_display_rotation_90_phone.png) | ![A landscape-shaped image with the bugdroid's head pointed to the right](/images/android/camera-orientation/texture_view_display_rotation_90_laptop.png) |
| 180              | ![A portrait-shaped image with the bugdroid's head pointed downwards](/images/android/camera-orientation/texture_view_display_rotation_180_phone.png) | ![A landscape-shaped image with the bugdroid's head pointed downwards](/images/android/camera-orientation/texture_view_display_rotation_180_laptop.png) |
| 270              | ![A portrait-shaped image with the bugdroid's head pointed to the left](/images/android/camera-orientation/texture_view_display_rotation_270_phone.png) | ![A landscape-shaped image with the bugdroid's head pointed to the left](/images/android/camera-orientation/texture_view_display_rotation_270_laptop.png) |

#### Layout

Layout is a bit tricky for the case of TextureView. We have previously suggested using transformation matrix for TextureView, but that method is flawed and we strongly suggest that you follow the steps described here instead.

Here we detail a 3-step process to correctly layout previews on a TextureView,

1. Set the size of the TextureView to be identical to the preview size chosen.
2. Scale the potentially stretched TextureView back to the original dimensions of the preview.
3. Rotate the TextureView by `displayRotation` counterclockwise.

Suppose we have a phone with a display rotation of 90 degrees.

![Illustration of a phone with a display rotation of 90 degrees, and an object](/images/android/camera-orientation/texture_view_observer_side.png)

**1. Set the size of the TextureView to be identical to the preview size chosen**

Suppose the preview size you chose is `previewWidth × previewHeight` where `previewWidth > previewHeight` (sensor output is landscape-shaped by nature). When configuring a capture session, one would call [SurfaceTexture#setDefaultBufferSize(int width, height)](https://developer.android.com/reference/android/graphics/SurfaceTexture#setDefaultBufferSize(int,%20int)) to specify the preview size (`previewWidth × previewHeight`).

Before configuring the capture session, it’s vitally important that you **also set the size of the TextureView to be `previewWidth × previewHeight`** with [View#setLayoutParams(android.view.ViewGroup.LayoutParams)](https://developer.android.com/reference/android/view/View#setLayoutParams(android.view.ViewGroup.LayoutParams)). The reason: TextureView actually calls `SurfaceTexture#setDefaultBufferSize(int width, height)` with its width and height underneath as well! As you can probably imagine, this would cause race conditions with our prior call, and we can mitigate that by setting TextureView the same size.

Now the TextureView may not match the dimensions of the source. In the case of phones, the source is portrait-shaped, yet the TextureView is landscape-shaped owing to the params we set previously. This would result in stretched previews, as illustrated below,

![Image illustration of a portrait-shaped preview stretched to fit inside a TextureView of the same size of the preview size chosen](/images/android/camera-orientation/texture_view_step_1_identical_size.png)

##### 2. Scale the potentially stretched TextureView back to the original dimensions of the preview

So let’s scale the stretched preview back to the dimensions of the source.

Dimensions of the source (`sourceWidth × sourceHeight`) is:

*   `previewHeight × previewWidth`, if the natural orientation is portrait or reverse-portrait (sensor orientation ∈ {90, 270})
*   `previewWidth × previewHeight`, if the natural orientation is landscape or reverse-landscape (sensor orientation ∈ {0, 180})

Here we can utilize [View#setScaleX(float)](https://developer.android.com/reference/android/view/View#setScaleX(float)) and [View#setScaleY(float)](https://developer.android.com/reference/android/view/View#setScaleY(float))

*   setScaleX(`sourceWidth / previewWidth`)
*   setScaleY(`sourceHeight / previewHeight`)

![Image illustration showing the procedure of the stretched preview being scaled back to its original dimensions](/images/android/camera-orientation/texture_view_step_2_scale_back.png)

##### 3. Rotate the preview by `displayRotation` counterclockwise

Now we handle display rotation. As previously mentioned, we should rotate the preview by `displayRotation` counterclockwise to compensate for display rotation.

Here we can do this by [View#setRotation(float)](https://developer.android.com/reference/android/view/View#setRotation(float))

*   setRotation(`-displayRotation`), since it does a clockwise rotation.

![Image illustration showing the procedure of the preview being rotated to match to the display orientation of the device](/images/android/camera-orientation/texture_view_step_3_rotate.png)

##### Sample

*   [PreviewView](https://developer.android.com/reference/androidx/camera/view/PreviewView) from androidx handles TextureView layout as described above. It configures the transformation with [PreviewCorrector](https://cs.android.com/androidx/platform/frameworks/support/+/androidx-master-dev:camera/camera-view/src/main/java/androidx/camera/view/preview/transform/PreviewCorrector.java).

##### Caveat

If you have previously used transformation matrix for TextureView, and the preview already doesn’t look right on a naturally-landscape device, it’s quite likely that your transformation matrix incorrectly assumes the sensor orientation to be 90 or 270 degrees. You may refer to this [commit](https://github.com/android/camera-samples/commit/3d1a254eb018a51ff39ae78d39a9e9e7942a027b) on GitHub, but we highly recommend that you migrate your app to use the method described here.

