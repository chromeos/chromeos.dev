import * as content from '$lib/sanity/content';
import { cleanup, buildPath } from '$lib/sanity/helpers';
import type { SanityClient } from '@sanity/client';

const fnMap = {
  documentation: content.documentation.fn,
  post: content.posts.fn,
  story: content.stories.fn,
  tutorial: content.tutorials.fn,
  release: content.releaseNotes.fn,
};

/**
 *
 * @param {function} groq - buildGROQ function
 * @param {SanityClient} sanity - Sanity client
 * @return {Promise<Function>}
 */
export function buildPreviewGROQ(groq, sanity: SanityClient) {
  return async function previewGroq(id: string, rev: string) {
    // const { _type: type } = (await sanity.fetch(`${query}{ _type}`))[0];

    const item = (
      await groq(
        `*[_id == '${id}' && _rev == '${rev}']{
        _type == 'documentation' => {
          ${content.documentation.query}
        },
        _type == 'post' => {
          ${content.posts.query}
        },
        _type == 'story' => {
          ${content.stories.query}
        },
        _type == 'tutorial' => {
          ${content.tutorials.query}
        },
        _type == 'release' => {
          ${content.releaseNotes.query}
        },
      }`,
        (i) => {
          const { _type: type } = i;
          if (Object.keys(fnMap).includes(type)) {
            return fnMap[type](i);
          } else {
            return i;
          }
        },
      )
    )[0];

    // console.log(item.intro);

    const microcopy = content.microcopy.fn(
      await sanity.fetch(
        `*[_type == 'microcopy' && (_id match 'microcopy-*' || _id match 'drafts.microcopy-*') && language == '${item._langCode}']{
          ${content.microcopy.query}
        } | order(_updatedAt desc)[0]`,
      ),
    );

    return {
      item,
      microcopy,
    };
  };
}

/**
 * GROQ callback types
 */
type GroqCallbackReturn = Post | Documentation | Story;
type GroqAsyncCallback = (item: any) => Promise<GroqCallbackReturn>;
type GroqSyncCallback = (item: any) => GroqCallbackReturn;
type GroqCallback = GroqAsyncCallback | GroqSyncCallback;

/**
 * Queries the Sanity backend based on the GROQ query, and applies standard and custom transforms
 * @param {SanityClient} sanity - Sanity client
 * @param {boolean} includeDrafts - Whether to include drafts
 * @return {Function}
 */
export function buildGROQ(sanity: SanityClient, includeDrafts: boolean) {
  /**
   * Queries the Sanity backend based on the GROQ query, and applies standard and custom transforms
   * @param {string} query - GROQ query
   * @param {GroqCallback} [cb] - Callback function
   * @return {Post[] | Documentation[] | Story[]}
   */
  return async function groq(query: string, cb: GroqCallback) {
    if (includeDrafts === false) {
      query = query.replace(/^\*\[/, '*[!(_id in path("drafts.**")) && ');
    }

    const items = await sanity.fetch(query);

    return (
      await Promise.all(
        items.map(async (item) => {
          if (item?.dates) {
            // Clean up dates
            if (item.dates.published === item.dates.updated) {
              delete item.dates.updated;
            }
            item.dates.published = new Date(item.dates.published);
            if (item.dates.updated) {
              item.dates.updated = new Date(item.dates.updated);
            }

            // Normalize sections
            buildPath(item);
            cleanup(item);
          }

          item = await cb(item);

          return item;
        }),
      )
    ).sort((a, b) => {
      if (a?.dates) {
        // Sort by date.published
        return b.dates.published - a.dates.published;
      }
      return 0;
    });
  };
}
