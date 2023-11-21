<script lang="ts">
  import { highlight } from '$lib/helpers/text';

  export let block;

  const { code, language, filename } = block;
  const cls = `language--${language}`;

  let highlighted;
  let l = language;

  try {
    highlighted = highlight(code, l);
  } catch (e) {
    l = 'text';
    highlighted = highlight(code, l);
  }
</script>

<figure class="code-figure">
  <figcaption class="type--label">{filename || l}</figcaption>
  <pre class={cls}><code class={cls}>{@html highlighted}</code></pre>
</figure>

<style lang="scss">
  .code-figure {
    figcaption,
    pre {
      margin-block: 0;
    }

    pre {
      margin-block-start: 0.25rem;
    }
  }
</style>
