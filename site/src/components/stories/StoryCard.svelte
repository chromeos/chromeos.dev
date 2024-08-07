<script lang="ts">
  import crypto from 'crypto';
  import CTA from '$components/CTA.svelte';
  import type { Story } from '$types/sanity';

  export let story: Story;
  export let action: string;
  export let eyebrow: string;

  const id = crypto.randomUUID().replace(/-/g, '').substring(0, 7);
  const image = story?.hero?.image || placeholder();

  /**
   * Determines correct placeholder image to use
   * @return {string} Placeholder image
   */
  function placeholder() {
    const t = story.category.slug;
    if (t === 'pwa') {
      return 'ix://landings/stories/placeholder-web.svg';
    } else if (t === 'android') {
      return 'ix://landings/stories/placeholder-android.svg';
    } else {
      return 'ix://landings/stories/placeholder-games.svg';
    }
  }

  const cta = {
    type: 'link',
    direction: 'forward',
    text: action,
  };
</script>

<a href={story._path} class="story-card" aria-labelledby={id}>
  <article class="story-card--container">
    <img src={image} alt={story?.hero?.alt || placeholder()} />
    <div class="story-card--content">
      {#if eyebrow}
        <small class="type--eyebrow">{eyebrow}</small>
      {/if}
      <h2 class="story-card--title type--h4" {id}>{story.title}</h2>
      <CTA {cta} inline={true} />
    </div>
  </article>
</a>

<style lang="scss">
  @import '$sass/shared';

  .story-card {
    display: block;
    text-decoration: none;
    container-type: inline-size;

    &--container {
      @include elevation(0);
      background-color: var(--white);
      border-radius: 0.625rem;
      display: flex;
      flex-flow: column;
      height: 100%;
      overflow: hidden;
      position: relative;
      text-decoration: none;
      width: 100%;
      z-index: 1;

      :global([data-theme='dark']) & {
        border-color: var(--phosphor-green);
      }

      &:focus,
      &:hover {
        @include elevation(2);
      }

      > :global(img) {
        aspect-ratio: 16 / 9;
        width: 100%;
        object-fit: cover;
      }
    }

    &--title {
      // font-size: clamp(1.125rem, 4.5cqw, 1.375rem);
    }

    &--content {
      padding: clamp(1.5rem, 6.5cqw, 2.5rem);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.25rem;
      height: 100%;
    }
  }
</style>
