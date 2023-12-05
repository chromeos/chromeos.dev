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
  function saveTheme(theme: 'dark' | 'light' | 'auto') {
    if ('localStorage' in window) {
      localStorage.setItem('theme', theme);
    }
    // --theme can be light, dark, or auto
    // --style-queries should be 0 or 1
    // Something about using auto unless style queries are available
    document.body.style.setProperty('--theme', `'${theme}'`);
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
