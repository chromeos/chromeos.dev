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

const clone = require('lodash.clonedeep');

const core = clone(require('./core'));
const tags = require('./definitions/tags');
const hero = require('./definitions/hero');
const featured = require('./definitions/featured');
const theme = require('./definitions/theme');
const tools = require('./definitions/tools');

module.exports = {
  $merge: {
    source: core,
    with: {
      title: 'Blog Post',
      required: core.required.concat(['authors']),
      properties: {
        title: {
          maxLength: 125,
        },
        authors: {
          type: 'array',
          description: 'Authors of the article',
          items: {
            type: 'string',
          },
        },
        tags: {
          type: 'array',
          items: [
            {
              type: 'string',
              description: "Blog posts are required to have one of these tags as their first tag: base os, android, web, games, event, announcement, leader's corner.",
              enum: tags.blog.concat(tags.blog_es),
            },
            {
              type: 'string',
              description: 'Taxonomy terms that relate this content to other content',
              enum: Object.keys(tags.all).concat(Object.keys(tags.all_es)),
            },
          ],
          uniqueItems: true,
          minItems: 1,
        },
        featured: featured.property,
        theme: theme.property,
        hero: hero.property,
        tools: tools.property,
      },
      definitions: {
        featured: featured.definition,
        theme: theme.definition,
        hero: hero.definition,
        tools: tools.definition,
      },
    },
  },
};
