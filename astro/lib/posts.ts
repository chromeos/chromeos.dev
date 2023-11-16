import type { Post, Microcopy } from '$types/sanity';
import { microcopy, posts } from '$lib/sanity';
import { groupByLanguage } from '$lib/sanity/helpers';

export type PostPage = {
  params: {
    lang: string;
    page: number;
  };
  props: {
    featured: Post;
    posts: Post[];
    microcopy: Microcopy;
    pages: number;
  };
};

const itemsPerPage = 12;

/**
 *
 * @param {Number} [page] - Specific page to return
 * @return {PostPage[] | PostPage}
 */
export function buildPostPagination(
  page: number | null = null,
): PostPage[] | PostPage {
  return Object.entries(groupByLanguage(posts))
    .map(([lang, posts]: [string, Array<Post>]) => {
      const featured = posts.find((p) => p.featured);
      const filtered = posts.filter((p) => p._slug !== featured._slug);
      const pages = Math.ceil(filtered.length / itemsPerPage);

      const groups = [];

      for (let i = 0; i < filtered.length; i += itemsPerPage) {
        groups.push(filtered.slice(i, i + itemsPerPage));
      }

      // If a page is specified, return only that page
      if (page !== null) {
        return {
          params: {
            lang: filtered[0]._langCode,
            page: page + 1,
          },
          props: {
            featured,
            posts: groups[page],
            microcopy: microcopy[lang],
            pages: pages,
          },
        };
      }

      // Otherwise return all pages
      return groups.map((group, i) => ({
        params: {
          lang: filtered[0]._langCode,
          page: i + 1,
        },
        props: {
          featured,
          posts: group,
          microcopy: microcopy[lang],
          pages: pages,
        },
      }));
    })
    .flat();
}
