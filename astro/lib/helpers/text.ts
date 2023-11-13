/* eslint-global Prism */
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-scss.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-kotlin.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-groovy.js';

/**
 * @param {string} code - The code to highlight
 * @param {string} lang - The language to use for highlighting
 * @return {string} The highlighted code
 */
export function highlight(code: string, lang: string): string {
  return Prism.highlight(code, Prism.languages[lang], lang);
}
