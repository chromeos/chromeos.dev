---
title: VLC optimiza su aplicación de Android para experiencias de video inmersivas en pantallas más grandes
metadesc: Al aprovechar Kotlin, un desarrollador líder pudo optimizar su aplicación de Android para Chrome OS y Android TV en solo dos meses, deleitando a sus usuarios.
date: 2019-10-11
app:
  name: VLC
  logo: ix://stories/vlc/vlc-icon.240.png
  company: VideoLAN
tags:
  - video y medios
  - pantallas grandes
  - soporte para mouse
  - soporte para teclado
  - dispositivos de entrada
  - kotlin
---

[VLC](https://www.videolan.org/vlc/index.html) es un reproductor multimedia multiplataforma gratuito y de código abierto desarrollado por el [proyecto VideoLAN.](https://www.videolan.org/) La compatibilidad perfecta con todos los archivos y pantallas es el corazón del diseño de VLC. VLC puede reproducir la mayoría de los archivos locales de video y audio, así como varios protocolos de transmisión, y una gran cantidad de aplicaciones de terceros utilizan el motor VLC para manejar la reproducción de video. En última instancia, los desarrolladores de VideoLAN quieren que los usuarios puedan reproducir todo, en cualquier lugar, sin importar qué dispositivo o tamaño de pantalla prefieran.

El equipo diseñó originalmente la [aplicación VLC](https://play.google.com/store/apps/details?id=org.videolan.vlc) para Android, y no pasó mucho tiempo antes de que los usuarios comenzaran a solicitar la misma experiencia en Chromebooks. Fue entonces cuando VideoLAN vio la oportunidad de ofrecer a los usuarios una experiencia de estilo de escritorio al llevar VLC al sistema operativo Chrome.

Al optimizar la aplicación de Android para Chrome OS y pantallas más grandes, además de admitir ARM x86 y 64 bits desde el principio, VideoLAN garantizó que los usuarios de VLC pudieran disfrutar de la misma experiencia inmersiva en una variedad de dispositivos y factores de forma diferentes.

## Que hicieron

El equipo comenzó señalando qué características preferían los usuarios de VLC en el escritorio, como la entrada del mouse, los menús del botón derecho y asegurarse de que el almacenamiento externo (es decir, los discos duros y las unidades de memoria USB) funcionaba correctamente. A partir de ahí, comenzaron a ajustar el diseño y la funcionalidad de la aplicación para garantizar que los usuarios puedan disfrutar de esas mismas funciones en un entorno similar al de un escritorio.

### ![](ix://icons/keyboard.png) {.icon--rounded} Soporte para teclado y mouse

Una de las optimizaciones más importantes del equipo fue admitir la entrada de teclado y mouse. Los teclados compatibles permitían a las personas usar accesos directos y botones de dirección para navegar fácilmente por la aplicación, mientras que la entrada del mouse permitía comandos de clic derecho y arrastrar y soltar archivos hacia y desde el reproductor VLC.

### ![](ix://icons/aspect_ratio.png) {.icon--rounded} Redimensionamiento dinámico

VideoLAN diseñó varias versiones del diseño para permitir a los usuarios escalar y cambiar el tamaño de la aplicación fácilmente. Debido a que el equipo ya había diseñado el diseño de VLC para tabletas, acomodar diseños más grandes y anchos fue un proceso bastante simple. También modificaron la configuración de audio del reproductor para aprovechar el espacio adicional disponible en pantallas más grandes.

Anteriormente, el equipo necesitaba usar emuladores individuales o dispositivos separados para probar cada diseño. Pero, con el soporte de Android para Chrome OS, el equipo pudo probar el diseño de la interfaz de usuario para computadoras de escritorio, tabletas y dispositivos móviles de una sola vez, en el mismo dispositivo y sin tener que usar un emulador. Esto aceleró sustancialmente el diseño y los tiempos de prueba.

Y ahora con [Linux en Chrome OS](/{{locale.code}}/linux) , los desarrolladores pueden usar Android Studio para crear y probar aplicaciones de Android de forma nativa, lo que hace que los dispositivos Chromebook estén listos para el desarrollo.

![Imagen que muestra varias versiones de diseño, ejemplos de cambio de tamaño dinámico en dispositivos móviles, tabletas y computadoras portátiles.](ix://stories/vlc/vlc-1.1500.png)

### ![](ix://icons/code.png) {.icon--redondeado} Escribiendo código en Kotlin

Lo mejor de todo es que el equipo hizo todo el trabajo en [Kotlin](https://developer.android.com/kotlin) , un poderoso lenguaje de programación que los ayudó a mejorar la productividad al escribir en un código más seguro y conciso. Al reducir la base de código de la aplicación, pudieron pasar menos tiempo resolviendo problemas y más tiempo optimizando el diseño y la funcionalidad de la aplicación.

"Por lo general, somos reacios a reestructurar o reescribir nuestro código principalmente porque corremos el riesgo de perder la funcionalidad", dijo Geoffrey Métais, desarrollador líder de Android de VideoLAN. "Nos complació encontrar que la transición de Java a Kotlin fue realmente fluida, gracias a la herramienta de migración integrada de Android Studio, y el [framework de co-rutinas](https://developer.android.com/kotlin/coroutines) de Kotlin nos ayudó a mejorar el rendimiento".

## Resultados

> La optimización para Chromebooks nos ha ayudado a extender nuestra aplicación a una gran cantidad de dispositivos y factores de forma, y está claro que acertamos en función de los comentarios de los usuarios de todo el mundo.

Jean-Baptiste Kempf, presidente de VideoLAN {.cite}

VideoLAN usó el mismo APK para dispositivos móviles, Chrome OS y Android TV, por lo que al desarrollador principal solo le tomó dos meses optimizar la aplicación para cada plataforma. Los usuarios habían estado pidiendo soporte VLC en Chrome OS durante meses, especialmente para la reproducción de DVD, y el equipo ha recibido comentarios abrumadoramente positivos hasta ahora. Además, la última versión de Chrome OS es totalmente compatible con el almacenamiento externo, por lo que ahora todos los usuarios de Android disfrutan del mismo beneficio.

"Nuestro equipo siempre está buscando nuevas oportunidades para generar el mayor impacto para nuestros usuarios", dijo el presidente de VideoLAN, Jean-Baptiste Kempf. "La optimización para Chromebooks nos ha ayudado a extender nuestra aplicación a una gran cantidad de dispositivos y factores de forma, y está claro que acertamos en función de los comentarios de los usuarios de todo el mundo".

## Empezar

Consulte algunas de las mejores prácticas para [optimizar sus aplicaciones para Chrome OS](/{{locale.code}}/android/optimizing) .
