import type { PreviewValue } from 'sanity';
import React from 'react';
import { langToFlag } from '$lib/country';
import { LANGUAGES } from '$lib/constants';

export type SanityPreview = {
  select: {
    lang: string;
    title: string;
  };
  prepare: (selection: { lang: string; title: string }) => {
    title: string;
    media: React.ReactNode;
  };
};

/**
 *
 * @param {string} title - Title field to search on
 * @return {SanityPreview} - Sanity preview object
 */
export function preview(title: string): SanityPreview {
  return {
    select: {
      lang: 'language',
      title,
    },
    prepare(selection) {
      const { lang } = selection;
      const { title } = selection;

      return i18nPreview(
        title,
        lang,
        LANGUAGES.find((l) => l.id === lang)?.title,
      );
    },
  };
}

/**
 * Actual preview to feed to Sanity
 * @param {string} title
 * @param {string} lang
 * @param {string} [subtitle]
 * @return {PreviewValue}
 */
export function i18nPreview(
  title: string,
  lang: string,
  subtitle: string | undefined = undefined,
): PreviewValue {
  const output = {
    title,
    subtitle,
    media: (
      <span className="flag" style={{ fontSize: '2rem' }}>
        {langToFlag(lang || 'en_US')}
      </span>
    ),
  };

  return output;
}
