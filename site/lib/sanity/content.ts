import type {
  Post,
  Microcopy,
  Documentation,
  Story,
  Landing,
  ReleaseNote,
  Tutorial,
} from '../types/sanity';

import {
  linkQuery,
  coreQuery,
  themeQuery,
  featuredQuery,
  coreMetaQuery,
} from '$lib/sanity/queries';
import { buildPath } from '$lib/sanity/helpers';
import { rtl, vertical } from '$lib/i18n';
import iso6391 from 'iso-639-1';

export const documentation = {
  query: `
    ${coreQuery}
    ${themeQuery}
    weight,
    software[] {
      min,
      max,
      name,
      url
    }`,
  fn: (doc) => {
    return doc as Documentation;
  },
};

export const posts = {
  query: `
    ${coreQuery}
    author[]->{
      name,
      work,
      'image': image.asset
    },
    hero.include == true => {
      'hero': {
        hero.hero.youtube.id != null => {
          'youtube': hero.hero.youtube,
        },
        hero.hero.image != null => {
          'image': {
            'image': 'cms://' + hero.hero.image.asset._ref,
            'alt': hero.hero.image.alt,
          }
        }
      }
    },
    ${themeQuery}
    ${featuredQuery}
  `,
  fn: (post) => {
    if (post.theme.icon?._ref) {
      post.theme.icon = `cms://${post.theme.icon._ref}`;
    }
    return post as Post;
  },
};

export const stories = {
  query: `
    ${coreQuery}
    ${themeQuery}
    ${featuredQuery}
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
  `,
  fn: (story) => {
    // console.log(story);
    return story as Story;
  },
};

export const tutorials = {
  query: `
    ${coreQuery}
    software[] {
      min,
      max,
      name,
      url
    },
    code,
    tasks,
    weight,
    intro,
    outro,
    `,
  fn: (tutorial) => {
    // console.log(tutorial);
    tutorial.intro.goals = tutorial.intro.goals.map((g) => g.goal);
    if (tutorial.intro.prerequisite) {
      tutorial.intro.prerequisites = tutorial.intro.prerequisites.map(
        (p) => p.prerequisite,
      );
    }

    tutorial.tasks = tutorial.tasks.map((t) => {
      delete t._type;
      delete t._key;
      t.reinforcement = t.reinforcement.map((r) => r.item);
      return t;
    });

    if (tutorial.outro?.next?.steps) {
      tutorial.outro.next.steps = tutorial.outro.next.steps.map((s) => s.step);
    }

    tutorial.body = [
      tutorial.intro.body,
      tutorial.tasks.map((t) => t.body).flat(1),
      tutorial.outro.body,
    ];

    if (tutorial.outro.next) {
      tutorial.body.push(tutorial.outro.next.body);
    }

    tutorial.body = tutorial.body.flat(1);

    // console.log(tutorial);

    return tutorial as Tutorial;
  },
};

// non-GROQ
export const releaseNotes = {
  query: `
    ${coreMetaQuery}
    version,
    stable,
    overview,
    featured[] {
      title,
      content,
    },
    'additional': {
      'overview': additional.overview,
      'features': additional.features[] {
        title,
        content,
      },
    },
    cta->{
      title,
      body
    }
  `,
  fn: (note) => {
    note.title = `Chrome OS ${note.version}`;
    note._slug = `/${note._langCode}/releases/chromeos-${note.version}`;
    note._path = `/${note._langCode}/releases/chromeos-${note.version}`;
    note.stable = new Date(note.stable);
    return note as ReleaseNote;
  },
};

// non-GROQ
export const microcopy = {
  query: `
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
  `,
  fn: (m) => {
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
  },
};

// non-GROQ;
export const landings = {
  query: `
    ${coreQuery}
    banner`,
  fn: (landing) => {
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
  },
};
