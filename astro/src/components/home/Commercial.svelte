<script lang="ts">
  import type { HomepageCard as HomepageCardType } from '$types/sanity';
  import HomeCard from '$components/home/HomeCard.svelte';

  export let title: string;
  export let copy: string;
  export let items: HomepageCardType[] = [];
</script>

<section
  class="wrapper wrapper--full-bleed wrapper--padding wrapper--padded wrapper__contained wrapper__background"
>
  <div class="inner">
    <header class="home--header">
      <h1 class="type--h1">{title}</h1>
      <h2 class="type--large">{copy}</h2>
    </header>
    <div class="home--card-grid">
      {#each items as card}
        <HomeCard {card} />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .home--card-grid {
    margin-block-start: calc(var(--wrapper-block-spacing-r) / 2);
  }
</style>
