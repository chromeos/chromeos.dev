---
title: Adaptar juegos web
metadesc: Crear y optimizar juegos web para Chrome OS
date: 2020-06-16
weight: -1
---

Los juegos web se ven y funcionan muy bien en Chrome OS. Puede llegar a más usuarios y proporcionar una mejor integración empaquetando su aplicación como PWA. Lea sobre PWA con los siguientes enlaces:

- [Descripción general de PWA de web.dev](https://web.dev/progressive-web-apps/)
- [PWAs de escritorio en Chrome OS](/%7B%7Blocale.code%7D%7D/web/desktop-progressive-web-apps)

## Pantallas táctiles

Muchos dispositivos con Chrome OS tienen pantallas táctiles. Si bien la mayoría de las entradas táctiles deberían funcionar sin trabajo adicional para los juegos web, debe tener cuidado de no utilizar métodos de entrada que sean específicos para la entrada del mouse, por ejemplo. si está viendo eventos como `mousedown` y `touchmove` .

Puede encontrar más información y mejores prácticas [aquí](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent) y [aquí](https://www.html5rocks.com/en/mobile/touchandmouse/) .

## Soporte de lápiz

Muchos dispositivos Chrome OS vienen con un lápiz óptico o pueden funcionar con una tableta de dibujo bluetooth externa como [Wacom Intuos](https://www.wacom.com/en-us/products/pen-tablets/wacom-intuos) . Las aplicaciones de dibujo y los juegos basados en deslizar pueden llegar a un gran número de usuarios en la web, y Chrome OS es la plataforma perfecta para jugarlos. Además de la experiencia que obtendría en otras plataformas, Chrome OS puede aprovechar una sugerencia especial de baja latencia que puede proporcionar una respuesta de pantalla súper rápida. Mira [este artículo](https://developers.google.com/web/updates/2019/05/desynchronized) para más información.

## Controladores de juegos

Algunos usuarios querrán interactuar con su juego usando un controlador de juego. Esto puede hacer que tu juego realmente se destaque y aumentar la participación del usuario. Para obtener más información, consulte la [API de Gamepad](https://www.w3.org/TR/gamepad/) .

Los botones se asignan a valores comunes después de una [asignación común](https://www.w3.org/TR/gamepad/#remapping) . Desafortunadamente, no todos los fabricantes de controladores de juegos siguen las mismas convenciones de mapeo. Permitir que los usuarios seleccionen entre diferentes asignaciones de controladores populares garantizará la mejor experiencia.

## Motores de juego

Muchos motores de juegos tienen objetivos web que simplifican las entradas difíciles y los problemas complicados de soporte del navegador, lo que puede ayudarlo a centrarse en crear un gran juego para sus usuarios.

Algunos motores que puede desear consultar son [Construct](https://www.construct.net/en) , [Defold](https://defold.com/) , [Phaser](https://phaser.io/) , [Pixi](https://www.pixijs.com/) , [Unity](https://unity.com/) y [Cocos2d-x](https://www.cocos.com/en/cocos2dx) .
