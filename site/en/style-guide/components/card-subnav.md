---
title: Card Subnav
examples:
  - title: Complete card
    arguments:
      navSection:
        title: Larger screens. Real results.
        desc: This is a card with a list of links. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor est nec ante suscipit suscipit. Nullam euismod vel dui vitae pellentesque.
        icon: phone
        sections:
          - title: This is a title
            url: '/'
          - title: This is a title, with a longer text
            url: '/'
          - title: This is a title, with a longer longer longer text
            url: '/'
          - title: This is a title
            url: '/'
---

This is card contains a list of links.

This component max-width depends on the grid in which it lives.

Recommendations for arguments:

- `navSection`: Should be an item of the site navigation located `pages/{locale}/nav.yml`. Remember to update navigation items in all locales.
