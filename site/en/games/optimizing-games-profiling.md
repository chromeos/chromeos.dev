---
title: Performance profiling
metadesc: Performance profiling on Chrome OS.
date: 2020-06-16
weight: -3
---

Performance profiling and tuning is a complex task that can feel more like an art than a science. The many moving parts that need to be perfectly synchronized in a game combined with the complexity in a given scene can make understanding and isolating problems difficult. On Chrome OS, many tools are designed with ARM chipsets in mind. Below are some tips to help speed up the process.

Something to keep in mind when specifically optimizing your game’s performance on Chrome OS is that the underlying performance issues are shared across all devices, and improvements will benefit performance and battery life for all users. Chrome OS, with a tendency for larger displays and desktop input devices, may just surface certain issues more readily. For example, an inefficient texture loading algorithm may “work fine” on higher end mobile devices, but not be able to keep up on a Chromebook with a 4k display. Improving the algorithm will improve the game on all devices.

If you are new to profiling, a good general approach is to:

1. Determine if performance is bound by:
   - CPU
   - GPU
   - Other: Input/Disk/Network
1. Try to isolate the major cause
1. Try to optimize
1. Repeat

In most cases, games will show themselves to either be “CPU-bound” or “GPU-bound”. Using the profiling tips and tools below, attempt to determine where the system is “spending it’s time” each frame. For example, if it is taking a long time calculating and loading the vertices before the GPU begins rendering, your game may be CPU-bound. Instead, if you are using a large number of detailed, GPU based filters, your game is likely GPU-bound. Remember that many mobile phones and Chrome OS devices do not have discrete graphics cards. A desktop game that assumes GPU filters are fast, may find integrated GPUs taking too long to render each scene.

For more details on how to approach profiling, check out ARM's guide on ['The optimization process'](https://developer.arm.com/docs/100959/0101/the-optimization-process).

## Tools

While it's certainly possible to determine bottlenecks on your own, having the right tools will make analyzing your game's performance easier and will give you confidence that you're focusing on the right things. There are many tools out there, but here are some of our go-to programs.

### Android Studio Profiler

The easiest way to start profiling any Android app is with the integrated [Android Studio profiler](https://developer.android.com/studio/profile/android-profiler). From Android Studio, instead of hitting “Run”, simply choose “Profile” to run your app and get real-time insight into CPU, memory, and network usage. Simple CPU traces can be a quick way to isolate areas of code to look at.

This tool does not grant real insight into GPU usage nor into what is happening between each frame sync so, while a good tool to have in the toolbox, is likely not going to be sufficient to get your game running at peak performance.

### Snapdragon Profiler

Because your games behaviour will be the same across devices, one good way to get detailed performance information is to use the [Snapdragon Profiler](https://developer.qualcomm.com/software/snapdragon-profiler) on a Qualcomm based, ARM phone. Although not directly profiling on a Chrome OS device, this should give you information about where your game is spending most of its time each frame, and can give you insight into specifically which GPU calls are being used.

For example, if you see that a large amount of time is being spent in your anisotropic GPU filters and it is dominating the work being done each frame, you can likely make some large performance gains by changing this setting.

If you see the GPU times are short and regular, but the CPU times are dominating and causing you to miss frame syncs, take a look at your texture loading/frame preparation algorithms.

See the [official usage documentation](https://developer.qualcomm.com/software/snapdragon-profiler/app-notes) for more information.

### ARM Mobile Studio

Another useful ARM device profiler is [ARM Mobile Studio](https://developer.arm.com/tools-and-software/graphics-and-gaming/arm-mobile-studio). Some developers may prefer it to the Snapdragon Profiler, but it can be used in similar ways. See the official [usage documentation](https://developer.arm.com/tools-and-software/graphics-and-gaming/arm-mobile-studio/learn/get-started).

### Android GPU Inspector

The [Android GPU Inspector](https://gpuinspector.dev/) is a new tool developed by Google and specifically designed to help you get the best performance out of your game with both OpenGL and Vulkan. It is currently in a developer preview state and may take some work to get set up and is currently only working on a handful of devices. It promises to be one of the major tools to use for graphics profiling in the future. See the [official documentation](https://gpuinspector.dev/docs/).

### ARC Graphics Tracing

Chrome OS has a built-in graphics profiler that helps you understand how your Android game is interacting with the desktop compositor. It can help you get a global view of the operating system and see if glitches are occurring because your game is not producing frames fast enough or if other pieces of the system are utilizing the CPU. You can include custom tracing tags in your app to narrow down which parts of your code are responsible for missing rendering windows.

Start the tracing tool by navigating to `chrome://arc-graphics-tracing` in the browser on Chrome OS. Detailed usage instructions can be found on [debugging animation jank](/{{locale.code}}/android-environment/animation).

### ARC Overview Tracing

There's also a more generalized tool - ARC Overview Tracing - that works similarly to the above ARC Graphics Tracing tool. This tracer will provide high-level metrics about an app and Chrome OS performance. Read outs will show you FPS of the app and of Chrome itself, as well as CPU usage, GPU usage, power consumption, and more. You can run the tool multiple times and see graphs for each run overlaid together with colors to differentiate them. Each tracing model will be saved to your Downloads folder and can be reimported for future comparisons. For general app health checks, ARC Overview Tracing is a good place to start.

Visit `chrome://arc-overview-tracing` in the browser on Chrome OS to access this tool.

## Next steps

So maybe you've found some bottlenecks but are not sure what to do about them. Or you've found and addressed them, but you're not sure where to go next. Below, we've compiled a list of general Android and engine specific tips and resources for you.

### General tips

The [Android Developers portal](https://developer.android.com/games/optimize) has some great tips for boosting the performance of your application. Load time considerations, how to utilize multithreading, handling input lag, and more can be found there.

Remember to profile early and profile often, especially if you are targeting less powerful machines or pushing the boundaries of high-end architecture. Keeping track of your app's performance stats will aid you in identifying which changes tanked your frame rate and which are helping you maintain that smooth experience you're aiming for.

### Unity engine

On top of their own [general recommendations](https://docs.unity3d.com/Manual/MobileOptimizationPracticalGuide.html), Unity provides practice guides. Check out their deep dives on optimization for [graphics](https://docs.unity3d.com/Manual/MobileOptimizationGraphicsMethods.html), [gameplay](https://docs.unity3d.com/Manual/MobileOptimizationScriptingMethods.html), [rendering](https://docs.unity3d.com/Manual/MobileOptimizationPracticalRenderingOptimizations.html), and [scripting](https://docs.unity3d.com/Manual/MobileOptimizationPracticalScriptingOptimizations.html).

Consider reading ARM's guide on [profiling and optimizing Unity games](https://developer.arm.com/docs/100140/0402/performance-analysis/profiling-a-unity-game-example) and their associated best practices. This will lead you through the process of profiling an example game in Unity with the Streamline tool, a facet of the [ARM Mobile Studio](#arm-mobile-studio).

### Unreal engine

Unreal has written it's own [performance guidelines](https://docs.unrealengine.com/en-US/Platforms/Mobile/Performance/index.html) and [tips and tricks](https://docs.unrealengine.com/en-US/Platforms/Mobile/Performance/TipsAndTricks/index.html) docs that teach you how to best leverage many of the options and settings that the engine provides. Here you'll find things like Level of Detail tricks, how to get the most out of lighting, step by step guides on material quality settings and shaders, among other suggestions.

For more graphics based optimizations, ARM has written a [guide](https://developer.arm.com/docs/100959/0101/optimizations-and-optimization-techniques/unreal-engine-best-practices) for optimizing mobile games. General optimization tips as well as Unreal specific graphics considerations can be found here.
