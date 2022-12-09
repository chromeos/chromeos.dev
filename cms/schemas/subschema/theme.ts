import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'use_theme',
  title: 'Theme',
  description: 'Custom theme for this content.',
  type: 'object',
  fields: [
    defineField({
      name: 'include',
      title: 'Use a custom theme for this content',
      type: 'boolean',
    }),

    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'reference',
      to: [{ type: 'theme' }],
      hidden: ({ parent }) => (parent?.include ? false : true),
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'backgrounds',
      title: 'Background overrides',
      type: 'backgrounds',
      hidden: ({ parent }) => (parent?.include ? false : true),
    }),
  ],
});
