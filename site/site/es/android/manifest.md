---
title: Compatibilidad en el manifest
metadesc: Mientras prepara su aplicación de Android para que se ejecute en Chromebooks, debe considerar las características del dispositivo que utiliza su aplicación.
date: 2020-05-01
weight: -1
tags:
  - soporte para pantalla táctil
---

Mientras prepara su aplicación de Android para que se ejecute en Chromebooks, debe considerar las características del dispositivo que utiliza su aplicación. Las Chromebook no son compatibles con todas las funciones de hardware y software que están disponibles en otros dispositivos con Android. Si su aplicación requiere funciones específicas que no son compatibles con Chromebooks, no estará disponible para su instalación en Chromebooks.

Usted declara los requisitos de su aplicación para las funciones de hardware y ciertas funciones de software en el [archivo AndroidManifest.xml](https://developer.android.com//guide/topics/manifest/manifest-intro?hl={{locale.code}}) . Este documento describe las declaraciones de características del manifiesto de la aplicación que no son compatibles con Chromebooks.

## Entradas incompatibles

Las entradas de AndroidManifest.xml enumeradas en esta sección no son actualmente compatibles con Chromebooks. Si su aplicación usa alguna de estas entradas, considere eliminarlas o incluir el valor de atributo `required="false"` con ellas para que su aplicación pueda instalarse en Chromebooks. Para obtener más información sobre cómo declarar el uso de funciones sin requerir que la función esté disponible en el dispositivo, consulte la guía para los elementos en el AndroidManifest.xml [`<uses-feature>`](https://developer.android.com//guide/topics/manifest/uses-feature-element.html?hl={{locale.code}}#market-feature-filtering) .

!!! aside.message--note
**Nota:** Consulte la [referencia de Características](https://developer.android.com//guide/topics/manifest/uses-feature-element?hl={{locale.code}}#features-reference) para obtener una lista completa de las características y descripciones del manifiesto de la aplicación.
!!!

### Características de hardware

La compatibilidad con las funciones de hardware varía en las Chromebooks. Algunas funciones no son compatibles con ninguna Chromebook, mientras que otras son compatibles con algunas Chromebook.

### Características especiales

La siguiente lista incluye características que se agregaron para una mejor compatibilidad de hardware en Chromebooks:

- `android.hardware.type.pc` : deshabilita la emulación de entrada para mouse y panel táctil. Tenga en cuenta que debe indicar `required="false"` para evitar que solo pueda ejecutarse en Chromebooks.

#### Funciones de hardware no compatibles

La siguiente lista incluye las características de hardware que actualmente no son compatibles con las Chromebooks:

- `android.hardware.camera` - Cámara trasera
- `android.hardware.camera.autofocus` : cámara que utiliza el enfoque automático
- `android.hardware.camera.capability.manual_post_processing` : cámara que utiliza la función `MANUAL_POST_PROCESSING` , incluida la funcionalidad para anular el balance de blancos automático
- `android.hardware.camera.capability.manual_sensor` : cámara que utiliza la función `MANUAL_SENSOR` , incluido el soporte de bloqueo de exposición automática
- `android.hardware.camera.capability.raw` : cámara que utiliza la función `RAW` , incluida la capacidad de guardar archivos DNG (sin formato) y proporcionar metadatos relacionados con DNG
- `android.hardware.camera.flash` - Cámara que usa flash
- `android.hardware.camera.level.full` : cámara que utiliza soporte de captura de imágenes de nivel `FULL`
- `android.hardware.consumerir` - Infrarrojo (IR)
- `android.hardware.location.gps` - GPS
- `android.hardware.nfc` - Comunicación de campo cercano (NFC)
- `android.hardware.nfc.hce` - Emulación de tarjeta NFC (en _desuso_ )
- `android.hardware.sensor.barometer` - Barómetro (presión de aire)
- `android.hardware.telephony` : telefonía, incluida la radio con servicios de comunicación de datos
- `android.hardware.telephony.cdma` - Soporte de red de acceso múltiple por división de código de telefonía (CDMA)
- `android.hardware.telephony.gsm` : soporte de red del sistema global de telefonía para comunicaciones móviles (GSM)
- `android.hardware.type.automotive` : interfaz de usuario de Android Auto
- `android.hardware.type.television` - Televisión (en _desuso_ )
- `android.hardware.usb.accessory` : modo accesorio USB
- `android.hardware.usb.host` : modo host USB

#### Funciones de hardware parcialmente compatibles

La siguiente lista incluye las características de hardware que pueden estar disponibles en algunas Chromebooks:

- `android.hardware.sensor.accelerometer` - Acelerómetro (orientación del dispositivo)
- `android.hardware.sensor.compass` - Brújula
- `android.hardware.sensor.gyroscope` - Giroscopio (rotación y giro del dispositivo)
- `android.hardware.sensor.light` - Light
- `android.hardware.sensor.proximity` - Proximidad (al usuario)
- `android.hardware.sensor.stepcounter` - Contador de pasos
- `android.hardware.sensor.stepdetector` - Detector de pasos

#### Soporte de hardware con pantalla táctil

A partir de la versión M53 de Chrome OS, todas las aplicaciones de Android que no requieren explícitamente la función [`android.hardware.touchscreen`](https://developer.android.com//guide/topics/manifest/uses-feature-element#touchscreen-hw-features) también funcionarán en dispositivos Chrome OS que admitan la función [`android.hardware.faketouch`](https://developer.android.com//guide/topics/manifest/uses-feature-element#touchscreen-hw-features) . Los dispositivos que tienen interfaces táctiles falsas proporcionan un sistema de entrada de usuario que emula eventos táctiles básicos. Por ejemplo, el usuario podría interactuar con un mouse o control remoto para mover un cursor en pantalla, desplazarse por una lista y arrastrar elementos de una parte de la pantalla a otra.

Si no desea que su aplicación se instale en dispositivos que tienen interfaces táctiles falsas pero no pantallas táctiles, puede completar una de las siguientes acciones:

- Excluir dispositivos específicos en la [consola Google Play.](https://play.google.com/apps/publish)
- Filtre dispositivos sin hardware de pantalla táctil al declarar explícitamente [`android.hardware.touchscreen`](https://developer.android.com//guide/topics/manifest/uses-feature-element?hl={{locale.code}}#touchscreen-hw-features) como necesarios para instalar su aplicación.

### Funciones de software

La siguiente lista incluye las funciones de software que actualmente no son compatibles con las Chromebooks:

- `android.software.app_widgets` : widgets de aplicaciones en la pantalla de inicio
- `android.software.device_admin` - Administración de políticas de dispositivos
- `android.software.home_screen` - Reemplaza la pantalla de inicio del dispositivo
- `android.software.input_methods` : métodos de entrada personalizados (instancias de [`InputMethodService`](https://developer.android.com//reference/android/inputmethodservice/InputMethodService) )
- `android.software.leanback` : interfaz de usuario diseñada para visualización en pantalla grande
- `android.software.live_wallpaper` - Fondos de pantalla animados
- `android.software.live_tv` - Transmisión de programas de TV en vivo
- `android.software.managed_users` : usuarios secundarios y perfiles administrados
- `android.software.midi` : protocolo de interfaz digital de instrumentos musicales (MIDI), que admite la conexión a instrumentos musicales y proporciona sonido
- `android.software.sip` : servicio de protocolo de inicio de sesión (SIP), que admite videoconferencia y mensajería instantánea
- `android.software.sip.voip` : servicio de Voz sobre Protocolo de Internet (VoIP) basado en SIP, que admite videoconferencia bidireccional

## Permisos que implican requisitos de funciones

Algunos permisos que solicita en sus archivos de manifiesto pueden crear solicitudes implícitas de funciones de hardware y software. Al solicitar estos permisos, evitará que su aplicación se instale en Chromebooks.

Para obtener detalles sobre cómo evitar que las solicitudes de permisos hagan que su aplicación no esté disponible en Chromebooks, consulte la sección [Entradas de manifiesto incompatibles](#entradas-incompatibles) de esta página.

La siguiente tabla muestra los permisos que implican ciertos requisitos de características que hacen que una aplicación sea incompatible con Chromebooks:

| Permiso                  | Requisito de funciones implícitas                               |
| ------------------------ | --------------------------------------------------------------- |
| `CAMERA`                 | `android.hardware.camera` y `android.hardware.camera.autofocus` |
| `CALL_PHONE`             | `android.hardware.telephony`                                    |
| `CALL_PRIVILEGED`        | `android.hardware.telephony`                                    |
| `MODIFY_PHONE_STATE`     | `android.hardware.telephony`                                    |
| `PROCESS_OUTGOING_CALLS` | `android.hardware.telephony`                                    |
| `READ_SMSREAD_SMS`       | `android.hardware.telephony`                                    |
| `RECEIVE_SMS`            | `android.hardware.telephony`                                    |
| `RECEIVE_MMS`            | `android.hardware.telephony`                                    |
| `RECEIVE_WAP_PUSH`       | `android.hardware.telephony`                                    |
| `SEND_SMS`               | `android.hardware.telephony`                                    |
| `WRITE_APN_SETTINGS`     | `android.hardware.telephony`                                    |
| `WRITE_SMS`              | `android.hardware.telephony`                                    |
