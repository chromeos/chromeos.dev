<script lang="ts">
  export let title: string;
  export let copy: string;
  export let quotes: any[];
  console.log(quotes[0]);
</script>

<section class="wrapper wrapper--padding wrapper--padded">
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
    justify-content: space-between;
  }

  .decorator {
    width: clamp(5.625rem, 12.1vw, 10rem);
    height: clamp(5.625rem, 12.1vw, 10rem);
    border-radius: 50%;
    transform: translateX(0%) translateY(30%);

    &:nth-of-type(2) {
      transform: scale(0.75) translateX(150%) translateY(-60%);
      margin-bottom: -4rem;
    }
  }

  .quote {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 22ch;
    position: relative;

    &--quote {
      display: flex;
      flex-direction: column;
      gap: 1rem;

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
      width: clamp(13.75rem, 21.05vw, 21.5625rem);
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
