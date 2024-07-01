<script lang="ts">
  import type { CTA } from '$types/content';
  import ArrowForward from '../icons/ArrowForward.svelte';
  import ArrowBack from '../icons/ArrowBack.svelte';

  export let cta: CTA;
  export let inline = false;
  export let type: 'high' | 'medium' | 'low';

  const wrapper = inline === true ? 'span' : 'a';
  const classes = `cta cta--${type}`;
  const direction =
    cta?.direction === 'forward'
      ? 'cta--right-icon'
      : cta?.direction === 'back'
        ? 'cta--left-icon'
        : '';
</script>

<svelte:element
  this={wrapper}
  href={inline !== true ? cta.url : null}
  class="cta__wrapper {direction}"
>
  <span class={classes}>
    {#if cta?.direction === 'back'}
      <span class="icon--container">
        <ArrowBack />
      </span>
    {/if}

    {cta.text}

    {#if cta?.direction === 'forward'}
      <span class="icon--container">
        <ArrowForward />
      </span>
    {/if}
  </span>
</svelte:element>
