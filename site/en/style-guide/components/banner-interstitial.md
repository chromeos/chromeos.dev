---
title: Banner Interstitial
examples:
  - title: Full banner
    arguments:
      content:
        eyebrow: M100 Launch
        title: New Features
        copy: Coming in all shapes and sizes, Chromebooks are speedy, simple, secure, and run Chrome OS.
      image:
        src: ix://devices/Samsung_tent_shadow.png
        alt: A partially opened Samsung Chromebook next to a stylus.
      cta:
        url: /en/news
        text: Learn more
  - title: Without CTA
    arguments:
      content:
        eyebrow: M100 Launch
        title: New Features
        copy: Coming in all shapes and sizes, Chromebooks are speedy, simple, secure, and run Chrome OS.
      image:
        src: ix://devices/Samsung_tent_shadow.png
        alt: A partially opened Samsung Chromebook next to a stylus.
---

A banner component with a color stop background that changes from full bleed to contained across device sizes. It requires a wrapper component with the class `banner-interstitial__wrapper` to handle the transition from full bleed to contained.
