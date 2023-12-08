<script>
  import PostHero from '$components/PostHero.svelte';
  export let featured = {};
</script>

<section class="wrapper wrapper__contained wrapper--no-bottom wrapper--no-top">
  <PostHero {...featured} />
</section>

<style lang="scss">
  @import '$sass/globals/vars';

  .wrapper {
    @media (min-width: #{$wrapper-max-width}) {
      margin-block: calc($wrapper-block-spacing-r / 2);
    }
  }
</style>
