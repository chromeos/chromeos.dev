/**
 * A blog post's section
 */
export type StorySection =
  | 'foundations'
  | 'android'
  | 'web'
  | 'games'
  | 'event'
  | 'announcement'
  | "leader's corner";

/**
 * A piece of content's theme
 */
export type Theme = {
  eyebrow?: string;
  icon?: string;
  theme?: string;
  background?: {
    large: string;
    small: string;
  };
};

/**
 * Images
 */
export type Image = {
  url: string;
  alt: string;
};

/**
 * YouTube ID
 */
export type YouTubeID = {
  youtubeID: string;
};

/**
 * The hero for a piece of content
 */
export type HeroMedia = Image | YouTubeID;

export type CTA = {
  text: string;
  url: string;
  type: 'high' | 'medium' | 'low' | 'transparent' | 'link';
  direction?: 'back' | 'forward' | 'external';
};

export type Eyebrow = {
  icon?: string;
  text: string;
};

export type Locale = {
  code: string;
  dir: string;
};
