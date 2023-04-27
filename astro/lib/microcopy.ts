import { globSync } from 'glob';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { extname, basename } from 'path';
import ISO6391 from 'iso-639-1';
const countryCodes = ISO6391.getAllCodes().join('|');

/**
 * Get microcopy
 * @param {string} lang - Microcopy language
 * @return {object} Microcopy object
 */
export function getMicrocopy(lang) {
  return globSync(`./src/microcopy/${lang}**/*`)
    .map((file) => {
      const f = readFileSync(file, 'utf8');
      const ext = extname(file);
      const name = basename(file, ext);
      const result = {
        name,
        body: null,
      };
      if (ext === '.yml') {
        result.body = parse(f);
      } else if (ext === '.json') {
        result.body = JSON.parse(f);
      }
      return result;
    })
    .reduce((acc, cur) => {
      acc[cur.name] = cur.body;
      return acc;
    }, {});
}

/**
 *
 * @return {string[]} List of supported languages
 */
export function getLanguages() {
  return globSync(`./src/markdown/[${countryCodes}]*`)
    .map((f) => ({
      code: basename(f),
      name: ISO6391.getNativeName(basename(f)),
    }))
    .sort((a, b) => {
      if (a.code < b.code) return -1;
      if (a.code > b.code) return 1;
      return 0;
    });
}
