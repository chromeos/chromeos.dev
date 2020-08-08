---
title: 'Android en general: cómo llevar experiencias optimizadas a la pantalla grande'
metadesc: 'Descubra cómo crear excelentes experiencias para los dispositivos con pantallas más grandes: tabletas, plegables, computadoras portátiles y dispositivos de escritorio'
tags:
  - técnico
  - tendencia
  - pantalla grande
  - gestión de ventanas
  - dispositivos de entrada
  - modo de dispositivo
  - soporte para mouse
  - android
  - android studio
authors:
  - kennethford
hero:
  image: /images/posts/android-at-large/hero.jpg
  alt: Diseño que muestra varios dispositivos Android y equipos de tamaño variable.
date: 2020-04-21
---

_Este artículo apareció originalmente en Android Developers Medium._

Para muchas personas, Android es sinónimo de teléfonos inteligentes, lo que no es sorprendente teniendo en cuenta que más de 2.500 millones de usuarios ejecutan Android en dispositivos de teléfonos inteligentes. Sin embargo, los dispositivos Android ahora vienen en muchas formas, tamaños y capacidades diferentes: desde dispositivos portátiles y dispositivos de acondicionamiento físico hasta automóviles, computadoras portátiles y televisores.

![Conjunto de dispositivos Android](/images/posts/android-at-large/android-devices.jpg)

En este artículo, analizamos cómo crear excelentes experiencias para los dispositivos con pantallas más grandes: tabletas, plegables, computadoras portátiles y dispositivos de escritorio. Cubriemos:

- Consideraciones de UI y UX
- Continuidad de la aplicación
- Entornos de ventanas múltiples
- Entornos de pantallas múltiples
- Pruebas

## Un cambio de paradigma

Cuando se trata de preparar su aplicación para pantallas más grandes, no es solo el tamaño de pantalla que debe tener en cuenta. Los dispositivos con pantalla más grandes afectan la forma en que las personas usan su aplicación, cómo interactúan con la interfaz de usuario y el enfoque que le dan a sus aplicaciones.

Las personas usan un teléfono inteligente para realizar acciones rápidas, generalmente mientras están en movimiento, en modo vertical, interactuando con la interfaz de usuario a través del tacto. Los usuarios de teléfonos inteligentes rara vez conectan una segunda pantalla, teclado y mouse a su teléfono.

El factor de forma de la tableta no es tan móvil: no vemos personas corriendo por las ciudades en sus tabletas. Los usuarios generalmente realizan acciones más complejas en tabletas, pasan más tiempo en una aplicación y, por lo general, trabajan en horizontal. Sin embargo, la interacción de la interfaz de usuario sigue siendo táctil.

Abarcando ambos de estos paradigmas de interacción están los dispositivos plegables. Si bien aplicará en gran medida los aprendizajes de los dispositivos como teléfonos inteligentes y tabletas, los plegables presentan el desafío de las relaciones de aspecto extremas, de 21 a 9 cuando se pliegan a casi 1 a 1 cuando se despliegan.

En entornos de escritorio tenemos las pantallas más grandes, los usuarios interactúan con las aplicaciones durante más tiempo, enfocados en lograr tareas específicas. También el uso es primero con el teclado y el trackpad. Algunos dispositivos no tienen pantallas táctiles, por lo que muchas de las suposiciones sobre cómo las personas interactúan con una interfaz de usuario ya no son válidas. Este entorno es sobre todo en modo horizontal. Los usuarios también tienen expectativas de otros entornos de escritorio, particularmente la capacidad de usar múltiples ventanas donde las aplicaciones pueden redimensionarse a voluntad para tomar casi cualquier orientación o relación de aspecto.

Entonces, en comparación con la versión de su teléfono inteligente, al pensar en cómo manejar diferentes tamaños de pantalla y relaciones de aspecto, deberá considerar nuevos diseños y patrones de navegación, y los recursos para respaldarlos.

## Consideraciones de UX y UI

### Manejar diversas relaciones de aspecto

En los dispositivos donde su aplicación ocupa toda la pantalla, los dispositivos de pantalla grande significan que necesita permitir relaciones de aspecto desde 1 a 1 hasta 21 por 9. En los dispostivos de escritorio, los usuarios pueden aplicar relaciones de aspecto aún más extremas. Por ejemplo una aplicación de comunicación, los usuarios pueden colocarla en una ventana alta y estrecha en el borde de la pantalla para que puedan ver y responder mensajes mientras trabajan con otra aplicación que ocupa el resto de la pantalla.

No hay una bala mágica para abordar esta diversidad de relaciones de aspecto, tendrá que probarlas y respaldarlas de la mejor manera posible.

Sin embargo, si el contenido de su aplicación no es adecuado para ciertas relaciones de aspecto, use el indicador `minAspectRatio` , introducido en Android 10, o el indicador [`maxAspectRatio`](https://developer.android.com/guide/topics/manifest/activity-element.html#maxaspectratio) para restringir su aplicación dentro de relaciones de aspecto factibles.

### Patrones de navegación

Los patrones de navegación pueden romperse cuando comienzas a admitir una variedad de dispositivos diferentes. Por ejemplo, tome la navegación inferior, aquí en una aplicación simple de visor de fotos.

![Navegación inferior en un entorno de teléfono y escritorio](/images/posts/android-at-large/bottom-navigation.jpg)

Esta navegación funciona bien en teléfonos inteligentes. Es fácil saber dónde están los objetivos táctiles, dónde termina un elemento y dónde comienza el otro. Sin embargo, cuando se ejecuta en un entorno de escritorio, con una pantalla amplia, se hace difícil determinar dónde terminan los elementos y qué es accionable.

Para pantalla grande, un mejor enfoque es colocar opciones en el lado izquierdo de la pantalla. Si alguien está usando su aplicación en una tableta, esta posición coloca las opciones cerca de donde su mano sostiene el dispositivo, haciendo que la selección sea más conveniente.

![Navegación del lado izquierdo en el entorno de escritorio](/images/posts/android-at-large/left-navigation.jpg)

La navegación del lado izquierdo también es un paradigma al que las personas están acostumbradas desde las páginas web.

### Diseños de pantalla

El ejemplo del visor de fotos muestra que cuando simplemente reutiliza el diseño de un teléfono inteligente en pantallas anchas, las listas de elementos dejan mucho espacio en blanco. Hacer un mejor uso del espacio no significa aplicar un patrón de detalles maestros y agregar tanto contenido en la pantalla como sea posible. Se debe pensar en formas de mostrar más información o hacer que las tareas sean más eficientes.

Por ejemplo, los elementos de opción en un menú que se desborda podrían mostrarse. Entonces, en lugar de tener que hacer tres toques para editar, las personas pueden seleccionar esa opción directamente ahora que hay espacio para colocarla allí.

![Extrajo el menú de opciones que muestra todas las opciones en el espacio extra de la pantalla.](/images/posts/android-at-large/pulled-out-options-menu.jpg)

Las pantallas más grandes también permiten ofrecer experiencias más inmersivas. Por ejemplo, en una aplicación de visualización de medios o productividad, hay muchas más formas de mantener a las personas comprometidas. Sin embargo, vale la pena señalar que no hay una solución única para usar este espacio adicional.

Mientras tanto, vale la pena echarle un vistazo a los [Estudios de Material Design en](https://material.io/design/material-studies/about-our-material-studies.html) busca de inspiración. El equipo de Material Design ha creado estudios de diseño para varios productos con maquetas de diseño completas.

Uno de los estudios es [Reply](https://material.io/design/material-studies/reply.html) , un cliente de correo electrónico creado con objetivos diseñados de claridad, legibilidad, intuición y facilidad de uso al proyectar amabilidad y competencia para su marca.

![Aplicación de respuesta en varios tamaños de pantalla.](/images/posts/android-at-large/reply-various-screen-sizes.jpg)

En este estudio, el contenido del mensaje no cambia significativamente entre los distintos tamaños de pantalla. Sin embargo, la navegación cambia de una navegación inferior en el diseño del teléfono inteligente a un cajón de navegación en pantallas más grandes, que aparece de forma predeterminada en las pantallas más grandes.

Este ejemplo muestra cómo el espacio extra en pantallas más grandes no necesita sobrecargarse con información adicional, pero el espacio en blanco se puede usar para facilitar la lectura del contenido.

Otro estudio es [Rally](https://material.io/design/material-studies/rally.html) , una aplicación financiera, que está diseñada para mostrar la mayor cantidad de información posible para que los usuarios puedan ver rápidamente lo que necesitan para tomar decisiones sobre sus finanzas, y luego salir y seguir con su vida.

![Aplicación de rally en varios tamaños de pantalla.](/images/posts/android-at-large/rally-various-screen-sizes.jpg)

### Patrones de entrada

A medida que los dispositivos se mueven hacia el escritorio, es menos probable que el medio de entrada utilizado sea táctil. La entrada puede ser a través de un lápiz óptico o mouse y teclado. Por lo tanto, debe considerar cómo incorporar algunos de los paradigmas de entrada que ve en las plataformas de escritorio a su aplicación.

Por ejemplo, considere manejar las acciones de hacer clic con el botón derecho (contexto), lo que hace estableciendo un `contextClickListener` y asignando el comportamiento de pulsación larga a los clics con el botón derecho.

Otra técnica útil para ayudar a mostrar a las personas que las cosas son accionables son las acciones de desplazamiento. Por ejemplo, puede cambiar los colores o la elevación al pasar el cursor sobre los elementos de acción utilizando `setOnHoverListener` esta manera:

```kotlin
yourView.setOnHoverListener{ view, motionEvent ->
  when (motionEvent.actionMasked) {
    MotionEvent.ACTION_HOVER_ENTER -> {
      // UI change to highlight item
    }
    MotionEvent.ACTION_HOVER_EXIT -> {
      // Undo highlight
    }
  }
}
```

O actualice el puntero del mouse, por ejemplo, para cambiarlo a un icono de mano para indicar una función de agarrar o seleccionar. Esta es una implementación simple de una línea:

```kotlin
yourView.setOnHoverListener { view, motionEvent ->
 // Change to the hand icon that users expect when
 // hovering over something actionable
 View.pointerIcon =
   PointerIcon.getSystemIcon(context, PointerIcon.TYPE_HAND)
 false
}
```

### Continuidad de la aplicación

La continuidad de la aplicación es la capacidad de una aplicación para restaurar sin problemas el estado del usuario cuando recibe un cambio de configuración, por ejemplo, asegurándose de que esté en la misma posición de edición en el texto o en la ubicación de reproducción en un video.

En los teléfonos inteligentes, el caso principal, la rotación, generalmente se basa en el contexto, como cambiar a modo horizontal para ver un video. En dispositivos de pantalla más grande, con su soporte para múltiples ventanas, el enfoque para la continuidad de la aplicación se convierte en la necesidad de volver a dibujar y rediseñar su aplicación con un mínimo de distorción. En esta animación, la aplicación Play Store pasa de una ventana más pequeña con una navegación inferior a una ventana grande con navegación del lado izquierdo.

![Transición de aplicaciones sin problemas en teléfonos plegables](/images/posts/android-at-large/foldables.gif)

Para lograr una transición sin problemas, asegúrese de que sus métodos onCreate y ciclo de vida se puedan reciclar rápidamente. Para hacer esto, asegúrese de no realizar operaciones de red o lecturas de memoria grandes en esos métodos. Además, este tipo de tareas realizadas con esos métodos a menudo provocan bloqueos, lo que genera una mala experiencia del usuario.

El indicador [`resizeableActivity`](https://developer.android.com/guide/topics/manifest/activity-element.html#resizeableActivity) es un indicador de manifiesto introducido para indicar si una aplicación admite entornos de múltiples ventanas y pantallas. Sin embargo, establecer esto en falso no significa que su actividad nunca necesite cambiar de tamaño. Por ejemplo, en un dispositivo plegable, si alguien despliega el dispositivo, debe manejar los cambios de configuración correctamente y asegurarse de que está restaurando el estado correcto.

Pero, si tiene una actividad configurada para que no se pueda cambiar su tamaño y su orientación esté bloqueada, el nuevo modo de compatibilidad en Android 10 ayuda a garantizar que su aplicación no tendrá un cambio de configuración cuando se despliegue un dispositivo.

![Actividad que se ejecuta en modo compat en dispositivo plegable cuando se despliega](/images/posts/android-at-large/folded-to-unfolded.jpg)

En el modo de compatibilidad, en la esquina inferior derecha, hay un botón de reinicio de actividad o aplicación para que el usuario reinicie la aplicación. Este botón permite que su aplicación obtenga la nueva configuración global y dibuje en la pantalla disponible.

### Manejo de cambios de configuración

Cuando un dispositivo es desplegado, las aplicaciones obtienen cambios de configuración para `smallestScreenSize`, `screenSize`, y `screenLayout`. Si su código no está manejando estos casos, su código debería de usar `onSaveInstanceState` y `ViewModel`'s para guardar los datos de la aplicación y el estado del usuario durante los cambios de configuración.

Si está siendo manejado desde su manifiesto, recibirá una devolución de llamada para `handleConfigChange` y podrá intercambiar diseños o recursos.

Para la mejor experiencia, debe declarar que `resizeableActivity` es `true` en su manifiesto. Y, se recomienda que permita que el SO maneje tantos cambios de configuración como sea posible, dada la cantidad de casos extremos en los que puede perder algo, como intercambiar recursos por diferentes densidades de visualización.

## Multi-ventana

### Multi-reanudado

En dispositivos con pantallas grandes, las personas desean usar aplicaciones en paralelo en un entorno de múltiples ventanas. Android 10 introduce un cambio importante para administrar este tipo de entorno: reanudación múltiple.

Antes de Android 10, en un entorno de múltiples ventanas, solo una de las actividades visibles está en el estado `RESUMED` . Esto puede ser confuso para el usuario, ya que no hay una indicación visual de qué actividad se `RESUMED` .

Con la reanudación múltiple, todas las actividades visibles están en el estado `RESUMED` . Sin embargo, las aplicaciones aún pueden terminar en un estado `PAUSED` donde, por ejemplo, una actividad transparente está encima de la actividad o la actividad no es enfocable, como en una imagen en imagen.

Este cambio se ha realizado de una manera que minimiza las alteraciones que se deben realizar: en la mayoría de los casos, no debe haber cambios necesarios para que su aplicación funcione en múltiples reanudaciones. Sin embargo, es posible que deba realizar cambios en los recursos que solo pueden manejar el acceso exclusivo.

![Tres actividades que desean usar la cámara en el mismo dispositivo](/images/posts/android-at-large/multiple-camera-activities.jpg)

Por ejemplo, si hay tres actividades que desean utilizar la cámara, solo una puede acceder a la cámara. En este caso, debe manejar la devolución de llamada `onDisconnect` desde la cámara y escuchar la disponibilidad de la cámara. Tenga en cuenta que establecer `resizeActivity` en `false` no garantizará el acceso a estos recursos porque puede tener una actividad flotante encima de su actividad o una pantalla secundaria con una actividad que quiera usar la cámara.

Android 10 presenta una nueva devolución de llamada, [`onTopResumedActivityChanged`](<https://developer.android.com/reference/android/app/Activity.html#onTopResumedActivityChanged(boolean)>) , donde se notifica la actividad cuando se reanuda la "parte superior".

```kotlin
protected void onTopResumedActivityChanged(boolean topResumed) {
  if (topResumed) {
    // Top Resumed activity
    // Can be a signal to re-acquire exclusive resources
  } else {
    // No longer the top resumed activity
  }
}
```

Esto se traduce al estado `RESUMED` para Android 9 y versiones anteriores.

### Arrastrar y soltar

Arrastrar y soltar no es una característica nueva en Android, pero es algo que tiene mucho sentido cuando se trabaja en un entorno de ventanas múltiples. Especialmente para aplicaciones de productividad, los usuarios quieren usar arrastrar y soltar para texto e imágenes.

Como puede implicar agregar arrastrar y soltar, le recomendamos que consulte la [guía para desarrolladores de Android sobre arrastrar y soltar](https://developer.android.com/guide/topics/ui/drag-drop) , donde puede encontrar documentación completa y algunos ejemplos de código excelentes.

## Más información

Hemos cubierto mucho terreno en este artículo y revisado la mayoría de las cosas clave que debe hacer para que su aplicación funcione en pantallas más grandes. Obtenga más información en la [guía plegable de desarrolladores de Android](https://developer.android.com/guide/topics/ui/foldables) o [comience a crear aplicaciones para ChromeOS](/%7B%7Blocale.code%7D%7D/android) .

Para obtener más información, sintonice el episodio del [podcast de aplicaciones, juegos e ideas](https://developer.android.com/podcasts/apps-games-insights) [_Construir para pantallas más grandes y mejores experiencias de juego_](http://appsgamesinsights.googledevelopers.libsynpro.com/building-for-larger-screens-and-better-game-experiences-episode-7?linkId=86702316) con las ideas del desarrollador de juegos Gameloft.
