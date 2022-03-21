---
title: ¿Por qué su aplicación debe optimizarse para pantallas de todos los tamaños?
metadesc: Vea cómo Gameloft, Evernote, Slack y 1Password se han optimizado para Chrome OS.
tags:
  - android
  - tendencia
  - historia exitosa
  - pantallas grandes
  - modo de dispositivo
  - gestión de ventanas
  - soporte de teclado
  - soporte para mouse
  - soporte para stylus
  - soporte de trackpad
  - juegos
  - productividad
authors:
  - nataliagvak
hero:
  image: ix://posts/why-your-app-should-be-optimized-for-screens-of-all-sizes/hero.png
  alt: Ilustración de la computadora portátil con iconos de juegos y productividad.
date: 2018-10-29
---

_Este artículo apareció originalmente en Google Play Medium._

Desde que lanzamos nuestros primeros Chromebooks en 2011, el crecimiento de Chrome OS ha sido increíble. Hoy en día, los Chromebooks van desde computadoras portátiles tradicionales hasta convertibles y tabletas que están disponibles en más de 10,000 tiendas, gracias a las alianzas cercanas con los principales OEM, incluidos Samsung, Dell y HP, entre muchos otros, y solo vamos a seguir expandiéndonos. Ha sido un período de crecimiento emocionante para nosotros, pero aún más para los desarrolladores.

La evolución del sistema operativo Chrome presenta una oportunidad increíble para que los desarrolladores aumenten su alcance en una variedad más amplia de dispositivos y pantallas. Al optimizar sus aplicaciones para pantallas más anchas en Chrome OS, los equipos de desarrollo pueden generar un mayor compromiso y llegar a más usuarios con experiencias inmersivas.

## Aprovechando un atractivo más amplio para pantallas más anchas

Gran parte de nuestro crecimiento ha sido impulsado por nuevas formas en que las personas consumen y se relacionan con el contenido. Muchas personas usan más de un tipo de dispositivo todos los días, y las líneas entre las experiencias de escritorio y móviles se vuelven más borrosas. Hoy, los consumidores demandan versatilidad. Estamos viendo que las personas cambian su enfoque a dispositivos con pantallas más grandes y anchas que les permiten acceder fácilmente al contenido que desean, en cualquier lugar y en cualquier momento.

El año pasado, agregamos nuestro Chromebook cuatro en uno de alto rendimiento, [Google Pixelbook](https://store.google.com/us/product/google_pixelbook) , a la familia Chrome OS. Este octubre, presentamos la primera tableta premium hecha por Google para ejecutar Chrome OS: [Google Pixel Slate](https://store.google.com/us/product/pixel_slate?hl=en-US) . Junto con una pantalla rica y un rendimiento ideal para usar aplicaciones móviles, Pixel Slate también viene con un teclado extraíble que brinda a los usuarios una sensación familiar de computadora portátil.

![Dispositivo Pixel Slate en sus diferentes configuraciones con y sin el teclado desmontable](ix://posts/why-your-app-should-be-optimized-for-screens-of-all-sizes/pixel-slate.jpg)

Al igual que otros dispositivos con Chrome OS, ambos dispositivos combinan el acceso a millones de aplicaciones móviles con una pantalla brillante de pantalla grande. Los desarrolladores pueden llegar incluso a más usuarios [adaptando sus aplicaciones para Chrome OS](/{{locale.code}}/android/optimizing) de diferentes maneras:

1. Optimización de diseños para pantallas más anchas.
2. Modo horizontal
3. Gestión de ventanas múltiples
4. Entrada de teclado, mouse y lápiz

## Cómo los principales equipos de desarrollo se han optimizado para Chrome OS

### Gameloft's Asphalt 8: Airborne

Asphalt 8: Airborne es un juego de carreras que trata sobre la velocidad extrema y el control completo. El equipo de diseño de Gameloft siempre quiere que sus juegos estén disponibles en el último hardware portátil, por lo que tan pronto como el Chromebook salió al mercado, el equipo vio un nuevo hogar para su serie Asphalt.

Dado que Chrome OS considera el teclado físico de la misma manera que un teclado externo en un teléfono Android, Asphalt 8: Airborne fue capaz de proveer [ soporte para controles de teclado usando APIs](/{{locale.code}}/android/input-compatibility) de la [Plataforma de Android SDK 26](https://developer.android.com/studio/releases/platform-tools?hl={{locale.code}}). Esto también le permitió a la interfaz de usuario cambiar entre modo the teclado y modo táctil. Después de implementar los ajustes Gameloft logró correr paquetes de aplicación de Android con un rendimiento aun mayor que aplicaciones nativas, esto le permitió mantener gráficos que roban el aliento así como increíbles velocidades en Chrome OS. Aun mejor solamente le tomó a los desarrolladores de Gameloft’s unos pocos días incorporar los nuevos esquemas de control en el juego.

Después de las optimizaciones, Asphalt 8 experimentó un aumento de 6X en los usuarios activos diarios y un aumento de 9X en los ingresos de los usuarios de Chrome. Ahora, diseñar para pantallas más grandes es una regla general en Gameloft: la última edición de la serie, Asphalt 9: Legends, ya está [disponible en el Chromebook](https://play.google.com/store/apps/details?id=com.gameloft.android.ANMP.GloftA9HM&hl=en_US) .

### Evernote y Slack

Una de las funcionalidades principales de [Evernote’s](/{{locale.code}}/stories/evernote) es la traducción de escritura a mano alzada a texto, la cual los usuarios tienden a usar más frecuentemente en dispositivos con pantallas más grandes. Para hacer la aplicación aún más fácil de utilizar a través de distintos dispositivos y plataformas, el equipo de desarrollo de Evernote utilizó el API de baja lantencia para stylus para implementar escritura de mano alzada en pantallas táctiles y mejorar el diseño para pantallas más grandes. El API permite a las aplicaciones sobre escribir partes del OS y dibujar directamente en el visor, de esta manera los usuarios de Evernote sienten que están dibujando y escribiendo en papel.

Gracias a su nueva experiencia con Chrome OS, el usuario promedio de Evernote pasa 3 veces más tiempo en dispositivos de pantalla más grande y 4 veces más cuando usa Google Pixelbook.

Mientras tanto, el equipo de desarrollo de Slack optimizó su popular aplicación de mensajería para Chrome OS al configurar atajos de teclado para sus funciones más utilizadas. Cuando los usuarios escriben un mensaje en un Chromebook, simplemente pueden presionar la tecla [[enter]], tal como lo harían en los dispositivos móviles, en lugar de dar el paso adicional de hacer clic en "Enviar" con el mouse.

@ [youtube](https://www.youtube.com/watch?v=YlQVNyTDI6Y)

### 1 Contraseña

1Password colaboró con el equipo de Chrome OS team para mejorar drásticamente la experiencia de usuario en solo seis semanas. Para asegurarse que la aplicación hiciera el mejor uso de [el espacio en la pantalla en cualquier orientación y de cualquier tamaño](/{{locale.code}}/android/window-management), el equipo de desarrollo combinó sus diseños existentes para teléfonos y tabletas para presentar un diseño flexible cuando los usuarios cambian el tamaño de la ventana de la aplicación. El equipo también utilizó la funcionalidad de arrartrar y colocar de Chrome OS para que los usuarios de la aplicación pudieran arrastrar contenido fácilmente entre 1Password y otras aplicaciones de Android en Chrome OS.

![1Password en diferentes configuraciones en diferentes modos de dispositivo](ix://posts/why-your-app-should-be-optimized-for-screens-of-all-sizes/1password.jpg)

Finalmente, el equipo mejoró la compatibilidad con la entrada de teclado y panel táctil para que las personas puedan navegar por la aplicación sin quitar las manos del teclado. Esto creó una experiencia más similar a la de un escritorio en dispositivos móviles, permitiendo a los usuarios usar las teclas de dirección y los atajos de teclado para activar acciones. Desde la implementación de estas nuevas mejoras, 1Password ha visto más del 22.6% más de instalaciones en dispositivos Chrome OS.

## Ofrezca la experiencia que exigen los usuarios de su aplicación

En un mundo donde los consumidores exigen cada vez más versatilidad, es importante que los desarrolladores amplíen sus estrategias más allá de los dispositivos móviles y presten servicios a los usuarios en una variedad de dispositivos. Es crucial considerar si su aplicación está configurada para ofrecer las experiencias más atractivas para cada usuario, sin importar su dispositivo o tamaño de pantalla. Hacerlo puede significar la diferencia entre impulsar el crecimiento y perderse una gran cantidad de nuevos clientes.
