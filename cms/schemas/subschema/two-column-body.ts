/**
 * Copyright 2024 Google LLC
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

export default defineType({
  name: 'two-column-body',
  title: 'Two-Column Body',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'full-block',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'examples',
      title: 'Examples',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'example',
          title: 'Example',
          type: 'example-media',
        }),
      ],
    }),
  ],
});
