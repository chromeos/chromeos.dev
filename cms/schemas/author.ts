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
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        defineField({
          name: 'given',
          title: 'Given name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'family',
          title: 'Family name',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => {
          const { given, family } = doc.name;
          return [given, family].filter((a) => a).join(' ');
        },
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'picture',
    }),
    defineField({
      name: 'work',
      title: 'Work',
      type: 'object',
      fields: [
        defineField({
          name: 'company',
          title: 'Company',
          type: 'string',
        }),
        defineField({
          name: 'org',
          title: 'Organization',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      work: 'work',
      media: 'image',
    },
    prepare(selection) {
      const { name, work, media } = selection;
      const title = [name.given, name.family].filter((a) => a).join(' ');
      const company = [work.company, work.org].filter((a) => a).join(' ');
      const subtitle = [work.title, company].filter((a) => a).join(', ');
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
