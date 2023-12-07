<script lang="ts">
  import type { HomepageCard as HomepageCardType } from '$types/sanity';
  import HomeCard from '$components/home/HomeCard.svelte';

  export let cards: HomepageCardType[] = [];
</script>

<section
  class="section wrapper wrapper--full-bleed wrapper--no-top wrapper--padding wrapper--padded wrapper__contained wrapper__background--color-stop"
>
  <div class="home--card-grid">
    {#each cards as card}
      <HomeCard {card} />
    {/each}
  </div>
</section>
