<script>
  export let linux = {};

  const { title, copy, cta, images } = linux;
</script>

<section class="wrapper wrapper--padded wrapper--padding">
  <article class="fifty-fifty">
    <div class="content">
      <h3 class="type--h1">{title}</h3>
      <p>{copy}</p>
      <a href={cta.url} class="cta cta--link cta--right-icon">{cta.text}</a>
    </div>
    <div class="images">
      {#each images as image}
        <img src={image.image} alt={image.alt} />
      {/each}
    </div>
  </article>
</section>

<style lang="scss">
  $bkpt: 600px;

  .fifty-fifty {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: #{$bkpt}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .images {
    position: relative;
    z-index: 1;
    margin-top: 3rem;
    @media (min-width: #{$bkpt}) {
      margin-top: 0;
    }
    &::before,
    &::after {
      content: '';
      display: block;
      left: 0;
      position: absolute;
      top: 0;
    }
    &::before {
      --shape: moon;
      --shape-color: var(--tertiary-blue);
      --shape-size: (100% 200%);
      --shape-offset: (0 -100%);
      background-image: paint(shape);
      height: 46%;
      transform: translateY(50%) rotate(-30deg);
      width: 60%;
    }
    &::after {
      --shape: triangle;
      --shape-color: var(--primary-yellow);
      --shape-size: (100% 100%);
      --shape-offset: (0% 0%);
      top: 33%;
      left: 85%;
      width: 16.5%;
      height: 16.5%;
      transform: rotate(75deg);
      background-image: paint(shape);
    }
    img {
      &:nth-of-type(1) {
        top: -15%;
        left: 0%;
        transform: scale(0.5);
        position: absolute;
        z-index: 3;
      }
      &:nth-of-type(2) {
        position: relative;
        top: 0;
        left: 0;
        z-index: 1;
      }
      &:nth-of-type(3) {
        position: absolute;
        top: -25%;
        right: 0;
        z-index: 0;
      }
    }
  }
</style>
