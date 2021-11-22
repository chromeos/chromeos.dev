/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const md = require('../markdown');
const stripHTML = require('string-strip-html');
const objectGet = require('lodash.get');

/**
 *
 * @param {string} content - Markdown content to clean
 * @return {string}
 */
function cleanMarkdown(content) {
  const output = stripHTML(md.render(content));

  return output;
}

/**
 *
 * @param {object} content - Markdown content to clean
 * @param {object} content.attributes
 * @param {string} [content.attributes.metadesc] - Metadesc attribute for content
 * @param {string} content.body - Body copy of content
 * @param {number|null} [slice] - Number of characters to slice output to. Defaults to 250
 *
 * @return {string}
 */
function contentPreview(content, slice = 250) {
  const firstParagraph = content.body.slice(0, content.body.search(/\n/));

  const output = objectGet(content, 'attributes.metadesc') || cleanMarkdown(firstParagraph, slice);

  if (slice && output.length >= slice) {
    return output.slice(0, slice) + '…';
  }

  return output;
}

module.exports = {
  cleanMarkdown,
  contentPreview,
};
