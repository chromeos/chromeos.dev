<script lang="ts">
  import type { CTA } from '$types/content';

  export let cta: CTA;
  export let inline = false;
  export let type: 'high' | 'medium' | 'low';

  const wrapper = inline === true ? 'span' : 'a';
  const classes = `cta cta--${type}`;
</script>

<svelte:element
  this={wrapper}
  href={inline !== true ? cta.url : null}
  class="cta__wrapper"
>
  <span class={classes}>
    {cta.text}
  </span>
</svelte:element>
