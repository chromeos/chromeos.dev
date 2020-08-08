---
title: Comienza a construir
metadesc: Descubra cómo  ajustes clave en su aplicación de Android existente pueden permitirles ejecutarse en Chromebooks y ampliar el alcance de su aplicación.
weight: -7
tools:
  - name: Android
    url: https://www.android.com/versions/pie-9-0
    versions:
      min: 6.0 Marshmallow
      max: 9.0 Pie
  - name: Android Studio
    url: https://developer.android.com/studio
    versions:
      min: 3.0
      max: última
date: 2020-05-01
---

Los dispositivos Chrome OS, como los Chromebook, ahora son compatibles con Google Play Store y las aplicaciones de Android. Este artículo asume que tiene una aplicación de Android existente diseñada para teléfonos o tabletas que desea optimizar para Chromebooks. Para conocer los conceptos básicos de la creación de aplicaciones de Android, consulte [Crear su primera aplicación.](https://developer.android.com/training/basics/firstapp/index?hl=es)

## Actualiza el archivo de manifiesto de tu aplicación

Para comenzar, actualice su archivo de manifiesto para tener en cuenta algunas diferencias clave de hardware y software entre las Chromebooks y otros dispositivos con Android.

A partir de Chrome OS versión M53, todas las aplicaciones de Android que no requieren explícitamente la función [`android.hardware.touchscreen`](https://developer.android.com/guide/topics/manifest/uses-feature-element.html#touchscreen-hw-features?hl=es) también funcionarán en dispositivos Chrome OS que admitan la función `android.hardware.faketouch` . Sin embargo, para garantizar que su aplicación funcione en todas las Chromebooks, vaya a su archivo de manifiesto y ajuste la configuración para que no se requiera la función `android.hardware.touchscreen` , como se muestra en el siguiente ejemplo. Eliminar el requisito de entrada táctil significa que también debe revisar el soporte de su aplicación para las [interacciones de mouse y teclado](https://developer.android.com/training/gestures/movement?hl=es) .

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" ... >
  <!-- Some Chromebooks don't support touch. Although not essential,
        it's a good idea to explicitly include this declaration. -->
  <uses-feature android:name="android.hardware.touchscreen"
                android:required="false" />
</manifest>
```

Los diferentes dispositivos de hardware vienen equipados con diferentes conjuntos de sensores. Aunque los dispositivos de mano Android a menudo tienen GPS y acelerómetros, no se garantiza que estos sensores estén disponibles en todas las Chromebook. Sin embargo, hay casos en los que la funcionalidad de un sensor se proporciona de otra manera. Por ejemplo, las Chromebook pueden no tener sensores GPS, pero aún proporcionan datos de ubicación basados en conexiones Wi-Fi. Consulte el documento de [descripción general de sensores](https://developer.android.com/guide/topics/sensors/sensors_overview) para obtener una descripción general de todos los sensores que admite la plataforma Android. Si desea que su aplicación se ejecute en Chromebooks independientemente de la disponibilidad del sensor, debe actualizar su archivo de manifiesto para que ninguno de los sensores sea necesario.

Nota: Si no necesita un sensor en particular para su aplicación, pero aún utiliza mediciones del sensor cuando está disponible, asegúrese de verificar dinámicamente la disponibilidad del sensor antes de intentar recopilar información de él en su aplicación.

Algunas funciones de software no son compatibles con las Chromebooks. Por ejemplo, las aplicaciones que proporcionan IME personalizados, widgets de aplicaciones, fondos de pantalla en vivo e iniciadores de aplicaciones no son compatibles y no estarán disponibles para su instalación en Chromebooks. Para obtener una lista completa de las funciones de software que actualmente no son compatibles con las Chromebook, consulte [las funciones de software incompatibles](/{{locale.code}}/android/manifest#software-features) .

## Actualiza la version SDK preferida

Al actualizar el atributo [`targetSdkVersion`](https://developer.android.com/reference/android/R.attr#targetSdkVersion) al último nivel de API disponible, su aplicación puede aprovechar todas las mejoras en la plataforma Android. Por ejemplo, Android 7.0 (nivel de API 24) trae mejoras al soporte de múltiples ventanas. Le permite cambiar el tamaño de las actividades con cambio de tamaño de forma libre, haciéndolos sentir más natural. También puede acceder a las API para operaciones de arrastrar y soltar en aplicaciones y cursores de mouse personalizados.

## Verifique los requisitos de red

Las Chromebook ejecutan todo el sistema operativo Android en un contenedor, similar a Docker o LXC. Esto significa que Android no tendrá acceso directo a la interfaz LAN del sistema. En cambio, el tráfico IPv4 pasará a través de una capa interna de traducción de direcciones de red (NAT), y el tráfico de unidifusión IPv6 se enrutará a través de un salto adicional. Las conexiones de unidifusión salientes de una aplicación de Android a Internet deberían funcionar principalmente tal cual; pero en general, las conexiones entrantes están bloqueadas. Los paquetes de multidifusión o difusión de Android no se enviarán a la LAN a través del firewall.

Como una excepción especial a la restricción de multidifusión, Chrome OS ejecuta un servicio que reenvía el tráfico mDNS entre Android y la interfaz LAN, por lo que las API de [descubrimiento de servicios de red](https://developer.android.com/training/connect-devices-wirelessly/nsd?hl=es) estándar son la forma recomendada para descubrir otros dispositivos en el segmento LAN. Después de encontrar un dispositivo en la LAN, una aplicación de Android puede usar enchufes de unidifusión TCP o UDP estándar para comunicarse con él.

Las conexiones IPv4 que se originan en Android utilizarán la dirección IPv4 del host del sistema operativo Chrome. Internamente, la aplicación de Android verá una dirección IPv4 privada asignada a la interfaz de red. Las conexiones IPv6 que se originan en Android usarán una dirección diferente del host de Chrome OS, ya que el contenedor de Android tendrá una dirección IPv6 pública dedicada.

## Use la nube y el almacenamiento local de manera efectiva

Una de las características más sólidas de los Chromebooks es que los usuarios pueden migrar fácilmente de un dispositivo a otro. Es decir, si alguien deja de usar un Chromebook y comienza a usar otro, simplemente tiene que iniciar sesión y aparecen todas sus aplicaciones.

Para mejorar aún más esta experiencia, debe hacer una copia de seguridad de los datos de su aplicación en la nube para permitir la sincronización entre dispositivos. Dicho esto, las aplicaciones no deberían depender de una conexión a Internet para su funcionamiento normal. Las aplicaciones deben guardar el trabajo de un usuario localmente si el dispositivo está fuera de línea y sincronizarse con la nube una vez que el dispositivo vuelva a estar en línea. Por ejemplo, Google Docs permite a los usuarios editar sus documentos sin conexión y sincronizar los cambios en la nube una vez que el dispositivo obtiene conectividad.

Las Chromebooks también se pueden compartir entre un gran número de personas, como en las escuelas. Como el almacenamiento local no es infinito, las cuentas completas, junto con su almacenamiento, se pueden eliminar del dispositivo en cualquier momento. Para entornos educativos, es una buena idea tener en cuenta este escenario.

## Actualice las bibliotecas NDK

Si su aplicación usa las bibliotecas NDK de Android y su versión SDK de destino es 23 o superior, asegúrese de que las reubicaciones de texto se eliminen de las versiones ARM y x86 de sus bibliotecas NDK, ya que no son compatibles con Android 6.0 (API nivel 23 ) y más alto. Al dejar las reubicaciones de texto en sus bibliotecas NDK, también puede causar errores de incompatibilidad con Chromebooks, especialmente cuando se ejecuta en un dispositivo que utiliza una arquitectura x86.

Nota: Para obtener más detalles sobre la acutalización apropiada de las librerías de NDK , visite la sección [Runtime](https://developer.android.com/about/versions/marshmallow/android-6.0-changes?hl=es#behavior-runtime) del documento de cambios de Android 6.0.

## Desarrolle nuevos casos de prueba para su aplicación

Primero asegúrese que las configuraciones adecuadas están especificadas en el manifiesto. Estas configuraciones incluyen la orientación predilecta, lo mejor es darle un valor de `unspecified` a [`screenOrientation`](https://developer.android.com/reference/android/R.attr?hl=es#screenOrientation) . Si usted especifíca una orientación como `landscape`, considere mejor utilizar `sensorLandscape` para asegurarse que la experiencia en tabletas sea óptima. Si usted utiliza un tamaño especial o solicitudes de orientación también debería considerar agregar las nuevas meta etiquetas como indicios de orientación o tamaño —lo cual también afecta entornos de escritorio. Si usted desea el cambio también en teléfonos, usted debe especificar los valores [`defaultHeight`](https://developer.android.com/reference/android/R.attr.html?hl=es#defaultHeight), [`defaultWidth`](https://developer.android.com/reference/android/R.attr.html?hl=es#defaultWidth), o [`minHeight`](https://developer.android.com/reference/android/R.attr.html?hl=es#minHeight) .

Si está interesado en el manejo de dispositivos de entrada específicos para categorías de dispositivos específicas, debe especificar `android.hardware.type.pc` para deshabilitar el modo de compatibilidad de entrada.

Si está utilizando algún tipo de red, asegúrese de que la aplicación pueda volver a conectarse a la red después de que se resuelva un problema de conexión o que el dispositivo salga del modo de suspensión.

Google recomienda verificar los [Casos de prueba para aplicaciones de Android en Chrome OS](/{{locale.code}}/android/tests) , que puede usar en su propio plan de prueba. Los casos de prueba cubren una amplia gama de escenarios comunes para los que las aplicaciones de Android deberían estar preparadas si se espera que se ejecuten en dispositivos Chrome OS.

### Ventana múltiple y cambios de orientación

El entorno de múltiples ventanas de Chrome OS puede hacer que la persistencia del estado y los problemas de recuperación sean más obvios. Debe usar [`ViewModel`](https://developer.android.com/topic/libraries/architecture/viewmodel?hl=es) para guardar y restaurar su estado cuando sea apropiado.

Para probar la persistencia del estado, debe minimizar su aplicación durante algún tiempo, iniciar otro proceso de uso intensivo de recursos y luego restaurar su aplicación para validar que vuelva al estado en que la dejó.

Pruebe el cambio de tamaño de la ventana presionando la tecla de pantalla completa (F4), maximizando y restaurando. Pruebe el cambio de tamaño libre habilitándolo en las opciones de desarrollador y verificando que su aplicación cambie de tamaño sin problemas y sin fallar.

Si su dispositivo Chrome OS lo admite, cambie de computadora portátil al modo tableta para ver que todo funcione como se espera. Gire el dispositivo una vez en modo tableta para probar los cambios de orientación. Transición nuevamente al modo portátil. Repita este paso varias veces.

Asegúrese de que la barra superior no esté rompiendo su aplicación compensando los elementos de la interfaz de usuario o la entrada táctil basada en la ubicación. Para dispositivos Chrome OS, asegúrese de que su aplicación no coloque información importante en el área de la barra de estado.

Si está utilizando la cámara u otras funciones de hardware, como el lápiz óptico, asegúrese de que se comporta correctamente al realizar los cambios de ventana y dispositivo como se describe anteriormente.
