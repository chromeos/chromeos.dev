import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'banner',
  title: 'Banner media',
  description: 'Banner background images',
  type: 'object',
  fields: [
    defineField({
      name: 'wide',
      title: 'Wide banner image',
      type: 'image',
    }),
    defineField({
      name: 'narrow',
      title: 'Narrow banner image',
      type: 'image',
    }),
  ],
});
