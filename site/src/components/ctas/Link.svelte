<script lang="ts">
  import type { CTA } from '$types/content';
  import ArrowForward from '../icons/ArrowForward.svelte';
  import ArrowExternal from '../icons/ArrowExternal.svelte';
  import ArrowBack from '../icons/ArrowBack.svelte';

  export let cta: CTA;
  export let inline = false;

  const direction =
    cta?.direction === 'forward' || cta?.direction === 'external'
      ? 'cta--right-icon'
      : 'cta--left-icon cta--back';
  const wrapper = inline === true ? 'span' : 'a';
</script>

<svelte:element
  this={wrapper}
  href={inline !== true ? cta.url : null}
  class="cta__wrapper"
>
  <span class="cta cta--link {direction}">
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
    {#if cta?.direction === 'external'}
      <span class="icon--container">
        <ArrowExternal />
      </span>
    {/if}
  </span>
</svelte:element>
