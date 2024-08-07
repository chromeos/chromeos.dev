<script context="module" lang="ts">
  export type Stat = {
    stat: string;
    description: string;
    footnote?: number;
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
        <dd class="stat--desc type--base">
          {stat.description}{#if stat.footnote}<sup>
              <a href={`#fn-${stat.footnote}`} id={`fnref-${stat.footnote}`}
                >[{stat.footnote}]</a
              >
            </sup>{/if}
        </dd>
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

      :global([data-theme='dark']) & {
        color: var(--phosphor-gray);
        text-shadow:
          1px 1px var(--phosphor-green),
          -1px -1px var(--phosphor-green),
          1px -1px var(--phosphor-green),
          -1px 1px var(--phosphor-green);
      }
    }

    &--desc {
      max-width: 20rem;
      flex-grow: 1;
      color: var(--grey-750);

      :global([data-theme='dark']) & {
        text-shadow:
          1px 1px var(--phosphor-gray),
          -1px -1px var(--phosphor-gray),
          1px -1px var(--phosphor-gray),
          -1px 1px var(--phosphor-gray);
      }
    }

    &__semicircle::after {
      $circle-l: 65;
      background-color: var(--primary-yellow);
      clip-path: circle(math.div($circle-l, 16) * 1rem at bottom);
      // border-radius: 100% 100% 0 0;
      height: math.div($circle-l, 16) * 1rem;
      top: 100%;
      transform: translate(-50%, -10%) rotate(210deg) scale(0.95);
      transform-origin: top center;
      width: math.div($circle-l, 8) * 1rem;
    }

    &__circle::after {
      $circle-s: 42.5;
      background-color: var(--primary-blue);
      border-radius: 50%;
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
      transform: translate(-50%, -25%) rotate(-15deg) scale(0.9);
      transform-origin: bottom right;
      width: $size;

      :global([data-theme='dark']) & {
        --shape-color: var(--red-650);
      }
    }
  }
</style>
