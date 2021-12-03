/* eslint-env node */
const { defineConfig } = require('vite');
const { eleventyPlugin } = require('vite-plugin-eleventy');
const { posthtmlPlugin } = require('vite-plugin-posthtml');
const { posthtmlExternalLink } = require('posthtml-external-link');
const postHTMLChromeOSWord = require('./lib/transforms/chromeos-word');
const postHTMLLinkIcons = require('./lib/transforms/link-icons');
const postHTMLRemoveTrailingSlash = require('./lib/transforms/remove-trailing-slash');
const postHTMLGoogleStorageImages = require('./lib/transforms/google-storage-images');
const postHTMLMissingAttributes = require('./lib/transforms/missing-attributes');
const path = require('path');

module.exports = defineConfig({
  root: 'site',
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
  plugins: [
    eleventyPlugin(),
    //   // imgPlugin(),
    posthtmlPlugin({
      plugins: [posthtmlExternalLink(), postHTMLChromeOSWord, postHTMLLinkIcons, postHTMLRemoveTrailingSlash, postHTMLGoogleStorageImages, postHTMLMissingAttributes],
    }),
  ],
});
