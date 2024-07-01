import type {
  Post,
  Microcopy,
  Documentation,
  Story,
  Landing,
  AppSupport,
  Newsletter,
  StoryLanding,
  Navigation,
  // Cookiejar,
  Home,
  Guidelines,
  ReleaseNote,
  ReleaseNotesLanding,
  NewsLanding,
  Tutorial,
} from '../types/sanity';

import 'dotenv/config';
import process from 'process';

import { createClient } from '@sanity/client';
import { groupByLanguage } from '$lib/sanity/helpers';
import {
  linkQuery,
  coreMetaQuery,
  homepageCardQuery,
  twoColumnBodyQuery,
} from '$lib/sanity/queries';
import { rtl, vertical } from '$lib/i18n';
import iso6391 from 'iso-639-1';
import * as content from '$lib/sanity/content';
import { buildGROQ } from '$lib/sanity/functions';

let includeDrafts = false;

export let home;
export let navigation;
export let appSupport;
export let newsletter;
export let storyLandings;
export let newsLandings;
export let microcopy;
export let cmsLanguages;
export let languages;
export let stories;
export let posts;
export let documentation;
export let landings;
export let guidelines: Guidelines[];
export let releaseNotes;
export let releaseNoteLandings;
export let tutorials;

let sanity;

if (process.env.OFFLINE) {
  try {
    const archive = await import('$generated/archive.json');
    ({
      home,
      navigation,
      appSupport,
      newsletter,
      storyLandings,
      newsLandings,
      microcopy,
      cmsLanguages,
      languages,
      stories,
      posts,
      documentation,
      landings,
      guidelines,
      releaseNotes,
      releaseNoteLandings,
      tutorials,
    } = archive);
  } catch (e) {
    throw new Error('Archive not available');
  }
} else {
  sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    apiVersion: '2023-10-02',
    useCdn: process.env.NODE_ENV === 'production',
  });

  const groq = buildGROQ(sanity, includeDrafts);

  const linkRegex = /^\/{\s*{\s*locale\s*}\s*}\//gm;

  home = (await sanity.fetch(
    `*[_type == 'home' && _id match 'home-*' && !(_id in path('drafts.**'))]
    {
      "chromebook": {
        "title": chromebook.title,
        "copy": chromebook.copy,
        "image": {
          "alt": chromebook.image.alt,
          "image": 'cms://' + chromebook.image.asset._ref
        },
        "cta": {
          "text": chromebook.cta.text,
          "url": chromebook.cta.link.url
        }
      },
      "commercial": {
        "title": commercial.title,
        "copy": commercial.copy,
        "items": commercial.items[] {
          ${homepageCardQuery}
        }
      },
      hero,
      community,
      "linux": {
        "title": linux.content.title,
        "copy": linux.content.copy,
        "cta": {
          "text": linux.cta.text,
          "ref": linux.cta.link.reference._ref
        },
        "images": linux.images[] {
          "alt": alt,
          "image": 'cms://' + asset._ref
        }
      },
      posts,
      "quotes": {
        "title": quotes.title,
        "copy": quotes.copy,
        "items": quotes.items[] {
          quote,
          author,
          "image": {
            "alt": image.alt,
            "image": 'cms://' + image.asset._ref
          }
        }
      },
      "routing": routing.items[] {
        ${homepageCardQuery}
      },
      "stats": {
        "title": stats.content.title,
        "copy": stats.content.copy,
        "items": stats.items[] {
          "stat": statistic.stat,
          "description": statistic.description,
          "source": modifiers.source
        }
      },
      stories,
      subnav,
      "videos": {
        "title": videos.title,
        "items": videos.items[] {
          title,
          "id": video.id,
        }
      },
      ${coreMetaQuery}
    }`,
  )) as Home[];

  // export const cookies = (await sanity.fetch(
  //   `*[_type == 'cookies' && _id match 'cookies-*' && !(_id in path('drafts.**'))]
  //     {
  //       title,
  //       description,
  //       "accept": cta.accept,
  //       "decline": cta.decline,
  //       ${coreMetaQuery}
  //     }
  //     `,
  // )) as Cookiejar[];

  navigation = (
    await sanity.fetch(
      `*[_type == 'nav' && _id match 'nav-*' && !(_id in path('drafts.**'))]
      {
        items[] {
          title,
          section == true => {
            // description,
            sections[] {
              title,
              'url': link,
            }
          },
          section != true => {
            'url': link,
          }
        },
        ${coreMetaQuery}
      }`,
    )
  ).map((a) => {
    const locale = a._langCode;

    // Cleanup
    // console.log(a);
    a.items = a.items.map((item) => {
      if (item.url) {
        item.url = item.url.replace(linkRegex, `/${locale}/`);
      }
      if (item.sections) {
        item.sections = item.sections.map((section) => {
          section.url = section.url.replace(linkRegex, `/${locale}/`);
          return section;
        });
      }
      return item;
    });

    return a as Navigation;
  }) as Navigation[];

  // App Support
  appSupport = groupByLanguage(
    (
      await sanity.fetch(
        `*[_type == 'app-support' && _id match 'app-support-*' && !(_id in path('drafts.**'))]
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
  newsletter = (
    await sanity.fetch(
      `*[_type == 'newsletter' && _id match 'newsletter-*' && !(_id in path('drafts.**'))]
    {
      title,
      description,
      disclaimer,
      messages,
      fields,
      settings,
      ${coreMetaQuery}
    }`,
    )
  ).map((a) => a as Newsletter) as Newsletter[];

  // Story landing page
  storyLandings = (await sanity.fetch(
    `
    *[_type == 'stories' && _id match 'stories-*' && !(_id in path('drafts.**'))]
    {
      title,
      sections[] {
        title,
        description,
        category->{
          title,
          'slug': slug.current
        },
      },
      ${coreMetaQuery}
    }`,
  )) as StoryLanding[];

  newsLandings = (await sanity.fetch(
    `
    *[_type == 'news' && _id match 'news-*' && !(_id in path('drafts.**'))]
    {
      title,
      ${coreMetaQuery}
    }`,
  )) as NewsLanding[];

  // Microcopy
  microcopy = groupByLanguage(
    (
      await sanity.fetch(
        `*[_type == 'microcopy' && _id match 'microcopy-*' && !(_id in path('drafts.**'))]{
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
          'code': string::split(coalesce(language, 'en'), '_')[0],
        },
        ${coreMetaQuery}
      }`,
      )
    ).map((m) => {
      // console.log(m);
      delete m._id;
      delete m._type;
      delete m._rev;
      delete m._createdAt;
      delete m._updatedAt;
      delete m.language;

      // Build locale data
      m.locale.dir = rtl.includes(m.locale.code) ? 'rtl' : 'ltr';
      m.locale.vertical = vertical.includes(m.locale.code);
      m.locale.name = iso6391.getNativeName(m.locale.code);
      return m as Microcopy;
    }),
    false,
  );

  // Translations
  cmsLanguages = Object.keys(microcopy);
  languages = Object.values(microcopy)
    .map((m) => m.locale)
    .sort((a, b) => a.code - b.code);

  // Stories
  stories = (await groq(
    `*[_type == "story"]
    {
      ${content.stories.query}
    }`,
    content.stories.fn,
  )) as Story[];

  // Posts
  posts = (await groq(
    `*[_type == "post"]
    {
      ${content.posts.query}
    }`,
    content.posts.fn,
  )) as Post[];

  // Documentation
  documentation = (await groq(
    `*[_type == "documentation"]
    {
      ${content.documentation.query}
    }`,
    content.documentation.fn,
  )) as Documentation[];

  // Landing Pages
  landings = (
    await sanity.fetch(
      `*[_type == 'landing' && !(_id in path('drafts.**'))]
      {
        ${content.landings.query}
      }`,
    )
  ).map(content.landings.fn) as Landing[];

  guidelines = await sanity.fetch(
    `*[_type == 'guidelines' && _id match 'guidelines-*' && !(_id in path('drafts.**'))]
    {
      title,
      share {
        "title": string,
        description,
        "image": {
          "alt": image.alt,
          "src": 'cms://' + image.asset._ref
        },
      },
      "banner": {
        "wide": 'cms://' + banner.wide.asset._ref,
        "narrow": 'cms://' + banner.narrow.asset._ref,
      },
      intro {
        copy,
        cta,
        message,
        "image": {
          "alt": image.alt,
          "image": 'cms://' + image.asset._ref
        },
      },
      guidelines {
        ${twoColumnBodyQuery}
      },
      usage {
        ${twoColumnBodyQuery}
      },
      codegen {
        heading,
        download,
        language,
        type {
          label,
          primary,
          secondary,
          dark,
        },
        attribution,
        fields,
        alt,
      },
      messaging {
        ${twoColumnBodyQuery}
      },
      ${coreMetaQuery}
    }`,
  );

  releaseNoteLandings = (await sanity.fetch(
    `*[_type == 'releases' && !(_id in path('drafts.**'))]
      {
        ${coreMetaQuery}
        title,
        'backgrounds': {
          'large': 'cms://' + backgrounds.background_large.asset._ref,
          'small': 'cms://' + backgrounds.background_small.asset._ref,
        }
      }`,
  )) as ReleaseNotesLanding[];

  releaseNotes = (
    await sanity.fetch(
      `*[_type == 'release' && !(_id in path('drafts.**'))]
      {
        ${content.releaseNotes.query}
      }`,
    )
  ).map(content.releaseNotes.fn) as ReleaseNote[];

  tutorials = (await groq(
    `*[_type == 'tutorial']
      {
        ${content.tutorials.query}
      }`,
    content.tutorials.fn,
  )) as Tutorial[];

  // console.log(tutorials[0]);
}

export const all = [
  ...posts,
  ...documentation,
  ...stories,
  ...landings,
  ...tutorials,
];

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
