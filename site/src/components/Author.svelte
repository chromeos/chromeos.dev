<script lang="ts">
  import type { Contributor } from '$lib/authors';

  export let author: Contributor;

  let name = author.name.given;
  if (author.name.family) {
    name += ' ' + author.name.family;
  }
  let title = '';
  if (author.work.title) {
    title = author.work.title;
  }
  if (author.work.company) {
    title += ', ' + author.work.company;
  }
  if (author.work.org) {
    title += ' ' + author.work.org;
  }
</script>

<figure class="author">
  {#if author.image}
    <img class="author--image" src={author.image} alt="" sizes="32px" />
  {/if}
  <figcaption class="author--copy">
    <p class="type--h6">{name}</p>
    {#if title}
      <p class="type--small">{title}</p>
    {/if}
  </figcaption>
</figure>

<style>
  .author--image {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
  }
</style>
