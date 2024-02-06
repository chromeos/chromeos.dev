/**
 * Copyright 2023 Google LLC
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
import { isL10n } from '$lib/validators/i18n';

export default defineType({
  name: 'field',
  title: 'Form field',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'name',
      type: 'string',
      readOnly: isL10n,
      hidden: isL10n,
    }),
    defineField({
      name: 'field',
      type: 'object',
      readOnly: isL10n,
      hidden: isL10n,
      fields: [
        defineField({
          name: 'type',
          type: 'string',
          options: {
            list: [
              { title: 'Text', value: 'text' },
              { title: 'Email', value: 'email' },
              { title: 'Checkbox', value: 'checkbox' },
              { title: 'Select', value: 'select' },
              { title: 'Country', value: 'country' },
              { title: 'Hidden', value: 'hidden' },
              { title: 'Submit', value: 'submit' },
              { title: 'Textarea', value: 'textarea' },
            ],
          },
        }),
        defineField({
          name: 'options',
          type: 'array',
          of: [{ type: 'string' }],
          hidden: ({ parent }) => parent?.type !== 'select',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (context.parent?.type !== 'select') {
                return true;
              }
              if (!value || value.length === 0) {
                return 'Select fields must have at least one option';
              }
              return true;
            }),
        }),
      ],
    }),

    defineField({
      name: 'value',
      type: 'string',
    }),
    defineField({
      name: 'required',
      type: 'boolean',
      readOnly: isL10n,
      hidden: isL10n,
    }),
    defineField({
      name: 'error',
      type: 'string',
      description: 'Error message to display if field is invalid',
    }),
  ],
});
