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

const lunr = require('lunr');
const fm = require('front-matter');
const glob = require('glob');
const { readFileSync } = require('fs');

const { baseDir, getSection, getUrlFromPath } = require('../helpers/url');
const { contentPreview } = require('../helpers/clean-markdown');

const path = require('path');

const indexCache = {};
const contentCache = {};

/**
 * Returns a memoized (by language) content array
 *
 * @param {string} lang - Language code to key off of
 * @return {array} Array of content
 */
function getLangContent(lang) {
  if (contentCache[lang]) return contentCache[lang];

  const content = glob.sync(path.join(baseDir, lang, '**/*.md')).map(f => {
    const file = readFileSync(f, 'utf-8');
    const data = fm(file);
    return {
      title: data.attributes.title,
      body: data.body,
      tags: data.attributes.tags,
      attributes: data.attributes,
      section: getSection(f),
      url: getUrlFromPath(f),
    };
  });

  contentCache[lang] = content;

  return content;
}

/**
 * Returns a memoized (by language) search index
 *
 * @param {string} lang - Language code to key off of
 * @return {object} Lunr search index
 */
function getSearchIndex(lang) {
  if (indexCache[lang]) return indexCache[lang];

  const content = getLangContent(lang);

  const idx = lunr(function() {
    // Lunr requires this weird use of `this`, so need to disable linting for these items.
    /* eslint-disable no-invalid-this */
    this.field('title');
    this.field('body');
    this.ref('url');

    for (let i = 0; i < content.length; i++) {
      const c = content[i];
      this.add(c);
    }
    /* eslint-enable no-invalid-this */
  });

  indexCache[lang] = idx;

  return idx;
}

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
  const content = getLangContent(lang);
  const pageSection = getSection(url);

  const results = idx
    .search(title.replace(':', '\\:'))
    .map(i => content.find(j => j.url === i.ref))
    .filter(i => i.url !== getUrlFromPath(url) && i.section !== 'style-guide');

  const related = results.reduce((acc, current) => {
    if (acc.length < 1) {
      acc.push(current);
    }

    if (current.section !== pageSection && acc.findIndex(e => e.section === current.section) < 0 && acc.length < 3) {
      acc.push(current);
    }

    return acc;
  }, []);

  if (related.length < 3) {
    let i = 0;
    while (related.length < results.length && related.length < 3) {
      const item = results[i];
      const url = item.url;
      if (related.findIndex(e => e.url === url) < 0) {
        related.push(item);
      }
      i++;
    }
  }

  return related.map(i => ({
    title: i.title,
    body: contentPreview(i),
    url: i.url,
  }));
}

module.exports = eleventy => {
  eleventy.addFilter('related', related);
};
