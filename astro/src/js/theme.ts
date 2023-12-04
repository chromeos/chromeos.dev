import { writable } from 'svelte/store';

/**
 * Creates a writable store for the theme
 * @return {WritableStore<'dark' | 'light'>} Returns a writable store
 */
function createThemeStore() {
  const { subscribe, set } = writable();

  /**
   * @param {string} theme - Theme to set
   */
  function saveTheme(theme: 'dark' | 'light') {
    if ('localStorage' in window) {
      localStorage.setItem('theme', theme);
    }
  }

  return {
    subscribe,
    set(theme: 'dark' | 'light') {
      saveTheme(theme);
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

      // TODO: Make this work once color switcher is in place
      theme = 'light';

      set(theme);
      saveTheme(theme);
    },
  };
}

export const theme = createThemeStore();
