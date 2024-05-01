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
import { defineField, defineType } from 'sanity';
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
      name: 'banner',
      title: 'Banner',
      type: 'banner',
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
      title: 'Graphic Standards',
      type: 'two-column-body',
      group: ['content'],
    }),
    defineField({
      name: 'usage',
      title: 'Badge Usage',
      type: 'two-column-body',
      group: ['content'],
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
          title: 'Download CTA',
          type: 'string',
        }),
        defineField({
          name: 'language',
          title: 'Language Selection',
          type: 'string',
        }),
        defineField({
          name: 'type',
          title: 'Badge Type',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'primary',
              title: 'Without border',
              type: 'string',
            }),
            defineField({
              name: 'secondary',
              title: 'With border',
              type: 'string',
            }),
            defineField({
              name: 'dark',
              title: 'Include dark mode?',
              type: 'string',
            }),
          ],
        }),

        defineField({
          name: 'attribution',
          title: 'Attribution',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'copy',
              title: 'Copy',
              type: 'string',
            }),
          ],
        }),

        defineField({
          name: 'fields',
          title: 'Fields',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'ChromeOS App URL',
              type: 'string',
            }),
            defineField({
              name: 'source',
              title: 'UTM Source',
              type: 'string',
            }),
            defineField({
              name: 'campaign',
              title: 'UTM Campaign',
              type: 'string',
            }),
          ],
        }),

        defineField({
          name: 'alt',
          title: 'Badge Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'messaging',
      title: 'Messaging Guidelines',
      type: 'two-column-body',
      group: ['content'],
    }),
    defineField({
      name: 'share',
      title: 'Share',
      type: 'share',
      group: 'seo_social',
    }),
  ],
  preview: preview('title'),
});
