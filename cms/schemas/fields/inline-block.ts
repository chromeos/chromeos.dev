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
import { defineType, defineArrayMember, defineField } from 'sanity';
import { KBDDecorator } from '$components/KBD';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Inline Block Content',
  name: 'inline-block',
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
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          KBDDecorator,
          { title: 'Code', value: 'code' },
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
          {
            title: 'Abbreviation',
            name: 'abbreviation',
            type: 'object',
            fields: [
              defineField({
                name: 'abbreviation',
                type: 'abbreviation',
              }),
            ],
          },
          {
            title: 'Footnote',
            name: 'footnote',
            type: 'object',
            fields: [
              defineField({
                title: 'Description',
                name: 'description',
                type: 'footnote',
              }),
            ],
          },
        ],
      },
    }),
  ],
});
