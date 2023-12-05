<script lang="ts">
  import type { HomepageCard } from '$types/sanity';

  export let card: HomepageCard;
</script>

<article class="homecard">
  <div class="homecard--wrapper">
    <div class="homecard--image-wrapper" data-shape={card.shape}>
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

    &--image {
      max-width: 16rem;
      width: clamp(12.8125rem, 11.5889830508rem + 4.6610169492vw, 16.25rem);
      border-radius: 50%;
      position: relative;
      z-index: 1;
    }

    &--image-wrapper {
      position: relative;
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
          height: clamp(
            13.875rem,
            3.6157862408rem + 13.7592137592vw,
            17.375rem
          );
          transform: rotate(-17deg) translate(-1rem, 0.5rem);
          width: clamp(13.875rem, 3.6157862408rem + 13.7592137592vw, 17.375rem);
        }
        &::after {
          --shape: circle;
          --shape-color: var(--primary-red);
          top: 16.9172932331%;
          left: 78.9473684211%;
          width: 22.5563909774%;
          height: 22.5563909774%;
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
          top: 24.0601503759%;
          left: -22.5563909774%;
          width: 133.8345864662%;
          height: 67.6691729323%;
          background-image: url(https://chromeos-dev.imgix.net/icons/patterns/bracket-green.svg);
          transform: rotate(20deg);
        }

        &::after {
          --shape-color: var(--tertiary-green);
          top: 31.5789473684%;
          left: 50.3759398496%;
          width: 58.6466165414%;
          height: 29.3233082707%;
          transform: rotate(-30deg);
        }

        &[data-shape~='alt'] {
          &::before {
            background-image: url(https://chromeos-dev.imgix.net/icons/patterns/bracket-blue.svg);
          }
          &::after {
            --shape: triangle;
            --shape-color: var(--primary-yellow);
            transform: rotate(60deg) translate(-2rem, -3rem) scale(0.6);
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
          height: clamp(
            12.9375rem,
            2.1286855037rem + 14.4963144963vw,
            16.625rem
          );
          left: 0;
          top: 0;
          transform: translate(1rem, -1rem) rotate(168deg);
          width: clamp(
            12.9375rem,
            2.1286855037rem + 14.4963144963vw,
            16.625rem
          );
        }

        &::after {
          --shape-color: var(--tertiary-blue);
          top: 18.7969924812%;
          left: 73.6842105263%;
          width: 24.8120300752%;
          height: 24.8120300752%;
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
