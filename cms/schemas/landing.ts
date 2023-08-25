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
  name: 'landing',
  title: 'Landing Page',
  type: 'document',
  i18n: true,
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
      type: 'l10n-slug',
      group: ['seo_social'],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'description',
      group: ['seo_social'],
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
      name: 'banner',
      title: 'Banner',
      type: 'banner',
      group: ['content'],
      validation: (Rule) => Rule.required(),
      readOnly: isL10n,
      hidden: isL10n,
    }),

    defineField({
      name: 'body',
      title: 'Body',
      group: 'content',
      type: 'full-block',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'banner.narrow',
    },
    prepare(selection) {
      return {
        ...selection,
      };
    },
  },
});
