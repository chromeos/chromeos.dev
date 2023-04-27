<script lang="ts">
  import { getMicrocopy } from '$lib/microcopy';

  export let lang: string;

  const microcopy = getMicrocopy(lang);
</script>

<div
  class="wrapper wrapper--padding wrapper--padded wrapper--full-bleed wrapper__background--dark subscribe-footer"
>
  <aside class="call-out">
    <h2 class="call-out--heading type--h2">
      {microcopy.newsletter.subscribe.content.title}
    </h2>

    <p class="call-out--body type">
      {microcopy.newsletter.subscribe.content.body}
    </p>

    <a class="cta cta--high" href="/{lang}/subscribe"
      >{microcopy.newsletter.subscribe.cta.text}</a
    >
  </aside>
</div>

<style lang="scss">
  .subscribe-footer {
    width: 100%;
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
    }
  }
</style>
