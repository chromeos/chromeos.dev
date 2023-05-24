import lunr from 'lunr';
import { globSync } from 'glob';
import ISO6391 from 'iso-639-1';
import fm from 'front-matter';
import { readFileSync } from 'fs';
import { renderMarkdown } from './markdown';

const searchIndex = {};
let searchContent = {};
const searchPreviews = {};
const countryCodes = ISO6391.getAllCodes().join('|');

/**
 *
 * @param {string} input
 * @return {string}
 */
export function getURLFromPath(input) {
  return input
    .replace('src/markdown/', '')
    .replace(/(\/index\.md)$/, '')
    .replace(/(\.md)$/, '')
    .replace(/\/$/, '');
}

/**
 * Generate search index
 */
export async function generateSearchIndex() {
  const glob = globSync('src/markdown/**/*.md');
  const content = await Promise.all(
    glob.map(async (f) => {
      const file = readFileSync(f, 'utf8');
      const { attributes, body } = fm(file);
      const { content } = await renderMarkdown(body);
      const href = getURLFromPath(f);
      return {
        title: attributes.title,
        tags: attributes.tags?.map((t) => t.replace(/\s/g, '%%').toLowerCase()),
        metadesc: attributes.metadesc,
        attributes,
        section: href.split('/')[1],
        href: `/${href}`,
        path: f,
        body: content,
        lang: href.split('/')[0].match(countryCodes)
          ? href.split('/')[0]
          : 'en',
      };
    }),
  );

  searchContent = content.reduce((acc, cur) => {
    if (!acc[cur.lang]) {
      acc[cur.lang] = [];
    }
    acc[cur.lang].push(cur);
    return acc;
  }, {});

  for (const [lang, docs] of Object.entries(searchContent)) {
    const index = lunr(function () {
      // Lunr requires this weird use of `this`, so need to disable linting for these items.
      /* eslint-disable no-invalid-this */
      this.field('title');
      this.field('body');
      this.field('tags');
      this.ref('href');
      this.pipeline.remove(lunr.trimmer);
      docs.forEach((doc) => {
        this.add(doc);
      });
      /* eslint-enable no-invalid-this */
    });

    const preview = docs.reduce((acc, cur) => {
      acc[cur.href] = {
        title: cur.title,
        tags: cur.tags?.map((t) => t.replace(/%%/g, ' ').toLowerCase()),
        metadesc: cur.metadesc,
        section: cur.section,
        href: cur.href,
      };
      return acc;
    }, {});

    searchIndex[lang] = index;
    searchPreviews[lang] = preview;
  }
}

await generateSearchIndex();

/**
 *
 * @param {string} input - Input to search on
 * @param {string} lang - Language to search in
 * @return {string}
 */
export function search(input: string, lang: string) {
  const query = input.replace(/:/g, ' ');
  return searchIndex[lang]
    ? searchIndex[lang].search(query).map((f) => searchPreviews[lang][f.ref])
    : [];
}

/**
 *
 * @param {string} title
 * @param {string} lang
 * @param {string} url
 * @return {Array<Object>}
 */
export function findRelated(title: string, lang: string, url: string) {
  const found = search(title, lang).filter((item) => item.href !== url);
  const related = found.filter(
    (v, i, s) => i === s.findIndex((t) => t.section === v.section),
  );

  // Pad related items after initial filtering
  while (related.length < 3 && found.length > 0) {
    const item = found.shift();
    if (!related.find((v) => v.href === item.href)) {
      related.push(item);
    }
  }

  // Limit to 3 items
  if (related.length > 3) {
    return related.slice(0, 3);
  }

  return related;
}
