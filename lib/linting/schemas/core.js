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

const tags = require('./definitions/tags');

module.exports = {
  $id: 'https://chromeos.dev/core.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Core Schema',
  type: 'object',
  required: ['title', 'metadesc', 'date'],
  additionalProperties: false,
  properties: {
    title: {
      type: 'string',
      description: 'Article title',
      minLength: 5,
      maxLength: 115,
    },
    metadesc: {
      type: 'string',
      description: 'Metadesc of article',
      minLength: 35,
      maxLength: 200,
    },
    date: {
      description: 'Date of publication',
      type: 'string',
      format: 'date-time',
    },
    updated: {
      description: 'Date of update',
      type: 'string',
      format: 'date-time',
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
        description: 'Taxonomy terms that relate this content to other content',
        enum: Object.keys(tags.all).concat(Object.keys(tags.all_es)),
      },
      uniqueItems: true,
    },
  },
};
