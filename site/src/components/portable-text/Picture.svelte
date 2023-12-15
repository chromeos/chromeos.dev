<script lang="ts">
  export let block: any;
</script>

{#if block?.asset}
  <img src="cms://{block.asset._ref}" alt={block.alt} />
{/if}
