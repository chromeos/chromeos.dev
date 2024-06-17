<script lang="ts">
  import { state } from '$js/state/reinforcement';
  import Check from '$components/icons/Check.svelte';

  export let step: number;
  export let tutorial: string;
  export let task: string;
  const base = tutorial + '.' + task;

  let ticked: boolean = false;
  let clean: boolean = true;

  $: {
    if ($state[base]) {
      if ($state[base][step] !== undefined && clean) {
        ticked = $state[base][step];
        clean = false;
      }

      if ($state[base][step] !== ticked) {
        $state[base][step] = ticked;
        state.set($state);
      }
    }
  }
</script>

<li>
  <label>
    <input type="checkbox" bind:checked={ticked} /><span
      class="check"
      aria-hidden="true"><Check></Check></span
    ><span class="content"><slot></slot></span>
  </label>
</li>

<style lang="scss">
  label {
    display: grid;
    grid-template-columns: 1rem auto;
    gap: 1rem;
    align-items: center;
    border-radius: 0.25rem;
    padding-inline: 2rem;
    padding-block: 2rem;
    background-color: var(--grey-150);
    cursor: pointer;

    &:has(:checked) .check {
      display: grid;
    }
  }

  input {
    appearance: none;
    height: 1rem;
    width: 1rem;
    background: var(--white);
    border-radius: 50%;
    border: 2px solid var(--black);

    grid-column: 1 / span 1;
    grid-row: 1 / span 1;

    &:checked::before {
      content: '';

      background: var(--white);
      transform-origin: bottom left;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }

    &:checked {
      background-color: var(--green-500);
      border-color: var(--green-500);
    }
  }

  .check {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    place-content: center;
    height: 1rem;
    width: 1rem;
    display: none;

    :global(.icon) {
      height: 0.85rem;
      width: 0.85rem;
      fill: var(--white);
    }
  }
</style>
