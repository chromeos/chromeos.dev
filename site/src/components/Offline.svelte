<script>
  import { onMount } from 'svelte';

  export let offline;
  let current = offline[0];

  onMount(() => {
    const path = window.location.pathname;
    const lang = path.split('/')[1];
    current = offline.find((item) => item.locale === lang) || offline[0];
  });
</script>

<h1 class="type--h1">{current.title}</h1>
<p class="type--h3">{current.description}</p>
