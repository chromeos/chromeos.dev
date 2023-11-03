import type { Post, Documentation, Story, Landing } from '$types/sanity';
import { all } from '$$sanity';

/**
 *
 * @param {string} id
 * @return {Post | Documentation | Story | Landing}
 */
export function getReference(
  id: string,
): Post | Documentation | Story | Landing {
  return all.find((doc) => doc._id === id);
}
