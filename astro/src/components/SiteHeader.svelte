<script>
  import Logo from '$components/site-header/Logo.svelte';
  import NavItem from '$components/site-header/NavItem.svelte';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let lang;
  export let nav;

  const subscribe = {
    text: 'Subscribe',
    url: `/${lang}/subscribe`,
    type: 'high',
  };

  const active = writable(null);

  setContext('lang', lang);
  setContext('active', active);
</script>

<header class="header">
  <a href="/{lang}" class="header--home"><Logo /></a>
  <nav class="header--nav">
    <ul class="header--nav-items">
      {#if nav}
        {#each nav as item}
          <li>
            <NavItem {item} />
          </li>
        {/each}
      {/if}
    </ul>
  </nav>
  <button>
    <svg role="img" aria-hidden="true" class="icon">
      <use href="/images/icons/sprite.svg#search" />
    </svg>
  </button>
  <a href={subscribe.url} class="cta cta--high header--subscribe"
    >{subscribe.text}</a
  >
</header>

<style lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    background: white;
    height: var(--header-height);
    width: 100%;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.1));

    padding-inline: 1.25rem;

    padding-inline-end: 0;

    display: grid;
    gap: 1rem;
    grid-template-columns: 185px auto min-content 156px;
    align-items: center;

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
    }
  }

  li {
    position: static;
  }
</style>
