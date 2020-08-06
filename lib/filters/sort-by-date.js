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
const { dateSort } = require('../helpers/sort');

/**
 * Sorts the given collection by date. Defaults to descending order (newest first).
 *
 * @param {Array<Object>} collection – A list of articles.
 * @param {boolean=} ascending – True if the collection should be sorted ascending by date. Defaults to false.
 * @return {Array<Object>}
 */
function sortByDate(collection, ascending = false) {
  return collection.sort(dateSort(ascending));
}

module.exports = eleventy => {
  eleventy.addFilter('sortByDate', sortByDate);
};
