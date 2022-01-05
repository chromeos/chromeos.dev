---
title: Instalar aplicaciones de Android en Chrome OS
metadesc: Explore las diferentes formas en que los desarrolladores pueden instalar sus aplicaciones en Chrome OS.
date: 2020-06-06
weight: -6
---

Poder ejecutar aplicaciones de Android en un Chromebook es genial, les da a los usuarios acceso a la amplia oferta del ecosistema de Android y les brinda a los desarrolladores de Android la oportunidad de llegar a los usuarios de Chrome OS.

Los desarrolladores deben asegurarse de verificar sus aplicaciones en diferentes tipos de dispositivos, ya que esto ayudará a mejorar las experiencias de los usuarios. Es por eso que Chrome OS proporciona a los desarrolladores de Android las herramientas para implementar y probar sus aplicaciones en Chromebooks.

Si los desarrolladores están implementando su aplicación de Android directamente desde Chrome OS (usando Android Studio en su Chromebook) o desde otro dispositivo, los desarrolladores pueden usar [ADB](https://developer.android.com/studio/command-line/adb) para implementar sus aplicaciones y depurar diferentes interacciones con las Chromebooks. Para obtener más detalles, consulte los pasos a continuación.

## Habilitar depuración de ADB { #habilitar-adb}

Anteriormente, el uso de ADB en su Chromebook solo era posible mientras estaba en modo desarrollador, lo que requiere devolver el dispositivo a la configuración de fábrica y puede reducir la seguridad. Afortunadamente, desde Chrome 81, los desarrolladores pueden mantener sus dispositivos fuera del modo de desarrollador y aún implementar aplicaciones desarrolladas directamente en Chrome OS, con solo presionar un interruptor. Aquí es cómo:

Primero, asegúrese de que el Chromebook no esté en [modo desarrollador](https://chromium.googlesource.com/chromiumos/docs/+/master/developer_mode.md) . Luego vaya a configuración y [encienda Linux](/{{locale.code}}/linux) (si no lo ha hecho antes).

![Encienda Linux en Chrome OS](ix://develop/android/deploy/turnon_linux.gif)

Una vez que Linux esté disponible, abra la configuración de Linux y encontrará una nueva opción 'Desarrollar aplicaciones de Android', abra esa opción.

Active la depuración ADB y la computadora se reiniciará.

![Habilite la configuración de depuración ADB de Chrome OS](ix://develop/android/deploy/debug_settings.gif)

Cuando la computadora se reinicie, verá un mensaje que le informa que puede haber aplicaciones que no se descargaron de la tienda de aplicaciones en el dispositivo.

![Este dispositivo puede contener aplicaciones que Google no haya verificado.](ix://develop/android/deploy/login_notice.jpg)

ADB ahora está disponible para implementar aplicaciones en su Chromebook, ejecutar comandos de depuración e interactuar directamente con el dispositivo.

Para garantizar que su aplicación de Android funcione bien en una variedad de dispositivos Chromebook y dispositivos con distintas configuraciones , Google recomienda que pruebe su aplicación en los siguientes dispositivos:

- Un Chromebook basado en ARM
- Un Chromebook basado en x86
- Un dispositivo con pantalla táctil y uno sin.
- Un dispositivo convertible; es decir, uno que puede cambiar entre una computadora portátil y una tableta
- Un dispositivo con un lápiz

## Implementar desde Chrome OS

Después de habilitar la depuración de ADB, puede instalar una aplicación de Android directamente en su dispositivo Chrome OS usando un [Android Studio](#implementar-con-android-studio) o si tiene un APK puede [instalarlo usando la Terminal.](#implementar-con-terminal)

### Implementar con Android Studio

Con la [configuración de Android Studio](https://developer.android.com/studio/install#chrome-os) y la configuración ADB anterior, los desarrolladores pueden enviar sus aplicaciones al contenedor de Android del Chromebook directamente desde Android Studio.
El Chromebook aparecerá como una opción en el menú desplegable del dispositivo:

![Menú desplegable de dispositivos Android Studio](ix://develop/android/deploy/as_devices.png)

Simplemente presione correr como en cualquier otro dispositivo Android, verá el cuadro de diálogo de autorización y una ventana con su aplicación en ejecución se iniciará automáticamente después de otorgar la autenticación.

![Instale su aplicación directamente en Chrome OS](ix://develop/android/deploy/run_app.gif)

Eso es todo, ahora puede implementar la aplicación en el Chromebook, probar y depurar _sin_ la molestia de estar en modo desarrollador.

### Implementar con Terminal

Si no lo ha hecho, instale ADB:

```bash
sudo apt install adb
```

Conéctese al dispositivo:

```bash
adb connect arc
```

Aparecerá una ventana emergente pidiendo autorización para la depuración de USB, concédelo.

![Autorización para conectarse al dispositivo](ix://develop/android/deploy/usb_dialog.png)

Instala tu aplicación desde la terminal:

```bash
adb install [path to your APK]
```

![Conéctese al dispositivo a través de ADB en Terminal](ix://develop/android/deploy/adb_connect.gif)

## Instalar desde otro dispositivo

Si no puede usar el método descrito anteriormente y necesita enviar su aplicación desde otro dispositivo, tiene un par de opciones: puede usar [USB](#adb-usb) o una [dirección de red](#adb-ip) para conectar su dispositivo a ADB.

Para enviar su APK desde otro dispositivo al Chromebook, debe iniciar su Chrome OS en [modo desarrollador](https://chromium.googlesource.com/chromiumos/docs/+/master/developer_mode.md) para que pueda configurar el Chromebook y enviar aplicaciones desde la máquina host. Siga estos pasos para ingresar al [modo desarrollador](/{{locale.code}}/productivity/experimental-features#modo-desarrollador)

!!! aside.message--warning
**Precaución:** después de cambiar su dispositivo Chrome OS al modo desarrollador, se reinicia y borra todos los datos existentes en el dispositivo. El nivel de seguridad del dispositivo también se reduce significativamente.
!!!

### Conéctese a ADB por USB { #adb-usb}

1. Asegúrese de haber [habilitado la depuración de ADB.](#habilitar-adb)

2. Determine si su dispositivo [admite la depuración de USB](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-adb-debugging-over-usb)

3. Presione [[Control]]+[[Alt]]+[[T]] para iniciar el terminal Chrome OS.

4. Escriba `shell` para llegar al comando bash shell:

   ```bash
   crosh> shell
   chronos@localhost / $
   ```

5. Escriba los siguientes comandos para configurar su dispositivo:

   ```bash
   $ sudo crossystem dev_enable_udc=1
   $ sudo reboot
   ```

6. Después de reiniciar, abra el terminal nuevamente y ejecute el siguiente comando para habilitar ADB en el puerto USB del Chromebook:

   ```bash
   $ sudo ectool usbpd <port number> dr_swap
   ```

Use este comando cada vez que desconecte y vuelva a conectar un cable USB. Para asegurarse de que su Chromebook esté en modo UFP, puede ejecutar `ectool usbpd <número de puerto>` .

7. Conecte un cable USB a un [puerto compatible](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-adb-debugging-over-usb) en su dispositivo
8. Ejecute `adb devices` desde las herramientas de la plataforma Android SDK en su máquina host para ver su Chromebook como un dispositivo compatible con ADB
9. En su Chromebook, haga clic en **Permitir** cuando se le pregunte si desea permitir el depurador. Su sesión ADB está establecida.

### Conéctese a ADB a través de una red { #adb-ip}

1. Asegúrese de haber [habilitado la depuración de ADB.](#habilitar-depuración-de-adb)

Para depurar a través de una red, debe configurar el firewall de Chrome OS para permitir conexiones ADB entrantes:

1. Presione [[Control]]+[[Alt]]+[[T]] para iniciar el terminal Chrome OS.

2. Escriba `shell` para llegar al comando bash shell:

   ```bash
   crosh> shell
   chronos@localhost / $
   ```

3. Escriba los siguientes comandos para configurar las características del desarrollador y habilitar el acceso de escritura en disco para los cambios en la configuración del firewall. Si necesita ingresar una contraseña de sudo para el usuario de `chronos` , puede (re) establecer una ejecutando `chromeos-setdevpassword` en el [indicador VT-2](https://chromium.googlesource.com/chromiumos/docs/+/master/developer_mode.md#vt2) ([[Control]]+[[Alt]]+[[→]]) ; Necesitarás tu contraseña de root.

   ```bash
   $ sudo crossystem dev_boot_signed_only=0
   $ sudo /usr/libexec/debugd/helpers/dev_features_rootfs_verification
   $ sudo reboot
   ```

4. El comando `sudo reboot` reinicia tu Chromebook. Puede presionar la tecla Tab para habilitar el autocompletado de nombres de archivos. Debe completar este procedimiento solo una vez en su Chromebook.

Después de reiniciar su dispositivo, inicie sesión en su cuenta de prueba y escriba el siguiente comando para habilitar el shell seguro y configurar el firewall correctamente:

```bash
$ sudo /usr/libexec/debugd/helpers/dev_features_ssh
```

Cuando se completa el comando, puede salir del shell.

Obtenga la dirección IP de su Chromebook:

1. Haga clic en el reloj en el área inferior derecha de la pantalla.
2. Haz clic en el ícono de ajustes.
3. Haga clic en el tipo de red a la que está conectado (Wi-Fi o datos móviles) y luego en el nombre de la red.
4. Tome nota de la dirección IP.

Conéctese a su Chromebook:

1. Regrese a su máquina de desarrollo y use ADB para conectarse a su Chromebook usando su dirección IP:

   ```bash
   adb connect <ip_address>:22
   ```

2. En su Chromebook, haga clic en Permitir cuando se le pregunte si desea permitir el depurador. Su sesión ADB está establecida.

#### Solución de problemas de depuración de ADB a través de una red

A veces, el dispositivo ADB muestra que está fuera de línea cuando todo está conectado correctamente. En este caso, complete los siguientes pasos para solucionar el problema:

1. Desactiva la **depuración de ADB** en las _opciones de desarrollador_ .
2. En una ventana de terminal, ejecute `adb kill-server` .
3. Reactive la opción de **depuración ADB** .
4. En una ventana de terminal, intente ejecutar `adb connect` .
5. Haga clic en **Permitir** cuando se le solicite si desea permitir la depuración. Su sesión ADB está establecida.
