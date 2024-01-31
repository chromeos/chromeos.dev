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
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'comparison-figure',
  title: 'Comparison Figure',
  type: 'object',
  fields: [
    defineField({
      name: 'primary',
      type: 'figure-card',
      title: 'Primary Figure',
    }),
    defineField({
      name: 'secondary',
      type: 'figure-card',
      title: 'Secondary Figure',
    }),
  ],
  preview: {
    select: {
      title: 'primary.caption.text',
      subtitle: 'secondary.caption.text',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
