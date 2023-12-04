<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$components/Card.svelte';
  import Pagination from '$components/Pagination.svelte';

  export let resultsString = '';
  export let locale;
  export let pagination;

  let pagefind = {};
  let q = '';
  let page = 1;
  let pages;
  let results;

  const pager = 15;
  let rString = '';
  let error;
  let search;
  let counter = 3;

  $: {
    // If pagefind is set, search
    if (pagefind?.search && search) {
      search();
    } else {
      // If it's not set, keep waiting for 3 seconds, then error
      const interval = setInterval(() => {
        if (counter === 0) {
          clearInterval(interval);
          error = true;
        }
        counter--;
      }, 1000);
    }
  }

  onMount(async () => {
    // Get params
    const params = new URLSearchParams(window.location.search);
    q = params.get('q');
    page = Number(params.get('page')) || 1;

    // Set up search function
    search = async function search() {
      const { results: r } = await pagefind.search(q);
      pages = Math.ceil(r.length / pager);
      const start = (page - 1) * pager;
      const end = start + pager;
      results = await Promise.all(r.slice(start, end).map((r) => r.data()));
      rString = resultsString.replace('((d))', r.length).replace('((q))', q);
    };

    // Set up Pagefind
    const pf = await import('$generated/pagefind.js');

    // Point Pagefind to public files and initialize
    await pf.options({
      basePath: '/pagefind/',
    });

    pf.init();

    pagefind = pf;
  });
</script>

<div class="results">
  {#if q}
    {#if results}
      <h2 class="type--h3 results--header">{rString}</h2>
      <ul class="results--list">
        {#each results as result}
          <li>
            <Card
              title={result.meta?.title}
              body={result.meta?.description}
              position="inline"
              cta={{
                text: '',
                url: result.url,
                direction: 'forward',
                type: 'link',
              }}
            />
          </li>
        {/each}
      </ul>

      {#if pages > 1}
        <Pagination
          base={`/${locale.code}/search?q=${q}&page=`}
          current={page}
          total={pages}
          locale={locale.code}
          labels={pagination}
          pager="query"
        />
      {/if}
    {:else if error}
      <h2 class="type--h3 results--header">Error</h2>
    {:else}
      <h2 class="type--h3 results--header">Loading</h2>
    {/if}
  {/if}
</div>

<style lang="scss">
  .results {
    max-width: 80ch;
    margin-inline: auto;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    margin-block-start: 2rem;

    &--header {
      text-align: center;
    }

    &--list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>
