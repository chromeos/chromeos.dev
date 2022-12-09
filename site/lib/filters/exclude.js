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

const objectGet = require('lodash.get');

/**
 * Filters a sequence of objects by applying a test to the specified attribute of each object, and rejecting the objects with the test succeeding.
 * An implementation of the two argument rejectattr filter.
 * @see https://mozilla.github.io/nunjucks/templating.html#rejectattr-only-the-single-argument-form
 *
 * @param {Array<Object>} collection – A list of articles.
 * @param {string} property – Target property to use.
 * @param {Object} value – Target value to match.
 * @return {Array<Object>}
 */
function exclude(collection, property, value) {
  return collection.filter((item) => !(objectGet(item, property) === value));
}

module.exports = (eleventy) => {
  eleventy.addFilter('exclude', exclude);
};
