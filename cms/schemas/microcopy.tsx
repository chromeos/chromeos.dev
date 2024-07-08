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
import { defineField, defineType, defineArrayMember } from 'sanity';
import { preview } from '$lib/previews/localization';

export default defineType({
  name: 'microcopy',
  title: 'Microcopy',
  description: 'Microcopy',
  type: 'document',
  groups: [
    {
      title: 'Network',
      name: 'network',
    },
    {
      title: 'Footer',
      name: 'footer',
    },
    {
      title: 'Identifiers',
      name: 'identifiers',
    },
    {
      title: 'Topics',
      name: 'topics',
    },
    {
      title: 'Actions',
      name: 'actions',
    },
    {
      title: 'Meta',
      name: 'meta',
    },
    {
      title: 'Accessibility',
      name: 'accessibility',
    },
    {
      title: 'Search',
      name: 'search',
    },
    {
      title: 'Pagination',
      name: 'pagination',
    },
    {
      title: 'Releases',
      name: 'releases',
    },
    {
      title: 'RSS',
      name: 'rss',
    },
    {
      title: 'Announcement',
      name: 'announcement',
    },
    {
      title: 'Tutorials',
      name: 'tutorials',
    },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'language',
    }),
    // Title
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Network
    defineField({
      name: 'network',
      title: 'Network',
      type: 'object',
      group: ['network'],
      fields: [
        defineField({
          name: 'notFound',
          title: 'Not Found',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'offline',
          title: 'Offline',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'sw',
          title: 'Service Worker',
          type: 'object',
          fields: [
            defineField({
              name: 'refresh',
              title: 'Refresh',
              type: 'object',
              fields: [
                defineField({
                  name: 'message',
                  title: 'Message',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'action',
                  title: 'Action',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'reload',
              title: 'Reload',
              type: 'object',
              fields: [
                defineField({
                  name: 'message',
                  title: 'Message',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'action',
                  title: 'Action',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Footer
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: ['footer'],
      fields: [
        defineField({
          name: 'subscribe',
          title: 'Subscribe',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            defineType({
              name: 'link',
              title: 'Link',
              type: 'structured-link',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'help',
          title: 'Help',
          type: 'structured-link',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'language',
          title: 'Select Language',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Identifiers
    defineField({
      name: 'identifiers',
      title: 'Identifiers',
      type: 'object',
      group: ['identifiers'],
      fields: [
        defineField({
          name: 'recommended',
          title: 'Recommended',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'resources',
          title: 'Resources',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'featured',
          title: 'Featured',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Topics
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'object',
      group: ['topics'],
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'related',
          title: 'Related',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'section',
          title: 'Section',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Actions
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'object',
      group: ['actions'],
      fields: [
        defineField({
          name: 'add',
          title: 'Add',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'remove',
          title: 'Remove',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'reset',
          title: 'Reset',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'loadVideo',
          title: 'Load Video',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'back',
          title: 'Back',
          type: 'string',
          description: '((a)) - link to previous page',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'more',
          title: 'More',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subscribe',
          title: 'Subscribe',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'required',
          title: 'Required',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'download',
          title: 'Download',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Meta
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'object',
      group: ['meta'],
      fields: [
        defineField({
          name: 'authored',
          title: 'Authored',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'readtime',
          title: 'Reading Time',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'posted',
          title: 'Posted',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'updated',
          title: 'Updated',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'toc',
          title: 'Table of Contents',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'tools',
          title: 'Tools',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'versions',
              title: 'Versions',
              type: 'object',
              fields: [
                defineField({
                  name: 'singular',
                  title: 'Singular',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'plural',
                  title: 'Plural',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Accessibility
    defineField({
      name: 'accessibility',
      title: 'Accessibility',
      type: 'object',
      group: ['accessibility'],
      fields: [
        defineField({
          name: 'skip',
          title: 'Skip',
          type: 'object',
          fields: [
            defineField({
              name: 'content',
              title: 'Content',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'toc',
              title: 'Table of Contents',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'authorAlt',
          title: 'Author Alt',
          type: 'string',
          description: '((a)) - author name',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Search
    defineField({
      name: 'search',
      title: 'Search',
      type: 'object',
      group: ['search'],
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'placeholder',
          title: 'Placeholder',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'error',
          title: 'Error',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'results',
          title: 'Results',
          type: 'string',
          description: '((d)) - number of results; ((q)) - search query',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'toggle',
          title: 'Toggle',
          type: 'object',
          fields: [
            defineField({
              name: 'open',
              title: 'Open',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'close',
              title: 'Close',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'offline',
          title: 'Offline',
          type: 'object',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Enabled',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'warning',
              title: 'Warning',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'unavailable',
              title: 'Unavailable',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'missing',
              title: 'Missing',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    // Pagination
    defineField({
      name: 'pagination',
      title: 'Pagination',
      type: 'object',
      group: ['pagination'],
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'all',
          title: 'All',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'previous',
          title: 'Previous',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'next',
          title: 'Next',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'first',
          title: 'First',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'last',
          title: 'Last',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'current',
          title: 'Current',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'page',
          title: 'Page',
          type: 'string',
          description: '((n)) - current page number',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Releases
    defineField({
      name: 'releases',
      title: 'Releases',
      type: 'object',
      group: ['releases'],
      fields: [
        defineField({
          name: 'releases',
          title: 'Releases',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'notes',
          title: 'Release Notes',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'notesfor',
          title: 'Release Notes for',
          description: '((v)) - Version',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'releasedon',
          title: 'Released on',
          description: '((d)) - Date',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'stable',
          title: 'Stable',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'beta',
          title: 'Beta',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'dev',
          title: 'Dev',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'relative',
          title: 'Relative strings',
          type: 'object',
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: 'expected',
              title: 'Expected',
              description: '((d)) - Date',
              type: 'string',
            }),
            defineField({
              name: 'current',
              title: 'Current',
              description: '((c)) - Channel',
              type: 'string',
            }),
            defineField({
              name: 'next',
              title: 'Next',
              description: '((c)) - Channel',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'lts',
          title: 'Long-term Stable',
          type: 'object',
          fields: [
            defineField({
              name: 'abbr',
              title: 'Abbreviation',
              type: 'string',
            }),
            defineField({
              name: 'full',
              title: 'Full',
              type: 'string',
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ltc',
          title: 'Long-term Stable Candidate',
          type: 'object',
          fields: [
            defineField({
              name: 'abbr',
              title: 'Abbreviation',
              type: 'string',
            }),
            defineField({
              name: 'full',
              title: 'Full',
              type: 'string',
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'channel',
          title: 'Channel',
          type: 'string',
          description: '((c)) - Channel Name',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'also',
          title: 'Also released in',
          type: 'string',
          description: '((v)) - ChromeOS Version',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // RSS
    defineField({
      name: 'rss',
      title: 'RSS',
      type: 'object',
      group: ['rss'],
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Announcement
    defineField({
      name: 'announcement',
      title: 'Announcement',
      type: 'array',
      group: ['announcement'],
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          // Styles let you set what your user can mark up blocks with. These
          // correspond with HTML tags, but you can set any title or value
          // you want and decide how you want to deal with it where you want to
          // use your content.
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          // Marks let you mark up inline text in the block editor.
          marks: {
            // Decorators usually describe a single property – e.g. a typographic
            // preference or highlighting by editors.
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            // Annotations can be any object structure – e.g. a link or a footnote.
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  defineField({
                    title: 'Source',
                    name: 'source',
                    type: 'link',
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),

    // Tutorials
    defineField({
      name: 'tutorials',
      title: 'Tutorials',
      type: 'object',
      group: ['tutorials'],
      fields: [
        defineField({
          name: 'tutorial',
          title: 'Tutorial',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'introduction',
          title: 'Introduction',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'wrapup',
          title: 'Wrap-up',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'tasks',
          title: '((n)) tasks',
          type: 'string',
          description: '((n)) - Task number, as a numeral',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'task',
          title: 'Task ((n))',
          type: 'string',
          description: '((n)) - Task number, as a numeral',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'completed',
          title: '((n)) tasks completed',
          type: 'string',
          description: '((n)) - Task number, as a numeral',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'minutes',
          title: '((n)) minutes',
          type: 'string',
          description: '((n)) - Number of minutes, as a numeral',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'goals',
          title: "What you'll learn",
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'prerequisites',
          title: 'What you should know',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'reinforcement',
          title: 'Your turn',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'learned',
          title: 'What you learned',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'next',
          title: "What's next",
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: preview('title'),
});
