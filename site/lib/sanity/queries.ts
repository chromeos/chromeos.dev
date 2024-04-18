/**
 * Microcpy query mixin for GROQ
 * @param {string} lang - Language to pull microcopy from
 * @param {string} property - Property from microcopy to get
 * @return {string} GROQ query for the microcopy item
 */
export function groqMicrocopy(lang: string, property: string) {
  return `*[_type == 'microcopy' && _id match 'microcopy-*' && !(_id in path('drafts.**')) && (language == ${lang} || language == 'en')]{'item': ${property}}[0].item`;
}

export const linkQuery = `
  text,
  url.reference._type == 'reference' => {
    'url': {
      'slug': url.reference->slug.current,
      'type': url.reference->_type,
    }
  },
  url.reference._type != 'reference' => {
    'url': url.url,
  },
`;

export const coreMetaQuery = `
  _id,
  _type,
  '_lang': coalesce(language, 'en'),
  '_langCode': string::split(coalesce(language, 'en'), '_')[0],
`;

export const coreQuery = `
    title,
    description,
    '_slug': slug.current,
    category->{
      title,
      'slug': slug.current
    },
    body,
    // share,
    tags[]->{
      title,
      'slug': slug.current
    },
    'dates': {
      'published': coalesce(date_overrides.published, _createdAt),
      'updated': coalesce(date_overrides.updated, date_overrides.published, _updatedAt)
    },
    ${coreMetaQuery}
`;

// Reusable queries
export const themeQuery = `
'theme': {
  'icon': coalesce(
    theme.theme->icon.asset,
    'ix://icons/eyebrows/' + category->slug.current + '.svg'),
  'slug': coalesce(theme.theme->slug.current, category->slug.current),
  featured.feature == true => {
    'eyebrow': coalesce(
      featured.featured.eyebrow,
      theme.theme->eyebrow,
      ${groqMicrocopy('language', 'identifiers.featured')}
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
    theme.backgrounds.background_large.asset,
    theme.theme->backgrounds.background_large.asset,
      'ix://landings/news/top/banner-' + category-> slug.current + '.svg'
    ),
    'small': coalesce(
    theme.backgrounds.background_small.asset,
    theme.theme->backgrounds.background_small.asset,
      'ix://landings/news/banner-' + category-> slug.current + '.svg'
    ),
  }
},`;

export const featuredQuery = `
  featured.feature == true => {
    'featured': {
      'title': coalesce(featured.featured.title, title),
      'description': coalesce(featured.featured.description, description),
      coalesce(featured.featured.image, hero.hero.image) != null => {
        'media': {
          'image': coalesce(featured.featured.image.asset, hero.hero.image.asset),
          'alt': coalesce(featured.featured.image.alt, hero.hero.image.alt),
        }
      }
    }
  },`;

export const homepageCardQuery = `
  "title": content.title,
  "copy": content.copy,
  "shape": modifiers.shape,
  "image": {
    "alt": image.alt,
    "image": 'cms://' + image.asset._ref
  },
  "cta": {
    "text": cta.text,
    cta.link.reference._type == 'reference' => {
      "ref": cta.link.reference._ref
    },
    cta.link.url != null => {
      "url": cta.link.url
    }
  }`;

export const twoColumnBodyQuery = `
  heading,
  copy,
  examples[] {
    title,
    figures[] {
      _key,
      caption,
      "image": {
        "alt": image.alt,
        "image": 'cms://' + image.asset._ref,
      }
    }
  }
`;
