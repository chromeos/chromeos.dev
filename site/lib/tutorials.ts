import type { Microcopy, Tutorial } from '$types/sanity';
import type { GetStaticPathsResult } from 'astro';

interface MicrocopyDictionary {
  [key: string]: Microcopy;
}

/**
 *
 * @param {MicrocopyDictionary} micro Microcopy to use
 * @return {function (tutorial:Tutorial): GetStaticPathsResult[]}
 */
export function buildPages(micro: MicrocopyDictionary) {
  return function (tutorial: Tutorial): GetStaticPathsResult[] {
    const tasks = tutorial.tasks.length;
    const microcopy = micro[tutorial._lang];
    const pages = [
      {
        params: {
          lang: tutorial._langCode,
          path: tutorial._slug,
        },
        props: {
          tutorial,
          intro: true,
          microcopy,
        },
      },
    ];

    for (let i = 0; i < tasks; i++) {
      pages.push({
        params: {
          lang: tutorial._langCode,
          path: tutorial._slug + `/${i + 1}`,
        },
        props: {
          tutorial,
          task: i,
          microcopy,
        },
      });
    }

    pages.push({
      params: {
        lang: tutorial._langCode,
        path: tutorial._slug + `/${tasks + 1}`,
      },
      props: {
        tutorial,
        outro: true,
        microcopy,
      },
    });

    const section = pages.map((p) => {
      const link = { href: `/${tutorial._lang}/tutorials/${p.params.path}` };
      if (p.props.intro) link.title = microcopy.tutorials.introduction;
      if (p.props.outro) link.title = microcopy.tutorials.wrapup;
      if (!isNaN(p.props.task)) link.title = tutorial.tasks[p.props.task].title;

      return link;
    });

    return pages.map((p) => {
      p.props.section = section;
      return p;
    });
  };
}
