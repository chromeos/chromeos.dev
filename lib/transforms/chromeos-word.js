const chromeOsRegex = /(?<![/\-–#?=.])\bchrome([\s\-–]|&#?[0-9a-z]+?;)*os\b(?![/\-–#?=.]\b)/gi;

/**
 * Replaces regex found Chrome OS with the given replacement
 * @param {PostHTMLNode} node - Node to look at
 * @param {string} value - Value to replace with
 */
function replacer(node, value) {
  if (Array.isArray(node.content)) {
    for (let i = 0; i < node.content.length; i++) {
      if (typeof node.content[i] === 'string') {
        node.content[i] = node.content[i].replace(chromeOsRegex, value);
      }
    }
  }
}

/**
 * Updates selected items with correct icons
 * @param {PostHTMLTree} tree PostHTML AST
 * @return {PostHTMLTree} Modified Tree
 */
async function postHTMLChromeOSWord(tree) {
  let head = false;
  let body = false;

  // Walk the tree and make sure all spellings of Chrome OS are consistent
  tree.walk((node) => {
    // Determine if we're in the head or body
    if (node.tag === 'head') {
      head = true;
    }
    if (node.tag === 'body') {
      head = false;
      body = true;
    }

    // If head, replace with Chrome OS
    if (head) {
      replacer(node, 'Chrome OS');
    }

    // If body, replace with non-breaking version of Chrome OS
    if (body) {
      replacer(node, 'Chrome&nbsp;OS');
    }

    // If logo test, replace with stylized version of Chrome OS
    if (node?.attrs?.class?.includes('logo__text')) {
      node.content[0] = 'chromeOS';
    }

    return node;
  });

  return tree;
}

module.exports = postHTMLChromeOSWord;
