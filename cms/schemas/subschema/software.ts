/**
 * Copyright 2022 Google LLC
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
import { defineType, defineArrayMember, defineField } from 'sanity';

export default defineType({
  name: 'software',
  title: 'Software',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'tool',
      title: 'Tool',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          description: 'URL to the tool',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'] }).custom(
              (url, { parent }) => {
                if (parent?.name && (url === undefined || url.length === 0)) {
                  return 'URL is required when including a tool';
                }
                return true;
              },
            ),
        }),
        defineField({
          name: 'min',
          title: 'Minimum supported version',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value, { parent }) => {
              if (parent?.name && (value === undefined || value.length === 0)) {
                return 'Minimum supported version is required when including a tool';
              }
              return true;
            }),
        }),
        defineField({
          name: 'max',
          title: 'Maximum supported version',
          type: 'string',
        }),
      ],
    }),
  ],
});
