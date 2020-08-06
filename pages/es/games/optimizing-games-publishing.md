---
title: Consideraciones de publicación
metadesc: Consideraciones de arquitectura como soporte de x86 / arm  para tener en cuenta al publicar su juego.
date: 2020-06-16
weight: -5
---

Muchos dispositivos Chrome OS usan conjuntos de chips x86, lo que contrasta con el mercado móvil donde, en 2020, la mayoría de los teléfonos Android tienen conjuntos de chips ARM. Para aplicaciones y juegos básicos escritos en Kotlin o Java, esto no es una preocupación. Para aquellos con código nativo, como lo hacen muchos juegos, incluidos los creados con motores de juegos, esta es una preocupación importante.

Sería ideal que todas las aplicaciones y juegos estuvieran disponibles en los [cuatro ABIs Android más comunes](https://developer.android.com/ndk/guides/abis): armeabi-v7a (arm32), arm64-v8a (arm64), x86 (x86_32), and x86_64.

Esto proporciona el máximo disponible para dispositivos Android y proporcionará el mejor rendimiento y el menor consumo de batería para cada dispositivo. Un ejemplo de archivo build.gradle basado en cmake podría contener:

```groovy
externalNativeBuild {
  cmake {
    abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
  }
}
```

## Tamaño de APK

Cada ABI adicional aumentará el tamaño del archivo para un APK monolítico. Esto puede tener implicaciones importantes para el uso del disco de sus usuarios, el tamaño de la descarga y puede aumentar los límites de tamaño de Play Store. La mejor manera de abordar esto es con los [paquetes de aplicaciones de Android](https://developer.android.com/guide/app-bundle) (AAB). Los AAB le permiten agrupar fácilmente las 4 ABI desde Android Studio, pero no aumenta el tamaño de descarga para sus usuarios. También facilita el aprovechamiento de [Dynamic Delivery](https://developer.android.com/guide/app-bundle/dynamic-delivery) para permitir a los usuarios descargar contenido de juegos de gran tamaño solo cuando lo soliciten. Si las AAB no son una posibilidad para usted, puede usar la solución más antigua de [múltiples APK](https://developer.android.com/google/play/publishing/multiple-apks) para lograr parte de este comportamiento.

## 32 contra 64 bits

Todas las aplicaciones de Android deben proporcionar una versión de 64 bits de las arquitecturas que admitan; consulte la documentación de [Android de 64 bits](https://developer.android.com/distribute/best-practices/develop/64-bit) para obtener más información. Esto significa que si admite dispositivos ARM, su AAB debe tener solo arm64 o binarios arm32 y arm64. Lo mismo es cierto para x86.

- **Soporta ARM?** arm64 o arm32 / arm64
- **¿Soporta x86?** x86_64 o x86_32 / x86_64

Si bien solo proporcionar compilaciones de 64 bits reduce la cantidad de objetivos de compilación necesarios y su superficie de prueba, reducirá la cantidad de dispositivos disponibles en los que su juego puede ejecutarse. Por ejemplo, muchas Chromebooks antiguas solo pueden ejecutar aplicaciones de Android de 32 bits, a pesar de tener CPU de 64 bits, debido a otras limitaciones de hardware. Para garantizar que su aplicación pueda ejecutarse en estos dispositivos, incluya compatibilidad con 32 y 64 bits.

## Traducción ARM

Los Chromebook x86 intentarán traducir el código ARM siempre que sea posible. Esto significa que las aplicaciones y juegos con solo compilaciones arm32 deberían ejecutarse en todas las Chromebook x86 que pueden ejecutar aplicaciones de Android. Sin embargo, la traducción necesariamente reduce el rendimiento y aumenta el uso de la batería. Incluso los juegos "simples" deberían considerar proporcionar versiones x86 para proporcionar la mejor experiencia general para los usuarios.

Si bien la traducción de arm32 está disponible en todas las Chromebooks compatibles con Android, todavía no todas las Chromebooks pueden traducir el código de arm64. Esto significa que si su juego solo tiene objetivos de compilación arm64, no estará disponible en una gran cantidad de dispositivos Chrome OS. Si no puede enviar binarios x86, incluya las ABI arm32 y arm64 en sus compilaciones.

| ABI incluidos                   | Soporte para Chrome OS |
| ------------------------------- | ---------------------- |
| arm64                           | Pobre                  |
| arm32 / arm64                   | OK (con traducción)    |
| arm32 / arm64 / x86_32 / x86_64 | Mejor                  |
