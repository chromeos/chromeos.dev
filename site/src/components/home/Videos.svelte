<script lang="ts">
  import YouTube from '$components/YouTube.svelte';
  export let title: string;
  export let label: string;

  export let videos = [];
</script>

<section
  class="wrapper wrapper--padding wrapper--padded wrapper--full-bleed wrapper__background wrapper__contained"
>
  <div class="inner">
    <header class="home--header">
      <h1 class="type--h1">{title}</h1>
    </header>
    <div class="videos">
      {#each videos as video}
        <figure class="video">
          <div class="video--video">
            <YouTube id={video.id} alt={video.title} {label} />
          </div>

          <figcaption>
            <p class="type--h4">{video.title}</p>
          </figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .videos {
    display: grid;
    gap: 5rem 2.75rem;
    grid-template-columns: repeat(auto-fit, minmax(min(24ch, 100%), 1fr));
    margin-top: 2.5rem;
  }

  .video {
    &--video {
      border-radius: 10px;
      overflow: hidden;
      aspect-ratio: 16 / 9;
    }
    figcaption {
      margin-top: 1rem;
      text-align: center;
    }
  }
</style>
