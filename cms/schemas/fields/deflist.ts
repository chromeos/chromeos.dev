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
import { defineType, defineField, defineArrayMember } from 'sanity';
import { KBDDecorator } from '$components/KBD';

export default defineType({
  name: 'deflist',
  title: 'Definition List',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Definitions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'item',
          fields: [
            defineField({
              name: 'term',
              type: 'array',
              of: [
                defineArrayMember({
                  title: 'Block',
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  marks: {
                    decorators: [
                      KBDDecorator,
                      { title: 'Code', value: 'code' },
                    ],
                    annotations: [],
                  },
                  lists: [],
                }),
              ],

              validation: (Rule) =>
                Rule.custom((value, { parent }) => {
                  if (parent?.definition && !value) return 'Term is required';
                  return true;
                }),
            }),
            defineField({
              name: 'definition',
              type: 'inline-block',
              validation: (Rule) =>
                Rule.custom((value, { parent }) => {
                  if (parent?.term && !value) return 'Definition is required';
                  return true;
                }),
            }),
          ],
        }),
      ],
    }),
  ],
});
