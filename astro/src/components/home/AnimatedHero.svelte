<script lang="ts">
  import { theme } from '$js/theme';
  import { animationPlaceholders } from '$js/constants';
  import { onMount } from 'svelte';

  type Hero = {
    heading: {
      default: string;
      accent: string;
    };
    copy: string;
  };

  type Animation = 'home' | 'phosphor';

  export let hero: Hero;

  const { heading, copy } = hero;

  // Start with light mode image and render an actual image
  let img = animationPlaceholders.light;

  let loadLottie = false;
  let lottie;
  let animationData;
  let animation: Animation = 'home';
  let holder;
  let fallback;
  let current;

  // Watch for changes in the theme, and update the animation and fallback image appropriately
  $: {
    if ($theme) {
      // console.log('Image swap');
      if ($theme === 'dark') {
        animation = 'phosphor';
        img = animationPlaceholders.dark;
      } else {
        animation = 'home';
        img = animationPlaceholders.light;
      }
    }
  }

  // Watch for changes to the animation or loading state
  $: {
    if (loadLottie) {
      loadAnimation(animation);
    }
  }

  // Watch for changes to lottie or the animation data
  $: {
    if (lottie && animationData && holder) {
      const config = {
        container: holder,
        animType: 'svg',
        loop: true,
        animationData,
        autoplay: true,
        name: 'Hero',
        renderSettings: {
          progressiveLoad: true,
        },
      };

      if (current && Object.keys(current).length) {
        current.destroy();
      }

      current = lottie.loadAnimation(config);
      current.hide();
      current.addEventListener('DOMLoaded', () => {
        if (current.isLoaded) {
          if (fallback) {
            fallback.remove();
          }
          current.show();
          current.play();
        }
      });
    }
  }

  /**
   * Load the appropriate animation
   * @param {Animations} animation
   */
  function loadAnimation(animation: Animation) {
    // Wait for idle to load animation
    requestIdleCallback(async () => {
      // Load Lottie if it isn't loaded already
      if (!lottie) {
        const { default: l } = await import(
          'lottie-web/build/player/lottie_svg.min.js'
        );
        lottie = l;
      }

      // Load the appropriate animation
      if (animation === 'home') {
        const { animationData: a } = await import('$js/animations/home');
        requestIdleCallback(() => {
          animationData = a;
        });
      } else if (animation === 'phosphor') {
        const { animationData: a } = await import('$js/animations/phosphor');
        requestIdleCallback(() => {
          animationData = a;
        });
      }
    });
  }

  /**
   * Wait for the component to mount before loading Lottie
   */
  onMount(async () => {
    // Load the polyfill if requestIdleCallback isn't supported
    if (!('requestIdleCallback' in window)) {
      import('requestidlecallback');
    }

    // Kick off the animation loading
    requestIdleCallback(() => {
      loadLottie = true;
    });
  });
</script>

<header
  class="wrapper wrapper--full-bleed wrapper--bottom-bleed wrapper--no-bottom wrapper--no-top wrapper--padded wrapper__contained wrapper__background--blue"
>
  <div class="animated-hero">
    <div class="animated-hero--text">
      <h1 class="type--mega animated-hero--title">
        <span>{heading.default}</span>
        <span class="animated-hero--accent">{heading.accent}</span>
      </h1>
      <h2 class="type--large">{copy}</h2>
    </div>

    <div aria-hidden="true" bind:this={holder} class="animated-hero--animation">
      {#if $theme}
        <img
          src={img}
          bind:this={fallback}
          class="animated-hero--fallback"
          alt=""
          height="500"
          width="500"
        />
      {:else}
        <!-- Significantly improves LCP -->
        <img
          src={animationPlaceholders.light}
          class="animated-hero--fallback"
          data-theme="light"
          alt=""
          height="500"
          width="500"
        />
        <img
          src={animationPlaceholders.dark}
          class="animated-hero--fallback"
          data-theme="dark"
          alt=""
          height="500"
          width="500"
        />
      {/if}
    </div>
  </div>
</header>

<style lang="scss">
  .animated-hero {
    // This needs to be based on height/width dimensions because a static 3rem doesn't make sense
    padding-block-start: 3rem;
    color: var(--white);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 1440px;
    margin-inline: auto;

    @media (min-width: 700px) {
      flex-wrap: nowrap;
      column-gap: 2.5rem;
      padding-block: 0rem;
    }

    [class^='type'] {
      color: inherit;

      :global([data-theme='dark']) & {
        color: var(--phosphor-green);
      }
    }

    &--text {
      text-align: center;
      max-width: 50ch;

      @media (min-width: 700px) {
        text-align: left;
        // margin-inline-start: clamp(0vw, 7vw, 7.5rem);
      }
    }

    &--title {
      margin-block-end: 1rem;
      text-wrap: balance;
    }

    &--accent {
      color: var(--tertiary-blue);
    }

    &--animation,
    &--fallback {
      width: 100%;
      aspect-ratio: 1 / 1;
      min-width: 40%;
    }

    &--fallback {
      display: none;

      :global([data-theme='dark']) &[data-theme='dark'] {
        display: block;
      }

      :global([data-theme='light']) &[data-theme='light'] {
        display: block;
      }
    }

    &--animation {
      transform: scale(1.25);
    }
  }
</style>
