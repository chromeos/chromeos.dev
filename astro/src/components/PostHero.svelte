<script context="module" lang="ts">
  export type PostHeroProps = {
    title: string;
    description?: string;
    media?: Image;
    theme: Theme;
    cta: CTA;
    form?: 'banner' | 'standalone' | 'header';
  };
</script>

<script lang="ts">
  import type { Theme, Image } from '$types/sanity';
  import type { CTA } from '$components/CTA.svelte';
  import { isExternalLink } from '$lib/links';
  import CallToAction from './CTA.svelte';
  import Eyebrow from './Eyebrow.svelte';

  export let title: string;
  export let description: string;
  export let media: Image;
  export let theme: Theme;
  export let cta: CTA;
  export let form: 'banner' | 'standalone' | 'header' = 'banner';

  const Wrapper = form === 'header' ? 'header' : 'article';
  const Header = form === 'header' ? 'h1' : 'h2';
  const banner = form === 'banner';

  const callToAction = cta;
  if ((form === 'header' || form === 'standalone') && cta?.url) {
    callToAction.type = 'link';
    callToAction.direction = !isExternalLink(cta.url)
      ? form === 'standalone'
        ? 'forward'
        : 'back'
      : 'external';
  }
  if (form === 'banner') {
    callToAction.type = 'transparent';
  }

  const eyebrow = {
    icon: theme.icon,
    text: theme.eyebrow,
  };
</script>

<svelte:element this={Wrapper} class="story-hero">
  <div class="theme {`theme__${theme.slug}`}">
    <div class="story-hero--inner">
      <div class="story-hero--content-wrapper wrapper--padded wrapper--padding">
        {#if form === 'header' && cta.url}
          <div class="story-hero--top-cta">
            <CallToAction cta={callToAction} />
          </div>
        {/if}
        {#if theme.eyebrow}
          <div
            class="story-hero--eyebrow {!banner ? 'story-hero--unibrow' : ''}"
          >
            <Eyebrow {eyebrow} size={banner ? 'large' : 'small'} />
          </div>
        {/if}

        <svelte:element this={Header} class="type--h1">{title}</svelte:element>
        <!-- Only include the description and lower CTA if this isn't being displayed as a header -->
        {#if form !== 'header'}
          <p class="story-hero--body type--h4">{description}</p>
          <div class="story-hero--cta">
            <CallToAction cta={callToAction} />
          </div>
        {/if}
      </div>
      {#if media?.image}
        <div class="story-hero--image-wrapper">
          <img src={media.image} alt={media.alt} class="story-hero--image" />
        </div>
      {/if}

      {#if theme.backgrounds}
        <div class="story-hero--background">
          <img
            loading="lazy"
            data-large
            aria-hidden
            src={theme.backgrounds.large}
          />
          <img
            loading="lazy"
            data-small
            aria-hidden="true"
            src={theme.backgrounds.small}
          />
        </div>
      {/if}
    </div>
  </div>
</svelte:element>

<style lang="scss">
  $swap: 690px;

  .story-hero {
    $parent: #{&};

    container-type: inline-size;
    position: relative;
    width: 100%;

    &--inner {
      display: flex;
      flex-direction: column;

      overflow: hidden;
      max-width: 100rem;
      margin: 0 auto;

      @container (min-width: #{$swap}) {
        display: grid;
        align-items: center;
        grid-template-columns: minmax(40ch, 50%) minmax(200px, auto);
        column-gap: 2rem;
      }
    }

    &--eyebrow {
      color: var(--hero-theme-color);
      margin-bottom: 1rem;
    }

    &--unibrow {
      margin-bottom: 0.5rem;
    }

    &--content-wrapper {
      display: flex;
      flex-direction: column;
      // padding-block-start: clamp(2rem, 6vw, 3rem);
      // padding-block-end: clamp(2rem, 6vw, 3rem);
    }

    &--body {
      margin-top: 1.25rem;
    }
    &--cta {
      --cta-color: var(--hero-theme-color);
      margin-top: 1.75rem;
      max-width: max-content;
    }

    &--top-cta {
      --cta-color: var(--hero-theme-color);
      align-self: flex-start;
      position: absolute;
      top: 2rem;
    }

    &--image-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      aspect-ratio: 4 / 3;
      min-height: 15rem;
      max-height: 30cqh;
      justify-self: flex-end;
      z-index: 1;

      @container (min-width: #{$swap}) {
        min-height: 20rem;
        max-height: 50cqh;
        margin-top: 0;
      }
    }

    &--background {
      display: flex;
      justify-content: flex-end;
      height: 20cqh;

      @container (min-width: #{$swap}) {
        height: auto;
        margin-top: 0;
      }

      #{$parent}:has(#{$parent}--image-wrapper) & {
        right: 0;
        z-index: 0;
        height: 100%;
        width: 100%;

        img {
          position: absolute;
        }
      }

      img {
        display: none;
        // position: absolute;
        right: 0;

        @container (min-width: #{$swap}) {
          max-width: 60cqw;
        }
      }

      [data-small] {
        display: block;
        bottom: 0;

        @container (min-width: #{$swap}) {
          display: none;
          bottom: unset;
        }
      }

      [data-large] {
        top: 0;
        height: 100%;
        @container (min-width: #{$swap}) {
          display: block;
        }
      }
    }
  }

  /** Hero Themes */
  .theme {
    background-color: var(--hero-theme-background);
    border-radius: 0.625rem;

    @container (min-width: calc(100vw - 1rem)) {
      border-radius: 0;
    }

    [class*='type'],
    [class*='link'],
    [class*='icon'] {
      color: var(--hero-theme-color);
      fill: var(--hero-theme-color);
    }

    .cta:focus {
      background-color: var(--hero-theme-cta-background);
    }

    &__games {
      --hero-theme-background: var(--pink-25);
    }

    &__web {
      --hero-theme-background: var(--blue-30);
    }

    &__foundations {
      --hero-theme-background: var(--yellow-75);
    }

    &__android {
      --hero-theme-background: var(--green-25);
    }

    &__event {
      --hero-theme-background: var(--yellow-80);
    }

    &__announcement {
      --hero-theme-background: var(--red-25);
    }

    &__leader-s-corner {
      --hero-theme-background: var(--purple-50);
    }

    &__m100 {
      --hero-theme-color: var(--white);
      --hero-theme-background: var(--blue-850);
      --hero-theme-cta-background: transparent;
    }

    &__io-2022 {
      --hero-theme-color: var(--white);
      --hero-theme-background: var(--green-700);
      --hero-theme-cta-background: transparent;
    }

    &__lumafusion {
      --hero-theme-color: var(--white);
      --hero-theme-background: var(--blue-850);
      --hero-theme-cta-background: transparent;

      --center: 97%;
      --offset: 74px;
      --small: 25%;
      --large: calc(25% + 5rem);

      background-image: radial-gradient(
          circle farthest-corner at var(--center) var(--center),
          var(--blue-200) var(--small),
          transparent var(--small)
        ),
        radial-gradient(
          circle farthest-corner at calc(var(--center) + var(--offset))
            calc(var(--center) + var(--offset)),
          var(--blue-300) var(--large),
          transparent var(--large)
        );
    }
  }
</style>
