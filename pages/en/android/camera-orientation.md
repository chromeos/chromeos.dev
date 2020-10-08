---
title: Camera orientations
metadesc: An in-depth guide on how to handle orientations in Android camera apps.
date: 2020-09-23
weight: 1
tags:
  - camera orientation
  - large screens
resources:
  - title: CameraX Preview Documentation
    url: https://developer.android.com/reference/androidx/camera/core/Preview
---

If your Android app uses cameras, there are some special considerations when handling orientations. This article presumes you understand the basic concepts of Android camera2 API. You can read our [blog post](https://medium.com/google-developers/detecting-camera-features-with-camera2-61675bb7d1bf) or [summary](https://developer.android.com/reference/android/hardware/camera2/package-summary) for an overview of camera2. We also recommend that you try writing a simple camera app first before approaching the article.

## Background

Handling orientations in Android camera apps is tricky and needs to take the following factors into consideration:

1. Natural orientation: The display orientation when the device is in the “normal” position for the device design - usually portrait orientation for mobile phones and landscape orientation for laptops.
2. Sensor orientation: The orientation of the sensor physically mounted on the device.
3. Display rotation: How much the device is physically rotated from the natural orientation.
4. Viewfinder size: The size of the viewfinder used for displaying the camera preview.
5. Image size output by the camera.

These factors combined introduce a large number of possible UI and preview configurations for camera apps. This document is meant to demonstrate how developers can navigate these and correctly handle camera orientations in Android apps.

To make things a bit simpler, assume all examples involve a rear-facing camera unless otherwise mentioned. In addition, all photos below are simulated to make illustrations visually clearer.

## All about orientations

### Natural Orientation

Natural orientation is defined as the display orientation when the device is in the position it is normally expected to be in. For phones, their natural orientation is often portrait. In other words, phones have shorter widths and longer heights. For laptops, their natural orientation is landscape, meaning they have longer widths and shorter heights. Tablets are a bit more complicated than this - they can be either portrait or landscape.

![Natural orientation illustration with a phone, a laptop and an object from the observer side](/images/android/camera-orientation/natural_orientation_observer_side.png)

### Sensor Orientation

Formally speaking, sensor orientation is measured by the degrees an output image from the sensor needs to be rotated clockwise to match the natural orientation of the device. Put differently, sensor orientation is the number of degrees a sensor is rotated counterclockwise before being mounted on the device. When looking at the screen, the rotation seems to be in the clockwise direction, this is because the rear-camera sensor is installed on the “back” side of the device.

According to [Android 10 Compatibility Definition 7.5.5 Camera Orientation](https://source.android.com/compatibility/android-cdd#7_5_5_camera_orientation), front and rear-facing cameras “MUST be oriented so that the long dimension of the camera aligns with the screen’s long dimension.”.

Output buffers from cameras are landscape-sized. Since the natural orientation of phones is usually portrait, the sensor orientation is typically 90 or 270 degrees from the natural orientation in order to have the long side of the output buffer match the long side of the screen. Sensor orientation is different for devices whose natural orientation is landscape, like Chromebooks. On these devices, image sensors are again placed so the long side of the output buffer matches the long side of the screen. Because these are both landscape-sized, the orientations match and the sensor orientation is 0 or 180 degrees.

![Sensor orientation illustration with a phone, a laptop and an object from the object side](/images/android/camera-orientation/sensor_orientation_object_side.png)

All the illustrations below show how things look from the point of view of an observer, looking at the device screen:

![Sensor orientation illustration with a phone, a laptop and an object from the observer side](/images/android/camera-orientation/sensor_orientation_observer_side.png)

Consider the following scene:

![A scene with a cute Android figurine (bugdroid)](/images/android/camera-orientation/scene_bugdroid.jpg)

From the camera sensor’s perspective, you would see the following:

| Phone                                                                                                                                               | Laptop                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Image illustration from looking through the back camera sensor on a phone](/images/android/camera-orientation/sensor_orientation_after_phone.png) | ![Image illustration from looking through the back camera sensor on a laptop](/images/android/camera-orientation/sensor_orientation_after_laptop.png) |

Because sensor orientation is usually 90 or 270 degrees on phones, without accounting for sensor orientation, the images you would get would look like this:

| Phone                                                                                                                                               | Laptop                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Image illustration from looking through the back camera sensor on a phone](/images/android/camera-orientation/sensor_orientation_after_phone.png) | ![Image illustration from looking through the back camera sensor on a laptop](/images/android/camera-orientation/sensor_orientation_after_laptop.png) |

Suppose the counterclockwise sensor orientation is stored in the variable sensorOrientation. To compensate for sensor orientation, you need to **rotate the output buffers by `sensorOrientation` clockwise** to bring the orientation back in alignment with the natural orientation of the device.

In Android, apps can use TextureView or SurfaceView to display their camera preview. Both can handle sensor orientation if apps use them correctly. We’ll detail how you should account for sensor orientation in the following sections.

### Display Rotation

Display rotation is formally defined by the rotation of the drawn graphics on the screen, which is the opposite direction of the physical rotation of the device from its natural orientation. The following sections assume display rotations are all multiples of 90. If you retrieve the display rotation by its absolute degrees, round it up to the closest of {0, 90, 180, 270}.

“Display orientation” below refers to whether a device is physically held in a landscape or portrait position and is distinct from “display rotation”.

Suppose you rotate the devices by 90 degrees counterclockwise from their previous positions as demonstrated in the figure below:

![90-deg display rotation illustration with a phone, a laptop and an object from the observer side](/images/android/camera-orientation/display_rotation_observer_side.png)

Assuming the output buffers are already rotated based on the sensor orientation, you would then have the following output buffers:

| Phone                                                                                                                                           | Laptop                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Image illustration before display rotation is accounted for on a phone](/images/android/camera-orientation/display_rotation_before_phone.png) | ![Image illustration before display rotation is accounted for on a laptop](/images/android/camera-orientation/display_rotation_before_laptop.png) |

If the display rotation is stored in the variable displayRotation, to get the correct image, you should rotate the output buffers by displayRotation counterclockwise.

For front cameras, display rotation acts on the image buffers in the opposite direction relative to the screen. If you’re dealing with a front camera, you should rotate the buffers by displayRotatation clockwise.

#### Caveats

Display rotation measures the counterclockwise rotation of the device. This isn’t true for all orientation/rotation APIs.

For example,

- If you use [Display#getRotation()](<https://developer.android.com/reference/android/view/Display#getRotation()>), you’d be getting the **counterclockwise** rotation as mentioned in this article.
- If you use [OrientationEventListener#onOrientationChanged(int)](<https://developer.android.com/reference/android/view/OrientationEventListener.html#onOrientationChanged(int)>), you’d be getting the **clockwise** rotation instead.

The important thing to note here is that display rotation is relative to natural orientation. For instance, if you physically rotate a phone by 90 or 270 degrees, you’d get a landscape-shaped screen. In comparison, you’d get a portrait-shaped screen if you rotate a laptop by the same amount. Apps should always keep this in mind and never make assumptions about the natural orientation of a device.

#### Examples

Let’s use the previous figures to illustrate what the orientations and rotations are.

![Combined orientation illustration with a phone and a laptop unrotated, and an object](/images/android/camera-orientation/orientations_example_display_rotation_0.png)

| Phone                          | Laptop                          |
| ------------------------------ | ------------------------------- |
| Natural Orientation = Portrait | Natural Orientation = Landscape |
| Sensor Orientation = 90        | Sensor Orientation = 0          |
| Display Rotation = 0           | Display Rotation = 0            |
| Display Orientation = Portrait | Display Orientation = Landscape |

![Combined orientation illustration with a phone and a laptop with a display rotation of 90 degrees, and an object](/images/android/camera-orientation/orientations_example_display_rotation_90.png)

| Phone                           | Laptop                          |
| ------------------------------- | ------------------------------- |
| Natural Orientation = Portrait  | Natural Orientation = Landscape |
| Sensor Orientation = 90         | Sensor Orientation = 0          |
| Display Rotation = 90           | Display Rotation = 90           |
| Display Orientation = Landscape | Display Orientation = Portrait  |

### Viewfinder Size

Apps should always resize the viewfinder based on the orientation, rotation, and screen resolution. In general, apps should make the orientation of the viewfinder identical to the current display orientation. In other words, apps should align the long edge of the viewfinder with the long edge of the screen.

### Image Output Size by Camera

When choosing the image output size for the preview, you should choose a size that is equal to or just bigger than the size of the Viewfinder whenever possible. You generally don’t want output buffers to be scaled up which would cause pixelation. You also don’t want to choose a size that’s too large which could reduce performance and use more battery.

## JPEG Orientation

Let’s start off with a common situation - capturing a JPEG photo. In the camera2 API, you can pass [JPEG_ORIENTATION](https://developer.android.com/reference/android/hardware/camera2/CaptureRequest#JPEG_ORIENTATION) in the capture request to specify how much you want your output JPEGs to be rotated clockwise.

A quick recap of what we mentioned above:

- To handle sensor orientation, you need to rotate the image buffer by `sensorOrientation` clockwise.
- To handle display rotation, you need to rotate a buffer by `displayRotation` counterclockwise for back cameras, clockwise for front cameras.

Adding the 2 factors up, the amount you want to rotate clockwise is

- `sensorOrientation - displayRotation` for back cameras.
- `sensorOrientation + displayRotation` for front cameras.

You can see the sample code for this logic in the [JPEG_ORIENTATION documentation](https://developer.android.com/reference/android/hardware/camera2/CaptureRequest#JPEG_ORIENTATION). Note that `deviceOrientation` in the documentation’s sample code is using the clockwise rotation of the device. Hence the signs for display rotation are reversed.

## Preview

What about the camera preview? There are 2 main ways an app can display a camera preview: SurfaceView and TextureView. They each require different approaches to handle orientation correctly.

### SurfaceView

SurfaceView is generally recommended for camera previews provided that you don’t need to process or animate the preview buffers. It’s more performant and less resource-demanding than TextureView.

SurfaceView is also relatively easier to lay out. You only need to worry about the aspect ratio of the SurfaceView you’re displaying the camera preview on.

#### Source

Underneath SurfaceView, the Android platform rotates output buffers to match the **display orientation** of the device. In other words, it accounts for both the <span style="text-decoration:underline;">sensor orientation</span> and the <span style="text-decoration:underline;">display rotation</span>. To put it even simpler, when our display is currently landscape, we’ll get a preview that is also landscape and vice versa.

You can see that illustrated below. The important thing to keep in mind here is that display rotation alone does not determine the orientation of the source.

| Display Rotation | Phone (Natural Orientation = Portrait)                                                                                                               | Laptop (Natural Orientation = Landscape)                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0                | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_0_phone.png)    | ![A landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_0_laptop.png)   |
| 90               | ![A landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_90_phone.png)  | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_90_laptop.png)   |
| 180              | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_180_phone.png)  | ![A landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_180_laptop.png) |
| 270              | ![A landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_270_phone.png) | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/surface_view_display_rotation_270_laptop.png)  |

#### Layout

As you can see, SurfaceView already handles some of the tricky things for us. But you now need to consider the size of the viewfinder, or how big you want your preview on the screen. SurfaceView automatically scales the source buffer to fit its dimensions. You need to make sure the aspect ratio of the viewfinder is identical to that of the sourcebuffer. For instance, If you try to fit a portrait-shaped preview into a landscape-shaped SurfaceView, you’ll get something distorted like this:

![Image illustration showing a stretched bugdroid as a result of fitting a portrait-shaped preview into a landscape-shaped viewfinder](/images/android/camera-orientation/surface_view_stretched_scene.png)

You generally want **the aspect ratio (i.e., width/height) of the viewfinder to be identical to the aspect ratio of the source**. If you don’t want to clip the image in the viewfinder - cutting off some of the pixels to fix the display, there are 2 cases to consider, when `aspectRatioActivity` is greater than `aspectRatioSource` and when it's less than or equal to `aspectRatioSource`

##### `aspectRatioActivity > aspectRatioSource`

You can think of the case as the activity being “wider”. Below we consider an example where you have a 16:9 activity and a 4:3 source.

```
aspectRatioActivity = 16/9 ≈ 1.78
aspectRatioSource = 4/3 ≈ 1.33
```

First you want your viewfinder to be 4:3 as well. Then you want to fit the source and viewfinder into the activity like so:

![Illustration of an activity whose aspect ratio is greater than the aspect ratio of the viewfinder inside](/images/android/camera-orientation/surface_view_aspect_ratio_activity_bigger.png)

In this case, you should make the height of the viewfinder match the height of the activity while making the aspect ratio of the viewfinder identical to the aspect ratio of the source. Very simple pseudo code to demonstrate:

```
viewfinderHeight = activityHeight;
viewfinderWidth = activityHeight * aspectRatioSource;
```

##### 2. `aspectRatioActivity ≤ aspectRatioSource`

The other case, as you may have figured, is when the activity is “narrower” or “taller”. Let’s reuse the example above, except that in the example below you rotate the device by 90 degrees, making the activity 9:16 and the source 3:4.

```
aspectRatioActivity = 9/16 = 0.5625
aspectRatioSource = 3/4 = 0.75
```

In this case, you want to fit the source and viewfinder into the activity like so:

![Illustration of an activity whose aspect ratio is less than the aspect ratio of the viewfinder inside](/images/android/camera-orientation/surface_view_aspect_ratio_activity_smaller.png)

You should make the width of the viewfinder match the width of the activity (as opposed to height in the previous case) while making the aspect ratio of the viewfinder identical to the aspect ratio of the source. Pseudo code:

```
viewfinderWidth = activityWidth;
viewfinderHeight = activityWidth / aspectRatioSource;
```

##### Clipping sample

[AutoFitSurfaceView.kt (github)](https://github.com/android/camera-samples/blob/153d2d203118dacbd2afeb53b2e8be489677ed98/Common/src/main/java/com/example/android/camera2/common/AutoFitSurfaceView.kt#L52-L74) from the Camera2 samples overrides SurfaceView and handles mismatched aspect ratios by using an image that is equal to or “just bigger” than the activity in both dimensions and then clips content that overflows. This is useful for apps that want the preview to cover the entire activity or to completely fill a view of fixed dimensions, without distorting the image.

##### Caveat

The sample above tries to maximize the screen real estate by making the preview just bigger than the activity so that no space is left unfilled. This relies on the fact that the overflowing parts get clipped by the parent layout (or ViewGroup) by default. The behavior is consistent with RelativeLayout and LinearLayout but NOT with [ConstraintLayout](https://developer.android.com/reference/androidx/constraintlayout/widget/ConstraintLayout). A ConstraintLayout might resize the children Views to make them fit inside the layout, which would break the intended “center-crop” effect and cause stretched previews. You can refer to this [commit](https://github.com/android/camera-samples/pull/281) as a reference.

### TextureView

TextureView gives maximum control over the content of the camera preview, but it carries a performance cost. It also requires more work to get the camera preview displayed just right.

#### Source

Underneath TextureView, the Android platform rotates the output buffers according to the sensor orientation to match the **natural orientation** of the device. While TextureView handles <span style="text-decoration:underline;">sensor orientation</span>, it does not, however, handle display rotations. It simply aligns the output buffers with the natural orientation of the device, which means you’ll need to handle display rotations yourself.

You can see that illustrated below. Try rotating the figures by their corresponding display rotation, you’ll actually get the same figures in SurfaceView.

| Display Rotation | Phone (Natural Orientation = Portrait)                                                                                                                  | Laptop (Natural Orientation = Landscape)                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0                | ![A portrait-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/texture_view_display_rotation_0_phone.png)       | ![A_landscape-shaped image with the bugdroid's head pointed upwards](/images/android/camera-orientation/texture_view_display_rotation_0_laptop.png)       |
| 90               | ![A portrait-shaped image with the bugdroid's head pointed to the right](/images/android/camera-orientation/texture_view_display_rotation_90_phone.png) | ![A landscape-shaped image with the bugdroid's head pointed to the right](/images/android/camera-orientation/texture_view_display_rotation_90_laptop.png) |
| 180              | ![A portrait-shaped image with the bugdroid's head pointed downwards](/images/android/camera-orientation/texture_view_display_rotation_180_phone.png)   | ![A landscape-shaped image with the bugdroid's head pointed downwards](/images/android/camera-orientation/texture_view_display_rotation_180_laptop.png)   |
| 270              | ![A portrait-shaped image with the bugdroid's head pointed to the left](/images/android/camera-orientation/texture_view_display_rotation_270_phone.png) | ![A landscape-shaped image with the bugdroid's head pointed to the left](/images/android/camera-orientation/texture_view_display_rotation_270_laptop.png) |

#### Layout

Layout is a bit tricky for the case of TextureView. It has been previously suggested to use a transformation matrix for TextureView, but that method does not work for all devices. We suggest that you follow the steps described here instead.

The 3-step process to correctly layout previews on a TextureView:

1. Set the size of the TextureView to be identical to the preview size chosen.
2. Scale the potentially stretched TextureView back to the original dimensions of the preview.
3. Rotate the TextureView by `displayRotation` counterclockwise.

Suppose you have a phone with a display rotation of 90 degrees.

![Illustration of a phone with a display rotation of 90 degrees, and an object](/images/android/camera-orientation/texture_view_observer_side.png)

**1. Set the size of the TextureView to be identical to the preview size chosen**

Suppose the preview size you chose is `previewWidth × previewHeight` where `previewWidth > previewHeight` (sensor output is landscape-shaped by nature). When configuring a capture session, one should call [SurfaceTexture#setDefaultBufferSize(int width, height)](<https://developer.android.com/reference/android/graphics/SurfaceTexture#setDefaultBufferSize(int,%20int)>) to specify the preview size (`previewWidth × previewHeight`).

Before calling setDefaultBufferSize, it’s important that you **also set the size of the TextureView to be `previewWidth × previewHeight`** with [View#setLayoutParams(android.view.ViewGroup.LayoutParams)](<https://developer.android.com/reference/android/view/View#setLayoutParams(android.view.ViewGroup.LayoutParams)>). The reason for this is that TextureView calls `SurfaceTexture#setDefaultBufferSize(int width, height)` with its measured width and height. If the size of the TextureView is not explicitly set beforehand, it can cause a race condition. This is mitigated by explicitly setting the size of the TextureView first.

Now the TextureView may not match the dimensions of the source. In the case of phones, the source is portrait-shaped, yet the TextureView is landscape-shaped owing to the layoutParams you just set. This would result in a stretched previews, as illustrated below,

![Image illustration of a portrait-shaped preview stretched to fit inside a TextureView of the same size of the preview size chosen](/images/android/camera-orientation/texture_view_step_1_identical_size.png)

##### 2. Scale the potentially stretched TextureView back to the original dimensions of the preview

Consider the following to scale the stretched preview back to the dimensions of the source.

Dimensions of the source (`sourceWidth × sourceHeight`) is:

- `previewHeight × previewWidth`, if the natural orientation is portrait or reverse-portrait (sensor orientation is 90 or 270 degrees)
- `previewWidth × previewHeight`, if the natural orientation is landscape or reverse-landscape (sensor orientation is 0 or 180 degrees)

Fix stretching by utilizing [View#setScaleX(float)](<https://developer.android.com/reference/android/view/View#setScaleX(float)>) and [View#setScaleY(float)](<https://developer.android.com/reference/android/view/View#setScaleY(float)>)

- setScaleX(`sourceWidth / previewWidth`)
- setScaleY(`sourceHeight / previewHeight`)

![Image illustration showing the procedure of the stretched preview being scaled back to its original dimensions](/images/android/camera-orientation/texture_view_step_2_scale_back.png)

##### 3. Rotate the preview by `displayRotation` counterclockwise

As previously mentioned, you should rotate the preview by `displayRotation` counterclockwise to compensate for display rotation.

You can do this by [View#setRotation(float)](<https://developer.android.com/reference/android/view/View#setRotation(float)>)

- setRotation(`-displayRotation`), since it does a clockwise rotation.

![Image illustration showing the procedure of the preview being rotated to match to the display orientation of the device](/images/android/camera-orientation/texture_view_step_3_rotate.png)

##### Sample

- [PreviewView](https://developer.android.com/reference/androidx/camera/view/PreviewView) from [camerax](https://developer.android.com/training/camerax) in [Jetpack](https://developer.android.com/android/jetpack) handles TextureView layout as described above. It configures the transformation with [PreviewCorrector](https://cs.android.com/androidx/platform/frameworks/support/+/androidx-master-dev:camera/camera-view/src/main/java/androidx/camera/view/preview/transform/PreviewCorrector.java).

##### Note

If you have previously used transformation matrix for TextureView in your code, the preview may not look right on a naturally-landscape device like Chromebooks. Likely your transformation matrix incorrectly assumes the sensor orientation to be 90 or 270 degrees. You may refer to this [commit](https://github.com/android/camera-samples/commit/3d1a254eb018a51ff39ae78d39a9e9e7942a027b) on GitHub for a workaround, but we highly recommend that you migrate your app to use the method described here instead.
