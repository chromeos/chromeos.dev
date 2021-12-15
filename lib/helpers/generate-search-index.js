const lunr = require('lunr');
const glob = require('glob');
const fm = require('front-matter');
const ISO6391 = require('iso-639-1');
const { readFileSync, outputJSONSync } = require('fs-extra');
const path = require('path');
const { cleanMarkdown } = require('./clean-markdown');
const { baseDir, getSection, getUrlFromPath } = require('../helpers/url');

const searchIndex = {};
const searchContent = {};
const countryCodes = ISO6391.getAllCodes().join('|');

/**
 * Builds search index
 */
function generateSearchIndex() {
  const globPath = path.join(baseDir, `@(${countryCodes})/**/*.md`);
  const content = glob
    .sync(globPath)
    .map(f => {
      const file = readFileSync(f, 'utf8');
      const { attributes, body } = fm(file);
      return {
        title: attributes.title,
        tags: attributes.tags,
        metadesc: attributes.metadesc,
        attributes,
        section: getSection(f),
        href: getUrlFromPath(f),
        path: f,
        body: cleanMarkdown(body),
      };
    })
    .reduce((acc, cur) => {
      const lang = path.relative(baseDir, cur.path).split(path.sep)[0];
      if (!acc[lang]) {
        acc[lang] = [];
      }
      acc[lang].push(cur);
      return acc;
    }, {});

  for (const [lang, docs] of Object.entries(content)) {
    const index = lunr(function() {
      // Lunr requires this weird use of `this`, so need to disable linting for these items.
      /* eslint-disable no-invalid-this */
      this.field('title');
      this.field('body');
      this.field('tags');
      this.ref('href');
      this.pipeline.remove(lunr.trimmer);
      docs.forEach(doc => {
        this.add(doc);
      });
      /* eslint-enable no-invalid-this */
    });
    searchIndex[lang] = index;
    searchContent[lang] = docs;

    outputJSONSync(path.join(baseDir, `public/js/index-${lang}.json`), index);
    outputJSONSync(path.join(process.cwd(), `functions/indexes/index-${lang}.json`), index);

    // Build Previews
    const preview = docs.reduce((acc, cur) => {
      acc[cur.href] = {
        title: cur.title,
        tags: cur.tags,
        metadesc: cur.metadesc,
        section: cur.section,
        href: cur.href,
      };
      return acc;
    }, {});
    outputJSONSync(path.join(baseDir, `public/js/preview-${lang}.json`), preview);
    outputJSONSync(path.join(process.cwd(), `functions/indexes/preview-${lang}.json`), preview);
  }
}

const getSearchIndex = lang => searchIndex[lang];
const getSearchContent = lang => searchContent[lang];

module.exports = {
  getSearchIndex,
  getSearchContent,
  generateSearchIndex,
};
