---
title: Statistics
examples:
  - title: 3 Up Example
    arguments:
      items:
        - stat: 55%
          desc: Growth in active installations
        - stat: 2x
          desc: Growth in overall activity in app
        - stat: 99%
          desc: Growth in a third cool statistic
  - title: 3 Up Example with modifier shapes and scaling
    arguments:
      items:
        - stat: +103%
          desc: App Usage Growth YoY on Chrome OS for Android, Web, and Games
          modifiers:
            shape: circle
            scale: full
        - stat: +92%
          desc: Chrome OS YoY Growth
          modifiers:
            shape: triangle
        - stat: +124%
          desc: Growth of User Engagment YoY with apps on Chrome OS
          modifiers:
            shape: semicircle
            scale: half
---

This component is used to incorporate statistics into long-form content. To use in a Markdown file, write your stats in a newly included stat block:

```markdown {title="Markdown" .code-figure}
%[(55%, Growth in active installations), (2x, Growth in overall activity in app)]
```
