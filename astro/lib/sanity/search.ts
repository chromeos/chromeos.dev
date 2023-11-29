import type { Post, Documentation, Story, Landing } from '$types/sanity';
import { blocksToText } from '$lib/portabletext';
import fsExtra from 'fs-extra';
import * as pagefind from 'pagefind';

const { outputFileSync } = fsExtra;

type MainContent = Post | Documentation | Story | Landing;

/**
 *
 * @param {MainContent[]} all
 */
export async function generateSearchFiles(all: MainContent[]) {
  const { index } = await pagefind.createIndex({});

  for (const item of all) {
    await index.addCustomRecord({
      url: item._path,
      language: item._langCode,
      content: blocksToText(item.body),
      meta: {
        title: item.title,
        description: item.description,
      },
    });
  }

  const { files } = await index.getFiles();

  const pfEntry = JSON.parse(
    files.find((f) => f.path === 'pagefind-entry.json').content.toString(),
  );

  const pfIndex = files.find((f) => f.path === 'pagefind.js');
  outputFileSync(`src/js/generated/${pfIndex.path}`, pfIndex.content);

  // File paths and total size of offline files
  const offline = files
    .filter((f) =>
      f.path.endsWith('.css') ||
      f.path.endsWith('-ui.js') ||
      f.path === 'pagefind-highlight.js' ||
      f.path === 'pagefind.js'
        ? false
        : true,
    )
    .reduce(
      (acc, cur) => {
        acc.files.push(`/pagefind/${cur.path}`);
        acc.size += cur.content.byteLength / 1000;
        return acc;
      },
      {
        files: [],
        size: 0,
        meta: pfEntry,
      },
    );

  const toWrite = files.filter(
    (f) =>
      offline.files.includes(`/pagefind/${f.path}`) && f.path !== 'pagefind.js',
  );

  // Output files
  for (const file of toWrite) {
    outputFileSync(`public/pagefind/${file.path}`, file.content);
  }

  return offline;
}
