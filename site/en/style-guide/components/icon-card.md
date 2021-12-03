---
title: Icon Card
examples:
  - title: Default render, default microcopy
    arguments:
      data:
        title: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        image: https://icons.iconarchive.com/icons/google/chrome/256/Google-Chrome-icon.png
        alt: Some alt
        cta:
          url: '/'
      defaultText: Read More
  - title: External URL, default microcopy
    arguments:
      data:
        title: This card has a very long title. Magni nemo maxime rerum ex quia! Praesentium reprehenderit explicabo tempora aperiam.
        image: https://icons.iconarchive.com/icons/dtafalonso/android-l/512/Play-Store-icon.png
        alt: Some alt
        cta:
          url: 'https://www.google.com/'
      defaultText: Read More
  - title: External URL, custom microcopy
    arguments:
      data:
        title: This card has a very long title. Magni nemo maxime rerum ex quia! Praesentium reprehenderit explicabo tempora aperiam.
        image: https://icons.iconarchive.com/icons/google/chrome/256/Google-Chrome-icon.png
        alt: Some alt
        cta:
          url: 'https://www.google.com/'
          text: Custom link
---

A card with an icon.

Recommendations for arguments:

- `defaultText`: `microcopy.more`
