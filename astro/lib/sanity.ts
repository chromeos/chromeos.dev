import { useSanityClient } from '@sanity/astro';
import { normalizeLang } from '$$data';
import * as path from 'path';
import { inspect } from 'util';

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
    `_type,
    '_lang': coalesce(__i18n_lang, 'en_US'),
    'dates': {
      'published': coalesce(date_overrides.published, _createdAt),
      'updated': coalesce(date_overrides.updated, date_overrides.published, _updatedAt)
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

/**
 * Microcpy query mixin for GROQ
 * @param {string} lang - Language to pull microcopy from
 * @param {string} property - Property from microcopy to get
 * @return {string} GROQ query for the microcopy item
 */
function groqMicrocopy(lang: string, property: string) {
  return `*[_type == 'microcopy' && !(_id in path('drafts.**')) && (__i18n_lang == ${lang} || __i18n_lang == 'en_US')]{'item': ${property}}[0].item`;
}

/**
 * Get post
 * @return {object}
 */
export async function getPosts() {
  const q = (
    await groq`*[_type == "post"]{
      title,
      description,
      'slug': slug.current,
      // body,
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
      hero.include == true => {
        'hero': coalesce({
          'youtube': hero.hero.youtube,
        }, {
          'image': hero.hero.image.asset->url,
          'alt': hero.hero.image.alt,
        })
      },
      'theme': {
        'icon': coalesce(theme.theme->icon.asset->url, 'https://chromeos-dev.imgix.net/icons/eyebrows/' + category->slug.current + '.svg?auto=format,compress'),
        'slug': coalesce(theme.theme->slug.current, category->slug.current),
        featured.feature == true => {
          'eyebrow': coalesce(
            featured.featured.eyebrow,
            theme.theme->eyebrow,
            ${groqMicrocopy('__i18n_lang', 'identifiers.featured')}
          )
        },
        feature.feature != true => {
          'eyebrow': coalesce(
            theme.theme->eyebrow,
            category->title
          )
        },
        'backgrounds': {
          'large': coalesce(
            theme.backgrounds.background_large.asset->url,
            theme.theme->background_large.asset->url,
            'https://chromeos-dev.imgix.net/landings/news/top/banner-' + category-> slug.current + '.svg?auto=format,compress'
          ),
          'small': coalesce(
            theme.backgrounds.background_small.asset->url,
            theme.theme->background_small.asset->url,
            'https://chromeos-dev.imgix.net/landings/news/banner-' + category-> slug.current + '.svg?auto=format,compress'
          ),
        }
      },
      share,
      featured.feature == true => {
        'featured': {
          'title': coalesce(featured.featured.title, title),
          'description': coalesce(featured.featured.description, description),
          coalesce(featured.featured.image, hero.hero.image) != null => {
            'media': {
              'image': coalesce(featured.featured.image.asset->url, hero.hero.image.asset->url),
              'alt': coalesce(featured.featured.image.alt, hero.hero.image.alt),
            }
          }
        }
      },
    }`
  ).map((post) => {
    return post;
  });

  return q;
}

// 'eyebrow': coalesce(
//   featured.featured.eyebrow,
//   theme.theme->eyebrow,
//   featured.feature == true => {${groqMicrocopy(
//     '__i18n_lang',
//     'identifiers.featured',
//   )}},
//   category->title
// ),
// 'backgrounds': {
//   'large': coalesce(theme.backgrounds.background_large.asset->url, theme.theme->background_large.asset->url, 'https://chromeos-dev.imgix.net/landings/news/top/banner-' + category-> slug.current + '.svg?auto=format,compress'),
//   'small': coalesce(theme.backgrounds.background_small.asset->url, theme.theme->background_small.asset->url, 'https://chromeos-dev.imgix.net/landings/news/banner-' + category-> slug.current + '.svg?auto=format,compress'),
// }

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
  console.log(inspect(q[q.length - 1], false, null, true));
  // const cards = (await sanity.fetch(query)).map((card) => {
  //   return card;
  // });
  return '';
}

/**
// COMPUTED DATA

// Featured
eyebrow: featured.eyebrow, theme.eyebrow, microcopy.featured.eyebrow
title: featured.title. title
description: featured.description, description
cta: {
  text: microcopy.more
  url: page.url
}
media: featured.images, hero, theme, category


 */
