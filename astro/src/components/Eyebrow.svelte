<script lang="ts">
  import type { Eyebrow } from '$types/content';

  export let eyebrow: Eyebrow;
  export let size: 'small' | 'large';

  const eyebrowSize = {
    small: 'type--eyebrow',
    large: 'type--h2',
  };
</script>

<div class={`eyebrow ${eyebrowSize[size]}`} `>
  {#if eyebrow?.icon}
    <img
      src={eyebrow.icon}
      alt=""
      aria-hidden="true"
      crossorigin="anonymous"
      class="eyebrow--icon"
      loading="lazy"
      sizes="50px"
      height=""
      width=""
    />
  {/if}
  <small class="eyebrow--text">{eyebrow.text}</small>
</div>

<style lang="scss">
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    color: inherit;
    margin: 0;

    &--icon {
      width: 1.7em;
      height: 1.7em;
    }

    &--text {
      margin: 0;
      font-size: inherit;
    }
  }
</style>
