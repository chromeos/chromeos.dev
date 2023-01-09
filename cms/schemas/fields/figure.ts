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
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'figure',
  title: 'Figure',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'picture',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'inline-block',
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          if (parent?.image?.asset?._ref) {
            if (value?.length > 0) {
              return true;
            }
            return 'A caption is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor',
      type: 'string',
      description: 'Optional unique identifier for the figure',
      // TODO: Add validation to ensure that the anchor is unique
    }),
  ],
});
