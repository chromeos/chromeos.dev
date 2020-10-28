---
title: Debugging animation jank
metadesc: Using the ARC graphics tracer to ensure ensure smooth, glitchless, jank-free animations for apps.
date: 2020-05-01
weight: -5
tools:
  - name: Chrome OS
    url: /
    versions:
      min: 75
      max: current
tags:
  - high-performance graphics
  - developer tools
---

One of the most difficult problems for app developers is ensuring smooth, glitchless, and jank-free animation. This is especially hard to debug when the system is also performing resource-intensive background tasks. There is no easy way to determine if some jank is caused by your app or the system. However, there is a profiler tool which can help you identify the possible source of the bad behavior.

## Rendering on Chrome OS

A fine-tuned app, like a game, usually uses double buffering to keep the user response time as low as possible. Still, there are many things that can degrade performance. For example, if it takes too long to render a frame, the rendered result is not ready for the next buffer swap, and consequently the previous frame is repeated. Then, the renderer cannot start rendering the next frame, causing even more problems. This scenario is familiar to "pure" Android developers. When an app runs on Chrome OS the context is even more complicated.

An app running on the desktop does not render directly to the screen's display frame. It renders its data into a texture instead. There are usually multiple apps, each rendering its graphics into a texture. The system constructs the view on the screen using a compositor to combine all the textures into a single desktop image.

The compositor works transparently in the background. However, it introduces a one-frame time delay to maximize the use of the GPU pipeline. In an ideal world this might not be necessary, but this smooths system performance fluctuations and helps balance an asymmetrical load.

When the OS is working very hard, the GPU might get squeezed. There can be an additional delay from the time a frame is rendered to when it appears on the screen. The system might use quadruple buffering to compensate (this is hardware dependent). Even with deeper buffering, the graphic pipeline could still glitch.

## The ARC graphics tracer

Chrome OS has a profiling tool that shows how the buffers are percolating through the system, when memory swaps occur, how busy the CPU/GPU is, and what your application is doing at a given time:

![Jank Profiler, with ARC++ app running on the left and CPU, Memory, Chrome Graphics, and Android Graphics information to the right.](/images/develop/android/animation/jank-profiler.png)

### Setting up the profiler

To use the profiler you must run M75 or later. For best results, we recommend using an Intel device.

Before using the profiler you should seed your app with traces. Add `Trace.traceCounter(Trace.TRACE_TAG_GRAPHICS, "Event", <number>);` to your code wherever you'd like to include a trace. The `Event` that you use should begin with the prefix `customTrace.`. The prefix will not appear in the trace message.

To set up the profiler, follow these steps:

1. Turn on developer mode.
2. Turn on Chrome settings and enable the **ARC graphic buffers visualization tool**.
3. Navigate to `chrome://arc-graphics-tracing`.

### Running the profiler

1. Check **stop on jank**.
2. Run the Android app.
3. When the Android app is active and has focus, press [[Ctrl]]+[[Shift]]+[[G]].

When some jank happens, the browser window will pop up. Use the [[w]] and [[s]] keys to zoom and shrink the timeline.
