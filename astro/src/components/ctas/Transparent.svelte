<script lang="ts">
  import type { CTA } from '$types/content';
  import ArrowForward from '../icons/ArrowForward.svelte';
  import ArrowBack from '../icons/ArrowBack.svelte';

  export let cta: CTA;

  const direction =
    cta?.direction === 'forward'
      ? 'cta--right-icon'
      : cta?.direction === 'back'
      ? 'cta--left-icon'
      : '';
</script>

<a href={cta.url} class="cta cta--transparent {direction}">
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
</a>
