import type { CTA, HeroMedia } from '$types/content';
import { buildSectionsFromGlob, metaFromFile } from '$$data';
import { getMicrocopy } from '$$microcopy';

/**
 *
 * @param {AstroMarkdownFile[]} posts - Glob of Markdown files
 * @return {object[]}
 */
export function buildPostsFromGlob(posts) {
  const sections = buildSectionsFromGlob(posts);

  const postMeta = posts
    .map((story) => {
      const { path, lang } = metaFromFile(story.file);
      return {
        path,
        lang,
        ...story.frontmatter,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const langs = Object.keys(sections);

  return langs
    .map((lang) => {
      const posts = postMeta.filter((s) => s.lang === lang);
      const microcopy = getMicrocopy(lang);
      const featuredIndex = posts.findIndex((s) => s?.featured);
      const featured = {
        data: posts[featuredIndex],
      };
      featured.cta = {
        text: microcopy.microcopy.more,
        url: featured.path,
        type: 'link',
        direction: 'forward',
      } as CTA;
      featured.media = {
        url: featured.data.featured.images[0].image,
        alt: featured.data.featured.images[0].alt,
      } as HeroMedia;

      return posts
        .filter((p) => p.path !== featured.path)
        .map((p) => ({
          title: p.title,
          body: p.metadesc,
          cta: {
            text: microcopy.microcopy.more,
            url: p.path,
            type: 'link',
            direction: 'forward',
          },
          eyebrow: {
            text: p?.theme?.eyebrow || p?.tags[0],
            icon: p?.theme?.icon || `ix://icons/eyebrows/${p?.tags[0]}.svg`,
          },
        }))
        .reduce((acc, cur, i) => {
          const chunk = Math.floor(i / 12);
          if (!acc[chunk]) {
            acc[chunk] = [];
          }
          acc[chunk].push(cur);
          return acc;
        }, [])
        .map((chunk, i, a) => ({
          params: {
            lang,
            page: i,
          },
          props: {
            posts: chunk,
            microcopy,
            featured,
            pages: a.length,
          },
        }));
    })
    .flat();
}
