<script lang="ts">
  export let title: string;
  export let copy: string;
  export let quotes: any[];
</script>

<section class="wrapper wrapper--padding wrapper--padded wrapper__contained">
  <div class="inner">
    <header class="home--header">
      <h1 class="type--h1">{title}</h1>
      <h2 class="type--large">{copy}</h2>
    </header>
    <div class="quotes">
      {#each quotes as quote, i}
        <figure class="quote">
          {#if i === 1}
            <img
              src="ix://lifestyle/code_sample_sudo.png"
              aria-hidden="true"
              class="decorator"
            />
            <img
              src="ix://lifestyle/command_key.png"
              aria-hidden="true"
              class="decorator"
            />
          {/if}
          <img
            class="quote--image"
            src={quote.image.image}
            alt={quote.image.alt}
          />
          <figcaption>
            <blockquote class="quote--quote">
              <p class="type--h4">{quote.quote}</p>
              <footer class="type--caption">
                <cite class="quote--cite"
                  ><span class="quote--author">{quote.author.name}</span>
                  {quote.author.title}</cite
                >
              </footer>
            </blockquote>
          </figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .quotes {
    display: flex;
    flex-wrap: wrap;
    gap: 4rem 1.25rem;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;

    @media (min-width: 815px) {
      margin-top: 0;
    }

    @media (min-width: 1233px) {
      justify-content: space-between;
    }
  }

  .decorator {
    display: none;
    width: clamp(5.625rem, 12.1vw, 10rem);
    height: clamp(5.625rem, 12.1vw, 10rem);
    border-radius: 50%;
    transform: translateX(0%) translateY(30%);

    &:nth-of-type(2) {
      transform: scale(0.75) translateX(150%) translateY(-60%);
      margin-bottom: -4rem;
    }

    @media (min-width: 815px) {
      display: block;
    }
  }

  .quote {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    align-items: center;
    justify-content: center;

    &--quote {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 22rem;

      p {
        &::before {
          content: open-quote;
        }

        &::after {
          content: close-quote;
        }
      }
    }

    &--image {
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      width: clamp(13.75rem, 21vw, 22rem);
      object-fit: cover;
    }

    &--cite {
      font-style: normal;
      color: var(--grey-700);
    }

    &--author {
      font-weight: 700;
    }
  }
</style>
