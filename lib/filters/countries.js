/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const countriesList = require('i18n-iso-countries');
const { propSort } = require('../helpers/sort');

/**
 * get countries list from locale.
 * @param {string} locale - current page locale.
 * @return {Object} Object of contries.
 */
function countries(locale) {
  const data = countriesList.getNames(locale);
  return Object.keys(data)
    .map(i => ({ code: i, name: data[i] }))
    .sort(propSort({ prop: 'name', lowercase: true }));
}

module.exports = eleventy => {
  eleventy.addFilter('countries', countries);
};
