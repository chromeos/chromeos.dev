<script lang="ts">
  import './story-hero.css'

  export let eyebrow: string;
  export let title: string;
  export let body: string;
  export let section: string;
  export let standalone = false as boolean;
</script>

<div class="container">
  <svelte:element this={standalone ? 'article' : 'header'} class="hero">
    <div class="hero-content">
      <svelte:element this={standalone ? 'h1' : 'h2'}>{title}</svelte:element>
      <p>{body}</p>
    </div>
    
  
  </svelte:element>
</div>

