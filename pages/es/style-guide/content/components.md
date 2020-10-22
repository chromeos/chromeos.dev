---
title: Componentes de autoría de contenido
metadesc: Los autores de contenido de componentes pueden usar al crear contenido
---

Al crear contenido con [Markdown](https://guides.github.com/features/mastering-markdown/) , tiene acceso a todos los [Markdown con sabor a GitHub](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax) (GFM), excepto las listas de tareas y las características específicas de GitHub (como mencionar personas y equipos).

Para ver un ejemplo de variaciones individuales en la tipografía de formato largo, consulte la [guía de estilo de tipografía.](/{{locale.code}}/style-guide/typography)

## Extensiones Adicionales

También hemos incluido una serie de extensiones adicionales, que se presentan a continuación.

### Bloques de código

Al escribir bloques largos de código, utilice el cercado de código en lugar de la sangría. El resaltado de sintaxis es compatible con cualquier idioma [compatible con Prism.js](https://prismjs.com/#supported-languages) . Debido a que nuestro sitio es receptivo, también es importante que las líneas largas no tengan retornos artificiales insertados para restringirlas a longitudes de línea específicas; todos nuestros bloques de código tienen habilitado el ajuste de línea suave y la longitud total de la línea varía según sea necesario para el espacio disponible.

### Listas de definiciones

Las listas de definiciones representan una lista de términos y sus definiciones o descripciones. Deben usarse en lugar de listas estándar al definir los términos.

Término: definición

Término 2: Definición

```markdown
Term
: Definition

Term 2
: Definition
```

### Nota

Se utiliza una nota al pie para proporcionar información adicional sobre un elemento al final del contenido.

Esta es una nota al pie [^ 1], con una segunda [^ segundo] como medida.

[^ 1]: Contenido de la primera nota al pie. [^ segundo]: segunda nota al pie

```markdown
This is a footnote[^1], with a second one[^second] for good measure.

[^1]: Content of the first footnote.
[^second]: Second footnote
```

### Sobrescrito

El contenido de superíndice suele ser superíndice por razones puramente de presentación.

Este ^ es ^ algún ^ superíndice ^ contenido.

```markdown
This^is^ some^superscript^ content.
```

### Abreviaturas

Las abreviaturas le permiten definir una abreviatura para usar en todo el texto.

<!-- prettier-ignore -->
* [HTML]: Lenguaje de marcado de hipertexto * [MD]: Markdown

Este archivo MD se convierte en HTML cuando se compila el sitio.

```markdown
<!-- prettier-ignore -->
*[HTML]: Hyper Text Markup Language
*[MD]: Markdown

This MD file is turned into HTML when the site is compiled.
```

### Emoji

Agregue Emoji directamente a la salida representada a través de palabras clave y accesos directos en lugar de tener que escribirlos directamente. Vea las listas completas de [emojis](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json) y [accesos directos](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/shortcuts.js) disponibles.

: corazón: <3

Emoji se puede usar en: memo: oraciones también.

```markdown
:heart: <3

Emoji can be used in :memo: sentences too.
```

### Figura

Agregue una imagen con título visible como una figura lógica única. Las figuras se pueden numerar opcionalmente, lo que les permitirá vincularse directamente.

#[Título de imagen](/images/icons/pwa/chromeOS.svg)

# 1 [Título de imagen] (/ images / icons / pwa / chromeOS.svg [Con una descripción accesible de la imagen])

```markdown
#[Caption for Image](/images/icons/pwa/chromeOS.svg)

#1[Caption for Image](/images/icons/pwa/chromeOS.svg [With description of image])
```

### Vídeo

Agregue un video incrustado de YouTube.

@ [youtube](https://www.youtube.com/watch?v=ntLPcVAyNPE)

```markdown
@[youtube](https://www.youtube.com/watch?v=ntLPcVAyNPE)
```

### Tecla del teclado

Mostrar una tecla del teclado. Siempre que esté hablando de una tecla específica en un teclado, como proporcionar una secuencia de teclas para un atajo de teclado, cada tecla individual debe incluirse de la siguiente manera. Además, al proporcionar una secuencia de teclas, cada tecla debe estar separada por espacios `+` \_with\_\_ a su alrededor.

[[CTRL]]+[[C]]

```markdown
[[CTRL]]+[[C]]
```

### Estadísticas

Muestra una o varias estadísticas relacionadas juntas.

% [123%, Qué mejora]

% [(123%, ¿Puedes creerlo?), (2x, Crecimiento en la actividad), (12%, Golpe pero aún impresionante)]

```markdown
%[123%, What an improvement]

%[(123%, Can you believe it), (2x, Growth in activity), (12%, Bump but still impressive)]
```

### Mensajes

A veces, debe llamar a un lector con un mensaje al que debe prestarle atención. Para hacerlo, use uno de los siguientes:

!!! aside.message
Esto es solo un mensaje. ¡Los mensajes _pueden_ tener Markdown en ellos, y se renderizará!
!!!

!!! aside.message--note
Esta es una nota.
!!!

!!! aside.message--warning
Esta es una advertencia.
!!!

!!! aside.message--tip
Este es un consejo.
!!!

```markdown
!!! aside.message
This is just a message. Messages _can_ have Markdown in them, and it will render as expected.
!!!

!!! aside.message--note
This is a note.
!!!

!!! aside.message--warning
This is a warning.
!!!

!!! aside.message--tip
This is a tip.
!!!
```

### Cotizaciones con atribución

Al escribir citas independientes, use lo siguiente para incluir correctamente la atribución de la cita.

> Esta es una cita
> La cita puede tener varios párrafos.

Aquí está la atribución de la cita {.cite}

```markdown
> This is a quote
>
> The quote can have multiple paragraphs

Here is the quote attribution {.cite}
```
