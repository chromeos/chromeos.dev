import { globSync } from 'glob';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { extname, basename } from 'path';

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
