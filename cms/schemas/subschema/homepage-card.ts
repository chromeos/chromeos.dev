import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepage-card',
  title: 'Homepage Card',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'copy',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'image',
      type: 'picture',
    }),
    defineField({
      name: 'cta',
      type: 'cta',
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
              { title: 'Primary', value: 'primary' },
              { title: 'Alt Primary', value: 'primary alt' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Alt Secondary', value: 'secondary alt' },
              { title: 'Tertiary', value: 'tertiary' },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'content.title',
      subtitle: 'content.copy',
      media: 'image',
    },
  },
});
