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

  const caption = l === 'sh' && !filename ? '' : filename || l;
</script>

<figure class="code-figure">
  {#if caption}
    <figcaption class="type--label">{caption}</figcaption>
  {/if}
  <!-- eslint-disable svelte/no-at-html-tags -->
  <pre class={cls}><code class={cls}>{@html highlighted}</code></pre>
  <!-- eslint-enable svelte/no-at-html-tags -->
</figure>

<style lang="scss">
  .code-figure {
    figcaption,
    pre {
      margin-block: 0;
    }

    figcaption + pre {
      margin-block-start: 0.25rem;
    }
  }
</style>
