<script context="module" lang="ts">
  export type PaginationLabels = {
    title: string;
    next: string;
    previous: string;
    current: string;
    first: string;
    last: string;
    page: string;
  };
</script>

<script lang="ts">
  export let base = '';
  export let current = 0;
  export let total = 1;
  export let locale = 'en';
  export let labels = {
    title: 'Pagination',
    previous: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    current: 'Current',
    page: 'Page',
  } as PaginationLabels;
  export let pager: 'page' | 'query' = 'page';

  const pages = [];
  const formatter = new Intl.NumberFormat(locale, {
    style: 'decimal',
  });

  const c = Number(current);
  const t = Number(total);

  const s = pager === 'page' ? '/' : '';

  if ((c !== 0 && pager === 'page') || (c !== 1 && pager === 'query')) {
    pages.push(
      {
        label: labels.first,
        text: '«',
        url: `${base}${pager === 'query' ? 1 : ''}`,
      },
      {
        label: labels.previous,
        text: '‹',
        url: `${base}${c - 1 > 0 ? s + (c - 1) : pager === 'query' ? 1 : ''}`,
      },
    );
  }

  for (let i = 0; i < t; i++) {
    pages.push({
      text: formatter.format(i + 1),
      url: `${base}${i > 0 ? s + (i + 1) : pager === 'query' ? 1 : ''}`,
      current: i + 1 === c || (c === 0 && i === 0),
    });
  }

  if (c !== t) {
    pages.push(
      {
        label: labels.next,
        text: '›',
        url: `${base}${s}${c + 1}`,
      },
      {
        label: labels.last,
        text: '»',
        url: `${base}${s}${t}`,
      },
    );
  }
</script>

{#if t > 1}
  <nav class="pagination" aria-label={labels.title}>
    <ul class="pagination--pages">
      {#each pages as page}
        <li class="pagination--page">
          <a
            href={page.url}
            class="pagination--link"
            aria-label={page.current ? labels.current : null}
            title={page.label || null}>{page.text}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<style lang="scss">
  .pagination {
    &--pages {
      list-style: none;
      display: flex;
      justify-content: center;
      gap: 1rem;
      align-items: center;
    }
    &--link {
      color: var(--black);
      text-decoration: none;
      &[aria-label] {
        text-decoration: underline;
      }
    }
  }
</style>
