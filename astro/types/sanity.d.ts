import type { PortableTextBlock } from '@sanity/types';

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
  image?: string;
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

export type Backgrounds = {
  large: string;
  small: string;
};

export type Theme = {
  icon: string;
  slug: string;
  eyebrow: string;
  backgrounds: Backgrounds;
};

export type Featured = {
  title: string;
  description: string;
  media?: Image;
};

export type Software = {
  min: string;
  max: string;
  name: string;
  url: string;
};

export type Hero = YouTube | Image;

export type Field = {
  label?: string;
  name?: string;
  value: ?string;
  required?: boolean;
  error?: string;
  type:
    | 'text'
    | 'email'
    | 'checkbox'
    | 'select'
    | 'country'
    | 'hidden'
    | 'submit';
  options?: string[];
};

export type StorySection = {
  title: string;
  description: string;
  category: Tag;
};

export type NavLink = {
  title: string;
  url: string;
};

export type NavSection = {
  title: string;
  sections: NavLink[];
};

export type NavItem = NavLink | NavSection;

export type HomepageRefCTA = {
  text: string;
  ref: string;
};

export type HomepageURLCTA = {
  text: string;
  url: string;
};

export type HomepageCTA = HomepageRefCTA | HomepageURLCTA;

export type HomepageCard = {
  title: string;
  copy: string;
  image: Image;
  cta: HomepageCTA;
  shape: string;
};

export type HomepageQuote = {
  quote: string;
  author: {
    name: string;
    title: string;
  };
  image: Image;
};

export type HomepageStat = {
  stat: string;
  description: string;
  source: string;
};

interface CoreMeta {
  _id: string;
  _type: string;
  _lang: string;
  _langCode: string;
}

// Meta attributes assigned to all content
interface CoreContentMeta extends CoreMeta {
  _slug: string;
  _section: string;
  _path: string;
}

// Core fields shared by all content types
interface CoreContent extends CoreContentMeta {
  title: string;
  description: string;
  body: PortableTextBlock[];
  category: Tag;
  tags: Tag[];
  dates: {
    published: Date;
    updated?: Date;
  };
}

export interface Navigation extends CoreMeta {
  id: string;
  type: string;
  _lang: string;
  _langCode: string;
  items: NavItem[];
}

export interface Home extends CoreMeta {
  chromebook: {
    title: string;
    copy: string;
    image: Image;
    cta: HomepageCTA;
  };
  commercial: {
    title: string;
    copy: string;
    items: HomepageCard[];
  };
  hero: {
    heading: {
      default: string;
      accent: string;
    };
    copy: string;
  };
  community: string;
  linux: {
    title: string;
    copy: string;
    images: Image[];
    cta: HomepageCTA;
  };
  posts: {
    title: string;
    copy: string;
    cta: string;
  };
  quotes: {
    title: string;
    copy: string;
    items: HomepageQuote[];
  };
  routing: HomepageCard[];
  stats: {
    title: string;
    copy: string;
    items: HomepageStat[];
  };
  stories: {
    title: string;
    copy: string;
    cta: string;
  };
  subnav: {
    title: string;
    copy: string;
  };
}

export interface Cookiejar extends CoreContentMeta {
  title: string;
  description: PortableTextBlock[];
  accept: string;
  decline: string;
}

export interface Newsletter extends CoreContentMeta {
  title: string;
  description: string;
  disclaimer: PortableTextBlock[];
  messages: {
    warning: string;
    success: string;
    error: string;
  };
  fields: Field[];
  settings: {
    endpoint: string;
    id: string;
  };
}

export interface StoryLanding extends CoreContentMeta {
  sections: StorySection[];
}

export interface Post extends CoreContent {
  author: Author[];
  hero?: Hero;
  theme: Theme;
  featured?: Featured;
}

export interface Story extends CoreContent {
  theme: Theme;
  app: {
    title: string;
    company: string;
    logo: Image;
  };
  hero: Image;
  featured?: Featured;
}

export type CMSLinkReference = {
  url: {
    slug: string;
    type: string;
  };
};

export type CMSLink = {
  text: string;
  url: string | CMSLinkReference;
};

export interface Landing extends CoreContentMeta {
  title: string;
  description: string;
  category: Tag;
  body: PortableTextBlock[];
  banner: {
    wide: string;
    narrow: string;
  };
}

export interface Documentation extends CoreContent {
  weight: number;
  software: Software[];
}

export type AppSupport = {
  _id: string;
  _type: string;
  _lang: string;
  _langCode: string;
  title: string;
  description: PortableTextBlock[];
  cta: {
    title: string;
    url: string;
  };
};

export type Microcopy = {
  _lang: string; // Full language code, with country, if applicable
  accessibility: {
    skip: {
      toc: string; // Skip to table of contents
      content: string; // Skip to main content
    };
    authorAlt: string; // ((a)) - Replace author name
  };
  actions: {
    reset: string;
    loadVideo: string;
    remove: string;
    required: string;
    add: string;
    subscribe: string;
    more: string; // Read More
    back: string; // Breadcrumb back ((a)) - Replace with page title
  };
  meta: {
    authored: string;
    toc: string;
    updated: string;
    posted: string;
    tools: {
      title: string;
      versions: {
        singular: string;
        plural: string;
      };
    };
  };
  network: {
    offline: {
      title: string;
      description: string;
    };
    sw: {
      reload: {
        message: string;
        action: string;
      };
      refresh: {
        message: string;
        action: string;
      };
    };
    notFound: string;
  };
  topics: {
    title: string;
    related: string;
    section: string;
  };
  footer: {
    links: CMSLink[];
    help: CMSLink;
    language: string;
  };
  pagination: {
    next: string;
    previous: string;
    current: string;
    first: string;
    last: string;
    page: string;
    title: string;
  };
  locale: {
    code: string;
    name: string;
    dir: string;
    vertical: boolean;
  };
  identifiers: {
    featured: string;
    resources: string;
    recommended: string;
  };
};

export type Content = Post | Documentation | Story | Landing;
export type ContentArray = Post[] | Documentation[] | Story[] | Landing[];
