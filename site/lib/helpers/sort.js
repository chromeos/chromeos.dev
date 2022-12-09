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

/**
 *
 * @param {object} input
 * @param {string|object} input.prop - Property to sort by
 * @param {string} input.[prop.default] - Default property to sort by
 * @param {string} input.[prop.fallback] - Fallback property if default not found
 * @param {*} input.fallback - Fallback value, if desired
 * @param {boolean} input.lowercase - Whether to lowercase the prop before sorting
 *
 * @return {function} - Sort function
 */
const propSort = ({ prop, fallback, lowercase } = {}) => {
  /**
   * @param {object} a - First item to be sorted
   * @param {object} b - Second item to be sorted
   * @return {-1|1|0} -1 if a<b, 1 if a>b, else 0
   */
  return function sortFunction(a, b) {
    try {
      const aProp = typeof prop === 'string' ? objectGet(a, prop) : objectGet(a, prop.default) || objectGet(a, prop.fallback);
      const bProp = typeof prop === 'string' ? objectGet(b, prop) : objectGet(b, prop.default) || objectGet(b, prop.fallback);

      let aSort = fallback !== null ? aProp || fallback : aProp;
      let bSort = fallback !== null ? bProp || fallback : bProp;

      if (lowercase) {
        aSort = aSort.toLowerCase();
        bSort = bSort.toLowerCase();
      }

      return aSort < bSort ? -1 : aSort > bSort ? 1 : 0;
    } catch (e) {
      return 0;
    }
  };
};

/**
 *
 * Sorts content-like objects, with a `date` property and optionally a `data.updated` property
 * @param {boolean} ascending - Whether to return the list in ascending or descending order
 * @return {function} - Sort function
 */
const dateSort = (ascending = true) => {
  /**
   * @param {object} a - First item to be sorted.
   * @param {object} b - Second item to be sorted
   * @return {-1|1|0} -1 if a<b, 1 if a>b, else 0 when ascending, otherwise reversed
   */
  return function dateSort(a, b) {
    const aProp = new Date(objectGet(a, 'data.updated') || objectGet(a, 'date'));
    const bProp = new Date(objectGet(b, 'data.updated') || objectGet(b, 'date'));

    if (ascending) {
      return aProp < bProp ? -1 : aProp > bProp ? 1 : 0;
    }

    return aProp < bProp ? 1 : aProp > bProp ? -1 : 0;
  };
};

module.exports = {
  propSort,
  dateSort,
};
