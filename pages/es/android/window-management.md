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

# 1 [Una aplicación en diferentes tamaños de ventana](/images/android/optimizing/fullscreen-and-windows.png)

Los usuarios pueden cambiar el tamaño de la ventana que aloja su aplicación de Android, como se muestra en la [Figura 2](#figure-2) . Para asegurarse de que sus ventanas de formato libre cambien de tamaño sin problemas y puedan mostrar todo su contenido al usuario, lea las pautas y las cosas a tener en cuenta a continuación.

# 2 [Una ventana de aplicación redimensionable](/images/android/optimizing/resizable.png)

Esto plantea algunos desafíos del ciclo de vida y cosas nuevas a considerar con un entorno de tamaño libre. El entorno de tamaño libre permite una mayor probabilidad de que su aplicación sea visible pero no la aplicación activa o que tenga múltiples aplicaciones que compiten por recursos exclusivos como la cámara o el micrófono. ¡Mira los [documentos de ventanas múltiples](https://developer.android.com/guide/topics/ui/multi-window) aquí para obtener más información sobre estos y cómo manejarlos mejor!

## Redimensionar tareas y ventanas

Debido a que el tamaño de la ventana de la actividad puede cambiar, las actividades deben leer la resolución de las actividades al inicio. Las actividades deben reaccionar a los cambios de resolución llamando `onConfigurationChanged(..)` o permitiendo que el sistema reinicie la actividad. Por ejemplo, para evitar perder el trabajo del usuario tras la maximización, puede hacer lo siguiente:

- Reconstruya el estado previo usando el componente de arquitectura [ViewModel ](https://developer.android.com/topic/libraries/architecture/viewmodel) y `onSaveInstanceState` para que las transciciones sean tan simples como sea posible. Esto aplica para cuando solicitar reiniciar y es la mejor opción.
- Maneje los cambios de configuración dinámicamente agregando `android:configChanges="screenSize|smallestScreenSize|orientation|screenLayout"` al manifiesto de la actividad.

Hay más información sobre el manejo de cambios de configuración, como el cambio de tamaño en los [documentos para manejo de cambios de configuración](https://developer.android.com/guide/topics/resources/runtime-changes)

Cuando busque la configuración actual, use siempre la configuración de su actividad actual en `getResources().getConfiguration()` . No utilice la configuración de su actividad en segundo plano o la del recurso del sistema. La actividad en segundo plano no tiene un tamaño, y la configuración del sistema puede contener múltiples ventanas con tamaños y orientaciones conflictivas, por lo que no se pueden extraer datos utilizables.

Otra consideración importante es que los límites del contenido de la ventana pueden cambiar. Por ejemplo, el área dentro de la ventana que usa la aplicación puede cambiar si la ventana se vuelve demasiado grande para caber en la pantalla. Considere las siguientes pautas:

- Las aplicaciones que utilizan el proceso de diseño de Android deben presentarse automáticamente en el espacio disponible.

- Las aplicaciones nativas deben leer el área disponible y monitorear los cambios de tamaño para evitar tener elementos de IU inaccesibles. Llame a los siguientes métodos para determinar el tamaño inicial disponible para esta superficie:

  - `NativeActivity.mLastContent[X/Y/Width/Height]()`
  - `findViewById(android.R.id.content).get[Width/Height]()`

  El monitoreo continuo se puede hacer a través del observador:

  - `NativeActivity.onContentRectChangedNative()`
  - `NativeActivity.onGlobalLayout()`
  - Agregue un método que implemente `view.addOnLayoutChangeListener(findViewById(android.R.id.content))` Si la aplicación está escalando previamente su diseño, debería hacerlo cada vez que cambie la resolución.

El sistema admite cambio de tamaño libre; sin embargo, no todas las aplicaciones se escribieron teniendo en cuenta el cambio de tamaño. Aquí hay algunos problemas potenciales a tener en cuenta:

- Manejar el cambio de tamaño sin problemas. Puede cambiar su tamaño en cualquier momento debido a todo tipo de razones. Como tal, es realmente importante poder guardar y restaurar su estado lo mejor posible a través de `onSaveInstanceState` si es necesario reiniciar. Tenga en cuenta que esto también es beneficioso para Android en general.
- También asegúrese que al reiniciar su aplicación lo hace rápidamente al guardar en cache objetos asignados anteriormente. Si usted no usa los mecanismos de la plataforma para manejo de diseños — por ejemplo si su aplicación usa OpenGL y el contenido escala, o alguna otra lógica entra en juego — usted debería escuchar a los eventos de `onConfigurationChanged` para evitar que la actividad reinicie. Asegurese de especificar todos los eventos de cambios que pueda manejar dinámicamente.
- Si no desea cambiar el tamaño, debe especificar esto en su archivo de manifiesto .
- Es importante tener en cuenta que el tamaño de la ventana no es el tamaño de la pantalla y que, de todos modos, probablemente nunca necesite el tamaño de la pantalla. Para obtener el tamaño de la ventana, debe usar `Activity.getResources().getConfiguration().screenWidth` y `Activity.getResources().getConfiguration().screenHeight` en DP.

Para obtener su configuración actual, use siempre el recurso de su actividad y obtenga la configuración desde allí, ya que de lo contrario podría terminar mirando "algo", como las propiedades de la pantalla.

Tenga en cuenta que la posición de la pantalla también puede cambiar. Así que asegúrese de usar siempre el sistema para hacer cálculos de espacio de ventana a pantalla o viceversa.

Si está utilizando el sistema de visualización de Android, su ventana debería presentarse automáticamente con un cambio de tamaño.

Si no utiliza el sistema de visualización y se hace cargo de la superficie, su aplicación debe manejar los cambios de tamaño por su cuenta.

Las aplicaciones nativas deben usar los miembros de `mLastContent` u obtener la vista de contenido para obtener el tamaño inicial.

Una vez que la aplicación se está ejecutando, debe escuchar los eventos `onContentRectChangedNative` o `onGlobalLayout` para reaccionar a los cambios de tamaño.

Tenga en cuenta que con un cambio de tamaño, una aplicación debe cambiar el tamaño o volver a cargar diseños, ilustraciones y actualizar áreas de entrada.

## Las reglas de la actividad principal

Una ventana en Chromebooks consiste en una pila de ventanas de actividad. Cada ventana en esta pila tiene el mismo tamaño y orientación.

Para evitar cambios repentinos de orientación y tamaño, que son confusos para el usuario en un entorno de escritorio, el administrador de ventanas en Chromebooks hace lo mismo que el administrador de ventanas en Android cuando se usa el modo de lado a lado:

- La actividad en la parte inferior de la pila dicta los atributos de todas las actividades anteriores. Esto puede conducir a situaciones inesperadas en las que una actividad recién iniciada, que no se puede cambiar de retrato, se vuelve de tamaño horizontal.

El modo del dispositivo tiene un efecto aquí: en el modo tableta, la orientación no está bloqueada y cada orientación dicta su propia orientación, como es normal en Android. Sin embargo, el tamaño de la aplicación se bloquea si la actividad se dirige a Android 6.0 (nivel de API 23) o inferior.

## Orientación

La orientación más común es el retrato, ya que los teléfonos se sostienen principalmente de esta manera. Este modo es bueno para los teléfonos, pero terrible para las computadoras portátiles. Por otro lado, el modo horizontal es bueno para computadoras portátiles y para tabletas. Para obtener los mejores resultados para su aplicación con un administrador de ventanas, debe considerar admitir ambas orientaciones.

Algunas aplicaciones de Android suponen que cuando un dispositivo se mantiene en modo vertical, el valor de rotación siempre es [`Surface.ROTATION_0`](https://developer.android.com/reference/android/view/Surface#ROTATION_0) . Esto puede ser cierto para la mayoría de los dispositivos Android. Sin embargo, cuando la aplicación está en un cierto modo [ARC](https://developer.chrome.com/apps/getstarted_arc) , el valor de rotación para la orientación vertical puede no ser [`Surface.ROTATION_0`](https://developer.android.com/reference/android/view/Surface#ROTATION_0) .

Para obtener un valor de rotación preciso mientras lee el acelerómetro o sensores similares, use el método [`Display.getRotation()`](<https://developer.android.com/reference/android/view/Display.html#getRotation()>) e intercambie el eje en consecuencia.

Si solo admite uno, agregue la información al manifiesto para que el administrador de ventanas sepa sobre esto antes de iniciar la aplicación. Cuando especifique una orientación, asegúrese de especificar las orientaciones de los sensores cuando sea posible, ya que las Chromebooks a menudo son convertibles y las aplicaciones al revés son molestas. Siga con una orientación seleccionada, y lo más importante de todo: evite solicitar una orientación en el manifiesto y luego configure otra mediante programación más adelante. Si cambia la orientación en función del tamaño de la ventana, es posible que se quede atascado en una pequeña ventana de tamaño vertical y el usuario no pueda volver a una gran ventana horizontal.

## Tamaño de lanzamiento

Las aplicaciones pueden cambiar su tamaño de lanzamiento mediante una de las siguientes formas:

- Utilice un tamaño de inicio solo en entornos de escritorio. Esto ayuda al administrador de ventanas a darle los límites y la orientación adecuados. Para indicar una preferencia cuando se usa en modo escritorio, agregue las siguientes metaetiquetas dentro de la etiqueta [`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element) :

  ```xml
  <meta-data android:name="WindowManagerPreference:FreeformWindowSize"
             android:value="[phone|tablet|maximize]" />
  <meta-data android:name="WindowManagerPreference:FreeformWindowOrientation"
             android:value="[portrait|landscape]" />
  ```

- Use límites de lanzamiento estáticos. Use `<layout>` dentro de la entrada de manifiesto de su actividad para especificar un tamaño inicial "fijo". Ver este ejemplo:

  ```xml
    <layout android:defaultHeight="500dp"
            android:defaultWidth="600dp"
            android:gravity="top|end"
            android:minHeight="450dp"
            android:minWidth="300dp" />
  ```

- Use límites de lanzamiento dinámicos. Una actividad puede crear y usar `ActivityOptions.setLaunchBounds(Rect)` al crear una nueva actividad. Al especificar un rectángulo vacío, su aplicación se puede maximizar. !!! aside.message--note
  **Nota:** Todas estas posibilidades funcionan solo si la actividad iniciada es una actividad raíz. También puede hacerlo mediante la actividad de trampolín, es decir, limpiar la pila de actividades en la tarea con un nuevo comienzo.
  !!!

## Supervisar cambios en la jerarquía de vistas

Agregar un título de control de ventana puede causar algunos problemas. Considere las siguientes recomendaciones:

- No espere que su contenido comience en (0,0) de la ventana. El contenido de la ventana puede estar compensado por la altura del título. Mire la ubicación de la pantalla de la vista usando `View.getLocationInWindow()` para obtener el desplazamiento correcto.
- No esperes que `DecorView` sea el titular de `contentView` . El título es parte de la jerarquía de la ventana y, si existe, se encuentra entre `DecorView` y la vista de contenido. Como tal, cumpla con lo siguiente:
  - No cambie la jerarquía de vistas directamente debajo de `DecorView` .
  - No asuma que el elemento secundario de `DecorView` es de tipo `LinearLayout` .
- No asuma que `Configuration.screenHeightDp` es la altura del área de contenido de su aplicación. Parte de esta altura la ocupa la vista de subtítulos, si existe. Lo mismo se aplica a `Display.getSize()` , etc.

## Pantalla completa

Esto funciona de la misma manera que en Android: si la ventana no cubre la pantalla completa, se ignoran las solicitudes de detección completa (que oculta toda la interfaz de usuario del sistema). Cuando la aplicación se maximiza, se aplican los métodos / diseños / funciones normales para ingresar al modo de pantalla completa. De esta manera, la interfaz de usuario del sistema (barra de control de la ventana y el estante) desaparece.

## Otras Consideraciones

Aquí hay algunos otros aspectos a considerar:

- Si su actividad siempre está destinada a ejecutarse en pantalla completa, agregue el indicador `android:resizeableActivity="false"` a su manifiesto.
- Los usuarios finales se presentan con controles de ventana para alternar entre todos los diseños disponibles. Al elegir la opción de orientación correcta, puede asegurarse de que el usuario tenga el diseño correcto al iniciar la aplicación. Si una aplicación está disponible en vertical y horizontal, su valor predeterminado es horizontal, si es posible. Una vez establecida esta opción, se recuerda por aplicación.
- Intente evitar cambios de orientación innecesarios. Por ejemplo, si la orientación de la actividad es RETRATO, pero la aplicación llama a `setRequestedOrientation(LANDSCAPE)` en tiempo de ejecución, esto provoca un cambio de tamaño innecesario de la ventana, lo cual es molesto para el usuario y posiblemente se reinicia si su aplicación no puede manejarlo. La opción preferida es establecer la orientación una vez, por ejemplo, en el manifiesto, y solo cambiarla si es necesario.
- No llame a `finish()` en el método `onDestroy` su actividad. Esto hace que la aplicación se cierre al cambiar el tamaño y no se reinicie, suponiendo que su aplicación tenga que reiniciarse.
- No use tipos de ventanas que no sean compatibles, como `TYPE_KEYGUARD` y `TYPE_APPLICATION_MEDIA` .

!!! aside.message--note
**Nota:** Recomendamos que pruebe su aplicación para asegurarse de que maneja los cambios en el tamaño de la ventana de manera adecuada.
!!!
