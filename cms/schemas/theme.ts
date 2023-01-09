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
  name: 'theme',
  title: 'Theme',
  description: 'Custom post theme',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
    }),
    defineField({
      name: 'backgrounds',
      title: 'Background images',
      type: 'backgrounds',
    }),
  ],
  preview: {
    select: {
      slug: 'slug',
      eyebrow: 'eyebrow',
      media: 'icon',
    },
    prepare({ slug, eyebrow, media }) {
      const preview = {};
      if (eyebrow) {
        preview.subtitle = slug.current;
        preview.title = eyebrow;
      } else {
        preview.title = slug.current;
      }

      if (media) {
        preview.media = media;
      }
      return preview;
    },
  },
});
