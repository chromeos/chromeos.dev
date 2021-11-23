---
title: Form Component
examples:
  - title: Hello World
    arguments:
      locale: en
      settings:
        name: newsletter-sign-up
        endpoint: https://services.google.com/fb/submissions/chromeos-newsletter-qa/
      content:
        title: Get Chrome OS developer news and updates direct to you
        copy: Sign up for the latest news, tips, releases, updates, and more on Chrome OS.
        disclaimer: |-
          Privacy policy: By using this service, you agree to be bound by our Google Terms of Service located at [https://policies.google.com/terms](https://policies.google.com/terms). I acknowledge that the information provided in this form will be subject to Google's privacy policy located at [https://policies.google.com/privacy](https://policies.google.com/privacy).
        required: Required
        errors:
          - type: server
            text: Something went wrong on our end. Please try again later.
          - type: offline
            text: Looks like you’re offline. Please try again when you’re back online.
      fields:
        - type: email
          name: email
          label: Email
          required: true
          error: Please enter a valid email.
        - type: text
          name: first-name
          label: First name
          required: true
          error: Please enter a name.
        - type: text
          name: last-name
          label: Last name
        - type: country
          name: country
          label: Country
          required: true
          error: Please enter a country.
        - type: select
          name: job-role
          label: Job role
          options:
            - text: Academic Researcher / Educator / Scientist
            - text: Analytics / Business Intelligence / Data Science
            - text: Business Development
            - text: Business Management
            - text: Customer Support
            - text: Design / Art / Animation
            - text: Engineering Management
            - text: Marketing
            - text: Product Management
            - text: Production
            - text: Programming / Coding / Software Development
            - text: Public Relations
            - text: Sales
            - text: Site Reliability / Developer Operations
            - text: Strategy / Operations / Planning
            - text: System Administration / System Integration
            - text: QA / Testing
            - text: UI / UX Design / UX Research
            - text: Other
        - type: checkbox
          name: mailing-list
          label: Add me to the mailing list.
          required: true
          error: Please check the box.
        - type: submit
          value: Subscribe
---

The Form Component is the wrapper of differents fields, It supports inline validation, a custom action URL, custom error messages for server errors and browsers with disable javascript.

The form supports mandatory fields (text, email, checkbox, select) and set a custom error message for each one.

For a select field, it allows adding value for each option or if it does not exist it will use the text string.

The Form Component supports Formbox (Responses and fields validations).
