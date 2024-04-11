<script lang="ts">
  export let block: any;
</script>

{#if block?.image?.asset}
  <figure>
    <img src="cms://{block.image.asset._ref}" alt={block.image.alt} />
    <figcaption><slot /></figcaption>
  </figure>
{/if}
