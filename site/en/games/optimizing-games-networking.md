---
title: Multiplayer networking
metadesc: Optimizing multiplayer networking on Chrome OS.
date: 2020-06-16
weight: -4
tags:
  - networking
---

For many multiplayer networking needs, [Android’s Network Discover](https://developer.android.com/training/connect-devices-wirelessly/nsd) protocols should provide all that you need and work as expected. Chrome OS also has built-in broadcast forwarding in both directions to ensure your game will correctly receive responses to broadcast packets sent out to peers on the local network, and to receive broadcast packets sent by other peers on the local network.

Due to Chrome OS’s architecture and security rules, an Android app that needs to know the IPv4 address of the Chrome OS device it is running on, for example in order to communicate the address to a server that wishes to broker a client-to-client multiplayer game with non-Chrome OS clients located inside the same local network for example, will need to implement some additional logic.

To get the IPv4 address assigned to the highest priority network that the Chrome OS device is connected to, examine the android system property `arc.net.ipv4.host_address` and, if needed, `arc.net.ipv4.host_gateway`. One way to do this is:

```kotlin {title="Sample Kotlin" .code-figure}
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

Traffic sent to this IPv4 address on the local network will be forwarded to the Android app, without the need for any additional NAT “hole punching”. For more information about this IPv4 workaround, see [this chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=1041716).

On IPv6 networks, Android receives its own network address separate from Chrome OS and direct connections on the local IPv6 network to and from this address is expected to work as if Android was directly connected to the local IPv6 network.
