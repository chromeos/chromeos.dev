<script lang="ts">
  export let block: any;
  console.log(block);
</script>

<figure>
  <img src="cms://{block.image.asset._ref}" alt={block.image.alt} />
  <figcaption><slot /></figcaption>
</figure>

<style lang="scss">
</style>
