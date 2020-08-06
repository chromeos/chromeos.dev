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

const path = require('path');
const repo = 'https://github.com/chromeos/chromeos.dev';
const branch = 'trunk';

/**
 *
 * @param {string} inputPath - Path to file in GitHub
 * @return {string}
 */
function githubLink(inputPath) {
  return `${repo}/${path.join('tree', branch, inputPath)}`;
}

module.exports = eleventy => {
  eleventy.addFilter('githubLink', githubLink);
};
