<script lang="ts">
  export let type: 'note' | 'warning' | 'error' | 'tip' = 'note';
</script>

<aside class="message" data-type={type}><slot /></aside>
