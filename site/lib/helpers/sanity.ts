import type { Content, ContentArray, Microcopy } from '$types/sanity';
import { microcopy, all } from '$$sanity';

/**
 *
 * @param {string} id
 * @return {Content}
 */
export function getReference(id: string): Content {
  return all.find((doc) => doc._id === id);
}

/**
 *
 * @param {ContentArray} items
 * @param {string} param
 * @param {string} prop
 * @return {Object}
 */
export function buildStaticPaths(
  items: ContentArray,
  param: string,
  prop: string,
) {
  return items.map((item) => ({
    params: {
      lang: item._langCode,
      [param]: item._slug,
    },
    props: {
      [prop]: item,
      microcopy: microcopy[item._lang] as Microcopy,
    },
  }));
}
