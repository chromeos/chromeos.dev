import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero media',
  description:
    'Primary media to be displayed with this content, either a YouTube video or an image. If both are set, YouTube will be used on stand-alone views, image will be used in preview views.',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'picture',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube Video',
      type: 'youtube',
    }),
  ],
});
