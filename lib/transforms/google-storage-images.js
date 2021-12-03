const storedImages = require('../helpers/stored-images');

/**
 * Removes trailing slashes from all hrefs. Works with query params and hashes too.
 * @param {PostHTMLTree} tree PostHTML AST
 * @return {PostHTMLTree} Modified tree
 */
module.exports = async function postHTMLGoogleStorageImage(tree) {
  tree.match({ attrs: { src: /^(gs:\/\/)/ } }, node => {
    // Get stored image
    const img = storedImages[node.attrs.src];
    // Swap out gs:// with full URL
    const url = node.attrs.src.replace(/^(gs:\/\/)/, 'https://storage.googleapis.com/cros-staging.appspot.com/');

    // Update original node SRC with the largest image available in non-WebP format
    node.attrs.src = `${url}.${img.cuts.sort((a, b) => a - b)[Math.round((img.cuts.length - 1) / 2)]}${img.types.filter(t => t.extension !== '.webp')[0].extension}`;
    // Update original node's attributes
    node.attrs.height = img.height;
    node.attrs.width = img.width;
    node.attrs.crossorigin = 'anonymous';
    node.attrs.loading = 'lazy';

    // Build picture element to return
    const pictureNode = {
      tag: 'picture',
      content: [],
    };

    // Build sources from types
    for (const type of img.types) {
      const source = {
        tag: 'source',
        attrs: {
          sizes: node.attrs.sizes || img.sizes,
          srcset: img.cuts.map(c => `${url}.${c}${type.extension} ${c}w`).join(', '),
          type: type.type,
        },
      };

      pictureNode.content.push(source);
    }

    pictureNode.content.push(node);

    return pictureNode;
  });

  return tree;
};
