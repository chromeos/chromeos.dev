const { defineConfig } = require('vite');
const { eleventyPlugin } = require('vite-plugin-eleventy');

module.exports = defineConfig({
  root: 'src',
  clearScreen: false,
  server: {
    open: true,
  },
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
  plugins: [eleventyPlugin()],
});
