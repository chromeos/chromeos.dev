<script lang="ts">
  export let title: string;
  export let copy: string;
  export let cta: string;
  export let locale: string;

  export let stories = [];
</script>

<section
  class="wrapper wrapper--padding wrapper--padded wrapper--full-bleed wrapper__background wrapper__contained"
>
  <div class="inner">
    <header>
      <h1 class="type--h1">{title}</h1>
      <h2 class="type--large">{copy}</h2>
    </header>
    <footer>
      <a class="cta cta--medium case-studies__cta" href={`/${locale}/stories`}
        >{cta}</a
      >
    </footer>
  </div>
</section>

<style lang="scss">
  .cta {
    margin-inline: auto;
    width: max-content;
  }
</style>
