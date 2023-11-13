<script lang="ts">
  import { highlight } from '$lib/helpers/text';

  export let block;

  const { code, language, filename } = block;
  const cls = `language--${language}`;
</script>

<figure class="code-figure">
  <figcaption class="type--label">{filename || language}</figcaption>
  <pre class={cls}><code class={cls}>{@html highlight(code, language)}</code
    ></pre>
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
