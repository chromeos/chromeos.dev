import { defineType, defineField } from 'sanity';
import { titleValidation } from '$fields/title';
import { descriptionValidation } from '$fields/description';

export default defineType({
  name: 'share',
  title: 'Share overrides',
  description: 'Overrides for social sharing',
  type: 'object',
  fields: [
    defineField({
      name: 'string',
      title: 'Title',
      type: 'string',
      validation: titleValidation(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: descriptionValidation(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'picture',
    }),
  ],
});
