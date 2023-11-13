<script lang="ts">
  import { highlight } from '$lib/helpers/text';

  export let block;

  const { code, language } = block;
  const cls = `language--${language}`;
</script>

<pre class={cls}><code class={cls}>{@html highlight(code, language)}</code
  ></pre>
