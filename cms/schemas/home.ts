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
import { defineArrayMember, defineField, defineType } from 'sanity';
import { preview } from '$lib/previews/localization';

export default defineType({
  name: 'home',
  title: 'Home',
  description: 'Home page',
  type: 'document',
  i18n: true,
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'heading',
          type: 'object',
          fields: [
            defineField({
              name: 'default',
              type: 'string',
            }),
            defineField({
              name: 'accent',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'copy',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'routing',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'homepage-card',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'linux',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'content',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'copy',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'cta',
          type: 'cta',
        }),
        defineField({
          name: 'images',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'picture',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'stats',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'content',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'copy',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'statistic',
                  type: 'statistic',
                }),
                defineField({
                  name: 'source',
                  type: 'string',
                }),
                defineField({
                  name: 'modifiers',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'shape',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'None', value: 'false' },
                          { title: 'Circle', value: 'circle' },
                          { title: 'Semicircle', value: 'semicircle' },
                          { title: 'Triangle', value: 'triangle' },
                        ],
                      },
                    }),
                    defineField({
                      name: 'scale',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Default', value: 'default' },
                          { title: 'Full', value: 'full' },
                          { title: 'Half', value: 'half' },
                        ],
                      },
                    }),
                    defineField({
                      name: 'source',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'stories',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          type: 'string',
        }),
        defineField({
          name: 'cta',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'posts',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          type: 'string',
        }),
        defineField({
          name: 'cta',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'commercial',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          type: 'string',
        }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'homepage-card',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'quotes',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          type: 'string',
        }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'quote',
                  type: 'string',
                }),
                defineField({
                  name: 'author',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'title',
                      type: 'string',
                    }),
                  ],
                }),
                defineField({
                  name: 'image',
                  type: 'picture',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'community',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'chromebook',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          type: 'string',
        }),
        defineField({
          name: 'cta',
          type: 'cta',
        }),
        defineField({
          name: 'image',
          type: 'picture',
        }),
      ],
    }),
    defineField({
      name: 'subnav',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'copy',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'videos',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                }),
                defineField({
                  name: 'video',
                  type: 'youtube',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: preview('Homepage'),
});
