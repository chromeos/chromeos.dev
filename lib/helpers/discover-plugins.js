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

const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} folder - Folder name, relative to `/lib`, to discover modules in.
 * @param {object} eleventy - Eleventy config object
 */
function discoverPlugins(folder, eleventy) {
  const pluginPath = path.join(__dirname, '..', folder);
  fs.readdirSync(pluginPath).forEach(filter => {
    require(path.join(pluginPath, filter))(eleventy);
  });
}

module.exports = discoverPlugins;
