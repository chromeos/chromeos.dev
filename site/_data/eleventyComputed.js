/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-env node */

const get = require('lodash.get');
const { propSort, dateSort } = require('../../lib/helpers/sort');

/**
 * Gets the l10n version, if available, otherwise falls back to the existing value
 *
 * @param {string} pth - Object path to search
 * @return {*}
 */
function l10nFallback(pth) {
  return function getl10nFallback(data) {
    return get(data, `l10n.${pth}`, get(data, pth));
  };
}

/**
 * Gets either the desired value at the object search path or its fallback
 *
 * @param {string} pth - Desired path to get
 * @param {string} fb - Fallback path
 * @return {*} Value at that path
 */
function dataFallback(pth, fb) {
  return function getDataFallback(data) {
    return get(data, pth, get(data, fb));
  };
}

/**
 * Gets a collection based on the current locale of the content
 *
 * @param {string} collection - Collection to retrieve
 * @return {object[]} - Array of objects in collection
 */
function localeCollection(collection) {
  return function getLocaleCollection(data) {
    return get(data, `collections.${collection}--${data.locale.code}`);
  };
}

/**
 *
 * @param {string} parent - Parent URL
 * @param {object[]} nav - Nav items
 * @return {object | false}
 */
function findNavParent(parent, nav) {
  const p = nav.find(i => i.url === parent);

  if (p) {
    return {
      title: p.title,
      url: parent,
    };
  }

  const nested = nav.filter(i => 'sections' in i);

  for (let i = 0; i < nested.length; i++) {
    const f = nested[i].sections.find(n => n.url === parent);
    if (f) {
      return {
        title: f.title,
        url: parent,
      };
    }
  }

  return false;
}

module.exports = {
  locale: l10nFallback('locale'),
  metadesc: l10nFallback('metadesc'),
  title: l10nFallback('title'),
  footerContent: l10nFallback('footer'),
  nav: l10nFallback('nav'),
  cookies: l10nFallback('cookieDisclaimer'),
  search: l10nFallback('search'),
  showNewsletter: data => (l10nFallback('hideNewsletter')(data) ? false : 'show'),
  subscribe: l10nFallback('newsletter.subscribe'),
  og: data => {
    const og = [
      {
        property: 'title',
        content: data.title,
      },
      {
        property: 'locale',
        content: data.locale.code,
      },
      {
        property: 'site_name',
        content: 'chromeOS.dev',
      },
      {
        property: 'url',
        content: `https://chromeos.dev${data.page.url}`,
      },
    ];

    // OG Type
    if (data.section) {
      og.push([
        {
          property: 'type',
          content: 'article',
        },
        {
          property: 'article:published_time',
          content: data.date,
        },
        {
          property: 'article:section',
          content: data.section,
        },
      ]);

      if (data.updated) {
        og.push({
          property: 'article:modified_time',
          content: data.updated,
        });
      }

      if (data.tags) {
        for (let i = 0; i < data.tags.length; i++) {
          og.push({
            property: 'article:tag',
            content: data.tags[i],
          });
        }
      }

      if (data.authors) {
        for (let i = 0; i < data.authors.length; i++) {
          const author = data.authors[i];
          const contributor = data.contributors[author].name;
          og.push([
            {
              property: 'article:author',
              content: author,
            },
            {
              property: 'profile:username',
              content: author,
            },
            {
              property: 'profile:first_name',
              content: contributor.given,
            },
          ]);

          if (contributor.family) {
            og.push({
              property: 'profile:last_name',
              content: contributor.family,
            });
          }
        }
      }
    } else {
      og.push({
        property: 'type',
        content: 'website',
      });
    }

    if (data.metadesc) {
      og.push({
        property: 'description',
        content: data.metadesc,
      });
    }

    // OG Image
    if (data.hero) {
      og.push([
        {
          property: 'image',
          content: `https://chromeos.dev${data.hero.image}`,
        },
        {
          property: 'image:alt',
          content: `https://chromeos.dev${data.hero.alt}`,
        },
      ]);
    } else {
      og.push([
        {
          property: 'image',
          content: 'ix://icons/social.png',
        },
        {
          property: 'image:alt',
          content: 'chromeOS.dev',
        },
      ]);
    }

    return og.flat();
  },
  parent: data => {
    if (data.parent && typeof data.parent === 'string') {
      const parent = findNavParent(data.parent, data.nav);

      if (parent) {
        return parent;
      }
    }

    return data.parent;
  },
  featured: data => {
    if (data.featured) {
      const featured = {
        eyebrow: dataFallback('featured.eyebrow', 'microcopy.featured.eyebrow')(data),
        title: dataFallback('featured.title', 'title')(data),
        desc: dataFallback('featured.desc', 'metadesc')(data),
        cta: {
          text: get(data, 'microcopy.more'),
          url: get(data, 'page.url'),
        },
      };

      const images = dataFallback('featured.images', 'hero')(data);

      if (Array.isArray(images)) {
        featured.images = images;
      } else {
        featured.images = [images.image, images.alt];
      }

      return featured;
    }
    return null;
  },
  landingPage: data => {
    const stem = data.page.filePathStem.split('/');
    if (data.layout === 'tech-detail' && stem.length === 4 && stem[3] === 'index') {
      const subnav = localeCollection(data.section)(data).map(i => ({
        title: i.data.title,
        body: i.data.metadesc,
        url: i.url,
      }));

      return {
        hero: data.hero || false,
        subnav,
      };
    }

    return false;
  },

  landingCollections: data => {
    const posts = (localeCollection('posts')(data) || []).sort(dateSort(false));
    const featured = (localeCollection('case-studies__featured')(data) || []).sort(dateSort(false));
    const featuredPost = (localeCollection('posts__featured')(data) || []).sort(dateSort(false));
    const stories = localeCollection('case-studies')(data) || [];

    const collections = {};

    if (featured && featured.length >= 1) {
      collections.featured = {
        first: get(featured[0] || {}, 'data.featured'),
        second: get(featured[1] || {}, 'data.featured'),
        post: get(featuredPost[0] || {}, 'data.featured'),
      };
    }

    if (posts && posts.length >= 1) {
      collections.posts = posts.map(post => ({
        eyebrow: post.data.tags[0],
        title: post.data.title,
        body: post.data.metadesc,
        url: post.data.page.url,
      }));

      collections.filteredPosts = collections.posts.filter(i => i.url !== get(collections, 'featured.post.cta.url'));

      collections.homePosts = collections.posts.slice(0, 3);
    }

    if (stories && stories.length >= 1) {
      collections.stories = stories
        .filter(i => i.data.page.url !== get(collections, 'featured.second.cta.url'))
        .sort(propSort({ prop: 'data.title', lowercase: true }))
        .sort(propSort({ prop: 'data.weight', fallback: 0 }))
        .map(i => ({
          title: get(i, 'data.title'),
          image: get(i, 'data.app.logo'),
          cta: {
            text: l10nFallback('microcopy.more')(data),
            url: get(i, 'data.page.url'),
          },
        }));
    }

    return collections;
  },
};
