/* eslint-env node */
const { defineConfig } = require('vite');
const { eleventyPlugin } = require('vite-plugin-eleventy');
const { posthtmlPlugin } = require('vite-plugin-posthtml');
const { VitePWA: pwaPlugin } = require('vite-plugin-pwa');
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
    proxy: {
      '/search': {
        target: 'http://localhost:5010/cros-staging/us-central1',
        changeOrigin: true,
      },
    },
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
    pwaPlugin({
      manifest: require('./site/manifest.json'),
      srcDir: './',
      filename: 'sw.js',
      strategies: 'injectManifest',
      injectManifest: {
        globPatterns: ['**/*.css', '**/*.js', '_components/**/*.html', 'images/icons/sprite.svg', 'en/index.html', 'index.html', '404.html', '**/404/index.html', 'offline/**/index.html'],
      },
    }),
    //   // imgPlugin(),
    posthtmlPlugin({
      plugins: [posthtmlExternalLink(), postHTMLChromeOSWord, postHTMLLinkIcons, postHTMLRemoveTrailingSlash, postHTMLGoogleStorageImages, postHTMLMissingAttributes],
    }),
  ],
});
