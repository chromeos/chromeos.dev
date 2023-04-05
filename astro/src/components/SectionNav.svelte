<script lang="ts">
  interface Link {
    title: string;
    href: string;
  }

  export let title: string;
  export let links: Array<Link>;
  export let active: string;

  const buttonTitle = 'Open section navigation';

  let expanded = false;
</script>

<nav
  class="section-nav"
  aria-labelledby="section-nav--title"
  data-expanded={expanded}
>
  <div class="section-nav--header">
    <div class="section-nav--text">
      <p id="section-nav--title" class="section-nav--title type--h5">{title}</p>
      <svg role="img" aria-hidden="true" class="icon section-nav--expand">
        <use href="/images/icons/sprite.svg#expand-more" />
      </svg>
    </div>
    <button
      class="section-nav--toggle"
      title={buttonTitle}
      on:click|preventDefault={() => (expanded = !expanded)}
    />
  </div>
  <div class="section-nav--body">
    <ul>
      {#each links as link}
        <li class="section-nav--item">
          <a
            href={link.href}
            data-active={active === link.href ? true : null}
            class="section-nav--link type--secondary-nav">{link.title}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style lang="scss">
  @use 'sass:math';

  $inline: 1.75rem;
  $block: 1rem;

  .section-nav {
    $this: &;

    --inline: 1.75rem;

    @container style(--inline-subnav: 0) {
      --inline: 2.5rem;
      position: sticky;
      top: var(--header-offset);
      max-height: calc(100vh - var(--header-offset));
      overflow-y: auto;
    }

    &--text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-transform: capitalize;
    }

    &--header {
      display: grid;
      background-color: var(--blue-50);

      @container style(--inline-subnav: 0) {
        background-color: transparent;
      }
    }
    &--text,
    &--toggle {
      grid-column: 1;
      grid-row: 1;
      padding-inline: var(--inline);
      padding-block: $block;
    }

    &--text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &--expand {
      position: relative;
      z-index: 0;
      transform: scale(0.75);
      [data-expanded='true'] & {
        transform: rotate(180deg) scale(0.75);
      }

      @container style(--inline-subnav: 0) {
        display: none;
      }
    }

    &--toggle {
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      position: relative;
      z-index: 2;
      @container style(--inline-subnav: 0) {
        display: none;
      }
    }

    &--body {
      display: none;

      @container style(--inline-subnav: 0) {
        display: block;
      }

      [data-expanded='true'] & {
        display: block;
      }
    }

    &--link {
      display: block;
      padding-inline: var(--inline);
      padding-block: math.div($block, 3) * 2;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: var(--bkg, transparent);
        z-index: -1;
        border-start-end-radius: 1.25rem;
        border-end-end-radius: 1.25rem;
      }

      &[data-active] {
        --bkg: var(--blue-50);
      }
    }
  }
</style>
