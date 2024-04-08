<script lang="ts">
  import { registerSW } from 'virtual:pwa-register';
  import { onMount } from 'svelte';

  onMount(() => {
    // This should be OK for now
    registerSW();
  });
</script>
