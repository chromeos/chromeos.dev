<script lang="ts">
  import { onMount } from 'svelte';
  import { state } from '$js/state/reinforcement';

  export let tutorial: string;
  export let task: string;

  const base = tutorial + '.' + task;
  let checked = {};
  let clean: boolean = true;
  let confetti;
  let canvas;
  let anchor;
  let active: boolean = false;
  let visible: boolean = false;
  let fired: boolean = false;

  let done: boolean = false;

  $: {
    if ('localStorage' in window && !clean) {
      localStorage.setItem(base, JSON.stringify($state[base]));
    }

    if ($state[base]) {
      done = !Object.values($state[base]).includes(false);
    }

    if (done && canvas?.confetti && visible && !fired) {
      tada();
      fired = true;
    }
  }

  $: {
    if (done === false) {
      fired = false;
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      visible = entry.isIntersecting;
    });
  });

  const count = 200;
  const defaults = {
    origin: { y: 0.97, x: 0.5 },
    colors: [
      '#34a853',
      '#34a853',
      '#fcc934',
      '#fbbc04',
      '#d93025',
      '#ea4335',
      '#1a73e8',
    ],
  };

  /**
   * Fire confetti!
   * @param {number} particleRatio
   * @param {object} opts
   * @return {Promise<Confetti>}
   */
  function fire(particleRatio: number, opts) {
    return canvas.confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  /**
   * Celebrate with some confetti
   */
  async function tada() {
    active = true;

    const all = [
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      }),
      fire(0.2, {
        spread: 60,
      }),
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      }),
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      }),
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      }),
    ];

    await Promise.all(all);
    active = false;
  }

  onMount(async () => {
    if ('localStorage' in window) {
      try {
        checked = JSON.parse(localStorage.getItem(base)) || {};
      } catch {
        console.log("No localStorage, won't save progress");
      }
    }
    clean = false;

    state.set(
      Object.assign($state, {
        [base]: checked,
      }),
    );

    confetti = (await import('canvas-confetti')).default;
    console.log(confetti);
    canvas.confetti =
      canvas.confetti ||
      confetti.create(canvas, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: true,
      });

    observer.observe(anchor);
  });
</script>

<div class="anchor" bind:this={anchor}></div>
<canvas data-active={active || null} bind:this={canvas}></canvas>

<style lang="scss">
  canvas {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    transform: translateX(-25%) translateY(2rem);
    height: 200vh;
    z-index: -1;
  }

  [data-active] {
    z-index: 1000;
  }
</style>
