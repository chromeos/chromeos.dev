---
title: Depuración de distorción en animación
metadesc: Uso del trazador de gráficos ARC para garantizar animaciones suaves, sin fallas y sin distorciones para las aplicaciones.
date: 2020-05-01
weight: -5
tools:
  - name: Chrome OS
    url: /
    versions:
      min: 75
      max: Actual
---

Uno de los problemas más difíciles para los desarrolladores de aplicaciones es garantizar una animación fluida, sin fallas y sin distorciones. Esto es especialmente difícil de depurar cuando el sistema también realiza tareas en segundo plano de uso intensivo de recursos. No hay una manera fácil de determinar si su aplicación o el sistema causan algúna distorción. Sin embargo, existe una herramienta de perfil que puede ayudarle a identificar la posible fuente del mal comportamiento.

## Renderizado en Chrome OS

Una aplicación optimizada, como un juego, generalmente usa doble búfer para mantener el tiempo de respuesta del usuario lo más bajo posible. Aún así, hay muchas cosas que pueden degradar el rendimiento. Por ejemplo, si el procesamiento de un cuadro demora demasiado, el resultado procesado no está listo para el siguiente intercambio de búfer y, en consecuencia, el cuadro anterior se repite. Entonces, el renderizador no puede comenzar a renderizar el siguiente cuadro, causando aún más problemas. Este escenario es familiar para los desarrolladores de Android "puros". Cuando una aplicación se ejecuta en Chrome OS, el contexto es aún más complicado.

Una aplicación que se ejecuta en el escritorio no se procesa directamente en el marco de la pantalla. Representa sus datos en una textura en su lugar. Por lo general, hay varias aplicaciones, cada una de las cuales representa sus gráficos en una textura. El sistema construye la vista en la pantalla usando un compositor para combinar todas las texturas en una sola imagen de escritorio.

El compositor trabaja de forma transparente en el fondo. Sin embargo, presenta un retraso de un cuadro para maximizar el uso de los procesos del GPU. En un mundo ideal, esto podría no ser necesario, pero suaviza las fluctuaciones de rendimiento del sistema y ayuda a equilibrar una carga asimétrica.

Cuando el sistema operativo está trabajando muy duro, la GPU se puede comprimir. Puede haber un retraso adicional desde el momento en que se procesa un fotograma cuando aparece en la pantalla. El sistema podría usar el almacenamiento en búfer cuádruple para compensar (esto depende del hardware). Incluso con una amortiguación más profunda, el proceso tubería gráfico aún podría fallar.

## El trazador de gráficos ARC

Chrome OS tiene una herramienta de creación de perfiles que muestra cómo los búferes se filtran a través del sistema, cuándo se producen intercambios de memoria, qué tan ocupada está la CPU / GPU y qué está haciendo su aplicación en un momento dado:

![Jank Profiler, con la aplicación ARC ++ ejecutándose a la izquierda y la información de CPU, memoria, gráficos de Chrome y gráficos de Android a la derecha.](/images/android/animation/jank-profiler.png)

### Configurar el perfilador

Para usar el generador de perfiles, debe ejecutar M75 o posterior. Para obtener los mejores resultados, recomendamos usar un dispositivo Intel.

Antes de usar el generador de perfiles, debe colocar trazas en su aplicación. Agregar `Trace.traceCounter(Trace.TRACE_TAG_GRAPHICS, "Event", <number>);` a su código donde quiera incluir un rastro. El `Event` que use debe comenzar con el prefijo `customTrace.` . El prefijo no aparecerá en el mensaje de rastreo.

Para configurar el generador de perfiles, siga estos pasos:

1. Activa el modo desarrollador.
2. Active la configuración de Chrome y habilite la **herramienta de visualización de búferes gráficos ARC** .
3. Navegue a `chrome://arc-graphics-tracing` .

### Ejecutando el perfilador

1. Verifique la **parada en "jank"** .
2. Ejecute la aplicación de Android.
3. Cuando la aplicación de Android está activa y tiene el foco, presione [[Ctrl]] + [[Shift]] + [[G]].

Cuando ocurre algún "jank", aparecerá la ventana del navegador. Use las teclas [[w]] y [[s]] para hacer zoom y reducir la línea de tiempo.
