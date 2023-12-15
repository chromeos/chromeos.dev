<script lang="ts">
  import type { CTA } from '$types/content';
  import type { Story } from '$types/sanity';
  import CallToAction from '$components/CTA.svelte';

  export let story: Story;
  export let cta: CTA;

  const { slug: category } = story.category;

  const type =
    category === 'gaming' ? 'games' : category === 'pwa' ? 'web' : 'android';

  const banner = `ix://landings/stories/banner-${type}.svg`;
</script>

<header class="story-banner">
  <img
    src={banner}
    class="story-banner--background story-banner--background__large"
    aria-hidden="true"
    alt=""
  />
  <div class="story-banner--back"><CallToAction {cta} /></div>
  <div class="story-banner--body">
    <img
      src={banner}
      class="story-banner--background story-banner--background__small"
      aria-hidden="true"
      alt=""
    />
    <h1 class="story-banner--title type--h1">{story.title}</h1>
    <figure class="app">
      <img src={story.app.logo.image} class="app--logo" alt="" sizes="60px" />
      <figcaption class="app--info">
        <p class="app--text type--h6">{story.app.title}</p>
        <p class="app--text type--small">{story.app.company}</p>
      </figcaption>
    </figure>
  </div>
</header>

<style lang="scss">
  .story-banner {
    --cta-color: var(--white);

    background-color: var(--blue-700);
    width: 100%;
    display: grid;

    grid-template-columns: subgrid;
    grid-columns: 1 / -1;
    position: relative;

    &--back {
      padding: 1.5rem;
      background-color: var(--white);
      --cta-color: var(--blue-700);

      @container style(--inline-extras: 0) {
        --cta-color: var(--white);
        display: grid;
        grid-template-columns: var(--grid);
        background-color: transparent;
        column-gap: 2.5rem;

        > :global(.cta__wrapper) {
          grid-column: 2 / span 2;
        }
      }
    }

    &--body {
      display: grid;
      position: relative;
      min-height: 33vh;
      gap: 2.5rem;
      grid-template-columns: var(--grid);
      align-items: center;
      padding-inline: 1.5rem;
      padding-block-end: 5rem;
      padding-block-start: 2.5rem;

      @container style(--inline-extras: 0) {
        padding-block-start: 0;
      }
    }

    &--title {
      color: var(--white);
      position: relative;
      z-index: 1;
      max-width: 30ch;
      @container style(--inline-extras: 0) {
        max-width: unset;
        grid-column: 2 / span 1;
      }
    }

    &--background {
      display: none;
      position: absolute;
      z-index: 0;
      top: 0;
      right: 0;

      &__small {
        @container style(--inline-extras: 1) {
          display: block;
        }
      }

      &__large {
        @container style(--inline-extras: 0) {
          display: block;
        }
      }
    }
  }

  .app {
    display: flex;
    gap: 1.5rem;
    position: relative;
    z-index: 1;
    align-items: center;

    &--logo {
      height: 3.75rem;
      width: 3.75rem;
      border-radius: 0.3125rem;
      filter: drop-shadow(0 2px 50px rgba(0, 0, 0, 0.2));
    }

    &--info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.25rem;
    }

    &--text {
      color: var(--white);
    }
  }
</style>
