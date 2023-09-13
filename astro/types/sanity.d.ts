import type { BlockSchemaType } from '@sanity/types';

export type Author = {
  name: {
    given: string;
    family: string;
  };
  work: {
    company: string;
    org: string;
    title: string;
  };
  image: string;
};

export type Tag = {
  title: string;
  slug: string;
};

export type Image = {
  image: string;
  alt: string;
};

export type YouTube = {
  youtube: string;
};

export type Hero = YouTube | Image;

export type Post = {
  title: string;
  description: string;
  slug: string;
  body: BlockSchemaType;
  category: Tag;
  author: Author[];
  tags: Tag[];
  hero?: Hero;

  dates: {
    published: Date;
    updated?: Date;
  };
  _type: string;
  _lang: string;
  _section: string;
  _path: string;
};
