<script lang="ts">
  import type { CTA } from '$types/content';
  import High from './ctas/High.svelte';
  import Medium from './ctas/Medium.svelte';
  import Low from './ctas/Low.svelte';
  import Transparent from './ctas/Transparent.svelte';
  import Link from './ctas/Link.svelte';

  export let cta: CTA;
</script>

{#if cta.type === 'link'}
  <Link {cta} />
{:else if cta.type === 'high'}
  <High {cta} />
{:else if cta.type === 'medium'}
  <Medium {cta} />
{:else if cta.type === 'low'}
  <Low {cta} />
{:else if cta.type === 'transparent'}
  <Transparent {cta} />
{/if}
