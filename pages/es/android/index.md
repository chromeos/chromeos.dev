---
title: Aplicaciones de Android en Chrome OS
metadesc: Una introducción a Play Store y aplicaciones de Android en Chrome OS
hero:
  image: /images/landings/adapting-android.svg
  alt: Ilustración de un teléfono Android y un dispositivo Chrome OS que muestra la misma aplicación ejecutándose en ambos.
date: 2020-05-27
weight: -8
---

En 2016, Google Play Store se introdujo en Chrome OS, permitiendo que las mismas aplicaciones que se ejecutan en teléfonos y tabletas se ejecuten en Chromebooks sin comprometer su velocidad, simplicidad o seguridad. Debido a que las Chromebook ejecutan una versión completa del marco de Android, ¡es muy probable que su aplicación se ejecute en dispositivos Chrome OS hoy mismo! Eso significa que los desarrolladores pueden tomar un único APK y escalarlo para que funcione en cualquier dispositivo Chrome OS, lo que permite experiencias aún más inmersivas y atractivas en dispositivos con pantallas más grandes. Existen algunas diferencias entre los teléfonos y los dispositivos con Chrome OS (y otros dispositivos de pantalla más grandes) que pueden agregar desafíos y oportunidades para diferentes experiencias como:

- Dispositivos donde la orientación horizontal es más común
- Dispositivos de arquitectura x86
- Ventanas de diferentes dimensiones y con distintos tamaños
- Teclado, mouse y trackpads como métodos de entrada de primera clase

Para ver cómo puede comenzar a crear aplicaciones de Android para Chrome OS, [obtenga más información aquí](/{{locale.code}}/android/start) . Lea a continuación para obtener más información sobre los recursos que tenemos y los temas a tener en cuenta.

## ¿Dónde empiezo?

- Publicar su aplicación para dispositivos Chrome OS puede parecer desafiante o confuso, pero es el mismo APK que usa para teléfonos y tabletas. Para obtener más información, consulte nuestros recursos sobre publicación a través de [Play Store para Chrome OS,](/{{locale.code}}/publish) incluida la [optimización para x86](/{{locale.code}}/games/optimizing-games-publishing) si usa el NDK.
- Chrome OS permite que su aplicación brinde nuevas experiencias y costumbres a sus usuarios, pero conlleva algunos desafíos. Lea lo que implica [optimizar su aplicación](/{{locale.code}}/android/optimizing) o consulte una [publicación de blog](https://medium.com/androiddevelopers/android-at-large-how-to-bring-optimized-experiences-to-the-big-screen-a50a6784e59d) para obtener más información sobre lo que implica su aplicación en Chrome OS y otros dispositivos de pantalla más grande.
- Hay consideraciones de diseño a tener en cuenta en dispositivos de pantalla más grande, y hemos creado algunas [recomendaciones y pautas](/{{locale.code}}/android/design) a tener en cuenta al pensar en cómo se ve y se comporta su aplicación en Chrome OS.
- Hay algunas formas de desarrollar para Chrome OS, puede construir [directamente en su dispositivo Chrome OS](/{{locale.code}}/android-environment/deploying-apps#implementar-desde-chrome-os) utilizando Linux (Beta) para Chrome OS o puede conectar su [dispositivo Chrome OS a su estación de trabajo principal](/{{locale.code}}/android-environment/deploying-apps#instalar-desde-otro-dispositivo) y desarrollar de esa manera.
