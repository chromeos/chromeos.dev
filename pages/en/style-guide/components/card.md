---
title: Card
examples:
  - title: Complete card
    arguments:
      data:
        eyebrow: Trends
        title: Larger screens. Real results.
        body: This card has it all, eyebrow, title, body and source. Go beyond mobile. Adapting apps for Chromebooks opens up a new world of possibility on larger screens.
        source:
          logo: 'https://picsum.photos/seed/five/40'
          name: Published on Android Developers Blog
        url: 'https://google.com'
  - title: No eyebrow
    arguments:
      data:
        title: Adapting Android apps for Chromebook
        body: This card doesn't have an eyebrow. From tablets, to foldables, to Chromebooks, see Android can be adapt to larger screens and form factors on Chrome OS.
        source:
          logo: 'https://picsum.photos/seed/six/40?grayscale'
          name: 'Published on Medium: Google Play Dev'
        url: 'https://google.com'
  - title: No Source
    arguments:
      data:
        eyebrow: Product
        title: Flutter and Chrome OS. Better together.
        body: This card doesn't have a source. The latest Flutter release adds support for building beautiful, tailored Chrome OS applications.
        url: 'https://google.com'
  - title: No eyebrow, no source
    arguments:
      data:
        title: Build a dev workflow with Cloud Code on a Pixelbook
        body: This a simple card. Can you use a Pixelbook for serious  software development?
        url: 'https://google.com'
  - title: No eyebrow, no source, local URL
    arguments:
      data:
        title: The internal link behavior
        body: This card has an internal link, so the arrow changes a bit.
        url: '#'
  - title: No eyebrow, no source, local url, rounded modifier
    arguments:
      data:
        title: The rounded modifier.
        body: This card sets the rounded modifier to false, so it looks squared.
        url: '#'
      modifiers:
        rounded: false
  - title: No eyebrow, no source, local url, custom modifier
    arguments:
      data:
        title: The custom modifier.
        body: This card sets a custom modifier, so it looks different.
        url: '#'
      modifiers:
        custom: 'colorful'
---

This is some sample content explaining the component
