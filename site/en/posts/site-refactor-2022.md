---
title: ChromeOS.dev Refactor Retrospective
metadesc: We've just completed a major refactor of the ChromeOS.dev codebase. This is why we did it and what we learned along the way.
tags:
  - technical
authors:
  - samrichard
date: 2022-01-24
---

It's hard to believe, but ChromeOS.dev launched almost 18 months ago! The web moves fast, and assumptions we make at the beginning of projects sometimes don't pan out. As we came up to a year post-launch, we identified some issues with our codebase that was making it difficult to maintain, so we put a plan together, and last week, we pushed to production our new, refactored codebase. This is what we did, and what we learned.

## Static Site Scaffold

When ChromeOS.dev was first built, we chose [Eleventy](https://www.11ty.dev/) as our static site generator. We actually made this decision back in 2019, started building on version `0.10`, and upgraded to `0.11` before launch. At the time, there was a lot of energy around Eleventy, with lots of people making their own starter kits for it. We were not exception, and built our own [Static Site Scaffold](https://github.com/chromeos/static-site-scaffold-modules/tree/85131342337ce51bd023e43c13161ad8ed6c4dac/modules/static-site-scaffold) for it. Our goal for this was to try provide a solid foundation for people to build internationalized Eleventy sites with, along with default configurations for Rollup and Gulp for managing assets. We also built a number of [shared modules](https://github.com/chromeos/static-site-scaffold-modules/tree/85131342337ce51bd023e43c13161ad8ed6c4dac/modules) to go with it, ranging from Eleventy plugins to commit linters to markdown plugins and service worker libraries. We had high hopes that others would pick up these modules and use them themselves. Unfortunately, for a variety of reasons, they never got the traction we were hoping.

Because of this, when it came time to refactor our site, we knew we didn't want to depend on one mega configuration (Static Site Scaffold) and only modularize the individual pieces we had seen real need to re-use across projects. Our first set of work, then, was [migrating our Eleventy config into our codebase](https://github.com/chromeos/chromeos.dev/issues/147), and modularizing our [localization logic](https://github.com/chromeos/chromeos.dev/issues/145) and [markdown config](https://github.com/chromeos/chromeos.dev/issues/146) into separate modules. The localization logic was especially useful to modularize, as right before our initial deploy, there had been a bug in Node 12 that broke our ability to use [full-icu](https://www.npmjs.com/package/full-icu) properly that left us pinned on a specific Node 12 version and, in the modularization, we learned that some of the NPM script config we had previously needed to use was no longer required in later versions of Node, simplifying our codebase even further.

## A Shift in Tooling

It's funny how quickly the web moves. We launched ChromeOS.dev August of 2020. Between when we launched the site and the end of the year, a tectonic shift in development tooling happened, starting (as I recall learning about them) [Snowpack 2.0](https://www.npmjs.com/package/snowpack), then [esbuild](https://www.npmjs.com/package/esbuild), then [WMR](https://www.npmjs.com/package/wmr), and finally [Vite 2.0](https://www.npmjs.com/package/vite). The bundler ecosystem embraced ES Modules and build tools became lightning fast, while embracing a "batteries included" mentality for commonly hard to configure features, like code splitting and hot module reloading. The result? Lightning fast development that required less maintenance and produced more optimized code. I'm in.

Our original codebase held Eleventy, Gulp, Rollup, and Browser Sync together with string and duct tape. It was slow. Configuration was spread out throughout many, _many_ files and systems. It was fragile. After experimenting with all of the above, we decided that Vite was the best fit. It had a great ecosystem, it made choices that felt like choices I would have made, it was the fastest of the three, and it worked really well for our needs (not building a full JS app, compiling Sass separate from our JS pipeline, working with both workers and service workers). It took a lot of work, but we finally managed to [migrate our build and local serving to Vite](https://github.com/chromeos/chromeos.dev/issues/150). Because the Vite ecosystem is so active, we were even able to [save ourselves some work](https://github.com/chromeos/chromeos.dev/issues/155) and get unblocked simply by keeping Vite up-to-date during our build!

A number of interesting _new_ modules came as a result of migrating to Vite. The first is [Vite Plugin Eleventy](https://www.npmjs.com/package/vite-plugin-eleventy) which I actually started over the summer so I could rebuild my personal website on Vite+Eleventy. The next was [Vite Plugin PostHTML](https://www.npmjs.com/package/vite-plugin-posthtml), allowing for PostHTML plugins to work on HTML run through Vite. We had previously been using Eleventy transforms and a pseudo-DOM manipulation library to do HTML transforms, but we found it sometimes wrapped output incorrectly and was pretty slow. PostHTML, being an [AST based transformation](https://en.wikipedia.org/wiki/Abstract_syntax_tree) instead, we found to be much faster, and unlike transforms, only ran on the file being served in dev instead of every file like it is for Eleventy. There was a third module we experimented with, [Vite Plugin Img](https://www.npmjs.com/package/vite-plugin-img) for doing the same kind of image manipulation we had previously done through Eleventy through Vite instead, but we wound up deciding against using it in production (more on that later). While these modules may prove, in the long run, to again not be particularly popular, we believe that because they're not as niche as some of our original ones, they're likely to find more usage.

## Managing Images

Far and away the biggest contributor to our build times was how we managed our images. Images on our site have a number of requirements:

- They need to be [lazy loaded](https://web.dev/learn/design/responsive-images/#loading-hints) so only images that are likely to be displayed are downloaded. Because of this, we also need to know their [size](https://web.dev/learn/design/responsive-images/#sizing-hints).
- They need to be [responsive](https://web.dev/learn/design/responsive-images/#responsive-images-with-srcset), with the same image being cut to multiple different sizes.
- All of those cuts also need to be for multiple [image formats](https://web.dev/learn/design/picture-element/#image-formats), so we can have the best chance of serving the smallest size image for each user and device.
- All generated images need to be optimized to reduce overall image size with minimal change in picture quality.
- Any images whose source is an animated `.gif` needs to be converted to a silent, looping, autoplaying video, which are usually much smaller.

These requirements exist so that we can, to the best of our ability, make sure our users are served only the media that's required for their browsing context, and only the most optimized versions of that media. What this meant in practice, though, was that for every individual image we had on our site, we needed to generate about 15 images in varying formats, and to support that and GIF to video encoding, we needed to rely on developers having a number of additional command-line packages installed that differed across operating systems.

Our first attempt at this, [Eleventy Plugin Local Responsive Images](https://github.com/chromeos/static-site-scaffold-modules/tree/91285a3289358599df58b29190b80e8afd107d59/modules/eleventy-plugin-local-respimg) was able to do this pretty well; it kept an in-memory cache of images it had already optimized so it wouldn't have to do them twice in the same run, was super configurable, and didn't require special syntax to work; just have an `img` tag that pointed to a local image, and it magically worked! For videos, too! It was built as an Eleventy transform, which meant that on each build of the site, it would need to do the transforms for all rendered pages, but the difference between first render and second was significant because of the in-memory cache.

Our second attempt, the previously mentioned Vite Plugin Img, did more or less the same thing, but moved the transforms to PostHTML, letting them run only on the page being displayed during dev, or only when needed during a production build. It also moved to only rendering the images during a production build, except for video transformations, which generally sped up the whole dev process. The original goal was to leverage the Vite ecosystem and let other image related plugins handle the optimization, but the images would up being written too late for this t happen, so we implemented image optimization ourself. This seemed like a good path, until we found a [weird Vite bug](https://github.com/vitejs/vite/issues/5815) where if one of our image optimization dependencies was simply required, not even used, just required, in a Vite config, Sass would fail to load! So, we either needed another solution, or needed to rethink this module in its entirety.

After some investigation, we wound up choosing to [migrate to an image CDN](https://github.com/chromeos/chromeos.dev/issues/154). This did a number of things for us:

- Removed the need for us to store images in our codebase,
- Removed image manipulation from our build stack.
- Removed the need for us to use the `picture` tag for all of our images, making our CSS and HTML easier to maintain.

It did all of this while resolving all of our requirements and (mostly) without changing any of the HTML or markdown already written for the site. Our whole image optimization pipeline reduced to more or less the PostHTML transform we had already written for Vite Plugin Img. The only thing that needed to change was images that we wanted run through this service now need to be prefixed with `ix://` in our codebase, a small inconvenience, but once we already had precedent for in our codebase for images stored on other services.

## Other Updates

There were a few additional updates we wound up doing based on contributor feedback: we removed commit linting all together and instead implemented PR title checking, we changed pre-commit linting to only lint staged changes, not the whole codebase, and we [overhauled our service worker](https://github.com/chromeos/chromeos.dev/issues/159) to work with our image CDN, as well as make updated content easier to access across the site while still maintaining the fast speeds of our cached pages.

## Missing Features

There are two features we had in our original build that didn't make it to our new build: [inlining critical CSS](https://github.com/chromeos/chromeos.dev/issues/148) and [minifying our HTML](https://github.com/chromeos/chromeos.dev/issues/149). Inlining critical CSS is something that'd absolutely be good for the performance of our site, but it sadly just doesn't integrate cleanly with Vite right now. Minifying our HTML, on the other hand, looks to only have a small impact on overall performance (a couple hundred bytes per page at most) so I'm on the fence about trying to fix the integration bugs unless we find we absolutely need it.

## Results!

So, what are the results?!

Subjectively, on my development machine, I've seen dev startup times go from 3-5 minutes down to about **5 seconds**! Page reload also takes about 5 seconds, down from 1-2 minutes. This is almost entirely Eleventy, and we haven't worked to optimize that build yet. It's also removed all external dependencies other than what you `npm install`, which let me remove a bunch of CLI tools I mostly don't need.

More objectively, we use [GitHub Actions](https://github.com/chromeos/chromeos.dev/actions) to test, build, and deploy our site. Before this update, our both our test and preview builds and deploy builds took about 20-25 minutes to complete. Migrating to our new codebase, our test and preview builds now take **less than 4 minutes** to finish, with deploy builds taking **less than 6 minutes**. From opening a PR to a change appearing on our site use to take almost an hour to finish; it now takes about 10 minutes. That is _huge_ for us. It proved its worth literally in the minutes after launch.

While the overall goal of the refactor was to keep the site looking the same, there was one major change we did make, and that was how we handled caching and routing in our service worker. Testing service worker changes for production sites is tough; you need to emulate a "lived in" experience with caches primed and quirks in place, and then you need to test the upgrade process and hope you hit all of your use cases because if you don't, you need to roll back both your code and your browser cache state. We had done lots of testing, but we missed something. Right after our new build was deployed, I did a round of testing to make sure our service worker changes had landed as expected, and unfortunately, there was an edge case we had misses that caused pages already in our cache before the service worker upgrade to lose all of their CSS and JS after the new service worker activated! Disaster! Fortunately, a one-character fix was possible, and we got it deployed (hopefully) without anyone hitting the issue, all in about 15 minutes, from discovery to troubleshooting to deployed.

### Micro Benchmarks

While no doubt the largest contributor to our decreased build times is removing image processing from our build path, there are a number of interesting micro-benchmarks that provide interesting takeaways, too:

- Moving HTML transformations from Eleventy transforms to PostHTML through Vite cut our Eleventy build times _in half_. I attribute this to Vite's PostHTML plugin only running on the HTML being served during dev. Additionally, because PostHTML is AST based, the time it takes to run all of the PostHTMl transforms during build is also much less than the previous total time to compile and transform the HTML through Eleventy.
- It previously took about 10.5 minutes to run through our build, of which about 9.5 minutes was image processing. Our current build runs in less than 40 seconds.
- Fewer dependencies also means less that new need to install! Our `npm install` time dropped from about a minute to about 35 seconds.
- We share built files between different jobs in our GitHub actions, so that requires us uploading and downloading artifacts between jobs. Our old build produced an archive just over 200MB and took about 3.5 minutes to upload and 45s to download. Our new build produces an archive of about 11MB and takes about 20s to upload and 15s to download.

---

A huge thank-you to Matias Capeletto ([patak](https://github.com/patak-dev)) for their work on Vite and helping me navigate Vite issues during our migration, Joaquín Sánchez ([userquin](https://github.com/userquin)) for their help getting our service worker build process sorted, Jeffrey Posnick ([jeffposnick](https://github.com/jeffposnick)) for their help with our service worker migration, and the whole Chrome OS DevRel team for helping me do pre-launch tests and catching a bunch of stuff before we launched!
