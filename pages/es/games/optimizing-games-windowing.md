---
title: Pantallas grandes y pantallas externas.
metadesc: Gestión de ventanas para juegos en Chrome OS
date: 2020-06-16
weight: -7
---

Una de las ventajas más obvias de los dispositivos Chrome OS son sus grandes y hermosas pantallas y la facilidad con la que puede usar monitores externos. Tanto el espacio en la pantalla ofrece un gran potencial para los juegos, pero usarlo bien puede requerir un poco más de reflexión y diseño.

## Cambios de orientación y configuración.

Algunas aplicaciones móviles están diseñadas específicamente para teléfonos pequeños y tienen la orientación bloqueada en vertical. Esto ofrece algunas victorias aparentemente rápidas al reducir la cantidad de cambios de configuración que el juego probablemente recibirá y al reducir la cantidad de diferentes diseños necesarios. Sin embargo, puede haber algunas sorpresas ocultas con esta opción: al elegir no manejar los cambios de orientación, muchas aplicaciones no estarán preparadas para otros cambios de configuración, como el cambio de tamaño de la ventana, el archivo adjunto del teclado, las pantallas externas, etc. Esto puede causar bloqueos y reinicios inesperados, Consulte los [cambios en tiempo de ejecución](https://developer.android.com/guide/topics/resources/runtime-changes?hl={{locale.code}}) para obtener más información. Si bien estos cambios también ocurren en dispositivos telefónicos, ocurren con frecuencia en dispositivos plegables y Chrome OS y deben manejarse bien.

Además, en dispositivos de pantalla grande con pantallas horizontales o plegables con relaciones de aspecto más cuadradas, los juegos con orientaciones de retrato fijas aparecerán con grandes barras negras en el lateral.

Algunos otros juegos de teléfono primero pueden optar por bloquear sus aplicaciones en modo horizontal. Los usuarios de tabletas o convertibles se verán obligados a mantener el dispositivo en la orientación horizontal, lo que puede parecer más agresivo que en un teléfono y degradar la experiencia de su juego. Para tabletas y convertibles de pantalla grande, es posible que el juego tenga suficiente espacio en modo vertical. Para ciertas personas, puede ser más cómodo sostener el dispositivo en esa orientación, lo que les permite interactuar con su juego durante períodos de tiempo más largos.

Dependiendo del alcance y la madurez de sus juegos, hay diferentes formas de abordar esto. Idealmente, su juego podría ajustarse dinámicamente a diferentes tamaños de pantalla, ofreciendo una experiencia inmersiva mejorada para usuarios con pantallas más grandes. Otro enfoque es encontrar formas creativas de llenar el espacio negro vacío con información útil como estadísticas, mapas o ventanas de chat o, de lo contrario, incluir imágenes relevantes para el juego como fondo en lugar de negro que proporcionen un marco más agradable para el juego principal.

Cuando sea posible, permita que sus usuarios usen su aplicación en ambas orientaciones, donde el tamaño de la pantalla lo permita.

### Ejemplo 1

Un juego de rompecabezas es un juego para Android maduro que fue diseñado para teléfonos con retrato. En grandes pantallas de paisaje, se ejecuta con barras negras en el lateral. Debido a que el juego tenía una gran base de usuarios activos y el desarrollador se está enfocando en su próximo título, optaron por agregar una imagen de enfoque suave al fondo para cada nivel y menú para enmarcar el juego, sin requerir una reescritura de la interfaz de usuario. Debido a que están en desarrollo activo para el próximo juego, el desarrollador está incluyendo soporte horizontal en el nuevo título.

### Ejemplo 2

Un juego de carreras de autos diseñado para dispositivos móviles está bloqueado en modo horizontal, para optimizar el espacio de la pantalla para los teléfonos. Últimamente, los usuarios de tabletas y Chrome OS se han quejado de que es difícil de jugar y han pedido soporte para retratos. El desarrollador incluye una verificación del tamaño de la pantalla en su código, y si la pantalla es lo suficientemente grande, se permite el modo vertical. Para permitir la vista amplia requerida para el juego, el contenido se coloca en el centro de la pantalla mientras aparece una barra adicional de interfaz de usuario para el estéreo del automóvil en la parte inferior de la pantalla que permite a los usuarios cambiar fácilmente la estación de radio y el mapa y las estadísticas de carrera se mueven a la parte superior de la pantalla, liberando la vista del parabrisas y mejorando el juego.

Visite también [las guías para Android en pantallas grandes](/{{locale.code}}/android/design) y [documentación para tamños de pantalla de Android](https://developer.android.com/training/multiscreen/screensizes).

## Capacidad de múltiples ventanas

Los juegos a menudo brindan a los usuarios una experiencia inmersiva de pantalla completa. Sin embargo, a algunos usuarios en equipos de escritorio o plegables les gusta tener servicios de transmisión de chat, música o video abiertos y visibles al mismo tiempo en una ventana separada. Si están grabando o compartiendo su propia pantalla, también puede ser útil tener ventanas adicionales abiertas y visibles.

La capacidad de ventanas múltiples es el comportamiento predeterminado para aplicaciones y juegos de Android, que se aplica a los escritorios de Chrome OS, así como a teléfonos y tabletas en modo de pantalla dividida. Si desea evitar que su juego cambie de tamaño, declare que no es redimensionable en `AndroidManifest.xml` .

```xml
android:resizeableActivity="false"
```

Hay algunas consideraciones importantes si su juego es redimensionable:

- Cuando se cambia el tamaño de la ventana, de forma predeterminada, Android "destruirá" y volverá a "crear" su juego (consulte el [ciclo de vida de Android](https://developer.android.com/guide/components/activities/activity-lifecycle) ). Su juego debe realizar un buen seguimiento del estado durante estas recreaciones (consulte la [documentación de Jetpack ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) ), o bien [manejar manualmente estos cambios de configuración](https://developer.android.com/guide/topics/resources/runtime-changes) y evitar la recreación, haciendo que su motor de juego maneje el nuevo tamaño de pantalla. Para obtener más información, vea este video de la [Game Developer Conference 2019](https://www.youtube.com/watch?time_continue=2515&v=AbZ40kPqht4) .
- Manejo de `onPause` correctamente en caso de que su aplicación esté visible y [`STARTED`](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.State) , pero no [`RESUMED`](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.State) . Ver [ciclo de vida de múltiples ventanas](https://developer.android.com/guide/topics/ui/multi-window#lifecycle) .
- Considere diferentes proporciones de aspecto para ventanas redimensionadas (recorte versus escala de activos)

Lea más sobre la [gestión de ventanas](/{{locale.code}}/android/window-management) .

## Modo de pantalla completa

Cuando su juego se ejecuta en una ventana de pantalla completa, es posible que desee ponerlo en modo inmersivo para eliminar los bordes de la ventana y otros elementos de la pantalla que distraen. Consulte la [documentación de pantalla completa de](https://developer.android.com/training/system-ui/immersive) Android para obtener más información.

```kotlin
private fun hideSystemUI() {
    // Enables regular immersive mode.
    window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_FULLSCREEN)
}
```
