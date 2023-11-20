import { defineType } from 'sanity';

export default defineType({
  name: 'text-link',
  title: 'Text Link',
  type: 'string',
  description:
    'Link to a page on the site. Must be absolute (start with /) or start with /{{locale}}/',
  validation: (Rule) =>
    Rule.custom((value) => {
      if (value && !value.startsWith('/')) {
        return 'Text link must be absolute (start with /)';
      }

      if (value && value.match(/{\s*{\s*[\w\W]+\s*}\s*}/gm)) {
        if (!value.match(/^\/{\s*{\s*locale\s*}\s*}\//gm)) {
          return 'Text link must be absolute (start with /) or start with /{{locale}}/';
        }
      }

      return true;
    }),
});
