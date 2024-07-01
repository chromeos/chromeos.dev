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
      type: 'restricted-inline-block',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: preview('title'),
});
