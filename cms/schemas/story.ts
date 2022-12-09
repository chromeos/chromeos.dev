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
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'story',
  title: 'Partner Story',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'publishing',
      title: 'Publishing',
    },
    {
      name: 'promotion',
      title: 'Promotion',
    },
    {
      name: 'seo_social',
      title: 'SEO & Social',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'title',
      group: ['content', 'seo_social'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: ['content', 'seo_social'],
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'description',
      group: ['content', 'seo_social'],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'tag' },
      validation: (Rule) => Rule.required(),
      group: ['content'],
      options: {
        disableNew: true,
        filter: 'is_story_category == true',
      },
    }),
    defineField({
      name: 'app',
      title: 'App',
      type: 'app',
      group: ['content'],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'hero',
      title: 'Hero media',
      type: 'hero',
      group: ['content'],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'software',
      title: 'Software',
      description:
        'Any software, like Android Studio or Unity, mentioned in the post, and their versions, for easy reference by readers.',
      type: 'software',
      group: ['content'],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      group: 'content',
      type: 'full-block',
      validation: (Rule) => Rule.required(),
    }),

    // Publishing
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'publishing',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'date_overrides',
      title: 'Date overrides',
      description:
        'Override the built-in publish and update dates. Useful for backdating posts.',
      type: 'object',
      group: 'publishing',
      fields: [
        defineField({
          name: 'published',
          title: 'Published on',
          type: 'date',
        }),
        defineField({
          name: 'updated',
          title: 'Updated on',
          type: 'date',
        }),
      ],
    }),

    // Promotion
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'featured',
      group: 'promotion',
    }),

    // SEO & Social
    defineField({
      name: 'share',
      title: 'Share',
      type: 'share',
      group: 'seo_social',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
});
