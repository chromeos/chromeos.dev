import { extname } from 'path';
import fetch from 'node-fetch';
const sizeMap = {};

const imageSizes = [250, 400, 550, 700, 850, 1000, 1150, 1300, 1450, 1500];

/**
 *
 * @param {string} url URL to get
 * @return {string}
 */
async function getImageSize(url) {
  // TODO: Add @11ty/eleventy-cache-assets in? This will let us cache locally, maybe for images too?
  try {
    const img = await fetch(`${url}?fm=json`).then((res) => res.json());
    sizeMap[url] = {
      width: img.PixelWidth,
      height: img.PixelHeight,
    };
  } catch (e) {
    sizeMap[url] = {
      height: '',
      width: '',
    };

    // SVGs don't generate JSON, so this check will always fail for them. We'll need to manually check them, but they also don't need sizes so it's OK
    if (extname(url) !== '.svg') {
      sizeMap[url].missing = true;
    }
  }

  return url;
}

const cdnRegex = /^((ix|cms):\/\/)(image-)?/;

/**
 *
 * @param {string} src Image src that matches cdnRegex
 * @return {string} Base URL for the image
 */
function getURL(src) {
  const base = cdnRegex.exec(src)[2];
  if (base === 'ix') {
    return src.replace(cdnRegex, 'https://chromeos-dev.imgix.net/');
  } else if (base === 'cms') {
    return src
      .replace(cdnRegex, 'https://chromeos.imgix.net/')
      .replace(/-(\w{3,4})$/, '.$1');
  }
}

/**
 * Removes trailing slashes from all hrefs. Works with query params and hashes too.
 * @param {PostHTMLTree} tree PostHTML AST
 * @return {PostHTMLTree} Modified tree
 */
export async function postHTMLGoogleStorageImages(tree) {
  const images = [];

  // All straight image tags
  tree.match({ attrs: { src: cdnRegex } }, (node) => {
    const url = getURL(node.attrs.src);
    if (sizeMap[url]) {
      return node;
    }
    images.push(getImageSize(url));
    return node;
  });

  // All sourceset tags
  tree.match({ attrs: { srcset: cdnRegex } }, (node) => {
    const url = getURL(node.attrs.srcset);
    if (sizeMap[url]) {
      return node;
    }
    images.push(getImageSize(url));
    return node;
  });

  await Promise.all(images);

  tree.match({ attrs: { src: cdnRegex } }, (node) => {
    const url = getURL(node.attrs.src);
    const ext = extname(url);
    const isVideo = ext === '.gif';
    const size = sizeMap[url];

    if (isVideo) {
      const n = {
        tag: 'video',
        attrs: {
          controls: true,
          loop: true,
          muted: true,
          playsinline: true,
          crossorigin: 'annoymous',
          autoplay: true,
          title: node?.attrs?.alt || '',
          // TODO: Investigate generating a static image as a placeholder instead, as this pulls the whole animated gif
          // poster: `${url}?auto=format,compress`,
          height: size.height,
          width: size.width,
        },
        content: [
          {
            tag: 'source',
            attrs: {
              src: `${url}?fm=webm`,
              type: 'video/webm',
            },
          },
          {
            tag: 'source',
            attrs: {
              src: `${url}?fm=mp4`,
              type: 'video/mp4',
            },
          },
        ],
      };

      return n;
    } else {
      const isSVG = ext === '.svg';
      // Update original node SRC with the largest image available in non-WebP format
      node.attrs.src = `${url}?auto=format,compress`;
      // Update original node's attributes
      node.attrs.crossorigin = 'anonymous';
      node.attrs.loading = 'lazy';
      node.attrs.sizes = node.attrs.sizes || '100vw';
      node.attrs.height = size.height;
      node.attrs.width = size.width;
      if (size.missing) {
        node.attrs.ixmissing = true;
      }

      if (!isSVG && !size.missing) {
        const srcset = imageSizes
          .map(
            (size) =>
              `${url}?auto=format,compress&fit=fillmax&w=${size} ${size}w`,
          )
          .join(', ');

        node.attrs.srcset = srcset;
      }

      return node;
    }
  });

  // Link tags
  tree.match({ attrs: { href: cdnRegex } }, (node) => {
    node.attrs.href = getURL(node.attrs.href);
    +'?auto=format,compress';
    return node;
  });

  // OG tags
  tree.match({ attrs: { property: 'og:image', content: cdnRegex } }, (node) => {
    node.attrs.content = getURL(node.attrs.content) + '?auto=format,compress';
    return node;
  });

  // All sourceset tags
  tree.match({ attrs: { srcset: cdnRegex } }, (node) => {
    node.attrs.srcset = getURL(node.attrs.srcset) + '?auto=format,compress';
    return node;
  });

  // Remove any images that are missing
  tree.match({ attrs: { ixmissing: true } }, (node) => ({}));

  return tree;
}
