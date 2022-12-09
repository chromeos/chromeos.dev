---
title: The date-time component.
examples:
  - title: Regular render.
    arguments:
      label: Created
      value: 2020-04-06
      locale: en-US
      options:
        timeZone: 'UTC'
  - title: Inline render.
    arguments:
      label: Last updated
      value: 2020-03-30
      locale: es
      options:
        timeZone: 'UTC'
      modifiers:
        inline: true
  - title: Render with format.
    arguments:
      label: Posted
      value: 2020-02-29T20:20:29
      locale: en
      options:
        year: 'numeric'
        month: 'long'
        day: 'numeric'
        timeZone: 'UTC'
      modifiers:
        inline: true
---

Recommendations for arguments:

- `label`: `microcopy.lastUpdated`
- `value`: `page.date`
- `locale`: `locale.code`
