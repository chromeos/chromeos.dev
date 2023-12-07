<script>
  export let chromebook;
</script>

<section class="wrapper wrapper--no-top wrapper--padded">
  <article class="chromebook">
    <div class="chromebook--content">
      <h2 class="type--h1">{chromebook.title}</h2>
      <p class="type--base">{chromebook.copy}</p>
      <a href={chromebook.cta.url} class="cta cta--link cta--right-icon"
        >{chromebook.cta.text}</a
      >
    </div>
    <img
      src={chromebook.image.image}
      alt={chromebook.image.alt}
      class="chromebook--image"
    />
  </article>
</section>

<style lang="scss">
  .type--base {
    text-wrap: pretty;
  }

  .chromebook {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &--content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex: 1 1 40ch;
    }

    &--image {
      flex: 1 1 10%;
      min-width: 60%;
      transform: translateX(17%) scale(1.1);
    }
  }
</style>
