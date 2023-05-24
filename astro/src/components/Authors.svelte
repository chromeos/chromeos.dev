<script lang="ts">
  import type { Contributor } from '$lib/authors';
  import Author from '$components/Author.svelte';

  export let authors: Contributor[];
  export let label = 'Written By';
  export let wrapper = 'div';
</script>

<svelte:element this={wrapper} class="extras-section">
  <h4 class="type--label">{label}</h4>
  <ul class="author-list">
    {#each authors as author}
      <li class="author-list--author">
        <Author {author} />
      </li>
    {/each}
  </ul>
</svelte:element>

<style>
  .author-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
  }
</style>
