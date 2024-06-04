import fsExtra from 'fs-extra';
import * as sanity from '$lib/sanity';

const { outputFileSync } = fsExtra;

const exclude = ['buildStaticPaths', 'getPosts', 'enableDrafts', 'all'];

const archive = Object.fromEntries(
  Object.entries(sanity)
    .map(([k, v]) => {
      if (!exclude.includes(k)) {
        return [k, v];
      }
    })
    .filter((a) => a),
);

// Output archive
console.log('Outputting site archive');
outputFileSync(`.generated/archive.json`, JSON.stringify(archive));
