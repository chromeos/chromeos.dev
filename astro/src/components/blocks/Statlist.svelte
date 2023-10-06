<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';

  export let portableText: CustomBlockComponentProps<{ style?: boolean }>;

  const { stats } = portableText.value;
</script>

<ul>
  {#each stats as stat}
    <li>
      <h3>{stat.stat}</h3>
      <p>{stat.description}</p>
    </li>
  {/each}
</ul>
