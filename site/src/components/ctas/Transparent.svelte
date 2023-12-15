<script lang="ts">
  import type { CTA } from '$types/content';
  import ArrowForward from '../icons/ArrowForward.svelte';
  import ArrowBack from '../icons/ArrowBack.svelte';

  export let cta: CTA;
  export let inline = false;

  const direction =
    cta?.direction === 'forward'
      ? 'cta--right-icon'
      : cta?.direction === 'back'
      ? 'cta--left-icon'
      : '';

  const wrapper = inline === true ? 'span' : 'a';
</script>

<svelte:element
  this={wrapper}
  href={cta?.inline !== true ? cta.url : null}
  class="cta cta--transparent {direction}"
>
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
</svelte:element>
