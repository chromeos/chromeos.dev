<script>
  import Render from "./Render.svelte";

  export let value = [];
</script>

<div class="type">
  <Render {value} />
</div>
