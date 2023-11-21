<script lang="ts">
  import crypto from 'crypto';
  import CTA from '$components/CTA.svelte';

  interface StoryPreview {
    title: string;
    metadesc: string;
    path: string;
    lang: string;
    date: Date;
    app: {
      name: string;
      logo: string;
      company: string;
    };
    hero: {
      image: string;
      alt: string;
    };
    featurd: boolean;
    tags: string[];
  }

  export let story: StoryPreview;
  export let action: string;

  const id = crypto.randomUUID().replace(/-/g, '').substring(0, 7);
  const image = story?.hero?.image || placeholder();

  /**
   * Determines correct placeholder image to use
   * @return {string} Placeholder image
   */
  function placeholder() {
    const t = story.tags[0];
    if (t === 'pwa') {
      return 'ix://landings/stories/placeholder-pwa.svg';
    } else if (t === 'android') {
      return 'ix://landings/stories/placeholder-android.svg';
    } else {
      return 'ix://landings/stories/placeholder=games.svg';
    }
  }

  const cta = {
    type: 'link',
    direction: 'forward',
    text: action,
  };
</script>

<a href={story.path} class="story-card" aria-labelledby={id}>
  <article class="story-card--container">
    <img src={image} alt={story?.hero?.alt || null} />
    <div class="story-card--content">
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
