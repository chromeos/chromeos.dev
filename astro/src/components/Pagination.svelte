<script>
  export let base = '';
  export let current = 0;
  export let total = 1;
  export let locale = 'en';
  export let labels = {
    label: 'Pagination',
    prev: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    current: 'Current',
  };

  const pages = [];
  const formatter = new Intl.NumberFormat(locale, {
    style: 'decimal',
  });

  const c = Number(current);
  const t = Number(total);

  if (c !== 0) {
    pages.push(
      {
        label: labels.first,
        text: '«',
        url: `${base}`,
      },
      {
        label: labels.prev,
        text: '‹',
        url: `${base}${c - 1 > 0 ? '/' + (c - 1) : ''}`,
      },
    );
  }

  for (let i = 0; i < t; i++) {
    pages.push({
      text: formatter.format(i + 1),
      url: `${base}${i > 0 ? '/' + (i + 1) : ''}`,
      current: i + 1 === c || (c === 0 && i === 0),
    });
  }

  if (c !== t) {
    pages.push(
      {
        label: labels.next,
        text: '›',
        url: `${base}/${c + 1}`,
      },
      {
        label: labels.last,
        text: '»',
        url: `${base}/${t}`,
      },
    );
  }
</script>

{#if t > 1}
  <nav class="pagination" aria-label={labels.label}>
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
