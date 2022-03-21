---
title: Expanda su aplicación más allá del móvil para llegar a los usuarios de Android en pantallas grandes
metadesc: Cree aplicaciones de Android para dispositivos que no sean móviles para llegar a más usuarios.
tags:
  - rincón del líder
  - tendencia
  - pantallas grandes
  - android
authors:
  - ssamat
hero:
  image: ix://posts/expand-your-app-beyond-mobile-to-reach-android-users-at-large/hero.png
  alt: Banner genérico de Android
  position: bottom
date: 2019-09-05
---

_Este artículo apareció originalmente en el Blog de desarrolladores de Android._

Desde el primer día, diseñamos Android para que sea una plataforma flexible y adaptativa.

La mayoría de las personas cuando piensan en Android imaginan un teléfono inteligente. Sin embargo Android también es el cerebro de un gran número de dispositivos con pantallas grandes. De hecho, existen más de **175 milliones** de tabletas Android con Google Play,[^1] estoy hace que las tablates Android sean un factor de forma vital para Google y nuestros socios OEM (fabricantes originales de equipos por sus siglas en inglés) hoy en día. Las aplicaciones de Android también corren en [Chrome OS laptops](/{{locale.code}}/posts/chromeos-io-19), y el número de usuarios activos mensualmente que habilitaron las aplicaciones de Android creció un 250% solamente el año pasado.[^2]

[^1]: la cantidad de tabletas solo representa los dispositivos que tienen Google Play Store instalado (por ejemplo, esto excluye las tabletas en China); El número real de tabletas capaces de ejecutar aplicaciones de Android es mucho mayor.
[^2]: Datos internos de Google, marzo de 2018 a marzo de 2019.

Aquí en Google, estamos entusiasmados de ver cómo puede aprovechar los formatos de pantalla grande, incluido el nuevo [Galaxy Tab S6 de](https://www.samsung.com/us/mobile/tablets/tab-s6/) Samsung, el próximo Lenovo ™ Smart Tab M8 con Google Assistant, el próximo Samsung Galaxy Fold y otros dispositivos que lanzarán este semana en [IFA](https://b2b.ifa-berlin.com/) . Nuestros socios OEM están creando experiencias que ayudan a los usuarios todos los días:

> A medida que los consumidores exijan una innovación más significativa, continuaremos trabajando estrechamente con los desarrolladores de Google y Android para crear experiencias móviles sin interrupciones que inspiren creatividad, aumenten la productividad y se mantengan al día con los estilos de vida ocupados de nuestros usuarios. Al mejorar las herramientas multitarea, como nuestra firma S Pen y Samsung DeX en el Galaxy Tab S6, ofrecemos a los usuarios una experiencia de pantalla grande más avanzada.

Woncheol Chai, Vicepresidente Senior y Jefe del Equipo de Estrategia de Producto, Negocio de Comunicaciones Móviles, Samsung Electronics {.cite}

> Como parte de nuestra misión de habilitar una tecnología más inteligente para todos, Lenovo ha estado innovando una amplia gama de tabletas Android durante la última década para diferentes necesidades y presupuestos de los usuarios en función de los conocimientos de los clientes. Estamos comprometidos con la categoría de tabletas de consumo y estamos entusiasmados de ofrecer tabletas más inteligentes y potentes en diseños aún más delgados y livianos para más personas.

Tony Chen, vicepresidente y gerente general de dispositivos Android, grupo de dispositivos inteligentes, Lenovo {.cite}

Desde el principio, Android fue diseñado como una plataforma que podía manejar múltiples tamaños de pantalla. A lo largo de los años, hemos seguido agregando funcionalidad para que los desarrolladores se adapten a nuevos dispositivos y factores de forma.

- Comenzamos con un **teléfono** . Los desarrolladores podrían escribir aplicaciones de Android que funcionarían en teléfonos de todos los tamaños, en todo el mundo. Parte de lo que hizo que esto funcionara fue el sistema de recursos y diseño de Android, que permitió a las aplicaciones adaptarse sin problemas a diferentes tamaños de pantalla.
- En Android 3.0 Honeycomb, agregamos soporte para **tabletas** . En particular, capacidades como `Fragment` permiten crear aplicaciones que funcionan en factores de forma muy diferentes.
- Android 7 Nougat trajo capacidades de ventanas múltiples y pantallas múltiples, incluida la capacidad de arrastrar y soltar entre aplicaciones. Mientras tanto, Chrome OS agregó la [capacidad](/{{locale.code}}/android) de ejecutar aplicaciones de Android en **computadoras portátiles** . Con algunos ajustes para manejar diferentes entradas y dinámicas de ventanas, ahora puede llegar a los usuarios de la aplicación en un entorno de escritorio.

#[El sistema de diseño de Android ayuda a las aplicaciones a cambiar el tamaño y ajustar su diseño de manera interactiva.](ix://posts/expand-your-app-beyond-mobile-to-reach-android-users-at-large/free-form-resizing.gif)

- Ahora, en [Android 10](https://developer.android.com/about/versions/10) , hemos realizado aún más mejoras para el desarrollo en pantallas grandes. Hemos mejorado las capacidades de múltiples ventanas, lo que facilita el uso de múltiples aplicaciones en paralelo. También continuamos mejorando el soporte de pantallas múltiples, permitiendo más casos de uso de monitores múltiples. Y le facilitamos experimentar y probar nuevos factores de forma al agregar un emulador dedicado para **plegables** y al publicar una [guía de plegables](https://developer.android.com/guide/topics/ui/foldables) .

Al optimizar su aplicación para aprovechar diferentes factores de forma, los desarrolladores tienen la oportunidad de ofrecer experiencias más ricas y atractivas a millones de usuarios en pantallas más grandes. Y si no tiene acceso a dispositivos físicos, el emulador de Android admite todos los factores de forma mencionados anteriormente, desde [Chrome OS hasta teléfonos y tabletas](https://developer.android.com/studio/run/emulator?hl={{locale.code}}).

Los desarrolladores de aplicaciones como [Mint](https://developer.android.com/stories/apps/intuit-mint) , [Evernote](/{{locale.code}}/stories/evernote) y [Asphalt](/{{locale.code}}/stories/asphalt-8) son solo algunos que han tenido éxito al llevar su APK existente a pantallas más grandes.

> En Gameloft, queremos extender la diversión de los jugadores a través de plataformas dándoles más formas de experimentar nuestros juegos. Así que siempre prosperamos para ser uno de los primeros desarrolladores en lanzar juegos optimizados para todas las plataformas de Google.

Damien Marchi, vicepresidente de marketing de Gameloft {.cite}

Para obtener más información sobre cómo optimizar sus aplicaciones de Android para experiencias más ricas en [tabletas](https://developer.android.com/docs/quality-guidelines/tablet-app-quality) , [computadoras portátiles Chrome OS](/{{locale.code}}/android/optimizing) , [plegables](https://developer.android.com/guide/topics/ui/foldables) y más, únase a nosotros en la [Cumbre de desarrolladores de Android](https://developer.android.com/dev-summit) del 23 al 24 de octubre, ya sea en persona o en [vivo](https://www.youtube.com/watch?time_continue=4&v=Hx3aTcv2KlE) , o vea nuestros videos de recapitulación en Youtube.
