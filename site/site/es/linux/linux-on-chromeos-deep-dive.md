---
title: Temas avanzados
metadesc: Documentación avanzada sobre  ejecución de contenedores Linux personalizados en Chrome OS, incluidas características de tiempo de ejecución, seguridad, sus ciclos de vida y soporte de dispositivos.
date: 2020-05-01
---

!!! aside.message--warning
Este es un proceso avanzado que no recomendamos para nuevos usuarios de Linux.
!!!

Chrome OS permite la ejecución de código arbitrario dentro de [máquinas virtuales](https://en.wikipedia.org/wiki/Virtual_machine) . Esta es la documentación detallada sobre ese soporte; Para una vista más fácil de usar, visite [las preguntas frequentes](/{{locale.code}}/linux/linux-on-chromeos-faq)

## Prerrequisitos

- Asegúrese de que su dispositivo Chrome OS sea [compatible con Linux en Chrome OS](https://sites.google.com/a/chromium.org/dev/chromium-os/chrome-os-systems-supporting-linux)
- Asegúrese de estar ejecutando Chrome OS versión 72 (M72 +) o superior (lanzado en febrero de 2019).
  - Inicie una [actualización del sistema](https://support.google.com/chromebook/answer/177889?hl={{locale.code}}) si es necesario y reinicie.
  - Esto debería funcionar en el [canal estable](https://support.google.com/chromebook/answer/1086915?hl={{locale.code}}) .
  - **No** es necesario ponerlo en modo de desarrollador.
- [Habilite el contenedor de Linux](/{{locale.code}}/linux/setup)

## Características de tiempo de ejecución

Debería esperar que las siguientes características funcionen al ejecutar su contenedor Linux:

- Conexiones de red salientes (IPv4).
- Gráficos no acelerados.
- Gráficos acelerados (a través de OpenGL).
- Programas [Wayland](https://wayland.freedesktop.org/) (preferido; a través de [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) ).
- Programas [X](https://en.wikipedia.org/wiki/X_Window_System) (compatibilidad a través de [Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) y [XWayland](https://wayland.freedesktop.org/xserver.html) ).
- Salida de audio en M74 + y [captura / micrófono](https://crbug.com/932268) experimental en imágenes R79 +.

### Funciones que faltan

Hay muchas funcionalidades básicas en las que estamos trabajando para desarrollar. Un par de ejemplos claros son:

- Decodificación de hardware de video.
- [IME](https://crbug.com/826614)

Si bien se están considerando más cosas, el equipo de Chrome OS adopta un enfoque medido para implementar nuevas funciones para garantizar que la seguridad general del sistema no se vea comprometida. Consulte las [Preguntas frecuentes de Crostini]({{page.url}}../linux-on-chromeos-faq) para obtener información más detallada que cubre la mayoría de los temas relacionados con Linux en el desarrollo de Chrome OS.

## Seguridad

Si bien la ejecución de código arbitrario es normalmente un riesgo de seguridad, el equipo de Chrome OS cree que el modelo de tiempo de ejecución empleado por Linux en el contenedor de Chrome OS mitiga y contiene suficientemente ese riesgo de seguridad. La [máquina virtual](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual) (VM) es el límite de seguridad, y todo lo que se encuentra dentro de ella se considera no confiable. La imagen de invitado de VM actual también está ejecutando un núcleo reforzado a medida para mejorar aún más la seguridad de los contenedores, pero se considera que es una buena característica en lugar de confiar en ella para garantizar la seguridad general del sistema.

En este modelo, el resto del sistema Chrome OS debe permanecer protegido del código arbitrario (malicioso o accidental) que se ejecuta dentro de los contenedores dentro de la VM.

El único contacto con el mundo exterior es a través de [crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/) , y cada canal se comunica con procesos individuales (cada uno de los cuales está fuertemente protegido).

### Datos de usuario en el contenedor

Con el cambio a los servicios en la nube, el pensamiento de seguridad actual destaca el hecho de que obtener credenciales de cuenta (por ejemplo, [sus contraseñas de Google / Facebook](https://xkcd.com/1200/) ) es un vector de ataque más lucrativo que atacar su computadora de escritorio o portátil. No están equivocados La solución actual de Chrome OS VM / container actualmente no mejora en esto. En pocas palabras, cualquier cosa ingresada en el contenedor es responsabilidad del usuario actualmente. Por lo tanto, si ejecuta un contenedor inseguro o comprometido, y luego escribe sus contraseñas en el contenedor, pueden ser robadas incluso mientras el resto del sistema Chrome OS permanece seguro.

### Proceso de persistencia

Los procesos en máquinas virtuales y contenedores no sobreviven al cierre de sesión (ya que viven en el almacenamiento cifrado del usuario) y se eliminan automáticamente. Tampoco comienzan automáticamente al iniciar sesión (para evitar ataques persistentes), ni pueden ejecutarse automáticamente al inicio (sin una sesión de inicio de sesión) ya que no serían accesibles (ya que están en el almacenamiento cifrado del usuario).

### Código ejecutable y grabable

La imagen de disco de [Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) VM se descarga en la partición con estado de escritura como otros [componentes de Chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/components/component_updater/README.md) . Para asegurarse de que el contenido no se modifique, se utiliza [dm-verity](https://gitlab.com/cryptsetup/cryptsetup/wikis/DMVerity). Esto también significa que solo se pueden cargar imágenes firmadas por Google, y la imagen siempre es de solo lectura.

### Ataques de hardware

Las vulnerabilidades Meltdown / Spectre tienen implicaciones para el uso seguro de máquinas virtuales. Hemos aplicado correcciones y mitigaciones para asegurarnos de que las máquinas virtuales no puedan atacar el sistema host u otras máquinas virtuales. Consulte la página wiki de Chromium OS sobre el [estado de vulnerabilidad Meltdown y Spectre para dispositivos Chrome OS](http://dev.chromium.org/chromium-os/meltdown-spectre-vulnerability-status) para más detalles.

## Ciclos de vida

Una vez que haya [habilitado el contenedor de Linux](/{{locale.code}}/linux/setup) (que se encarga de instalar todos los demás componentes necesarios como Termina), el sistema está listo para usar.

Si bien estos componentes pueden instalarse, nada comienza a ejecutarse de inmediato. Cuando cierra la sesión, todo se cierra y finaliza, y cuando inicia sesión, nada se reinicia automáticamente.

Cuando ejecuta la aplicación Terminal, o cualquier otra aplicación de Linux que inicie el contenedor, y su contenedor principal aún no se está ejecutando, la máquina virtual Termina se iniciará automáticamente, y el contenedor predeterminado de Linux en Chrome OS (también conocido como Crostini) comenzar en Termina. Esto le permite conectarse al contenedor a través de SSH o SFTP (a través de la aplicación Archivos).

Cuando cierra todas las aplicaciones visibles, las máquinas virtuales / contenedores no se apagan. Si lo desea, puede [detenerlos e iniciarlos manualmente](/{{locale.code}}/linux/setup#reiniciar-el-contenedor-de-linux), así como generar más contenedores que solo el predeterminado.

### Persistencia de datos

Todas las máquinas virtuales y contenedores creados, y los datos dentro de esos contenedores, persistirán en las sesiones de usuario (cierre de sesión / inicio de sesión). Se mantienen en el mismo almacenamiento cifrado por usuario que el resto de los datos del navegador.

Si una VM o contenedor se detiene o se mata incorrectamente (por ejemplo, perdida de eléctricidad), los datos pueden perderse y necesitar una recuperación como cualquier otra cosa en el sistema.

## Soporte del dispositivo

Si bien el deseo es que Linux en Chrome OS funcione con todas las Chromebooks, las características requeridas del kernel y el hardware limitan el lugar donde se puede implementar. El equipo se ha centrado en la seguridad y la estabilidad del sistema, mientras que respalda las funciones donde tiene sentido. Esta es un área de esfuerzo continuo.

### Dispositivos disponibles actualmente

Para obtener una lista de los dispositivos que son compatibles actualmente, consulte los [sistemas Chrome OS que admiten Linux](https://sites.google.com/a/chromium.org/dev/chromium-os/chrome-os-systems-supporting-linux) .

### Requisitos de hardware

Si bien actualmente no se requiere una cantidad mínima de RAM, almacenamiento o velocidad de CPU para ejecutar el contenedor Linux en Chrome OS, cuanto más tenga de cada uno, mejor será el rendimiento del sistema.

Dicho esto, necesitará una CPU que admita [la virtualización de hardware](https://en.wikipedia.org/wiki/Hardware_virtualization) . En plataformas x86, esto tiene [muchos nombres](https://en.wikipedia.org/wiki/X86_virtualization) . Intel se refiere a él como [VT-x](https://en.wikipedia.org/wiki/Intel%20VT-x) y [VMX](https://en.wikipedia.org/wiki/Intel%20VT-x) . AMD se refiere a él [AMD-V](https://en.wikipedia.org/wiki/AMD-V) y [SVM](https://en.wikipedia.org/wiki/AMD-V) .

#### Sistemas BayTrail

Las Chromebook que usan BayTrail de Intel no incluyen VT-x. Si bien esta CPU normalmente incluye VMX, la variante en Chromebooks no lo hace y, por lo tanto, desafortunadamente, nunca será compatible.

Puede buscar si se admite una tarjeta buscando en nuestra [lista de dispositivos](http://dev.chromium.org/chromium-os/developer-information-for-chrome-os-devices) públicos `BayTrail` en la columna `Platform` .

### Núcleos anteriores

**No hay planes para admitir Linux 3.14 o anterior.** Estos requieren migraciones de nuevas características que son extensas y a menudo invasivas. Por ejemplo:

- [vsock](https://crbug.com/763970)
- [aarch64 kvm](https://crbug.com/846515)
- [Sombra/L1TF](https://crbug.com/875512)

Puede buscar si una tarjeta es compatible buscando en nuestra [lista de dispositivos](http://dev.chromium.org/chromium-os/developer-information-for-chrome-os-devices) públicos números de versión inferiores a 3.14 en la columna `Kernel` .

### CPU ARM de 32 bits

Hacer que las máquinas virtuales funcionen con CPU ARM de 32 bits es difícil, no estándar y requiere coordinación con el firmware. Desafortunadamente, el firmware de Chrome OS ha tendido a no configurar las extensiones. Como tal, estos sistemas no son compatibles.

Puede buscar si una tarjeta es compatible buscando en nuestra [lista de dispositivos](http://dev.chromium.org/chromium-os/developer-information-for-chrome-os-devices) públicos el `arm` debajo de la columna `Kernel ABI` .
