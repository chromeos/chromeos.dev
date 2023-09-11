import { useSanityClient } from '@sanity/astro';
import { normalizeLang } from '$$data';
import * as path from 'path';
import type { BlockSchemaType } from '@sanity/types';

let includeDrafts = false;

export const sanity = useSanityClient();

/**
 * Enable drafts in the Sanity client
 */
export function enableDrafts() {
  includeDrafts = true;
}

/**
 *
 * @param {string[]} strings
 * @param {*[]} keys
 * @return {any}
 */
async function groq(strings: TemplateStringsArray, ...keys: any[]) {
  let query = strings
    .map((str, i) => {
      str += keys[i] || '';
      return str;
    })
    .join('');

  if (includeDrafts === false) {
    query = query.replace(/^\*\[/, '*[!(_id in path("drafts.**")) && ');
  }

  // Add standard fields
  query = query.replace(
    /}$/g,
    `, _type
    , '_lang': coalesce(__i18n_lang, 'en_US')
    , 'dates': {
      'published': coalesce(date_overrides.published, _createdAt),
      'updated': coalesce(date_overrides.updated, coalesce(date_overrides.published, _updatedAt))
    }}`,
  );

  // Clean up results
  return (await sanity.fetch(query)).map((item) => {
    // Clean up dates
    if (item.dates.published === item.dates.updated) {
      delete item.dates.updated;
    }
    item.dates.published = new Date(item.dates.published);
    if (item.dates.updated) {
      item.dates.updated = new Date(item.dates.updated);
    }

    // Normalize sections
    // TODO: Standardize
    if (item._type === 'post') {
      item._section = 'news';
    }

    // Build path
    // TODO: Standardize
    item._path = path.join(
      '/',
      normalizeLang(item._lang),
      item._section,
      item.slug,
    );
    return item;
  });
}

export const languages = (
  await sanity.fetch(
    `*[_type == 'microcopy' && !(_id in path('drafts.**'))]{__i18n_lang}`,
  )
).map((lang) => lang.__i18n_lang);

export type Postcard = {
  title: string;
  description: string;
  type: string;
  slug: string;
  lang: string;
  category: {
    title: string;
    slug: string;
  };
};

export const microcopy = (
  await sanity.fetch(`*[_type == 'microcopy' && !(_id in path('drafts.**'))]`)
)
  .map((m) => {
    delete m._id;
    delete m._type;
    delete m._rev;
    delete m._createdAt;
    delete m._updatedAt;
    return m;
  })
  .reduce((acc, cur) => {
    acc[cur?.__i18n_lang] = cur;
    return acc;
  }, {});

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

export type Post = {
  title: string;
  description: string;
  body: BlockSchemaType;
  category: Tag;
  author: Author[];
  tags: Tag[];
  slug: string;
  dates: {
    published: Date;
    updated?: Date;
  };
  _type: string;
  _lang: string;
  _section: string;
  _path: string;
};

/**
 * Get post
 * @return {object}
 */
export async function getPosts() {
  const q = (
    await groq`*[_type == "post"]{
      title,
      description,
      body,
      category->{
        title,
        'slug': slug.current
      },
      author[]->{
        name,
        work,
        'image': image.asset->url
      },
      tags[]->{
        title,
        'slug': slug.current
      },
      'slug': slug.current
    }`
  ).map((post) => {
    return post;
  });

  return q;
}

/**
 *
 * @param {string} type
 * @return {string}
 */
export async function getCardData(type: string) {
  // const q = `*[_type == "${type}"  && !(_id in path('drafts.**'))]{title, description, 'type': _type, 'slug': slug.current, 'lang': __i18n_lang, category->{title, 'slug': slug.current}}`;
  // console.log(microcopy);
  const q = await getPosts();

  // const posts = await buildPostsFromAPI(q);
  console.log(q);
  // const cards = (await sanity.fetch(query)).map((card) => {
  //   return card;
  // });
  return '';
}
