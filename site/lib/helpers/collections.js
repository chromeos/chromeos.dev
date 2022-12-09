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

const objectGet = require('lodash.get');
const { propSort } = require('./sort');
const { folders } = require('config');
const site = require(`../../${folders.source}/_data/site`);

/**
 *
 * @param {string} filter - Object path to search against to filter
 * @param {string|number|boolean} target - Value filter should equal
 * @return {function}
 */
function filteredCollection(filter, target) {
  return function weightSortedLocaleCollection(lang) {
    return (collection) =>
      collection
        .getAll()
        .filter((item) => objectGet(item, filter) === target)
        .filter((item) => item.data.locale.code === lang)
        // Sort Alphabetically
        .sort(propSort({ prop: 'data.title', lowercase: true }))
        // Sort by Weight
        .sort(propSort({ prop: 'data.weight', fallback: 0 }));
  };
}

/**
 *
 * @param {string} filter - Object path to search against to filter
 * @param {Object} target - Value filter should equal
 * @return {function}
 */
function filteredFeaturedCollection(filter, target) {
  return function featuredLocaleCollection(lang) {
    return (collection) =>
      collection
        .getAll()
        .filter((item) => objectGet(item, filter) === target)
        .filter((item) => objectGet(item, 'data.featured', false))
        .filter((item) => item.data.locale.code === lang);
  };
}

/**
 *
 * @param {string} name - Name of the overarching collection
 * @param {string[]} sections - Array of string corresponding to `section` metadata to search against
 * @param {object} eleventy - Eleventy object
 */
function addSectionCollections(name, sections, eleventy) {
  const fnSections = sections.map((item) => filteredCollection('data.section', item));
  const fnFeatSections = sections.map((item) => filteredFeaturedCollection('data.section', item));

  const all = (lang) => {
    return function localAllCollection(collection) {
      const collections = fnSections.map((f) => f(lang)(collection));
      return [].concat(collections);
    };
  };

  for (const lang of site().languages) {
    for (const [i, section] of sections.entries()) {
      eleventy.addCollection(`${section}--${lang}`, fnSections[i](lang));
      eleventy.addCollection(`${section}__featured--${lang}`, fnFeatSections[i](lang));
    }
    eleventy.addCollection(`${name}--${lang}`, all(lang));
  }
}

module.exports = {
  filteredCollection,
  addSectionCollections,
};
