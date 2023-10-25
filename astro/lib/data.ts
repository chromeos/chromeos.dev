import slug from 'slugify';

/**
 * Normalizes a language string to the first part of the string
 * @param {string} lang
 * @return {string}
 */
export function normalizeLang(lang: string) {
  return lang?.split('_')[0] || 'en';
}

/**
 *
 * @param {string} str
 * @return {string}
 */
export function slugify(str: string) {
  let s = slug(str, { lower: true, strict: true });
  // If it doesn't start with a valid character, add an underscore
  if (!s.match(/^([a-z]|_)/)) {
    s = `_${s}`;
  }
  return s;
}

/**
 *
 * @param {string} file - Path to file
 * @return {object}
 */
export function metaFromFile(file: string) {
  let path = file.replace(/.*\/markdown\/(.*)\.md/, '$1');
  if (path.endsWith('/index')) {
    path = path.replace(/\/index$/, '');
  }
  const lang = path.split('/')[0];
  const slug = path.split('/').slice(1).join('/');
  const section = slug.split('/')[0];

  return {
    path,
    slug,
    lang,
    section,
  };
}

/**
 *
 * @param {AstroMarkdownFile[]} glob - Glob of Markdown files
 * @param {boolean} meta - Whether to include meta in the sections
 * @return {object}
 */
export function buildSectionsFromGlob(glob, meta = false) {
  return glob
    .map((article) => {
      const { lang, slug, path, section } = metaFromFile(article.file);
      const results = {
        lang,
        section,
        slug,
        path,
        weight: article?.frontmatter?.weight || 0,
        title: article?.frontmatter?.title || '',
      };
      if (meta) {
        results.meta = article.frontmatter;
      }
      return results;
    })
    .sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    })
    .sort((a, b) => a.weight - b.weight)
    .reduce((acc, cur) => {
      if (!acc[cur.lang]) {
        acc[cur.lang] = {};
      }
      if (!acc[cur.lang][cur.section]) {
        acc[cur.lang][cur.section] = [];
      }

      const item = {
        title: cur.title,
        href: `/${cur.path}`,
      };

      if (meta) {
        item.meta = cur.meta;
      }

      acc[cur.lang][cur.section].push(item);

      return acc;
    }, {});
}
