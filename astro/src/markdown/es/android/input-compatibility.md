---
title: Compatibilidad de entrada
metadesc: Cómo admitir todos los diferentes tipos de entrada que están disponibles para los Chromebooks.
date: 2020-05-01
weight: -5
tags:
  - dispositivos de entrada
  - soporte para teclado
  - soporte para lápiz óptico
  - soporte para trackpad
---

En los dispositivos Chrome OS, muchos usuarios interactúan con las aplicaciones utilizando un teclado, ratón, panel táctil, stylus o gamepad. Si bien estos dispositivos de entrada también se usan en teléfonos Android, no son tan comunes y los desarrolladores a menudo los pasan por alto.

Los desarrolladores que quieran que su aplicación funcione bien con los dispositivos de entrada en Chrome OS y otros dispositivos de pantalla grande con capacidad para Android, deben tener en cuenta las siguientes optimizaciones:

- Agregar y probar la compatibilidad básica con el teclado, como la navegación del teclado mediante las teclas de flechas y la tecla tab, la tecla enter para confirmar la entrada de texto y espacio para reproducir / pausar en aplicaciones multimedia.
- Agregue atajos de teclado estándar cuando corresponda, por ejemplo [[Ctrl]]+[[Z]] para deshacer, [[Ctrl]]+[[S]] para guardar.
- Pruebe las interacciones básicas del mouse: que el clic derecho despliegue menús contextuales, los cambios de íconos al flotar el mouse sobre los elementos y los eventos de desplazamiento de la rueda del mouse/trackpad en las vistas personalizadas.
- Pruebe los dispositivos de entrada específicos de la aplicación, como un lápiz óptico para aplicaciones de dibujo, controladores de juegos para juegos y controladores MIDI para aplicaciones de música.
- Considere el soporte de entrada avanzado que podría hacer que la aplicación se destaque en entornos de escritorio: panel táctil como cross-fader para aplicaciones de DJ, captura de mouse para juegos y extensos atajos de teclado para usuarios avanzados.

## Teclado

La forma en que su aplicación responde a la entrada del teclado contribuye a una buena experiencia de escritorio. Hay tres tipos de entrada de teclado: [Navegación](#navegación),
[Uso de teclas](#keystrokes) y [Atajos](#atajos).

### Navegación

La navegación por teclado rara vez se implementa en aplicaciones táctiles, pero los usuarios lo
esperan cuando usan una aplicación y tienen las manos en el teclado.
También puede ser esencial para usuarios con necesidades de accesibilidad tanto en teléfonos
como en dispositivos de escritorio.

Para muchas aplicaciones, todo lo que se necesita es una simple navegación con teclas de flechas y navegación por pestañas, en su mayoría, el framework de Android lo maneja automáticamente. Por ejemplo, una vista de "Botón" se puede enfocar de forma predeterminada, y la navegación por teclado debería generalmente funcionarsin ningún código adicional. Para habilitar la navegación con el teclado para las vistas que no se pueden enfocar de forma predeterminada, los desarrolladores deben marcarlas como enfocables. Esto se puede hacer mediante programación o en XML, como se muestra a continuación. Consulte la documentación de [manejo de enfoque](https://developer.android.com/reference/android/view/View.html#FocusHandling) para obtener más información.

```kotlin {title="Kotlin" .code-figure}
yourView.isFocusable = true
```

Alternativamente, puede establecer el atributo `focusable` su archivo de layout:

```xml {title="XML" .code-figure}
android:focusable="true"
```

Una vez que el enfoque está habilitado, el marco de Android creará un mapa de navegación para todas las vistas enfocables en función de su posición. Por lo general, esto funciona como se espera y no se necesita más trabajo. Cuando el mapeo predeterminado no es correcto para las necesidades de una aplicación, se puede anular de la siguiente manera:

```kotlin {title="Kotlin" .code-figure}
// Teclas de flechas
yourView.nextFocusLeftId = R.id.view_to_left
yourView.nextFocusRightId = R.id.view_to_right
yourView.nextFocusTopId = R.id.view_above
yourView.nextFocusBottomId = R.id.view_below

// Tecla Tab
yourView.nextFocusForwardId = R.id.next_view
```

Es una buena práctica intentar acceder a cada parte de la funcionalidad de su aplicación
antes de cada lanzamiento usando solo el teclado. Debería ser fácil acceder a las acciones más comunes sin la entrada táctil o del mouse.

!!! aside.message--note
Recuerde, la compatibilidad con el teclado puede ser esencial para los usuarios con necesidades de accesibilidad.
!!!

### Uso de teclas {: #keystrokes}

Para la entrada de texto que se manejaría con un teclado virtual en pantalla
([IME](https://developer.android.com/guide/topics/text/creating-input-method)) como un `EditText`, las aplicaciones suelen comportarse como se espera en Chrome OS sin trabajo adicional por parte del
desarrollador. Para el uso de teclas que el framework no puede anticipar, las aplicaciones
deberán manejar el comportamiento por sí mismas. Esto es especialmente cierto para las aplicaciones
con vistas personalizadas.

Algunos ejemplos son las aplicaciones de chat que utilizan la tecla Enter para enviar un mensaje,
las aplicaciones multimedia que inician o detienen la reproducción con la tecla de espacio y los juegos que controlan el movimiento con las teclas [[w]], [[a]], [[s] ] y [[d]].

La mayoría de las aplicaciones anulan el evento
[onKeyUp](<https://developer.android.com/reference/android/view/KeyEvent.Callback#onKeyUp(int,%20android.view.KeyEvent)>)
y agregan el comportamiento esperado para cada código clave recibido, como se muestra a continuación.

```kotlin {title="Kotlin" .code-figure}
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

El uso de`onKeyUp` evita que las aplicaciones reciban múltiples eventos si una tecla se mantiene
presionada o se suelta lentamente. Los juegos y aplicaciones que esperan que los usuarios mantengan presionadas las teclas pueden buscar el evento
[onkeydown](<https://developer.android.com/reference/android/view/KeyEvent.Callback#onKeyDown(int,%20android.view.KeyEvent)>)

Dependiendo de las necesidades de una aplicación, sobreescribir `onKeyUp` para toda la Actividad
generalmente proporciona el comportamiento necesario. Si lo desea,un
[onKeyListener](https://developer.android.com/reference/android/view/View.OnKeyListener) se puede agregar) a una vista específica. Por ejemplo, una aplicación solo puede escuchar la tecla Enter en un
EditText específico, y no la Actividad, para implementar la funcionalidad enviar solo cuando el usuario está escribiendo en un cuadro de chat.

Cuando agregue compatibilidad con el teclado, siga la
[documentación de manejo del teclado](https://developer.android.com/training/keyboard-input/commands) de Android.

### Atajos

En los ambientes de escritorio se espera que atajos comunes como los basados en Ctrl, Alt, Shift. Si una aplicación no los implementa, la experiencia puede resultar frustrante y equivocada para los usuarios. Los usuarios avanzados también aprecian los accesos directos para las tareas específicas de la aplicación que se utilizan con frecuencia. Los accesos directos facilitan el uso de una
aplicación y la diferencian de las aplicaciones que no tienen accesos directos.

Algunos atajos comunes incluyen guardar ([[Ctrl]]+[[S]]), deshacer ([[Ctrl]]+[[Z]]) y
rehacer [[Ctrl]]+[[Shift]]+[[Z]]. Para ver un ejemplo de algunos accesos directos más avanzados, consulte la lista de [teclas de acceso directo del VLC Media Player](https://www.vlchelp.com/vlc-media-player-shortcuts/).

Los accesos directos se pueden implementar usando
[dispatchKeyShortcutEvent](<https://developer.android.com/reference/android/view/Window.Callback.html#dispatchKeyShortcutEvent(android.view.KeyEvent)>).
Esto intercepta todas las combinaciones de meta-teclas ([[Alt]], [[Ctrl]] y [[Shift]]) para undeterminado
código de tecla. Para verificar una meta-clave específica, use
[KeyEvent.isCtrlPressed](<https://developer.android.com/reference/android/view/KeyEvent#isCtrlPressed()>), [KeyEvent.isShiftPressed](<https://developer.android.com/reference/android/view/KeyEvent#isShiftPressed()>),
[KeyEvent.isAltPressed](<https://developer.android.com/reference/android/view/KeyEvent#isAltPressed()>)
o [KeyEvent.hasModifiers](<https://developer.android.com/reference/android/view/KeyEvent.html#hasModifiers(int)>).

La separación de código de acceso directo desde otras manipulaciones de pulsaciones de teclas (como `onKeyUp` o`onKeyDown`) puede hacer más fácil el mantenimiento del código y mantiene la aceptación por defecto de las meta-teclas sin tener que implementar manualmente los controles clave meta-en todos los casos. Permitir todas las combinaciones de meta-teclas también puede ser más conveniente para los usuarios que están acostumbrados a diferentes diseños de teclado y sistemas operativos.

```kotlin {title="Kotlin" .code-figure}
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

También puede implementar accesos directos en `onKeyUp` comprobando
[KeyEvent.isCtrlPressed](<https://developer.android.com/reference/android/view/KeyEvent#isCtrlPressed()>),
[KeyEvent.isShiftPressed](<https://developer.android.com/reference/android/view/KeyEvent#isShiftPressed()>)
o [KeyEvent.isAltPressed](<https://developer.android.com/reference/android/view/KeyEvent#isAltPressed()>)
de la misma manera que arriba. Esto puede ser más fácil de mantener si el meta-comportamiento
es más una modificación del comportamiento de una aplicación que un acceso directo. Por ejemplo, cuando [[W]] significa "caminar hacia adelante" y [[Shift]]+[[W]] significa "correr hacia adelante".

```kotlin {title="Kotlin" .code-figure}
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

## Compatibilidad con mouse y panel táctil {: #mouse-touchpad}

Chrome OS maneja automáticamente la mayoría de los eventos del mouse y del panel táctil para que actúen como eventos táctiles en un teléfono Android. Esto incluye el mouse/panel táctil con dos dedos y desplazamiento de la rueda del mouse. La mayoría de las aplicaciones solo necesitan manejar tres eventos centrados en el escritorio: [clic derecho](#clic-derecho), [flotar sobre elementos](#hover) y [arrastrar y soltar](#arrastrar-y-soltar).

### Clic derecho

Cualquier acción que cause que una aplicación muestre un menú contextual, como una pulsación larga en un elemento de la lista, también debería reaccionar a los eventos de clic derecho. Para manejar eventos de clic derecho las aplicaciones deben registrar un
[`View.OnContextClickListener`](https://developer.android.com/reference/android/view/View.OnContextClickListener). Para obtener detalles sobre la construcción de un menú contextual, consulte la [documentación del menú contextual](https://developer.android.com/guide/topics/ui/menus#context-menu) de Android.

```kotlin {title="Kotlin" .code-figure}
yourView.setOnContextClickListener {
  showContextMenu()
  true
}
```

!!! aside.message--note
**Nota:** cualquier vista que se haya registrado para un menú contextual usando [Activity.registerForContextMenu](<https://developer.android.com/reference/android/app/Activity#registerForContextMenu(android.view.View)>) debería funcionar automáticamente con la pulsación larga y el clic derecho sin la necesidad de registrar un listener de clic de contexto.
!!!

### Flotar sobre elementos {" #hover}

Los desarrolladores pueden hacer que los diseños de sus aplicaciones se sientan pulidos y más fáciles de usar manejando eventos de "hover" (flotar sobre elementos). Esto es especialmente cierto para las vistas personalizadas. Los dos ejemplos más comunes son:

- Indicar a los usuarios si un elemento tiene un comportamiento interactivo, como ser seleccionable o editable, cambiando el ícono del puntero del mouse
- Agregar comentarios visuales a los elementos en una lista o cuadrícula grande cuando el puntero se desplaza sobre ellos

```kotlin {title="Kotlin" .code-figure}
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

En un entorno de múltiples ventanas, los usuarios esperan poder arrastrar y soltar elementos
entre aplicaciones. Esto es cierto para los dispositivos Chrome OS, así como para dispositivos
tabletas, teléfonos y plegables en modo de pantalla dividida.

Los desarrolladores deben considerar si es probable que los usuarios arrastren elementos a su
aplicación. Algunos ejemplos comunes incluyen: los editores de fotos deben esperar recibir
fotos, los reproductores de audio deben esperar recibir archivos de audio y los programas de dibujo
deben esperar recibir fotos.

Para agregar soporte para arrastrar y soltar, siga la [documentación dearrastrar y soltar](https://developer.android.com/guide/topics/ui/drag-drop.html) de Android y eche un vistazo
a esta [Entrada de blog de Chrome OS](https://medium.com/androiddevelopers/android-on-chrome-os-implementing-drag-drop-2cc2bdcdc621).

**Consideraciones especiales para Chrome OS**

- Para el manejo de archivos desde la aplicación de Chrome OS Archivos, busque el tipo MIME `application/x-arco-uri-list`
- Recuerde que pedir permiso a través de `requestDragAndDropPermissions` para acceder a los elementos arrastrado desde fuera de la aplicación
- Un elemento debe tener la bandera `View.DRAG_FLAG_GLOBAL` para poder arrastrarlo a otras aplicaciones.

### Implemetación avanzada para punteros

Las aplicaciones que realizan un manejo avanzado de la entrada del mouse y del panel táctil deben seguir la documentación de Android para
[View.onGenericMotionEvent](<https://developer.android.com/reference/android/view/View#onGenericMotionEvent(android.view.MotionEvent)>)
y use [`MotionEvent.getSource()`](<https://developer.android.com/reference/android/view/MotionEvent#getSource()>)
para distinguir entre
[SOURCE_MOUSE](https://developer.android.com/reference/android/view/InputDevice#SOURCE_MOUSE) y
[SOURCE_TOUCHSCREEN](https://developer.android.com/reference/android/view/InputDevice#SOURCE_TOUCHSCREEN).

Examine el `MotionEvent` para implementar el comportamiento requerido:

- Movimiento genera eventos `ACTION_HOVER_MOVE`
- Botones generan eventos `ACTION_BUTTON_PRESS` y `ACTION_BUTTON_RELEASE`. También puede verificar el estado actual de todos los botones del mouse/trackpad usando `getButtonState ()`.
- El desplazamiento de la rueda del mouse genera eventos `ACTION_SCROLL`.

## Lápiz óptico {: #stylus}

Muchos Chromebooks están equipados con un stylus, y las aplicaciones de Android lo manejan como entrada de pantalla táctil.
Algunos dispositivos también pueden tener una mesa de dibujo USB o bluetooth, como la
[Wacom Intuos](https://www.wacom.com/en-us/products/pen-tablets/wacom-intuos).
Las aplicaciones de Android pueden recibir entrada bluetooth, pero no funcionan con entrada USB.

Un evento de lápiz se informa como un evento de pantalla táctil a través de
[View.onTouchEvent()](<https://developer.android.com/reference/android/view/View#onTouchEvent(android.view.MotionEvent)>)
o [View.onGenericMotionEvent()](<https://developer.android.com/reference/android/view/View#onGenericMotionEvent(android.view.MotionEvent)>)
y contiene un
[MotionEvent.getSource()](<https://developer.android.com/reference/android/view/MotionEvent#getSource()>)
de tipo [SOURCE_STYLUS](https://developer.android.com/reference/android/view/InputDevice#SOURCE_STYLUS).
El `MotionEvent` también contendrá datos adicionales:

- [MotionEvent.getToolType()](<https://developer.android.com/reference/android/view/MotionEvent#getToolType(int)>) devolverá [TOOL_TYPE_FINGER](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_FINGER), [TOOL_TYPE_STYLUS](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_STYLUS) o [TOOL_TYPE_ERASER](https://developer.android.com/reference/android/view/MotionEvent#TOOL_TYPE_ERASER) según la herramienta que hizo contacto con la superficie
- [MotionEvent.getPressure()](<https://developer.android.com/reference/android/view/MotionEvent#getPressure(int)>) informará la presión física aplicada al lápiz óptico, si es compatible
- [MotionEvent.getAxisValue()](<https://developer.android.com/reference/android/view/MotionEvent#getAxisValue(int,%20int)>) con [MotionEvent.AXIS_TILT](https://developer.android.com/reference/android/view/MotionEvent#AXIS_TILT) y [MotionEvent.AXIS_ORIENTATION](https://developer.android.com/reference/android/view/MotionEvent#AXIS_ORIENTATION) que se puede utilizar para leer la inclinación física y la orientación del lápiz, si es compatible

### Puntos históricos

Android recolecta los eventos de entrada en grupos y los entrega una vez por cuadro. Un lápiz óptico puede informar eventos a frecuencias mucho más altas que la pantalla. Al crear
aplicaciones de dibujo, es importante comprobar si hay eventos que puedan estar en el pasado reciente
mediante el uso de las `getHistorical` API:

- `MotionEvent.getHistoricalX()`
- `MotionEvent.getHistoricalY()`
- `MotionEvent.getHistoricalPressure()`
- `MotionEvent.getHistoricalAxisValue()`

### Rechazo de la palma

Chrome OS intenta reconocer cuando la palma de un usuario está apoyada en la
pantalla táctil. Sin embargo, esto no siempre es posible. A veces, un evento táctil se
puede informar a la aplicación antes de que el sistema operativo lo reconozca como una palma. En ese caso, los toques se cancelarán al informar un evento `ACTION_CANCEL`.

Este evento le dice a la aplicación que ciertos toques no son válidos y debería deshacer todas las
interacciones causadas por esos toques. Por ejemplo, una aplicación de dibujo puede
dibujar temporalmente nuevas líneas tan pronto como se reciben para proporcionar la más baja
latencia, pero solo las envía permanentemente al lienzo una vez que la serie táctil se
termina limpiamente. Si los eventos táctiles se cancelan mientras tanto, las líneas temporales se pueden borrar fácilmente.

!!! aside.message--note
**Nota:** Una forma de reducir los eventos extraños de la palma y de los dedos en las aplicaciones de dibujo y de escritura es proporcionar una configuración de interfaz de usuario que deshabilite el dibujo a través del tacto y solo use eventos de lápiz óptico para dibujar cuando está en este modo.
!!!

### Aplicaciones para tomar notas

Chrome OS tiene un intent especial que muestra las aplicaciones registradas para tomar notas a los
usuarios. Para registrar una aplicación como aplicación para tomar notas, agregue lo siguiente al
AndroidManifest.xml:

```xml {title="XML" .code-figure}
  <intent-filter>
    <action android:name="org.chromium.arc.intent.action.CREATE_NOTE" />
    <category android:name="android.intent.category.DEFAULT" />
  </intent-filter>
```

Cuando se registra una aplicación, el usuario puede seleccionarla como la aplicación predeterminada para tomar notas. Cuando se solicita una nueva nota, la aplicación debe crear una nota vacía lista
para la entrada con lápiz. Cuando el usuario desea anotar una imagen (como una captura de pantalla o una imagen descargada), la aplicación se inicia con `ClipData` que contiene uno
o más elementos con `content://` URI. La aplicación debe crear una nota que use la
primera imagen adjunta como imagen de fondo y entrar en un modo en el que el usuario pueda
dibujar con un lápiz.

#### Hacer prueba de intents para tomar notas sin lápiz óptico

Para probar si una aplicación responde correctamente a los intents de tomar notas sin un
lápiz óptico activo, use el siguiente método para mostrar las opciones de tomar de notas:

1. [Cambie al modo de desarrollo y haga el dispositivo se puede escribir](https://chromium.googlesource.com/chromiumos/docs/+/refs/heads/master/developer_mode.md)
2. Presione [[Ctrl]]+[[Alt]]+[[F2]] para abrir una terminal
3. Ejecute el comando `sudo vi / etc / chrome_dev.conf`
4. Presione `i` para editar y agregar`--ash-enable-palette` a una nueva línea al final del archivo
5. Guarde presionando Esc y luego escribiendo:, w, q y presionando Enter
6. Presione [[Ctrl]]+[[Alt]]+[[F1]] para volver a la interfaz de usuario normal de Chrome OS
7. Cerrar sesión y volver a ingresar

Ahora debería haber un menú de lápiz en el estante:

- Toque el botón del lápiz en el estante y elija **Nota nueva**. Esto debería abrir una nota de dibujo en blanco
- Tome una captura de pantalla. Desde el estante, seleccione **botón del lápiz óptico > Capturar pantalla** o descargue una imagen. Debería haber la opción de "Anotar imagen" en la notificación. Esto debería iniciar la aplicación con la imagen lista para ser anotada.

## Controladores de juegos {: game-controllers}

Los Chromebook admiten hasta cuatro controladores de juegos. Los desarrolladores deben usar
las [API estándar de Android para controladores de juegos](https://developer.android.com/training/game-controllers) para manejarlos.

Los botones se asignan a valores comunes siguiendo un
[mapeo común](https://developer.android.com/training/game-controllers/controller-input#button).
Desafortunadamente, no todos los fabricantes de controladores de juegos siguen las mismas
convenciones de mapeo. Puede proporcionar una experiencia mucho mejor si permite a los usuarios
seleccionar diferentes asignaciones de controladores populares.

## Modo de traducción de entrada

Chrome OS habilita un modo de traducción de entrada de forma predeterminada. Para la mayoría de las aplicaciones de Android, este modo ayuda a que las aplicaciones funcionen como se espera en un entorno de escritorio. Algunos ejemplos incluyen la habilitación automática del desplazamiento con dos dedos en el panel táctil, el desplazamiento de la rueda del mouse y la asignación de coordenadas de pantalla sin procesar a coordenadas de ventana. Generalmente, los desarrolladores de aplicaciones no necesitan implementar ninguno de estos comportamientos por sí mismos.

Si una aplicación implementa un comportamiento de entrada personalizado, por ejemplo, la definición de una acción de pellizco (pinch) con dos dedos del panel táctil o estas traducciones de entrada no proporcionan los eventos de entrada que espera la aplicación, puede deshabilitar el modo de traducción de entrada agregando la siguiente etiqueta a AndroidManifest.xml:

```xml {title="XML" .code-figure}
<uses-feature
  android:name="android.hardware.type.pc"
  android:required="false" />
```
