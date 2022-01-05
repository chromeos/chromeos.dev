---
title: Gestión de ventanas
metadesc: Esta página describe el administrador de ventanas en Chrome OS.
date: 2020-05-01
weight: -4
tags:
  - gestión de ventanas
  - configuración de dispositivo
---

La implementación de aplicaciones de Android en Chrome OS incluye soporte básico de múltiples ventanas. En lugar de ocupar siempre la pantalla completa, Android presenta las aplicaciones en Chrome OS en contenedores de ventana de forma libre que son apropiados para las dimensiones del dispositivo, como se muestra en la [Figura 1](#figure-1) .

#1[Una ventana de aplicación en diferentes tamaños de dispositivos](ix://android/window-management/fullscreen-and-windows.png)

## Cambiar el tamaño de ventanas

En Chrome OS, los usuarios pueden cambiar el tamaño de la ventana de una aplicación de la forma habitual, arrastrando la esquina inferior derecha, como se muestra en la Figura 2

#2[Una ventana de aplicación redimensionable](ix://android/window-management/resizable.png)

Hay dos opciones para manejar el cambio de tamaño de la ventana:

- Responder a los cambios de configuración de forma dinámica llamando
  `onConfigurationChanged (..)` y agregando, por ejemplo,
  `android: configChanges =" screenSize | smallestScreenSize | orientación | screenLayout "`
  al archivo manifest de la actividad. Visite la documentación para [manejo de documentos de cambio de configuración](https://developer.android.com/guide/topics/resources/runtime-changes)
  para obtener más información sobre cómo manejar los cambios de configuración.
- Deje que el sistema reinicie la actividad. En este caso debe implementar
  `onSaveInstanceState` y usar un componente con la arquitectura [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) para restaurar el
  estado guardado.

Esta página muestra cómo asegurarse de que la ventana de su aplicación se inicie correctamente, cambia el tamaño sin problemas, y puede mostrar todo su contenido cuando cambia su tamaño.

!!! aside.message--note
**Nota:** Además de la gestión de ventanas, las aplicaciones de Android que se ejecutan en Chrome OS plantean desafíos de la gestión del ciclo de vida. También hay otras cuestiones a considerar, como
múltiples aplicaciones que compiten por recursos exclusivos como una cámara o un micrófono,
y la posibilidad de que una aplicación visible no sea necesariamente la aplicación activa. Leer
[documentación de ventanas múltiples](https://developer.android.com/guide/topics/ui/multi-window) para obtener información sobre cómo manejar estos problemas.
!!!

## Dimensiones de ventanas

Una actividad debe leer las dimensiones de su ventana cada vez que se inicia, y
organizar su contenido de acuerdo con la configuración actual.

Para determinar la configuración actual, llame a `getResources().GetConfiguration()`
en la actividad actual. No utilice la configuración de la actividad en segundo plano o del recurso del sistema. La actividad en segundo plano no tiene tamaño y la configuración del sistema puede
contienen varias ventanas con tamaños y orientaciones en conflicto, por lo que no se pueden utilizar
se pueden extraer datos.

Tenga en cuenta que el tamaño de la _ventana_ y el tamaño de la _pantalla_ no son iguales. Para obtener el tamaño de la ventana en DP, use `Activity.getResources().getConfiguration().screenWidth`
y `Activity.getResources (). getConfiguration (). screenHeight`. Probablemente nunca es necesario utilizar el tamaño de la pantalla.

# Límites del contenido

Los límites del contenido de una ventana pueden cambiar al cambiar el tamaño. Por ejemplo, el área dentro la ventana que utiliza la aplicación puede cambiar si la ventana se vuelve demasiado grande para encajar en la pantalla. Siga estas pautas:

- Las aplicaciones que utilizan el proceso de diseño de Android se distribuyen automáticamente
  en el espacio disponible.
- Las aplicaciones nativas deben leer el área disponible y monitorear los cambios de tamaño para evitar tener elementos de IU inaccesibles. Llame a los siguientes métodos para determinar el
  tamaño inicial disponible para esta superficie:

  - `NativeActivity.mLastContent[X/Y/Width/Height]()`
  - `findViewById(android.R.id.content).get[Width/Height]()`

  El monitoreo continuo se puede hacer a través del observador:

  - `NativeActivity.onContentRectChangedNative()`
  - `NativeActivity.onGlobalLayout()`

- Agregue un método para escuchar `view.addOnLayoutChangeListener(findViewById (android.R.id.content))` Si la aplicación está preescalando sus ilustraciones, debería hacerlo cada vez que cambie la resolución.

### Redimensionamiento libre

Chrome OS permite cambiar el tamaño de cualquier ventana libremente: el usuario puede cambiar el ancho, la altura y la posición de una ventana en la pantalla. Muchas aplicaciones de Android se escriben sin tener en cuenta el cambio de tamaño de forma libre. Tenga en cuenta estos problemas:

- La posición de la pantalla puede cambiar. Utilice siempre el sistema para realizar transformaciones de coordenadas de ventana a pantalla y de pantalla a ventana.
- Si está utilizando el sistema de visualización de Android, el diseño de su ventana
  cambia automáticamente cuando cambia su tamaño.
- Si no utiliza el sistema de visualización y se hace cargo de la superficie, su aplicación debe
  manejar los cambios de tamaño por sí misma.
- Las aplicaciones nativas deben usar los miembros de `mLastContent`, o usar la vista de contenido para determinar el tamaño inicial.
- Cuando la aplicación se está ejecutando, debe escuchar `onContentRectChangedNative` o
  Eventos `onGlobalLayout` para reaccionar a los cambios de tamaño.
- Cuando cambia el tamaño de la aplicación, debe cambiar la escala o recargar diseños, ilustraciones
  y actualizar áreas de entrada.

### Modo de pantalla completamodo

La pantalla completa funciona de la misma manera que en Android estándar.
Si la ventana no cubre la pantalla completa, las solicitudes de filtrado completo se ignoran(ocultando toda la interfaz de usuario del sistema). Cuando la aplicación se maximiza, se realizan los métodos, diseños y funciones normales de pantalla completa.
Esto oculta los elementos de la interfaz de usuario del sistema (barra de control de la ventana y el estante).

## Orientación de la pantalla

La más común para una aplicación de Android es vertical, ya que así es como se sostienen la mayoría de los teléfonos. Si bien el retrato es bueno para los teléfonos, es terrible para las
computadoras portátiles y tabletas, donde se prefiere el modo horizontal. Para obtener
los mejores resultados para su aplicación, considere la posibilidad de admitir ambas orientaciones.

Algunas aplicaciones de Android asumen que cuando un dispositivo se mantiene en modo vertical, el
valor de rotación es siempre [`Surface.ROTATION_0`](https://developer.android.com/reference/android/view/Surface.html#ROTATION_0).
Esto puede ser cierto para la mayoría de los dispositivos Android. Sin embargo, cuando la aplicación está en un modo determinado, es posible que el valor de rotación para la orientación vertical no sea
[`Surface.ROTATION_0`](https://developer.android.com/reference/android/view/Surface.html#ROTATION_0).

Para obtener un valor de rotación preciso mientras lee el acelerómetro o sensores similares, use [`Display.getRotation()`](<https://developer.android.com/reference/android/view/Display.html#getRotation()>) y cambie el eje en consecuencia.

### La actividad raíz y la orientación {: #the-root-activity-and-orientation}

Una ventana de Chromebook consta de una pila de ventanas de actividad. Cada ventana
de la pila tiene el mismo tamaño y orientación.

Los cambios repentinos de orientación y tamaño son confusos en un entorno de escritorio. El administrador de ventanas de Chromebook evita esto de una manera similar al modo de lado a lado de Android: la actividad en la parte inferior de la pila controla los atributos de todas las actividades anteriores. Esto puede conducir a situaciones inesperadas en las que una actividad recién iniciada en modo retrato y no se puede redimensionar se puede comvertir en una actividad de modo horizontal redimensionable.

El modo de dispositivo tiene un efecto aquí: en el modo de tableta, la orientación no está bloqueada y cada ventana conserva su propia orientación, como es normal en Android.

### Pautas de orientación

Siga estas pautas para manejar la orientación:

- Si solo admite una orientación, agregue la información al AndroidManifest.xml para que
  el administrador de ventanas lo sepa antes de iniciar la aplicación. Cuando
  especifique la orientación, también especifique las orientaciones del sensor cuando sea posible.
  Los Chromebook son a menudo convertibles y las aplicaciones al revés son molestas.
- Trate de quedarse con una única orientación seleccionada. Evite solicitar una orientación
  en el AndroidManifest.xml y configurar otra mediante programación más adelante.
- Tenga cuidado al cambiar la orientación según el tamaño de la ventana. Es posible que el usuario
  se quede atascado en una ventana pequeña del tamaño de un retrato y no pueda volver a una ventana horizontal más grande.
- Hay controles de ventana en Chrome para alternar entre todos los diseños disponible. Al elegir la opción de orientación correcta, puede asegurarse de que el usuario tenga el diseño correcto al iniciar la aplicación. Si una aplicación está disponible en modo vertical y horizontal, su valor predeterminado es horizontal, si es posible. Una vez configurada esta opción, se recuerda por aplicación.
- Intente evitar cambios de orientación innecesarios. Por ejemplo, si la orientación de la actividad
  es RETRATO, pero la aplicación llama a `setRequestedOrientation (LANDSCAPE)`
  en tiempo de ejecución, esto provoca un cambio de tamaño de ventana innecesario, lo cual es molesto para el usuario y posiblemente reinicie la aplicación si no puede manejarlo. Es mejor establecer la orientación una vez, por ejemplo, en el AndroidManifest.xml, y solo cambiarla
  si es necesario.

## Tamaño de lanzamiento inicial {: #initial-launch-size}

Las aplicaciones pueden especificar su tamaño de lanzamiento inicial de las siguientes formas:

- Utilice un tamaño de lanzamiento solo en entornos de escritorio.
  Esto ayuda al administrador de ventanas a darle los límites y la orientación adecuados. Para indicar una preferencia cuando se usa en modo de escritorio, agregue
  las siguientes metaetiquetas dentro de
  [`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element.html):


    ```xml {title=AndroidManifest.xml}
    <meta-data android:name="WindowManagerPreference:FreeformWindowSize"
               android:value="[phone|tablet|maximize]" />
    <meta-data android:name="WindowManagerPreference:FreeformWindowOrientation"
               android:value="[portrait|landscape]" />
    ```

- Use límites de lanzamiento estáticos. Use `<layout>` dentro de la entrada del AndroidManifest.xml de su actividad para especificar un tamaño de inicio "fijo". Vea este ejemplo:

  ```xml {title=AndroidManifest.xml}
  <layout android:defaultHeight="500dp"
          android:defaultWidth="600dp"
          android:gravity="top|end"
          android:minHeight="450dp"
          android:minWidth="300dp" />
  ```

- Use límites de lanzamiento dinámicos . Una actividad puede crear y utilizar `ActivityOptions.setLaunchBounds(Rect)` al crear una nueva actividad. Al especificar un rectángulo vacío, su aplicación se puede maximizar.

  !!! aside.message--note
  **Nota:** Todas estas posibilidades funcionan solo si la actividad iniciada es una raíz
  actividad. También puede hacer esto usando la actividad de trampolín, es decir, limpiando
  la pila de actividades en la tarea con un nuevo comienzo.
  !!!

## Otras Consideraciones

Aquí hay algunos otros aspectos a tener en cuenta al trabajar con aplicaciones de Android en
Chrome OS:

- No llames a `finish()` en el método `onDestroy` de tu actividad. Esto hace que
  aplicación se cierre al cambiar de tamaño y no se reiniciará, suponiendo que su aplicación deba reiniciarse.
- No utilice tipos de ventana que no sean compatibles, como `TYPE_KEYGUARD` y `TYPE_APPLICATION_MEDIA`.
- Asegúrese de que el reinicio de una actividad sea rápido almacenando en caché los objetos que se han previamente asignado.
- Si no desea que el usuario cambie el tamaño de su aplicación, especifique
  `android: resizeableActivity = false` en su archivo AndroidManifest.xml
- Pruebe su aplicación para asegurarse de que maneja cambios en tamaño de la ventana apropiadamente.
