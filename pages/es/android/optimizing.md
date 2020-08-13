---
title: Guías para optimización
metadesc: Este documento describe algunas acciones que puede tomar para optimizar sus aplicaciones de Android para dispositivos Chrome OS.
date: 2020-05-01
weight: 0
tags:
  - gestión de ventanas
  - soporte para teclado
  - soporte para mouse
  - soporte para trackpad
  - soporte para lápiz óptico
---

Las aplicaciones de Android tienen un papel importante que desempeñar en la redefinición de cómo se ve la informática moderna en pantallas grandes. Dicho esto, simplemente ejecutar la aplicación de tu teléfono en Chromebooks no brindará a tus usuarios la mejor experiencia. Esta página detalla algunas formas en que puede adaptar su experiencia a la computadora portátil y los factores de forma convertibles. Visite nuestra [lista completa de pruebas](/{{locale.code}}/android/tests) para aprendar más sobre pruebas para su aplicación y compatibilitad con estos dispositivos.

## Aproveche el soporte para múltiples ventanas de forma libre

La implementación de aplicaciones de Android en Chrome OS incluye soporte básico para múltiples ventanas. En lugar de ocupar siempre la pantalla completa, Android procesa las aplicaciones en Chrome OS en contenedores de ventana de forma libre, lo que es más apropiado para estos dispositivos.

Los usuarios pueden cambiar el tamaño de la ventana que contiene su aplicación de Android, como se muestra en la figura 1. Para asegurarse de que sus ventanas de formato libre cambien de tamaño sin problemas y puedan mostrar todo su contenido al usuario, lea las pautas en [Administración de ventanas](/{{locale.code}}/android/window-management).

#1[Una ventana de aplicación redimensionable](/images/android/optimizing/resizable.png)

Puede mejorar la experiencia del usuario cuando su aplicación se ejecuta en Chrome OS siguiendo estas prácticas recomendadas:

- Segúrese de manejar el [ciclo de actividad](https://developer.android.com/guide/topics/ui/multi-window) correctamente en un modo multi ventanas y asegúrese de actualizar el UI continuamente aún cuando su aplicación no es la aplicación enfocada al frente.
- Asegúrese de que su aplicación ajuste su diseño adecuadamente cada vez que el usuario cambie el tamaño de su ventana.
- Personalice las dimensiones iniciales de la ventana de la aplicación especificando su [tamaño de inicio](/{{locale.code}}/android/window-management#initial-launch-size) .
- La orientación de la actividad raíz de la aplicación afecta a todas sus ventanas. Tenga en cuenta las [reglas de actividad raíz](/{{locale.code}}/android/window-management#the-root-activity-and-orientation) .

Para obtener más información, lea sobre la [administración de ventanas](/{{locale.code}}/android/window-management).

## Personaliza el color de la barra superior

Chrome OS utiliza el tema de la aplicación para colorear la barra superior que se muestra en la parte superior de la aplicación, que muestra cuándo los usuarios sostienen los controles de la ventana y el botón Atrás. Para que su aplicación se vea pulida y personalizada para Chrome OS, defina los [`colorPrimary`](https://developer.android.com/reference/android/R.attr?hl={{locale.code}}#colorPrimary) y (si es posible) [`colorPrimaryDark`](https://developer.android.com/reference/android/R.attr?hl={{locale.code}}#colorPrimaryDark) en el tema de su aplicación. Este último se usa para colorear la barra superior. Si solo se define `colorPrimary` , Chrome OS usa una versión más oscura en la barra superior. Para obtener más información, consulte [Uso del tema material](https://developer.android.com/training/material/theme?hl={{locale.code}}) .

## Incluya soporte para teclado, trackpad y mouse

Todos los Chromebook tienen un teclado físico y trackpad, y algunos también tienen una pantalla táctil. Algunos dispositivos pueden incluso convertirse de una computadora portátil a una tableta.

Todas las aplicaciones para Chrome OS deben ser compatibles con mouse, trackpad y teclado y deben poder usarse sin una pantalla táctil. Muchas aplicaciones ya admiten mouse y trackpad sin necesidad de trabajo adicional. Sin embargo, siempre es mejor personalizar el comportamiento de su aplicación de manera adecuada para el mouse, y debe admitir y distinguir entre el mouse y las entradas táctiles. Lea más sobre el soporte del mouse en [Compatibilidad de entrada para Chromebooks](/{{locale.code}}/android/input-compatibility) . Debe asegurarse de que:

- Se puede hacer clic en todos los objetivos con el mouse
- Todas las superficies de desplazamiento táctil se desplazan en los eventos de la rueda del mouse
- Los estados de desplazamiento (hover) se implementan con la intención y el mejor criterio para mejorar el descubrimiento de la interfaz de usuario sin abrumar al usuario.

#2[Desplazarse con la rueda del mouse](/images/android/optimizing/scroll-on-mousewheel.png)

#3[Estados de flotar el puntero del ratón sobre elementos](/images/android/optimizing/hover-states.png)

Cuando corresponda, debe diferenciar entre el mouse y las entradas táctiles. Por ejemplo, mantener presionado un elemento podría desencadenar una IU de selección múltiple, mientras que hacer clic derecho en el mismo elemento podría desencadenar en cambio un menú de opciones.

### Cursores personalizados

Las aplicaciones deben personalizar los cursores del mouse para indicar con qué elemento de su interfaz de usuario se puede interactuar y cómo. Puede configurar el [`PointerIcon`](https://developer.android.com/reference/android/view/PointerIcon?hl={{locale.code}}) para usar cuando los usuarios interactúan con una vista llamando al [`setPointerIcon()`](https://developer.android.com/reference/android/view/View?#setPointerIcon) ( `android.view.PointerIcon` ).

Las aplicaciones deberían mostrar:

- Punteros en I para texto.
- Cambiar el tamaño de los mangos en los bordes de la capa de tamaño variable.
- Punteros de mano abierta / mano cerrada para contenido que se puede desplazar o arrastrar con un clic y un gesto de arrastre.
- Punteros de espera

La clase `PointerIcon` proporciona [constantes](https://developer.android.com/reference/android/view/PointerIcon?hl={{locale.code}}#constants) que puede usar para implementar cursores personalizados.

### Atajos de teclado y navegación

Dado que las Chromebook tienen teclados físicios, su aplicación debería incluir atajos para incrementar la productividad del usuario. Por ejemplo si es posible imprimir desde su aplicación, se podría usar **Control+P** para abrir un dialog de imprimir. También todos los elementos cruciales en la UI deben ser manejados a través [navegación con tab](https://developer.android.com/training/keyboard-input/navigation?hl={{locale.code}}#Tab). Esto es especialmente importante para accesibilidad. Sin embargo, para cumplir con estandares de accesibilidad, todas las superficies en la UI deben tener estados al enfocar visibles y que sean accesibles.

#4[tabulación transversal](/images/android/optimizing/transversal-tabbing.png)

#5[Reemplazar un gesto de deslizar con un control que aparece al flotar el puntero del mouse sobre elementos](/images/android/optimizing/hover-controls.png)

También debe asegurarse de implementar alternativas de teclado o mouse a las funciones principales ocultas bajo interacciones específicas del tacto, como pulsaciones prolongadas, deslizamientos u otros gestos multitáctiles. Una solución de ejemplo sería proporcionar botones que aparecen en una superficie al pasar el mouse.

## Mejorar aún más la entrada del usuario

Para lograr la funcionalidad de escritorio para su aplicación, considere estas entradas adicionales orientadas a la productividad.

### Menús contextuales

![Un menú contextual que aparece al hacer clic derecho](/images/android/optimizing/contextual-menu.png)

Los menús contextuales de Android, que son otro acelerador para llevar a los usuarios a las funciones de su aplicación, pueden activarse haciendo clic con el botón secundario de un mouse o trackpad, o presionando una pantalla táctil.

### Arrastrar y soltar

![Arrastrar y soltar en una interfaz de navegación de archivos](/images/android/optimizing/drag-and-drop.png)

Construir interacciones de arrastrar y soltar puede brindar una funcionalidad de productividad eficiente e intuitiva a su aplicación. Para obtener más información, consulte [Arrastrar y soltar](https://developer.android.com/guide/topics/ui/drag-drop?hl={{locale.code}}) .

### Soporte de lápiz

El soporte de stylus es crucial para dibujar y tomar notas. Proporcione un soporte mejorado para Chromebooks y tabletas equipados con stylus mediante la implementación de interacciones adaptadas al uso de la entrada de stylus. Tenga en cuenta las posibles variaciones en diferentes hardware de lápiz al diseñar sus interacciones de lápiz. Consulte [Compatibilidad de entrada para Chromebooks](/{{locale.code}}/android/input-compatibility#stylus) para obtener un resumen de las API de stylus.

## Haz que tus diseños sean adaptables

![Diseño adaptable](/images/android/optimizing/responsive-layout.png)

Su aplicación debe hacer un buen uso del espacio de la pantalla disponible independientemente del estado visual (pantalla completa, retrato, paisaje, ventana). Algunos ejemplos de buen uso del espacio incluyen, entre otros, los siguientes:

- Visualización de la arquitectura de la aplicación.
- Limitar la longitud del texto y el tamaño de la imagen a un ancho máximo.
- Hacer un mejor uso de los bienes raíces en la barra de herramientas de la aplicación.
- Mejora de la ubicación de funcionalidad de la interfaz de usuario adaptándola al uso del mouse en lugar del uso del pulgar.
- Optimización del tamaño para videos e imágenes, estableciendo un conjunto de ancho y alto máximo para todos los medios, y maximizando la legibilidad y la capacidad de escaneo.
- Implementación de un sistema de columnas adaptable. Para obtener más información, consulte [Interfaz de usuario adaptable](https://material.io/guidelines/layout/responsive-ui.html).
- Cambiar el tamaño y modificar la interfaz de usuario cuando sea necesario mediante el sistema de columnas y evitar abrir nuevas ventanas cuando sea posible.
- Eliminar o reducir la importancia de los componentes de desplazamiento horizontal.
- Evitar la interfaz de usuario modal de pantalla completa. Utilice la interfaz de usuario en línea, como indicadores de progreso y alertas, para todas las acciones no críticas
- Uso de componentes mejorados de la interfaz de usuario, como el selector de fecha y hora, campos de texto y menús desplegables, diseñados para mouse, teclado y pantallas más grandes.
- Uso de ediciones en línea, columna adicional o interfaz de usuario modal en lugar de una nueva actividad para la función de edición de pequeña a mediana.
- Eliminar o modificar los botones de acción flotantes (FAB) para una mejor navegación con el teclado. De forma predeterminada, un FAB se coloca en último lugar en el orden de tabulación transversal. Debe hacerse primero porque es la acción principal o debe ser reemplazado por otra prestación de nivel superior.

## Cambiar patrones de navegación

A medida que su aplicación se personaliza cada vez más para un entorno de computadora portátil, considere moverse hacia un patrón de navegación que destaque el botón de retroceso. La aplicación debería poder manejar su propia pila de historial al proporcionar botones de retroceso en la aplicación, rutas de exploración u otras rutas de escape como botones de cerrar o cancelar como parte de su interfaz de usuario de pantalla grande. Un botón de retroceso a nivel del sistema es un patrón que se transfiere desde las raíces portátiles de Android, uno que no encaja tan bien en un contexto de escritorio.

Puede controlar si su aplicación muestra o no un botón de retroceso en su ventana configurando una preferencia dentro de la etiqueta [`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element?hl={{locale.code}}) . Una configuración de **true** ocultará el botón Atrás:

```xml
<meta-data android:name="WindowManagerPreference:SuppressWindowControlNavigationButton" android:value="true" />
```

## Resolver problemas con las imágenes de vista previa de la cámara

Los problemas de la cámara pueden surgir cuando la aplicación solo puede ejecutarse en orientación vertical, pero el usuario la ejecuta en una pantalla horizontal. En este caso, la vista previa, o el resultado capturado, podría rotarse incorrectamente.

El modo de compatibilidad cambia la forma en que el sistema maneja los eventos, como los cambios de orientación, en Chrome OS. Esto ayuda a evitar problemas cuando la cámara se usa en el modo de orientación incorrecto. Para habilitar el modo de compatibilidad:

- Apunte al menos a Android 7.0 (nivel de API 24). Todavía puede elegir un nivel mínimo de SDK.
- Permita que su aplicación sea redimensionable.

## Manejar la configuración del dispositivo

### Cambiar el volumen

Los dispositivos Chrome OS son dispositivos de _volumen fijo_ . Las aplicaciones que reproducen sonido deben tener sus propios controles de volumen. Siga las pautas para [trabajar con dispositivos de volumen fijo](https://developer.android.com/guide/topics/media-apps/volume-and-earphones?hl={{locale.code}}#fixed-volume) .

### Cambiar el brillo de la pantalla

No es posible ajustar el brillo de la pantalla en Chrome OS. Las llamadas a [`configuraciones del sistema`](https://developer.android.com/reference/android/provider/Settings.System?hl={{locale.code}}) y [`WindowManager.LayoutParams`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams?hl={{locale.code}}) son ignoradas.
