---
title: Contenido destacado
examples:
  - title: Contenedor lleno - Procesamiento predeterminado.
    useMaxWidth: falso
    arguments:
      data:
        eyebrow: Esta es la ceja
        title: Este es el titulo
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: / /
          text: Este es un enlace
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: algunos alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: algunos alt
  - title: Contenedor con ancho máximo de 1440 px - Procesamiento predeterminado.
    useMaxWidth: cierto
    arguments:
      data:
        eyebrow: Esta es la ceja
        title: Este es el titulo
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: / /
          text: Este es un enlace
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: algunos alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: algunos alt
  - title: Contenedor con ancho máximo de 1440 px - Procesamiento predeterminado - CTA externo.
    useMaxWidth: cierto
    arguments:
      data:
        eyebrow: Esta es la ceja
        title: Este es el titulo
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: https://www.google.com/
          text: Este es un enlace
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: algunos alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: algunos alt
  - title: Contenedor con ancho máximo de 1440 px - Procesamiento predeterminado - CTA externo - Círculo amarillo.
    useMaxWidth: cierto
    arguments:
      data:
        eyebrow: Esta es la ceja
        title: Este es el titulo
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: https://www.google.com/
          text: Este es un enlace
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: algunos alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: algunos alt
      modifiers:
        custom: use-yellow-circle
  - title: Contenedor con ancho máximo de 1440 px - Procesamiento predeterminado - Superposición.
    useMaxWidth: cierto
    arguments:
      data:
        eyebrow: Esta es la ceja
        title: Este es el titulo
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: / /
          text: Este es un enlace
        imagePrimary:
          path: ix://feature-story/laptop.png
          alt: algunos alt
        imageSecondary:
          path: ix://feature-story/screen.png
          alt: algunos alt
      modifiers:
        custom: use-gray-overlay
  - title: Envoltura completa - versión aplanada.
    useMaxWidth: cierto
    arguments:
      data:
        eyebrow: Esta es la ceja
        title: Este es el titulo
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Consequuntur asperiores et labore nihil qui! Sint praesentium nostrum accusantium fuga eius. Iste iusto ut provident laborum atque velit tempore, magni minus?
        cta:
          url: / /
          text: Este es un enlace
        imagePrimary:
          path: ix://feature-story/evernote-featured-flat.png
          alt: algunos alt
---

Este es un contenido de muestra que explica el componente

<style>
.use-grey-overlay {
  --overlay-color: var(--grey-300);
}

.use-yellow-circle {
  --featured-shape-color: var(--yellow-500);
}
</style>
