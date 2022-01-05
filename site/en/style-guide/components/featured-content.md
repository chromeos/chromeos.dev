---
title: Featured content

examples:
  - title: Wrapper full - Default render.
    useMaxWidth: false
    arguments:
      data:
        eyebrow: This is the eyebrow
        title: This is the title
        copy: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: /
          text: This is a link
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: some alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: some alt
  - title: Wrapper with max width 1440px - Default render.
    useMaxWidth: true
    arguments:
      data:
        eyebrow: This is the eyebrow
        title: This is the title
        copy: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: /
          text: This is a link
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: some alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: some alt
  - title: Wrapper with max width 1440px - Default render - External CTA.
    useMaxWidth: true
    arguments:
      data:
        eyebrow: This is the eyebrow
        title: This is the title
        copy: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: https://www.google.com/
          text: This is a link
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: some alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: some alt
  - title: Wrapper with max width 1440px - Default render - External CTA - Yellow circle.
    useMaxWidth: true
    arguments:
      data:
        eyebrow: This is the eyebrow
        title: This is the title
        copy: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: https://www.google.com/
          text: This is a link
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: some alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: some alt
      modifiers:
        custom: use-yellow-circle
  - title: Wrapper with max width 1440px - Default render - Overlay.
    useMaxWidth: true
    arguments:
      data:
        eyebrow: This is the eyebrow
        title: This is the title
        copy: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: /
          text: This is a link
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: some alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: some alt
      modifiers:
        custom: use-grey-overlay
  - title: Wrapper full - flattened version.
    useMaxWidth: true
    arguments:
      data:
        eyebrow: This is the eyebrow
        title: This is the title
        copy: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: /
          text: This is a link
        imagePrimary:
          path: ix://featured/evernote-featured-flat.1500.png
          alt: some alt
---

This is some sample content explaining the component

<style>
.use-grey-overlay {
  --overlay-color: var(--grey-300);
}

.use-yellow-circle {
  --featured-shape-color: var(--yellow-500);
}
</style>
