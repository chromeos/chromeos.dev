<script>
  import ArrowForward from '../icons/ArrowForward.svelte';
  import ArrowExternal from '../icons/ArrowExternal.svelte';
  import ArrowBack from '../icons/ArrowBack.svelte';

  export let arrow = 'forward';

  const direction =
    arrow === 'forward' || arrow === 'external'
      ? 'cta--right-icon'
      : 'cta--left-icon cta--back';
</script>

<span class="cta cta--link {direction}">
  {#if arrow === 'back'}
    <span class="icon--container">
      <ArrowBack />
    </span>
  {/if}
  <slot />

  {#if arrow === 'forward'}
    <span class="icon--container">
      <ArrowForward />
    </span>
  {/if}
  {#if arrow === 'external'}
    <span class="icon--container">
      <ArrowExternal />
    </span>
  {/if}
</span>

<style>
  .cta {
    color: var(--cta-color);
  }
</style>
