---
title: ChromeOS.dev - Una guía para crear aplicaciones y juegos de clase mundial para elde Chrome OS
metadesc: se lanza oficialmente ChromeOS.dev; un plan multilingüe de código abierto para crear aplicaciones y juegos de clase mundial para Chrome OS y sobre él. Y nueva funcionalidad de Chrome OS.
hero:
  image: /images/posts/chromeos-dev-a-blueprint-to-build-world-class-apps-and-games-for-chrome-os/hero.svg
  alt: Una ilustración de una Chromebook y nueva funcionalidad de Chrome OS.
featured:
  title: ChromeOS.dev
  desc: Una guía para crear aplicaciones y juegos de clase mundial para Chrome OS
  images:
    - image: /images/posts/chromeos-dev-a-blueprint-to-build-world-class-apps-and-games-for-chrome-os/featured.svg
      alt: Una ilustración de una Chromebook y nueva funcionalidad de Chrome OS.
tags:
  - noticias de producto
  - pantallas grandes
  - android studio
  - linux
  - optimización
authors:
  - ieinvaldez
date: 2020-08-12
---

Mientras las personas pasan más tiempo en casa que fuera de ella, dependen cada vez más de las computadoras de escritorio y portátiles personales para hacer la vida diaria más fácil. Ya sea que estén chateando por video con amigos y familiares, descubriendo aplicaciones y juegos entretenidos, realizando múltiples tareas en el trabajo o persiguiendo un proyecto apasionante, las pantallas más grandes y un mejor rendimiento han marcado la diferencia.

Esta tendencia fue clara de marzo a junio de 2020: las ventas de unidades de Chromebook crecieron un 127% interanual, mientras que el resto de la categoría de portátiles de EE. UU. Aumentó un 40% interanual.1 [^1] Las computadoras portátiles se han vuelto cruciales para las personas en casa que quieren usar sus aplicaciones y juegos favoritos, como [Star Trek™ Fleet Command](https://play.google.com/store/apps/details?id=com.scopely.startrek) y [Reigns: Game of Thrones](https://play.google.com/store/apps/details?id=com.devolver.reignsGot) para disfrutar de aventuras llenas de acción, [Calm](https://play.google.com/store/apps/details?id=com.calm.android) manejar el estrés, o [Disney+](https://play.google.com/store/apps/details?id=com.disney.disneyplus) para manterner a toda la familia entretenida.

![Las ventas de Chromebooks han aumentado  127%  interanual de marzo - junio 2020 comparado con 40% para otros notebooks.](/images/posts/chromeos-dev-a-blueprint-to-build-world-class-apps-and-games-for-chrome-os/yoy-sales.gif)

Para brindar experiencias de aplicaciones que realmente mejoren la vida de las personas, los desarrolladores deben estar equipados con las herramientas, los recursos y las mejores prácticas adecuadas. Es por eso que nos complace presentar [ChromeOS.dev](/{{locale.code}}), un recurso dedicado para desarrolladores técnicos, diseñadores, gerentes de productos y líderes comerciales.

ChromeOS.dev, disponible en inglés y español (próximamente en otros idiomas), presenta las últimas noticias, anuncios de productos, documentación técnica y ejemplos de código de aplicaciones populares. Si eres un desarrollador web, Android o Linux que recién está comenzando o un experto certificado, encontrarás toda la información que necesitas en ChromeOS.dev.

Escuche a nuestros expertos en Google y Chrome OS, así como a una variedad de desarrolladores, mientras comparten consejos prácticos, beneficios y los desafíos de crear experiencias de aplicaciones para los usuarios de hoy. Además, puede revisar las [pautas de diseño de Chrome OS y optimización de UX](/{{locale.code}}/android/design) para aplicaciones actualizadas con información útil sobre los componentes de la interfaz de usuario, la navegación, las fuentes, los diseños y todo lo relacionado con la creación de aplicaciones y juegos de clase mundial para Chrome OS.

Aún mejor, como un destino de [código abierto](https://github.com/chromeos/chromeos.dev) en línea, ChromeOS.dev está diseñado considerando todos los principios y métodos para crear aplicaciones web progresivas (PWA) altamente capaces y confiables, lo que garantiza que los desarrolladores siempre tengan acceso rápido y fácil a la información que necesitan. incluso cuando están desconectados.

![Vista previa animada de las secciones y páginas de ChromeOS.dev.](/images/posts/chromeos-dev-a-blueprint-to-build-world-class-apps-and-games-for-chrome-os/website.gif)

Echa un vistazo a algunas de las actualizaciones y mejoras más recientes a continuación, y asegúrate de instalar ChromeOS.dev PWA en tu dispositivo para estar al tanto de la información más reciente.

## Nueva funcionalidad para los desarrolladores de Chrome OS

Ya sea que se trate de desarrollar aplicaciones web, Linux o Android, cada actualización de ChromeOS.dev se trata de garantizar que todos los desarrolladores puedan crear mejores experiencias de aplicaciones en un entorno optimizado y fácil de navegar.

### Terminal Linux personalizable

Terminal de Linux en Chrome OS ahora viene equipado con funciones personalizadas desde el primer momento, que incluyen:

- **Pestañas y accesos directos integrados** - Realice
  múltiples tareas con facilidad mediante el uso de ventanas y pestañas para administrar diferentes tareas y cambiar entre múltiples proyectos. También puede usar atajos familiares como [[Ctrl]]+[[T]], [[Ctrl]]+[[W]] y [[Ctrl]]+[[Tab]] para administrar sus pestañas, o usar la página de configuración para controlar si estas teclas deben usarse en su Terminal para aplicaciones como vim o emacs.

- **Temas** - La pestaña de configuración se ha reorganizado para facilitar la personalización de todas las opciones de Terminal.

  ![Escoger un tema en Linux.](/images/posts/chromeos-dev-a-blueprint-to-build-world-class-apps-and-games-for-chrome-os/linux-updates.gif)

- **Configuración de terminal rediseñada** - The settings tab has been reorganized to make it easier to customize all your Terminal options.

Los desarrolladores ahora pueden comenzar a usar estas y otras funciones personalizables en la aplicación Terminal.

### Emulador de Android

[Los Chromebooks compatibles](/{{locale.code}}/android-environment) ahora pueden ejecutar una versión completa del emulador de Android, lo que permite a los desarrolladores probar aplicaciones en cualquier versión y dispositivo de Android sin necesidad del hardware real. Los desarrolladores de aplicaciones de Android pueden simular [ubicaciones de mapas](https://developer.android.com/studio/run/emulator?hl={{locale.code}}#extended) y otros datos de sensores para probar cómo funciona una aplicación con varios movimientos, orientaciones y condiciones ambientales. Con la compatibilidad con Android Emulator en Chrome OS, los desarrolladores pueden optimizar para diferentes versiones y dispositivos de Android, incluidas tabletas y [móvibles plegables](https://developer.android.com/guide/topics/ui/foldables#emulators) — directamente desde su Chromebook

### Implementar aplicaciones directamente en Chrome OS

Crear y probar aplicaciones de Android en una sola máquina es más sencillo que nunca. Ahora, los desarrolladores que ejecutan Chrome OS M81 y versiones posteriores pueden [deploy and test apps directly on their Chromebooks](/{{locale.code}}/android-environment/deploying-apps) — sin necesidad de usar el modo de desarrollador o conectar diferentes dispositivos físicamente a través de USB. Combinado con la compatibilidad con el emulador de Android, Chrome OS está equipado para admitir el desarrollo completo de Android.

### Asistente de proyectos mejorado en Android Studio

Una [plantilla de actividad principal/detallada](https://developer.android.com/studio/projects/templates#PrimaryDetailFlow) actualizada en Android Studio ofrece soporte completo para crear experiencias para pantallas más grandes, incluidos Chromebooks, tabletas y plegables. Esta opción actualizada proporciona múltiples diseños para teléfonos y dispositivos de pantalla más grande, así como un mejor esqueleto para uso de teclado / mouse. Esta función ahora está disponible en Android Studio 4.2 Canary 8.

### Soporte actualizado de las comprobaciones de errores de Android

Hemos mejorado las comprobaciones predeterminadas en [la herramienta de errores de Android](https://developer.android.com/studio/write/lint) para ayudar a los desarrolladores a identificar y corregir problemas de código comunes para mejorar sus aplicaciones en pantallas más grandes, como las actividades no redimensionables y con bloqueo vertical. Esta función está disponible actualmente para probar en la versión "canary".

## Descubra todo el potencial de su aplicación con Chrome OS

Desde el primer día, nuestro objetivo ha sido ayudar a los desarrolladores en todos los niveles a crear experiencias de aplicaciones simples, poderosas y seguras para todas las plataformas. A medida que nuestra nueva realidad crea una mayor necesidad de aplicaciones útiles y atractivas en dispositivos de pantalla grande, estamos trabajando arduamente para optimizar el proceso haciendo que Chrome OS sea más versátil, personalizable e intuitivo.

Visite ChromeOS.dev e instálelo en su Chromebook para estar al tanto de los últimos recursos, actualizaciones de productos, información valiosa e historias inspiradoras sobre el éxito de desarrolladores de Chrome OS en todo el mundo.

[^1]: The NPD Group, Inc., Servicio de seguimiento minorista de EE. UU., Computadoras portátiles, según las ventas unitarias, abril-junio de 2020 y marzo-junio de 2020.
