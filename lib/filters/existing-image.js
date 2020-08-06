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
const exists = require('../helpers/exists');
/**
 * Check if the image exist in images folder.
 *
 * @param {string} imagePath - Image location in the images folder.
 * @return {boolean} - Boolean value if image exist.
 */
function existingImage(imagePath) {
  return exists(path.join(__dirname, '../../src/images', imagePath));
}

module.exports = eleventy => {
  eleventy.addFilter('existingImage', existingImage);
};
