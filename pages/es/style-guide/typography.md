---
title: Tipografía del sitio
metadesc: Guía de estilo de tipografía
published: 1 de diciembre de 2019
updated: 30 de enero de 2020
---

Este es un ejemplo de tipografía de formato largo utilizada en todo el sitio. Se puede aplicar ajustando el texto de formato largo que le gustaría diseñar en la clase `.type` . Esta página también muestra todas las capacidades disponibles al escribir Markdown como autor. Una nota importante para la tipografía de formato largo, los estilos de titulares tienen un estilo `n+1` , por lo que un `h1` tiene el estilo de un `h2` de nuestra tipografía **principal** (ver más abajo).

Al crear componentes, tenemos un conjunto de tipografía con clases que debe usar directamente en lugar de confiar en este estilo de formato largo. Se dividen en 4 secciones:

[Núcleo](%7B%7Bpage.url%7D%7Dcore) : Estilos tipográficos básicos sobre los que se construyen todos los demás estilos del sitio.

[Extras](%7B%7Bpage.url%7D%7Dextras) : estilos tipográficos que se usan comúnmente y heredan su estilo de uno de los conjuntos principales de estilo.

[CTA](%7B%7Bpage.url%7D%7Dcta) : estilo de llamado a la acción, más comúnmente visualizado como botones y enlaces.

[Enlaces](%7B%7Bpage.url%7D%7Dlinks) : Tipos específicos de estilo de enlaces utilizados en todo el sitio.

---

# Título 1

## Título 2

### Título 3

#### Título 4

##### Título 5

###### Título 6

## ![icono de teclado](/images/icons/keyboard.png) {.icon - redondeado} Ejemplo 1 de título con un icono

## ![icono de relación de aspecto](/images/icons/aspect_ratio.png) {.icon - redondeado} Ejemplo 2 de título con un ícono

## ![icono del mouse](/images/icons/mouse.png) {.icon - redondeado} Ejemplo 3 de título con un icono

Esto es una cosa

: Y su definición

Y otra cosa con _marcado en línea_

: Y también tiene una definición

```js
let foo = 'Hello World';
const log = arg => {
  console.log(arg);
};
log(foo);
```

> Esta es una buena cita. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.

Aquí está la atribución de la cita {.cite}

> Esta es una buena cita sin atribución. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
> Éste es el segundo párrafo.

Aquí está la atribución de la cita {.cite}

> Esta es una buena cita sin atribución. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.

Esta no es la atribución de la cotización.

> Esta es una buena cita sin atribución. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
> Éste es el segundo párrafo.

Esta no es la atribución de la cotización.

Aquí hay una nota al pie. [^ 1]

[^ 1]: El contenido de la nota al pie.

!!! aside.message
**Info:** Este es un `message` . Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
!!!

!!! aside.message--note
**Nota:** Este es un `message--note` . Aquí tenemos un [ejemplo de un enlace](/) en la nota. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
!!!

!!! aside.message--advertencia
**Advertencia:** este es un `message--warning` . Aquí tenemos un [ejemplo de un enlace](/) en la nota. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
!!!

!!! aside.message--tip
**Tip:** Este es un `message--tip` . Aquí tenemos un [ejemplo de un enlace](https://google.com) en la nota. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.

Ejemplo con más de un párrafo.
!!!
