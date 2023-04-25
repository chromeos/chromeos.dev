<script lang="ts">
  import type { Eyebrow, CTA } from '$types/content';
  import EyebrowC from '$components/Eyebrow.svelte';
  import CTAC from '$components/CTA.svelte';
  import { nanoid } from 'nanoid';

  export let title: string;
  export let body: string;
  export let eyebrow: Eyebrow | null;
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
  <article class="card--container">
    <header class="card--header">
      {#if eyebrow}
        <EyebrowC {eyebrow} size="small" />
      {/if}
      <h4 {id} class="type--h4 card--title">{title}</h4>
    </header>
    <p id="{id}-body" class="type--body card--body">{body}</p>
    <footer class="card--footer {cta.text === '' ? 'card--end' : ''}">
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

    &--container {
      @include elevation(0);
      background-color: var(--white);
      border-radius: var(--border-radius);
      display: flex;
      flex-flow: column;
      height: 100%;
      padding: 2.5rem;
      position: relative;
      width: 100%;
      z-index: 1;

      #{$self}:focus &,
      &:hover {
        @include elevation(2);
      }
    }

    &--title {
      color: var(--grey-850);
      margin-block-end: 0.5rem;

      &:not(:first-child) {
        margin-block-start: 1.5rem;
      }
    }

    &--body {
      color: var(--grey-750);
      margin-block-end: 1.5rem;
    }

    &--footer {
      align-items: center;
      display: flex;
      margin-block-start: auto;
    }

    &--end {
      justify-content: flex-end;
    }
  }
</style>
