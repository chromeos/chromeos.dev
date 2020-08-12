---
title: Flutter y Chrome OS van mejor juntos
metadesc: Android alimenta las aplicaciones móviles en dispositivos que van mucho más allá de su típico teléfono inteligente de pantalla pequeña.
tags:
  - tendencia
  - flutter
  - soporte de teclado
  - soporte para mouse
  - pantalla grande
  - gestión de ventanas
  - android
  - android studio
  - linux
  - gráficos de alto rendimiento
authors:
  - kennethford
  - csells
date: 2019-05-10
---

_Este artículo apareció originalmente en el Blog de desarrolladores de Google._

Chrome OS es el sistema operativo rápido, simple y seguro que alimenta las Chromebooks, incluido Google Pixelbook y millones de dispositivos utilizados por consumidores y estudiantes todos los días. La última versión de Flutter agrega soporte para crear aplicaciones hermosas y personalizadas de Chrome OS, que incluyen un rico soporte para teclado y mouse, y herramientas para garantizar que su aplicación funcione bien en un Chromebook. Además, Chrome OS es una excelente estación de trabajo para desarrolladores para crear aplicaciones Flutter de uso general, gracias a su soporte para desarrollar y ejecutar aplicaciones Flutter localmente en el mismo dispositivo.

## Flutter es una excelente manera de crear aplicaciones de Chrome OS

Desde su inicio, [Flutter](https://flutter.dev/) ha compartido muchos de los mismos principios que Chrome OS: experiencias productivas, rápidas y hermosas. Flutter permite a los desarrolladores crear interfaces de usuario hermosas y rápidas, al tiempo que proporciona un alto grado de productividad al desarrollador y un marco de desarrollo así como herramientas completamente de código abierto. En resumen, es el kit de herramientas moderno ideal para crear aplicaciones multiplataforma, incluidas las aplicaciones para Chrome OS.

Inicialmente, Flutter se centró en proporcionar un kit de herramientas de interfaz de usuario para crear aplicaciones para dispositivos móviles, que generalmente cuentan con entrada táctil y pantallas pequeñas. Sin embargo, hemos estado incorporando soporte para teclado y mouse en Flutter desde antes de nuestra versión 1.0 en diciembre pasado. Y hoy, nos complace anunciar que Flutter para Chrome OS ahora es más fuerte con soporte para las ruedas del mouse, implementación de eventos al flotar sobre elementos y mejor soporte de eventos de teclado. Además, Flutter siempre ha sido excelente para permitirle crear aplicaciones que se ejecutan en cualquier tamaño (pantalla grande o pequeña), con cambio de tamaño sin interrupciones, como se muestra aquí en el [Flutter Gallery](https://github.com/flutter/gallery/).

The Gallery es una aplicación diseñada para ser una colección de widgets, comportamientos y viñetas de Material Design & Cupertino implementados con Flutter. La aplicación muestra un diseño adaptable, además de tener soporte de navegación por teclado en toda la aplicación. Este es un gran lugar para ver cómo una aplicación bien diseñada maneja el cambio de tamaño de las ventanas y el cambio entre diferentes diseños, al tiempo que muestra la compatibilidad nativa con el teclado y la navegación de enfoque en el kit de herramientas listo para usar.

Debido a que Chrome OS ejecuta aplicaciones de Android, apuntar a Android es la forma de crear aplicaciones de Chrome OS. Sin embargo, aunque la creación de aplicaciones de Chrome OS en Android siempre ha sido posible, como se describe en [estas pautas](/{{locale.code}}/android) , a menudo es difícil saber si su aplicación de Android funcionará bien en Chrome OS. Para ayudar con ese problema, hoy estamos agregando un nuevo conjunto de reglas de mejoras de código a las herramientas Flutter para detectar violaciones de las pautas de mejores prácticas más importantes de Chrome OS:

#[Las reglas de formato de código de Flutter Chrome OS en acción](/images/posts/flutter-and-chromeos-better-together/flutter-chromeos-lint-rules.png)

Cuando pueda establecer estas reglas de formato de código de Chrome OS, podrá ver rápidamente cualquier problema en su aplicación de Android que lo dificulte cuando se ejecuta en Chrome OS. Para saber cómo aprovechar estas reglas, consulte los [documentos de linting para Flutter Chrome OS](https://github.com/flutter/flutter/wiki/Linting-Flutter-apps-for-Chrome-OS) .

Pero todo eso es solo el comienzo: las herramientas Flutter también le permiten desarrollar y probar sus aplicaciones directamente en Chrome OS.

## Chrome OS es una gran plataforma para desarrolladores para crear aplicaciones Flutter

No importa a qué plataforma se dirija, Flutter tiene soporte para IDE ricos y herramientas de programación como Android Studio y Visual Studio Code. Durante el último año, Chrome OS ha estado creando soporte para ejecutar la versión de Linux de estas herramientas con la versión beta de [Linux en Chrome OS](/{{locale.code}}/linux) (también conocido como Crostini). Y, dado que Chrome OS también es compatible con Android de forma nativa, puede configurar las herramientas Flutter para ejecutar sus aplicaciones de Android directamente sin un emulador involucrado.

#[Las herramientas de desarrollo de Flutter que se ejecutan en Chrome OS](/images/posts/flutter-and-chromeos-better-together/flutter-on-chromeos.gif)

Toda la gran productividad de Flutter está disponible, incluida Stateful Hot Reload, cambio de tamaño sin interrupciones, compatibilidad con teclado y mouse, etc. ¡Las mejoras recientes en Crostini, como el alto soporte de DPI, la integración del sistema de archivos Crostini, adb más fácil, etc., han mejorado aún más esta experiencia! Por supuesto, no tiene que probar con el contenedor de Android que se ejecuta en Chrome OS; También puede probar con dispositivos Android conectados a su computadora de Chrome OS. En resumen, Chrome OS es el entorno ideal para desarrollar y probar sus aplicaciones Flutter, especialmente cuando se dirige a Chrome OS.

## A los clientes les encanta Flutter en Chrome OS

Con su combinación única de simplicidad, seguridad y capacidad, Chrome OS es una plataforma cada vez más popular para aplicaciones empresariales. Estas aplicaciones a menudo funcionan con grandes cantidades de datos, ya sea un cuadro, un gráfico para visualización, o listas y formularios para ingresar datos. El soporte en Flutter para gráficos de alta calidad, diseño de pantalla grande y funciones de entrada (como selección de texto, orden de tabulación y rueda del mouse), lo convierten en una forma ideal de portar aplicaciones móviles para la empresa. Un proveedor de tales aplicaciones es [AppTree](https://apptreesoftware.com/) , que usa Flutter y Chrome OS para resolver problemas para sus clientes empresariales.

> Crear una versión de Chrome OS de nuestra aplicación requirió muy poco esfuerzo. En 10 minutos modificamos algunos valores y ahora nuestros usuarios tienen acceso a nuestra aplicación en una clase completamente nueva de dispositivos. Este es un gran negocio para nuestros clientes empresariales que han querido acceder a nuestra aplicación en dispositivos de escritorio.

Matthew Smith, CTO, Software AppTree {.cite}

Al usar Flutter para apuntar a Chrome OS, AppTree pudo comenzar con su aplicación móvil Flutter existente y adaptarla fácilmente para aprovechar las capacidades de Chrome OS.

## ¡Prueba Flutter en Chrome OS hoy!

Si desea orientar Chrome OS con Flutter, puede hacerlo hoy simplemente [instalando la última versión de Flutter](https://flutter.dev/docs/get-started/install) . Si desea ejecutar las herramientas de desarrollo de Flutter en Chrome OS, puede [seguir estas instrucciones](https://flutter.dev/docs/get-started/install/chromeos) para comenzar rápidamente. Para ver una aplicación del mundo real creada con Flutter que ha sido optimizada para Chrome OS, consulte la [muestra Developer Quest](https://github.com/2d-inc/developer_quest) que el equipo de Flutter DevRel lanzó en la conferencia Google I / O de 2019. Y, por último, no olvide [probar las reglas de alineación de Flutter Chrome OS](https://github.com/flutter/flutter/wiki/Linting-Flutter-apps-for-Chrome-OS) para asegurarse de que las aplicaciones de Chrome OS siguen las prácticas más importantes.

Flutter y Chrome OS van muy bien juntos. ¿Qué vas a construir?
