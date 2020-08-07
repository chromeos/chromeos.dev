---
title: Soporte de entrada
metadesc: Aprenda sobre el manejo de entrada de teclado, mouse, controlador y lápiz óptico
date: 2020-06-16
weight: -8
---

Si bien muchos dispositivos Chrome OS tienen pantallas táctiles, para los juegos, la mejor experiencia de interacción en estos dispositivos de pantalla grande a menudo se entrega a través del mouse, el teclado y el gamepad. El mundo de los juegos móviles a menudo se centra en el tacto y se debe pensar en cómo proporcionar la mejor experiencia para los usuarios que no usan el tacto.

Comience por consultar las mejores prácticas para agregar soporte para [teclado](/{{locale.code}}/android/input-compatibility#keyboard) , [mouse](/{{locale.code}}/android/input-compatibility#mouse-and-touchpad-support) y [gamepad](/{{locale.code}}/android/input-compatibility#gamepads) . Deberá prestar especial atención al caso en el que los usuarios mantienen presionadas las teclas o pueden presionar varias teclas.

Las acciones táctiles están bien para Chromebooks con pantallas táctiles, pero es importante incluir también controles físicos bien pensados para una buena experiencia. Por ejemplo, la entrada del mouse es excelente para ajustar la vista o apuntar, pero no debería ser necesaria para realizar acciones, si un juego móvil tiene un menú en pantalla que permite al usuario usar una antorcha, una espada o un escudo presionando un botón con su pulgar, que requiere que hagan clic en estos botones con el mouse, proporcionará una experiencia deficiente. En cambio, las teclas del teclado deben designarse para activar cada acción anulando `onKeyUp` o `onKeyDown` . Consulte la [página de compatibilidad de entrada](/{{locale.code}}/android/input-compatibility) para obtener detalles y código.

## Captura de ratón

Los juegos de punto de vista en primera persona se ven mejor en el escritorio cuando implementan la captura del mouse. Esto oculta el puntero del mouse y permite al usuario mover el punto de vista, apuntar, dirigir, etc., usando el mouse. A continuación una demostración básica de captura del mouse que registra la posición del puntero y los estados de los botones después de que el usuario hace clic en una vista de texto llamada `text_clickme` . Consulte la [documentación de captura del puntero de](https://developer.android.com/training/gestures/movement#pointer-capture) Android para obtener más información.

```kotlin
class MainActivity : AppCompatActivity() {

    var mouse_x: Float = 0f
    var mouse_y: Float = 0f
    var mouse_left_pressed = false
    var mouse_center_pressed = false
    var mouse_right_pressed = false
    var mouse_scrolling = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        text_clickme.setOnClickListener {
            text_clickme.requestPointerCapture()
        }

        text_clickme.setOnCapturedPointerListener { view, motionEvent ->
            // Get the coordinates required by your app
            mouse_x = motionEvent.x
            mouse_y = motionEvent.y

            when (motionEvent.action) {
                ACTION_DOWN -> {
                    when (motionEvent.buttonState) {
                        BUTTON_PRIMARY -> mouse_left_pressed = true
                        BUTTON_SECONDARY -> mouse_right_pressed = true
                        BUTTON_TERTIARY -> mouse_center_pressed = true
                    }
                    mouse_scrolling = false
                }

                ACTION_CANCEL,
                ACTION_UP -> {
                    when (motionEvent.actionButton) {
                        BUTTON_PRIMARY -> mouse_left_pressed = false
                        BUTTON_SECONDARY -> mouse_right_pressed = false
                        BUTTON_TERTIARY -> mouse_center_pressed = false
                        0 -> {
                            mouse_left_pressed = false
                            mouse_right_pressed = false
                            mouse_center_pressed = false
                        }
                    }
                    mouse_scrolling = false
                }
                ACTION_SCROLL -> {
                    mouse_scrolling = true
                }
                else -> {
                    mouse_scrolling = false
                }
            }

            // Indicate event was consumed
            true
        }
    }

    // Release pointer capture when escape pressed
    override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KEYCODE_ESCAPE) {
            text_clickme.releasePointerCapture()
            return true;
        }
        return super.onKeyUp(keyCode, event)
    }
}
```

## Chat

Las funciones de chat pueden ser un componente importante de los juegos multijugador. Tómate un tiempo para pensar cómo los usuarios interactuarán con la función de chat de tu juego mientras juegas. En particular, si están jugando con el teclado, no deberían tener que usar el mouse o la pantalla táctil para acceder al chat o enviar mensajes.

Un patrón podría ser que una tecla del teclado enfoque el cuadro de chat y maneje la tecla [[enter]] para enviar mensajes.

```kotlin
override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
  return when(keyCode) {
    KeyEvent.KEYCODE_C -> {
      edittext_chatbox.requestFocus()
      true
    }
    KeyEvent.KEYCODE_ENTER -> {
      submitChatMessage()
      true
    }
    else -> super.onKeyUp(keyCode, event)
  }
}
```

Visite la [documentación del teclado](/{{locale.code}}/android/input-compatibility#keyboard) en la página de compatibilidad de Android.

## Soporte de lápiz

Las aplicaciones de dibujo y juegos centrados en movimientos de deslizamiento pueden beneficiarse de la entrada de un lápiz óptico en dispositivos de . Visite la página [de entrada con lápiz óptico](/{{locale.code}}/android/input-compatibility#stylus) para más detalles.

## Controladores de juegos

Las Chromebooks puede proveer soporte hasta cuatro contorladores a la vez. Desarrolladores deben utilizar el [Game Controller APIs](https://developer.android.com/training/game-controllers) estándar de Android para proveer el soporte.

Los botones se asignan a valores comunes después de una [asignación común](https://developer.android.com/training/game-controllers/controller-input#button) . Desafortunadamente, no todos los fabricantes de controladores de juegos siguen las mismas convenciones de mapeo. Permitir que los usuarios seleccionen entre diferentes asignaciones de controladores populares puede proporcionar una experiencia mucho mejor.
