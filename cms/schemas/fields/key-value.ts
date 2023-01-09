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
  title: 'Key Value',
  name: 'key-value',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
    }),
    defineField({
      name: 'value',
      type: 'object',
      fields: [
        defineField({
          title: 'Single Value',
          name: 'single',
          type: 'object',
          fields: [
            defineField({
              title: 'String',
              name: 'string',
              type: 'string',
            }),
            defineField({
              title: 'Number',
              name: 'number',
              type: 'number',
            }),
            defineField({
              title: 'Value',
              name: 'boolean',
              type: 'boolean',
            }),
            defineField({
              title: 'Date',
              name: 'date',
              type: 'date',
            }),
            defineField({
              title: 'Datetime',
              name: 'datetime',
              type: 'datetime',
            }),
            defineField({
              title: 'Image',
              name: 'image',
              type: 'picture',
            }),
          ],
        }),

        defineField({
          title: 'Multiple Values',
          name: 'multiple',
          type: 'array',
          of: [
            defineArrayMember({
              title: 'Value',
              type: 'key-value',
            }),
          ],
        }),
      ],
    }),
  ],
});
