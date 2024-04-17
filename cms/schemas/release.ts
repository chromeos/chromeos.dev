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
import { i18nPreview } from '$lib/previews/localization';

export default defineType({
  name: 'release',
  title: 'Release Note',
  type: 'document',

  fields: [
    defineField({
      name: 'language',
      type: 'language',
    }),
    defineField({
      name: 'version',
      title: 'ChromeOS Version',
      type: 'number',
    }),
    defineField({
      name: 'stable',
      title: 'Stable date',
      type: 'date',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Content',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'full-block',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'additional',
      title: 'Additional Content',
      type: 'object',
      fields: [
        defineField({
          name: 'overview',
          title: 'Overview',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'features',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'content',
                  title: 'Content',
                  type: 'restricted-block',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'cta',
      title: 'Keep Up to Date',
      type: 'reference',
      to: { type: 'snippet' },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'version',
      date: 'stable',
      lang: 'language',
    },
    prepare(selection) {
      return i18nPreview(
        `ChromeOS ${selection.title}`,
        selection.lang,
        selection.date?.toLocaleString(),
      );
    },
  },
});
