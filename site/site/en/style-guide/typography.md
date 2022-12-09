---
title: Site Typography
metadesc: Typography Style Guide
published: December 1, 2019
updated: January 30, 2020
---

This is an example of long-form typography used throughout out site. It can be applied by wrapping the long-form text you'd like styled in the `.type` class. This page also demonstrates all of the capabilities available when writing Markdown as an author. An important note for long-form typography, headline styles are styled `n+1`, so an `h1` is styled like an `h2` from our **core** typography (see below).

When building components, we have a set of typography with classes that you should use directly instead of relying on this long-form styling. They're divided into 4 sections:

[Core]({{page.url}}core)
: Core typographic styles that all other styles throughout the site are built on top of.

[Extras]({{page.url}}extras)
: Typographic styles that are commonly used and inherit their styling from one of the core sets of styling.

[CTAs]({{page.url}}cta)
: Call to Action styling, most commonly visualized as buttons and links.

[Links]({{page.url}}links)
: Specific types of link styling used throughout the site.

---

# Headline 1

## Headline 2

### Headline 3

#### Headline 4

##### Headline 5

###### Headline 6

## ![keyboard icon](ix://icons/keyboard.png){.icon--rounded} Example 1 of headline with an icon

## ![aspect ratio icon](ix://icons/aspect_ratio.png){.icon--rounded} Example 2 of headline with an icon

## ![mouse icon](ix://icons/mouse.png){.icon--rounded} Example 3 of headline with an icon

This Is A Thing

: And its definition

And another thing with _inline markup_

: And its got a definition too

```js {title="JavaScript" .code-figure}
let foo = 'Hello World';
const log = (arg) => {
  console.log(arg);
};
log(foo);
```

> This is a nice quote with attribution. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
> {cite="Here is the quote attribution"}

> This is a nice multi-paragraph quote with attribution. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
>
> This is the second paragraph.
> {cite="Here is the quote attribution"}

> This is a nice quote without attribution. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.

Here is a footnote. [^1]

[^1]: The footnote content.

!!! aside.message
**Info:** This is a `message`. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
!!!

!!! aside.message--note
**Note:** This is a `message--note`. Here we have an [example of a link](/) on the note. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
!!!

!!! aside.message--warning
**Warning:** This is a `message--warning`. Here we have an [example of a link](/) on the note. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.
!!!

!!! aside.message--tip
**Tip:** This is a `message--tip`. Here we have an [example of a link](https://google.com) on the note. Eiusmod incididunt excepteur velit qui amet id voluptate cupidatat. Voluptate exercitation incididunt aute pariatur pariatur deserunt minim proident consequat.

Example with more than one paragraph.
!!!
