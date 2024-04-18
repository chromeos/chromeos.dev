<script>
  export let label = 'Published';
  export let locale = 'en-US';
  export let wrapper = 'div';
  export let date = new Date();
  const d = new Date(date);
</script>

<svelte:element this={wrapper} class="extras-section">
  <h4 class="type--label">{label}</h4>
  <time class="type--h6" datetime={d}
    >{d.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}</time
  >
</svelte:element>

<style>
  .type--h6 {
    font-weight: 400;
  }
</style>
