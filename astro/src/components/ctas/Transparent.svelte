<script>
  import ArrowForward from '../icons/ArrowForward.svelte';
  import ArrowBack from '../icons/ArrowBack.svelte';

  export let arrow = 'none';

  const direction =
    arrow === 'none'
      ? ''
      : arrow === 'forward'
      ? 'cta--right-icon'
      : 'cta--left-icon';
</script>

<span class="cta cta--transparent {direction}">
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
</span>
