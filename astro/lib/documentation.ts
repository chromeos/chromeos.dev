import type { Tag } from '$types/sanity';
import { documentation, landings } from '$lib/sanity';

/**
 * Build documentation sections
 * @param {Tag} category
 * @return {object}
 */
export function buildSection(category: Tag) {
  const sections = documentation
    .filter((d) => d.category.slug === category.slug)
    .sort((a, b) => a.weight - b.weight)
    .map((d) => ({
      title: d.title,
      href: d._path,
    }));

  const landing = landings
    .filter((l) => l.category.slug === category.slug)
    .map((l) => ({
      title: l.title,
      href: l._path,
    }));

  return [landing, sections].flat();
}
