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
 * @param {string} url - Url to add localization
 * @param {string} localeCode - Localization code
 * @return {string} - Url with localization
 */
function localizationUrl(url, localeCode) {
  const newUrl = new URL(url);
  newUrl.searchParams.append('hl', localeCode);
  return newUrl;
}

module.exports = (eleventy) => {
  eleventy.addFilter('localizationUrl', localizationUrl);
};
