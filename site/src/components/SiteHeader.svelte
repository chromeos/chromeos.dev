<script lang="ts">
  import type { Navigation } from '$types/sanity';
  import Logo from '$components/site-header/Logo.svelte';
  import NavItem from '$components/site-header/NavItem.svelte';
  import Search from '$components/Search.svelte';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';

  export let nav: Navigation;
  export let subscribe: { text: string; url: string; type: string };

  const lang = nav._langCode;
  let popover;
  let first;
  let last;
  let searchIcon;
  let searchActive = null;

  const active = writable(null);

  setContext('active', active);

  /**
   * Capture tab keypresses and loop focus
   * @param {Event} e - keydown event
   */
  function tabcapture(e) {
    const { code, target, shiftKey } = e;

    if (code === 'Tab') {
      if (target.isEqualNode(first) && shiftKey) {
        e.preventDefault();
        last.focus();
      }

      if (target.isEqualNode(last) && !shiftKey) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /**
   * Toggle search input visibility
   */
  function toggleSearch() {
    if (searchIcon.href.baseVal.endsWith('#search')) {
      searchIcon.href.baseVal = '/images/icons/sprite.svg#close';
      searchActive = true;
    } else {
      searchIcon.href.baseVal = '/images/icons/sprite.svg#search';
      searchActive = null;
    }
  }
</script>

<header class="header" data-active-search={searchActive}>
  <!-- Small screen menu toggle -->
  <button
    class="header--menu"
    aria-expanded="false"
    aria-haspopup="true"
    aria-label="Menu"
    on:click={() => popover.showModal()}
  >
    <svg role="img" aria-hidden="true" class="icon header__menu-icon">
      <use href="/images/icons/sprite.svg#menu" />
    </svg>
  </button>

  <!-- Logo -->
  <a href="/{lang}" class="header--home"><Logo /></a>

  <!-- Navigation -->
  <nav class="header--nav">
    <ul class="header--nav-items">
      {#if nav.items}
        {#each nav.items as item}
          <li>
            <NavItem {item} />
          </li>
        {/each}
      {/if}
    </ul>
  </nav>

  <!-- Search Field -->
  <div class="header--search">
    <button class="header--search-toggle" on:click={toggleSearch}>
      <svg role="img" aria-hidden="true" class="icon">
        <use bind:this={searchIcon} href="/images/icons/sprite.svg#search" />
      </svg>
    </button>
    <Search label="Search" locale={{ code: lang }} />
  </div>

  <!-- Subscribe link -->
  <a href={subscribe.url} class="cta cta--high header--subscribe"
    >{subscribe.text}</a
  >
</header>

<!-- Menu Popup -->
<dialog bind:this={popover} class="popover" on:keydown={tabcapture}>
  <div class="popover--home">
    <a bind:this={first} href="/{lang}"><Logo /></a>
    <button
      class="popover--close"
      aria-label="close"
      on:click={popover.close()}
    >
      <svg role="img" aria-hidden="true" class="icon">
        <use href="/images/icons/sprite.svg#close" />
      </svg>
    </button>
  </div>

  <nav>
    <ul class="popover--nav">
      {#if nav.items}
        {#each nav.items as item}
          <li class="popover--nav-item">
            <NavItem {item} />
          </li>
        {/each}
      {/if}
    </ul>
  </nav>

  <a
    bind:this={last}
    href={subscribe.url}
    class="cta cta--high popover--subscribe">{subscribe.text}</a
  >
</dialog>

<style lang="scss">
  @use 'sass:map';
  @import '$sass/shared';

  .header {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 50;
    background: var(--global-background);
    height: var(--header-height);
    width: 100%;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.1));

    padding-inline: 1.25rem;

    display: grid;
    gap: 1rem;

    align-items: center;

    grid-template-columns: 2rem 185px auto;

    @container style(--inline-header: 1) {
      grid-template-columns: 185px auto min-content 156px;
      padding-inline-end: 0;
    }

    :global([data-theme='dark']) & {
      border: 2px solid var(--phosphor-green);
    }

    &--subscribe,
    &--nav {
      display: none;

      @container style(--inline-header: 1) {
        display: block;
      }
    }

    &--menu,
    &--search-toggle {
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;
    }

    &--menu {
      @container style(--inline-header: 1) {
        display: none;
      }
    }

    &--nav {
      [data-active-search] & {
        display: none;
      }
    }

    &--nav-items {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      list-style: none;
      margin: 0;
    }

    &--subscribe {
      height: 100%;
      border-radius: 0;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      @container style(--inline-header: 1) {
        display: flex;
      }
    }

    &--search {
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      color: var(--phosphor-green);

      :global(.search) {
        display: none;
        background-color: var(--grey-100);
        padding-right: 2rem;
        width: 100%;
        color: var(--phosphor-green);
      }

      [data-active-search] & {
        :global(.search) {
          display: grid;
        }

        @container style(--inline-header: 1) {
          grid-column: 2 / span 2;
        }
      }
    }

    &--search-toggle {
      width: 2rem;
      margin-inline-start: auto;
      padding-inline-end: 0.25rem;

      [data-active-search] & {
        background-color: var(--grey-100);
      }

      :global(.icon) {
        color: var(--global-foreground);
      }
    }
  }

  .popover {
    width: 100%;
    max-width: 40ch;
    height: 100%;
    max-height: unset;
    border: 0;
    margin-inline: 0;
    padding: 0;
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
    background-color: var(--global-background);

    :global([data-theme='dark']) & {
      border: 2px solid var(--phosphor-green);
    }

    &:initial {
      transform: translateX(-100%);
    }

    &[open] {
      display: grid;
      grid-template-rows: var(--header-height) auto var(--header-height);
    }

    &::backdrop {
      background: rgba(map.get($google-colors, 'grey-900'), 0.9);
      backdrop-filter: blur(5px);
      // opacity: 0;
      transition: opacity 0.3s ease-in-out;

      &:initial {
        opacity: 0;
      }
    }

    &--home {
      display: grid;
      grid-template-columns: 185px auto 2rem;
      padding-inline: 1.25rem;
      border-bottom: 1px solid var(--grey-500);
      height: var(--header-height);
      align-items: center;

      :global([data-theme='dark']) & {
        border-bottom-color: var(--phosphor-green);
      }
    }

    &--nav {
      display: flex;
      flex-direction: column;
      list-style: none;
      margin-block-start: 0.375rem;
    }

    &--close {
      grid-column: 3;
      padding: 0;
      border: 0;
      background: 0;
      cursor: pointer;
    }

    &--subscribe {
      width: 100%;
      grid-row: 3;
      border-radius: 0;
    }
  }

  .icon {
    fill: var(--global-foreground);

    :global([data-theme='dark']) & {
      fill: var(--phosphor-green);
    }
  }

  li {
    position: static;
  }
</style>
