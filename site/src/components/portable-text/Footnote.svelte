<script lang="ts">
  export let block: any;
  const href = `#fn-${block.markDef.id}`;
  const id = `fnref-${block.markDef.id}`;
</script>

<slot />
<sup>
  <a {href} {id}>[{block.markDef.id}]</a>
</sup>
