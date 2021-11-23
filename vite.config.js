/* eslint-env node */
const { defineConfig } = require('vite');
const { eleventyPlugin } = require('vite-plugin-eleventy');
const { imgPlugin } = require('vite-plugin-img');
const { posthtmlPlugin } = require('vite-plugin-posthtml');
const { posthtmlExternalLink } = require('posthtml-external-link');
const path = require('path');

module.exports = defineConfig({
  root: 'src',
  clearScreen: false,
  server: {
    open: true,
  },
  resolve: {
    alias: [
      {
        find: '$toolkit',
        replacement: path.join(__dirname, './node_modules/sass-toolkit/stylesheets/toolkit'),
      },
      {
        find: '$breakpoint',
        replacement: path.join(__dirname, './node_modules/breakpoint-sass/stylesheets/breakpoint'),
      },
    ],
  },
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
  plugins: [eleventyPlugin()],
});
