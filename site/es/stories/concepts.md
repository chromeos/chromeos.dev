---
title: TopHatch presenta el lienzo inmersivo de Concepts en Chrome OS y Android
metadesc: Al optimizar para Chrome OS, Concepts pudo desbloquear una base de usuarios grande y creciente al tiempo que aumentó el tiempo promedio que los usuarios pasan en su aplicación.
date: 2019-05-02
app:
  name: Concepts
  logo: ix://stories/concepts/concepts-icon.240.png
  company: TopHatch
hero:
  image: ix://stories/concepts/hero.1500.jpg
  alt: Bosquejo de un coche que muestra la rueda de color en Concepts
tags:
  - diseño
  - soporte para lápiz óptico
  - gráficos de alto rendimiento
  - soporte para teclado
---

[Concepts](https://play.google.com/store/apps/details?id=com.tophatch.concepts) , desarrollado por el pequeño equipo de [TopHatch](https://concepts.app/en/) , es una plataforma de diseño avanzada que combina la flexibilidad de un cuaderno de dibujo tradicional con la velocidad y versatilidad de una herramienta de dibujo digital. Diseñado para una interfaz natural usando el tacto en dispositivos móviles desde el principio, Concepts permite a los diseñadores profesionales trabajar con herramientas hermosas pero altamente receptivas, entornos flexibles y vectores ajustables. Es un patio de recreo para la creatividad. Los desarrolladores de TopHatch sabían que los usuarios de Concepts valoran dos cosas: un lápiz óptico altamente receptivo y preciso y un gran lienzo para desarrollar sus ideas. Con la aparición de dispositivos versátiles como el Pixelbook Pen y los teléfonos inteligentes plegables, el equipo vio la oportunidad de llegar a más creadores mediante la creación de UX de Concepts para pantallas más grandes y diferentes factores de forma. Con algunos consejos y prácticas recomendadas de Google, los desarrolladores de TopHatch se pusieron a trabajar en la creación de la aplicación Concepts para experiencias inmersivas en Chrome OS y dispositivos Android.

![Interacción de pantalla con lápiz óptico.](ix://stories/concepts/concepts-1.1500.png)

## Que hicieron

### ![](ix://icons/memory.png) {.icon--rounded} Gráficos de alto rendimiento

La primera prioridad del equipo era garantizar que Chrome OS pudiera admitir el diseño nítido y el rendimiento continuo de Concepts en todos los dispositivos. Concepts ejecuta código de GPU de bajo nivel altamente optimizado. Debido a que Android tiene tantos dispositivos diferentes en el mercado, TopHatch estaba preocupado por garantizar un rendimiento rápido en cada controlador. Después de evaluar las capacidades de Chrome OS con los ingenieros de Google, TopHatch descubrió que los gráficos del sistema operativo eran consistentes y compatibles en todos los dispositivos. Eso significaba que crear la aplicación para obtener el máximo rendimiento en cada controlador de GPU era mucho más fácil de lo esperado. El equipo finalmente terminó con cinco variaciones de su motor de renderizado, lo que permite que Concepts funcione maravillosamente en alrededor de 2.500 dispositivos después de establecer Android 7 y OpenGL ES 3.1 como requisitos mínimos. Después de crear Conceptos para Chrome OS, TopHatch fue un paso más allá y adaptó la aplicación para dispositivos plegables. Debido a que Chrome OS ya es totalmente compatible con el cambio de tamaño dinámico de la pantalla, el equipo pudo completar las optimizaciones en solo medio día.

@ [youtube](https://www.youtube.com/watch?v=QtckOSCYW5w)

### ![](ix://icons/keyboard.png) {.icon--rounded} Soporte de teclado y lápiz óptico de baja latencia

La interacción del lápiz óptico suave y rápida es el corazón de la experiencia de Concepts. Los diseñadores digitales quieren sentir que la tinta fluye del lápiz óptico como un bolígrafo real. Con ese fin, el siguiente objetivo de TopHatch era asegurarse de que la demora desde la recepción de la entrada táctil hasta la representación de los trazos en la pantalla fuera lo más mínima posible.

TopHatch sabía que entre todas las capas de software entre Android y Chrome OS, había un alto potencial de retraso y efectos secundarios de "desgarro", donde los trazos podían dibujarse parcial o incorrectamente en la pantalla. El equipo encontró su solución a través de la representación del búfer frontal. Habilitado por la seguridad y la simplicidad de Chrome OS, la representación del búfer frontal ayudó a evadir las capas de software en el proceso de dibujo para permitir que los píxeles se copiaran la cantidad mínima absoluta de veces. Esto redujo significativamente el potencial de demoras cuando se detectó la entrada del lápiz, asegurando que Concepts se sentiría lo más parecido posible a dibujar con un lápiz y papel reales. TopHatch también decidió implementar un soporte de teclado intuitivo para la navegación de proyectos y las pantallas de la barra de herramientas de Concepts. De esa manera, los diseñadores pueden administrar, renombrar, ver y compartir sus proyectos más fácilmente cuando no están dibujando activamente en la aplicación.

## Resultados

> La creación de la aplicación para Chrome OS nos ayudó a llegar a un público altamente comprometido y a un gran mercado de Android. Sabíamos que el diseño para pantallas más grandes desbloquearía el acceso a una creciente base de usuarios, y como resultado ya hemos recibido comentarios increíbles.

David Brittain, cofundador y CEO de TopHatch {.cite}

La respuesta temprana de los diseñadores a Concepts en Chrome OS ha sido estelar. El usuario promedio de Concepts pasa 12 veces más tiempo en Chromebooks y 20 veces más tiempo en Google Pixelbook y Pixel Slate en comparación con otros dispositivos. TopHatch también ha visto a los usuarios de Chromebook convertirse en usuarios de pago a una proporción doble en Pixelbook y a una proporción de 4 veces en Slate en comparación con otros dispositivos. "La creación de la aplicación para Chrome OS nos ayudó a llegar a un público altamente comprometido y a un gran mercado de Android", dijo David Brittain, cofundador y CEO de TopHatch. "Sabíamos que el diseño para pantallas más grandes desbloquearía el acceso a una creciente base de usuarios, y como resultado ya hemos recibido comentarios increíbles". TopHatch se esfuerza por apoyar a sus usuarios con actualizaciones mensuales, y recientemente lanzó una función de importación de imágenes muy solicitada donde los diseñadores pueden dibujar y marcar sus propias fotos. El equipo espera trabajar con creadores en Chrome OS y Android y permitir estilos de vida creativos potentes y móviles para diseñadores de todas las tendencias.

## Empezar

Aprenda como [optimizar su aplicación para Chrome OS](/{{locale.code}}/android/optimizing) de la mejor manera.
