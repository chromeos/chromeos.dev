---
title: Motores de juego
metadesc: Optimización del uso de motores de juegos para construir en Chrome OS
date: 2020-06-16
weight: -2
---

Los motores de juegos con un objetivo de Android deberían producir compilaciones que funcionen bien en Chrome OS. Si estás construyendo un motor de juego:

- Cree binarios x86_32, x86_64, ARM32 y ARM64 para proporcionar el mejor rendimiento y duración de la batería para sus usuarios
- Haga pruebas exhaustivas para la entrada y cambiar el tamaño de la ventana
- Informe problemas con las compilaciones al creador del motor del juego. Si parece que también hay un problema relacionado con el sistema operativo, además del informe del motor del juego, envíe sus comentarios al sistema operativo Chrome escribiendo [[alt]] + [[shift]] + [[i]] en un Chromebook o en [Problemas de Chromium](https://bugs.chromium.org/p/chromium/issues/list) .

## Sobre escribir eventos de entrada con Unity

El motor de Unity interpreta los eventos de entrada de Android y los traduce al sistema de entrada de Unity. Si necesita interceptar los eventos sin procesar de Android, por ejemplo, para implementar la [captura del mouse](/%7B%7Blocale.code%7D%7D/games/optimizing-games-inputs#mouse-capture) , puede hacerlo eligiendo "Exportar" en el Editor de Unity en la configuración de compilación de Android y eligiendo un directorio de destino.

Después de exportar, podrá importar el directorio de destino en Android Studio. Esto le permitirá depurar, perfilar, etc. desde Android Studio.

También puede editar la `UnityPlayerActivity` para interceptar eventos de entrada antes de que se envíen a la actividad del juego. Es en este archivo que puede insertar la captura del mouse y la lógica del método abreviado de teclado. Una vez que haya terminado, cree sus paquetes de aplicaciones de Android o APK desde Android Studio.

Consulte también la [documentación del proceso de compilación de Unity para Android](https://docs.unity3d.com/Manual/android-BuildProcess.html) .

!!! aside.message--note
Nota: el comando "Exportar" en el Editor de Unity es como un paso de compilación en lo que respecta al editor. El flujo de desarrollador unidireccional debe ir: Editar en Unity -> Exportar -> Editar en Android Studio -> Compilar desde Android Studio / Gradle. ¡Los cambios realizados en Android Studio no se importarán de nuevo al Unity Editor!!!
