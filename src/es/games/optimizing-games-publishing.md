---
title: Consideraciones de publicación
metadesc: Consideraciones de arquitectura como soporte de x86 / arm  para tener en cuenta al publicar su juego.
date: 2020-06-16
weight: -5
---

La mayoría de los teléfonos Android tienen chipsets ARM. Sin embargo, muchos dispositivos Chrome OS utilizan chips x86. La diferencia no es importante para las aplicaciones básicas escritas en Kotlin o Java. Sin embargo, para las aplicaciones escritas en código nativo, incluidas las creadas con motores de juegos, el conjunto de chips del dispositivo puede ser una preocupación importante.

Sería ideal que todas las aplicaciones estuvieran disponibles en los [cuatro ABIs (Android Binary Interfaces) Android más comunes](https://developer.android.com/ndk/guides/abis): armeabi-v7a (arm32), arm64-v8a (arm64), x86 (x86_32), and x86_64.

Esto proporciona el mejor rendimiento y el menor consumo de batería para cada dispositivo. Por ejemplo, un archivo `build.gradle` basado en cmake puede contener:

```groovy
externalNativeBuild {
  cmake {
    abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
  }
}
```

## Tamaño de APK

Cada ABI en un APK monolítico aumenta su tamaño. Esto puede afectar el uso del disco de sus usuarios, el tamaño de la descarga de la aplicación y puede chocar con los límites de tamaño de Play Store. La mejor manera de evitar esto es usar [Android App Bundles](https://developer.android.com/guide/app-bundle). Los paquetes de aplicaciones le permiten agrupar fácilmente las cuatro ABI desde Android Studio, pero no aumentan el tamaño de descarga para sus usuarios. También facilitan el aprovechamiento de [Dynamic Delivery](https://developer.android.com/guide/app-bundle/dynamic-delivery), lo que permite a los usuarios descargar contenido de juegos de gran tamaño solo cuando se les solicita. Si los paquetes de aplicaciones no son una posibilidad para usted, puede usar el [multi-APK] anterior (https://developer.android.com/google/play/publishing/multiple-apks) para un comportamiento similar.

## 32 vs 64 bits

Todas las aplicaciones de Android deben proporcionar una versión de compilación de 64 bits. Una compilación de 32 bits es opcional para dispositivos ARM y x86. Consulte la [documentación de Android de 64 bits⁠](https://developer.android.com/distribute/best-practices/develop/64-bit) para obtener más información.

Si bien solo proporcionar compilaciones de 64 bits reduce la cantidad de objetivos de compilación necesarios y su superficie de prueba, también limita los tipos de dispositivos que pueden ejecutar su juego. Por ejemplo, debido a otras limitaciones de hardware, muchos Chromebooks más antiguos solo pueden ejecutar aplicaciones de Android de 32 bits, a pesar de tener CPU de 64 bits. Para asegurarse de que su aplicación pueda ejecutarse en estos dispositivos, incluya compatibilidad con 32 y 64 bits.

## Traducción ARM

Los Chromebook x86 intentan traducir el código ARM siempre que sea posible. Sin embargo, la traducción afecta negativamente el rendimiento y aumenta el uso de la batería. Incluso los juegos simples deberían considerar proporcionar compilaciones x86 para la mejor experiencia de usuario. Si no puede proporcionar compilaciones x86, tenga en cuenta que algunos Chromebooks x86 no pueden traducir el código arm64. En este caso, debe incluir tanto las ABI de arm32 como las de arm64 en sus compilaciones.

Si bien la traducción arm32 está disponible en todos los Chromebooks con capacidad para Android, no todos los Chromebook pueden traducir el código arm64. Esto significa que si tu juego solo tiene objetivos de compilación arm64, no estará disponible para una gran cantidad de dispositivos Chrome OS. Si no puede enviar binarios x86, incluya ABI arm32 y arm64 en sus compilaciones.

| ABI incluidos                   | Soporte para Chrome OS |
| ------------------------------- | ---------------------- |
| arm64                           | Pobre                  |
| arm32 / arm64                   | OK (con traducción)    |
| arm32 / arm64 / x86_32 / x86_64 | Mejor                  |
