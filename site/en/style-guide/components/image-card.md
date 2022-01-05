---
title: Image card
examples:
  - title: Default render - Image at the left on large viewports.
    arguments:
      image:
        src: ix://stories/roblox/roblox-feature.jpg
        alt: Best image
      content:
        title: This is a dummy title with an image at the left
        copy: Lorem ipsum dolor sit amet consectetur   adipisicing elit. Nesciunt non repellat voluptatibus ipsa, voluptatem recusandae perferendis. Sapiente laudantium iure tempora rerum? Minus aperiam nesciunt unde molestiae, dolorem suscipit doloremque ducimus.
      cta:
        url: '#'
        text: Custom link
  - title: Render using the flip flag - Image at the right on large viewports.
    arguments:
      image:
        src: ix://stories/roblox/roblox-feature.jpg
        alt: Best image
      content:
        title: This is a dummy title with an image at the right
        copy: Lorem ipsum dolor sit amet consectetur   adipisicing elit. Nesciunt non repellat voluptatibus ipsa, voluptatem recusandae perferendis. Sapiente laudantium iure tempora rerum? Minus aperiam nesciunt unde molestiae, dolorem suscipit doloremque ducimus.
      cta:
        url: 'https://www.google.com/'
        text: Custom link
      modifiers:
        flip: true
  - title: Render using the offset flag - Image at the left on large viewports.
    arguments:
      image:
        src: ix://landings/home/laptop-linux.png
        alt: Best image
      content:
        title: This is a dummy title with an image at the right
        copy: Lorem ipsum dolor sit amet consectetur   adipisicing elit. Nesciunt non repellat voluptatibus ipsa, voluptatem recusandae perferendis. Sapiente laudantium iure tempora rerum? Minus aperiam nesciunt unde molestiae, dolorem suscipit doloremque ducimus.
      cta:
        url: 'https://www.google.com/'
        text: Custom link
      modifiers:
        offset: true
  - title: Render using the offset and flip flag - Image at the right on large viewports.
    arguments:
      image:
        src: ix://landings/home/laptop-linux.png
        alt: Best image
      content:
        title: This is a dummy title with an image at the right
        copy: Lorem ipsum dolor sit amet consectetur   adipisicing elit. Nesciunt non repellat voluptatibus ipsa, voluptatem recusandae perferendis. Sapiente laudantium iure tempora rerum? Minus aperiam nesciunt unde molestiae, dolorem suscipit doloremque ducimus.
      cta:
        url: 'https://www.google.com/'
        text: Custom link
      modifiers:
        offset: true
        flip: true
---

Image card component - It's used to display an image next to a related text
