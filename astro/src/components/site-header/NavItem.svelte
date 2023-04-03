<script>
  import { getContext } from 'svelte';
  export let item;

  const lang = getContext('lang');
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
        <a href="/{lang}/{section.url}" class="type--primary-nav">
          {section.title}
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <a href="/{lang}/{item.url}" class="type--primary-nav">{item.title}</a>
{/if}

<style lang="scss">
  .toggle {
    border: 0;
    background: none;
    position: relative;
    cursor: pointer;

    &--icon {
      fill: var(--grey-700);
      pointer-events: none;
    }

    &[aria-expanded='true'] {
      &::after,
      &::before {
        border-color: transparent transparent
          var(--triangle-color, var(--white));
        border-style: solid;
        border-width: var(--size, 8px);
        content: '';
        display: block;
        height: 0;
        left: calc(50% - var(--size, 8px));
        position: absolute;
        bottom: calc(-100% + 6px);
        width: 0;
        z-index: 102;
      }

      &::before {
        --triangle-color: var(--grey-300);
        --size: 10px;
        bottom: calc(-100% + 7px);
      }

      & .toggle--icon {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    width: 100vw;
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
    &[hidden] {
      display: none;
    }
  }
</style>
