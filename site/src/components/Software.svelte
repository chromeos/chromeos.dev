<script lang="ts">
  import type { Software } from '$types/sanity';

  interface SoftwareMicrocopy {
    versions: {
      singular: string;
      plural: string;
    };
    title: string;
  }

  export let software: Software[];
  export let microcopy: SoftwareMicrocopy;
</script>

<div class="extras-section">
  <h4 class="type--label">{microcopy?.title}</h4>
  <ul class="software-list">
    {#each software as s}
      <li class="software">
        <a class="type--h6" href={s.url}
          >{s.name}<span class="icon--container"
            >⁠<svg
              role="img"
              aria-hidden="true"
              class="icon icon--inline-external"
              ><use href="/images/icons/sprite.svg#open-in-new"></use></svg
            ></span
          ></a
        >
        <p class="type--small">
          <span class="software--version">
            {#if (s.min && !s.max) || (s.max && !s.min)}
              {microcopy.versions.singular}:
            {:else}
              {microcopy.versions.plural}:
            {/if}
          </span>
          {#if s.min}
            {s.min}
          {/if}
          {#if s.min && s.max}
            -
          {/if}
          {#if s.max}
            {s.max}
          {/if}
        </p>
      </li>
    {/each}
  </ul>
</div>

<style>
  .extras-section {
    @container style(--inline-extras: 0) {
      padding-inline: 1.75rem;
      padding-block: 1rem;
    }
  }

  .software-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    margin-block-start: 0.25rem;
  }

  .software--version {
    text-transform: capitalize;
  }

  .type--h6 {
    font-weight: 400;
    text-decoration: none;
  }
</style>
