import React from 'react';
import { langToFlag } from '$lib/country';

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
  const ot = title;
  return {
    select: {
      lang: 'language',
      title,
    },
    prepare(selection) {
      const { lang } = selection;
      const { title } = selection;

      return {
        title: title || ot,
        media: (
          <span className="flag" style={{ fontSize: '2rem' }}>
            {langToFlag(lang || 'en_US')}
          </span>
        ),
      };
    },
  };
}
