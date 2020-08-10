---
title: Desarrollo web
metadesc: Cómo configurar su dispositivo Chrome OS para desarrollar aplicaciones web, cómo configurar el reenvío de puertos para acceder a ellos en otros dispositivos
date: 2020-06-01
weight: -8
---

<!-- prettier-ignore -->
*[IDE]: entorno de desarrollo integrado 
*[LAMP]: abreviatura de una pila de desarrollo PHP común
*[JAM]: abreviatura de una pila de desarrollo Node.js común

Desarrollar aplicaciones web en Chrome OS es casi lo mismo que desarrollar aplicaciones web en cualquier otro sistema operativo. Cualquier editor de código, IDE, herramienta o lenguaje que se ejecute en Linux se ejecuta en Chrome OS. Chrome OS incluso tiene características específicamente diseñadas para ayudar en el desarrollo web, también.

## Editores de código e IDEs

Cualquier editor de código o IDE que se ejecuta en Linux se ejecutará en Chrome OS. [Linux en Chrome OS](/{{locale.code}}/linux) en Chrome OS es una instalación de [Debian](https://www.debian.org/), y los editores de código e IDE para Debian generalmente se instalan de una de tres maneras. Visual Studio Code, por ejemplo, [proporciona un archivo `.deb` el](https://code.visualstudio.com/#alt-downloads) y se puede hacer doble clic para instalarlo desde la aplicación Archivos. IntelliJ, por otro lado, [tiene que descargar un archivo tar que](https://www.jetbrains.com/idea/download/#section=linux) contiene su ejecutable que puede extraer en su contenedor Linux y ejecutar. Sublime Text te permite [instalarlo desde `apt`](https://www.sublimetext.com/docs/3/linux_repositories.html#apt) .

## Lenguajes y herramientas

No importa si su pila es JAM o LAMP o si se es un Python o un Gopher, si se ejecuta en Linux, puede ejecutarlo en Chrome OS. Al instalar lenguajes y herramientas, recomendamos utilizar administradores de versiones de lenguajes para simplificar el proceso de instalación y actualización y permitirle cambiar entre múltiples versiones del lenguaje para cada proyecto en el que trabaje. [RVM](https://rvm.io/), el administrador de versiones de Ruby, es uno de los mejores y más antiguos ejemplos de un administrador de versiones de idiomas, que le permite administrar Ruby y sus dependencias (llamadas gems) para múltiples versiones de Ruby. La mayoría de los otros lenguajes tienen gestores de versiones similares. Este sitio, creado en Node.js, admite [Volta](https://volta.sh/) y [NVM](http://nvm.sh/) para la gestión de versiones de Node. Si prefiere la administración de su lenguaje y herramientas a través de Docker, [también puede hacerlo](/{{locale.code}}/linux/docker) .

## Tuneles en localhost y reenvío de puertos

Ya que Linux en Chrome OS corre dentro de una máquina virtual, los servidores que se ejecutan en el entorno de Linux se reenvían automáticamente al navegador principal de Chrome. Esto significa que puede usar todas las [herramientas de Chrome que le encantan](#el-chrome-que-amas) para desarrollar sus aplicaciones web y no tener que preocuparse por descubrir cómo probar lo que está creando. Sin embargo, a veces, desea compartir un puerto de su computadora con otros dispositivos en la misma red. Cuando necesite hacer eso, lea cómo [configurar el reenvío de puertos](/{{locale.code}}/web-environment/port-forwarding) .

## El Chrome que amas

Todas las herramientas de desarrollo que conoce y ama de Chrome también están en Chrome OS. Debido a que [los puertos de Linux se reenvían a Chrome](#tuneles-en-localhost-y-reenvío-de-puertos) , puede usar todo el poder de [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools?hl={{locale.code}}) , incluido [Lighthouse](https://developers.google.com/web/tools/lighthouse/hl={{locale.code}}) para desarrollar sus aplicaciones, junto con excelentes extensiones de Chrome, como [Accessibility Insights of Web](https://accessibilityinsights.io/docs/en/web/overview). Para hacerlo, inicie su servidor web y navegue a `localhost:PUERTO` (reemplazando `PUERTO` con el número de puerto de su servidor) en su navegador Chrome principal. Puede usar `penguin.linux.test` como reemplazo para localhost si es necesario.

### Más que Chrome

El desarrollo de aplicaciones web en Chrome OS tiene un súper poder que ningún otro sistema operativo de escritorio puede presumir, soporte nativo para navegadores móviles reales. Al desarrollar aplicaciones web en Chrome OS, no está vinculado a solo realizar pruebas en Chrome. Con la tienda Google Play, puede instalar navegadores móviles reales y usarlos para probar su aplicación web. Incluso puede instalar otros navegadores de escritorio completos que se ejecutan en Linux y probar allí también. Si bien los usuarios de Chrome OS usarán su aplicación web en Chrome, entendemos la importancia de crear aplicaciones web que lleguen a todos, independientemente de la elección del navegador.

Probar su aplicación web en otros navegadores Linux es bastante sencillo: instale esos navegadores según sus instrucciones de instalación de Linux y utilícelos como si fueran navegadores nativos, con acceso completo a `localhost` . Sin embargo, los navegadores instalados a través de la tienda Google Play deben tratarse como si estuvieran en un dispositivo externo. Para tener su servidor disponible en esos navegadores, busque su dirección IP ejecutando `hostname -I` y use la dirección IP resultante en lugar de `localhost` cuando navegue, recordando incluir también el puerto.
