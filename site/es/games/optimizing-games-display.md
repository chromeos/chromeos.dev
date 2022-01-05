---
title: Optimizar el tamaño de la pantalla
metadesc: Explica cómo determinar la resolución de visualización para el renderizado.
date: 2020-06-16
weight: -6
---

En la herramienta de configuración de Chrome OS, los usuarios pueden cambiar la configuración de pantalla. Para pantallas integradas, generalmente no es posible ajustar la resolución de salida. En cambio, el usuario ajusta el tamaño relativo de los elementos en la pantalla utilizando el control deslizante "Tamaño de pantalla". El valor que se muestra en "Parece" está en [píxeles independientes del dispositivo](https://en.wikipedia.org/wiki/Device-independent_pixel) y no en valores de píxeles sin formato.

![Control para "tamaño de pantalla" en la configuración](ix://games/optimizing-games-display/display-size-slider.jpg)

Para pantallas externas, los usuarios tendrán más opciones, normalmente podrán ajustar tanto la resolución de salida como el tamaño de los elementos en la pantalla.

![Opciones de configuración de pantalla externa](ix://games/optimizing-games-display/external-display-settings.jpg)

Lo que es importante recordar como desarrollador de juegos cuando se trabaja con el motor de renderizado es que los valores devueltos por las API de Android, como [`getSupportedModes()`](<https://developer.android.com/reference/android/view/Display#getSupportedModes()>) y [`getRealMetrics()`](<https://developer.android.com/reference/android/view/Display#getRealMetrics(android.util.DisplayMetrics)>) estarán en valores de píxeles sin procesar y no en píxeles independientes del dispositivo.

Por ejemplo, un dispositivo con una pantalla incorporada con una resolución bruta de 1920x1080 puede mostrar 1536x864 en la herramienta de configuración de Chrome OS si la pantalla del dispositivo tiene una densidad de 160dp. Esto se espera. Si el "Tamaño de pantalla" se establece en la configuración predeterminada, esta diferencia en los números de píxeles no significa que algunos de los píxeles generados por una representación del juego a 1920x1080 se perderán de alguna manera; es simplemente una forma diferente de mostrar la misma información con densidad tomada en cuenta.

Si un usuario tiene la configuración de "Tamaño de pantalla" más alta que la resolución del panel real del dispositivo, es posible que la API de Android devuelva una resolución aparente más alta que la que realmente se puede mostrar en la pantalla, lo que resulta en un rendimiento más bajo. Para los juegos, se recomienda que los usuarios establezcan su "Tamaño de pantalla" en la configuración predeterminada para un rendimiento máximo.

## Rendimiento

Es probable que los juegos produzcan muchos más píxeles en dispositivos con Chrome OS que en teléfonos. Si el rendimiento no es adecuado, considere una de las siguientes soluciones:

- Tener un límite de resolución de juego predeterminado, quizás 1024 de ancho o 1/2 de resolución devuelta por la API de Android, lo que sea más alto, con una configuración que permita al usuario aumentar o disminuir la resolución en el juego.
- Considere ajustar la velocidad de fotogramas: tener una configuración configurable de 30 fps / 60 fps y / o heurística dinámica en el juego que ajuste la velocidad de fotogramas en función del rendimiento real actual.
- Consulte el [perfil de rendimiento](/{{locale.code}}/games/optimizing-games-profiling) para obtener más consejos.
