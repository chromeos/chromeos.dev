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

const config = require('config');
const path = require('path');

const baseDir = path.join(__dirname, '../../', config.folders.source);

/**
 *
 * @param {string} inputPath - Input path or URL
 * @return {string}
 */
function getSection(inputPath) {
  return getUrlFromPath(inputPath).split('/')[2];
}

/**
 *
 * @param {string} inputPath - Input path or URL
 * @return {string}
 */
function getUrlFromPath(inputPath) {
  return inputPath
    .replace(baseDir, '')
    .replace(/(\/index\.md)$/, '')
    .replace(/(\.md)$/, '')
    .replace(/\/$/, '');
}

module.exports = {
  baseDir,
  getSection,
  getUrlFromPath,
};
