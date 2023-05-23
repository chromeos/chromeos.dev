<script>
  import CTA from '$components/CTA.svelte';

  export let story = {};
  export let microcopy = {};
  const featured = microcopy.microcopy.featured.eyebrow;
  const more = microcopy.microcopy.more;

  const cta = {
    type: 'link',
    direction: 'forward',
    text: more,
    url: `/` + story.path,
  };
</script>

<article class="featured-story wrapper__contained">
  <img
    class="featured-story--background"
    src={story.hero.image}
    alt={story.hero.alt}
  />
  <div class="featured-story--inner">
    <div class="featured-story--info">
      <img
        class="featured-story--logo"
        src={story.app.logo}
        alt={story.app.name}
      />
      <small class="type--eyebrow featured-story--eyebrow">{featured}</small>
      <h1 class="type--h3 featured-story--title">{story.title}</h1>
      <div class="featured-story--cta">
        <CTA {cta} />
      </div>
    </div>
  </div>
</article>

<style lang="scss">
  @import '$sass/shared';

  .featured-story {
    container-type: inline-size;
    // display: grid;
    // max-height: 690px;
    width: 100%;
    // height: 100%;
    // height: 810px;
    // overflow: hidden;
    position: relative;

    &--background {
      display: block;
      width: 100%;
      height: 100%;
      max-width: unset;
      object-fit: cover;
      aspect-ratio: 16/9;

      @container (min-width: 612px) {
        position: absolute;
        top: 0;
        right: 0;
      }

      // grid-column: 1;
      // grid-row: 1;
    }
    &--inner {
      --inner-spacing: clamp(1rem, 4cqi, 8cqi);
      display: grid;
      container-type: inline-size;

      grid-template-rows: auto min-content;

      @container (min-width: 612px) {
        grid-template-columns: 1fr minmax(28ch, 36cqi);
        height: 100%;
        max-width: 1440px;
      }

      @container (min-width: 955px) {
        grid-template-columns: 1fr 32cqi var(--inner-spacing);
        grid-template-rows: var(--inner-spacing) auto var(--inner-spacing);
      }

      // grid-column: 1;
      // grid-row: 1;
    }

    &--title {
      text-align: center;
    }

    &--info {
      // width: 32cqw;

      background-color: var(--white);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      grid-row: 1;
      grid-column: 2;

      justify-self: flex-end;
      align-items: center;

      padding: 2rem;
      padding-block-start: 3.75rem;
      border: 1px solid var(--grey-300);
      border-radius: 0 0 10px 10px;

      @container (min-width: 612px) {
        padding: 2rem;
        justify-content: center;
        border: none;
        border-radius: 0;
      }

      @container (min-width: 955px) {
        grid-row: 2;
        border-radius: 10px;
        max-width: 500px;
      }
      // height: 100%;
    }

    &--logo {
      @include elevation(2);
      border-radius: 0.625rem;
      height: 3.75rem;
      margin: 0 auto;
      // transform: translateY(-50%);
      width: 3.75rem;
      margin-bottom: 1rem;
      position: absolute;
      top: -1.875rem;

      @container (min-width: 612px) {
        position: unset;
      }
    }

    &--cta {
      // align-self: flex-end;

      @container (min-width: 612px) {
        margin-top: 2rem;
      }
    }
  }
</style>
