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

const markdown = require('static-site-scaffold/lib/11ty/markdown');

const Prism = require('prismjs/components/prism-core');
const components = require('prismjs/components/index');

// Load all components
components();

// custom renderer for fences
markdown.renderer.rules.fence = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  let languageTokenHtml = `<pre class="language-unknown"><code class="language-unknown">${token.content}</code></pre>`;
  if (token.info) {
    token.attrPush([`class`, `language-${token.info}`]);
    languageTokenHtml = `<div><pre ${slf.renderAttrs(token)}><code class="language-${token.info}">${Prism.highlight(token.content, Prism.languages[token.info], token.info)}</code></pre></div>`;
  }
  return languageTokenHtml;
};

markdown.use(require('./stats'));

module.exports = markdown;
