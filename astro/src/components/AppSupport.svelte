<script lang="ts">
  import type { AppSupport } from '$types/sanity';
  import { appSupport } from '$$sanity';
  import CTA from '$components/CTA.svelte';

  export let lang: string;

  const support = appSupport[lang] as AppSupport;

  const text = support.description[0].children[0].text;

  const cta = {
    text: support.cta.title,
    url: support.cta.url,
    type: 'medium',
  };
</script>

<aside class="app-support">
  <h2 class="type--h3">{support.title}</h2>

  <div class="type">
    <p>{text}</p>
  </div>
  <CTA {cta} />
</aside>

<style lang="scss">
  .app-support {
    max-width: 60ch;
    margin-inline: auto;
    background-color: var(--grey-50);
    border-radius: 0.625rem;
    padding: 2rem;
    padding-block-end: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .type {
      color: var(--grey-700);
    }
  }
</style>
