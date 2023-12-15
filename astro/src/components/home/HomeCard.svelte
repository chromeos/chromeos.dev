<script lang="ts">
  import type { HomepageCard } from '$types/sanity';

  export let card: HomepageCard;
</script>

<article class="homecard">
  <div class="homecard--wrapper">
    <div class="homecard--image-wrapper">
      <div class="homecard--image-holder" data-shape={card.shape} />
      <img
        class="homecard--image"
        src={card.image.image}
        alt={card.image.alt}
        loading="lazy"
        sizes="auto"
      />
    </div>
    <div class="homecard--content">
      <header>
        <h2 class="type--h2">{card.title}</h2>
      </header>
      <p class="type--base">{card.copy}</p>
      <footer class="homecard--footer">
        <a href={card.cta.url} class="cta cta--link cta--right-icon"
          >{card.cta.text}</a
        >
      </footer>
    </div>
  </div>
</article>

<style lang="scss">
  .homecard {
    $swap: 425px;

    background-color: var(--white);
    border-radius: 0.625rem;
    box-shadow: 0 0.25rem 1.25rem #00000026;

    container-type: inline-size;
    container-name: homecard;

    // TODO: Clean up padding and widths here
    justify-items: center;
    padding: clamp(2rem, -3.1296068796rem + 6.8796068796vw, 3.75rem)
      clamp(1.5rem, 0.9661016949rem + 2.0338983051vw, 3rem);
    text-align: center;

    :global([data-theme='dark']) & {
      border: 2px solid var(--phosphor-green);
    }

    &--image,
    &--image-holder {
      max-width: 16rem;
      width: clamp(12.8125rem, 11.5889830508rem + 4.6610169492vw, 16.25rem);
      border-radius: 50%;
      position: relative;
      z-index: 1;
      grid-row: 1;
      grid-column: 1;
    }

    &--image-wrapper {
      display: grid;
      place-items: center;
    }

    &--image-holder {
      position: relative;
      aspect-ratio: 1 / 1;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
      }
      &::before {
        left: 0;
        -webkit-mask-image: paint(shape);
        mask-image: paint(shape);
        top: 0;
      }
      &::after {
        background-image: paint(shape);
      }
      // Primary shape
      &[data-shape~='primary'] {
        &::before,
        &::after {
          --shape-size: (100% 100%);
        }
        &::before {
          --shape: triangle;
          --shape-color: var(--primary-yellow);
          background-image: url(https://chromeos-dev.imgix.net/icons/patterns/angle-yellow.svg);
          height: 100%;
          transform: rotate(-17deg) translate(-9%, 5%);
          width: 100%;
        }
        &::after {
          --shape: circle;
          --shape-color: var(--primary-red);
          top: 18%;
          right: -5%;
          width: 22.5%;
          height: 22.5%;
        }

        &[data-shape~='alt'] {
          &::before {
            background-image: url(https://chromeos-dev.imgix.net/icons/patterns/angle-green.svg);
          }
          &::after {
            --shape-color: var(--primary-blue);
          }
        }
      }

      // Secondary shape
      &[data-shape~='secondary'] {
        &::before,
        &::after {
          --shape: moon;
          --shape-size: (100% 200%);
          --shape-offset: (-1% -100%);
        }

        &::before {
          --shape-color: var(--secondary-green);
          top: 24%;
          left: -20%;
          width: 135%;
          height: 68%;
          background-image: url(https://chromeos-dev.imgix.net/icons/patterns/bracket-green.svg);
          transform: rotate(20deg);
        }

        &::after {
          --shape-color: var(--tertiary-green);
          top: 32%;
          left: 56%;
          width: 59%;
          height: 29%;
          transform: rotate(-35deg);
        }

        &[data-shape~='alt'] {
          &::before {
            background-image: url(https://chromeos-dev.imgix.net/icons/patterns/bracket-blue.svg);
          }

          &::after {
            --shape: triangle;
            --shape-color: var(--primary-yellow);
            transform: rotate(60deg) translate(-30%, -60%) scale(0.6);
          }
        }
      }

      // Teritary shape
      &[data-shape~='tertiary'] {
        &::before,
        &::after {
          --shape: triangle;
          --shape-size: (100% 100%);
        }

        &::before {
          --shape-color: var(--primary-blue);
          background-image: url(https://chromeos-dev.imgix.net/icons/patterns/slash-blue.svg);
          height: 95%;
          left: 5%;
          top: -8%;
          transform: rotate(168deg);
          width: 95%;
        }

        &::after {
          --shape-color: var(--tertiary-blue);
          top: 19%;
          left: 74%;
          width: 25%;
          height: 25%;
          transform: rotate(73deg);
        }
      }
    }

    &--wrapper {
      display: grid;
      gap: 1.5rem;
      height: 100%;

      @container homecard (min-width: #{$swap}) {
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
      }
    }

    &--content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
      @container homecard (min-width: #{$swap}) {
        text-align: left;
      }
    }

    &--footer {
      margin-top: auto;
    }
  }
</style>
