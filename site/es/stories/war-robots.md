---
title: Pixonic aumentó la participación en un 25% en Chrome OS al optimizar para pantallas grandes
metadesc: Más de 100,000 jugadores ya han jugado War Robots, promediando sesiones más largas en Chromebooks comparado con otros dispositivos Android, gracias a solo dos semanas de un equipo de 5 miembros.
date: 2019-11-01
app:
  name: Robots de guerra
  logo: ix://stories/war-robots/war-robots-icon.240.png
  company: Pixonic
hero:
  image: ix://stories/war-robots/hero.1500.jpg
  alt: Juego de robots de guerra.
  position: center
tags:
  - juegos
  - soporte para teclado
  - soporte para mouse
  - soporte para pantalla táctil
  - configuración de dispositivo
---

[Pixonic](https://play.google.com/store/apps/details?id=com.pixonic.wwr) , un equipo de desarrolladores de videojuegos con sede en Moscú, se enorgullece de aprovechar todas las oportunidades para actualizar sus aplicaciones móviles y llegar a un público aún más amplio de jugadores. Uno de los títulos más conocidos de la compañía es [War Robots](https://play.google.com/store/apps/details?id=com.pixonic.wwr&hl=en_US) , una experiencia de jugador contra jugador (PvP) de 12 personas donde los jugadores operan y se enfrentan en duelos con robots personalizados en un campo de batalla en vivo.

Lanzado en 2014, War Robots fue diseñado originalmente para dispositivos de primera generación de Android con movimiento basado en touchpad y sin entrada de mouse. El equipo de Pixonic, siendo ávidos jugadores, reconoció que la aplicación necesitaba algunas modificaciones para ofrecer una excelente experiencia de usuario en una gama más amplia de dispositivos, como computadoras portátiles y tabletas. War Robots ya se podía reproducir en cualquier dispositivo Android, ya que los [Chromebook ejecutan una versión completa de Android](/{{locale.code}}/posts/expand-your-app-beyond-mobile-to-reach) dentro de un contenedor. Al realizar algunos ajustes de codificación más, Pixonic pudo aprovechar las capacidades completas de Chrome OS.

Así es como el equipo de Pixonic optimizó War Robots para una experiencia óptima en pantallas más grandes.

## Que hicieron

Para comenzar las optimizaciones, Pixonic agregó una etiqueta de metadatos en AndroidManifest.xml que le dice al sistema que está listo para la compatibilidad total con Chrome OS y que necesita deshabilitar la emulación táctil:

```xml {title="Sample XML" .code-figure}
<uses-feature android:name="android.hardware.type.pc" android:required="false" />
```

Pixonic también configuró el minSdk de la aplicación en 24 para que el motor de juegos Unity pueda recibir directamente los clics del mouse y todos los eventos API relacionados con el movimiento (no solo los eventos del panel táctil).

### ![](ix://icons/keyboard.png) {.icon--rounded} Soporte para teclado y mouse

En juegos PvP en tercera persona como War Robots, moverse y apuntar es mucho más fácil usando un teclado y un mouse, especialmente en dispositivos de pantalla más grande. Entonces, el siguiente paso fue reescribir el código para el teclado y el mouse para el modo de batalla del juego, manteniendo los controles de la pantalla táctil.

Para proporcionar los controles correctos en el momento adecuado, el equipo de Pixonic escribió un nuevo código para verificar el modo de juego actual del usuario:

```java {title="Sample Java" .code-figure}
@Override
public void onConfigurationChanged(Configuration newConfig) {
    boolean hasQwertyKeyboard = newConfig.keyboard == Configuration.KEYBOARD_QWERTY && newConfig.hardKeyboardHidden == Configuration.HARDKEYBOARDHIDDEN_NO;
    try {
        UnityPlayer.UnitySendMessage("Receiver", "ConfigChange", new JSONObject().put("keyboard", hasQwertyKeyboard).toString());
    } catch (JSONException e) {
        e.printStackTrace();
    }
}
```

Si se detecta un teclado QWERTY, el juego se adapta al modo de escritorio. El joystick de movimiento en la esquina inferior izquierda desaparece, y todas las acciones disponibles (como ordenar armas, habilidades y menús) se etiquetan con atajos de teclado.

#[War Robots en modo portátil.](ix://stories/war-robots/war-robots-1.1500.jpg [Una computadora portátil que muestra el juego de War Robots.])

Si no se detecta un teclado, el joystick de movimiento aparece en la esquina inferior izquierda, y los atajos de teclado están ocultos en los botones del menú inferior derecho.

#[War Robots en el modo de juego de tableta / móvil.](ix://stories/war-robots/war-robots-2.1500.jpg [Un dispositivo de tableta que muestra el juego de robots de guerra.])

Luego, Pixonic quería asegurarse de que el cursor permanezca oculto cuando un jugador usa su mouse para girar la cámara. Al apuntar a Android 7.0 (API nivel 24) o superior, el equipo podría establecer cualquier ícono de puntero. En este caso, el equipo utilizó un mapa de bits transparente para hacer que el cursor sea invisible durante el juego:

```java {title="Sample Java" .code-figure}
public boolean setPointerVisibility(boolean visible) {
    View = activity.findViewById(android.R.id.content);
    view.setPointerIcon(PointerIcon.getSystemIcon(activity, visible ? PointerIcon.TYPE_DEFAULT : PointerIcon.TYPE_NULL));
}
```

Esto aseguró que el cursor estaría deshabilitado e invisible cuando todas las demás ventanas estén cerradas y haya una batalla en curso. Si aparece alguna ventana emergente, como el menú de pausa, Pixonic hace visible el cursor y muestra su icono predeterminado.

### ![](ix://icons/videogame.png) {.icon--rounded} Adaptación de tutoriales y mecánica de juego

Para una mejor experiencia de usuario, Pixonic también escribió un nuevo código para mostrar diferentes tutoriales de juego basados en el modo de dispositivo actual del usuario. Si un jugador cambia entre el juego de la tableta y la computadora portátil durante la batalla y aún no ha visto un tutorial para el modo diferente, el tutorial se muestra antes de que se reanude el juego.

#[Tutoriales de juego en modo portátil con entrada de teclado y mouse.](ix://stories/war-robots/war-robots-3.1500.jpg [Dos computadoras portátiles que muestran el juego de War Robots con entrada de teclado y mouse.])

#[Tutorial de juego en modo tableta con controles de pantalla táctil.] (ix://stories/war-robots/war-robots-4.1500.jpg [Un dispositivo de tableta con pantalla táctil que muestra el juego de robots de guerra.])

Cuando los jugadores están en modo portátil, Pixonic también deshabilita el control de la cámara con pantalla táctil (ya que los jugadores controlarán la cámara con un mouse) mientras todos los botones del juego funcionan como de costumbre. Para diferenciar los toques de los movimientos del mouse, el equipo usa la propiedad `Input.touchCount` (en los scripts de Unity):

```java {title="Sample Java" .code-figure}
if (Input.touchCount > 0) {
  // this is screen touch event
} else {
  // this is mouse (touchpad) event
}
```

### ![](ix://icons/dynamic_feed.png) {.icon--rounded} Soporte para múltiples ventanas

Para el paso final, Pixonic quería asegurarse de que el juego no se bloqueara en modo de pantalla completa cuando se lanzó. Al habilitar el juego en ventanas en Chrome OS, los usuarios pueden ver simultáneamente sus transmisores favoritos mientras juegan, actualizar sus robots mientras leen sobre nuevas habilidades en el [sitio web del juego](https://warrobots.com/) o ver una batalla en modo pasivo mientras miran un video por separado.

Para hacer esto, Pixonic marcó `UnityPlayerActivity` como redimensionable:

```xml {title="Sample XML" .code-figure}
<activity android:name="com.unity3d.player.UnityPlayerActivity" ....
android:resizeableActivity="true">
```

Teniendo en cuenta que la interfaz del juego solo parece jugable en un cierto rango de dimensión, el equipo estableció los tamaños mínimos de ventana admitidos:

```xml {title="Sample XML" .code-figure}
<activity … >
    <layout android:gravity="center" android:minHeight="800dp" android:minWidth="1200dp" />
</activity>
```

Para el juego más inmersivo, Pixonic utilizó metaetiquetas para establecer el modo de pantalla completa como predeterminado y la orientación horizontal como deseable.

```xml {title="Sample XML" .code-figure}
<application>
    <meta-data android:name="WindowManagerPreference:FreeformWindowSize" android:value="maximize" />
    <meta-data android:name="WindowManagerPreference:FreeformWindowOrientation" android:value="landscape" />
    ….
</application>
```

#[War Robots lanzado en modo ventana.](ix://stories/war-robots/war-robots-5.1500.jpg [Una computadora portátil abierta que muestra el tablero de War Robots.])

Estas optimizaciones también aseguraron que el juego no se detuviera y que el HUD de batalla se escalara en consecuencia a medida que los jugadores expanden y reducen sus ventanas de juego.

## Resultados

Gracias a una extensa biblioteca de [recursos en línea](/{{locale.code}}/android/) , todo el proceso llevó al equipo de desarrollo de cinco miembros de Pixonic en solo dos semanas.

Más de 100,000 jugadores ya han jugado War Robots en Chrome OS desde que Pixonic lanzó las últimas optimizaciones. Debido a que el juego ahora puede aprovechar el espacio adicional en pantallas más grandes, las batallas de War Robots son aún más inmersivas y atractivas que antes. De hecho, las sesiones de usuario son un 25% más largas en Chromebooks en comparación con otros dispositivos Android. Los comentarios iniciales han sido increíblemente positivos, y algunos jugadores incluso han notado que el juego optimizado para Chromebook funciona mejor que el emulador de BlueStacks.

Con base en su éxito, los desarrolladores de Pixonic planean actualizar los gráficos de War Robots en todos los dispositivos Android para que el juego se acerque aún más a una experiencia de calidad de PC.

Consulte algunas de las mejores prácticas para [optimizar sus aplicaciones para Chrome OS](/{{locale.code}}/android/optimizing) .
