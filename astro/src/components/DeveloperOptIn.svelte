<script>
  export let title = '';
  export let description = '';
  export let cta = {
    url: '',
    text: '',
  };
</script>

<aside class="optin type">
  <h2>{title}</h2>
  <p>{description}</p>
  <a href={cta.url} class="cta cta--medium">{cta.text}</a>
</aside>

<style lang="scss">
  .optin {
    max-width: 60ch;
    margin-inline: auto;
    background-color: var(--grey-50);
    border-radius: 0.625rem; // Make this reusable
    padding: 2rem;
    padding-block-end: 2.5rem;
  }
</style>
