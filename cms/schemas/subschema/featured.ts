import { defineType, defineField } from 'sanity';
import { titleValidation } from '$fields/title';
import { descriptionValidation } from '$fields/description';

export default defineType({
  name: 'featured',
  title: 'Featured',
  description:
    'Featured content shows up prominently on the homepage and individual landing pages',
  type: 'object',
  fields: [
    defineField({
      name: 'feature',
      title: 'Feature this content',
      type: 'boolean',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow override',
      type: 'eyebrow',
      hidden: ({ parent }) => (parent?.feature ? false : true),
    }),
    defineField({
      name: 'string',
      title: 'Title override',
      type: 'string',
      validation: titleValidation(),
      hidden: ({ parent }) => (parent?.feature ? false : true),
    }),
    defineField({
      name: 'description',
      title: 'Description override',
      type: 'string',
      validation: descriptionValidation(),
      hidden: ({ parent }) => (parent?.feature ? false : true),
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-action override',
      type: 'string',
      validation: (Rule) => Rule.min(3),
      hidden: ({ parent }) => (parent?.feature ? false : true),
    }),
    defineField({
      name: 'image',
      title: 'Image override',
      type: 'picture',
      hidden: ({ parent }) => (parent?.feature ? false : true),
    }),
  ],
});
