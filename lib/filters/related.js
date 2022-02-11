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

const { getSearchIndex, getSearchContent } = require('../helpers/generate-search-index.js');

const { getSection, getUrlFromPath } = require('../helpers/url');
const { contentPreview } = require('../helpers/clean-markdown');

/**
 *
 * @param {string} title
 * @param {string} lang
 * @param {string} url
 *
 * @return {object[]}
 */
function related(title, lang, url) {
  const idx = getSearchIndex(lang);
  const content = getSearchContent(lang);
  const pageSection = getSection(url);

  const results = idx
    .search(title.replace(':', '\\:'))
    .map((i) => content.find((j) => j.href === i.ref))
    .filter((i) => i.href !== getUrlFromPath(url) && i.section !== 'style-guide');

  const related = results.reduce((acc, cur) => {
    if (acc.length < 1) {
      acc.push(cur);
    }
    if (cur.section !== pageSection && acc.findIndex((e) => e.section === cur.section) < 0 && acc.length < 3) {
      acc.push(cur);
    }

    return acc;
  }, []);

  if (related.length < 3) {
    let i = 0;
    while (related.length < results.length && related.length < 3) {
      const item = results[i];
      const url = item.href;
      if (related.findIndex((e) => e.href === url) < 0) {
        related.push(item);
      }
      i++;
    }
  }

  return related.map((i) => ({
    title: i.title,
    body: contentPreview(i),
    url: i.href,
  }));
}

module.exports = (eleventy) => {
  eleventy.addFilter('related', related);
};
