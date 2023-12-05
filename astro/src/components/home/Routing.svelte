<script lang="ts">
  import type { HomepageCard as HomepageCardType } from '$types/sanity';
  import HomeCard from '$components/home/HomeCard.svelte';

  export let cards: HomepageCardType[] = [];
</script>

<section
  class="section wrapper wrapper--full-bleed wrapper--no-top wrapper--padding wrapper--padded wrapper__contained wrapper__background--color-stop"
>
  <div class="routing">
    {#each cards as card}
      <HomeCard {card} />
    {/each}
  </div>
</section>

<style lang="scss">
  .routing {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 3rem 1.25rem;
    row-gap: clamp(1rem, 7rem - 16vw, 3rem);
    padding-bottom: calc(clamp(8.25rem, 12vw, 10.5rem) / 2);
    position: relative;
    z-index: 1;
  }
</style>
