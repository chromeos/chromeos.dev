import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        defineField({
          name: 'given',
          title: 'Given name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'family',
          title: 'Family name',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => {
          const { given, family } = doc.name;
          return [given, family].filter((a) => a).join(' ');
        },
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'work',
      title: 'Work',
      type: 'object',
      fields: [
        defineField({
          name: 'company',
          title: 'Company',
          type: 'string',
        }),
        defineField({
          name: 'org',
          title: 'Organization',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      work: 'work',
      media: 'image',
    },
    prepare(selection) {
      const { name, work, media } = selection;
      const title = [name.given, name.family].filter((a) => a).join(' ');
      const company = [work.company, work.org].filter((a) => a).join(' ');
      const subtitle = [work.title, company].filter((a) => a).join(', ');
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
