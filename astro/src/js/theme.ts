import { writable } from 'svelte/store';

/**
 * Creates a writable store for the theme
 * @return {WritableStore<'dark' | 'light'>} Returns a writable store
 */
function createThemeStore() {
  const { subscribe, set } = writable();

  return {
    subscribe,
    set(theme: 'dark' | 'light') {
      if ('localStorage' in window) {
        localStorage.setItem('theme', theme);
      }
      set(theme);
    },
    init() {
      let theme;
      if ('localStorage' in window) {
        theme = localStorage.getItem('theme') || null;
      }

      if (theme === null) {
        theme =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
      }

      set(theme);
    },
  };
}

export const theme = createThemeStore();
