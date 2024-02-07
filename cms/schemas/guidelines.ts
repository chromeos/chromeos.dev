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
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo_social',
      title: 'SEO & Social',
    },
  ],
  fields: [
    defineField({
      name: 'share',
      title: 'Share',
      type: 'share',
      group: 'seo_social',
    }),
    defineField({
      name: 'language',
      type: 'language',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'title',
      group: ['content', 'seo_social'],
    }),
    defineField({
      name: 'background',
      title: 'Hero background pattern',
      type: 'image',
      group: ['content'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'object',
      group: ['content'],
      fields: [
        defineField({
          name: 'copy',
          title: 'Copy',
          type: 'full-block',
        }),
        defineField({
          name: 'cta',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'message',
          title: 'Message',
          type: 'message',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'picture',
        }),
      ],
    }),
    defineField({
      name: 'guidelines',
      title: 'Badge Guidelines',
      type: 'object',
      group: ['content'],
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
      name: 'codegen',
      title: 'Codegen',
      type: 'object',
      group: ['content'],
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'download',
          title: 'Download label',
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
      group: ['content'],
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
          name: 'examples',
          title: 'Examples',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'example',
              title: 'Example',
              type: 'figure-card',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: preview('Homepage'),
});
