/**
 *
 * @param {string} tag Tagname
 * @param {PostHTMLNode} node Node to search on
 * @param {PostHTMLNode[]} holder Found matches
 * @return {PostHTMLNode[]}
 */
function getChildrenByTag(tag, node, holder = []) {
  if (node?.content?.length) {
    for (const child of node.content) {
      if (child.tag && child?.tag.toLowerCase() === tag.toLowerCase()) {
        holder.push(child);
      }
      if (child?.content?.length) {
        getChildrenByTag(tag, child, holder);
      }
    }
  }

  return holder;
}

/**
 * Sets attribute on node, even if node has no attributes
 * @param {string} a Attribute to set
 * @param {string} v Value to set
 * @return {function}
 */
function setAttribute(a, v) {
  /**
   * @param {PostHTMLNode} node Node to set attribute on
   * @return {PostHTMLNode}
   */
  return function setAttributeOnNode(node) {
    if (node.attrs && node.attrs[a]) {
      node.attrs[a] = v;
    } else {
      node.attrs = { [a]: v };
    }
    return node;
  };
}

/**
 *
 * @param {string} className Class(es) to add
 * @return {function} Function to use to add classes to node
 */
function addClass(className) {
  /**
   * @param {PostHTMLNode<[]>} node Node(s) to add class to
   * @return {PostHTMLNode} Optionally returns node
   */
  return function addClassToNode(node) {
    let working = node;
    if (!Array.isArray(working)) {
      working = [working];
    }

    for (const item of working) {
      if (item.attrs?.class) {
        item.attrs.class += ` ${className}`;
      } else {
        item.attrs = { class: className };
      }
    }

    if (!Array.isArray(node)) {
      return node;
    }
  };
}

module.exports = {
  getChildrenByTag,
  setAttribute,
  addClass,
};
