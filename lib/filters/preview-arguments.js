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
 *
 * @param {object} args - Available arguments
 * @param {object} params - Expected parameters
 * @return {array} Array of arguments per parameter.
 */
function previewArguments(args, params) {
  const paramNames = params.map(p => p.match(/(\w*)/)[0]);
  const output = [];
  for (const [i, v] of paramNames.entries()) {
    output[i] = args ? args[v] : null;
  }

  return output;
}

module.exports = eleventy => {
  eleventy.addFilter('previewArguments', previewArguments);
};
