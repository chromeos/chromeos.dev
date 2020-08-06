---
title: El componente de fecha y hora.
examples:
  - title: Render regular
    arguments:
      label: Creado
      value: 2020-04-06
      locale: en-US
      options:
        timeZone: UTC
  - title: Renderizado en línea.
    arguments:
      label: Última actualización
      value: 2020-03-30
      locale: es
      options:
        timeZone: UTC
      modifiers:
        inline: true
  - title: Renderizar con formato.
    arguments:
      label: Al corriente
      value: 2020-02-29 20:20:29 +0000
      locale: en
      options:
        year: 'numeric'
        month: 'long'
        day: 'numeric'
        timeZone: UTC
      modifiers:
        inline: true
---

Recomendaciones para argumentos:

- `label` : `microcopy.lastUpdated`
- `value` : `page.date`
- `locale` : `locale.code`
