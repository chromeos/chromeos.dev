<script lang="ts">
  import type { Locale } from '$types/content';
  export let locale: Locale;
  export let label;
</script>

<form action={`/${locale.code}/search`} class="search">
  <input
    class="search--input"
    type="search"
    name="q"
    aria-label={label}
    placeholder={label}
  />
  <input type="hidden" name="page" value="1" />
  <button aria-label={label} class="search--button">
    <svg role="img" aria-hidden="true" class="icon">
      <use href="/images/icons/sprite.svg#search" />
    </svg>
  </button>
</form>

<style lang="scss">
  .search {
    display: grid;
    grid-template-columns: 1.5rem auto;
    grid-auto-flow: dense;
    gap: 0.5rem;
    background: var(--white);
    padding: 0.5rem;
    width: 100%;
    // max-width: 50ch;

    &--input {
      grid-column: 2;
      background: none;
      border: 0;
      color: var(--global-foreground);

      :global([data-theme='dark']) & {
        padding: 0.5rem;
        border: 2px solid var(--phosphor-green);
      }
    }

    &--button {
      padding: 0;
      border: 0;
      background: none;
    }

    .icon {
      fill: var(--global-foreground);

      :global([data-theme='dark']) & {
        fill: var(--phosphor-green);
      }
    }
  }
</style>
