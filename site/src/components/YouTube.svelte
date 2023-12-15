<script>
  export let id;
  export let alt;
  export let label = 'Play video';
  const webp = 'https://img.youtube.com/vi_webp/' + id + '/maxresdefault.webp';
  const jpg = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
  const video = 'https://www.youtube.com/embed/' + id;
  let visible = false;

  /**
   * Swaps the placeholder image and icon with the YouTube video
   */
  async function swap() {
    visible = true;
  }
</script>

<div class="youtube">
  {#if visible === false}
    <button
      aria-label={label + ' - ' + alt}
      class="youtube--loader"
      on:click|once={swap}
    >
      <picture class="youtube--placeholder">
        <source srcset={webp} type="image/webp" />
        <source srcset={jpg} type="image/jpeg" />
        <img src={jpg} {alt} />
      </picture>
      <svg role="img" aria-hidden="true" class="icon youtube--play">
        <use href="/images/icons/sprite.svg#play-button" />
      </svg>
    </button>
  {:else}
    <iframe
      class="youtube--embed"
      frameborder="0"
      allowfullscreen="true"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      src={video}
      title={alt}
    />
  {/if}
</div>

<style lang="scss">
  .youtube {
    height: 100%;
    width: 100%;
    aspect-ratio: 16 / 9;

    &--loader {
      position: relative;
      border: 0;
      background: none;
      border-radius: none;
      padding: 0;
      cursor: pointer;
    }

    &--placeholder {
      object-fit: cover;
    }

    &--embed {
      width: 100%;
      height: 100%;
    }

    &--play {
      background-color: var(--primary-blue);
      height: 4.5rem;
      width: 4.5rem;
      border-radius: 50%;
      position: absolute;
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
</style>
