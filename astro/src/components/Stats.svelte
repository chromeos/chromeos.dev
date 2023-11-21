<script context="module" lang="ts">
  export type Stat = {
    stat: string;
    description: string;
  };
</script>

<script lang="ts">
  export let stats: Stat[];

  const shapes = ['semicircle', 'triangle', 'circle'];
</script>

<figure>
  <dl class="stats">
    {#each stats as stat, i}
      <div class="stat">
        <dt class="stat--stat stat__{shapes[i]}"><span>{stat.stat}</span></dt>
        <dd class="stat--desc type--base">{stat.description}</dd>
      </div>
    {/each}
  </dl>
</figure>

<style lang="scss">
  @use 'sass:math';

  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 4rem 1.25rem;
    justify-content: space-evenly;
    list-style: none;
  }

  .stat {
    display: flex;
    align-items: center;
    flex: 1 0 20ch;
    flex-direction: column;
    justify-content: center;
    max-width: 30rem;
    text-align: center;

    &--stat {
      color: var(--grey-1000);
      line-height: 1.145;
      font-size: clamp(3em, 5.55vw, 5em);
      font-weight: 500;
      letter-spacing: -0.01em;
      position: relative;
      text-align: center;

      &::after {
        content: '';
        display: block;
        left: 0;
        position: absolute;
        z-index: -1;
      }
    }

    &--desc {
      max-width: 20rem;
      flex-grow: 1;
      color: var(--grey-750);
    }

    &__semicircle::after {
      $circle-l: 65;
      --shape-color: var(--primary-yellow);
      #{'--circle-radius'}: $circle-l;
      #{'--circle-offset'}: $circle-l;
      background-image: paint(circles);
      height: math.div($circle-l, 16) * 1rem;
      top: 100%;
      transform: translate(-50%, -0%) rotate(210deg);
      transform-origin: top center;
      width: math.div($circle-l, 8) * 1rem;
    }

    &__circle::after {
      $circle-s: 42.5;
      --shape-color: var(--primary-blue);
      #{'--circle-radius'}: $circle-s;
      #{'--circle-offset'}: $circle-s;
      background-image: paint(circles);
      bottom: 0;
      height: math.div($circle-s, 8) * 1rem;
      transform: translateX(-50%);
      width: math.div($circle-s, 8) * 1rem;
    }

    &__triangle::after {
      $size: 6.25rem;
      --shape-color: var(--primary-green);
      background-image: linear-gradient(
        to bottom left,
        var(--shape-color),
        var(--shape-color) 50%,
        transparent 50%,
        transparent
      );
      height: $size;
      top: 0;
      transform: translate(-50%, -25%) rotate(-15deg);
      transform-origin: bottom right;
      width: $size;
    }
  }
</style>
