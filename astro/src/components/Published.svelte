<script>
  export let label = 'Published';
  export let locale = 'en-US';
  export let wrapper = 'div';
  export let date = new Date();
</script>

<svelte:element this={wrapper} class="extras-section">
  <h4 class="type--label">{label}</h4>
  <time class="type--h6" datetime={date}
    >{date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}</time
  >
</svelte:element>
