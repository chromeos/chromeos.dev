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
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'reference',
      to: [{ type: 'post' }],
      readOnly: ({ parent }) => (parent?.url ? true : false),
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      readOnly: ({ parent }) => (parent?.reference?._ref ? true : false),
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
});
