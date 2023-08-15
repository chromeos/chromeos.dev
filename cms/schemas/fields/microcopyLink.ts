import { defineField } from 'sanity';

export const microcopyLink = {
  name: 'link',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
};
