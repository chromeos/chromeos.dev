---
title: Compatibilidad de entrada
metadesc: Cómo admitir todos los diferentes tipos de entrada que están disponibles para Chromebooks.
date: 2020-05-01
weight: -5
tags:
  - dispositivos de entrada
  - soporte para teclado
  - soporte para lápiz óptico
  - soporte para trackpad
---

En los dispositivos con Chrome OS, muchos usuarios interactúan con aplicaciones usando un teclado, mouse, trackpad, stylus o gamepad. Si bien estos dispositivos de entrada también se usan en teléfonos Android, no son tan comunes y los desarrolladores frecuentemente los pasan por alto.

Los desarrolladores que deseen que su aplicación funcione bien con entradas en Chrome OS y otros dispositivos compatibles con Android de pantalla grande, deben seguir los siguientes pasos:

1. Agregue y compruebe soporte básico para **navegar usando el teclado** usando las teclas [[←]][[↑]][[→]][[↓]] y [[Tab]] , La tecla [[Enter]] para confirmar entrada de texto, [[Space]] para reproducir/pausar medios, etc.
2. Agregue los **atajos** basados en [[Ctrl]] / [[Shift]] / [[Alt]] dependiendo de la funcionalidad de la aplicación: [[Ctrl]] + [[Z]] para deshacer, [[Ctrl]] + [[S ]] para guardar, etc.
3. Compruebe interacciones **básicas con el ratón**: clic derecho pare menús de contexto, cambie íconos cuando se desplace sobre ellos, desplazamiento usando la rueda del ratón/trackpad, etc.
4. Compruebe métodos de entrada utilizados **en su app en específico**: stylus para aplicaciones de dibujo, gamepads para juegos, controladores MIDI para aplicaciones de música, etc.
5. Considere agregar **soporte avanzado para métodos de entrada** que podría hacer que su aplicación sobresalga en ambientes de escritorio: touchpad como un cross-fader para apliaciones de DJ , captura de ratón para juegos, atajos avanzados en teclados para usuarios avanzados, etc.

## Teclado

El manejo correcto de la entrada del teclado es esencial para proporcionar una buena experiencia de escritorio. Esto se puede dividir en tres categorías: [navegación](#navigation) , [pulsaciones de teclas](#keystrokes) y [atajos](#shortcuts) .

### Navegación

La navegación con teclado, aunque no siempre es evidente para las aplicaciones centradas en el tacto, es esperada por los usuarios que tienen sus manos en un teclado mientras interactúan con una aplicación. También puede ser esencial para usuarios con necesidades de accesibilidad tanto en teléfonos como en dispositivos de escritorio.

Para muchas aplicaciones, las teclas [[←]] [[↑]] [[→]] [[↓]] y la navegación con la tecla[[Tab]] es todo lo que se necesita y el marco de Android lo maneja automáticamente. Por ejemplo, las vistas como [[Botones]] se pueden `enfocar` de manera predeterminada, y la navegación por teclado generalmente debería funcionar sin ningún código adicional. Para habilitar la navegación por teclado para vistas que no son enfocables de manera predeterminada, los desarrolladores deben marcarlas como `focusable` . Esto se puede hacer mediante programación o en XML. Consulte la documentación de [Manejo de enfoque](https://developer.android.com/reference/android/view/View.html#FocusHandling) para obtener más información.

Una buena práctica es: antes de cada lanzamiento, intente acceder a todas las funciones de la aplicación solo con el teclado (no se permite el mouse ni la entrada táctil). Las acciones más comunes deberían ser las más fáciles de acceder.

!!! aside.message--note
**Recuerde:** para usuarios con diferentes necesidades de accesibilidad, la compatibilidad con el teclado puede ser esencial para poder usar la aplicación de manera efectiva.
!!!

```kotlin
yourView.isFocusable = true
```

```xml
android:focusable="true"
```

Una vez habilitado, el marco de Android creará un mapeo de navegación para todas las vistas enfocables en función de su posición. Esto generalmente funciona como se esperaba y no se necesita más trabajo. En caso de que la asignación predeterminada no sea correcta para las necesidades de una aplicación, puede anularse manualmente de la siguiente manera:

```kotlin
// Arrow keys
yourView.nextFocusLeftId = R.id.view_to_left
yourView.nextFocusRightId = R.id.view_to_right
yourView.nextFocusTopId = R.id.view_above
yourView.nextFocusBottomId = R.id.view_below

// Tab key
yourView.nextFocusForwardId = R.id.next_view
```

### Pulsaciones de teclas

Para el ingreso de texto que sería manejado por un teclado virtual en pantalla ( [IME](https://developer.android.com/guide/topics/text/creating-input-method) ) como con un `EditText` , las aplicaciones deben comportarse como se espera en Chrome OS sin trabajo adicional del desarrollador. Para las pulsaciones de teclas que el marco no puede anticipar, las aplicaciones deberán manejar el comportamiento por sí mismas. Esto es especialmente cierto para aplicaciones con vistas personalizadas.

Algunos ejemplos comunes de esto son manejar la tecla [[Enter]] para aplicaciones con entrada de texto o funcionalidad de chat, la tecla [[Space]] para aplicaciones de medios y la [[W]] [[A]] [[S] ] [[D]] teclas para movimiento en juegos.

La [documentación para manejo del teclado](https://developer.android.com/training/keyboard-input/commands.html) de Android es la guía a seguir para esta implementación. Específicamente, la mayoría de las aplicaciones van a querer sobreescribir el evento [onKeyUp](<https://developer.android.com/reference/android/view/KeyEvent.Callback#onKeyUp(int,%20android.view.KeyEvent)>) y agregar el comportamiento esperado para el código de cada tecla.

```kotlin
override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
    return when (keyCode) {
        KeyEvent.KEYCODE_ENTER -> {
            sendChatMessage()
            true
        }
        KeyEvent.KEYCODE_SPACE -> {
            playOrPauseMedia()
            true
        }
        else -> super.onKeyUp(keyCode, event)
    }
}
```

El uso de `onKeyUp` evita que las aplicaciones reciban múltiples eventos si una tecla se mantiene presionada o se suelta lentamente. Los juegos y aplicaciones que esperan que los usuarios mantengan presionadas las teclas del teclado y necesiten reaccionar en consecuencia pueden buscar el evento [onKeyDown](<https://developer.android.com/reference/android/view/KeyEvent.Callback#onKeyDown(int,%20android.view.KeyEvent)>) .

!!! aside.message--note
**Nota:** dependiendo de las necesidades de una aplicación, sobreescribir `onKeyUp` para toda la Actividad generalmente proporciona el comportamiento necesario. Si lo desea, se puede agregar un [onKeyListener](https://developer.android.com/reference/android/view/View.OnKeyListener) a una vista específica. Por ejemplo, una aplicación solo puede desear escuchar la tecla [[Enter]] en EditText específico, y no la Actividad, para implementar la funcionalidad de envío solo cuando el usuario está escribiendo en un cuadro de chat.
!!!

### Atajos

Se esperan atajos comunes [[Ctrl]] / [[Alt]] / [[Shift]] en entornos de escritorio. Si una aplicación no los implementa, la experiencia puede sentirse frustrante y rota para los usuarios. Además de los accesos directos comunes, los usuarios más avanzados apreciarán los accesos directos para las tareas específicas de la aplicación que se usan con frecuencia, lo que hace que la aplicación sea más fácil de usar y la diferencie de otras sin accesos directos convenientes.

Algunos atajos comunes son [[Ctrl]]+[[S]](save), [[Ctrl]]+[[Z]](undo), y [[Ctrl]]+[[Shift]]+[[Z]](redo). Si desea ejemplos de atajos más avanzados, visite esta lista de [VLC Media Player atajos](https://www.vlchelp.com/vlc-media-player-shortcuts/).

Los atajos se pueden implementar usando ][dispatchKeyShortcutEvent](<https://developer.android.com/reference/android/view/Window.Callback.html#dispatchKeyShortcutEvent(android.view.KeyEvent)>). Este intercepta todas las combinaciones de una meta-tecla para un código de tecla determinado ([[Alt]]/[[Ctrl]]/[[Shift]]). Para chequear una meta-tecla en específico, use [KeyEvent.isCtrlPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isCtrlPressed()>), [KeyEvent.isShiftPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isShiftPressed()>), [KeyEvent.isAltPressed()](<https://developer.android.com/reference/android/view/KeyEvent#isAltPressed()>), o [KeyEvent.hasModifiers()](<https://developer.android.com/reference/android/view/KeyEvent.html#hasModifiers(int)>).

Separar el código de los atajos del manejo de otras teclas (`onKeyUp` o `onKeyDown`) puede hacer el mantenimiento del código más fácil y permite aceptar todas las meta-teclas sin tener que implementar el chequeo de las meta-teclas repetitivamente. Permitir todas las combinaciones de meta-teclas puede ser más conveniente para algunos usuarios que pueden estar acostumbrados a diferentes configuraciones de teclado o sistemas operativos.

```kotlin
override fun dispatchKeyShortcutEvent(event: KeyEvent): Boolean {
  return when (event.keyCode) {
    KeyEvent.KEYCODE_O -> {
      openFile() // Ctrl+O, Shift+O, Alt+O
      true
    }
    KeyEvent.KEYCODE_Z-> {
      if (event.isCtrlPressed) {
        if (event.isShiftPressed) {
          redoLastAction() // Ctrl+Shift+Z pressed
          true
        } else {
          undoLastAction() // Ctrl+Z pressed
          true
        }
      }
    }
    else -> {
      return super.dispatchKeyShortcutEvent(event)
    }
  }
}
```

Si lo desea, los accesos directos también se pueden implementar en `onKeyUp` al verificar [KeyEvent.isCtrlPressed ()](<https://developer.android.com/reference/android/view/KeyEvent#isCtrlPressed()>) , [KeyEvent.isShiftPressed ()](<https://developer.android.com/reference/android/view/KeyEvent#isShiftPressed()>) o [KeyEvent.isAltPressed ()](<https://developer.android.com/reference/android/view/KeyEvent#isAltPressed()>) de la misma manera que anteriormente. Esto puede ser más fácil de mantener si el meta-comportamiento es más una modificación del comportamiento de una aplicación que un acceso directo. Por ejemplo: si [[W]] significa "caminar hacia adelante" y [[Shift]] + [[W]] significa "correr hacia adelante".

```kotlin
override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
  return when(keyCode) {
    KeyEvent.KEYCODE_W-> {
      if (event.isShiftPressed) {
        if (event.isCtrlPressed) {
          flyForward() // Ctrl+Shift+W pressed
          true
        } else {
          runForward() // Shift+W pressed
          true
        }
      } else {
        walkForward() // W pressed
      }
    }
    else -> super.onKeyUp(keyCode, event)
  }
}
```

## Soporte para mouse y touchpad

Chrome OS maneja automáticamente la mayoría de los eventos de mouse y trackpad para que actúen como eventos táctiles en un teléfono Android. Esto incluye el desplazamiento con dos dedos del panel táctil / rueda del mouse. La mayoría de las aplicaciones generalmente solo necesitan pensar en 3 eventos centrados en el escritorio: [clic derecho](#right-click) , [desplazamiento](#hover) y [arrastrar y soltar](#drag-and-drop) .

### Botón derecho del ratón

Cualquier acción que haga que una aplicación muestre un menú contextual, como presionar prolongadamente un elemento de la lista, también debe reaccionar a los eventos de clic derecho. Para manejar eventos de clic derecho, las aplicaciones deben registrar un [`View.OnContextClickListener`](https://developer.android.com/reference/android/view/View.OnContextClickListener) . Para obtener detalles sobre cómo construir un menú contextual, consulte la [documentación del menú contextual de](https://developer.android.com/guide/topics/ui/menus#context-menu) Android

Kotlin:

```kotlin
yourView.setOnContextClickListener {
  showContextMenu()
  true
}
```

**Nota** : cualquier vista que se haya registrado para un menú contextual usando [Activity.registerForContextMenu ()](<https://developer.android.com/reference/android/app/Activity#registerForContextMenu(android.view.View)>) debería funcionar automáticamente con una pulsación larga y un clic derecho sin la necesidad de registrar un escucha de clic contextual.

### Flotar

Los desarrolladores pueden hacer que sus diseños de aplicaciones se sientan pulidos y más fáciles de usar al manejar eventos de desplazamiento (hover). Esto es especialmente cierto para las vistas personalizadas. Los dos ejemplos más comunes de esto son:

- Indicar a los usuarios si se puede hacer clic, editar, etc. en un elemento cambiando el ícono del puntero del mouse
- Agregar comentarios visuales a los elementos en una lista o cuadrícula grande cuando el puntero se encuentra sobre ellos

```kotlin
// Change the icon to a "hand" pointer on hover,
// Highlight the view by changing the background.
yourView.setOnHoverListener { view, _ ->
  addVisualHighlighting(true)
  view.pointerIcon =
    PointerIcon.getSystemIcon(applicationContext,
    PointerIcon.TYPE_HAND)
  false // listener did not consume the event.
}
```

### Arrastrar y soltar

En un entorno de ventanas múltiples, los usuarios esperan poder arrastrar y soltar elementos entre aplicaciones. Esto es cierto para dispositivos Chrome OS, así como tabletas / teléfonos / plegables en modo de pantalla dividida.

Los desarrolladores deben considerar si es probable que los usuarios arrastren elementos a su aplicación. Algunos ejemplos comunes incluyen: los editores de fotos deben esperar recibir fotos, los reproductores de audio deben esperar recibir archivos de audio y los programas de dibujo deben esperar recibir fotos.

Para agregar soporte de arrastrar y soltar, siga la documentación de Android de [arrastrar y soltar](https://developer.android.com/guide/topics/ui/drag-drop.html) y eche un vistazo a esta [publicación de blog específica de Chrome OS](https://medium.com/androiddevelopers/android-on-chrome-os-implementing-drag-drop-2cc2bdcdc621) .

**Consideraciones especiales para Chrome OS**

- Para manejar archivos desde la aplicación Archivos de Chrome OS, busque el tipo MIME: application / x-arc-uri-list
- Recuerde solicitar permiso a través de requestDragAndDropPermissions para acceder a elementos arrastrados desde fuera de la aplicación
- Un elemento debe tener el indicador View.DRAG_FLAG_GLOBAL para poder arrastrarlo a otras aplicaciones.

### Soporte avanzado de puntero

Las aplicaciones que deseen hacer un manejo avanzado de la entrada de mouse y touchpad deben seguir la documentación de Android para [View.onGenericMotionEvent ()](<https://developer.android.com/reference/android/view/View#onGenericMotionEvent(android.view.MotionEvent)>) y usar [`MotionEvent.getSource()`](<https://developer.android.com/reference/android/view/MotionEvent#getSource()>) para distinguir entre [SOURCE_MOUSE](https://developer.android.com/reference/android/view/InputDevice#SOURCE_MOUSE) y [SOURCE_TOUCHSCREEN](https://developer.android.com/reference/android/view/InputDevice#SOURCE_TOUCHSCREEN) .

Examine el `MotionEvent` para implementar el comportamiento requerido.

- El movimiento genera eventos `ACTION_HOVER_MOVE`
- Los botones generan eventos `ACTION_BUTTON_PRESS` y `ACTION_BUTTON_RELEASE` . También puede verificar el estado actual de todos los botones del mouse / trackpad usando `getButtonState()` .
- El desplazamiento de la rueda del mouse genera eventos `ACTION_SCROLL`

## Lápiz óptico

Muchas Chromebooks vienen con un lápiz óptico o pueden funcionar con una tableta de dibujo bluetooth externa como la [Wacom Intuos](https://www.wacom.com/en-us/products/pen-tablets/wacom-intuos) . (Nota: actualmente, los dispositivos solo USB no son compatibles)

Se informará un evento de lápiz similar a un evento de pantalla táctil a través de [View.onTouchEvent ()](<https://developer.android.com/reference/android/view/View#onTouchEvent(android.view.MotionEvent)>) o [View.onGenericMotionEvent ()](<https://developer.android.com/reference/android/view/View#onGenericMotionEvent(android.view.MotionEvent)>) , y contiene un tipo [`MotionEvent.getSource()`](<https://developer.android.com/reference/android/view/MotionEvent#getSource()>) de [SOURCE_STYLUS](https://developer.android.com/reference/android/view/InputDevice#SOURCE_STYLUS) . `MotionEvent` también contendrá datos adicionales:

- [MotionEvent.getToolType ()](<https://developer.android.com/reference/android/view/MotionEvent#getToolType(int)>) devolverá [TOOL_TYPE_FINGER](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_FINGER) , [TOOL_TYPE_STYLUS](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_STYLUS) o [TOOL_TYPE_ERASER](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_ERASER) dependiendo de la herramienta que hizo contacto con la superficie
- [MotionEvent.getPressure ()](<https://developer.android.com/reference/android/view/MotionEvent#getPressure(int)>) informará la presión física aplicada al lápiz óptico, si es compatible
- [MotionEvent.getAxisValue ()](<https://developer.android.com/reference/android/view/MotionEvent#getAxisValue(int,%20int)>) con [MotionEvent.AXIS_TILT](https://developer.android.com/reference/android/view/MotionEvent#AXIS_TILT) y [MotionEvent.AXIS_ORIENTATION](https://developer.android.com/reference/android/view/MotionEvent#AXIS_ORIENTATION) que se pueden usar para leer la inclinación física y la orientación del lápiz, si es compatible

### Puntos históricos

Android procesa eventos de entrada que se entregarán una vez por cuadro. Un lápiz óptico puede informar eventos a frecuencias mucho más altas que la pantalla. Al crear aplicaciones de dibujo, es importante verificar los eventos que pueden estar en el pasado reciente utilizando las API `getHistorical` :

- `MotionEvent.getHistoricalX()`
- `MotionEvent.getHistoricalY()`
- `MotionEvent.getHistoricalPressure()`
- `MotionEvent.getHistoricalAxisValue()`

### Rechazo de palma

Chrome OS intenta reconocer cuando la palma de un usuario descansa sobre una pantalla táctil. Sin embargo, esto no siempre es posible. A veces, se puede informar un evento táctil a la aplicación antes de que el sistema operativo lo reconozca como una palma. En ese caso, los toques se cancelarán al informar un evento `ACTION_CANCEL` .

Este evento le dice a la aplicación que ciertos toques no son válidos y que debe deshacer todas las interacciones causadas por esos toques. Por ejemplo, una aplicación de dibujo podría dibujar temporalmente nuevas líneas tan pronto como se reciban para proporcionar la latencia más baja, pero solo las comprometerá permanentemente en el lienzo una vez que la serie táctil haya terminado limpiamente. Si los eventos táctiles se cancelan mientras tanto, las líneas temporales se pueden borrar fácilmente.

!!! aside.message--note
**Nota:** Una forma de reducir los eventos extraños de palma / dedo en las aplicaciones de dibujo / escritura es proporcionar una configuración de interfaz de usuario fácil para deshabilitar el dibujo a través del tacto, y solo usar eventos de lápiz para dibujar cuando esté en este modo.
!!!

### Aplicaciones para tomar notas

Chrome OS tiene una intención especial que muestra a los usuarios aplicaciones registradas para tomar notas. Para registrar una aplicación como una aplicación para tomar notas, agregue lo siguiente al manifiesto de Android:

```xml
  <intent-filter>
    <action android:name="org.chromium.arc.intent.action.CREATE_NOTE" />
    <category android:name="android.intent.category.DEFAULT" />
  </intent-filter>
```

Una vez registrados, los usuarios pueden seleccionar esa aplicación para que sea la aplicación predeterminada para tomar notas. Cuando se solicita una nueva nota, la aplicación debe crear una nota vacía lista para la entrada del lápiz. Cuando el usuario desea anotar una imagen (por ejemplo, una captura de pantalla o una imagen descargada), la aplicación se iniciará con `ClipData` contiene uno o más elementos con contenido: // URI. La aplicación debe crear una nota que use la primera imagen adjunta como imagen de fondo en un modo en el que el usuario pueda dibujar con un lápiz óptico.

#### Prueba de intentos de tomar notas sin un lápiz

Para probar si una aplicación responde correctamente a los intentos de tomar notas sin un lápiz óptico activo, use el siguiente método para mostrar las opciones de toma de notas:

1. [Cambie al modo de desarrollo y haga que el dispositivo sea grabable](/{{locale.code}}/android/sideload)
2. Presione [[Ctrl]] + [[Alt]] + [[F2]] para abrir un terminal
3. Ejecute el comando `sudo vi /etc/chrome_dev.conf`
4. Presione [[i]] para editar y agregar `--ash-enable-palette` a una nueva línea al final del archivo
5. Guarde presionando [[Esc]] y luego escribiendo [[:]] [[w]] [[q]] y presionando [[Enter]]
6. Presione [[Ctrl]] + [[Alt]] + [[F1]] para volver a la interfaz de usuario normal de Chrome OS
7. Cerrar sesión y volver a ingresar

Ahora debería haber un menú de stylus en el estante:

- Toque el botón del lápiz en el estante y elija "Nueva nota". Esto debería abrir una nota de dibujo en blanco
- Tome una captura de pantalla (del estante: `stylus button > Capture screen` ) o descargue una imagen, debe haber la opción "Anotar imagen" en la notificación. Esto debería la aplicación con la imagen lista para ser anotada

## Gamepads

Consulte nuestra página [Soporte de entrada](/{{locale.code}}/games/optimizing-games-inputs#game-controllers) en Juegos para obtener detalles sobre el soporte del controlador.

## Modo de traducción de entrada

Chrome OS habilita un modo de traducción de entrada de forma predeterminada. Para la mayoría de las aplicaciones de Android, este modo ayudará a las aplicaciones a "simplemente funcionar" como se espera en un entorno de escritorio. Algunos ejemplos incluyen habilitar automáticamente el desplazamiento con dos dedos en el panel táctil, el desplazamiento de la rueda del mouse y el mapeo de las coordenadas de visualización sin formato a las coordenadas de la ventana. En general, los desarrolladores de aplicaciones no necesitan implementar ninguno de estos comportamientos.

Si una aplicación desea definir un comportamiento de entrada personalizado, por ejemplo, definir una acción de pellizco del panel táctil personalizado con dos dedos, o estas traducciones de entrada no proporcionan los eventos de entrada esperados por la aplicación, este modo se puede deshabilitar agregando la siguiente etiqueta al Manifiesto de Android:

```xml
<uses-feature
  android:name="android.hardware.type.pc"
  android:required="false" />
```

<!--- hadrosaur: commenting out the DecorCaptionView section, I believe it is not longer relevant. This should be tested before it is removed completely.
## Beware the `DecorCaptionView`

In free-form window mode, the apps caption bar is part of your view hierarchy and under your control. You generally do not have to be aware of this, but there are cases where you have to be careful:

- Do not make modifications using `Window.getDecorView()`. If you want to add top-level views, add them to the view you have set as `Activity.setContentView()`.
- Do not expect your `Activity.setContentView()` to be at `(0, 0)` of your app. That’s where the caption bar is.
- If possible, avoid using `MotionEvent.getRawX()` or `MotionEvent.getRawY()`. If you do use them, use them in conjunction with
  `View.getLocationOnScreen()` to transform coordinates to view-space coordinates.
--->
