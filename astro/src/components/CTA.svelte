<script context="module" lang="ts">
  export type CTA = {
    text: string;
    url: string;
    type: 'high' | 'medium' | 'low' | 'transparent' | 'link';
    direction?: 'back' | 'forward' | 'external';
  };

  export type CTAProps = {
    cta: CTA;
    inline?: boolean;
  };
</script>

<script lang="ts">
  import High from './ctas/High.svelte';
  import Medium from './ctas/Medium.svelte';
  import Low from './ctas/Low.svelte';
  import Transparent from './ctas/Transparent.svelte';
  import Link from './ctas/Link.svelte';

  export let cta: CTA;
  export let inline = false;
</script>

{#if cta.type === 'link'}
  <Link {cta} {inline} />
{:else if cta.type === 'high'}
  <High {cta} {inline} />
{:else if cta.type === 'medium'}
  <Medium {cta} {inline} />
{:else if cta.type === 'low'}
  <Low {cta} {inline} />
{:else if cta.type === 'transparent'}
  <Transparent {cta} {inline} />
{/if}
