---
title: Componente de formulario
examples:
  - title: Hola Mundo
    arguments:
      locale: en
      settings:
        name: Inscríbase al boletín
        endpoint: https://services.google.com/fb/submissions/chromeos-newsletter-qa/
      content:
        title: Recibe las novedades y actualizaciones para desarrolladores de Chrome OS directamente
        copy: Regístrese para recibir las últimas noticias, consejos, lanzamientos, actualizaciones y más sobre Chrome OS.
        disclaimer: 'Política de privacidad: al utilizar este servicio, usted acepta estar sujeto a nuestros Términos de servicio de Google ubicados en [https://policies.google.com/termsfont>(https://policies.google.com/terms). Reconozco que la información proporcionada en este formulario estará sujeta a la política de privacidad de Google ubicada en [https://policies.google.com/privacyfont>(https://policies.google.com/privacy).'
        required: Necesario
        errors:
          - type: servidor
            text: Algo salió mal de nuestro lado. Por favor, inténtelo de nuevo más tarde.
          - type: desconectado
            text: Parece que estás desconectado. Inténtalo de nuevo cuando vuelvas a estar en línea.
      fields:
        - type: correo electrónico
          name: correo electrónico
          label: Email
          required: cierto
          error: Por favor introduzca una dirección de correo electrónico válida.
        - type: texto
          name: nombre de pila
          label: Nombre de pila
          required: cierto
          error: Por favor ingrese un nombre.
        - type: texto
          name: apellido
          label: Apellido
        - type: país
          name: país
          label: País
          required: cierto
          error: Por favor ingrese un país.
        - type: Seleccione
          name: puesto de trabajo
          label: Puesto de trabajo
          options:
            - text: Investigador Académico / Educador / Científico
            - text: Analítica / Inteligencia empresarial / Ciencia de datos
            - text: Desarrollo de negocios
            - text: Administración de Empresas
            - text: Atención al cliente
            - text: Diseño / Arte / Animación
            - text: Gerencia de Ingeniería
            - text: Márketing
            - text: Gestion de producto
            - text: Producción
            - text: Programación / Codificación / Desarrollo de software
            - text: Relaciones públicas
            - text: Ventas
            - text: Confiabilidad del sitio / Operaciones del desarrollador
            - text: Estrategia / Operaciones / Planificación
            - text: Administración del sistema / Integración del sistema
            - text: QA / Pruebas
            - text: Diseño UI / UX / Investigación UX
            - text: Otro
        - type: caja
          name: lista de correo
          label: Agrégame a la lista de correo.
          required: cierto
          error: Por favor marque la casilla.
        - type: enviar
          value: Suscribir
---

El componente de formulario es el contenedor de diferentes campos, admite validación en línea, una URL de acción personalizada, mensajes de error personalizados para errores del servidor y navegadores con JavaScript deshabilitado.

El formulario admite campos obligatorios (texto, correo electrónico, casilla de verificación, seleccionar) y establece un mensaje de error personalizado para cada uno.

Para un campo de selección, permite agregar valor para cada opción o, si no existe, usará la cadena de texto.

El componente de formulario admite Formbox (respuestas y validaciones de campos).
