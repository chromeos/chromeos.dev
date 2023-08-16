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
import { StringRule, defineArrayMember, defineField, defineType } from 'sanity';

/**
 *
 * @param {boolean} section
 * @param {string} message
 * @return {CustomValidator<boolean | string> }
 */
function validation(section: boolean, message: string) {
  return (Rule: StringRule) =>
    Rule.custom((value, { parent }) => {
      if (parent.section === section) {
        if (!value) {
          return message;
        }
        return true;
      }

      return true;
    });
}

export default defineType({
  name: 'nav',
  title: 'Navigation',
  type: 'document',
  i18n: true,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'section',
              title: 'Section',
              type: 'boolean',
            }),
            // Section-only elements
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              hidden: ({ parent }) => parent.section !== true,
              validation: (Rule) => validation(true, 'Title is required')(Rule),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              hidden: ({ parent }) => parent.section !== true,
              validation: (Rule) =>
                validation(true, 'Description is required')(Rule),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'object',
              hidden: ({ parent }) => parent.section !== true,
              validation: (Rule) => validation(true, 'Icon is required')(Rule),
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule) =>
                    validation(true, 'Icon name is required')(Rule),
                }),
                defineField({
                  name: 'background',
                  title: 'Background',
                  type: 'string',
                  validation: (Rule) =>
                    validation(true, 'Icon background is required')(Rule),
                }),
              ],
            }),
            defineField({
              name: 'sections',
              title: 'Sections',
              type: 'array',
              hidden: ({ parent }) => parent.section !== true,
              validation: (Rule) =>
                validation(true, 'Sections is required')(Rule),
              of: [
                defineArrayMember({
                  name: 'section',
                  title: 'Section',
                  type: 'structured-link',
                  validation: (Rule) =>
                    validation(true, 'Section is required')(Rule),
                }),
              ],
            }),
            // Regular Links
            defineField({
              name: 'link',
              title: 'Link',
              type: 'structured-link',
              hidden: ({ parent }) => parent.section === true,
              validation: (Rule) => validation(false, 'Link is required')(Rule),
            }),
          ],
        }),
      ],
    }),
  ],
});
