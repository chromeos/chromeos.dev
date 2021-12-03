---
title: Resumen de GDC 2019 Optimización de juegos de Android para pantallas más grandes y plegables
metadesc: Un resumen de Google en la Conferencia de Game Developer 2019 con algunos consejos y trucos útiles de codificación.
tags:
  - eventos
  - técnico
  - historia exitosa
  - juegos
  - pantallas grandes
  - gráficos de alto rendimiento
  - android
  - modo de dispositivo
  - gestión de ventanas
  - los dispositivos de entrada
  - soporte de teclado
  - soporte para mouse
authors:
  - bgable
hero:
  image: /images/posts/gdc-2019-recap/hero.png
  alt: Ilustración de la computadora portátil y dispositivo plegable.
date: 2019-05-02
---

_Este artículo apareció originalmente en Google Play Medium._

En la Conferencia de Desarrolladores de Juegos de este año, estuvimos encantados de compartir cómo los dispositivos versátiles han provocado una nueva evolución en los juegos. Gracias a las capacidades mejoradas de hardware móvil, como pantallas 3D y pantallas de mayor resolución, vemos cada vez más títulos emergentes en Play Store que atraen a los jugadores con gráficos y juegos inmersivos.

Naturalmente, estas experiencias de juego se ven y juegan aún mejor en pantallas grandes. Eso significa que los desarrolladores pueden obtener acceso a una audiencia masiva y de rápido crecimiento al optimizar sus juegos para dispositivos de distintos tamaños y pantallas más grandes.

Si tienes un juego en la tienda Google Play, probablemente ya se esté ejecutando en Chrome OS. Las Chromebooks ejecutan una versión completa de Android dentro de un contenedor, por lo que es como ejecutar tu juego en un dispositivo Android. Pero, al hacer algunos ajustes más, los desarrolladores pueden optimizar sus juegos para que se vean y funcionen de la mejor manera en dispositivos de pantalla grande, así como sentar las bases para un juego óptimo en dispositivos plegables. Vea a continuación un resumen de lo que cubrimos durante nuestra sesión de GDC, junto con consejos y trucos útiles de codificación.

## Problemas comunes con juegos en pantallas más grandes

Como desarrolladores de juegos, desea proporcionar la mejor experiencia de juego posible en cada dispositivo, ya sea que los usuarios jueguen en un teléfono en modo vertical, un dispositivo con teclado y mouse, o un dispositivo plegable con múltiples configuraciones y resoluciones de pantalla. Siguiendo las mejores prácticas de Android, los desarrolladores pueden ofrecer una excelente experiencia de referencia en todos estos escenarios.

En el APK, esto comienza con un cambio de configuración. El sistema detecta un cambio en la configuración del dispositivo y reiniciará automáticamente su actividad con nuevos recursos que permiten que su juego o aplicación se adapte a la nueva configuración.

```java
public void onConfigurationChanged(Configuration newConfig) {
    //Scale UI
    //Toggle control scheme
    //Adjust orientation
    //etc
}
```

Por defecto, el sistema manejará los cambios de configuración automáticamente invocando `onSaveInstanceState` antes de reiniciar la actividad. Eso puede llevar más tiempo para los juegos con muchos recursos, por lo que querrás configurarlo tú mismo.

Así es como puede usar los cambios de configuración para adaptar los juegos en dispositivos de pantalla más grande, comenzando por la pantalla.

### Gestión de pantallas y ventanas.

En dispositivos como las Chromebooks and Samsung DeX, los juegos son inicializados en un ambiente de ventanas por defecto, donde el usuario puede cambiar el tamaño de las ventanas dinámicamente. En dispositivos como el Samsung Galaxy Fold, la pantalla y la proporción de las imágenes va a cambiar cuando el usuario abra el dispositivo a la pantalla más grande. Cada uno de estos casos va a iniciar eventos de: `onConfigurationChanged`.

Aquí le mostramos cómo puede configurar los cambios en el tamaño y la orientación de la pantalla en su manifiesto:

```xml
<activity android:name=".MyActivity"
  android:configChanges="screenSize|orientation"
  android:label="@string/app_name">
```

### Cambios de configuración

En su código, su actividad invocará `onConfigurationChanged` siempre que ocurra el cambio de configuración declarado previamentee. Ahora, puede manejar cualquier cambio que sea. Por ejemplo, podría escalar su contenido de OpenGL para que coincida con la nueva resolución o propoción de la pantalla para evitar elementos de IU inaccesibles.

```java
public void onConfigurationChanged(Configuration newConfig) {
  //Get native surface size
  //NativeActivity.mLastContent[X/Y/Width/Height]()
  //findViewById(android.R.id.content).get[Width/Height]()
}
```

### Cambio de tamaño dinámico

También es importante recordar que cada vez que cambie el tamaño de la pantalla, las áreas de entrada también cambiarán. Si su juego siempre está destinado a ejecutarse en pantalla completa, o si necesita evitar rápidamente los problemas de cambio de configuración mientras soluciona los errores, simplemente puede configurar [`resizableActivity`](https://developer.android.com/guide/topics/manifest/activity-element?hl={{locale.code}}#resizeableActivity) en false en su manifiesto. Esto evitará el cambio de tamaño dinámico, pero también evitará las vistas de pantalla dividida, así que úselo con moderación para evitar limitar la experiencia del usuario.

```xml
<activity android:name=".MyActivity"
  android:resizeableActivity="false"
  android:label="@string/app_name">
```

### Orientación del dispositivo

En dispositivos móviles, la orientación de pantalla predeterminada es vertical. En otros dispositivos, podría ser horizontal. En su manifiesto, especifique las orientaciones de los sensores que admite para que el sistema las maneje y asegúrese de que su juego no se voltee inesperadamente.

```xml
<activity … android:screenOrientation=”...”>
```

O, si está manejando dinámicamente la orientación en `onConfigurationChanged` , use `Display.getRotation()` para obtener la orientación actual de la pantalla en código.

```java
Display.getRotation()
```

Tenga en cuenta que los valores que espera pueden intercambiarse en diferentes dispositivos, según la orientación predeterminada del hardware.

### Resolución del dispositivo

También deberá considerar la resolución del dispositivo del usuario. Las pantallas más grandes requieren recursos de mayor resolución, por lo que puede usar paquetes de aplicaciones para empaquetar el código y los activos de su juego para diferentes configuraciones de dispositivo. De esa manera, Google Play solo entregará los activos correctos para el dispositivo en particular en el que se descargó su juego, por ejemplo, omitiendo los activos de resolución ultra alta para dispositivos de pantalla más pequeñas. Esto le ahorra valioso espacio de descarga y la molestia de mantener múltiples APK para diferentes densidades de pantalla.

![Componentes del paquete de aplicaciones de Android](/images/posts/gdc-2019-recap/android-app-bundle.png)

Recuerde que con más píxeles viene una mayor flexibilidad en el diseño de interfaz de usuario y HUD. Cuando los usuarios juegan en una pantalla más grande, y es probable que estén más lejos de la pantalla, considere los elementos que puede expandir, agregar o cambiar para asegurarse de que todo en la pantalla sea legible e identificable.

### Entrada

Un número cada vez mayor de juegos móviles ofrece experiencias que se parecen más a jugar en una computadora de escritorio o una consola. Es por eso que más dispositivos Android ofrecen una variedad de entradas diferentes, incluidas las extensiones de teclado y controlador. Aunque Android tiene API para teclados, ratones y controladores, los desarrolladores de juegos podrían no admitir esos controles si suponen que las personas juegan en una pantalla táctil. Pero sin soporte para entradas adicionales, los jugadores se sentirán decepcionados cuando intenten jugar con un teclado en un Chromebook sin pantalla táctil, o conecten un mouse para jugar su juego de disparos en primera persona favorito.

Muchos dispositivos nuevos también son convertibles que pueden cambiar las configuraciones sobre la marcha, como pasar del modo clamshell al modo tableta. La mejor manera de admitir estos cambios en el esquema de control es detectar el hardware disponible en el dispositivo que brindará a los jugadores la mejor experiencia.

Para comenzar, puede declarar soporte para eventos de configuración relacionados con dispositivos de entrada, como teclados.

![Fragmento de código para declarar soporte de teclado para cambios de configuración. La imagen muestra las instrucciones del teclado que se muestran durante el juego.](/images/posts/gdc-2019-recap/config-keyboard-support.png)

Luego, puede consultar `InputManager` al inicio o durante los cambios de configuración y cambiar de un esquema de control táctil a un esquema de control del teclado si no hay pantalla táctil o si hay un teclado disponible. En este caso, también debes asegurarte de que el teclado sea utilizable aunque `InputManager` dice que hay uno disponible. Después de todo, podría ser un Chromebook en modo tableta.

![Fragmento de código para detectar la presencia del teclado y el mouse. La imagen muestra las instrucciones del teclado que se muestran durante el juego.](/images/posts/gdc-2019-recap/detect-keyboard-and-mouse.png)

Si el soporte del teclado fue una idea de último momento al diseñar su juego, considere implementar algunas funciones como las siguientes para mejorar drásticamente su accesibilidad:

- Combinaciones de teclas de habilidad
- WASD / Navegación con tecla de flecha
- Menú de navegación
- Enter
- Tab
- Página arriba / abajo
- Botón de retroceso
- Asignaciones de teclas personalizadas

No te olvides de los jugadores que usan ratones, especialmente cuando se trata de juegos de disparos en primera persona o juegos en tercera persona en Android.

### Captura de ratón

```java
public void onClick(View view) {
    view.requestPointerCapture();
}

public boolean onCapturedPointerEvent(MotionEvent motionEvent) {
  // Get the coordinates required by your app
  float verticalOffset = motionEvent.getY();
  float horizontalOffset = motionEvent.getX();
  return true;
}

...

  view.releasePointerCapture();
```

Finalmente, considere implementar el soporte del controlador si aún no lo ha hecho porque las API estándar del controlador de Android funcionan en dispositivos como Chromebooks y Samsung DeX.

## Construir

Ahora, pasemos a construir y configurar su APK para asegurarnos de que sea compatible con varios dispositivos de pantalla grande con Android.

El primer paso es **revisar sus permisos** para determinar si realmente necesita los permisos que solicita su juego. Algunos permisos no son compatibles con ciertos dispositivos como Chrome OS, como los siguientes:

- `android.hardware.location.gps` - GPS
- `android.hardware.nfc` - Comunicación de campo cercano
- `android.hardware.camera` - Cámara trasera

Además, piense en el perfil de **hardware en** el que se ejecuta su juego y considere ajustar lo siguiente:

- Control de calidad automático: ajuste su lógica de control de calidad automática o cree una nueva configuración de calidad para optimizarla mejor para un dispositivo en particular.
- x86 y ARM: intente proporcionar una compilación x86 para obtener el mejor rendimiento en dispositivos como Chromebooks. ARM seguirá funcionando, pero incurrirá en gastos generales con la traducción de instrucciones.
- Compatibilidad con Vulkan: la mayoría de los dispositivos ahora son compatibles con Vulkan, que proporciona un gran impulso en velocidad y rendimiento gráfico.

El último paso es **probar** en todos los dispositivos de pantalla grande. Agregue casos de prueba que cubran flujos adicionales para diferentes dispositivos, como minimizar, maximizar, cambiar entre pantallas pequeñas y grandes, ingresar y cambiar el tamaño. Puede usar herramientas como el emulador de Android y Chrome OS o Firebase Test Lab para ayudar a automatizar el proceso de prueba.

La aplicación de emulador, que puede ejecutarse en dispositivos Android y Android Studio AVD, se proporciona para probar el cambio de tamaño y densidad de la pantalla.

```bash
$ adb install FoldableEmulator.apk
$ adb shell pm grant com.samsung.android.foldable.emulator android.permission.WRITE_SECURE_SETTINGS
$ adb shell pm grant com.samsung.android.foldable.emulator android.permission.SYSTEM_ALERT_WINDOW
```

Asegúrese de consultar el blog de desarrolladores de Samsung para [obtener más información sobre las pruebas para dispositivos plegables](https://developer.samsung.com/galaxy-fold/testing-app-continuity.html) .

## El futuro de los plegables.

Los teléfonos inteligentes plegables son una nueva generación de dispositivos que ofrecen a los jugadores lo mejor de dos mundos. Al fusionar un teléfono inteligente y una tableta en uno, los plegables brindan el beneficio de ventanas multiactivas y el doble de pantalla para jugar. Y debido a que comparten principios de optimización similares, construir para Chromebooks ya sienta las bases para el juego en teléfonos inteligentes Android plegables como el Galaxy Fold. Solo hay cuatro cosas clave a considerar:

### Relación de aspecto máxima

Admitir el modo de pantalla completa es fundamental para garantizar que los jugadores obtengan la mejor y más inmersiva experiencia. La pantalla de la portada tendrá una proporción larga (21: 9), así que sigue los siguientes pasos para asegurarte de que tu juego pueda manejar una proporción máxima para llenar toda la pantalla:

- Declare la versión del SDK de destino: los juegos que se dirigen a Android 8.0 (nivel de API 26) o superior ocuparán toda la pantalla.
- Declara la actividad `resizeableActivity` (solo declara como "true" si tu juego admite múltiples ventanas): `android:resizeableActivity=[“true” | “false”]`
- Declare una proporción de la pantalla máxima: la proporción de la pantalla inicial es 21: 9, y eso requiere que mencione la proporción de aspecto máxima como 2.4. A continuación, le indicamos cómo declarar la proporción máxima en su archivo de manifiesto (estos metadatos deben establecerse en la etiqueta Aplicación):

```xml
<!-- Render on full screen up to aspect ratio of 2.4 -->
<!-- Use a letterbox on screens larger than 2.4 -->
<meta-data android:name="android.max_aspect" android:value="2.4" />
```

### Recorte de pantalla

El Galaxy Fold tiene un recorte de pantalla en la esquina superior izquierda cuando está desplegado, por lo que es importante asegurarse de que no se obstruya la información necesaria o útil en la pantalla del juego.

Si está renderizando en el área recortada, puede usar `WindowInsets.getDisplayCutout()` para recuperar un objeto `DisplayCutout` .

1. `LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT`
2. `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES`
3. `LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER`

- **`MODE_DEFAULT`** : el contenido se muestra en el área recortada mientras está en modo vertical, pero está encuadrado en el modo horizontal.
- **`MODE_SHORT_EDGES`** : el contenido se muestra en el área recortada tanto en modo vertical como horizontal.
- `MODE_NEVER` : el contenido nunca se muestra en el área recortada.

A continuación se define un estilo que puede usar para aplicar el atributo `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES` a la actividad.

```xml
<style name="ActivityTheme">
   <item name="android:windowLayoutInDisplayCutoutMode">
       shortEdges <!-- default, shortEdges, never -->
   </item>
</style>
```

[Haga clic aquí](https://developer.android.com/guide/topics/display-cutout?hl={{locale.code}}) para leer más prácticas recomendadas al codificar el recorte de la pantalla.

### Continuidad del juego

Cuando los usuarios desplieguen sus dispositivos, querrás asegurarte de que tu juego se transforme sin problemas a ancho completo. Eso significa que puede manejar dos pantallas físicas, reaccionar al mecanismo de plegado del dispositivo físico y sus estados, y ser redimensionable.

1. Asegurarse de que su juego pueda manejar dos tamaños de pantalla no es diferente de otros métodos para admitir diferentes tamaños de pantalla en Android. La única diferencia es que sucederá con mayor frecuencia en un teléfono inteligente plegable. [Haga clic aquí](https://developer.android.com/training/multiscreen/screensizes.html) para obtener más detalles sobre la compatibilidad con diferentes tamaños de pantalla.
2. Para plegar y desplegar, los desarrolladores no necesitan manejar eventos especiales o API en el Galaxy Fold porque sigue el comportamiento convencional de la plataforma Android para cambiar el tamaño de la pantalla. La configuración se cambiará a la siguiente: `Screensize` , `smallestScreenSize` , `ScreenLayout` .
3. Finalmente, considere hacer que el juego sea redimensionable para una experiencia perfecta entre pantallas. Una vez que un juego redimensionable maneja adecuadamente la configuración modificada, el usuario experimentará una transición intuitiva y sin problemas entre la cubierta y las pantallas principales.

### Reanudación multiple

La reanudación múltiple significa reanudar todas las actividades visibles superiores en múltiples ventanas. En Android P, si el juego y el OEM optan, se reanudarán todas las actividades visibles superiores. Todos los dispositivos Samsung por encima de Android Pie, incluido Galaxy Fold, admiten reanudación múltiple.

Aplicar la reanudación múltiple es simple. Simplemente agregue metadatos en el archivo de manifiesto de su aplicación. Luego, si su juego es visible con una situación de ventanas múltiples, su actividad se reanudará.

```xml
<application>
  <meta-data
    android:name="android.allow_multiple_resumed_activities"
    android:value=”true” />
  <activity ... />
</application>
```

## Cómo Gameloft diseñó Asphalt 9 para experiencias de pantalla grande

Gameloft aprovechó la oportunidad para optimizar el juego de Asphalt 9 para experiencias en pantallas más grandes. El equipo construyó el juego con varios métodos de entrada y tamaños de pantalla en mente, así como también aseguró un rendimiento consistente y de alta velocidad en todos los dispositivos.

Mira cómo lo hicieron:

@ [youtube](https://www.youtube.com/watch?v=ZfBeab5u534)

Google también trabajó con Gameloft para optimizar el predecesor de Asphalt 9, Asphalt 8: Revolution, para Chrome OS y dispositivos plegables. Lee más [aquí](/{{locale.code}}/stories/asphalt-8) .

## Construye para el futuro de los juegos móviles

Los juegos de Android ya no son una experiencia exclusiva para dispositivos móviles. Los jugadores de hoy están experimentando juegos en una amplia variedad de dispositivos y factores de forma. Si sigue las mejores prácticas de Android y pasa un poco de tiempo extra pensando en su experiencia de usuario en pantallas más grandes, puede llevar su juego más allá del móvil y proporcionar la mejor experiencia de juego posible para cada jugador.
