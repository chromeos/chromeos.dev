import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'structured-link',
  title: 'Structured Link',
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
});
