---
title: Tarjeta de imagen
examples:
  - title: 'Procesamiento predeterminado: imagen a la izquierda en ventanas grandes.'
    arguments:
      image:
        src: ix://stories/roblox/roblox-feature.jpg
        alt: Mejor imagen
      content:
        title: Este es un título ficticio con una imagen a la izquierda.
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Nesciunt non repellat voluptatibus ipsa, voluptatem recusandae perferendis. Sapiente laudantium iure tempora rerum? Menos aperiam nesciunt unde molestiae, dolorem suscipit doloremque ducimus.
      cta:
        url: # #
        text: Vínculo personalizado
  - title: 'Renderice usando la bandera de volteo: imagen a la derecha en ventanas grandes.'
    arguments:
      image:
        src: ix://stories/roblox/roblox-feature.jpg
        alt: Mejor imagen
      content:
        title: Este es un título falso con una imagen a la derecha
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Nesciunt non repellat voluptatibus ipsa, voluptatem recusandae perferendis. Sapiente laudantium iure tempora rerum? Menos aperiam nesciunt unde molestiae, dolorem suscipit doloremque ducimus.
      cta:
        url: https://www.google.com/
        text: Vínculo personalizado
      modifiers:
        flip: cierto
  - title: 'Renderice con la bandera de desplazamiento: imagen a la izquierda en ventanas grandes.'
    arguments:
      image:
        src: ix://landings/home/laptop-linux.png
        alt: Mejor imagen
      content:
        title: Este es un título falso con una imagen a la derecha
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Nesciunt non repellat voluptatibus ipsa, voluptatem recusandae perferendis. Sapiente laudantium iure tempora rerum? Menos aperiam nesciunt unde molestiae, dolorem suscipit doloremque ducimus.
      cta:
        url: https://www.google.com/
        text: Vínculo personalizado
      modifiers:
        offset: cierto
  - title: 'Renderice utilizando el indicador de desplazamiento y volteo: imagen a la derecha en ventanas grandes.'
    arguments:
      image:
        src: ix://landings/home/laptop-linux.png
        alt: Mejor imagen
      content:
        title: Este es un título falso con una imagen a la derecha
        copy: Lorem ipsum dolor sentarse amet consectetur adipisicing elit. Nesciunt non repellat voluptatibus ipsa, voluptatem recusandae perferendis. Sapiente laudantium iure tempora rerum? Menos aperiam nesciunt unde molestiae, dolorem suscipit doloremque ducimus.
      cta:
        url: https://www.google.com/
        text: Vínculo personalizado
      modifiers:
        offset: cierto
        flip: cierto
---

Componente de tarjeta de imagen: se utiliza para mostrar una imagen junto a un texto relacionado
