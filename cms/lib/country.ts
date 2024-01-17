/**
 * Translates 'en_US' to 🇺🇸, 'es' to 🇪🇸, etc…
 *
 * @param {string} lang An IETF-compatible language code
 * @return {string} A flag emoji
 */
export function langToFlag(lang: string): string {
  if (!lang) {
    throw new Error('Language is required');
  }

  if (lang === 'en') lang = 'en_US';

  const separator = lang.indexOf('-') > -1 ? '-' : '_';

  return Array.from(lang.split(separator).pop() as string)
    .map((l) => String.fromCodePoint(l.toLowerCase().charCodeAt(0) + 127365))
    .join('');
}
