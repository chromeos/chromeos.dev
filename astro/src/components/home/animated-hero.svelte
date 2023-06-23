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

  // console.log('Init');

  type Animation = 'home' | 'phosphor';

  export let hero: Hero;

  const { heading, copy } = hero;

  // Transparent placeholder image 1px gif to prevent layout shift
  let img =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

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
        animationData = a;
      } else if (animation === 'phosphor') {
        const { animationData: a } = await import('$js/animations/phosphor');
        animationData = a;
      }
    });
  }

  /**
   * Wait for the component to mount before loading Lottie
   */
  onMount(async () => {
    console.log('Mounted');
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
      <img
        src={img}
        bind:this={fallback}
        class="animated-hero--fallback"
        alt=""
        height="500"
        width="500"
      />
    </div>
  </div>
</header>

<style lang="scss">
  .animated-hero {
    // This needs to be based on height/width dimensions because a static 3rem doesn't make sense
    padding-block-start: 3rem;
    text-align: center;
    color: var(--white);
    min-height: 100vh;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    [class^='type'] {
      color: inherit;
    }

    &--text {
      max-width: 50ch;
    }

    &--title {
      margin-block-end: 1rem;
    }

    &--accent {
      color: var(--tertiary-blue);
    }

    &--animation {
      width: 100%;
    }

    &--fallback {
      aspect-ratio: 1 / 1;
      width: 100%;
    }
  }
</style>
