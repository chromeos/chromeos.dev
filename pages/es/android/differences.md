---
title: Diferencias de renderizado
metadesc: Cómo las aplicaciones se despliegan diferente en Chromebooks.
date: 2020-05-01
weight: -2
---

Debido a que las aplicaciones de Android se ejecutan en una ventana en Chrome OS, existen pequeñas diferencias en la forma en que las aplicaciones se despliegan en Chromebooks. Estas diferencias se resumen a continuación.

## Tareas, ventanas y transparencia.

Una [tarea](https://developer.android.com/guide/components/activities/tasks-and-back-stack?hl=es) consiste en una pila de actividades con las que el usuario interactúa cuando ejecuta una aplicación. Las tareas se presentan en Chrome OS como una ventana con una barra de título, con las aplicaciones superpuestas. Cada actividad puede estar parcialmente translúcida, permitiendo que las capas inferiores se vean.

En una aplicación de Android convencional, la tarea anterior o el escritorio se muestran debajo de la tarea. De esta manera, siempre hay algo visible debajo de una tarea translúcida.

Esto no funciona en un entorno de ventana por los siguientes motivos:

- El contenido visible debajo de una ventana no se puede controlar y, por lo tanto, podría ser cualquier cosa.
- Todos los píxeles completamente transparentes se tragarían "mágicamente" todos los eventos táctiles / del mouse.
- Los elementos de la ventana pueden desconectarse visualmente del subtítulo y confundir al usuario con elementos visuales posiblemente desconectados.

Para mitigar este problema, Play para Chrome OS dibuja un rectángulo semitransparente detrás de cada ventana. Por esta razón, las aplicaciones nunca pueden ser 100% transparentes cuando se ejecutan con Chrome OS, incluso cuando se usa el tema `Theme.Translucent.NoTitleBar` .
