import type { Tag } from '$types/sanity';
import { documentation, landings, tutorials } from '$lib/sanity';

/**
 * Build documentation sections
 * @param {Tag} category
 * @param {string} lang
 * @return {object[]}
 */
export function buildSection(category: Tag, lang: string = 'en') {
  const sections = documentation
    .filter((d) => d._lang === lang)
    .filter((d) => d.category.slug === category.slug)
    .sort((a, b) => a.title.localeCompare(b.title))
    .sort((a, b) => a.weight - b.weight)
    .map((d) => ({
      title: d.title,
      href: d._path,
    }));

  const landing = landings
    .filter((l) => l._lang === lang)
    .filter((l) => l.category.slug === category.slug)
    .map((l) => ({
      title: l.title,
      href: l._path,
    }));

  return [landing, sections].flat();
}

/**
 * Build documentation tutorials
 * @param {Tag} category
 * @param {string} lang
 * @return {object[] | null}
 */
export function buildTutorials(category: Tag, lang: string = 'en') {
  const tuts = tutorials
    .filter((l) => l._lang === lang)
    .filter((l) => l.category.slug === category.slug)
    .map((l) => ({
      title: l.title,
      href: l._path,
    }));
  return tuts.length > 0 ? tuts : null;
}

/**
 * Build documentation topics
 * @param {string[]} paths Array of paths
 * @return {Object}
 */
export function buildTopics(paths: string[]) {
  return documentation
    .filter((d) => paths.includes(d._path))
    .sort((a, b) => a.title.localeCompare(b.title))
    .sort((a, b) => a.weight - b.weight)
    .map((d) => ({
      title: d.title,
      body: d.description,
      cta: {
        url: d._path,
        text: '',
      },
    }));
}
