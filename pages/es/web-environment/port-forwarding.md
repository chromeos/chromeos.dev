---
title: 'Reenvío de puertos en Chrome OS'
metadesc: 'Cómo configurar el reenvío de puertos en su dispositivo Chrome OS para acceder a puertos en otros dispositivos.'
date: 2020-06-01
weight: -7
---

Al desarrollar aplicaciones web, las pruebas en varios dispositivos son fundamentales para garantizar que lo que está creando funcionará para sus usuarios. El reenvío de puertos integrado de Chrome OS le permite abrir el puerto a su servidor de desarrollo local, lo que permite el acceso desde teléfonos u otras computadoras.

!!! aside.message--warning
**Advertencia:** los controles integrados para administrar el reenvío de puertos son una característica nueva que aún se encuentra en desarrollo, por lo que la interfaz de usuario puede cambiar y opción puede dejar de funcionar hasta que sea estable. Deberá ejecutar Chrome OS versión 84 o superior y habilitar el indicador de _reenvío de puertos Crostini_ (`chrome://flags/#crostini-port-forwarding`).
!!!

Comience yendo a la configuración de Linux (Beta) en Chrome OS y haciendo clic en el cuadro de Linux. Debería haber una opción de _reenvío de puertos_ . Haz clic ahí.

![Página de configuración de Linux.](/images/develop/web/linux-settings.jpg)

Esto abrirá la pantalla de reenvío de puertos. Cuando configure puertos para reenviar, aparecerán aquí. Haga clic en el botón _Agregar_ para reenviar un puerto.

![Página de configuración de reenvío de puerto vacío.](/images/develop/web/port-forward-empty.jpg)

Al reenviar un puerto, tiene tres opciones: el número de puerto a reenviar, el tipo de conexión, ya sea [TCP](https://es.wikipedia.org/wiki/Protocolo_de_control_de_transmisi%C3%B3n) (predeterminado) o [UDP](https://es.wikipedia.org/wiki/Protocolo_de_datagramas_de_usuario), y si desea etiquetar el puerto.

![Configuración del reenvío de puertos para reenviar el puerto 3000 utilizando TCP con una etiqueta](/images/develop/web/port-forward-configure.jpg)

Una vez agregados, sus puertos aparecerán en la lista de reenvío de puertos, donde puede activarlos o desactivarlos o eliminarlos por completo.

![Página de configuración de reenvío de puertos con un puerto configurado de 3000 usando TCP etiquetado](/images/develop/web/port-forward-configured.jpg)

Para obtener la dirección IP para usar con ese puerto, en su aplicación Terminal, ejecute `hostname -I` . Esta dirección IP, combinada con el puerto que está reenviando, permitirá que cualquier dispositivo en la red acceda al servidor en el puerto que ha reenviado.
