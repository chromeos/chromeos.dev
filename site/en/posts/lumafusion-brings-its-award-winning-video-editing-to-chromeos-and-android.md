---
title: LumaFusion brings its award-winning video editing to ChromeOS and Android
metadesc: How the LumaTouch devs brought their professional video editing and effects app to Google Play—and adapted it for large screen ChromeOS and Android.

tags:
  - announcement
  - success story
  - android
theme:
  theme: lumafusion
authors:
  - chrisdemiris

featured: true
date: 2023-02-23
---

LumaTouch was started ten years ago by Chris Demirisand Terri Morgan. It took three years to build the first version of LumaFusion, released in 2016. While we initially focused on mobile video journalists, the combination of the intuitive touch screen experience and powerful video editing tools appealed to a wide range of professional and aspiring filmmakers. LumaFusion soon became the number one mobile video editing app, and garnered dozens of video editing awards and accolades, including iPad App of the Year in 2021.

LumaFusion, a powerful mobile video editing app, is now available on ChromeOS and Android. Video editors, journalists, and hobbyists can download the app on [Google Play](https://play.google.com/store/apps/details?id=com.luma_touch.lumafusion).

The app has over 1.1M downloads and has completed over 68 million project exports since its launch (4.5 million exports to YouTube alone) and continues to expand into new markets by delivering new functionality.

%[(1.1M, downloads), (68M, project exports), (4.5m, YouTube exports)]

To bring LumaFusion to ChromeOS, we assembled a team of experienced Android developers. They undertook the complex task of recreating the signature LumaFusion experience, and providing a consistent experience across all devices, while still taking advantage of the unique capabilities Chromebooks and Android tablets and phones have to offer.

## The audio-video compositing engine

While the audio-video components in the [Android SDK](https://developer.android.com/studio) do a great job of handling the recording and playback of video, creating a multi-track compositor using these components proved to be a significant challenge.

We developed a powerful compositing playback controller that manages multiple decoders each in its own thread. Each track on the LumaFusion timeline requires two decoders (to alternate between media sources instantly and to preview transitions between clips), and additional decoders are needed for thumbnail and audio waveform generation. Each individual player managed by the controller includes a [`MediaCodec`](https://developer.android.com/reference/android/media/MediaCodec) and [`MediaExtractor`](https://developer.android.com/reference/android/media/MediaExtractor) instance, which are used to retrieve individual video and audio samples that must be synchronized for compositing and mixing.

Video samples are rendered with effects and composed using [OpenGL ES](https://developer.android.com/develop/ui/views/graphics/opengl/about-opengl). We recreated a large number of video effects, writing custom GLSL shaders. For audio, all samples must be resampled to a consistent sample rate, mixed using a `MixerFilter`, and fed to the `AudioTrack` class for playback. Thus, in the case of audio, all the necessary audio synchronization work takes place in the audio controller.

Synchronizing video and audio from multiple sources in the timeline proved to be a challenge. We created a unique timestamp for each rendered video sample so that we could present the correct video sample as we received clock updates from the `AudioTrack`—with video previews, it's OK to drop video frames occasionally, but audio must always playback perfectly.

In cooperation with Google, we've made our early proof-of-concept AV compositor that used [ExoPlayer](https://exoplayer.dev/) available as an [open-source project on Github](https://github.com/chromeos/video-composition-sample).

## Large screen development

While the iOS version provided a good template for handling different size screens, there were new challenges for Android and ChromeOS, given a wider variety of screen sizes and different [UX requirements](/{{locale.code}}/android/design) for tablets versus and clamshell form factors, like [window resizing](/{{locale.code}}/android/window-management) and [keyboard and mouse input](/{{locale.code}}/android/input-compatibility).

Each separate interface element (storyline, library, and player) is implemented as a Fragment and [`MotionLayout`](https://developer.android.com/develop/ui/views/animations/motionlayout) controls the scene. This provides for a highly adaptable UI for different screen sizes and orientations. Using `MotionLayout`, we control where the element Fragments are sized and positioned, and each element is designed to dynamically adapt to different window sizes.

We intentionally designed the app to support different screen sizes—so our layouts were in a good place. However, we encountered various non-obvious challenges with `MotionLayout` [animations](/{{locale.code}}/android-environment/animation) for layout transitions. For example, if data supplied to a [`RecyclerView`](https://developer.android.com/develop/ui/views/layout/recyclerview) is changed just as it is transitioning to a different layout, the new layout may not be connected correctly to the updated data.

For video previews, we needed to make sure that the preview pane resized smoothly when the device was rotated or the window size was adjusted. Rather than use the [`GLSurfaceView`](https://developer.android.com/reference/android/opengl/GLSurfaceView) class, which would automatically recreate all resources on each size change, we created an [`EGLContext`](https://developer.android.com/reference/android/opengl/EGLContext) with an offscreen [`EGLSurface`](https://developer.android.com/reference/android/opengl/EGLSurface) for rendering, and associated that with a native Android Surface. This gives us full control of when resources are reallocated, and allows rendering at specific resolutions regardless of preview size.

## The beta process

When LumaFusion was feature complete, we announced an internal beta testing program for a small number of testers to participate in the next phase of the development process with us. We chose testers based on whether or not they had experience with LumaFusion, what devices they had, and what types of video projects they typically create.

For this test, we wanted people who already knew LumaFusion very well—so that we wouldn't spend too much time discussing a given feature, but rather whether that feature was implemented well for Chromebook and Android devices. We used Slack as our daily communication tool with this small group of testers, and this worked very well, allowing us to create channels for different types of feedback and foster dynamic discussion between testers.

Internal beta testing gave us important feedback. But the [Open Beta](/{{locale.code}}/posts/announcing-lumafusion-beta-for-chromeos), with thousands of customers and hundreds of daily active users, gave us the opportunity to hear from a wider range of customers and test a larger variety of Android and Chromebook devices.

Using [Crashlytics](https://firebase.google.com/products/crashlytics) and event tracking in Firebase, we were able to monitor customers' journeys through LumaFusion, see where there were stability and performance issues, and reduce crashes significantly.

We're looking forward to LumaFusion's production release, and the opportunity to put LumaFusion in the hands of Chromebook and Android customers worldwide, especially in schools where LumaFusion provides the perfect balance of easy-to-use creative video storytelling and professional video editing techniques.
