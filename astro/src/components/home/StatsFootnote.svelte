<script>
  export let stats = [];
</script>

<footer
  class="wrapper wrapper--full-bleed wrapper--padded wrapper--padding wrapper__contained wrapper--no-top wrapper__background--light wrapper--no-bottom footnotes"
>
  <ol class="footnotes--list">
    {#each stats as stat, i}
      <li class="footnotes--li" id={`fn-${i + 1}`}>
        <span class="footnotes--item">
          {stat.source}
          <a href={`#fnref-${i + 1}`} class="footnotes--backref"> ↩︎ </a>
        </span>
      </li>
    {/each}
  </ol>
</footer>

<style lang="scss">
  .footnotes {
    margin-inline: 0;
    padding-block: 2rem;

    &--li {
      margin-inline-start: 2ch;
    }

    &--item {
      display: inline-flex;
      align-items: flex-end;
      gap: 0.25rem;
      text-wrap: pretty;
    }

    &--backref {
      margin: 0;
      padding: 0;
      text-decoration: none;
    }
  }
</style>
