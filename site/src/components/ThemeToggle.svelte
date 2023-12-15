<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { theme } from '$js/theme';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  type Labels = {
    light: string;
    dark: string;
    auto: string;
  };

  export let labels: Labels = {
    light: 'Light mode enabled. Enable dark mode.',
    dark: 'Dark mode enabled. Switch to automatic theme.',
    auto: 'Theme set automatically. Enable light mode.',
  };

  const checked = writable() as Writable<boolean | 'mixed'>;
  const label = writable() as Writable<string>;

  $: {
    if ($theme === 'light') {
      checked.set(true);
      label.set(labels.light);
    } else if ($theme === 'dark') {
      checked.set(false);
      label.set(labels.dark);
    } else {
      checked.set('mixed');
      label.set(labels.auto);
    }
  }

  onMount(() => {
    theme.init();
  });

  /**
   * Sets the current theme from change event
   * @param {ChangeEvent} e
   */
  function setTheme() {
    const value = $checked;
    if (value === 'mixed') {
      theme.set('light');
    } else if (value === true) {
      theme.set('dark');
    } else {
      theme.set('auto');
    }
  }
</script>

<button
  on:click={setTheme}
  aria-label={$label}
  role="checkbox"
  aria-checked={$checked}
  class="toggle"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    class="toggle--icon"
    aria-hidden="true"
    data-value="mixed"
  >
    <path
      d="M396-396q-32-32-58.5-67T289-537q-5 14-6.5 28.5T281-480q0 83 58 141t141 58q14 0 28.5-2t28.5-6q-39-22-74-48.5T396-396Zm57-56q51 51 114 87.5T702-308q-40 51-98 79.5T481-200q-117 0-198.5-81.5T201-480q0-65 28.5-123t79.5-98q20 72 56.5 135T453-452Zm290 72q-20-5-39.5-11T665-405q8-18 11.5-36.5T680-480q0-83-58.5-141.5T480-680q-20 0-38.5 3.5T405-665q-8-19-13.5-38T381-742q24-9 49-13.5t51-4.5q117 0 198.5 81.5T761-480q0 26-4.5 51T743-380ZM440-840v-120h80v120h-80Zm0 840v-120h80V0h-80Zm323-706-57-57 85-84 57 56-85 85ZM169-113l-57-56 85-85 57 57-85 84Zm671-327v-80h120v80H840ZM0-440v-80h120v80H0Zm791 328-85-85 57-57 84 85-56 57ZM197-706l-84-85 56-57 85 85-57 57Zm199 310Z"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    aria-hidden="true"
    class="toggle--icon"
    data-value="true"
  >
    <path
      d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    aria-hidden="true"
    class="toggle--icon"
    data-value="false"
  >
    <path
      d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
    />
  </svg>
</button>

<style lang="scss">
  .toggle {
    height: 1em;
    width: 1em;
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;

    &--icon {
      height: 1rem;
      width: 1rem;
      transform: scale(1.3);
      fill: var(--grey-700);
      display: none;
    }

    &[aria-checked='mixed'] [data-value='mixed'] {
      display: block;
    }

    &[aria-checked='true'] [data-value='true'] {
      display: block;
    }

    &[aria-checked='false'] [data-value='false'] {
      display: block;
    }
  }
</style>
