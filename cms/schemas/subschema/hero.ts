import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero media',
  description:
    'Primary media to be displayed with this content, either a YouTube video or an image.',
  type: 'object',
  fields: [
    defineField({
      name: 'include',
      title: 'Include hero media for this content',
      type: 'boolean',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'picture',
      hidden: ({ parent }) => (parent?.include ? false : true),
      readOnly: ({ parent }) => (parent?.youtube ? true : false),
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube ID',
      type: 'string',
      hidden: ({ parent }) => (parent?.include ? false : true),
      readOnly: ({ parent }) =>
        parent?.image?.alt || parent?.image?.asset?._ref ? true : false,
      validation: (Rule) =>
        Rule.regex(/^[a-zA-Z0-9_-]{11}$/, { name: 'youtube' }).error(
          'Does not match YouTube ID format',
        ),
    }),
  ],
});
