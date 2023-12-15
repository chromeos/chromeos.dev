<script lang="ts">
  import { getMicrocopy } from '$$microcopy';

  export let lang: string;

  const microcopy = getMicrocopy(lang);
  const { subscribe } = microcopy.footer;
  const action = microcopy.actions.subscribe;
</script>

<div
  class="wrapper wrapper--padding wrapper--padded wrapper--full-bleed wrapper__background--dark subscribe-footer"
>
  <aside class="call-out">
    <h2 class="call-out--heading type--h2">
      {subscribe.title}
    </h2>

    <p class="call-out--body type">
      {subscribe.description}
    </p>

    <a class="cta cta--high" href="/{lang}/subscribe">{action}</a>
  </aside>
</div>

<style lang="scss">
  .subscribe-footer {
    width: 100%;

    :global([data-theme='dark']) & {
      border: 2px solid var(--phosphor-green);
    }
  }

  .call-out {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-inline: auto;
    margin-block: 0;
    max-width: 65ch;
    text-align: center;
    gap: 1.5rem;

    &--heading,
    &--body {
      color: var(--white);
      width: 100%;

      :global([data-theme='dark']) & {
        color: var(--phosphor-green);
      }
    }
  }
</style>
