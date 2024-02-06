/**
 * Copyright 2024 Google LLC
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
  name: 'guidelines',
  title: 'Badge Guidelines',
  description: 'Badge guidelines page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'language',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'heading', // TBD: might not need accent field, making this a string
          title: 'Heading',
          type: 'object',
          fields: [
            defineField({
              name: 'default',
              title: 'Default',
              type: 'string',
            }),
            defineField({
              name: 'accent',
              title: 'Accent',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'copy',
          title: 'Copy',
          type: 'full-block',
        }),
        defineField({
          name: 'cta',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'message',
    }),
    defineField({
      name: 'guidelines',
      title: 'Badge Guidelines',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          title: 'Copy',
          type: 'full-block',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'examples',
          title: 'Examples',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'example',
              title: 'Example',
              type: 'example-media',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'download',
      title: 'Download',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fields',
          title: 'Fields',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'field',
              title: 'Field',
              type: 'field',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'preview',
          title: 'Preview Label',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'codegen',
      title: 'Codegen',
      type: 'object',
      fields: [
        defineField({
          name: 'generate',
          title: 'Generate Label',
          type: 'string',
        }),
        defineField({
          name: 'fields',
          title: 'Fields',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'field',
              title: 'Field',
              type: 'field',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'messaging',
      title: 'Messaging Guidelines',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          title: 'Copy',
          type: 'full-block',
        }),
        defineField({
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'figure',
              title: 'Card',
              type: 'figure-card',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ux',
      title: 'UX Guidelines',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          title: 'Copy',
          type: 'full-block',
        }),
      ],
    }),
  ],
  preview: preview('Homepage'),
});
