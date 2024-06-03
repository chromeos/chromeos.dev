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

<svelte:element this={Wrapper} class="post-hero">
  <div class="theme {`theme__${theme.slug}`}">
    <div class="post-hero--inner">
      <div class="post-hero--content-wrapper wrapper--padded wrapper--padding">
        {#if form === 'header' && cta.url}
          <div class="post-hero--top-cta">
            <CallToAction cta={callToAction} />
          </div>
        {/if}
        {#if theme.eyebrow}
          <div class="post-hero--eyebrow {!banner ? 'post-hero--unibrow' : ''}">
            <Eyebrow {eyebrow} size={banner ? 'large' : 'small'} />
          </div>
        {/if}

        <svelte:element this={Header} class="post-hero--title type--h1"
          >{title}</svelte:element
        >
        <!-- Only include the description and lower CTA if this isn't being displayed as a header -->
        {#if form !== 'header'}
          <p class="post-hero--body type--h4">{description}</p>
          <div class="post-hero--cta">
            <CallToAction cta={callToAction} />
          </div>
        {/if}
      </div>
      {#if media?.image}
        <div class="post-hero--image-wrapper">
          <img src={media.image} alt={media.alt} class="post-hero--image" />
        </div>
      {/if}

      {#if theme.backgrounds}
        <div class="post-hero--background">
          <img
            loading="lazy"
            data-large
            aria-hidden="true"
            src={theme.backgrounds.large}
            alt=""
          />
          <img
            loading="lazy"
            data-small
            aria-hidden="true"
            src={theme.backgrounds.small}
            alt=""
          />
        </div>
      {/if}
    </div>
  </div>
</svelte:element>

<style lang="scss">
  $swap: 690px;

  .post-hero {
    $parent: #{&};

    container-type: inline-size;
    position: relative;
    width: 100%;

    &--title {
      text-wrap: balance;
    }

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
        right: 0;
        z-index: 0;
        height: 100%;
        width: 100%;
        margin-top: 0;

        img {
          position: absolute;
        }
      }

      // #{$parent}:has(#{$parent}--image-wrapper) & {
      // }

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

    &__io-2023 {
      --hero-theme-color: var(--black);
      --hero-theme-background: var(--yellow-500);
      --hero-theme-cta-background: transparent;
    }

    &__io-2024 {
      --io-black: rgb(32 33 36);
      --hero-theme-color: var(--io-black);
      --hero-theme-background: var(--white);
      border-bottom: 2px solid var(--io-black);

      @container (min-width: #{$swap}) {
        border-width: 1px;
      }

      :global([data-theme='dark']) & {
        // Specificity of the general override is higher than this, and I don't want to mix things, so I'm adding important here and only here.
        /* stylelint-disable declaration-no-important  */
        --hero-theme-color: var(--phosphor-white) !important;
        --hero-theme-background: var(--io-black) !important;
        /* stylelint-enable declaration-no-important  */
        border-color: var(--phosphor-white);
      }

      .post-hero--inner {
        min-height: 25vh;

        @container (min-width: #{$swap}) {
          padding-block-start: 2rem;
          padding-inline-end: 1rem;
        }
      }

      .post-hero--content-wrapper {
        @container (min-width: #{$swap}) {
          margin-block-start: -2rem;
        }
      }

      .post-hero--background {
        background-image: url('https://firebasestorage.googleapis.com/v0/b/cros-staging.appspot.com/o/themes%2Fio-2024%2Flight-small.svg?alt=media&token=15b3c69a-2633-447e-aad5-e346510d1315');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center bottom -2px;
        height: 45cqw;

        :global([data-theme='dark']) & {
          background-image: url('https://firebasestorage.googleapis.com/v0/b/cros-staging.appspot.com/o/themes%2Fio-2024%2Fdark-small.svg?alt=media&token=f95c8be7-26ae-4311-9197-dc5b08e3d5e8');
        }

        @container (min-width: #{$swap}) {
          background-image: url('https://firebasestorage.googleapis.com/v0/b/cros-staging.appspot.com/o/themes%2Fio-2024%2Flight-large.svg?alt=media&token=7c120b79-3420-44fa-9ed1-24c478a78311');
          background-size: auto calc(100% - 2rem);
          background-size: contain;
          background-position: bottom right;
          background-repeat: no-repeat;
          height: 100%;

          :global([data-theme='dark']) & {
            background-image: url('https://firebasestorage.googleapis.com/v0/b/cros-staging.appspot.com/o/themes%2Fio-2024%2Fdark-large.svg?alt=media&token=1309977e-5266-44e8-b5c1-11c79ac8c95e');
          }
        }

        img {
          display: none;
        }
      }
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

    :global([data-theme='dark']) & {
      --hero-theme-color: var(--white);
      --hero-theme-background: var(--phosphor-green);
    }
  }
</style>
