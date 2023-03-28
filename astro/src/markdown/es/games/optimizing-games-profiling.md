---
title: Perfiles de rendimiento
metadesc: Perfiles de rendimiento en Chrome OS.
date: 2020-06-16
weight: -3
---

La creación de perfiles y el ajuste del rendimiento es una tarea compleja que puede parecer más un arte que una ciencia. Las muchas partes móviles que necesitan estar perfectamente sincronizadas en un juego combinadas con la complejidad en una escena dada pueden dificultar la comprensión y el aislamiento de los problemas. En Chrome OS, muchas herramientas están diseñadas teniendo en cuenta los conjuntos de chips ARM. A continuación hay algunos consejos para ayudar a acelerar el proceso.

Algo a tener en cuenta al optimizar específicamente el rendimiento de su juego en Chrome OS es que los problemas de rendimiento subyacentes se comparten en todos los dispositivos, y las mejoras beneficiarán el rendimiento y la duración de la batería para todos los usuarios. Chrome OS, con una tendencia a pantallas más grandes y dispositivos de entrada de escritorio, puede mostrar ciertos problemas más fácilmente. Por ejemplo, un algoritmo de carga de textura ineficiente puede "funcionar bien" en dispositivos móviles de gama alta, pero no puede mantenerse al día en un Chromebook con una pantalla de 4k. Mejorar el algoritmo mejorará el juego en todos los dispositivos.

Si es nuevo en la creación de perfiles, un buen enfoque general es:

1. Determine si el rendimiento está vinculado por:
   - UPC
   - GPU
   - Otro: Entrada / Disco / Red
2. Intenta aislar la causa principal
3. Intenta optimizar
4. Repetir

En la mayoría de los casos, los juegos se mostrarán como "vinculados a la CPU" o "vinculados a la GPU". Utilizando los consejos y herramientas de creación de perfiles a continuación, intente determinar dónde está el sistema "gastando su tiempo" en cada cuadro. Por ejemplo, si lleva mucho tiempo calcular y cargar los vértices antes de que la GPU comience a renderizarse, su juego puede estar vinculado a la CPU. En cambio, si está utilizando una gran cantidad de filtros detallados basados en GPU, es probable que su juego esté vinculado a GPU. Recuerde que muchos teléfonos móviles y dispositivos Chrome OS no tienen tarjetas gráficas discretas. Un juego de escritorio que asume que los filtros de GPU son rápidos, puede encontrar GPU integradas que tardan demasiado en reproducir cada escena.

Para obtener más detalles sobre cómo abordar la creación de perfiles, consulte la guía de ARM sobre ['El proceso de optimización'](https://developer.arm.com/docs/100959/0101/the-optimization-process) .

## Herramientas

Si bien es posible determinar los cuellos de botella por su cuenta, contar con las herramientas adecuadas facilitará el análisis del rendimiento de su juego y le dará la confianza de que se está centrando en las cosas correctas. Existen muchas herramientas, pero estos son algunos de nuestros programas de referencia.

### Android Studio Profiler

La forma más fácil de crear un perfil de rendimiento para cualquier aplicación de Android es con el [perfilador integrado de Android Studio](https://developer.android.com/studio/profile/android-profiler?hl={{locale.code}}) . Desde Android Studio, en vez de hacer clic en “Correr”, simplemente elija “Perfil” para correr su aplicación y para obtener información en tiempo real sobre el CPU, memoria y uso de la red. Las trazas de CPU simples pueden ser una forma rápida de aislar áreas de código para observar.

Esta herramienta no garantiza una visión real del uso de la GPU ni de lo que sucede entre cada sincronización de cuadros, por lo que, aunque es una buena herramienta para tener en la caja de herramientas, es probable que no sea suficiente para que su juego funcione con el máximo rendimiento.

### Snapdragon Profiler

Debido a que el comportamiento de sus juegos será el mismo en todos los dispositivos, una buena manera de obtener información detallada sobre el rendimiento es usar [Snapdragon Profiler](https://developer.qualcomm.com/software/snapdragon-profiler) en un teléfono ARM basado en Qualcomm. Aunque no está creando un perfil directo en un dispositivo Chrome OS, esto debería brindarle información sobre dónde pasa la mayor parte del tiempo su juego en cada cuadro, y puede brindarle información específica sobre qué llamadas de GPU se están utilizando.

Por ejemplo, si ve que se está gastando una gran cantidad de tiempo en los filtros anisotrópicos de la GPU y está dominando el trabajo que se realiza en cada cuadro, es probable que pueda obtener grandes ganancias de rendimiento al cambiar esta configuración.

Si ve que los tiempos de la GPU son cortos y regulares, pero los tiempos de la CPU son dominantes y le hacen perder las sincronizaciones de cuadros, eche un vistazo a sus algoritmos de carga de texturas / preparación de cuadros.

Consulte la [documentación oficial de uso](https://developer.qualcomm.com/software/snapdragon-profiler/app-notes) para obtener más información.

### ARM Mobile Studio

Otro perfilador útil de dispositivos ARM es [ARM Mobile Studio](https://developer.arm.com/tools-and-software/graphics-and-gaming/arm-mobile-studio). Algunos desarrolladores pueden preferirlo al Snapdragon Profiler, pero puede usarse de manera similar. Consulte [la documentación oficial](https://developer.arm.com/tools-and-software/graphics-and-gaming/arm-mobile-studio/learn/get-started).

### Inspector de GPU de Android

[Android GPU Inspector](https://gpuinspector.dev/) es una nueva herramienta desarrollada por Google y diseñada específicamente para ayudarlo a obtener el mejor rendimiento de su juego con OpenGL y Vulkan. Actualmente se encuentra en un estado de vista previa del desarrollador y puede tomar algo de trabajo configurarlo y actualmente solo funciona en un puñado de dispositivos. Promete ser una de las principales herramientas para utilizar para la creación de perfiles gráficos en el futuro. Ver la [documentación oficial](https://gpuinspector.dev/docs/) .

### ARC Graphics Tracing

Chrome OS tiene un generador de perfiles de gráficos incorporado que te ayuda a comprender cómo interactúa tu juego de Android con el compositor de escritorio. Puede ayudarlo a obtener una vista global del sistema operativo y ver si se producen fallas debido a que su juego no está produciendo fotogramas lo suficientemente rápido o si otras partes del sistema están utilizando la CPU. Puede incluir etiquetas de rastreo personalizadas en su aplicación para reducir qué partes de su código son responsables de las ventanas de representación faltantes.

Inicie la herramienta de rastreo navegando a `chrome://arc-graphics-tracing` en el navegador en Chrome OS. Las instrucciones de uso detalladas se pueden encontrar en [depuración de animación jank](/{{locale.code}}/android-environment/animation) .

## Próximos pasos

Entonces, tal vez haya encontrado algunos cuellos de botella pero no está seguro de qué hacer con ellos. O los has encontrado y abordado, pero no estás seguro de dónde ir después. A continuación, hemos compilado una lista de recursos y sugerencias generales de Android y del motor para usted.

### Consejos generales

El [portal de desarrolladores de Android](https://developer.android.com/games/optimize) tiene algunos consejos excelentes para aumentar el rendimiento de su aplicación. Aquí se pueden encontrar consideraciones sobre el tiempo de carga, cómo utilizar el subprocesamiento múltiple, el manejo del retraso de entrada y más.

Recuerde perfilar temprano y perfilar con frecuencia, especialmente si está apuntando a máquinas menos potentes o si supera los límites de la arquitectura de alta gama. Realizar un seguimiento de las estadísticas de rendimiento de su aplicación lo ayudará a identificar qué cambios redujeron su velocidad de cuadros y cuáles lo ayudan a mantener esa experiencia fluida a la que apunta.

### Unity

Además de sus propias [recomendaciones generales](https://docs.unity3d.com/Manual/MobileOptimizationPracticalGuide.html) , Unity proporciona guías de práctica. Echa un vistazo a sus tutoriales detallados sobre la optimización de [gráficos](https://docs.unity3d.com/Manual/MobileOptimizationGraphicsMethods.html), [jugabilidad](https://docs.unity3d.com/Manual/MobileOptimizationScriptingMethods.html) , [renderización](https://docs.unity3d.com/Manual/MobileOptimizationPracticalRenderingOptimizations.html) y [secuencias de comandos](https://docs.unity3d.com/Manual/MobileOptimizationPracticalScriptingOptimizations.html).

Considere leer la guía de ARM sobre creación de [perfiles y optimización de juegos de Unity](https://developer.arm.com/docs/100140/0402/performance-analysis/profiling-a-unity-game-example) y sus mejores prácticas asociadas. Esto lo guiará a través del proceso de creación de perfiles de un juego de ejemplo en Unity con la herramienta Streamline, una faceta de [ARM Mobile Studio](#arm-mobile-studio).

### Unreal

Unreal ha escrito sus propias [pautas de rendimiento](https://docs.unrealengine.com/en-US/Platforms/Mobile/Performance/index.html) y [sugerencias y consejos](https://docs.unrealengine.com/en-US/Platforms/Mobile/Performance/TipsAndTricks/index.html)que le enseñan cómo aprovechar mejor muchas de las opciones y configuraciones que proporciona el motor. Aquí encontrará cosas como trucos de nivel de detalle, cómo aprovechar al máximo la iluminación, guías paso a paso sobre configuraciones de calidad del material y sombreadores, entre otras sugerencias.

Para obtener más optimizaciones basadas en gráficos, ARM ha escrito una [guía](https://developer.arm.com/docs/100959/0101/optimizations-and-optimization-techniques/unreal-engine-best-practices) para optimizar los juegos móviles. Aquí se pueden encontrar consejos generales de optimización, así como consideraciones de gráficos específicos de Unreal.
