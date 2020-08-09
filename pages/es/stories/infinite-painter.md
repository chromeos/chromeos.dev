---
title: Infinite Studio aumenta las instalaciones activas después de la optimización para Chrome OS
metadesc: Después de la optimización para pantallas grandes, las instalaciones activas de Infinite Painter y la actividad general en la aplicación han crecido sustancialmente.
app:
  name: Pintor infinito
  logo: gs://stories/infinite-painter/infinite-painter-icon
  company: Estudio infinito
hero:
  image: gs://stories/infinite-painter/hero
  alt: Captura de pantalla de Infinite Studio con una pintura en curso y opciones de pincel abiertas
  position: top
date: 2018-11-15
tags:
  - diseño
  - soporte para teclado
  - soporte para mouse
  - soporte para pantalla táctil
  - soporte para lápiz óptico
  - soporte para trackpad
  - dispositivos de entrada
  - pantallas grandes
---

Con pinceles naturales, mezclas realistas y un conjunto de herramientas sin igual, [Infinite Painter](https://play.google.com/store/apps/details?id=com.brakefield.painter) es una de las aplicaciones de pintura más avanzadas disponibles en dispositivos móviles. Impulsado por su mantra, "Empujando los límites de los dispositivos móviles", el equipo de desarrolladores de Infinite Painter vio la oportunidad de aumentar su alcance y cerrar la brecha entre su audiencia móvil existente y la base de usuarios de Chromebook en rápido crecimiento.

A pesar de que más usuarios migraron del uso de escritorios tradicionales y tabletas interactivas a dispositivos móviles, Infinite Studio comenzó a recibir más solicitudes para que Infinite Painter estuviera disponible en pantallas de escritorio más amplias y envolventes. El equipo de desarrollo se dio cuenta de que podía llevar a Infinite Painter a un entorno de escritorio optimizando la aplicación para Chrome OS. Como las aplicaciones de Android pueden ejecutarse en Chrome OS y los usuarios pueden acceder fácilmente a ellas a través de Google Play, el equipo pudo realizar estas actualizaciones sin mucho esfuerzo.

## Que hicieron

El primer paso del equipo de desarrollo fue descubrir qué haría que el UX de Infinite Painter fuera más atractivo mientras se ejecuta en una computadora de escritorio. El equipo decidió aprovechar las nuevas funciones de Chromebook, ideales para experiencias inmersivas en pantalla ancha, haciendo tres ajustes clave: agregar atajos de teclado, optimizar nuevos dispositivos de entrada y habilitar ventanas redimensionables.

### ![](/images/icons/keyboard.png) {.icon - redondeado} Atajos de teclado

Lo primero que Infinite Studio se dio cuenta fue con qué frecuencia los diseñadores e ilustradores usan atajos de teclado para acelerar su flujo de trabajo. Por lo tanto, los desarrolladores agregaron 30 accesos directos estándar de la industria y los organizaron en un menú desplegable de fácil acceso que se activa manteniendo presionada la tecla [[CTRL]].

![Pantalla de control para Infinite Painter](gs://stories/infinite-painter/infinitepainter-controls)

### ![](/images/icons/mouse.png) {.icon - redondeado} Dispositivos de entrada

Luego, Infinite Studio [optimizó la aplicación para varios dispositivos de entrada](/{{locale.code}}/android/input-compatibility) , como un mouse externo, la punta de los dedos (algunas Chromebooks vienen equipadas con una pantalla táctil), un lápiz óptico o un panel táctil. Para los paneles táctiles, el equipo agregó la capacidad de ampliar y desplazar fácilmente el lienzo con gestos con dos dedos. Para los ratones externos, agregaron el zoom de la rueda de desplazamiento y la información sobre herramientas que aparece cuando los usuarios se desplazan sobre los elementos de la interfaz con el cursor.

Los desarrolladores ya tenían soporte para la entrada de lápiz y dedo para usuarios móviles, pero trabajaron estrechamente con el equipo de Chrome OS para hacer que la experiencia sea aún más fluida con la API de baja latencia. Esto permite que la aplicación dibuje trazos directamente en la superposición de la pantalla y brinda a los usuarios la sensación de dibujar directamente en la pantalla con su lápiz o sus dedos.

### ![](/images/icons/aspect_ratio.png) {.icon - redondeado} Ventanas redimensionables

Finalmente, el equipo [optimizó la aplicación para admitir diferentes tamaños de ventana](/{{locale.code}}/android/window-management) . Los usuarios pueden cambiar el tamaño de la ventana de la aplicación para una experiencia óptima en cualquier factor de forma, ya sea que prefieran trabajar en modo de pantalla completa o abrir y usar otra aplicación junto a ella. Los desarrolladores también agregaron la capacidad de los usuarios de arrastrar y soltar imágenes externas en la aplicación.

![Vista del tablero de arte de Infinite Painter](gs://stories/infinite-painter/infinitepainter-artboards)

## Resultados

> Lo mejor de todo es que casi toda la migración ya se realizó cuando Google agregó soporte para aplicaciones de Android en Chromebooks.

Sean Brakefield, creador de Infinite Painter {.cite}

Después de optimizar para pantallas más anchas en Chrome OS, las instalaciones activas de Infinite Painter han crecido un 55%, y la actividad general en la aplicación casi se ha duplicado. Sean Brakefield, el creador de Infinite Painter, no podría estar más feliz con la decisión de su equipo: "Entre la creciente demanda de los usuarios de experiencias centradas en el tacto y la gama de Chromebooks basados en stylus que se lanzaron, sabíamos que tenía mucho sentido optimizar para Chrome OS ", concluyó. "Lo mejor de todo es que casi toda la migración ya se realizó cuando Google agregó soporte para aplicaciones de Android en Chromebooks".

% [(55%, crecimiento en instalaciones activas), (2x, crecimiento en la actividad general en la aplicación)]

## Empezar

Aprenda como [optimizar su aplicación para Chrome OS](/{{locale.code}}/android/optimizing) de la mejor manera.
