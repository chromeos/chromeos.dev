<script>
  import Stats from '$components/Stats.svelte';
  export let stats;

  const s = stats.items.map((stat, i) => ({ ...stat, footnote: i + 1 }));
</script>

<section class="wrapper wrapper--padded wrapper--padding">
  <header class="home--header stats--header">
    <h1 class="type--h1">{stats.title}</h1>
    <p class="type--large stats--subtitle">{stats.copy}</p>
  </header>

  <Stats stats={s} />
</section>

<style lang="scss">
  .stats {
    &--header {
      margin-bottom: 5rem;
    }

    &--subtitle {
      margin-top: 1rem;
    }
  }
</style>
