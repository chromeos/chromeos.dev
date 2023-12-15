<script lang="ts">
  import { findRelated } from '$lib/related';
  import Card from '$components/Card.svelte';

  export let title: string;
  export let language: string;
  export let url: string;
  export let header: string;

  const related = findRelated(title, language, url);
</script>

<aside
  class="wrapper wrapper--padding wrapper--padded wrapper--full-bleed wrapper__contained wrapper__background"
>
  <h3 class="rec-title type--h1">{header}</h3>
  <div class="recs">
    {#each related as item}
      <Card
        title={item.title}
        body={item.metadesc}
        position="end"
        cta={{
          text: '',
          url: item.href,
          type: 'link',
          direction: 'forward',
        }}
      />
    {/each}
  </div>
</aside>

<style lang="scss">
  .rec-title {
    margin-block: 0;
    margin-inline: auto;
    max-width: 30ch;
    text-align: center;
  }

  .recs {
    grid-template-columns: repeat(auto-fit, minmax(min(18.75rem, 100%), 1fr));
    display: grid;
    gap: 1.5rem 1.5rem;
    margin-block: 2.5rem;
  }
</style>
