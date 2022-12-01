---
title: The article content footer.
examples:
  - title: All topics and date
    arguments:
      topics:
        label: Topics
        items:
          - Gaming
          - Android
          - Screen Size
      updated:
        label: Last updated
        date: 2020-02-29
        locale: en
        options:
          timeZone: 'UTC'
  - title: No date
    arguments:
      topics:
        label: Topics
        items:
          - Gaming
          - Android
          - Screen Size
---

Recommendations for arguments:

- `topics.label`: `microcopy.topics`
- `updated.label`: `microcopy.lastUpdated`
- `updated.date`: `page.date`
- `updated.locale`: `locale.code`
