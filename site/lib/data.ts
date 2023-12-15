import slug from 'slugify';

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
export function slugify(str: string) {
  let s = slug(str, { lower: true, strict: true });
  // If it doesn't start with a valid character, add an underscore
  if (!s.match(/^([a-z]|_)/)) {
    s = `_${s}`;
  }
  return s;
}
