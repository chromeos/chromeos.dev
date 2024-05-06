import slug from 'slugify';
import { toText } from '$lib/portabletext';

slug.extend({
  '+': 'plus',
});

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
export function slugify(str: string | PortableTextBlock[]) {
  let holder = str;
  if (typeof str !== 'string') {
    holder = toText(str);
  }

  holder = typeof holder === 'string' ? holder : '';

  let s = slug(holder, { lower: true, strict: true });
  // If it doesn't start with a valid character, add an underscore
  if (!s.match(/^([a-z]|_)/)) {
    s = `_${s}`;
  }
  return s;
}
