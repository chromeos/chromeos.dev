---
title: Aplicaciones web progresivas de escritorio
metadesc: Cómo aprovechar su sitio web actual y mejorarlo para que sea instalable, funcionar de maravilla con el tacto y el lápiz óptico, y hacerlo aún más capaz
date: 2020-05-29
weight: -7
resources:
  - title: ¿Qué son las aplicaciones web progresivas?
    url: https://web.dev/what-are-pwas
  - title: Lista de verificación de PWA
    url: https://web.dev/pwa-checklist
  - title: PWABuilder
    url: https://www.pwabuilder.com
  - title: Nuevo rastreador de capacidades
    url: https://goo.gle/fugu-api-tracker
---

<!-- prettier-ignore -->
*[PWAs]: aplicaciones web progresivas 
*[PWA]: aplicación web progresiva 
*[OTs]: pruebas de origen 
*[OT]: prueba de origen

[Las aplicaciones web progresivas de](https://web.dev/what-are-pwas/) escritorio (PWA) son una excelente forma multiplataforma y de varios navegadores para crear aplicaciones con un modelo de seguridad que centra la seguridad y la privacidad del usuario y permite compartir de forma integrada con la vinculación inherente de la web. Cree nuevas aplicaciones o mejore su aplicación web existente con APIs modernas para darles capacidades, confiabilidad e instalabilidad similares a las aplicaciones nativas. Las PWAs son la mejor manera de presentar su aplicación web para Chrome OS.

En Chrome OS, el poder de la plataforma web es fundamental; Las aplicaciones web son ciudadanos de primera clase. Las PWA instaladas se muestran en el iniciador de Chrome OS, se pueden fijar al estante e integrarse profundamente con el resto del sistema operativo.

Comience por revisar la [Lista de verificación de PWA](https://web.dev/pwa-checklist/) y asegúrese de que su aplicación web pase la lista de verificación principal de PWA. Puede usar [PWABuilder](https://www.pwabuilder.com/) para ayudarlo a proporcionar una página sin conexión personalizada y hacer que su aplicación sea instalable. Luego, use estas recomendaciones para que su PWA brille en Chrome OS.

## Hazla instalable

Una de las grandes ventajas de las PWAs sobre las aplicaciones web normales es la posibilidad de que se instalen, al igual que las aplicaciones nativas. La sección Progressive Web App en web.dev tiene una sección dedicada a [hacer que su PWA sea instalable](https://web.dev/progressive-web-apps/#installable) ; utilízalo para comenzar. Para que una PWA se identifique como instalable en Chrome OS, se deben cumplir los siguientes criterios; use la [auditoría instalable de Lighthouse](https://web.dev/lighthouse-pwa/#installable) para verificar su trabajo a medida que avanza:

- Debe tener un [manifiesto de aplicación web](https://web.dev/add-manifest/) válido
- Debe cumplir con los [criterios de instalación](https://web.dev/install-criteria/) de Chrome
- Para los PWA en Chrome OS, se mostrará un mensaje de instalación en el omnibar _sin que se_ cumpla un umbral heurístico de participación del usuario.

No hay un tamaño o forma estándar para los íconos en Chrome OS, así que haga que su ícono sea tan interesante y único como desee, ¡incluida la transparencia! Como los PWA tienen una base de código compartida en todas las plataformas, también debe asegurarse de tener disponible un [icono enmascarable](https://web.dev/maskable-icon/) .

Con su PWA instalable, ahora se mostrará en Chrome OS, desde el iniciador hasta el estante. Tener su PWA instalado también abre algunas [capacidades](#aprovecha-las-capacidades) adicionales para que su aplicación realmente brille.

### Una nota sobre trabajar sin conexión

Hay muchas ventajas de de descubrimiento, usabilidad y capacidades simplemente haciendo que su aplicación sea instalable. Hacer que su PWA sea instalable _no_ significa que toda su experiencia deba funcionar sin conexión. Sin embargo, para que una aplicación instalada se sienta nativa, debe tener alguna forma de funcionalidad fuera de línea. Una página básica sin conexión personalizada es suficiente para comenzar; los usuarios esperan que las aplicaciones instaladas no se bloqueen cuando cambia el estado de la conexión. Del mismo modo que una aplicación nativa nunca muestra una página en blanco cuando está fuera de línea, las PWAs nunca deben mostrar la página fuera de línea predeterminada del navegador. Las páginas sin conexión personalizadas pueden variar desde un mensaje que le informa al usuario que necesita una conexión a un juego para que pueda pasar el tiempo hasta que se vuelvan a conectar. Brindar esta experiencia fuera de línea personalizada para páginas no almacenadas en caché o características que requieren una conexión ayuda a cerrar la brecha de la aplicación de experiencia de usuario nativa de la web.

Puede crear una página simple fuera de línea durante el evento de `install` del trabajador de servicio (service worker) al precachear la página deseada para su uso posterior y responder con ella si un usuario está fuera de línea. Puede seguir nuestro [ejemplo de página sin conexión personalizada](https://googlechrome.github.io/samples/service-worker/custom-offline-page/) para ver un ejemplo de esto en acción y aprender cómo implementarlo usted mismo.

Si desea proporcionar una experiencia más sólida, además de la [API de almacenamiento en caché](https://web.dev/service-workers-cache-storage/) , puede usar funciones como [IndexedDB](https://developers.google.com/web/ilt/pwa/working-with-indexeddb) para el almacenamiento NoSQL en el navegador y [la sincronización de fondo](https://developers.google.com/web/updates/2015/12/background-sync) para permitir a los usuarios realizar acciones mientras están fuera de línea y diferir la comunicación del servidor hasta que el usuario tenga conexión estable de nuevo. También puede implementar patrones como [sesiones seguras y duraderas](https://developers.google.com/web/updates/2016/06/2-cookie-handoff) para mantener a los usuarios autenticados y [plantillas de pantallas (skeleton screens)](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a) para que los usuarios sepan rápidamente que está cargando contenido que puede recurrir al contenido en caché o un indicador fuera de línea si es necesario.

## Habilita functionalidad táctil

Casi todos los dispositivos Chrome OS son compatibles con el tacto y muchos compatibles con stylus, por lo que debe asegurarse de que su aplicación funcione sin problemas con ambas entradas, además del teclado y el mouse normales. ¡La [API de eventos de puntero](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) está diseñada específicamente para manejar esto! Algunos eventos fundamentales relacionados con el puntero que probablemente no tendrá que cambiar, como los eventos de `click` . Otros eventos, como `mouseup` o `touchstart` , deben migrarse a sus contrapartes de eventos de puntero para que funcionen sin problemas en cualquier tipo de puntero. Incluso puede administrar [diferentes tipos de entrada por](https://developers.google.com/web/updates/2016/10/pointer-events#different_input_types) separado si lo desea. Para las aplicaciones y los juegos que dependen en gran medida de la entrada táctil del usuario, pasar a la API de eventos de puntero marcará una gran diferencia en los dispositivos Chrome OS.

### Dibujo fluido en la web

Si está creando una aplicación que hace que los usuarios dibujen con los dedos o con lápices, mantener la latencia entre su entrada y su salida lo suficientemente rápido como para sentir fluidez históricamente ha sido difícil. Al compilar este tipo de aplicaciones de [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) para Chrome OS, recomendamos utilizar la sugerencia `desynchronized` para `canvas.getContext()` para proporcionar [una representación de baja latencia](https://developers.google.com/web/updates/2019/05/desynchronized) . Para usar la sugerencia `desynchronized` para un lienzo, haga lo siguiente:

```js
const canvas = document.createElement(‘canvas’); // or select one from the DOM
const ctx = canvas.getContext(‘2d’, {
  desynchronized: true,
  // Other options here…
});

if (ctx.getContextAttributes().desynchronized) {
  // Low-latency supported! Do something awesome with it.
} else {
  // Low-latency not supported! Fall back to less awesome stuff
}
```

### Consideraciones de diseño para tacto

Es importante tener en cuenta el soporte táctil y el lápiz al diseñar sus aplicaciones web. Las interacciones que puede dar por sentado, como el desplazamiento, no funcionan bien, si es que lo hacen, para otros métodos de entrada. Estas son algunas de las mejores prácticas a tener en cuenta al diseñar interfaces táctiles y compatibles con el lápiz:

- No haga suposiciones de entrada basadas en el tamaño de la pantalla. En su lugar, utilice la [detección de funciones](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection) , idealmente en el momento de entrada, para determinar cómo responder. Recuerde, en Chrome OS, los usuarios pueden y sin problemas cambiar entre mouse, tacto y stylus, todo en una sola sesión.
- Asegúrese de que los elementos que espera que toque un usuario tengan un [tamaño de objetivo mínimo](https://material.io/design/usability/accessibility.html#layout-and-typography) lo suficientemente grande como para que los elementos circundantes no sean golpeados accidentalmente.
- Considere el desplazamiento como [mejora progresiva](https://alistapart.com/article/understandingprogressiveenhancement/) y asegúrese de que la interacción se pueda lograr a través de otros medios para el tacto y el lápiz (una pulsación larga o un toque, por ejemplo).
- Los usuarios táctiles esperan poder interactuar directamente con los elementos en pantalla, por ejemplo, pellizcar para hacer zoom en los mapas en lugar de usar los botones para acercar / alejar. Agregar [gestos táctiles comunes](https://www.lukew.com/ff/entry.asp?1071) , cuando corresponda, puede hacer mucho para que su aplicación se sienta natural.

## Aprovecha las capacidades

Mientras algunas de las capacidades de PWA son ampliamente conocidas, como la [API de Notificaciones](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) que permite a las aplicaciones web recibir y publicar notificaciones nativas, también hay una serie de capacidades nuevas en camino a la web para darle a sus aplicaciones superpoderes. El proyecto de Chromium de [Capacidades Web](https://www.chromium.org/teams/web-capabilities-fugu), también conocido como Proyecto Fugu 🐡, es un esfuerzo para proveer nuevos estándares web poderosos, manteniendo lo que hace a la web única: su seguridad centrada en el usuario, su baja fricción y su compatibilidad multiplataforma.

!!! aside.message--note
**Nota:** Estas capacidades se encuentran en varios estados de desarrollo, desde consideración hasta envío. Si bien es probable que los usuarios de Chrome OS obtengan estas características a medida que estén disponibles, el soporte multiplataforma, incluso el soporte estable en Chrome OS, a veces puede ser un proceso de varios años.
!!!

### Cerrar la brecha con la aplicación nativa

@[youtube](https://www.youtube.com/watch?v=JKVZMqpiY7w)

La mayoría de estas capacidades se construyen para cerrar la brecha entre las aplicaciones nativas y las aplicaciones web, con las primeras capacidades principales que se envían, permitiendo que las aplicaciones web accedan a [los recolectores de contactos](https://web.dev/contact-picker/) nativos y [compartan capacidades](https://web.dev/web-share/) , e instalaron PWA para registrarse como un [objetivo compartido nativo](https://web.dev/web-share-target/) y [mostrar insignias de íconos](https://web.dev/badging-api/) , [por nombrar algunos](https://web.dev/fugu-status/) .

Cada capacidad pasa por un [extenso proceso de estandarización](https://developers.google.com/web/updates/capabilities) para solicitar comentarios de la comunidad para ayudar a dar forma a la API y garantizar que el diseño final sea seguro, privado y confiable. Las nuevas capacidades se rastrean en un [rastreador abierto](https://goo.gle/fugu-api-tracker) y se pueden dividir en una de cinco categorías:

Enviado: Disponible para usar en la última versión estable de Chrome. Se puede usar de manera confiable siempre que su uso se detecte correctamente.

En prueba de origen: disponible como [prueba de origen](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md) (OT) de Chrome, lo que permite que las características experimentales y las API sean validadas por el equipo de Chrome en el uso en el mundo real y le permite proporcionar comentarios sobre la usabilidad y eficacia de la API. Los OT son opcionales y le permiten probar beta esta funcionalidad con sus usuarios sin necesidad de que activen ningún indicador especial en su navegador. Las API pueden cambiar después de un OT, y se garantiza que los OT no estarán disponibles por un período de tiempo antes del lanzamiento, por lo que no deben tratarse como un mecanismo de inicio temprano para las nuevas API.

En Pruebas de desarrollador: disponible detrás de una bandera en Chrome. Estas API son experimentales y aún están en desarrollo activo. Ellos _no_ están listos para su uso en producción, con una buena probabilidad de que haya errores y que las API van a cambiar. Se recomienda encarecidamente _no_ alentar a los usuarios a cambiar los indicadores para habilitar las funciones. Los desarrolladores pueden usar este tiempo para experimentar con características experimentales por su cuenta.

Iniciado: El desarrollo ha comenzado, pero actualmente no existe una API utilizable.

En consideración: API en las que los usuarios han expresado interés, pero la implementación aún no ha comenzado. Si aún no se ha iniciado una API, agréguela a la estrella o agregue sus casos de uso a su problema para ayudar al equipo de Chromium a priorizarla.

### Qué esperar

Con tantas capacidades nuevas que se avecinan, es difícil reducir una lista de lo que tendrá el mayor impacto en la creación de aplicaciones web en Chrome OS. Estas son algunas API clave que ampliarán qué tipos de aplicaciones se pueden construir en la web y, a su vez, para Chrome OS.

#### Prueba de origen

Native File System API: las aplicaciones web de [Native File System API](https://web.dev/native-file-system/) ([spec](https://wicg.github.io/native-file-system/) ) que interactúan con archivos en el dispositivo local del usuario, como editores de fotos, videos y texto. Después de que un usuario concede acceso, esta API permite que las aplicaciones web lean o guarden cambios directamente en archivos y carpetas en el dispositivo del usuario.

#### Prueba de desarrollador

Enumeración de pantalla y colocación de ventana: [la API de enumeración de pantalla](https://github.com/webscreens/screen-enumeration/blob/master/EXPLAINER.md) y la [API de colocación de ventana](https://github.com/webscreens/window-placement/blob/master/EXPLAINER.md) son dos API complementarias que, cuando se usan juntas, permiten que las aplicaciones web comprendan qué pantallas están disponibles y se abran y coloquen ventanas mediante programación en esas pantallas. Con estas API, las aplicaciones web como presentaciones con notas de oradores, paneles de varias ventanas o lienzos con barras de herramientas.

Manejo de archivos: La [API de manejo de archivos](https://github.com/WICG/file-handling/blob/master/explainer.md) permite a las PWA instaladas registrar su capacidad para manejar (leer, transmitir, editar) archivos con tipos MIME y / o extensiones de archivo. Esta API permite que los PWA instalados aparezcan en los cuadros de diálogo "abrir con ..." de los sistemas de archivos nativos al abrir un archivo, y permite a los usuarios configurar el PWA como la aplicación predeterminada para los tipos de archivos compatibles.

Modo de aplicación con pestañas
: [Modo de aplicación con pestañas](https://github.com/w3c/manifest/issues/737) permite a los desarrolladores especificar que su PWA debe dividir su ventana en pestañas, similar a un navegador web con pestañas, excepto que todas las pestañas pertenecen a la aplicación (y no tienen una barra de URL).
