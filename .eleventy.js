/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const scaffold = require('static-site-scaffold/lib/11ty.config');
const pluginTOC = require('eleventy-plugin-nesting-toc');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const discoverPlugins = require('./lib/helpers/discover-plugins');
const markdown = require('./lib/markdown');
const sync = require('browser-sync');
const gulp = require('gulp');
const gulpfile = require('./gulpfile');
const Spinner = require('cli-spinner').Spinner;

module.exports = function(eleventy) {
  const eleventyConfig = scaffold(eleventy);
  let server = {};
  const spinner = new Spinner('Compiling HTML...');

  eleventy.setLibrary('md', markdown);

  // Filters
  discoverPlugins('filters', eleventy);

  //Plugins
  eleventy.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapperClass: 'toc__nav',
  });
  eleventy.addPlugin(syntaxHighlight);

  // Collections
  discoverPlugins('collections', eleventy);

  // Transforms
  discoverPlugins('transforms', eleventy);

  eleventy.setDataDeepMerge(true);

  // Event Listeners
  eleventy.on('watchInit', () => {
    server = sync.create('server');
    gulp.parallel('dev')();
  });

  eleventy.on('beforeBuild', () => {
    spinner.start();
  });

  eleventy.on('afterBuild', () => {
    spinner.stop();
    if (server.reload) {
      server.reload();
    }
  });

  return eleventyConfig;
};
