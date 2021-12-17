const imageSizes = [250, 400, 550, 700, 850, 1000, 1150, 1300, 1450, 1500];

/**
 * Removes trailing slashes from all hrefs. Works with query params and hashes too.
 * @param {PostHTMLTree} tree PostHTML AST
 * @return {PostHTMLTree} Modified tree
 */
module.exports = async function postHTMLGoogleStorageImage(tree) {
  tree.match({ attrs: { src: /^(ix:\/\/)/ } }, node => {
    // Swap out gs:// with full URL
    const url = node.attrs.src.replace(/^(ix:\/\/)/, 'https://chromeos-dev.imgix.net/') + '?auto=format';
    const srcset = imageSizes.map(size => `${url}&fit=fillmax&w=${size} ${size}w`).join(', ');

    // Update original node SRC with the largest image available in non-WebP format
    node.attrs.src = url;
    // Update original node's attributes
    node.attrs.crossorigin = 'anonymous';
    node.attrs.loading = 'lazy';
    node.attrs.srcset = srcset;
    node.attrs.sizes = node.attrs.sizes || '100vw';

    return node;
  });

  tree.match({ attrs: { href: /^(ix:\/\/)/ } }, node => {
    node.attrs.href = node.attrs.href.replace(/^(ix:\/\/)/, 'https://chromeos-dev.imgix.net/');
    return node;
  });

  return tree;
};
