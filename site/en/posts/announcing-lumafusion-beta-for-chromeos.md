---
title: Announcing LumaFusion Beta for ChromeOS
metadesc: We're very excited today to announce the open beta of LumaFusion for ChromeOS and Android!
tags:
  - announcement
  - android
hero:
  youtube: azWiCUPPThk
  alt: Video showing a video being edited in LumaFusion on a Chromebook
theme:
  theme: lumafusion
featured:
  images:
    - image: ix://posts/announcing-lumafusion-beta-for-chromeos/LumaFusionHero.png
      alt: Chromebook running LumaFusion Beta
authors:
  - chrisdemiris
date: 2022-10-24
---

We're very excited today to announce the open beta of LumaFusion for ChromeOS and Android! This is an important milestone in our long-held goal of bringing professional and accessible video editing and effects to an incredibly wide range of content creators around the world.

Developing LumaFusion for ChromeOS and Android devices presented us with new opportunities. The development team built LumaFusion for ChromeOS from the ground up, taking great strides to recreate the signature LumaFusion experience and ensure users enjoy the same workflow on any device they choose. We think Chromebooks are a natural fit for LumaFusion because they’re easy to set up and are always ready to use with great battery life and no long boot up or update times. We think our users will love the flexibility and power their large screens and both touch and keyboard interfaces will bring to how they work. That same ease of use and complete control has always been a hallmark of LumaFusion.

When creating LumaFusion for ChromeOS and Android, one of our biggest challenges was developing the engine to playback and export the multitrack video and audio compositions that LumaFusion makes possible. After multiple iterations, our team created an engine that directly manages multiple [`MediaCodec`s](https://developer.android.com/reference/kotlin/android/media/MediaCodec) with a central clock to manage synchronization between various video and audio sources, and an [OpenGLES](https://developer.android.com/develop/ui/views/graphics/opengl) renderer that composites multiple video sources, still images, and rendered titles into output frames. The result? They perfectly reproduced dozens of video filters as OpenGLES shaders for ChromeOS and Android.

During the development process, we collaborated with ChromeOS and Android to help provide the best performance possible. The learning went both ways and other developers should benefit from platform improvements made to improve the resource intensive task of multi-track asset manipulation in Android.

The LumaFusion open beta is available now in the [Google Play Store](https://play.google.com/apps/testing/com.luma_touch.lumafusion); we’d love for you to try it out and share your feedback. Stay tuned for even more on this exciting new chapter for ChromeOS and LumaFusion.
