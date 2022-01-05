const { extname } = require('path');
const fetch = require('node-fetch');
const imageSize = require('image-size');
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
    const img = await fetch(`${url}?fit=fillmax&w=100`).then(res => res.buffer());
    const size = imageSize(img);
    sizeMap[url] = {
      height: size.height * 15,
      width: size.width * 15,
    };
  } catch (e) {
    sizeMap[url] = {
      height: 1500,
      width: 1500,
    };
  }

  return url;
}

/**
 * Removes trailing slashes from all hrefs. Works with query params and hashes too.
 * @param {PostHTMLTree} tree PostHTML AST
 * @return {PostHTMLTree} Modified tree
 */
module.exports = async function postHTMLGoogleStorageImage(tree) {
  const images = [];

  tree.match({ attrs: { src: /^(ix:\/\/)/ } }, node => {
    const url = node.attrs.src.replace(/^(ix:\/\/)/, 'https://chromeos-dev.imgix.net/');
    if (sizeMap[url]) {
      return node;
    }
    images.push(getImageSize(url));
    return node;
  });

  await Promise.all(images);

  tree.match({ attrs: { src: /^(ix:\/\/)/ } }, node => {
    const isVideo = extname(node.attrs.src) === '.gif';
    const url = node.attrs.src.replace(/^(ix:\/\/)/, 'https://chromeos-dev.imgix.net/');
    const size = sizeMap[url];

    if (isVideo) {
      const url = node.attrs.src.replace(/^(ix:\/\/)/, 'https://chromeos-dev.imgix.net/');
      const n = {
        tag: 'video',
        attrs: {
          controls: true,
          loop: true,
          muted: true,
          playsinline: true,
          crossorigin: 'annoymous',
          poster: `${url}?auto=format,compress`,
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
      const srcset = imageSizes.map(size => `${url}?auto=format,compress&fit=fillmax&w=${size} ${size}w`).join(', ');

      // Update original node SRC with the largest image available in non-WebP format
      node.attrs.src = `${url}?auto=format,compress`;
      // Update original node's attributes
      node.attrs.crossorigin = 'anonymous';
      node.attrs.loading = 'lazy';
      node.attrs.srcset = srcset;
      node.attrs.sizes = node.attrs.sizes || '100vw';
      node.attrs.height = size.height;
      node.attrs.width = size.width;

      return node;
    }
  });

  tree.match({ attrs: { href: /^(ix:\/\/)/ } }, node => {
    node.attrs.href = node.attrs.href.replace(/^(ix:\/\/)/, 'https://chromeos-dev.imgix.net/');
    return node;
  });

  return tree;
};
