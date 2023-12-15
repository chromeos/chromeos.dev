<script context="module" lang="ts">
  export type CardProps = {
    title: string;
    body: string;
    eyebrow?: Eyebrow;
    position?: 'start' | 'end' | 'inline';
    cta?: CTA;
  };
</script>

<script lang="ts">
  import type { Eyebrow, CTA } from '$types/content';
  import EyebrowC from '$components/Eyebrow.svelte';
  import CTAC from '$components/CTA.svelte';
  import { nanoid } from 'nanoid';

  export let title: string;
  export let body: string;
  export let eyebrow: Eyebrow | false = false;
  export let position: 'start' | 'end' | 'inline' = 'start';
  export let cta: CTA = {
    type: 'link',
    direction: 'forward',
    url: '#',
    text: 'Learn more',
  };

  const id = nanoid(10);

  cta.type = 'link'; // Force CTA to be a link
  cta.direction = 'forward'; // Force CTA to be a forward arrow
</script>

<a href={cta.url} aria-labelledby="{id} {id}-body" class="card type--base">
  <article
    class="card--container {position === 'inline'
      ? 'card--container__inline'
      : ''}"
  >
    <header class="card--header">
      {#if eyebrow}
        <EyebrowC {eyebrow} size="small" />
      {/if}
      <h4 {id} class="type--h4 card--title">{title}</h4>
    </header>
    <p id="{id}-body" class="type--body card--body">{body}</p>
    <footer class="card--footer card--footer__{position}">
      <CTAC {cta} inline={true} />
    </footer>
  </article>
</a>

<style lang="scss">
  @import '$sass/shared';

  .card {
    $self: &;
    display: block;
    text-decoration: none;
    height: 100%;

    &--container {
      @include elevation(0);
      --block-padding: 1.5rem;
      background-color: var(--white);
      border-radius: var(--border-radius);
      display: flex;
      flex-flow: column;
      height: 100%;
      padding: 2.5rem;
      position: relative;
      width: 100%;
      z-index: 1;

      :global([data-theme='dark']) & {
        border-color: var(--phosphor-green);
      }

      #{$self}:focus &,
      &:hover {
        @include elevation(2);
      }

      &__inline {
        --block-padding: 0;
        display: grid;
        grid-template-columns: auto 2rem;
        column-gap: 0.5rem;
        row-gap: 0.5rem;
      }
    }

    &--title {
      color: var(--grey-850);
      margin-block-end: 0.5rem;
      margin-block-start: var(--block-padding);
      grid-column: 1;
      grid-row: 1;
    }

    &--body {
      color: var(--grey-750);
      margin-block-end: var(--block-padding);
      grid-column: 1;
      grid-row: 2;
    }

    &--footer {
      align-items: center;
      display: flex;
      margin-block-start: auto;
      grid-column: 2;
      grid-row: 1 / span 2;

      #{$self}--container__inline & {
        height: 100%;
      }

      &__end,
      &__start {
        :global(.cta__wrapper),
        :global(.cta),
        :global(.icon--wrapper) {
          display: flex;
          width: 100%;
          justify-content: var(--card-justification);
        }
      }

      &__end {
        --card-justification: flex-end;
      }

      &__start {
        --card-justification: flex-start;
      }
    }
  }
</style>
