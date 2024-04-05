import type { APIContext, APIRoute } from 'astro';
import rss from '@astrojs/rss';
import {
  posts,
  documentation,
  stories,
  releaseNotes,
  microcopy,
} from '$lib/sanity';

/**
 * Builds paths for news landing page
 */
export async function getStaticPaths() {
  return [
    {
      params: {
        lang: 'en',
      },
    },
  ];
}

/**
 *
 * @param {APIContext} context
 * @return {XMLDocument}
 */
export const GET: APIRoute = (context: APIContext) => {
  const { lang } = context.params;
  const mc = microcopy[lang];
  const content = [...posts, ...documentation, ...stories]
    .filter((post) => post._langCode === lang)
    .map((post) => {
      return {
        title: post.title,
        description: post.description,
        link: post._path,
        pubDate: post.dates.published,
        customData: `<category>${post._type}</category>`, // TODO: i18n
      };
    });
  const releases = releaseNotes
    .filter((release) => release._langCode === lang)
    .map((release) => {
      return {
        title: mc.releases.notesfor.replace(
          '((v))',
          'ChromeOS ' + release.version,
        ),
        description: release.overview,
        link: release._path,
        pubDate: new Date(release.stable),
        customData: `<category>${release._type}</category>`,
      };
    });

  const items = [...content, ...releases].sort((a, b) => b.pubDate - a.pubDate);
  return rss({
    title: mc.rss.title,
    description: mc.rss.description,
    site: context.site + lang,
    items,
    customData: `<language>${lang}</language>`,
  });
};
