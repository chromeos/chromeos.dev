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

const fm = require('front-matter');
const { readFileSync, existsSync } = require('fs');
const { folders } = require('config');

const path = require('path');
const base = path.join(process.cwd(), folders.source);

const cache = {};

/**
 *
 * @param {string} url - Page URL to find attribute from
 * @param {string} attr - Frontmatter attribute to retrieve
 * @return {*} - Value of attribute
 */
function attrByURL(url, attr) {
  if (url in cache) {
    return cache[url][attr];
  }

  const file = path.join(base, url);
  let f = false;

  if (existsSync(`${file}.html`)) {
    f = readFileSync(`${file}.html`, 'utf-8');
  } else if (existsSync(`${file}.md`)) {
    f = readFileSync(`${file}.md`, 'utf-8');
  } else if (existsSync(path.join(file, 'index.md'))) {
    f = readFileSync(path.join(file, 'index.md'), 'utf-8');
  } else if (existsSync(path.join(file, 'index.html'))) {
    f = readFileSync(path.join(file, 'index.html'), 'utf-8');
  } else {
    throw new Error(`Cannot determine page source for URL "${url}"`);
  }

  const { attributes } = fm(f);
  cache[url] = attributes;

  return cache[url][attr];
}

module.exports = (eleventy) => {
  eleventy.addFilter('attrByURL', attrByURL);
};
