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
    // document.body.setAttribute('data-theme', theme);
    // document.body.style.setProperty('--theme', theme);
    if (theme === 'auto') {
      theme =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    }
    document.documentElement.dataset.theme = theme;

    // Swap theme color for dark mode
    const darkColor = '#33ff00';
    const lightColor = '#1967d2';

    let themeColor = lightColor;

    if (theme === 'dark') {
      themeColor = darkColor;
    }

    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', themeColor);
  }

  return {
    subscribe,
    set(theme: 'dark' | 'light' | 'auto') {
      saveTheme(theme);
      set(theme);
    },
    init() {
      let theme;

      if ('localStorage' in window) {
        theme = localStorage.getItem('theme') || null;
      }

      if (theme === null) {
        // Swap this back later
        theme = 'light';
        // theme =
        //   window.matchMedia &&
        //   window.matchMedia('(prefers-color-scheme: dark)').matches
        //     ? 'dark'
        //     : 'light';
      }

      set(theme);
      saveTheme(theme);
    },
  };
}

export const theme = createThemeStore();
