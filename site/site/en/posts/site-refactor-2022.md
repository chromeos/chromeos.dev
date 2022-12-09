---
title: ChromeOS.dev Refactor Retrospective
metadesc: We've just completed a major refactor of the ChromeOS.dev codebase. This is why we did it and what we learned along the way.
tags:
  - web
  - technical
authors:
  - samrichard
date: 2022-01-24
---

It's hard to believe, but ChromeOS.dev launched almost 18 months ago! The web moves fast, and assumptions we make at the beginning of projects sometimes don't pan out. After our first year launch anniversary, we identified some issues with our codebase that made maintenance difficult and slowed our velocity. We put together a plan and last week, we pushed our new, refactored codebase to production. This is what we did, and what we learned.

## Static Site Scaffold

When ChromeOS.dev was first built, we chose [Eleventy](https://www.11ty.dev/) as our static site generator. We actually made this decision back in 2019, started building on version `0.10`, and upgraded to `0.11` before launch. At the time, there was a lot of energy around Eleventy, with lots of people making their own starter kits for it. We were no exception, and built our own: [Static Site Scaffold](https://github.com/chromeos/static-site-scaffold-modules/tree/85131342337ce51bd023e43c13161ad8ed6c4dac/modules/static-site-scaffold). Our goal was to offer the work we were doing to the community, providing a foundation for people to build internationalized Eleventy sites with, along with default configurations for Rollup and Gulp for managing assets. We also built a number of [shared modules](https://github.com/chromeos/static-site-scaffold-modules/tree/85131342337ce51bd023e43c13161ad8ed6c4dac/modules), including Eleventy plugins, commit linters, markdown plugins, and service worker libraries. We had high hopes that others would pick up these modules and use them themselves. For a variety of reasons, they never got the traction we were hoping for.

Because of this, we decided the complexity of maintaining our configuration separately from our site (Static Site Scaffold) was no longer worthwhile, so we only kept individual pieces we had seen real need to re-use across projects. Our first set of work was [migrating our Eleventy config into our codebase](https://github.com/chromeos/chromeos.dev/issues/147), and modularizing our [localization logic](https://github.com/chromeos/chromeos.dev/issues/145) and [markdown config](https://github.com/chromeos/chromeos.dev/issues/146). The localization logic was especially useful to modularize, as, right before our initial deploy, there was a bug in Node 12 that broke our ability to use [full-icu](https://www.npmjs.com/package/full-icu), leaving us pinned to a specific Node 12 version. During the modularization, we learned that the bug had been fixed and that, in later versions of Node, it was no longer needed at all, further simplifying our codebase.

## A Shift in Tooling

Between when we launched the site in August of 2020 and the end of the year, a paradigm shift happened in the development tooling space. Starting with [Snowpack 2.0](https://www.npmjs.com/package/snowpack) and [esbuild](https://www.npmjs.com/package/esbuild), then [WMR](https://www.npmjs.com/package/wmr), and finally [Vite 2.0](https://www.npmjs.com/package/vite), the bundler ecosystem embraced ES modules and a "batteries included mentality. This resulted in development speeds becoming lightning fast while also removing the need to configure complex features, like code splitting and hot module reloading. The result? Faster development that required less maintenance and produced more optimized code. We're in.

Most web development tooling had, to that point, been optimized for building large JavaScript applications, which we weren't building. As a result, our original codebase consisted of Eleventy, Gulp, Rollup, and Browser Sync held together with string and duct tape. While it worked at the time, it was slow. Configuration was spread out throughout many files and systems. It was fragile. After some experimenting, we decided that Vite was the best fit for us. It had a great ecosystem, it made choices that aligned with our sensibilities, it was the fastest of the three, and it worked really well for our needs (not building a full JS app, compiling Sass separate from our JS pipeline, working with both workers and service workers). It took about a month to get all the pieces in place, but we finally managed to [migrate our build and local serving to Vite](https://github.com/chromeos/chromeos.dev/issues/150). A number of interesting _new_ modules came as a result of migrating to Vite.

The first is [Vite Plugin Eleventy](https://www.npmjs.com/package/vite-plugin-eleventy) which was actually started over the summer to experiment with combining Vite and Eleventy in anticipation of this refactor. It lets you use Eleventy directly inside your Vite project as a static site generator.

The next was [Vite Plugin PostHTML](https://www.npmjs.com/package/vite-plugin-posthtml), allowing for [PostHTML](https://github.com/posthtml/posthtml) plugins to work on HTML run through Vite. We had previously been using Eleventy transforms and a pseudo-DOM manipulation library to do HTML transforms, but we found it sometimes wrapped output incorrectly and was pretty slow. By moving to PostHTML, which does [AST based transformation](https://en.wikipedia.org/wiki/Abstract_syntax_tree), we were able to make the same changes faster, and without accidental incorrect output. Running them as a Vite plugin also meant they only ran on the file being served in development instead of every file, like they do for Eleventy transforms, improving development speed even more.

There was a third module we experimented with, [Vite Plugin Img](https://www.npmjs.com/package/vite-plugin-img), for doing the same kind of image manipulation we had previously done through Eleventy through Vite instead, but we wound up deciding against using it in production.

## Managing Images

Far and away the biggest contributor to our build times was how we managed our images. Images on our site have a number of requirements:

- They need to be [lazy loaded](https://web.dev/learn/design/responsive-images/#loading-hints) so only images that are likely to be displayed are downloaded. Because of this, we also need to know their [size](https://web.dev/learn/design/responsive-images/#sizing-hints).
- They need to be [responsive](https://web.dev/learn/design/responsive-images/#responsive-images-with-srcset), with the same image being scaled to multiple different sizes.
- All of those images also need to be for multiple [image formats](https://web.dev/learn/design/picture-element/#image-formats), so we can have the best chance of serving the smallest size image for each user and device.
- All generated images need to be optimized to reduce overall image size with minimal change in picture quality.
- Any images whose source is an animated `.gif` needs to be converted to a silent, looping, autoplaying video, which are usually much smaller.

These requirements exist so that we can, to the best of our ability, make sure our users are served only the media that's required for their browsing context, and only the most optimized versions of that media. What this meant in practice, though, was that for every individual image we had on our site, we needed to generate about 15 images in varying formats and potentially support GIF to video encoding. We also needed to rely on developers having a number of additional command-line packages installed that differed across operating systems.

Our first attempt at this, [Eleventy Plugin Local Responsive Images](https://github.com/chromeos/static-site-scaffold-modules/tree/91285a3289358599df58b29190b80e8afd107d59/modules/eleventy-plugin-local-respimg) was able to do this pretty well; it kept an in-memory cache of images it had already optimized so it wouldn't have to do them twice in the same run, was super configurable, and didn't require special syntax to work; just an `img` tag that pointed to a local image, and it magically worked! For videos, too! It was built as an Eleventy transform, which meant that on each build of the site, it would need to do the transforms for all images across all rendered pages. This meant the first build of a watch task, for instance, was very slow, while subsequent builds were faster.

Our second attempt was the previously mentioned Vite Plugin Img and did more or less the same thing, but moved the transforms to PostHTML so they ran only on the page being displayed during development, or only when needed during a production build. It also moved to only rendering the images during a production build, which generally sped up the whole development process. The original goal was to leverage the Vite ecosystem and let other image related plugins handle the optimization, but the images would end up being written too late for common image optimization plugins to pick them up, so we implemented image optimization ourself. This seemed like a good path, until we found a [weird Vite bug](https://github.com/vitejs/vite/issues/5815) where if one of our image optimization dependencies was simply required—not even used, just required—in a Vite config, Sass would fail to load! So, we either needed another solution, or needed to rethink this module in its entirety.

After some investigation, we wound up choosing to [migrate to an image CDN](https://github.com/chromeos/chromeos.dev/issues/154). This did a number of things for us:

- Removed the need for us to store images in our codebase,
- Removed image manipulation from our build stack.
- Removed the need for us to use the `picture` tag for all of our images, making our CSS and HTML easier to maintain.

It did all of this while resolving all of our requirements and (mostly) without changing any of the HTML or markdown already written for the site. Our whole image optimization pipeline, reduced to essentially the same PostHTML transform we had already written for Vite Plugin Img. There was only one change required: images that use our CDN need to be prefixed with `ix://` for the transform to be applied. A small inconvenience; we already had precedent for image prefixes in our codebase and the benefits were clear.

## Other Updates

There were a few additional updates we wound up doing based on contributor feedback.

First, we removed commit linting all together; it didn't work reliably across all operating systems and added a lot of developer overhead. Instead, we implemented PR title checking and PR squashing, letting all commits roll up into a single, tidy linted message. We even [kept emojis and optional scopes](https://github.com/chromeos/chromeos.dev/blob/77c717c3b752be7276f4d4b0185da9f792377c54/.github/pr-title-checker-config.json).

Next, we changed our linting git hook. Previously, we ran linting over all files before a commit could happen. Now, we only lint the code that's staged, and rely on our continuous integration tests to catch anything that may slip through the cracks.

Finally, we [overhauled our service worker](https://github.com/chromeos/chromeos.dev/issues/159). We implemented [broadcast updates](https://developers.google.com/web/tools/workbox/modules/workbox-broadcast-update) to let users know if the cached content they're viewing is out-of-date, we made the home page and the news and stories landing pages try the network before falling back to cache, and we changed how our assets get cached during installation and runtime. Because our images are from a CDN, we also needed to implement [opaque response caching](https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests#workbox_caches_opaque_response_sometimes) for them.

## Missing Features

There are two features we had in our original build that didn't make it to our new build: [inlining critical CSS](https://github.com/chromeos/chromeos.dev/issues/148) and [minifying our HTML](https://github.com/chromeos/chromeos.dev/issues/149). Inlining critical CSS is something that would be good for the performance of our site, but it sadly just doesn't integrate cleanly with Vite right now. Minifying our HTML, on the other hand, only has a small impact on overall performance, so we have deprioritized fixing the underlying bug that currently blocks its implementation.

## Results!

So, what are the results?!

On one development machine, we've seen development startup times go from 3-5 minutes down to about **5 seconds**! Page reload also takes about 5 seconds, down from 1-2 minutes. That five seconds is almost entirely Eleventy compiling our HTML, so more optimization may be possible. It's also removed all external dependencies, letting `npm install` be the single installation requirement. Not bad for about a month's worth of work.

What about deployment? We use [GitHub Actions](https://github.com/chromeos/chromeos.dev/actions) to test, build, and deploy our site. Before this update, our both our test and preview builds and deploy builds took about 20-25 minutes to complete. After migrating to our new codebase, our test and preview builds now take **less than 4 minutes** to finish, with deploy builds taking **less than 6 minutes**. From opening a PR to a change appearing on our site used to take almost an hour to finish; it now takes about 10 minutes. That is _huge_ for us.

This newfound speed proved its worth just minutes after launch. While the overall goal of the refactor was to keep the site looking the same, we had made one major change under the hood: how we handled caching and routing in our service worker. Unfortunately, we had missed an important edge case when testing our upgrade process, and it made it to production.

Now, testing service worker changes for production sites is tough; you need to emulate a "lived in" experience with caches primed and quirks in place, and then you need to test the upgrade process and hope you hit all of your use cases. If you don't, you need to roll back both your code and your browser cache state. We had done lots of testing, but we missed something. Right after our new build was deployed, we anxiously put the site through its paces and, unfortunately, saw that some pages already in our cache lost all of their CSS and JS after the new service worker activated! Disaster! Fortunately, it was only a one-character fix and, with our new build process, we were able to discover, diagnose, resolve, rebuild, and redeploy in about 15 minutes. Speed, for the win!.

### Micro Benchmarks

While no doubt the largest contributor to our decreased build times is removing image processing from our build path, there are a number of interesting micro-benchmarks that provide interesting takeaways, too:

- Moving HTML transformations from Eleventy transforms to PostHTML through Vite cut our Eleventy build times _in half_. During development, transforms now only have to take place on the page being served, which is super speedy! During a production build, because PostHTML is AST based, it's still quicker than the pseudo-DOM manipulation we were doing before even when transforming all of the files.
- It previously took about 10.5 minutes to run through our build, of which about 9.5 minutes was image processing. Our current build runs in less than 40 seconds.
- Fewer dependencies means less to install! Our `npm install` time dropped from about a minute to about 35 seconds.
- We share built files between different jobs in our GitHub actions, requiring us to upload and download artifacts between jobs. Our old build produced a 200MB archive that took 3.5 minutes to upload. Our new build produces an archive of only 11MB and takes just 20s to upload!

---

A huge thank-you to Matias Capeletto ([patak](https://github.com/patak-dev)) for their work on Vite and help navigating Vite issues during our migration, Joaquín Sánchez ([userquin](https://github.com/userquin)) for their help getting our service worker build process sorted out, Jeffrey Posnick ([jeffposnick](https://github.com/jeffposnick)) for their help with our service worker migration, and the whole Chrome OS DevRel team for helping do pre-launch tests and catching a bunch of stuff before we launched!
