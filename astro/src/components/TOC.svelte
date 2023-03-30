<script lang="ts">
  import { onMount } from 'svelte';

  export let toc = [];

  const title = 'On this page';
  const buttonTitle = 'Open table of contents';
  const tocs = toc
    .map((i) => {
      let t = [i.url];
      if (i.children) {
        t = t.concat(i.children.map((c) => c.url));
      }
      return t;
    })
    .flat();

  let expanded = false;

  let current = tocs[0];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = `#${entry.target.getAttribute('id')}`;
            if (current !== id && tocs.includes(id)) {
              current = id;
            }
          }
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 1,
      },
    );

    // Observe all the heder links
    const links = document.querySelectorAll(tocs.join(', '));
    for (const link of links) {
      observer.observe(link);
    }
  });
</script>

<nav class="toc" aria-labelledby="toc--title" data-expanded={expanded}>
  <div class="toc--header">
    <div class="toc--text">
      <p id="toc--title" class="toc--title type--label">{title}</p>
      <svg role="img" aria-hidden="true" class="icon toc--expand">
        <use href="/images/icons/sprite.svg#expand-more" />
      </svg>
    </div>
    <button
      class="toc--toggle"
      title={buttonTitle}
      on:click|preventDefault={() => (expanded = !expanded)}
    />
  </div>
  <div class="toc--body">
    <ol class="toc--outer">
      {#each toc as item}
        <li class="type--caption toc--item">
          <a
            href={item.url}
            class="type--page-nav toc--link"
            data-active={item.url === current ? true : null}>{item.title}</a
          >
          {#if item.children}
            <ol class="toc--inner">
              {#each item.children as child}
                <li class="type--caption toc--item">
                  <a
                    href={child.url}
                    class="type--page-nav toc--link"
                    data-active={child.url === current ? true : null}
                    >{child.title}</a
                  >
                </li>
              {/each}
            </ol>
          {/if}
        </li>
      {/each}
    </ol>
  </div>
</nav>

<style lang="scss">
  @use 'sass:math';

  .toc {
    $this: &;
    $inline: 1.75rem;
    $block: 1rem;

    background-color: var(--grey-200);

    @container style(--inline-extras: 0) {
      background-color: transparent;
      position: sticky;
      top: var(--header-offset);
      max-height: calc(100vh - var(--header-offset));
      overflow-y: auto;
    }

    &--header {
      display: grid;
    }
    &--text,
    &--toggle {
      grid-column: 1;
      grid-row: 1;
      padding-inline: $inline;
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

      @container style(--inline-extras: 0) {
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
      @container style(--inline-extras: 0) {
        display: none;
      }
    }

    &--item,
    &--link {
      width: 100%;
    }

    &--body {
      display: none;
      padding-block: math.div($block, 2);

      @container style(--inline-extras: 0) {
        display: block;
        padding-block-end: 0rem;
        border-left: 2px solid var(--grey-200);
      }

      [data-expanded='true'] & {
        display: block;
      }
    }

    &--link {
      display: block;
      position: relative;
      &:focus {
        background: none;
        --bkg: var(--blue-50);
      }

      &::after {
        content: '';
        position: absolute;
        height: 150%;
        width: 100%;
        top: -25%;
        left: 0;
        z-index: -1;
        background-color: var(--bkg);
        border-inline-start: 4px solid var(--border);
      }

      &[data-active] {
        --bkg: var(--blue-50);
        --border: var(--blue-700);
      }
    }

    &--outer &--link {
      padding-inline: $inline;
    }

    &--inner &--link {
      padding-inline-start: $inline * 2;
    }
  }

  ol {
    list-style: none;

    ol {
      margin-block-start: 0.75rem;
    }

    li + li {
      margin-block: 1rem;
    }
  }
</style>
