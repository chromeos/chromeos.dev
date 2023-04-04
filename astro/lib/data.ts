/**
 *
 * @param {string} file - Path to file
 * @return {object}
 */
export function metaFromFile(file: string) {
  const path = file.replace(/.*\/markdown\/(.*)\.md/, '$1');
  const lang = path.split('/')[0];
  let slug = path.split('/').slice(1).join('/');
  if (slug.endsWith('/index')) {
    slug = slug.replace(/\/index$/, '');
  }
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
 * @return {object}
 */
export function buildSectionsFromGlob(glob) {
  return glob
    .map((article) => {
      const { lang, slug, path, section } = metaFromFile(article.file);
      return {
        lang,
        section,
        slug,
        path,
        weight: article?.frontmatter?.weight || 0,
        title: article?.frontmatter?.title || '',
      };
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
      acc[cur.lang][cur.section].push({
        title: cur.title,
        href: `/${cur.path}`,
      });
      return acc;
    }, {});
}
