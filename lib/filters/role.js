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
/**
 * Build a string of the job role.
 *
 * @param {object} work - Object containing work attributes.
 * @param {string} [work.company] - Company, optional
 * @param {string} [work.org] - Organization inside a company, optional
 * @param {string} [work.title] - Title, optional
 * @return {string} String of the complete name.
 */
function role(work = {}) {
  let results = work.title || '';

  if (work.company || work.org) {
    if (work.title) {
      results += ', ';
    }
    results += work.company || '';

    if (work.company && work.org) {
      results += ' ';
    }
    results += work.org || '';
  }

  return results;
}

module.exports = eleventy => {
  eleventy.addFilter('role', role);
};
