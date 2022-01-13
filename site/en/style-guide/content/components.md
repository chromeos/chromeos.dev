---
title: Content authoring components
metadesc: Components content authors can use when authoring content
---

When authoring content using [Markdown](https://guides.github.com/features/mastering-markdown/), you have access to all of [GitHub flavored Markdown](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax) (GFM) excluding task lists and GitHub specific features (like mentioning people and teams).

For an example of individual variations in long-form typography, see the [typography style guide](/{{locale.code}}/style-guide/typography)

## Additional Extensions

We have also included a number of additional extensions, presented below.

### Code Blocks

When writing long blocks of code, please use code fencing instead of indentation. Syntax highlighting is supported for any language [Prism.js supports](https://prismjs.com/#supported-languages). Because our site is responsive, it's also important that long lines don't have artificial returns inserted into them to constrain them to specific line lengths; our code blocks all have soft line wrapping enabled and total line length varies as needed for available space.

### Definition Lists

Definition lists represent a list of terms and their definitions or descriptions. They should be used instead of standard lists when defining terms.

Term
: Definition

Term 2
: Definition

```markdown {title="Sample Markdown" .code-figure}
Term
: Definition

Term 2
: Definition
```

### Footnote

A footnote is used to provide additional information about an item at the end of the content.

This is a footnote[^1], with a second one[^second] for good measure.

[^1]: Content of the first footnote.
[^second]: Second footnote

```markdown {title="Sample Markdown" .code-figure}
This is a footnote[^1], with a second one[^second] for good measure.

[^1]: Content of the first footnote.
[^second]: Second footnote
```

### Superscript

Superscript content is usually superscript for purely presentational reasons.

This^is^ some^superscript^ content.

```markdown {title="Sample Markdown" .code-figure}
This^is^ some^superscript^ content.
```

### Abbreviations

Abbreviations allow you to define an abbreviation for use throughout text.

<!-- prettier-ignore -->
*[HTML]: Hyper Text Markup Language
*[MD]: Markdown

This MD file is turned into HTML when the site is compiled.

```markdown {title="Sample Markdown" .code-figure}
<!-- prettier-ignore -->
*[HTML]: Hyper Text Markup Language
*[MD]: Markdown

This MD file is turned into HTML when the site is compiled.
```

### Emoji

Add Emoji directly to rendered output through keywords and shortcuts instead of needing to write them directly. See the full lists of available [emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json) and [shortcuts](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/shortcuts.js).

:heart: <3

Emoji can be used in :memo: sentences too.

```markdown {title="Sample Markdown" .code-figure}
:heart: <3

Emoji can be used in :memo: sentences too.
```

### Figure

Add an image with visible caption as a single logical figure. Figures can optionally be numbered which will allow them to be directly linked to.

#[Caption for Image](ix://icons/pwa/chromeOS.svg)

#1[Caption for Image](ix://icons/pwa/chromeOS.svg [With accessible description of image])

```markdown {title="Sample Markdown" .code-figure}
#[Caption for Image](ix://icons/pwa/chromeOS.svg)

#1[Caption for Image](ix://icons/pwa/chromeOS.svg [With description of image])
```

### Video

Add an embedded video from YouTube.

@[youtube](https://www.youtube.com/watch?v=ntLPcVAyNPE)

```markdown {title="Sample Markdown" .code-figure}
@[youtube](https://www.youtube.com/watch?v=ntLPcVAyNPE)
```

### Keyboard key

Display a keyboard key. Whenever you are talking about a specific key on a keyboard, such as providing a key sequence for a keyboard shortcut, each individual key should be inclosed as follows. Additionally, when providing a key sequence, each key should be separated by a `+` \_with\_\_ spaces around it.

[[CTRL]]+[[C]]

```markdown {title="Sample Markdown" .code-figure}
[[CTRL]]+[[C]]
```

### Statistics

Display either a single or multiple related statistics together.

%[123%, What an improvement]

%[(123%, Can you believe it), (2x, Growth in activity), (12%, Bump but still impressive)]

```markdown {title="Sample Markdown" .code-figure}
%[123%, What an improvement]

%[(123%, Can you believe it), (2x, Growth in activity), (12%, Bump but still impressive)]
```

### Messages

Sometimes, you need to call out to a reader with a message they should pay attention to. To do so, use one of the following:

!!! aside.message
This is just a message. Messages _can_ have Markdown in them, and it will render
!!!

!!! aside.message--note
This is a note.
!!!

!!! aside.message--warning
This is a warning.
!!!

!!! aside.message--tip
This is a tip.
!!!

```markdown {title="Sample Markdown" .code-figure}
!!! aside.message
This is just a message. Messages _can_ have Markdown in them, and it will render as expected.
!!!

!!! aside.message--note
This is a note.
!!!

!!! aside.message--warning
This is a warning.
!!!

!!! aside.message--tip
This is a tip.
!!!
```

### Quotes with attribution

When writing stand-alone quotes, use the following to properly include attribution for the quote.

> This is a quote
>
> The quote can have multiple paragraphs

Here is the quote attribution {.cite}

```markdown {title="Sample Markdown" .code-figure}
> This is a quote
>
> The quote can have multiple paragraphs

Here is the quote attribution {.cite}
```
