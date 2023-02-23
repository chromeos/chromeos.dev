<script lang="ts">
  import type { Eyebrow, CTA } from '$types/content';
  import EyebrowC from '$components/Eyebrow.svelte';
  import CTAC from '$components/CTA.svelte';
  import { nanoid } from 'nanoid';

  export let title: string;
  export let body: string;
  export let eyebrow: Eyebrow = {
    text: 'Eyebrow',
    icon: '#',
  };
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
  <article class="container">
    <header class="header">
      <EyebrowC {eyebrow} size="small" />
      <h4 {id} class="type--h4 title">{title}</h4>
    </header>
    <p id="{id}-body" class="type--body body">{body}</p>
    <footer class="footer">
      <CTAC {cta} />
    </footer>
  </article>
</a>

<style lang="scss">
  .card {
    color: inherit;
    text-decoration: none;
  }

  .container {
    background: var(--white);
    border-radius: 0.625rem;
    border: 1px solid var(--grey-300);
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    width: 100%;

    &:hover {
      box-shadow: 0 1px 2px var(--grey-800), 0 2px 6px 2px var(--grey-800);
    }
  }
</style>
