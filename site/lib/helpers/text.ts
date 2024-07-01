import { codeToHtml } from 'shiki';

/**
 * @param {string} code - The code to highlight
 * @param {string} lang - The language to use for highlighting
 * @return {string} The highlighted code
 */
export function highlight(code: string, lang: string): Promise<string> {
  return codeToHtml(code, {
    lang,
    theme: 'monokai',
  });
}
