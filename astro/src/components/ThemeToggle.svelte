<script>
  import { theme } from '$js/theme';
  import { onMount } from 'svelte';

  let toggle;
  $: group = $theme;

  onMount(() => {
    theme.init();
  });

  /**
   * Sets the current theme from change event
   * @param {ChangeEvent} e
   */
  function setTheme(e) {
    const { value } = e.target;
    theme.set(value);
  }
</script>

<form
  bind:this={toggle}
  on:submit|preventDefault
  on:change={setTheme}
  class="toggle"
>
  <label for="toggle--light" class="toggle--label">
    <input
      id="toggle--light"
      class="toggle--input"
      type="radio"
      name="toggle"
      value="light"
      bind:group
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      aria-hidden="true"
      class="toggle--icon"
    >
      <path
        d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
      />
    </svg>
    <span>Light mode</span>
  </label>

  <label for="toggle--auto" class="toggle--label">
    <input
      id="toggle--auto"
      class="toggle--input"
      type="radio"
      name="toggle"
      value="auto"
      bind:group
    />
    <!-- <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      aria-hidden="true"
      class="toggle--icon"
    >
      <path
        d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"
      />
    </svg> -->
    <span>Automatic switching</span>
  </label>

  <label for="toggle--dark" class="toggle--label">
    <input
      id="toggle--dark"
      class="toggle--input"
      type="radio"
      name="toggle"
      value="dark"
      bind:group
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      aria-hidden="true"
      class="toggle--icon"
    >
      <path
        d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"
      />
    </svg>

    <span>Dark mode</span>
  </label>
</form>

<style lang="scss">
  .toggle {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding-inline: 1.3rem;

    &::before {
      content: '';
      height: 0.5rem;
      width: calc(100% - 2.6rem);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      background-color: var(--grey-700);
      border-radius: 5px;
    }

    &--label {
      position: relative;
      height: 1rem;
      width: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      [value='dark'] ~ .toggle--icon {
        transform: translateX(1.3rem) scale(1.3);
      }
      [value='light'] ~ .toggle--icon {
        transform: translateX(-1.3rem) scale(1.3);
      }

      &:has([value='auto']) {
        height: 0.25rem;
        width: 0.25rem;

        .toggle--input {
          height: 0.25rem;
          width: 0.25rem;
          transform: scale(400%);
        }
      }
    }

    &--input {
      height: 1rem;
      width: 1rem;
      position: absolute;
      background-color: var(--grey-700);
      border-radius: 50%;
      appearance: none;

      &:focus-visible {
        outline: none;
      }
    }

    &--input:not(:checked) {
      opacity: 0;
      top: 0;
      left: 0;
    }

    &--icon {
      height: 1rem;
      width: 1rem;
      transform: scale(1.3);
      fill: var(--grey-700);
    }

    span {
      display: none;
    }
  }
</style>
