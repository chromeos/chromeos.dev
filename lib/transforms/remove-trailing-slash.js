/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const replaceAll = require('replaceall');

/**
 * Remove trailing slashes from internal links
 *
 * Steps:
 *   1. Determine if there are internal links
 *   2. Loop over all found links
 *   3. Determine if the pathname in the link ends with a slash
 *   4. If pathname ends in slash, remove the slash, and replace all original instances
 *
 * @param {string} content - Content of page being rendered
 * @return {string} - Transformed content
 */
function removeTrailingSlash(content) {
  // Match all internal links
  const hrefRegex = /href=['"](?!http)(.*?)['"]/gm;

  if (hrefRegex.test(content)) {
    const links = content.match(hrefRegex);

    for (let i = 0; i < links.length; i++) {
      const l = links[i];
      const href = l.slice(6, -1);
      if (href !== '/') {
        const url = href.replace(/\/(\?|#|$)/, '$1');
        if (url !== href) {
          const clean = l.replace(href, url);
          content = replaceAll(l, clean, content);
        }
      }
    }
  }

  return content;
}

module.exports = eleventy => {
  eleventy.addTransform('removeTrailingSlash', removeTrailingSlash);
};
