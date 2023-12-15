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
  import Transparent from './ctas/Transparent.svelte';
  import Link from './ctas/Link.svelte';
  import Generic from './ctas/Generic.svelte';

  export let cta: CTA;
  export let inline = false;

  const { type } = cta;
</script>

{#if cta.type === 'link'}
  <Link {cta} {inline} />
{:else if cta.type === 'transparent'}
  <Transparent {cta} {inline} />
{:else}
  <Generic {cta} {type} {inline} />
{/if}
