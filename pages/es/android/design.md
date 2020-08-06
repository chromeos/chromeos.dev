---
title: Recomendaciones de diseño
metadesc: Cómo admitir todos los diferentes tipos de entrada que están disponibles para Chromebooks.
date: 2020-05-01
weight: -6
tags:
  - dispositivos de entrada
  - soporte para teclado
  - soporte para lápiz óptico
  - soporte para trackpad
---

Android facilita el desarrollo de una aplicación que funciona bien en una amplia gama de dispositivos con distintos tamaños y dimensiones de pantalla. Esta amplia compatibilidad funciona a su favor, ya que los desarrolladores pueden diseñar una sola aplicación que pueden distribuir ampliamente a todos los dispositivos deseados. Sin embargo, para brindar a sus usuarios la mejor experiencia posible en cada configuración de pantalla, necesita optimizar los diseños de la aplicación y otros componentes de la interfaz de usuario para los diferentes tamaños y configuraciones que encontrará. En Chrome OS, la optimización de su interfaz de usuario le permite aprovechar al máximo el espacio de pantalla adicional disponible y ofrecer nuevas funciones, presentar contenido nuevo o mejorar la experiencia de otras maneras para profundizar la participación del usuario.

## Diseños para pantallas más grandes.

Si desarrolló su aplicación para teléfonos y ahora desea mejorar su diseño en Chrome OS y otros factores de forma de pantalla grande, puede comenzar haciendo pequeños ajustes en sus diseños, fuentes y espacios. En algunos casos, como para tabletas de 7 pulgadas o un juego con un lienzo grande, estos ajustes pueden ser todo lo que necesita para que su aplicación se vea genial. En otros casos, como para pantallas más grandes, puede rediseñar partes de su interfaz de usuario para reemplazar una "interfaz de usuario extendida" con una interfaz de usuario eficiente de múltiples paneles, navegación más fácil y contenido adicional. Pruebe visitar los [Material Studies](https://material.io/design/material-studies/) realizados por el equipo de Material Design para ver ejemplos de cómo se vería esto para diferentes productos. A continuación puede ver cómo se ve la aplicación[Reply](https://material.io/design/material-studies/reply.html) para diferentes tamaños de pantalla.

![Estudio de material de respuesta](/images/android/design/reply.png)

Aquí hay algunas sugerencias:

- Proporcione diseños personalizados para estas pantallas más grandes. Puede hacerlo utilizando la [dimensión más corta de](https://developer.android.com/guide/practices/screens_support#NewQualifiers) la pantalla o el [ancho y la altura mínimos disponibles](https://developer.android.com/guide/practices/screens_support#NewQualifiers) .

- Imagine cómo funcionan su UX y sus diseños en un entorno donde la configuración horizontal es más común como Chrome OS. Adapte sus diseños para que se vean y funcionen bien en estas orientaciones basadas en el tamaño de la ventana o proporcione diseños horizontales específicos utilizando el "land resource qualifier". Puede obtener más información sobre el cambio de tamaño dinámico de la ventana y otras consideraciones para pantallas grandes en [la página de administración de ventanas](/%7B%7Blocale.code%7D%7D/android/window-management) .

- Las barras de navegación inferiores no escalan bien cuando su aplicación se estira para ser bastante ancha. Piense en extraer su navegación desde el menú inferior hacia el lado izquierdo, donde es más fácil de encontrar y usar, al mismo tiempo que tiene la oportunidad de mostrar más opciones. El ejemplo anterior Reply muestra esto muy bien.

- Como mínimo, personalice dimensiones como tamaños de fuente, márgenes y espaciado para pantallas más grandes, para mejorar el uso del espacio y la legibilidad del contenido. Piense especialmente en cómo se verán las cosas cuando los usuarios estén un poco más lejos del dispositivo, como en un dispositivo Chrome OS u otros entornos de escritorio.

- Ajuste la posición de los controles de la interfaz de usuario para que sean fácilmente accesibles para los usuarios cuando usan un mouse o sostienen una tableta, como hacia los lados y lejos del centro.

- El espacio entre elementos de la interfaz de usuario normalmente debería ser mayor en Chrome OS y otros dispositivos de pantalla grande que en los teléfonos. [Sus márgenes y canaletas](https://material.io/design/layout/responsive-layout-grid.html#columns-gutters-margins) deben adaptarse a medida que llega a diferentes tamaños de pantalla.

- Agregue espacio adecuadamente al contenido de texto para que no esté alineado directamente a lo largo de los bordes de la pantalla. Use un espacio mínimo de 16dp alrededor del contenido cerca de los bordes de la pantalla.

En particular, asegúrese de que sus diseños no aparezcan "estirados" en la pantalla:

- Las líneas de texto no deben ser excesivamente largas: optimice para un máximo de 100 caracteres por línea, con los mejores resultados entre 50 y 75.

- Las listas y los menús no deben usar el ancho de pantalla completa.

- Use el relleno para administrar el ancho de los elementos en pantalla o cambie a una interfaz de usuario de múltiples paneles para dispositivos de pantalla más grande (consulte la siguiente sección).

## Aproveche el área de pantalla adicional

Los dispositivos de Chrome OS brindan significativamente más espacio en la pantalla a su aplicación Cuando considere la interfaz de usuario de su aplicación para que se ejecute en pantallas más grandes, asegúrese de aprovechar al máximo el área de pantalla adicional disponible. Tanto en el ejemplo anterior de [Reply](https://material.io/design/material-studies/reply.html) como en el ejemplo de [Rally ](https://material.io/design/material-studies/rally.html) a continuación, puede ver que ambas aplicaciones adoptan un enfoque diferente para aprovechar el aumento del tamaño de la pantalla. Reply agrega espacio para que se vea más limpio y amigable, mientras que Rally agrega más datos en la pantalla para que los usuarios puedan ver más con menos desplazamiento o clics.

![Estudio de material de rally](/images/android/design/rally.png)

Un buen lugar para comenzar es ver las cosas que pueden estar ocultas para el usuario y cómo puede sacarlas y hacerlas visibles. Ya sea que esté mostrando más información sobre un elemento, haciendo visible el menú que puede estar oculto detrás de un clic derecho o una pulsación larga, o mostrando opciones de navegación diferentes o más profundas ahora que tiene un área de navegación del lado izquierdo más grande. Estas son pequeñas victorias que pueden mejorar su UX y darle una sensación más nativa, sin un rediseño completo y una revisión de la experiencia actual.

Aquí hay algunas recomendaciones para su aplicación:

- Su marca dictará la dirección que debe seguir al pensar en los diferentes tamaños de pantalla. Decidir las cosas para priorizar y mostrar al usuario depende de la forma que el usuario use el app y las características más utilizadas. Para obtener inspiración sobre cómo es posible atacar esto, consulte los [Material Studies](https://materia.io/design/material-studies) y observe cómo cada producto diferente responde de manera diferente cuando llega a una pantalla más grande.

- Piense en cómo debería comportarse el diseño de su aplicación utilizando un [sistema de cuadrícula sensible](https://material.io/design/layout/responsive-layout-grid.html#) y cómo debería moverse el contenido / navegación / opciones a medida que aumenta el espacio en la pantalla.

- Decida en qué tamaños de pantalla usará un diseño diferente, luego proporcione los diferentes diseños en los intervalos de tamaño de ventana apropiados (como grande / xlarge) o anchos mínimos de ventana (como sw600dp / sw720). Recuerde que a medida que llega a estos diseños, el contexto general en el que se encontraba el usuario no debe cambiar, y debe intentar retener todo el estado del usuario mientras realiza la transición entre diseños (posición de desplazamiento, texto escrito, etc.)

## Use activos diseñados para pantallas de mayor densidad y más grandes

Para garantizar que su aplicación se vea mejor, proporcione íconos y otros recursos para cada densidad en el rango comúnmente admitido por Chrome OS. Específicamente, debe diseñar sus iconos para la barra de acción, las notificaciones y el iniciador de acuerdo con las [pautas de iconografía](https://material.io/design/iconography/#design-principles) y proporcionarlos en formatos vectoriales para que puedan escalar con gracia con las diferentes pantallas en las que encontrará su aplicación.

Para obtener más información sobre VectorDrawables y los activos de vectores en Android, consulte esta [ publicación ](https://medium.com/androiddevelopers/understanding-androids-vector-image-format-vectordrawable-ab09e41d5c68) de [Nick Butcher](https://twitter.com/crafty) .

## Ajustar tamaños de fuente y objetivos táctiles

Para asegurarse de que su aplicación sea fácil de usar en Chrome OS y pantallas de mayor densidad, ajuste los tamaños de fuente y los objetivos táctiles en su interfaz de usuario, para todas las configuraciones de pantalla a las que se dirige. Puede ajustar los tamaños de fuente a través de [atributos con estilo](https://developer.android.com/guide/topics/ui/themes) o [recursos de dimensión](https://developer.android.com/guide/topics/resources/more-resources#Dimension) , y puede ajustar los objetivos táctiles a través de diseños y dibujos de bitmaps, como se discutió anteriormente.

Aquí hay algunas consideraciones:

- El texto no debe ser excesivamente grande o pequeño en pantallas y densidades más grandes. Asegúrese de que las etiquetas tengan el tamaño adecuado para los elementos de la IU a las que corresponden y asegúrese de que no haya saltos de línea inadecuados en las etiquetas, títulos y otros elementos.

- El tamaño recomendado para un objetivo con el que el usuario interactuará en la pantalla es 48dp — puede que se necesiten algunos ajustes en su UI para pantallas más grandes. Lea más sobre [Spacing Methods](https://material.io/design/layout/spacing-methods.html#) para aprender sobre objetivos en la pantalla y como agregar espacio entre elementos conforme el tamaño de la pantalla cambia. Estas recomendaciones también cumplen con las [guías de accesibilidad](https://developer.android.com/guide/topics/ui/accessibility/apps) básicas.

- Cuando sea posible, para íconos más pequeños, expanda el área táctil a más de 48dp usando [TouchDelegate](https://developer.android.com/reference/android/view/TouchDelegate) o simplemente centrando el ícono dentro del botón transparente.
