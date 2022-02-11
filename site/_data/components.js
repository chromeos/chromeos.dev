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
/* eslint-env node */

const fs = require('fs');
const path = require('path');
const config = require('config');
const glob = require('glob');

const docsRegex = new RegExp(/(?:<!--\s*?{#)(.*?)(?=#}\s*?-->)/s);
const macroRegex = new RegExp(/{%\s+?macro\s+?(\w*?)\s*?\((.*?)\)/);

module.exports = function () {
  const components = {};
  const basePath = path.join(process.cwd(), config.folders.templates, config.folders.includes);
  const items = glob.sync(path.join(basePath, '**/*.html'));

  for (const component of items) {
    const file = fs.readFileSync(component, 'utf-8');

    const output = {};

    // Test for macro
    if (macroRegex.test(file)) {
      const macroInfo = file.match(macroRegex);
      output.macro = macroInfo[1];
      if (macroInfo[2]) {
        output.arguments = macroInfo[2].split(/,\s*/);
      }
    }

    // Test for docs
    if (docsRegex.test(file)) {
      const docs = file.match(docsRegex)[1];
      output.docs = docs.replace(/^\n|\n$/g, '');
    }

    components[component.replace(basePath, '').substr(1)] = output;
  }

  return components;
};
