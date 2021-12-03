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
const pluginTOC = require('eleventy-plugin-nesting-toc');
const plugini18n = require('eleventy-plugin-i18n-helpers');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const discoverPlugins = require('./lib/helpers/discover-plugins');
const markdown = require('./lib/markdown');
const path = require('path');
const { folders } = require('config');

module.exports = function(eleventy) {
  eleventy.setLibrary('md', markdown);

  // Filters
  discoverPlugins('filters', eleventy);

  //Plugins
  eleventy.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapperClass: 'toc__nav',
  });
  eleventy.addPlugin(syntaxHighlight);
  eleventy.addPlugin(plugini18n, {
    defaultLocale: 'en',
    contentRoot: './src',
  });

  // Collections
  discoverPlugins('collections', eleventy);

  eleventy.setDataDeepMerge(true);

  const dir = {
    input: folders.source,
    output: folders.source,
    includes: folders.includes,
    layouts: folders.layouts,
  };

  return {
    dir,
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateEngineOverride: 'njk',
  };
};
