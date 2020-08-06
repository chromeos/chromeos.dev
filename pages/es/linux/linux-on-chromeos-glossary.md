---
title: Glosario
metadesc: Glosario de términos relacionados con la ejecución de entornos Linux en Chrome OS.
date: 2020-05-01
weight: 12
---

[9s](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/9s/) : un servidor para el protocolo del sistema de archivos [9P](http://man.cat-v.org/plan_9/5/intro) . Hay una instancia de 9s para cada [VM](#term--vm) y proporciona a esa VM acceso a los datos del usuario almacenados fuera de la VM. Esto incluye cosas como la carpeta Descargas, Google Drive y medios extraíbles. El ciclo de vida de cada instancia de 9s es administrado por [Seneschal](#term--seneschal) . Cada instancia de 9s comienza sin acceso a ningún archivo. El acceso a rutas específicas se otorga enviando un mensaje a Seneschal, que hace que la ruta solicitada esté disponible para la instancia de 9s especificada. Las solicitudes para compartir rutas solo pueden ser activadas por alguna acción del usuario.

[AMD-V](https://en.wikipedia.org/wiki/AMD-V) : AMD Virtualization, el nombre comercial de AMD para extensiones de virtualización de hardware.

ARC: App Runtime para Chrome; el método antiguo / obsoleto de ejecutar aplicaciones de Android en un entorno limitado de Chrome [NaCl](https://developer.chrome.com/native-client) (Native Client). Tenía problemas de compatibilidad aleatoria.

ARC ++: Android Runtime para Chrome [plus plus]; El método actual para arrancar Android en un contenedor en Chrome OS.

[Cicerone](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/cicerone/) : un demonio que se ejecuta en Chrome OS que maneja todas las comunicaciones directamente con la [VM](#term--vm) y el contenedor una vez que el contenedor comienza a ejecutarse. Específicamente, se comunica con [Tremplin](#term--tremplin) (que se ejecuta dentro de la VM y [Garcon](#term--garcon) (que se ejecuta en un contenedor dentro de la VM).

[Concierge](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/concierge/) : un demonio que se ejecuta en Chrome OS que maneja la gestión del ciclo de vida de máquinas virtuales y contenedores y utiliza gRPC sobre vsock para comunicarse con [Maitred](#term--maitred) .

[crosh](https://chromium.googlesource.com/chromiumos/platform2/+/master/crosh/) : shell de Chrome OS; un shell de desarrollador restringido para ejecutar un puñado de comandos.

Crostini / Linux en Chrome OS: el término general para hacer que el soporte de aplicaciones Linux sea fácil de usar e integrarse bien con Chrome OS. Se centra principalmente en conseguirle una [Terminal](#term--terminal-app) con un contenedor con fácil acceso para instalar cualquier herramienta centrada en el desarrollador que desee. Es la experiencia predeterminada del sistema.

[crosvm](https://chromium.googlesource.com/chromiumos/platform/crosvm/) : un monitor de máquina virtual personalizado que se encarga de administrar [KVM](#term--kvm) , la [máquina virtual](#term--vm) invitada y facilitar la comunicación de bajo nivel (basada en [virtio](http://docs.oasis-open.org/virtio/virtio/v1.0/virtio-v1.0.html) ).

[FUSE](https://github.com/libfuse/libfuse/) : manejo del sistema de archivos en [userland](#term--userland) que permite una variedad más amplia de formatos, sistemas de archivos remotos y mejora la seguridad / estabilidad general.

[Garcon](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/garcon/) : un demonio que se ejecuta dentro de un contenedor dentro de la [VM](#term--vm) y proporciona integración con [Cicerone](#term--cicerone) / Chrome para un comportamiento más conveniente / natural. Por ejemplo, si el contenedor desea abrir una URL, Garcon se encarga de volver a conectar esa solicitud con el exterior.

[KVM](https://www.linux-kvm.org/) : Kernel Virtual Machine; La interfaz de Linux para gestionar máquinas virtuales.

[kvmtool](https://git.kernel.org/pub/scm/linux/kernel/git/will/kvmtool.git/) : una herramienta de virtualización simple / rápida.

[LXC](https://linuxcontainers.org/lxc/introduction/) : solución de contenedor de Linux.

[Maitred](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/maitred/) : El proceso que inicia y controla servicios/contenedores dentro de la [VM](#term--vm), es responsable de la comunicación con [Concierge](#term--concierge) (que corre fuera de la VM). Concierge envía solicitudes y Maitred es responsable de que sean ejecutadas.

[QEMU](https://www.qemu.org/) : un emulador de máquina virtual grande / completo.

[Seneschal](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/seneschal/) : un demonio que se ejecuta en Chrome OS que maneja la gestión del ciclo de vida de los servidores [9P](http://man.cat-v.org/plan_9/5/intro) . Cuando [Concierge](#term--concierge) inicia una [VM](#term--vm) , envía un mensaje a Seneschal para que también inicie una instancia de [9s](#term--9s) para esa VM. Luego, mientras configura la VM, Concierge envía un mensaje a [Maitred](#term--maitred) indicándole que se conecte a la instancia de 9s y la monte dentro de la VM.

[Sommelier](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/sommelier/) : un compositor proxy de [Wayland](#term--wayland) que se ejecuta dentro del contenedor. Sommelier proporciona reenvío sin problemas de contenido, eventos de entrada, datos del portapapeles, etc., entre las aplicaciones de Wayland dentro del contenedor y Chrome. Chrome no ejecuta un servidor [X](#term--x) ni admite el protocolo X; por lo tanto, Sommelier también es responsable de iniciar [XWayland](#term--xwayland) (en modo sin raíz), actuar como administrador de ventanas X para los clientes y traducir el protocolo X dentro del contenedor al protocolo Wayland para Chrome.

[SVM](https://en.wikipedia.org/wiki/AMD-V) : Secure Virtual Machine, el nombre abreviado de AMD' para [AMD-V](#term--amd-v).

[Termina](https://chromium.googlesource.com/chromiumos/overlays/board-overlays/+/master/project-termina/) : una imagen de [máquina virtual](#term--vm) con un kernel de Chrome OS Linux simplificado y herramientas de [usuario](#term--userland) . Su único objetivo es arrancar lo más rápido posible y comenzar a ejecutar contenedores. Muchos de los programas / herramientas son personalizados aquí. En retrospectiva, es posible que no fuera la mejor idea un nombre diferente solo por una letra de "Terminal", pero así es.

Aplicación Terminal: el primer punto de entrada a Linux en Chrome OS. Se encarga de iniciar todo lo demás en el sistema con el que interactuará. El contenedor predeterminado lanzado a través de Terminal es [Debian](https://www.debian.org/) con paquetes personalizados, por defecto llamado `penguin` . Vea [cros-container-guest-tools](https://chromium.googlesource.com/chromiumos/containers/cros-container-guest-tools/) para más detalles.

[Tremplin](https://chromium.googlesource.com/chromiumos/platform/tremplin/+/master/) : un demonio que se ejecuta en la [máquina virtual](#term--vm) para proporcionar un contenedor gRPC para LXD. Esto incluye funcionalidades básicas como crear e iniciar contenedores, pero también proporciona otra integración específica de Linux en Chrome OS, como configurar el usuario principal de un contenedor y configurar repositorios aptos en el invitado para que coincida con el hito de Chrome OS.

[userland](https://en.wikipedia.org/wiki/User_space) : todo lo que no se ejecuta dentro del kernel. También conocido como espacio de usuario.

[VM](https://en.wikipedia.org/wiki/Virtual_machine) : máquina virtual; una forma de arrancar un sistema operativo diferente en un entorno fuertemente aislado.

[vmc](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/concierge/) : comando [crosh](#term--crosh) para administrar manualmente instancias de [VM](#term--vm) personalizadas a través de [Concierge](#term--concierge) .

[VMX](https://en.wikipedia.org/wiki/Intel%20VT-x) : Extensiones de máquina virtual; Nombre corto de Intel para [VT-x](#term--vt-x) .

[vsh](https://chromium.googlesource.com/chromiumos/platform2/+/master/vm_tools/vsh/) : Shell que se ejecuta dentro de la [VM](#term--vm) (no dentro del contenedor).

[VT-x](https://en.wikipedia.org/wiki/Intel%20VT-x) : Extensiones de virtualización; Nombre comercial de Intel para extensiones de virtualización de hardware.

[Wayland](https://wayland.freedesktop.org/) : la nueva pila de gráficos en el mundo Linux.

[WM](https://en.wikipedia.org/wiki/X_window_manager) : Administrador de ventanas; programa responsable de administrar ventanas que otros programas crean. por ejemplo, bordes de ventanas, maximización / minimización, etc.

[X](https://en.wikipedia.org/wiki/X_Window_System) : Término general para el gran proyecto clásico encargado de hacer que los gráficos y las entradas funcionen en entornos UNIX. Puede referirse al servidor, cliente, protocolo, [WM](#term--wm) o muchas otras facetas según el contexto. también conocido como X11, <span>X.</span> Org y XFree86.

[XWayland](https://wayland.freedesktop.org/xserver.html) : Un servidor [X](#term--x) con salida para [Wayland](#term--wayland).
