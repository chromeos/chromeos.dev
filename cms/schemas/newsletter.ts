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
import { defineArrayMember, defineField, defineType } from 'sanity';

import { preview } from '$lib/previews/localization';

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  description: 'Newsletter Options',
  type: 'document',
  i18n: true,
  groups: [
    {
      title: 'Fields',
      name: 'fields',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  defineField({
                    title: 'Source',
                    name: 'source',
                    type: 'link',
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'messages',
      title: 'Messages',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'warning',
          title: 'Warning',
          type: 'string',
          description: 'If something goes wrong',
          validation: (Rule) => Rule.required(),
        }),
        defineArrayMember({
          name: 'success',
          title: 'Success',
          type: 'string',
          description: 'When successful.',
          validation: (Rule) => Rule.required(),
        }),
        defineArrayMember({
          name: 'offline',
          title: 'Offline',
          type: 'string',
          description: 'If the user is offline',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'field',
          type: 'field',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: preview('title'),
});
