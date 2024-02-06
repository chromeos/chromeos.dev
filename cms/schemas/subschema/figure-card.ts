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
import { colors } from '$lib/colors';
import { iconOptionsList } from '$lib/icons';
import { defineField, defineType } from 'sanity';

type FigureCardCaption = {
  color?: string;
  icon?: string;
  text?: string;
};

export default defineType({
  name: 'figure-card',
  title: 'Figure Card',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'picture',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'object',
      options: {
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'color',
          title: 'Color',
          type: 'string',
          initialValue: 'false',
          options: {
            list: [
              { title: 'None', value: 'false' },
              { title: 'Red', value: colors.red[500].hex },
              { title: 'Green', value: colors.green[800].hex },
            ],
          },
        }),
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          initialValue: 'false',
          options: {
            list: iconOptionsList,
          },
          validation: (Rule) =>
            Rule.custom((value, { parent }) => {
              const parentColor = (parent as FigureCardCaption).color;
              if (!parentColor || parentColor === 'false') return true;
              if (value && value !== 'false') return true;
              return 'An icon is required when a color has been selected.';
            }),
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value, { parent }) => {
              const parentIcon = (parent as FigureCardCaption).icon;
              if (!parentIcon || parentIcon === 'false') return true;
              if (value && value.length > 0) return true;
              return 'A caption is required when an icon has been selected.';
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'caption.text',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
