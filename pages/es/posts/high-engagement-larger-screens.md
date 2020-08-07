---
title: Alta interacción, pantallas más grandes
metadesc: Android alimenta las aplicaciones móviles en dispositivos que van mucho más allá de su típico teléfono inteligente de pantalla pequeña.
tags:
  - tendencia
  - pantallas grandes
  - gestión de ventanas
  - soporte para mouse
  - soporte de teclado
  - android
  - optimización
authors:
  - allanl
date: 2019-10-24
---

_Este artículo apareció originalmente en el Blog de desarrolladores de Android._

Android alimenta las aplicaciones móviles en dispositivos que van mucho más allá de su típico teléfono inteligente de pantalla pequeña, desde nuevos Chromebooks como el ligero y de alto rendimiento [Google Pixelbook Go](https://store.google.com/us/product/pixelbook_go) hasta dispositivos de pantallas múltiples y teléfonos plegables como el [Samsung Galaxy Fold](https://www.samsung.com/us/mobile/galaxy-fold/) . Sin mencionar las [más de 175 millones de tabletas Android](/{{locale.code}}/posts/expand-your-app-beyond-mobile-to-reach-android-users-at-large) que tienen instalada la tienda Google Play. [^ 1]

[^ 1]: la cantidad de tabletas solo representa los dispositivos que tienen Google Play Store instalado (por ejemplo, excluyendo tabletas en China); El número real de tabletas capaces de ejecutar aplicaciones de Android es mucho mayor.

Estos dispositivos de pantalla grande preparan el escenario para experiencias más atractivas y visualmente inmersivas, ya sea [creando un lienzo más grande para la creatividad](/{{locale.code}}/stories/concepts) o brindando a los usuarios [formas más rápidas y flexibles de trabajar](/{{locale.code}}/stories/infinite-painter) . A medida que continuamos dando prioridad a los dispositivos de pantalla grande con socios OEM (fabricantes originales de equipos por sus siglas en inglés), como Samsung, Asus y Lenovo, hemos podido ampliar nuestro alcance a una nueva audiencia enorme de usuarios.

Durante la semana de Viernes Negro en 2018, 1 en 3 computadoras notebooks vendido en U.S. fueron Chromebooks.[^2] Chromebook las unidades de ventas de Chromebooks aumentaron 22% YoY, mientras el resto de la categoría de notebooks disminuyó -6.1%.[^3] Y no solamente estamos alcanzado más usuarios — estamos alcanzo más usuarios _comprometidos_ . De hecho, solamenete en el último año, el total de tiempo que los usuarion usan aplicaciones Android en Chrome OS creció 4X.[^4]

[^ 2]: The NPD Group, Inc., Servicio de seguimiento minorista, EE. UU., Computadoras portátiles, Chrome OS, basado en unidades, 18 de noviembre de 2018 a noviembre. 24, 2018 vs.19 de noviembre de 2017 – nov. 25, 2017. [^ 3]: The NPD Group, Inc., Servicio de seguimiento minorista de EE. UU., Computadoras portátiles, basadas en unidades, septiembre de 2018 a agosto. 2019. Las ventas se ajustan por 5 semanas en enero de 2018 frente a 4 semanas en enero de 2019. [^ 4]: Datos internos de Google, marzo de 2018 – marzo de 2019.

![Ventas anuales de portátiles en los EE. UU.](/images/posts/high-engagement-larger-screens-how/yoy-notebook-sales.gif)

Al hacer ajustes para pantallas más grandes, puede proporcionar experiencias más ricas en todos estos dispositivos y aprovechar una audiencia más amplia de usuarios de aplicaciones. Los equipos de desarrollo en todo el mundo, incluidos Adobe Lightroom, [Evernote](/{{locale.code}}/stories/evernote) y [Gameloft](/{{locale.code}}/stories/asphalt-8) , entre muchos otros, ya han visto algunos resultados increíbles:

## Desarrolladores de aplicaciones que impulsan el compromiso en pantallas más grandes

Con el objetivo de permitir a los usuarios reproducir cualquier archivo de video, en cualquier lugar, en cualquier dispositivo o tamaño de pantalla, los desarrolladores del proyecto VideoLAN [decidieron adaptar VLC](/{{locale.code}}/stories/vlc) , un reproductor multimedia multiplataforma de código abierto, para todas las pantallas. El equipo comenzó agregando soporte para teclado y mouse antes de diseñar varias versiones del diseño para permitir a los usuarios escalar y cambiar el tamaño de la aplicación fácilmente.

Los usuarios ahora pueden disfrutar de la misma experiencia inmersiva en una variedad de diferentes dispositivos y distintos tamaños, y VideoLAN ya ha recibido comentarios abrumadoramente positivos de los usuarios de todo el mundo.

[War Robots](/{{locale.code}}/stories/war-robots) , un juego de batalla en tiempo real para 12 jugadores desarrollado por Pixonic, fue diseñado originalmente para teléfonos de primera generación. El equipo habilitó el juego en ventana para que los usuarios pudieran jugar en una ventana mientras miraban sus transmisores favoritos o actualizaban sus robots en otra, crearon nuevos tutoriales y controles que aparecen cada vez que los jugadores cambian entre el modo de escritorio y tableta, y agregaron soporte para la entrada de teclado y mouse.

Más de 100,000 jugadores ya han jugado War Robots en Chrome OS desde que Pixonic lanzó las últimas optimizaciones, lo que hizo que las batallas de War Robots fueran aún más emocionantes e interesantes en pantallas más grandes, y Pixonic ha visto un 25% más de sesiones de usuario en Chromebooks como resultado.

## ¿Está su aplicación optimizada para dispositivos de pantalla grande? Aquí hay algunas cosas para considerar

### 1) Modo portátil y tableta

Pruebe las funciones principales de su aplicación para asegurarse de que todo funcione sin problemas y sin bloquearse a medida que los usuarios cambian entre los diferentes modos.

### 2) Gestión y diseño de ventanas

Admite el modo de múltiples ventanas y el cambio de tamaño de la ventana de forma libre, y asegúrate de diseñar diseños optimizados para las orientaciones horizontal y vertical. Configure su aplicación para manejar correctamente los cambios de configuración para evitar bloqueos cuando las personas rotan sus dispositivos.

![Conjunto de dispositivos](/images/posts/high-engagement-larger-screens-how/suite-of-devices.png)

### 3) Entrada de teclado y mouse

Asegúrese de que su aplicación sea completamente funcional sin entrada táctil y agregue soporte para teclados, ratones y controladores de juegos (si corresponde).

### 4) soporte de hardware

Si está utilizando NDK, asegúrese de admitir ABI x86 (32 y 64 bits) para garantizar el mayor rendimiento posible.

## Compila, prueba y ejecuta aplicaciones de Android en una Chromebook

Desde el principio, nuestro objetivo ha sido hacer del Chromebook un entorno simple, seguro y rápido para todos. El lanzamiento de [Linux (Beta) en Chrome OS](/{{locale.code}}/linux) permitió a los desarrolladores de Android crear y probar aplicaciones con un Chromebook. Y a principios de este año en I/O, anunciamos que [Android Studio 3.5 ahora es totalmente compatible con Chrome OS](/{{locale.code}}/posts/chromeos-io-19) con una instalación simple con un solo clic.

Desde entonces, hemos estado trabajando en algunas mejoras que hacen de los Chromebook un lugar aún mejor para el desarrollo seguro y sin problemas de aplicaciones de Android. Comencemos con el más grande:

### Implementar una aplicación directamente en Chrome OS para permitir el desarrollo completo de Android

En el pasado, solo podía probar sus aplicaciones al implementarlas en teléfonos Android. Con la próxima versión M80 de Chrome OS, podrá implementar aplicaciones de Android directamente en su Chromebook. De esa manera, puede desarrollar y probar su aplicación en la misma máquina, todo sin un dispositivo conectado o sin necesidad de poner su computadora portátil en modo desarrollador. Los desarrolladores pueden comenzar a probar esta función en el canal de desarrolladores en noviembre.

### Aceleración de GPU para una IU más ágil y libre de distorción (ahora en el canal beta)

Hemos habilitado el soporte de GPU para reducir la latencia y ofrecer una interfaz de usuario más ágil. Eso va para aplicaciones de desarrollador como Android Studio, Unity Editor o Visual Studio Code. Y para los desarrolladores que también trabajan en aplicaciones web, la aceleración de GPU significa pruebas más rápidas con Chrome Canary o Firefox.

### Contenedor de copia de seguridad y restauración para moverse fácilmente entre dispositivos

Anteriormente, los archivos y aplicaciones de Linux estaban vinculados por completo al dispositivo; si perdía su dispositivo, perdía todo el trabajo dentro de él. Ahora, la arquitectura basada en contenedores de Chrome OS le permite empaquetar todo su espacio de trabajo y exportarlo a almacenamiento externo o Drive. El archivo de copia de seguridad se puede restaurar en cualquier momento, ya sea en la misma máquina, lo que es útil para volver a un estado anterior, o para pasar a otro Chromebook.

Ahora puede encontrar botones de importación y exportación en su configuración de Linux.

### Soporte de imagen en imagen (PiP)

Si ha incorporado compatibilidad PIP en sus aplicaciones de Android, verá que esa función funciona a la perfección en Chrome OS en 2020. Pero puede comenzar a probar esta característica ahora habilitando PiP en la configuración de Android → Opciones de desarrollador.

## Crea tus aplicaciones con pantallas más grandes en mente

Con millones de usuarios en Chromebooks, tabletas, dispositivos plegables y ahora dispositivos de pantallas múltiples, es crucial diseñar experiencias de aplicaciones con pantallas más grandes. Aproveche esta oportunidad para atraer a más usuarios mediante la optimización de sus aplicaciones existentes para que funcionen muy bien en todas las pantallas. Y las últimas funciones de Linux en Chrome OS le dan el poder de usar una sola máquina para construir y ejecutar aplicaciones de Android. No dude en tomar medidas para garantizar que sus aplicaciones funcionen sin problemas en pantallas más grandes con Linux en Chrome OS.
