import type {
  Post,
  Microcopy,
  Documentation,
  Story,
  Landing,
  AppSupport,
  Newsletter,
} from '$types/sanity';
import { useSanityClient } from '@sanity/astro';
import { groupByLanguage, cleanup, buildPath } from '$lib/sanity/helpers';
import {
  linkQuery,
  coreQuery,
  themeQuery,
  featuredQuery,
  coreMetaQuery,
} from '$lib/sanity/queries';
import { rtl, vertical } from '$lib/i18n';
import iso6391 from 'iso-639-1';
import { inspect } from 'util';

let includeDrafts = false;

export const sanity = useSanityClient();

// App Support
export const appSupport = groupByLanguage(
  (
    await sanity.fetch(
      `*[_type == 'app-support' && !(_id in path('drafts.**'))]
  {
    title,
    description,
    cta,
    ${coreMetaQuery}
  }`,
    )
  ).map((a) => a as AppSupport),
  false,
);

// Newsletter Signup
export const newsletter = groupByLanguage(
  (
    await sanity.fetch(
      `*[_type == 'newsletter' && !(_id in path('drafts.**'))]
  {
    title,
    description,
    disclaimer,
    messages,
    fields,
    ${coreMetaQuery}
  }`,
    )
  ).map((a) => a as Newsletter),
  false,
);

// Microcopy
export const microcopy = groupByLanguage(
  (
    await sanity.fetch(
      `*[_type == 'microcopy' && !(_id in path('drafts.**'))]{
      ...,
      'footer': {
        'links': footer.links[] {
          ${linkQuery}
        },
        'language': footer.language,
        'help': footer.help {
          ${linkQuery}
        },
        'subscribe': footer.subscribe,
      },
      'locale': {
        'code': string::split(coalesce(__i18n_lang, 'en_US'), '_')[0],
      },
      ${coreMetaQuery}
    }`,
    )
  ).map((m) => {
    delete m._id;
    delete m._type;
    delete m._rev;
    delete m._createdAt;
    delete m._updatedAt;
    delete m.__i18n_lang;

    // Build locale data
    m.locale.dir = rtl.includes(m.locale.code) ? 'rtl' : 'ltr';
    m.locale.vertical = vertical.includes(m.locale.code);
    m.locale.name = iso6391.getNativeName(m.locale.code);
    return m as Microcopy;
  }),
  false,
);

// Translations
export const cmsLanguages = Object.keys(microcopy);
export const languages = Object.values(microcopy)
  .map((m) => m.locale)
  .sort((a, b) => a.code - b.code);

// Stories
export const stories = (await groq(
  `*[_type == "story"]
  {
    ${coreQuery}
    ${themeQuery}
    'app': {
      'company': app.company,
      'title': app.title,
      'logo': {
        'image': 'cms://' + app.logo.asset._ref,
        'alt': app.logo.alt
      },
    },
    'hero': {
      'image': 'cms://' + hero.image.asset._ref,
      'alt': hero.image.alt
    }
  }`,
  (story) => {
    // console.log(story);
    return story as Story;
  },
)) as Story[];

// Posts
export const posts = (await groq(
  `*[_type == "post"]
  {
    ${coreQuery}
    author[]->{
      name,
      work,
      'image': image.asset
    },
    hero.include == true => {
      'hero': coalesce(
        {
        'youtube': hero.hero.youtube.id,
        },
        {
          'image': hero.hero.image.asset,
          'alt': hero.hero.image.alt,
        }
      )
    },
    ${themeQuery}
    ${featuredQuery}
  }`,
  (post) => {
    if (post.theme.icon?._ref) {
      post.theme.icon = `cms://${post.theme.icon._ref}`;
    }
    // if (post._slug === 'io-2022') {
    //   console.log(post.theme.icon);
    // }

    return post as Post;
  },
)) as Post[];

// Documentation
export const documentation = (await groq(
  `*[_type == "documentation"]
  {
    ${coreQuery}
    ${themeQuery}
    weight,
    software[] {
      min,
      max,
      name,
      url
    }
  }`,
  (doc) => {
    return doc as Documentation;
  },
)) as Documentation[];

// Landing Pages
export const landings = (
  await sanity.fetch(
    `*[_type == 'landing' && !(_id in path('drafts.**'))]
    {
      ${coreQuery}
      banner
    }`,
  )
).map((landing) => {
  delete landing.dates;
  delete landing.tags;
  delete landing.banner._type;

  buildPath(landing);

  if (landing?.banner?.wide?.asset?._ref) {
    landing.banner.wide = `cms://${landing.banner.wide.asset._ref}`;
  }
  if (landing?.banner?.narrow?.asset?._ref) {
    landing.banner.narrow = `cms://${landing.banner.narrow.asset._ref}`;
  }

  return landing as Landing;
}) as Landing[];

export const all = [...posts, ...documentation, ...stories, ...landings];

/** ****************
 *
 * Core functions
 *
 *******************/

/**
 * Enable drafts in the Sanity client
 */
export function enableDrafts() {
  includeDrafts = true;
}

/**
 * GROQ callback types
 */
type GroqCallbackReturn = Post | Documentation | Story;
type GroqAsyncCallback = (item: any) => Promise<GroqCallbackReturn>;
type GroqSyncCallback = (item: any) => GroqCallbackReturn;
type GroqCallback = GroqAsyncCallback | GroqSyncCallback;

/**
 * Queries the Sanity backend based on the GROQ query, and applies standard and custom transforms
 * @param {string} query - GROQ query
 * @param {GroqCallback} [cb] - Callback function
 * @return {Post[] | Documentation[] | Story[]}
 */
async function groq(query: string, cb: GroqCallback) {
  if (includeDrafts === false) {
    query = query.replace(/^\*\[/, '*[!(_id in path("drafts.**")) && ');
  }

  const items = await sanity.fetch(query);

  return (
    await Promise.all(
      items.map(async (item) => {
        // Clean up dates
        if (item.dates.published === item.dates.updated) {
          delete item.dates.updated;
        }
        item.dates.published = new Date(item.dates.published);
        if (item.dates.updated) {
          item.dates.updated = new Date(item.dates.updated);
        }

        // Normalize sections
        buildPath(item);
        cleanup(item);

        item = await cb(item);

        return item;
      }),
    )
  ).sort((a, b) => {
    // Sort by date.published
    return b.dates.published - a.dates.published;
  });
}

type StaticPathCallback = {
  params: Record<string, any>;
  props: Record<string, any>;
};

/**
 * Builds Astro static paths based on a callback, and includes the correct microcopy for each language
 * @param {function} cb
 * @return {Promise<StaticPathCallback[]>}
 */
export function buildStaticPaths(
  cb: (lang: string) => Promise<StaticPathCallback>,
) {
  const paths = Object.entries(microcopy).map(async ([lang, m]) => {
    const { params, props } = await cb(lang);

    // const;

    return {
      params: Object.assign(params, {
        lang,
      }),
      props: Object.assign(props, {
        microcopy: m as Microcopy,
      }),
    };
  });

  return Promise.all(paths);
}

// Graveyard

/**
 * Get post
 * @return {object}
 */
export async function getPosts() {
  return groupByLanguage(posts);
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
//   'large': coalesce(theme.backgrounds.background_large.asset, theme.theme->background_large.asset, 'https://chromeos-dev.imgix.net/landings/news/top/banner-' + category-> slug.current + '.svg?auto=format,compress'),
//   'small': coalesce(theme.backgrounds.background_small.asset, theme.theme->background_small.asset, 'https://chromeos-dev.imgix.net/landings/news/banner-' + category-> slug.current + '.svg?auto=format,compress'),
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
  const featured = q.find((post) => post?.featured);

  // const posts = await buildPostsFromAPI(q);
  console.log(inspect(featured, false, null, true));
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
