import lunr from 'lunr';
import { all } from '$lib/sanity';
import { blocksToText } from '$lib/portabletext';

const searchIndex = {};
const searchPreviews = {};
const searchContent = all
  .map((d) => ({
    title: d.title,
    description: d.description,
    body: blocksToText(d.body),
    href: d._path,
    language: d._langCode,
    section: d._section,
  }))
  .reduce((acc, cur) => {
    if (!acc[cur.language]) {
      acc[cur.language] = [];
    }
    acc[cur.language].push(cur);
    return acc;
  }, {});

for (const [lang, docs] of Object.entries(searchContent)) {
  const index = lunr(function () {
    // Lunr requires this weird use of `this`, so need to disable linting for these items.
    /* eslint-disable no-invalid-this */
    this.field('title');
    this.field('body');
    this.ref('href');
    this.pipeline.remove(lunr.trimmer);
    for (const d of docs) {
      this.add(d);
    }
    /* eslint-enable no-invalid-this */
  });

  const preview = docs.reduce((acc, cur) => {
    acc[cur.href] = {
      title: cur.title,
      metadesc: cur.description,
      section: cur.section,
      href: cur.href,
    };
    return acc;
  }, {});

  searchIndex[lang] = index;
  searchPreviews[lang] = preview;
}

/**
 *
 * @param {string} input - Input to search on
 * @param {string} lang - Language to search in
 * @return {string}
 */
function search(input: string, lang: string) {
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
