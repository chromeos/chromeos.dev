<script>
  export let id;
  export let alt;
  export let label = 'Play video';
  const webp = 'https://img.youtube.com/vi_webp/' + id + '/maxresdefault.webp';
  const jpg = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
  const video = 'https://www.youtube.com/embed/' + id;
  let placeholder;
  let embed;

  /**
   * Swaps the placeholder image and icon with the YouTube video
   */
  async function swap() {
    embed.style.display = 'block';
    placeholder.style.display = 'none';
  }
</script>

<div class="youtube">
  <button
    aria-label={label + ' - ' + alt}
    class="youtube--loader"
    bind:this={placeholder}
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
  <iframe
    class="youtube--embed"
    bind:this={embed}
    frameborder="0"
    allowfullscreen="true"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    src={video}
    title={alt}
  />
</div>

<style lang="scss">
  .youtube {
    height: 100%;
    width: 100%;

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
      display: none;
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
