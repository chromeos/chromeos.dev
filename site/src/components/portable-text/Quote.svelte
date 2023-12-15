<script lang="ts">
  export let block: any;
</script>

<blockquote>
  <slot />
  {#if block?.author}
    <footer>{block.author}</footer>
  {/if}
</blockquote>
