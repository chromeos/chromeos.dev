<script lang="ts">
  import readingTime from 'reading-time';
  import { toPlainText } from 'astro-portabletext/utils';
  import type { PortableTextBlock } from '@sanity/types';

  export let body: PortableTextBlock[];
  export let label = 'Reading time';
  export let duration = `((n)) minutes`;
  export let wrapper = 'div';

  const { minutes } = readingTime(toPlainText(body));
  const length = duration.replace('((n))', `${Math.ceil(minutes)}`);
</script>

<svelte:element this={wrapper} class="extras-section">
  <h4 class="type--label">{label}</h4>
  <p class="type--h6">{length}</p>
</svelte:element>

<style>
  .type--h6 {
    font-weight: 400;
  }
</style>
