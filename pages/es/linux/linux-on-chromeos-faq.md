---
title: Preguntas frecuentes sobre Linux
metadesc: Preguntas frecuentes sobre el contenedor Linux en Chrome OS.
date: 2020-05-01
weight: 10
---

## ¿Dónde puedo chatear con los desarrolladores?

Todas las discusiones de desarrollo de Chromium OS ocurren en nuestra [Comunidad de ayuda de Chromebook](https://support.google.com/chromebook/community?hl={{locale.code}}) . No dude en preguntar cualquier cosa, pero asegúrese de buscar para ver si su pregunta ya se ha abordado primero.

## ¿Dónde puedo presentar solicitudes de nueva funcionalidad?

Como proyecto incipiente, estamos trabajando en muchas cosas y planeamos publicarlas, por lo que sería bueno esperar por ahora y volver a ingresar después de algunas versiones de Chrome OS.

Mientras tanto, siéntase libre de chatear / preguntar en la lista de correo anterior.

Una vez que estemos en un lugar más estable, puede usar nuestro rastreador de problemas. Vea la siguiente pregunta para más detalles.

## ¿Dónde puedo reportar errores?

Primero asegúrese de estar utilizando el último canal de desarrollo. Aún queda mucho trabajo por hacer.

A continuación, asegúrese de que el problema no sea ya conocido o solucionado. Puede consultar la [lista de errores existente](https://bugs.chromium.org/p/chromium/issues/list?can=1&q=component:OS%3ESystems%3EContainers) .

Si aún desea enviar comentarios, puede [presentar un informe de comentarios](https://support.google.com/chromebook/answer/2982029) e incluir `#crostini` (otro nombre para Linux en Chrome OS) en la descripción. Los comentarios sobre cualquier parte de Chrome OS se pueden presentar con [[Alt]]+[[Shift]]+[[i]].

Si aún desea presentar un error con los desarrolladores, use [este enlace](https://bugs.chromium.org/p/chromium/issues/entry?comment=Chrome%20version%3A%20%28copy%20from%20chrome%3A%2F%2Fversion%29%0AOS%3A%20Chrome%0A%0ARepro%20steps%3A%0A1.%20%0A2.%20%0A3.%20%0A%0AExpected%3A%20%0AActual%3A%20&status=Untriaged&labels=Pri-2%2COS-Chrome%2CType-Bug%2CProj-Containers&components=OS%3ESystems%3EContainers) para enrutar a las personas adecuadas.

## ¿Por qué el nombre Crostini?

Es un juego de palabras a partir de [crouton](https://github.com/dnschneid/crouton) que es un proyecto para crear fácilmente entornos completos de Linux (incluidas las herramientas de desarrollo) para los usuarios que activaron el modo de desarrollador. Crostini (Linux en Chrome OS) tiene como objetivo satisfacer la mayoría de los casos de uso cubiertos por [cruton](https://github.com/dnschneid/crouton) , y es un bocadillo más grande y sabroso que un crutón, de ahí su nombre.

## ¿Cómo se relaciona Crostini (Linux en Chrome OS) con Crouton?

[crouton](https://github.com/dnschneid/crouton) ayudó a definir muchos de los casos de uso que los desarrolladores querían con Chrome OS, por lo que ayudó a guiar Linux en Chrome OS desde una perspectiva de requisitos. Queríamos asegurarnos de que la mayoría de los usuarios de [crouton](https://github.com/dnschneid/crouton) pudieran usar Linux en Chrome OS para sus necesidades, pero en un entorno seguro.

Así que [crouton](https://github.com/dnschneid/crouton) ayudó a inspirar la dirección de Linux en Chrome OS, pero ningún código ha sido compartido o reutilizado entre los dos. No es que [crouton](https://github.com/dnschneid/crouton) sea malo, es simplemente un modelo completamente diferente.

## ¿Cuándo será compatible mi dispositivo?

Actualmente no estamos publicando ninguna información más allá de este documento. Si su dispositivo no figura en la sección [Asistencia para dispositivos](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#Supported-Now) de los documentos oficiales de Chromium OS, aún no hemos tomado ninguna decisión para ese dispositivo específico que esté lista para el público.

Por lo tanto, no nos solicite planes de soporte de dispositivos, ya que no las tenemos.

## ¿Necesito habilitar el modo desarrollador?

No es necesario habilitar el modo de desarrollador (donde ve la pantalla que asusta en el arranque sobre la verificación del sistema operativo desactivada). Todas estas características están diseñadas para ejecutarse de manera segura mientras su sistema se ejecuta en modo normal / verificado.

Para algunos dispositivos, es posible que deba cambiar al [canal de desarrollo](https://support.google.com/chromebook/answer/1086915?hl={{locale.code}}) , pero eso no tiene ninguna relación con el modo desarrollador.

## ¿Estoy ejecutando Linux en Chrome OS?

Si está utilizando la aplicación o los programas de [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--aplicación-terminal) en el contenedor predeterminado que proporcionamos, incluidos nuestros programas para facilitar la integración (por ejemplo, [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) ), entonces sí.

Si está ejecutando su propio contenedor o [VM](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) , entonces no.

## ¿Por qué ejecutar máquinas virtuales? ¿No son seguros los contenedores?

Si bien los contenedores a menudo se aíslan (a través de [namespaces](http://man7.org/linux/man-pages/man7/namespaces.7.html) en Linux), no aíslan el núcleo o recursos similares del sistema. Eso significa que solo se necesita un solo error en el núcleo para explotar completamente el sistema y robar sus datos.

Eso no es lo suficientemente bueno para Chrome OS, por lo tanto, colocamos todo dentro de una [VM](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) . Ahora tiene que explotar [crosvm a](https://chromium.googlesource.com/chromiumos/platform/crosvm/) través de sus interacciones limitadas con el secundario, y [crosvm en](https://chromium.googlesource.com/chromiumos/platform/crosvm/) sí está fuertemente aislado.

Para obtener más detalles, consulte la sección [Seguridad](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) de los documentos oficiales de Chromium OS.

## ¿Cómo comparto archivos entre Chrome OS y el contenedor?

Se puede acceder al almacenamiento predeterminado del contenedor Linux en Chrome OS en "Archivos de Linux" en la aplicación Archivos de Chrome OS. Con [Secure Shell](https://chrome.google.com/webstore/detail/pnhechapfaindjhompbnflcldabbghjo) , puede configurar un montaje SFTP en los otros contenedores remotos y luego navegar a través de la aplicación Archivos.

## ¿Puedo acceder a los archivos cuando el contenedor no se está ejecutando?

Actualmente, el contenedor debe estar ejecutándose para acceder a su contenido. El contenedor predeterminado de Linux en Chrome OS se iniciará automáticamente cuando se acceda a "Archivos de Linux" desde la aplicación Archivos.

## ¿Puedo instalar módulos de kernel personalizados?

Actualmente, no, [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) no incluye soporte para módulos. Eso significa que tratar de usar un software que requiera construir o cargar módulos de kernel personalizados (por ejemplo, VirtualBox) no funcionará. Vea la siguiente pregunta también.

## ¿Puedo ejecutar una VM dentro de la VM?

Actualmente, no, [KVM](https://www.linux-kvm.org/) anidado no es compatible. Puede ejecutar qemu-system para emular el hardware y arrancar el sistema operativo que desee dentro de eso. Desafortunadamente, será bastante lento ya que [QEMU](https://www.qemu.org/) no podrá utilizar [KVM](https://www.linux-kvm.org/) para la aceleración de hardware.

## ¿Puedo ejecutar un contenedor Docker u otro contenedor dentro del contenedor Linux de Chrome OS?

¡Si! Probablemente necesitará instalar los paquetes relevantes primero para cualquier formato de contenedor que desee ejecutar.

## ¿Qué arquitectura funciona en mi sistema?

Como todo es ejecución de código nativo, depende del dispositivo que tenga.

Si no sabe qué dispositivo tiene, puede averiguarlo de dos maneras diferentes:

- En una nueva pestaña, navegue a: chrome://settings/help/ details y mire la Plataforma, luego haga coincidir el nombre de la tarjeta con nuestra [lista de dispositivos](http://dev.chromium.org/chromium-os/developer-information-for-chrome-os-devices) públicos. Mire el campo "User ABI" para ver qué tipo de CPU tiene.
- Abre [crosh](https://chromium.googlesource.com/chromiumos/platform2/+/master/crosh/) y ejecuta `uname -m` . Esto imprimirá la arquitectura de su dispositivo actual.

Si ve `x86_64` , podrá ejecutar el código compilado para Intel / AMD (32 bits / 64 bits / x32 debería funcionar).

Si ve `arm` (o algo similar como `armv7l` ) o `aarch64` , podrá ejecutar el código compilado para ARM / ARM64.

## ¿Puedo ejecutar otras arquitecturas?

Actualmente no hay soporte integrado para ejecutar, por ejemplo, código ARM en un sistema Intel, o viceversa. Puede manejar esto usted mismo (por ejemplo, usando qemu-user), pero si está familiarizado con qemu-user, entonces ya lo sabe.

## ¿Puedo ejecutar programas que siguen ejecutándose después de cerrar sesión?

No! Todas las [máquinas virtuales](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) (y sus contenedores) están vinculadas a su sesión de inicio de sesión. Tan pronto como cierre la sesión, todos los programas se cerrarán / eliminarán por diseño.

Dado que todos sus datos viven en su hogar encriptado, no nos gustaría que eso se filtre cuando cierre la sesión.

Para obtener más detalles, consulte la sección [Seguridad](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) de los documentos oficiales de Chromium OS.

## ¿Puedo ejecutar programas automáticamente cuando inicio sesión?

No! Todas las [máquinas virtuales](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) (y sus contenedores) deben relanzarse manualmente. Esto ayuda a prevenir ataques persistentes.

Para obtener más detalles, consulte la sección [Seguridad](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) de los documentos oficiales de Chromium OS.

## ¿Puedo ejecutar programas automáticamente cuando inicio?

No! Ver las preguntas anteriores.

## ¿Puedo establecer variables de entorno para mi contenedor?

¡Por supuesto! Hay algunas formas de hacer esto.

- [environment.d](https://www.freedesktop.org/software/systemd/man/environment.d.html) le permite establecer variables de entorno para su sesión `systemd --user` , que incluye el [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--aplicación-terminal) y todas las aplicaciones GUI. Es posible que necesite un contenedor más nuevo, [Debian](https://www.debian.org/) 10 "buster", para utilizar este método.
- Si desea variables de entorno en su [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--aplicación-terminal), las puede establerce en los archivos de configuración del shell, como por ejemplo `~/.bashrc` o `~/.zshrc`.

Los cambios en las variables de entorno solo tienen efecto para los programas recién iniciados. También es posible que deba reiniciar los programas o todo el contenedor para que los cambios surtan efecto.

## ¿Se admite perfiles múltiples?

No, [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--aplicación-terminal) solo se admite en el perfil primario (\*). Nuestro objetivo es tener una experiencia totalmente funcional y fluida para el perfil primario, y no bloquear o causar problemas en los perfiles secundarios. No planeamos hacer que los perfiles secundarios más funcionales.

Si no está familiarizado con [pérfiles múltiples](https://support.google.com/chromebook/answer/6088201) , visite la [documentación general de pérfiles múltiples](https://support.google.com/chromebook/answer/6088201?hl={{locale.code}}) para más detalles.

(\*): La aplicación [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--aplicación-terminal) está deshabilitada en todos los perfiles secundarios. Las personas pueden iniciar [máquinas virtuales](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) manualmente a través de [crosh](https://chromium.googlesource.com/chromiumos/platform2/+/master/crosh/) y contenedores, pero la aplicación de interfaz de usuario y archivos probablemente no funcionará automáticamente.

## ¿Se admiten cuentas secundarias?

No, [Terminal](/{{locale.code}}/linux/linux-on-chromeos-glossary#term--aplicación-terminal) no es compatible con [cuentas secundarias](https://support.google.com/families/answer/7680868?hl={{locale.code}}) . No tenemos planes de poner esto a disposición de dichas cuentas.

Si no está familiarizado con [cuentas secundarias](https://support.google.com/families/answer/7680868), visite la documentación general sobre [cuentas secundarias](https://support.google.com/families/answer/7680868?hl={{locale.code}}) para más detalles.

## ¿Mis máquinas virtuales / contenedores / datos están sincronizados / respaldados?

En última instancia, usted es responsable de los datos que ingresan a los contenedores. Para sincronizar fácilmente datos como una carpeta de proyecto entre máquinas, puede [compartir una carpeta en Drive con Linux](/{{locale.code}}/linux/setup#compartir-archivos-a-linux). Todo lo que agregue a esa carpeta se respaldará en Drive y se sincronizará entre sus dispositivos.

## ¿Cómo puedo hacer una copia de seguridad de una VM?

El enfoque más simple es utilizar la nueva función de copia de seguridad integrada en Chrome OS. Para hacerlo, vaya a Configuración y seleccione "Desarrolladores" en el panel de navegación del lado izquierdo. Luego navegue a "Linux". Encontrará "Copia de seguridad y restauración". Si navega por este menú, encontrará un Botón "Copia de seguridad" que guarda un archivo `.tini`.

Si desea realizar una copia de seguridad de un contenedor individual, otro enfoque es utilizar los comandos estándar [LXC](https://linuxcontainers.org/lxc/introduction/).

## ¿Puedo acceder a los archivos VM / contenedor directamente (por ejemplo, a través de la aplicación Archivos)?

Actualmente, no, no hay forma de acceder a los archivos de imagen utilizados por la [VM](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) . No hay planes para cambiar esto.

Si desea respaldar las cosas, deberá hacerlo a mano.

## ¿Por qué el tiempo dentro de la VM / contenedor no está sincronizado?

El reloj dentro de la [VM](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) (y, por extensión, los contenedores) se mantiene sincronizado automáticamente con el reloj de Chrome OS. Por lo tanto, no tiene que ejecutar los servicios de mantenimiento de tiempo usted mismo (por ejemplo, ntp). Ese reloj se basa en [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) .

Comenzando con R75, intentamos sincronizar los datos de la zona horaria en el contenedor a través de [timedatectl](https://www.freedesktop.org/software/systemd/man/timedatectl.html) . Si eso no funciona, recurrimos a la exportación de la variable de entorno `TZ` .

Actualmente no actualizamos los detalles de la zona horaria dentro de la propia [máquina virtual](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) . Tampoco intentamos actualizar ninguna otra configuración de zona horaria, ya que no son estándar en todas las distribuciones. Por lo tanto, puede parecer que el tiempo es incorrecto de un vistazo en esos entornos, o se vence si se usa la variable de entorno `TZ` .

Consulte [https://crbug.com/829934](https://crbug.com/829934) para obtener más detalles técnicos. ¡Es más complicado de lo que parece!

## ¿Qué formatos de copiar y pegar son compatibles?

Actualmente, solamente contenido `text/plain` tiene soporte. Planeamos agregar más formatos pronto (e.g. [`image/png`](https://crbug.com/789824) y [`text/rtf`](https://crbug.com/809898)).

Puede ver la lista actual compatible en [exo / data_source.cc](https://chromium.googlesource.com/chromium/src/+/master/components/exo/data_source.cc) .

Si bien [X](https://en.wikipedia.org/wiki/X_Window_System) / [Wayland](https://wayland.freedesktop.org/) admite una cantidad arbitraria de formatos [MIME](https://en.wikipedia.org/wiki/MIME) , nuestro objetivo final es admitir solo todos los formatos que Chrome mismo admite. Vea el archivo [clipboard_constants.cc](https://chromium.googlesource.com/chromium/src/+/master/ui/base/clipboard/clipboard_constants.cc) para esa lista.

Cabe destacar que solamente estamos hablando de limitaciones en el tipo de datos que se guardan en el portapapeles. [Wayland](https://wayland.freedesktop.org/) las aplicaciones siguen teniendo la capacidad de transferir datos directamente entre ellas en cualquier formato arbitrario que utilicen.

## ¿Puedo leer / escribir el portapapeles automáticamente desde el interior de la VM?

Actualmente no.

Desde el punto de vista de la seguridad, no queremos que el código inseguro o que extraiga automáticamente lo que el usuario haya copiado. Quizás la sesión de su navegador esté copiando datos personales o contraseñas. Es el mismo problema con el que se encuentra la [plataforma web](https://developers.google.com/web/updates/2018/03/clipboardapi#security_and_permissions) .

Esto no es lo mismo que los usuarios pegan datos manualmente (por ejemplo, [[Ctrl]]+[[V]]). Esto es solo sobre lectura programática.

No esperamos que se mantenga así para siempre. Una vez que tengamos un modelo de permisos y una interfaz de usuario para administrar estas cosas, podemos considerar permitir que los usuarios otorguen este permiso.

Si usa las herramientas `xclip` o [X](https://en.wikipedia.org/wiki/X_Window_System) , a menudo tienen un búfer local (en [XWayland](https://wayland.freedesktop.org/xserver.html) ), pero no se sincronizará automáticamente con el resto del sistema.

## ¿Tengo que administrar las actualizaciones de VM?

No! [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) [VM](https://en.wikipedia.org/wiki/Virtual_machine) es un [componente](https://chromium.googlesource.com/chromium/src/+/lkgr/components/component_updater/README.md) que se actualiza automáticamente.

Tenga en cuenta que la [VM](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) está separada del contenedor.

## ¿Cómo verifico la versión de Termina?

Dado que [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) es un componente descargado, puede visitar chrome: // components en una nueva pestaña y buscar `cros-termina` .

También puede conectarse a una [máquina virtual a](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) través de [vsh](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/vsh/) y ejecutar `cat /etc/lsb-release` .

## ¿Tengo que administrar las actualizaciones de contenedores?

Los paquetes proporcionados por Google en el contenedor que se comunican con Chrome OS o son necesarios para la integración de Chrome OS se actualizarán automáticamente de forma regular. Esto instalará cualquier dependencia necesaria automáticamente.

No hay actualización automática de otros paquetes instalados en el contenedor. Preferiríamos evitar la actualización de paquetes que podrían romper programas ya instalados. El contenedor es como cualquier otra distribución de Linux, por lo que deberá actualizarlo de vez en cuando si desea un software más nuevo.

Puede ejecutar `sudo apt-get update && sudo apt-get dist-upgrade` .

## ¿Puedo usar IPv6?

Sí, comenzando con R81. Se admiten redes de doble pila y solo IPv6.

Chrome OS solo es compatible con SLAAC; Lea más en la página de soporte para [soporte de IPv6 en Chrome OS](https://support.google.com/chrome/a/answer/9211990?hl={{locale.code}}) .

## ¿Puedo acceder a la red de capa 2?

Actualmente, no, el acceso a la red es solo en la capa 3 (es decir, IP). Por lo tanto, no podrá hacer ningún puente o cosas divertidas de nivel inferior.

No está claro si / cuándo esto cambiará. Conectarse con el mundo exterior es difícil con WiFi, y no muchos dispositivos tienen conexiones Ethernet. Podríamos admitir la capa 2 entre contenedores, pero no está claro cuántas personas quieren esto para justificar el esfuerzo involucrado.

## ¿Funcionan las VPN configuradas por CrOS / Android (fuera de la máquina virtual / contenedores)?

Actualmente no. Puede seleccionar [https://crbug.com/834585](https://crbug.com/834585) para actualizaciones.

## ¿Se admite la salida de audio?

Sí, comenzando con R74 ([Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) versión 11707.0.0+).

Si configuró su contenedor antes de que se implementara el soporte de audio, es posible que no esté configurado correctamente (ya que el valor predeterminado anterior era la salida al dispositivo nulo). Puede probar estos pasos para recuperarlo:

```shell
# Make sure the new cros-pulse-config package is installed.
$ sudo apt-get update
$ sudo apt-get dist-upgrade

# Clear out existing pulse settings.
$ rm -rf ~/.config/pulse

# Turn it off & on again via crosh ([[Ctrl]]+[[Alt]]+[[T]]).
crosh> vmc stop termina
```

## ¿Se admite la captura de audio (por ejemplo, micrófono)?

Esto ahora es compatible con la versión Chrome OS M84. Para habilitar la captura de audio, vaya a Configuración y seleccione "Desarrolladores" en la barra de navegación del lado izquierdo. Luego navegue a "Linux". Encontrará "Permitir que Linux acceda a su micrófono" como una opción en ese menú.

## ¿Puedo acceder al hardware (p. Ej. USB / Bluetooth / serie)?

Chrome OS ahora le permite compartir ciertos dispositivos a través de USB. Para habilitar el acceso USB, vaya a Configuración y seleccione "Desarrolladores" en el panel de navegación del lado izquierdo. Luego navegue a "Linux" y luego a "Preferencias USB". Aquí puede habilitar el acceso USB para cada caso.

Esta es un área de desarrollo activo para el equipo y, con el tiempo, se admitirán más dispositivos.

## ¿Puedo ejecutar programas Wayland?

Sí, y de hecho, ¡estos son los preferidos! El propio Chrome trata en gran medida con los clientes de [Wayland](https://wayland.freedesktop.org/) , por lo que es mucho más probable que las cosas "funcionen" si actualizas.

[Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) ofrece este soporte a la perfección.

## ¿Puedo ejecutar programas X?

Sí, aunque puede encontrar algunos problemas de compatibilidad, y probablemente nunca será tan perfecto como ejecutar un servidor [X](https://en.wikipedia.org/wiki/X_Window_System) tradicional. Sin embargo, con la comunidad en general mudarse a [Wayland](https://wayland.freedesktop.org/) , debería ser lo suficientemente bueno.

[Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) se encarga de lanzar [XWayland](https://wayland.freedesktop.org/xserver.html) , actuar como [WM](https://en.wikipedia.org/wiki/X_window_manager) y, de lo contrario, traducir las solicitudes de [X](https://en.wikipedia.org/wiki/X_Window_System) y [Wayland](https://wayland.freedesktop.org/) entre Chrome y los programas [X.](https://en.wikipedia.org/wiki/X_Window_System)

## ¿Por qué las ventanas a veces son pequeñas / borrosas?

Las aplicaciones de Linux que están visibles en el estante del lanzador deben tener la opción de usar alta o baja densidad. Si encuentra que la resolución no funciona como lo desea, haga clic con el botón derecho en el ícono para revelar la capacidad de alternar entre alta y baja densidad.

Si bien Chrome admite pantallas de [alta DPI](https://en.wikipedia.org/wiki/HiDPI) , muchas aplicaciones de Linux no. Cuando un programa no admite correctamente el escalado de [DPI](https://en.wikipedia.org/wiki/Dots_per_inch#Computer_monitor_DPI_standards) , siguen resultados pobres.

Actualmente exponemos la resolución nativa y [DPI](https://en.wikipedia.org/wiki/Dots_per_inch#Computer_monitor_DPI_standards) directamente a las aplicaciones. Si aparecen pequeños o borrosos, es porque no admiten la escala adecuada. Debe informar estos problemas a los respectivos proyectos ascendentes para que, con suerte, algún día, "simplemente funcione".

Mientras tanto, [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) expone algunas configuraciones de tiempo de ejecución para que pueda establecer el factor de escala por programa para evitar el mal comportamiento. Consulte la documentación del [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) para obtener más detalles.

Si está aplicando un zoom de todo el sistema o si está cambiando la resolución de pantalla predeterminada, intentaremos escalar el resultado de la aplicación para que coincida. Esto puede conducir a resultados borrosos. Puede ajustar la resolución de su pantalla o ajustar las cosas a través de [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) (consulte más arriba para obtener más detalles). Las aplicaciones de Linux que están visibles en el estante del iniciador deben tener la opción de usar alta o baja densidad. Si encuentra que la resolución no funciona como se desea, haga clic derecho en el icono para revelar la capacidad de alternar entre alta y baja densidad.

## ¿Funcionará Synergy?

[Synergy](https://symless.com/synergy) no funcionará (como cliente o servidor). Requiere capturar y falsificar entradas (por ejemplo, mouse / teclado) para todas las ventanas. Dado que estamos construidos sobre [Wayland](https://wayland.freedesktop.org/) , por diseño, un cliente no puede obtener acceso a ningún otro cliente en el sistema. Este es un límite de seguridad sólido entre los clientes, ya que no queremos que el código arbitrario se ejecute dentro de un contenedor que pueda explotar y atacar a otros clientes (como el navegador) y enviar pulsaciones de teclas arbitrarias.

No hay planes para habilitar este tipo de control desde el contenedor. Esto no quiere decir que una solución similar a Synergy nunca sucederá en Chrome OS (por ejemplo, algo así como [CRD](https://support.google.com/chrome/answer/1649523) ), solo que la solución no será synergy ni ninguna otra herramienta en un contenedor.

Puede ejecutar synergy y, probablemente, hacer que transmita eventos de entrada para la única ventana en la que se está ejecutando, pero eso es lo más lejos que llegará.

## ¿Puedo ejecutar programas de Windows?

Claro, prueba [WINE](https://www.winehq.org/) . Sin embargo, la compatibilidad dependerá en gran medida de [WINE](https://www.winehq.org/) , así que no nos solicite asistencia.

## ¿Puedo ejecutar programas macOS?

Probablemente no. Podrías probar varias soluciones Linux existentes, pero es muy probable que la experiencia no sea nada buena.

## ¿Por qué implementar crosvm desde cero (en lugar de usar QEMU / kvmtool / etc ...)?

No tenemos nada en contra de ninguno de estos otros proyectos. De hecho, todos son geniales, y sus diseños influyeron en los nuestros. Más significativamente, hicieron más de lo que necesitábamos y no tenían un modelo de seguridad tan bueno como el que pudimos lograr escribiendo el nuestro. Si bien [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/) no puede hacer todo lo que esos otros proyectos pueden hacer, solo hace lo que necesitamos.

Para obtener más detalles, consulte el proyecto [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/) .

## ¿Las máquinas virtuales no hacen todo más lento?

Ciertamente es cierto que las [máquinas virtuales](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) agregan gastos generales en comparación con la ejecución solo en un contenedor o directamente en el sistema. Sin embargo, en nuestras pruebas, los gastos generales son insignificantes para la experiencia del usuario, y bien valen las fuertes ganancias en seguridad del sistema.

Para obtener más detalles, consulte la sección [Seguridad](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) de los documentos oficiales de Chromium OS.

## ¿Por qué ejecutar contenedores dentro de la VM? ¿Por qué no ejecutar programas directamente en la VM?

Para mantener bajos los tiempos de inicio de [VM](https://en.wikipedia.org/wiki/Virtual_machine) , necesitamos que [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) sea lo más ligero posible. Eso significa cortar programas / archivos que no necesitamos o no nos interesan.

Usamos [dm-verity,](https://gitlab.com/cryptsetup/cryptsetup/wikis/DMVerity) que requiere que la imagen de [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) sea de solo lectura para [seguridad](https://chromium.googlesource.com/chromiumos/docs/+/1792b43fc9fd32b4e9e4aa03ad20a6c24f511d84/containers_and_vms.md#security) , pero también significa que podemos compartirla de manera segura entre instancias de [VM](https://en.wikipedia.org/wiki/Virtual_machine) .

Además, las versiones de programas / bibliotecas que enviamos son con frecuencia más nuevas que otras distribuciones (ya que construimos a partir de [Gentoo](https://gentoo.org/) ), y están compiladas con banderas de seguridad adicionales.

Permitir modificaciones de usuario a la [máquina virtual](https://en.wikipedia.org/wiki/Virtual_machine) evita una imagen sin estado que siempre funciona y que, de lo contrario, es inmune a los errores y errores de los usuarios en los programas.

En conjunto, es difícil admitir la ejecución de programas arbitrarios, y daría como resultado que un sistema carezca de muchas propiedades deseadas descritas anteriormente. Forzar todo en un contenedor produce una solución más robusta y permite a los usuarios experimentar libremente sin preocupaciones.

Además, [nos encantan las tortugas](https://en.wikipedia.org/wiki/Turtles_all_the_way_down) .

## ¿Se maneja Foreshadow (también conocido como L1TF / CVE-2018-3646)?

Si. Para más detalles, consulte nuestra [documentación pública](https://dev.chromium.org/chromium-os/containers-update) .

## ¿Puedo eliminar contenedores que ya no quiero?

Claro, siéntase libre de eliminar lo que quiera. Sin embargo, no hay interfaz de usuario o comandos actualmente para ayudar con esto.

!!! aside.message--note
**Nota:** El contenedor predeterminado de Linux en Chrome OS se llama `penguin` .
!!!

## ¿Puedo eliminar máquinas virtuales que ya no quiero?

Claro, siéntase libre de eliminar lo que quiera. El comando `vmc destroy` puede usarse para eliminarlos manualmente.

!!! aside.message--note
**Nota:** El Linux predeterminado en Chrome OS [vm](https://en.wikipedia.org/wiki/Virtual_machine) se llama `termina` .
!!!

## ¿Puedo desactivar estas funciones?

Los administradores pueden controlar el acceso a contenedores / [VMs](https://en.wikipedia.org/wiki/Virtual_machine) a través de la consola de administración, por lo que las organizaciones empresariales / educativas que desean limitar esto pueden hacerlo.

Inicialmente hay una opción "Linux" en la configuración estándar de Chrome OS, pero el plan a largo plazo es eliminar este botón para que todo funcione a pedido. En ese momento, no habrá perilla para dispositivos no administrados.

## ¿Puedo iniciar otro sistema operativo como Windows, macOS, Linux, \* BSD, etc.?

Actualmente, no, solo puede iniciar nuestra [VM](https://en.wikipedia.org/wiki/Virtual_machine) Linux personalizada llamada [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) . Vea también las siguientes preguntas.

## ¿Puedo ejecutar mi propia VM / kernel?

Actualmente, no, solo puede iniciar [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) que utiliza nuestro kernel y configuraciones de Linux personalizados. ¡Manténganse al tanto!

## ¿Puedo ejecutar una distribución de Linux diferente?

¡Por supuesto! La línea de comando completa de LXD está disponible, y el control remoto de imágenes incluido tiene muchas otras distribuciones para elegir. Sin embargo, no probamos con otra cosa que no sea el contenedor predeterminado que enviamos, por lo que las cosas pueden romperse al ejecutar otra distribución.

## Estoy ejecutando <insertar distro aquí>, ¿cómo obtengo {aplicaciones GUI, iconos de iniciador, etc ...}?

Los binarios de [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) y [Garcon](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/garcon/) están disponibles en cada contenedor, así que no necesita instalarlos con recompilarlos. Las unidades systemd units y los archivos de configuración de [cros-container-guest-tools](https://chromium.googlesource.com/chromiumos/containers/cros-container-guest-tools/) empiezan estos procesos en una sesión de usuario de systemd. También es una buena idea ejecutar `loginctl enable-linger <user>` para permitir que estos sigan ejecutándose en segundo plano.

## ¿Cuántas máquinas virtuales puedo ejecutar?

Puede generar tantos como su sistema pueda manejar (RAM / CPU). Todos son independientes entre sí.

## ¿Cuántos contenedores puedo ejecutar?

Puede generar tantos como su sistema pueda manejar (RAM / CPU). Cada instancia de [VM](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) puede alojar múltiples contenedores.

## ¿Qué formatos de contenedor son compatibles?

[Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) actualmente solo admite [LXC](https://linuxcontainers.org/lxc/introduction/) directamente. Somos conscientes de Kubernetes / Docker / OCI / rkt / etc ... y esperamos que sean fáciles de usar.

Vea la pregunta anterior para una solución mientras tanto.
