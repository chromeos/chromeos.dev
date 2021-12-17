---
title: Características experimentales
metadesc: Habilite las funciones experimentales en Chrome OS al cambiar las versiones, alternar banderas o habilitar el modo de desarrollador.
date: 2020-05-01
weight: 3
---

Estar a la vanguardia le permite probar nuevas funciones antes de que estén listas, lo que le permite enviar comentarios a Google o modificar su sistema operativo más profundamente de lo que está disponible en la versión normal y estable de Chrome OS.

!!! aside.message--warning
**Advertencia:** Google no admite funciones experimentales de ningún tipo y puede anular su garantía. Las modificaciones y las características experimentales pueden causar problemas de hardware, software o seguridad.
!!!

## Cambiar el canal de Chrome OS

Su dispositivo Chrome OS normalmente está en un canal estable. El canal **estable** está completamente probado y respaldado por Google, y es el mejor para evitar bloqueos u otros problemas con su sistema operativo. Hay otros dos canales: **beta** y **desarrollador** . El canal **beta** le permite ver qué sigue con un riesgo mínimo, aunque Google no lo admite por completo. Por lo general, se actualiza cada semana. El canal de **desarrollador** se actualiza varias veces por semana, se envía con el código que esté disponible actualmente.

Para cambiar en qué canal estás, abre "Configuración" -> "Acerca de Chrome OS" -> "Detalles adicionales" y haz clic en el botón "Cambiar canal". Esto le mostrará un cuadro de diálogo donde puede cambiar su canal de Chrome OS. El cambio de canales requerirá una descarga de la nueva información del canal y un reinicio para poder aplicar.

#1[cuadro de diálogo para selección de canal de Chrome OS](ix://productivity/change-channels.png)

## Banderas de funciones experimentales

Las banderas de funciones de Chrome son funciones experimentales que se envían con su canal actual de Chrome OS, pero no están habilitadas de forma predeterminada ya que aún no se han probado completamente. Proporcionan un vistazo de en qué está trabajando Google con algún nivel de implementación disponible para que lo pruebe hasta que se envíe. [Hyper-Threading](https://support.google.com/chromebook/answer/9340236) , que permite el uso de todos los hilos de su CPU, es un ejemplo de un indicador de característica experimental que se puede habilitar.

!!! aside.message--note
**Nota: Los** indicadores de funciones solo deben habilitarse en su dispositivo local para probar su funcionalidad si acepta el riesgo de hacerlo, y no debe desarrollarlos para una implementación de producción en su aplicación o tener usuarios finales de las aplicaciones que está desarrollando, habilítelas para una funcionalidad adicional. <
!!!

Si desea habilitar las banderas de funciones en su máquina, navegue a `chrome://flags` en el omnibox de su navegador Chrome; Una lista de banderas estará disponible en el estado "Predeterminado", "Habilitado" o "Deshabilitado". Encuentre el indicador de función que le interesa y cambie el estado para que surta efecto.

## Modo desarrollador

El modo de desarrollador en Chrome OS desbloquea un acceso más profundo al sistema operativo que el que tiene en un modo estable normal al eliminar algunas protecciones y mostrar algunas funcionalidades que de otro modo estarían habilitadas u ocultas para garantizar una experiencia segura y estable. De esta manera, es diferente al canal de desarrollador, que es una versión actualizada del sistema operativo que, de lo contrario, se ejecuta en modo estable. El modo de desarrollador te da más poder, pero con un gran poder viene una gran responsabilidad; solo debe habilitarlo si se siente cómodo con los riesgos asociados con hacerlo.

!!! aside.message--warning
**Advertencia:** Google no admite funciones experimentales de ningún tipo y puede anular su garantía. Las modificaciones y las características experimentales pueden causar problemas de hardware, software o seguridad.
!!!

Para ingresar al modo desarrollador, complete estos pasos:

1. Invocar el modo _de recuperación_ pulsando y manteniendo las teclas [[ESC]] y **de actualización** ([[F3]]), y luego pulsando el botón **de encendido.**

!!! aside.message--note
**Nota:** en la mayoría de los dispositivos, tanto el botón de _recuperación_ como el botón de _cambio de desarrollo_ están virtualizados. Si estas instrucciones no funcionan para usted, consulte las [instrucciones específicas para su dispositivo](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices) . !!!

1. Cuando aparezca la pantalla de _recuperación_ , presione [[Control]]+[[D]]. No se solicita esta acción, por lo que debe completarla proactivamente. Luego, se le solicitará que confirme y reinicie en modo desarrollador.

Si ve una de las pantallas de la [Figura 2](#figure-2) cuando enciende su dispositivo, ha entrado con éxito en el modo desarrollador.

#2[Pantallas de confirmación del modo desarrollador.](ix://android/dev-mode/verification.jpg)

!!! aside.message--note
**Nota** : Para omitir la pantalla de carga del sistema operativo, espere 30 segundos o presione [[Control]]+[[D]], y su Chromebook continuará iniciando.
!!!
