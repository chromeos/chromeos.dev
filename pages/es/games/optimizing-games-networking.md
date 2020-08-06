---
title: Redes para multijugador
metadesc: Optimización de redes multijugador en Chrome OS
date: 2020-06-16
weight: -4
---

Para muchas necesidades los protocolos de [Android’s Network Discover](https://developer.android.com/training/connect-devices-wirelessly/nsd) deben proveer todo lo que un desarrollador esperaría y funcionar de acuerdo a las expectativas. Chrome OS también tiene un reenvío de transmisión incorporado en ambas direcciones para garantizar que su juego reciba correctamente las respuestas a los paquetes de transmisión enviados a sus pares en la red local, y para recibir los paquetes de transmisión enviados por otros pares en la red local.

Debido a la arquitectura y las reglas de seguridad de Chrome OS, una aplicación de Android que necesita conocer la dirección IPv4 del dispositivo Chrome OS en el que se está ejecutando, por ejemplo, para comunicar la dirección a un servidor que desea intermediar un cliente a cliente El juego multijugador con clientes que no sean Chrome OS ubicados dentro de la misma red local, por ejemplo, necesitará implementar alguna lógica adicional.

Para obtener la dirección IPv4 asignada a la red de mayor prioridad a la que está conectado el dispositivo Chrome OS, examine la propiedad del sistema Android `arc.net.ipv4.host_address` y, si es necesario, `arc.net.ipv4.host_gateway` . Una forma de hacer esto es:

```kotlin
fun getChromeOsIpAddress() : String {
   val process = ProcessBuilder().command("/system/bin/getprop", "arc.net.ipv4.host_address").start()
   val ipAddress = readInput(process.inputStream)
   return ipAddress
}

fun getChromeOsIpGateway() : String {
   val process = ProcessBuilder().command("/system/bin/getprop", "arc.net.ipv4.host_gateway").start()
   val gatewayAddress = readInput(process.inputStream)
   return gatewayAddress
}

fun readInput(inputStream: InputStream) : String {
   val bufferedReader = BufferedReader(InputStreamReader(inputStream))
   val stringBuilder = StringBuilder()

   var line: String? = null
   while (bufferedReader.readLine().also({ line = it}) != null) {
       stringBuilder.append(line).append('\n')
   }

   return stringBuilder.toString()
}
```

El tráfico enviado a esta dirección IPv4 en la red local se reenviará a la aplicación de Android, sin la necesidad de "crear ningún agujero" NAT adicional. Para obtener más información sobre esta solución de IPv4, consulte [este problema de cromo](https://bugs.chromium.org/p/chromium/issues/detail?id=1041716) .

En las redes IPv6, Android recibe su propia dirección de red separada del sistema operativo Chrome y se espera que las conexiones directas en la red IPv6 local a y desde esta dirección funcionen como si Android estuviera directamente conectado a la red IPv6 local.
