<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$components/Card.svelte';
  import Pagination from '$components/Pagination.svelte';
  import { writable } from 'svelte/store';

  export let resultsString = '';
  export let locale;
  export let pagination;

  const pagefind = writable();
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
    if ($pagefind?.search) {
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
    // Set up search function
    search = async function search() {
      const params = new URLSearchParams(window.location.search);
      q = params.get('q');
      page = Number(params.get('page'));
      const { results: r } = await $pagefind.search(q);
      pages = Math.ceil(r.length / pager);
      const start = (page - 1) * pager;
      const end = start + pager;
      results = await Promise.all(r.slice(start, end).map((r) => r.data()));
      rString = resultsString.replace('((d))', r.length).replace('((q))', q);
    };

    // Try and set Pagefind from the window object
    pagefind.set(window.pagefind);

    // If it's not there, wait for the SearchResults component to emit it
    if (!$pagefind?.search) {
      const SearchResults = document.getElementById('SearchResults');
      SearchResults.addEventListener('SearchReady', () => {
        pagefind.set(window.pagefind);
      });
    }
  });
</script>

{#if results}
  <h2>{rString}</h2>
  {#each results as result}
    <Card
      title={result.meta.title}
      body={result.meta.description}
      position="inline"
      cta={{
        text: '',
        url: result.url,
      }}
    />
  {/each}
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
  <h1>Error</h1>
{:else}
  <h1>Loading</h1>
{/if}
