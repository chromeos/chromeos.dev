<script lang="ts">
  import Correct from "$components/icons/Correct.svelte";
  import Incorrect from "$components/icons/Incorrect.svelte";
  import type { Example } from "$types/sanity";

  export let example: Example;

  function derivedColor(icon: false | 'correct' | 'incorrect') {
    return icon === false ? undefined : icon === 'correct' ? 'var(--green-800)' : 'var(--red-500)';
  }
</script>

{#if example}
  <div class="comparison-figure--wrapper">
    {#if example.title}
      <p class="type--base comparison-figure--title">{example.title}</p>
    {/if}
    <div class="comparison-figure--container">
      {#each example.figures as figure}
        <figure class="comparison-figure">
          <img src={figure.image.image} alt={figure.image.alt} />

          {#if figure.caption.text}
            <span class="comparison-figure--caption" style="--icon-color: {derivedColor(figure.caption.icon)}">
              {#if figure.caption.icon === "correct"}
                <Correct />
              {/if}
              {#if figure.caption.icon === "incorrect"}
                <Incorrect />
              {/if}
              {figure.caption.text}
            </span>
          {/if}
        </figure>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  @import "$sass/shared";

  .comparison-figure {
    flex: 1 0 auto;
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.5rem;

    :global(img) {
      width: 100%;
      object-fit: contain;
    }
    
    &--wrapper:not(:last-of-type) {
      margin-block-end: 1.5rem;
    }

    &--title {
      margin-block-end: 0.5rem;
    }

    &--container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      align-items: start;
      gap: 1.25rem;

      @container style(--inline-aside: 1) {
        grid-template-columns: repeat(auto-fit, minmax(144px, 1fr));
      }
    }

    &--caption {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
      color: var(--grey-700);

      :global(svg) {
        color: var(--icon-color);
      }
    }
  }
</style>