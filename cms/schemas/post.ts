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
import { isL10n } from '$lib/validators/i18n';

export default defineType({
  name: 'post',
  title: 'Post',
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
      name: 'slug',
      title: 'Slug',
      type: 'l10n-slug',
      group: ['content', 'seo_social'],
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
        filter: 'is_post_category == true',
      },
      readOnly: isL10n,
      hidden: isL10n,
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
      name: 'author',
      title: 'Author',
      type: 'array',
      group: ['publishing'],
      validation: (Rule) => Rule.required(),
      of: [{ type: 'reference', to: { type: 'author' } }],
      readOnly: isL10n,
      // hidden: isL10n,
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'publishing',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      readOnly: isL10n,
      // hidden: isL10n,
    }),
    defineField({
      name: 'date_overrides',
      title: 'Date overrides',
      description:
        'Override the built-in publish and update dates. Useful for backdating posts.',
      type: 'object',
      group: 'publishing',
      readOnly: isL10n,
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
      name: 'hero',
      title: 'Hero media',
      type: 'object',
      group: ['promotion'],
      fields: [
        defineField({
          name: 'include',
          title: 'Include hero media for this content',
          type: 'boolean',
        }),
        defineField({
          name: 'hero',
          type: 'hero',
          hidden: ({ parent }) => (parent?.include ? false : true),
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'featured',
      group: 'promotion',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'use_theme',
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
      author0: 'author.0.name',
      author1: 'author.1.name',
      author2: 'author.2.name',
      author3: 'author.3.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const author: string = Object.entries(selection)
        .filter(([k, v]) => k.startsWith('author') && v)
        .map(([k, v]) => v.given + ' ' + v.family)
        .join(', ');
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      };
    },
  },
});
