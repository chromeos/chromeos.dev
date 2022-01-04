---
title: Iconos de puntero del mouse
metadesc: Cómo diseñar los íconos de puntero para diferentes casos de uso.
date: 2020-06-17
weight: -5
tags:
  - dispositivos de entrada
  - soporte para trackpad
  - soporte para mouse
---

Los usuarios de Android acceden a su aplicación desde todos los diferentes tipos de dispositivos, es decir, teléfonos, tabletas, plegables y Chromebooks. Al interactuar con su aplicación, especialmente en pantallas más grandes, los usuarios también pueden usar algún tipo de dispositivo señalador como un mouse de tres botones. Las aplicaciones de Android tienen soporte para aplicar diferentes estilos al puntero del mouse para ayudar a esos usuarios a tener una indicación visual de que pueden interactuar con un objeto.

## Usando los cursores predeterminados del sistema { #system-default-cursors}

Los usuarios están familiarizados con diferentes convenciones para interactuar con diferentes tipos de objetos en dispositivos de pantalla grande. Android, sin necesidad de agregar ningún cambio, ofrece a los desarrolladores algunos de los iconos de cursor más comunes con los que los usuarios están familiarizados. Agregar algunos de estos iconos de cursor predeterminados del sistema es fácil. Echemos un vistazo al siguiente fragmento de Kotlin:

```kotlin
myView.setOnHoverListener { view, _ ->
      view.pointerIcon =
         PointerIcon.getSystemIcon(applicationContext, PointerIcon.TYPE_HAND)
      false // Listener did not consume the event.
}
```

`myView` es la vista que será asociada con cierto ícono de puntero bajo ciertas circumstancias. La condición utilizada para demostrar en este escenario es el estado al desplazarse sobre la vista (hover) . (En otros escenarios, puede ser recomendable tener un ícono de espera mientras la aplicación esté haciendo una tarea de procesamiento o un punto de mira en el caso de juegos). Aquí se utiliza `setOnHoverListener` para escuchar cuando el puntero se desliza sobre la vista y entonces actuar en ese evento. Dentro del método que escucha por el evento , se llama a `view.pointerIcon` para actualizar el ícono para esa vista en particular. Un ícono existente del sistema se utiliza para este caso. En Android existen varios íconos del sistema ya integrados y se puede encontrar una lista completa [al final de esta página](/{{locale.code}}/android/pointer-styling#system-default-cursors). En el ejemplo se uso el icono `TYPE_HAND` que muestra una mano cerrada con el dedo indice extendido.

## Usando tu propio cursor especial

Es posible que los iconos del sistema Android no cubran todas sus necesidades. Por ejemplo, si tiene una aplicación de comercio de acciones, es posible que desee mostrar un "\$" verde como puntero del mouse cuando los usuarios se ciernen sobre el botón de compra. Analicemos el siguiente fragmento de Kotlin:

```kotlin
// Loading a bitmap to use as a pointer icon
val dollarBitmap = Bitmap.createScaledBitmap(
    BitmapFactory.decodeResource(
        this.resources,
        R.drawable.dollar_sign
    ), CURSOR_WIDTH, CURSOR_HEIGHT, false
)

// Creating the pointer icon and sending clicks from the center of the mouse icon
PointerIcon.create(dollarBitmap, (CURSOR_WIDTH/2).toFloat(), (CURSOR_HEIGHT/2).toFloat())
```

Primero, cree un mapa de bits para el icono. Aquí se carga desde un recurso dibujable (drawable). Luego, cree el objeto `PointerIcon` usando el mapa de bits. Establezca el punto de acceso (ubicación en píxeles donde se originarán los clics) para que sea el centro del icono.

!!! aside.message--note
Nota: La ubicación del punto de acceso depende de su caso de uso. Por ejemplo, una aplicación de dibujo configuraría el punto de acceso como la punta de la pluma o el pincel.
!!!

## Ejemplos

Agregar iconos de puntero a su aplicación es una excelente manera de ayudar a que sus usuarios tengan experiencias más intuitivas en los diferentes factores de forma de dispositivo que usan. Hay muchos [íconos de sistema predeterminados](/{{locale.code}}/android/pointer-styling#system-default-cursors) disponibles y si no se ajustan a sus necesidades, siempre puede cargar o crear los suyos propios.

- **Arrastrar y soltar:** si su aplicación admite arrastrar desde otra aplicación y soltar en su aplicación, podría implementar el ícono `TYPE_NO_DROP` . Esto daría una indicación visual de que su aplicación no es compatible con el tipo MIME que está tratando de caer en su aplicación.
- **Mapas -** Si su aplicación contiene mapas y le gustaría mostrar a sus usuarios que pueden desplazar el mapa puede utiizar el ícono `TYPE_GRAB` cuando el puntero del mouse se deslice sobre el mapa y cuando el usuario hace clic, actualizar el ícono a arrastrar para demostrar el efecto de desplazamiento del mapa.
- **Edición de fotos -** A los usuarios de edición de fotos les gusta tener controles que les permitan seleccionar una lupa para acercarla. Puede cambiar el cursor a una lupa con el ícono `TYPE_ZOOM_IN` cuando se selecciona el modo acercar.
- **Y muchas más oportunidades**

!!! aside.message--tip
Para ver los diferentes cambios de puntero en acción, consulte este [ejemplo de puntero de GitHub](https://github.com/chromeos/pointer-icon-sample)

![Iconos para punteros personalizados en una aplicación de Android.](ix://android/pointer-styling/pointer-icon.gif)

!!!

## Apéndice

### Lectura adicional

- [Muestra de puntero de GitHub](https://github.com/chromeos/pointer-icon-sample)
- [Documentación de la clase de Android PointerIcon](https://developer.android.com/reference/android/view/PointerIcon?hl={{locale.code}})
- [Optimización de aplicaciones para Chrome OS: cursores personalizados](https://developer.android.com/topic/arc/optimizing?hl={{locale.code}}#custom-cursors)

### Cursores predeterminados del sistema

Estos son los cursores disponibles por defecto en el sistema Android.

| Nombre del cursor                    | Icono                                                                                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE_ALIAS                           | ![Alias Cursor Icon](ix://android/pointer-styling/Mouse-Pointer0.png 'Cursor de alias')                                                              |
| TYPE_ALL_SCROLL                      | ![All Scroll Cursor Icon](ix://android/pointer-styling/Mouse-Pointer1.png 'Todos los cursores de desplazamiento')                                    |
| TIPO\_\_ ARROW                       | ![Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer2.png 'Cursor de la flecha')                                                          |
| TYPE_CELL                            | ![Cell Cursor Icon](ix://android/pointer-styling/Mouse-Pointer3.png 'Cursor Celular')                                                                |
| TYPE_CONTEXT_MENU                    | ![Context Menu Cursor Icon](ix://android/pointer-styling/Mouse-Pointer4.png 'Cursor del menú contextual')                                            |
| TYPE_COPY                            | ![Copy Cursor Icon](ix://android/pointer-styling/Mouse-Pointer5.png 'Copiar cursor')                                                                 |
| TYPE_CROSSHAIR                       | ![Crosshair Cursor Icon](ix://android/pointer-styling/Mouse-Pointer6.png 'Cursor en forma de cruz')                                                  |
| TYPE_DEFAULT                         | ![Default Cursor Icon](ix://android/pointer-styling/Mouse-Pointer7.png 'Cursor predeterminado')                                                      |
| TYPE_GRAB                            | ![Grab Cursor Icon](ix://android/pointer-styling/Mouse-Pointer8.png 'Agarrar cursor')                                                                |
| TYPE_GRABBING                        | ![Grabbing Cursor Icon](ix://android/pointer-styling/Mouse-Pointer9.png 'Agarrando el cursor')                                                       |
| TYPE_HAND                            | ![Hand Cursor Icon](ix://android/pointer-styling/Mouse-Pointer10.png 'Cursor de mano')                                                               |
| TYPE_HELP                            | ![Help Cursor Icon](ix://android/pointer-styling/Mouse-Pointer11.png 'Cursor de ayuda')                                                              |
| TYPE_HORIZONTAL_DOUBLE_ARROW         | ![Horizontal Double Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer12.png 'Cursor de doble flecha horizontal')                         |
| TYPE_NO_DROP                         | ![No Drop Cursor Icon](ix://android/pointer-styling/Mouse-Pointer13.png 'Sin cursor de caída')                                                       |
| TYPE_NULL                            | No se mostrará ningún cursor                                                                                                                         |
| TYPE_TEXT                            | ![Text Cursor Icon](ix://android/pointer-styling/Mouse-Pointer14.png 'Cursor de texto')                                                              |
| TYPE_TOP_LEFT_DIAGONAL_DOUBLE_ARROW  | ![Top Left Diagonal Double Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer15.png 'Cursor de doble flecha diagonal superior izquierda') |
| TYPE_TOP_RIGHT_DIAGONAL_DOUBLE_ARROW | ![Top Right Diagonal Double Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer16.png 'Cursor de doble flecha diagonal superior derecha')  |
| TYPE_VERTICAL_DOUBLE_ARROW           | ![Vertical Double Arrow Cursor Icon](ix://android/pointer-styling/Mouse-Pointer17.png 'Cursor vertical de doble flecha')                             |
| TYPE_VERTICAL_TEXT                   | ![Vertical Text Cursor Icon](ix://android/pointer-styling/Mouse-Pointer18.png 'Cursor de texto vertical')                                            |
| TYPE_WAIT                            | ![Wait Cursor Icon](ix://android/pointer-styling/Mouse-Pointer19.gif 'Espera cursor')                                                                |
| TYPE_ZOOM_IN                         | ![Zoom In Cursor Icon](ix://android/pointer-styling/Mouse-Pointer20.png 'Acercar el cursor')                                                         |
| TYPE_ZOOM_OUT                        | ![Zoom Out Cursor Icon](ix://android/pointer-styling/Mouse-Pointer21.png 'Alejar el cursor')                                                         |
