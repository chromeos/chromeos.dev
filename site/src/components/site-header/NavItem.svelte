<script>
  import { getContext } from 'svelte';
  export let item;

  const active = getContext('active');

  const id = `nav-${item.title.toLowerCase().replace(/ /g, '-')}`;
  $: expanded = $active === item.title;
</script>

{#if item.sections}
  <button
    class="type--primary-nav toggle"
    aria-expanded={expanded}
    aria-haspopup="true"
    aria-controls="{id}-menu"
    {id}
    on:click|preventDefault={() =>
      active.set($active === item.title ? null : item.title)}
  >
    {item.title}
    <svg role="img" aria-hidden="true" class="icon toggle--icon">
      <use href="/images/icons/sprite.svg#expand-more" />
    </svg>
  </button>
  <ul
    class="dropdown"
    aria-labelledby={id}
    hidden={expanded === false ? true : null}
    id="{id}-menu"
  >
    {#each item.sections as section}
      <li>
        <a href={section.url} class="type--primary-nav">
          {section.title}
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <a href={item.url} class="type--primary-nav">{item.title}</a>
{/if}

<style lang="scss">
  .toggle {
    border: 0;
    background: none;
    position: relative;
    cursor: pointer;
    margin: 0;
    padding: 0;
    text-align: left;
    display: flex;

    @container style(--inline-header: 1) {
      text-align: center;
    }

    &--icon {
      fill: var(--grey-700);
      pointer-events: none;
      margin-inline-start: auto;
      justify-self: flex-end;
    }

    &[aria-expanded='true'] {
      @container style(--inline-header: 1) {
        &::after,
        &::before {
          border-color: transparent transparent
            var(--triangle-color, var(--white));
          border-style: solid;
          border-width: var(--size, 8px);
          content: '';
          display: block;
          height: 0;
          left: calc(50% - var(--size, 7.5px));
          position: absolute;
          bottom: calc(-100% + 2px);
          width: 0;
          z-index: 102;

          :global([data-theme='dark']) & {
            bottom: calc(-100% + 4px);
          }
        }

        &::before {
          --triangle-color: var(--grey-300);
          --size: 10px;
          bottom: calc(-100% + 2.5px);

          :global([data-theme='dark']) & {
            --size: 12px;
            bottom: calc(-100% + 4px);
            --triangle-color: var(--phosphor-green);
          }
        }
      }

      & .toggle--icon {
        transform: rotate(180deg);
      }
    }
  }

  .type--primary-nav {
    width: 100%;
    padding: 0.875rem 1.25rem;
    display: flex;

    @container style(--inline-header: 1) {
      padding: 0;
    }

    .dropdown & {
      width: calc(100% - 0.875rem * 2);
      margin-inline-start: 0.875rem;

      @container style(--inline-header: 1) {
        width: auto;
        margin-inline-start: 0;
      }
    }
  }

  .dropdown {
    @container style(--inline-header: 1) {
      position: absolute;
      width: calc(100% + 4px);
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
      padding-inline: 1rem;
      gap: 1rem;
      left: 0;
      align-items: center;
      justify-content: center;
      top: var(--header-height);
      height: var(--header-height);
      background: var(--white);
      border-top: 2px solid var(--grey-300);
      // transform: translateY(-4px);

      :global([data-theme='dark']) & {
        border: 2px solid var(--phosphor-green);
        transform: translateY(-4px);
        left: -2px;
      }
    }
    &[hidden] {
      display: none;
    }
  }
</style>
