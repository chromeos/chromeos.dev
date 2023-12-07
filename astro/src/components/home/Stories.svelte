<script lang="ts">
  import type { Microcopy } from '$types/sanity';
  import FeaturedStory from '$components/stories/FeaturedStory.svelte';
  import StoryCard from '$components/stories/StoryCard.svelte';
  export let title: string;
  export let copy: string;
  export let cta: string;
  export let microcopy: Microcopy;

  const locale = microcopy.locale.code;

  export let stories = [];

  const first = stories[0];
  const rest = stories.slice(1);
</script>

<section
  class="wrapper wrapper--padding wrapper--padded wrapper--full-bleed wrapper__background wrapper__contained"
>
  <div class="inner">
    <header class="home--header">
      <h1 class="type--h1">{title}</h1>
      <h2 class="type--large">{copy}</h2>
    </header>
    <div class="stories">
      <FeaturedStory story={first} {microcopy} />
      {#each rest as story}
        <StoryCard
          {story}
          action={microcopy.actions.more}
          eyebrow={microcopy.identifiers.featured}
        />
      {/each}
    </div>
    <footer>
      <a
        class="cta cta--medium case-studies__cta home--cta"
        href={`/${locale}/stories`}>{cta}</a
      >
    </footer>
  </div>
</section>

<style lang="scss">
  .stories {
    display: flex;
    flex-direction: column;
    gap: clamp(1.25rem, -0.0769230769rem + 3.0769230769vw, 3rem) 1.25rem;
    margin-block: 3rem;

    @media (min-width: 689px) {
      display: grid;
      grid-template-columns: repeat(2, minmax(15rem, 1fr));
    }

    :global(> :first-child) {
      grid-column: 1 / -1;
    }
  }
</style>
