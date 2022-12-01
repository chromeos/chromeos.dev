---
title: Configuración de Linux
metadesc: Instrucciones para habilitar Linux, también conocido como Crostini, en Chrome OS para el desarrollo.
date: 2020-06-10
weight: -7
---

Es fácil configurar Linux, también conocido como Crostini, en Chrome OS. Primero, vaya a Configuración de Chrome y "encienda" Linux:

#1[Habilite Linux desde la configuración de Chrome.](ix://develop/linux/getting-started/enable-linux.png)

Chrome OS descargará automáticamente los archivos necesarios y configurará su contenedor de Linux. Cuando termine, verá una nueva aplicación de Terminal y una ventana de terminal abierta. Recomendamos fijar la aplicación a su estante como una forma práctica de acceder a su contenedor Linux en el futuro. Haga clic derecho en el icono de la aplicación Terminal y elija "Anclar".

#2[Anclar la aplicación Terminal al estante.](ix://develop/linux/getting-started/pin-to-shelf.png)

¡Ahora su instalación de Debian Linux está lista para comenzar! Lo primero que debe hacer es actualizar el índice del repositorio [APT](https://wiki.debian.org/Apt) e instalarlo. APT es un administrador de paquetes de línea de comandos para Debian, y mantenerlo actualizado asegurará que siempre esté instalando las últimas versiones de herramientas en su repositorio:

```bash {title="Bash" .code-figure}
sudo apt update
```

¡Ahora está configurado y listo para usar el contenedor de Linux!

## Compartir archivos a Linux

Una forma sencilla de acceder a los archivos en el contenedor de Linux es hacer una copia. Para hacerlo, abra la aplicación Archivos, arrastre el directorio o archivo al que desee acceder y suéltelo en "Archivos de Linux".

![Arrastra y suelta archivos o directorios a](ix://develop/linux/getting-started/copy-to-linux.png)

Si no desea hacer una copia, puede compartir directorios, como una carpeta de proyecto, desde fuera del contenedor de Linux con el contenedor de Linux. Para hacerlo:

1. Asegúrese de que Linux esté configurado.
2. Abra la aplicación Chrome OS Files y busque el directorio que desea compartir.
3. Haga clic derecho en la carpeta que desea compartir y seleccione la opción "Compartir con Linux".

![Haga clic derecho en un directorio para seleccionar](ix://develop/linux/getting-started/share-with-linux.png)

!!! aside.message--note
**Nota:** cuando haces clic derecho en una carpeta que ya está compartida, verás la opción "Administrar el uso compartido de Linux" en lugar de "Compartir con Linux". Esta opción abrirá el menú de configuración de Chrome OS que se encuentra en: "Configuración" -> "Desarrolladores" -> "Linux" -> "Administrar carpetas compartidas".
!!!

1. Dentro del contenedor de Linux, estas carpetas compartidas se ubicarán en / mnt / chromeos. Desde la aplicación Terminal, ejecute `cd /mnt/chromeos` .

## Instalar aplicaciones y paquetes de Linux

Ahora que Linux está configurado, ¡es hora de instalar tus primeras aplicaciones! Si bien siempre puede instalar aplicaciones y herramientas en el terminal a través de `sudo apt install` , Linux en Chrome OS admite hacer doble clic para instalar archivos `.deb` (paquete de software Debian) en la aplicación Archivos, lo que le permite descargar e instalar aplicaciones como está acostumbrado. Visual Studio Code, por ejemplo, ofrece un paquete [`.deb`](https://code.visualstudio.com/download), con el que puede probar esto. Una vez descargado y doble clic, verá un mensaje con información sobre la aplicación que desea instalar, ¡junto con la opción de instalar la aplicación!

#3[Solicitud de instalación para VS Code.](ix://develop/linux/getting-started/deb-install.jpg)

### Gestión visual de paquetes

Si prefiere buscar, instalar y administrar aplicaciones y herramientas a través de una aplicación con una interfaz gráfica de usuario, puede instalar la [aplicación de software de GNOME](https://wiki.gnome.org/Apps/Software) y [PackageKit](https://www.freedesktop.org/software/PackageKit/) . Para hacerlo, ejecute lo siguiente:

```bash {title="Bash" .code-figure}
sudo apt install -y gnome-software gnome-packagekit && \
sudo apt update
```

La instalación de estos agregará dos nuevas aplicaciones, [Software](#figure-4) , que proporciona una interfaz similar a la tienda de aplicaciones para encontrar aplicaciones que se pueden instalar desde múltiples fuentes, y [Package](#figure-5) and Package Update, que se puede usar para buscar y actualizar aplicaciones, herramientas, fuentes y muchos otros paquetes.

#4[Software que se ejecuta en Chrome OS.](ix://develop/linux/getting-started/software.png)

#5[Paquete que se ejecuta en Chrome OS.](ix://develop/linux/getting-started/package.png)

### Reiniciar el contenedor de Linux

Si está solucionando un problema con Linux, puede ser útil reiniciar el contenedor sin reiniciar su Chromebook completo. Para hacerlo, haga clic derecho en la aplicación Terminal en su estante y haga clic en "Apagar Linux".

#6[Cerrar el contenedor de Linux.](ix://develop/linux/getting-started/shut-down.png)

Una vez que se apaga, las aplicaciones deberían aparecer en el iniciador, y al elegir una, se iniciará nuevamente el contenedor de Linux.

## Seguridad y permisos

Linux en Chrome OS se ejecuta dentro de un contenedor, [protegiéndolo](https://support.google.com/chromebook/answer/3438631?hl={{es}}#sandboxing) de otras páginas web, aplicaciones y el propio sistema operativo. Sin embargo, todas las aplicaciones instaladas en el contenedor de Linux _comparten_ el mismo entorno limitado, lo que significa que comparten los permisos del contenedor de Linux y pueden afectarse entre sí.

Por razones de seguridad, muchos permisos, como acceso a USB o al microfono, no se comportan automáticamente. Para asegurarse que tiene los permisos adecuados habilitados, debe ir a configuración y habilitarlos. Como siempre tome precauciones con los permisos y nunca habilite más de lo que necesita. Cuando interáctue con Linux en Chrome OS, preste particular atención a los [datos del usuario en el contenedor](/{{locale.code}}/linux/linux-on-chromeos-deep-dive#datos-de-usuario-en-el-contenedor).

## Copia de seguridad y restauración

Debido a que Linux en Chrome OS se ejecuta dentro de un contenedor, puede hacer una copia de seguridad de su entorno y restaurarlo; archivos, aplicaciones y todo. ¡Esto le permite configurar su entorno Linux una vez y luego llevarlo consigo sin necesidad de reconfigurarlo nuevamente! Para obtener instrucciones detalladas sobre cómo hacerlo, consulte la página de ayuda de Chromebook sobre cómo realizar [copias de seguridad y restaurar su contenedor Linux](https://support.google.com/chromebook/answer/9592813?hl={{es}})

## Solución de problemas

Para obtener más ayuda para habilitar o solucionar problemas, lea la página de ayuda de Chromebook sobre [cómo configurar el contenedor de Linux](https://support.google.com/chromebook/answer/9145439?hl={{locale.code}}) .
