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
const tools = require('./definitions/tools');
const resources = require('./definitions/resources');
const hero = require('./definitions/technical-hero');

module.exports = {
  $merge: {
    source: core,
    with: {
      title: 'Technical Article',
      properties: {
        weight: {
          type: 'integer',
          description: 'Weight of article. Lower raises it in lists',
        },
        started: {
          type: 'object',
          description: 'Get started section',
          properties: {
            title: {
              type: 'string',
              description: 'Title to display in get started section',
              minLength: 10,
              maxLength: 50,
            },
            desc: {
              type: 'string',
              description: 'Description of the get started section',
              minLength: 10,
              maxLength: 200,
            },
            cards: {
              type: 'array',
              items: {
                type: 'object',
                required: ['title', 'body'],
                additionalProperties: false,
                properties: {
                  title: {
                    type: 'string',
                    description: 'Get started card title',
                    minLength: 5,
                  },
                  body: {
                    type: 'string',
                    description: 'Get started body content',
                  },
                },
              },
            },
          },
        },
        interest: {
          type: 'object',
          description: 'Interest form content',
          properties: {
            title: {
              type: 'string',
              description: 'Interest form title',
              minLength: 10,
              maxLength: 50,
            },
            body: {
              type: 'string',
              description: 'Interest form description',
              minLength: 10,
              maxLength: 350,
            },
            cta: {
              type: 'object',
              description: 'Interest form call to action',
              required: ['url', 'text'],
              additionalProperties: false,
              properties: {
                text: {
                  type: 'string',
                  description: 'Call to action text',
                  minLength: 3,
                },
                url: {
                  type: 'string',
                  format: 'uri-reference',
                  description: 'URL to the form',
                },
              },
            },
          },
        },
        tools: tools.property,
        resources: resources.property,
        hero: hero.property,
      },
      definitions: {
        tools: tools.definition,
        resources: resources.definition,
        'technical-hero': hero.definition,
      },
    },
  },
};
