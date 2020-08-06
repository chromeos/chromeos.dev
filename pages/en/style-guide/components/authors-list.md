---
title: Date and Authors Info
examples:
  - title: Simple Example
    arguments:
      authors:
        - samrichard
      contributors:
        samrichard:
          name:
            given: Sam
            family: Richard
          work:
            company: Google
            org: Chrome OS
            title: Developer Advocate
      microcopy:
        author:
          alt: Profile picture of ((t))
  - title: Example with multiple authors
    arguments:
      authors:
        - samrichard
        - johndoe
      contributors:
        samrichard:
          name:
            given: Sam
            family: Richard
          work:
            company: Google
            org: Chrome OS
            title: Developer Advocate
        johndoe:
          name:
            given: John
            family: Doe
          work:
            company: Google
            org: Chrome OS
            title: Web Developer
      microcopy:
        author:
          alt: Profile picture of ((t))
---

Information related to date and authors info of the case study, especially used in News and Stories.

Recommendations for arguments:
Contributors parameter is necessary to pull the author information from; should use global `contributors` data
