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
 * Build a string of the name.
 *
 * @param {object} name - Object containing name attributes.
 * @param {string} name.given - Given name of an individual
 * @param {string} [name.family] - Family name of an individual, optional
 * @return {string} String of the complete name.
 */
function name(name) {
  return name.family ? `${name.given} ${name.family}` : `${name.given}`;
}

module.exports = (eleventy) => {
  eleventy.addFilter('name', name);
};
