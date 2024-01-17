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
  name: 'tag',
  title: 'Tag',
  type: 'document',

  groups: [
    {
      name: 'tag',
      title: 'Tag',
      default: true,
    },
    {
      name: 'category',
      title: 'Categories',
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
      type: 'string',
      group: 'tag',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'tag',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'tag',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'is_post_category',
      title: 'Is post category',
      type: 'boolean',
      group: 'category',
      readOnly: isL10n,
      hidden: isL10n,
    }),
    defineField({
      name: 'is_story_category',
      title: 'Is story category',
      type: 'boolean',
      group: 'category',
      readOnly: isL10n,
      hidden: isL10n,
    }),
    defineField({
      name: 'is_doc_category',
      title: 'Is documentation category',
      type: 'boolean',
      group: 'category',
      readOnly: isL10n,
      hidden: isL10n,
    }),
  ],
});
