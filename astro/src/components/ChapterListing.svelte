<script lang="ts">
  import Card from '$components/Card.svelte';

  export let microcopy: any;
  export let chapters: Array<any> = [];

  chapters = chapters.map((chapter) => ({
    title: chapter.title,
    body: chapter.meta.metadesc,
    cta: {
      type: 'link',
      direction: 'forward',
      url: chapter.href,
      text: '',
    },
  }));
</script>

<section class="chapters">
  <h3 class="type--h1 chapters--title">
    {microcopy.microcopy.landing.chapters}
  </h3>
  <div class="chapters--list">
    {#each chapters as chapter}
      <Card
        title={chapter.title}
        body={chapter.body}
        cta={chapter.cta}
        position="end"
      />
    {/each}
  </div>
</section>

<style lang="scss">
  .chapters {
    margin-block-start: 2.5rem;
    padding-block-start: 2.5rem;
    border-block-start: 1px solid var(--grey-300);

    &--title {
      text-align: center;
    }

    &--list {
      list-style: none;
      display: grid;
      margin: 0;
      gap: 2.5rem 1.5rem;
      margin-block-start: 2.5rem;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 18.75rem), 1fr));
    }
  }
</style>
