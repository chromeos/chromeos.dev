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
import { defineField, defineType, defineArrayMember } from 'sanity';
import { preview } from '$lib/previews/localization';

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  description: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'language',
    }),
    defineField({
      name: 'body',
      title: 'Announcement',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          // Styles let you set what your user can mark up blocks with. These
          // correspond with HTML tags, but you can set any title or value
          // you want and decide how you want to deal with it where you want to
          // use your content.
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          // Marks let you mark up inline text in the block editor.
          marks: {
            // Decorators usually describe a single property – e.g. a typographic
            // preference or highlighting by editors.
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            // Annotations can be any object structure – e.g. a link or a footnote.
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  defineField({
                    title: 'Source',
                    name: 'source',
                    type: 'link',
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: preview('title'),
});
