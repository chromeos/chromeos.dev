import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
loadLanguages();

/**
 * @param {string} code - The code to highlight
 * @param {string} lang - The language to use for highlighting
 * @return {string} The highlighted code
 */
export function highlight(code: string, lang: string): string {
  return Prism.highlight(code, Prism.languages[lang], lang);
}
