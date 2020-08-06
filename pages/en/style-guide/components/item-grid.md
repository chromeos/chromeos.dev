---
title: Item Grid
examples:
  - title: Full, shape on on 1
    arguments:
      title: Recommended
      items:
        - title: Lorem ipsum dolor sit amet, consectetur
          body: Go beyond mobile. Adapting apps for Chromebooks opens up a new world of possibility on larger screens.
          url: 'https://google.com'
        - title: Nemo eaque non iure dolorum placeat dolores ullam.
          body: From tablets, to foldables, to Chromebooks, see Android can be adapt to larger screens and form factors on Chrome OS.
          url: 'https://google.com'
        - title: Fugit eveniet obcaecati accusantium iusto odio fuga optio
          body: The latest Flutter release adds support for building beautiful, tailored Chrome OS applications.
          url: 'https://google.com'
      modifiers:
        shapeOn: 1
  - title: Full, shape on 2
    arguments:
      title: Chrome OS news and stories
      items:
        - eyebrow: Trends
          title: Larger screens. Real results.
          body: This card has it all, eyebrow, title, body and source. Go beyond mobile. Adapting apps for Chromebooks opens up a new world of possibility on larger screens.
          source:
            logo: 'https://picsum.photos/seed/one/40'
            name: Published on Android Developers Blog
          url: 'https://google.com'
        - eyebrow: Product
          title: Adapting Android apps for Chromebook
          body: From tablets, to foldables, to Chromebooks, see Android can be adapt to larger screens and form factors on Chrome OS.
          source:
            logo: 'https://picsum.photos/seed/two/40'
            name: 'Medium: Google Play Dev'
          url: 'https://google.com'
        - eyebrow: Trends
          title: Flutter and Chrome OS. Better together.
          body: The latest Flutter release adds support for building beautiful, tailored Chrome OS applications.
          source:
            logo: 'https://picsum.photos/seed/three/40'
            name: Google Dev Blog
          url: 'https://google.com'
        - eyebrow: Trends
          title: Build a dev workflow with Cloud Code on a Pixelbook
          body: Can you use a Pixelbook for serious software development?
          source:
            logo: 'https://picsum.photos/seed/four/40?grayscale'
            name: 'Google Cloud Blog'
          url: 'https://google.com'
      modifiersAlt:
        shapeOn: 2
  - title: Short, no modifiers
    arguments:
      title: Short text in one card
      items:
        - title: Lorem ipsum dolor sit amet
          body: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          url: '#'
        - title: Reprehenderit iste vel
          body: Animi cupiditate nam maiores quae nesciunt distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id similique rerum rem, vero laboriosam nesciunt nisi dolor.
          url: '#'
  - title: Icon card grid (6 elements)
    arguments:
      title: This card has a very long title. Magni nemo maxime rerum ex quia!
      items:
        - title: This card has a very long title. Magni nemo maxime rerum ex quia!
          image: https://icons.iconarchive.com/icons/google/chrome/256/Google-Chrome-icon.png
          alt: Some alt
          cta:
            url: 'https://www.google.com/'
            text: Custom link
        - title: This card has a very long title. Magni nemo maxime rerum ex quia! Praesentium reprehenderit explicabo tempora aperiam.
          image: https://icons.iconarchive.com/icons/dtafalonso/android-l/512/Play-Store-icon.png
          alt: Some alt
          cta:
            url: '/'
            text: Custom link
        - title: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          image: https://icons.iconarchive.com/icons/google/chrome/256/Google-Chrome-icon.png
          alt: Some alt
          cta:
            url: '/'
            text: Custom link
        - title: This card has a very long title. Magni nemo maxime rerum ex quia!
          image: https://icons.iconarchive.com/icons/google/chrome/256/Google-Chrome-icon.png
          alt: Some alt
          cta:
            url: 'https://www.google.com/'
            text: Custom link
        - title: This card has a very long title. Magni nemo maxime rerum ex quia! Praesentium reprehenderit explicabo tempora aperiam.
          image: https://icons.iconarchive.com/icons/dtafalonso/android-l/512/Play-Store-icon.png
          alt: Some alt
          cta:
            url: 'https://www.google.com/'
        - title: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          image: https://icons.iconarchive.com/icons/dtafalonso/android-l/512/Play-Store-icon.png
          alt: Some alt
          cta:
            url: '/'
      modifiers:
        variant: 'icon'
      defaultText: Read More
  - title: Icon card grid (3 elements)
    arguments:
      title: This card has a very long title. Magni nemo maxime rerum ex quia!
      items:
        - title: This card has a very long title. Magni nemo maxime rerum ex quia!
          image: https://icons.iconarchive.com/icons/google/chrome/256/Google-Chrome-icon.png
          alt: Some alt
          cta:
            url: 'https://www.google.com/'
            text: Custom link
        - title: This card has a very long title. Magni nemo maxime rerum ex quia!
          image: https://icons.iconarchive.com/icons/dtafalonso/android-l/512/Play-Store-icon.png
          alt: Some alt
          cta:
            url: 'https://www.google.com/'
            text: Custom link
        - title: This card has a very long title. Magni nemo maxime rerum ex quia!
          image: https://icons.iconarchive.com/icons/google/chrome/256/Google-Chrome-icon.png
          alt: Some alt
          cta:
            url: 'https://www.google.com/'
            text: Custom link
      modifiers:
        variant: 'icon'
      defaultText: Read More
  - title: Community grid
    arguments:
      title: Developer news and resources to get you up and running
      items:
        - logo: /images/landings/home/android-logo.png
          cta:
            url: https://android-developers.googleblog.com/
            text: Android Developers Blog
        - logo: /images/landings/home/twitter-logo.png
          cta:
            url: https://twitter.com/AndroidDev
            text: Android Developers Twitter Channel
        - logo: /images/landings/home/youtube-logo.png
          cta:
            url: https://www.youtube.com/user/androiddevelopers
            text: Android Developers YouTube Channel
        - logo: /images/landings/home/twitter-logo.png
          cta:
            url: https://twitter.com/ChromiumDev
            text: Chrome Developers Twitter Channel
        - logo: /images/landings/home/github-logo.png
          cta:
            url: https://github.com/googlechrome
            text: Chrome OS on Github
        - logo: /images/landings/home/codelabs-logo.png
          cta:
            url: https://developers.google.com/web/fundamentals/codelabs/
            text: Codelabs & Code Samples
        - logo: /images/landings/home/medium-logo.png
          cta:
            url: https://medium.com/googleplaydev
            text: Google Play on Medium
        - logo: /images/landings/home/reddit-logo.png
          cta:
            url: https://www.reddit.com/r/chromeos/
            text: Linux (Beta) on Chrome OS Reddit community
        - logo: /images/landings/home/stackoverflow-logo.png
          cta:
            url: https://stackoverflow.com/questions/tagged/google-chrome-os
            text: Stack Overflow
        - logo: /images/landings/home/webdev-logo.png
          cta:
            url: https://web.dev/
            text: web.dev
      modifiers:
        variant: 'community'
  - title: card grid using card-subnav
    arguments:
      title: This card has a very long title. Magni nemo maxime rerum ex quia!
      items:
        - title: Larger screens. Real results.
          desc: This is a card with a list of links. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor est nec ante suscipit suscipit. Nullam euismod vel dui vitae pellentesque.
          icon: wrench
          sections:
            - title: This is a title
              url: '/'
            - title: This is a title, with a longer text
              url: '/'
            - title: This is a title, with a longer longer longer text
              url: '/'
            - title: This is a title
              url: '/'
        - title: Larger screens. Real results.
          desc: This is a card with a list of links. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor est nec ante suscipit suscipit. Nullam euismod vel dui vitae pellentesque.
          icon: game-controller
          sections:
            - title: This is a title
              url: '/'
            - title: This is a title, with a longer text
              url: '/'
            - title: This is a title, with a longer longer longer text
              url: '/'
            - title: This is a title
              url: '/'
      modifiers:
        variant: 'subnav'
---

A grid of items.

Recommendations for arguments when `modifiers.variant` is `icon`

- `defaultText`: `microcopy.more`
