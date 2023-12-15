/**
 * Removes trailing slashes from all hrefs. Works with query params and hashes too.
 * @param {PostHTMLTree} tree PostHTML AST
 * @return {PostHTMLTree} Modified tree
 */
export async function postHTMLRemoveTrailingSlash(tree) {
  tree.match({ attrs: { href: /^(?!http)(.*)\/(\?|#|$)/ } }, (node) => {
    node.attrs.href = node.attrs.href.replace(/\/(\?|#|$)/, '$1');

    return node;
  });

  return tree;
}
