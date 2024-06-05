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
import { isL10n } from '$lib/validators/i18n';
import { preview } from '$lib/previews/localization';
import { toPlainText } from '@portabletext/react';

export default defineType({
  name: 'tutorial',
  title: 'Tutorial',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'publishing',
      title: 'Publishing',
    },
    {
      name: 'promotion',
      title: 'Promotion',
    },
    {
      name: 'seo_social',
      title: 'SEO & Social',
    },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'language',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'title',
      group: ['content', 'seo_social'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'l10n-slug',
      group: ['content', 'seo_social'],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'description',
      group: ['content', 'seo_social'],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'tag' },
      validation: (Rule) => Rule.required(),
      group: ['content'],
      options: {
        disableNew: true,
        filter: 'is_doc_category == true',
      },
      readOnly: isL10n,
      hidden: isL10n,
    }),

    defineField({
      name: 'software',
      title: 'Software',
      description:
        "Any software, like Android Studio or Unity, that's required to complete this tutorial",
      type: 'software',
      group: ['content'],
    }),

    defineField({
      name: 'code',
      title: 'Starter Code',
      description:
        'A direct download or repository link for starter code for the repository. Not required but highly recommended.',
      type: 'object',
      group: ['content'],
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'text',
          title: 'Link text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'download',
          title: 'Direct download',
          description:
            "Whether or not this link is a direct download of code (for instance, links to a zip file). Don't check for starter repositories on GitHub, Glitch, etc...",
          type: 'boolean',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // defineField({
    //   name: 'resources',
    //   title: 'Resources',
    //   description:
    //     'Any resources, web.dev or developers.android.com, mentioned in the post for easy reference by readers.',
    //   type: 'resources',
    //   group: ['content'],
    // }),

    // Introduction
    defineField({
      name: 'introduction',
      title: 'Introduction',
      group: 'content',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'body',
          title: 'Body',
          type: 'full-block',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'goals',
          title: 'Learning Goals',
          type: 'array',
          validation: (Rule) => Rule.required().min(2),
          of: [
            defineArrayMember({
              name: 'goal',
              title: 'Goal',
              type: 'object',
              fields: [
                defineField({
                  name: 'goal',
                  type: 'restricted-inline-block',
                }),
              ],
              preview: {
                select: {
                  goal: 'goal',
                },
                prepare(selection) {
                  const { goal } = selection;
                  return {
                    title: toPlainText(goal),
                  };
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'prerequisites',
          title: 'Prerequisites',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'prerequisite',
              title: 'Prerequisite',
              type: 'object',
              fields: [
                defineField({
                  name: 'prerequisite',
                  type: 'restricted-inline-block',
                }),
              ],
              preview: {
                select: {
                  prerequisite: 'prerequisite',
                },
                prepare(selection) {
                  const { prerequisite } = selection;
                  return {
                    title: toPlainText(prerequisite),
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),

    // Tasks
    defineField({
      name: 'tasks',
      title: 'Tasks',
      group: 'content',
      type: 'array',
      validation: (Rule) => Rule.required().min(2),
      of: [
        defineArrayMember({
          name: 'task',
          title: 'Task',
          type: 'object',
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'duration',
              title: 'Estimated duration to complete',
              type: 'number',
              description: 'In minutes',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'introduction',
              type: 'full-block',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'steps',
              title: 'Steps',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                defineArrayMember({
                  name: 'step',
                  title: 'Step',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      type: 'full-block',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'reinforcement',
              title: 'Reinforcement',
              description:
                "List of actions a reader should take, based on the task, to reinforce the learning from its steps. Can draw on previous tasks or stated tutorial prerequisites, and should require stretching the reader's knowledge.",
              type: 'array',
              validation: (Rule) => Rule.required().min(2),
              of: [
                defineArrayMember({
                  name: 'item',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'item',
                      type: 'restricted-inline-block',
                    }),
                  ],
                  preview: {
                    select: {
                      item: 'item',
                    },
                    prepare(selection) {
                      const { item } = selection;
                      return {
                        title: toPlainText(item),
                      };
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Outro
    defineField({
      name: 'completion',
      title: 'Outro',
      group: 'content',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'body',
          title: 'Congratulations',
          type: 'full-block',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'next',
          title: 'Next step',
          type: 'object',
          fields: [
            defineField({
              name: 'next',
              title: 'Introduction',
              type: 'restricted-inline-block',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'steps',
              title: 'Actions',
              type: 'array',
              validation: (Rule) => Rule.required().min(2),
              of: [
                defineArrayMember({
                  name: 'step',
                  title: 'Item',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'step',
                      type: 'restricted-inline-block',
                    }),
                  ],
                  preview: {
                    select: {
                      step: 'step',
                    },
                    prepare(selection) {
                      const { step } = selection;
                      return {
                        title: toPlainText(step),
                      };
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Publishing
    defineField({
      name: 'weight',
      title: 'Weight',
      description:
        'The weight of this post in relation to other posts. Lower weights will be displayed first.',
      type: 'number',
      group: 'publishing',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'publishing',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'date_overrides',
      title: 'Date overrides',
      description:
        'Override the built-in publish and update dates. Useful for backdating posts.',
      type: 'object',
      group: 'publishing',
      fields: [
        defineField({
          name: 'published',
          title: 'Published on',
          type: 'date',
        }),
        defineField({
          name: 'updated',
          title: 'Updated on',
          type: 'date',
        }),
      ],
    }),

    // SEO & Social
    defineField({
      name: 'share',
      title: 'Share',
      type: 'share',
      group: 'seo_social',
    }),
  ],

  preview: preview('title'),
});
