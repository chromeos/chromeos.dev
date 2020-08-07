---
title: Optimización de experiencias de aplicaciones de Android para Chrome OS
metadesc: Obtenga información sobre formas de optimizar su aplicación de Android para una mejor experiencia de usuario en Chrome OS
tags:
  - técnico
  - tendencia
  - android
  - soporte de teclado
  - soporte de trackpad
  - pantallas grandes
authors:
  - nataliagvak
hero:
  image: /images/posts/optimizing-android-app-experiences-for-chromeos/hero.png
  alt: Ilustración de teléfonos inteligentes, computadoras portátiles y tabletas con conexiones de línea de puntos.
date: 2019-09-09
---

_Este artículo apareció originalmente en Google Play Medium._

Desde el lanzamiento de nuestras primeras tabletas y dispositivos que se pueden separar hasta el lanzamiento de Chromebooks en nuevos mercados como [Japón](https://www.google.com/intl/ja_jp/chromebook/) y [Alemania](https://www.google.com/intl/de_de/chromebook/) , hemos trabajado arduamente para adaptar el ecosistema de dispositivos Chrome OS a los usuarios de aplicaciones actuales. Y a medida que las personas usan cada vez más aplicaciones en dispositivos con pantallas más grandes y dispositivos con formas versátiles, hemos podido involucrar a un nuevo y enorme grupo de usuarios.

Android soporta una creciente variedad de dispositivos de pantalla grande, desde tabletas y dispositivos plegables hasta computadoras portátiles con Chrome OS. Debido a que los Chromebook ejecutan específicamente una versión completa de Android dentro de un contenedor, la mayoría de las aplicaciones de Android ya se ejecutan en Chrome OS. Eso significa que los desarrolladores pueden tomar un único APK de Android y escalarlo para que funcione en cualquier dispositivo Chrome OS, lo que permite experiencias aún más inmersivas y atractivas en dispositivos con pantallas más grandes.

> Los desarrolladores pueden tomar su un único APK de Android y escalarlo para que funcione en cualquier dispositivo Chrome OS, lo que permite experiencias aún más inmersivas y atractivas en dispositivos con pantallas más grandes.

El tiempo total dedicado a las aplicaciones de Android en Chrome OS también ha crecido 4 veces en el último año, [^ 1] y en el cuarto trimestre de 2018, el 21% de las computadoras portátiles vendidas en los EE. UU. Eran Chromebooks, un crecimiento anual del 23%. [^ 2]

[^ 1]: Datos internos de Google, marzo de 2018 a marzo de 2019. [^ 2]: The NPD Group, Inc., Servicio de seguimiento minorista, EE. UU., Computadoras portátiles, Chrome OS, basado en unidades, 8 de octubre de 2017 a enero .6, 2018 vs. 7 de octubre, 2018 - 5 de enero, 2019

Brindar una experiencia óptima en Chrome OS solo requiere algunos ajustes, pero tienen un gran impacto. Después de que Gameloft y TopHatch optimizaran sus aplicaciones para pantallas más grandes, [Asphalt 8](/{{locale.code}}/stories/asphalt-8) : Airborne de Gameloft generó 6 veces más usuarios de aplicaciones diarias y 9 veces más ingresos en dispositivos Chrome OS, mientras que TopHatch ha visto el doble de conversiones pagas en Chromebooks y 20 veces más tiempo en Pixelbooks para su aplicación [Concepts](/{{locale.code}}/stories/concepts) .

[En I/O este año](https://www.youtube.com/watch?v=06xJOOs_KvQ&list=PLNYkxOF6rcIBqW90ghQOTs9MqN5KxqESw) , presentamos algunos pasos útiles para garantizar que su aplicación se vea y funcione de manera excelente en una variedad de dispositivos y tamaños de pantalla. Consulte los aspectos más destacados a continuación junto con un par de nuevas y emocionantes actualizaciones para desarrolladores de Android en Chrome OS.

## Optimizando su experiencia de aplicación para Chrome OS

La forma en que alguien usa su aplicación depende completamente de su dispositivo. Hay algunas cosas que debe considerar para asegurarse de que su aplicación ofrezca una experiencia de usuario óptima:

### Entrada de teclado

Si su aplicación aún no admite teclados, aquí está el código para asegurarse de que lo haga:

```kotlin
override fun onKeyUp(code: Int, ev: KeyEvent?): Boolean {
  return when (code) {
    KeyEvent.KEYCODE_J -> {
      // Do something here
      true
    }
      else -> super.onKeyUp(code, ev) // Important
  }
}
```

La línea señalada con `// Important` es una forma de pasar las teclas que no se han registrado a la implementación por defecto. Esto permite que Chrome OS maneje esos comandos en lugar de denegar la funcionalidad de cada combinación sin acciones asignadas.

### Tecla Actualizar

El teclado de Chrome OS tiene una tecla especial de actualizar con su própio código (`KEYCODE_REFRESH`), así que es recomendable asegurarse que su aplicación maneje los eventos de `KEYCODE_REFRESH` . Si la aplicación ya utiliza `SwipeRefreshLayout`, Chrome OS está implementado para asegurarse que ese layout funcione automáticamente con el botón de actualizar.

### Touchpad

Cuando alguien usa su aplicación en el escritorio con un panel táctil, esperará desplazarse con un deslizamiento de dos dedos en el panel. Pero en los dispositivos móviles, los usuarios suelen desplazarse presionando y arrastrando la pantalla. Chrome OS interpreta automáticamente este tipo de eventos de movimiento diferentes, por lo que, por ejemplo, una aplicación de dibujo no se marcará en la pantalla cuando alguien intente desplazarse en el dispositivo móvil.

Para aplicaciones que requieren eventos de movimiento táctil más avanzados, puede usar `ignore MotionEvents when (event.getButtonState() == 0)` para verificar el estado del botón e ignorar eventos no deseados (como en el ejemplo de la aplicación de dibujo anterior).

### NDK

Juegos y aplicaciones en Chrome OS automáticamente reciben traducción de ARM a x86. Pero si el rendimiento es su prioridad, es esencial implementar soporte para x86. [ La mayoría de dispositivos de Chrome OS ](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices) tienen chipsets 64-bit x86 y más están siendo desarrollados. Para proveer el mejor desempeño y soporte a través de todos los dispositivos, asegúrese de proveer archivos para ARM, ARM64, x86, and x86_64 si su aplicación tiene código nativo.

Android Studio simplifica el soporte: al usar paquetes de aplicaciones de Android, empaqueta todos los objetivos de compilación listos para Play Store, que luego solo envía los objetivos de compilación que los usuarios de su aplicación necesitan para mantener los tamaños de descarga al mínimo.

### Diseño

Probablemente haya visto una aplicación móvil que no ha sido diseñada para una pantalla más grande: mucho espacio desperdiciado y navegación torpe. Para asegurarse de que su aplicación se vea bien en varios diseños, puede usar un archivo de recursos con múltiples opciones de diseño para cada tamaño de pantalla.

![Múltiples archivos activity_main.xml para diferentes diseños](/images/posts/optimizing-android-app-experiences-for-chromeos/multiple-activity-main-xml.png)

### Patrones de navegación

Su aplicación también debería ser fácil de usar en diferentes tamaños de pantalla. [Cree diseños de retrato, retrato ancho y horizontal ancho](https://github.com/google/chromeosnavigationdemo) cambiando entre una navegación inferior, navegación lateral y patrón de navegación lateral expandido, según el ancho de pantalla disponible.

Reply, una aplicación de correo electrónico, [rediseñó su diseño](https://material.io/design/material-studies/reply.html#about-reply) para la funcionalidad y facilidad de uso en múltiples pantallas, y aunque Adobe Acrobat optimizó la funcionalidad de su aplicación para Chrome OS, la marca también rediseñó todo su diseño para diferentes dispositivos.

![Diferentes patrones de navegación en diferentes tamaños y orientaciones de pantalla.](/images/posts/optimizing-android-app-experiences-for-chromeos/navigation-patterns.png)

### Monitores múltiples

Cuando alguien usa varios monitores, generalmente habrá una diferencia de densidad entre las dos pantallas. Cambie la densidad de su aplicación sobre la marcha escuchando "densidad" en la `onConfigurationChanged` en los cambios dentro de su actividad de Chrome.

## Nuevas actualizaciones para desarrollar en Chromebooks

En I/O, también [anunciamos más formas en](/{{locale.code}}/posts/chromeos-io-19) que hemos hecho que Chrome OS sea un entorno más rápido, más simple y más seguro para desarrolladores web y Android, que incluyen:

### Instalación con un clic para Android Studio

Simplemente descargue, haga clic e instale, no se necesita usar un terminal.

### Depuración de ADB sobre USB mejorada

No más modo desarrollador: simplemente conecte su teléfono y depure a través de USB en [dispositivos compatibles](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-adb-debugging-over-usb) .

### Chequeos de formato del código

Destaca orientaciones bloqueadas o poco amigables, actividades no redimensionables, requisitos de hardware incorrectos y otras características que no son ideales para Chrome OS.

### Reproducción de audio en Linux

El contenedor de Chrome OS admite todas las herramientas de audio de Linux, como Audacity.

### Escritorios virtuales

Una bandera en M76, nuestro canal estable actual, permite encender un escritorio virtual cuando su pantalla se obstruye con diferentes ventanas y casos de uso de plataforma.

### Soporte para múltiples monitores / HDCP completo

Proyecta y mira contenido de video protegido con DRM en monitores externos. \*_ Use `SurfaceView.setSecure()` para aprovechar esta característica_

### Integración ARCore

ARCore está disponible para aplicaciones con una cámara orientada al mundo.

### Soporte instantáneo de aplicaciones

Los usuarios de dispositivos Android P ahora pueden [probar una aplicación o un juego sin instalarlo primero](https://developer.android.com/topic/google-play-instant) .

### Almacenamiento externo para aplicaciones de Android

Las aplicaciones de Android pueden leer y escanear discos externos.

### Reproducir archivos

El administrador de archivos de Chrome OS puede mostrar la carpeta `/sdcard` de Android en archivos de reproducción, lo que permite el acceso para leer y escribir archivos de Android desde el contenedor de Chrome.

### Almacenamiento en la nube de Android con DocumentsProvider y aplicaciones de proveedor de documentos personalizados

Soporte para la interfaz de Android `DocumentsProvider` en Chrome OS.

### Perfilando su aplicación para detectar distorción de animación

Una herramienta de creación de perfiles integrada permite a los desarrolladores monitorear el estado del sistema a lo largo del tiempo, incluido el uso del búfer, v-syncs, el uso de la CPU, la frecuencia de la GPU y la CPU, y la temperatura del sistema, para ver qué está causando el distorición de animación y / o la lentitud del sistema.

## Brinde una experiencia óptima en cada pantalla

La experiencia de la aplicación se ha expandido mucho más allá del móvil. En una era de dispositivos versátiles y dispositivos de forma variable, los usuarios esperarán una experiencia bien diseñada y fácil de usar cada vez que abran su aplicación. Aproveche la oportunidad de admitir varios métodos de entrada, optimizar su diseño y navegación para una variedad de tamaños de pantalla, utilizar espacio de pantalla adicional y admitir x86 con código nativo.

Si desea obtener más información sobre la creación de aplicaciones de Android para Chrome OS, [consulte nuestra sesión completa](https://www.youtube.com/watch?v=06xJOOs_KvQ&list=PLNYkxOF6rcIBqW90ghQOTs9MqN5KxqESw) de I/0 2019.
