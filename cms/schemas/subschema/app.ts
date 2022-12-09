import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'app',
  title: 'App',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'picture',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
