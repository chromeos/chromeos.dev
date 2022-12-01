const chromeOsRegex = /(?<![/\-–#?=.])\bchrome([\s\-–]|&#?[0-9a-z]+?;)*os\b(?![/\-–#?=.]\b)/gi;

/**
 * Replaces regex found Chrome OS with the given replacement
 * @param {PostHTMLNode} node - Node to look at
 * @param {string} value - Value to replace with
 */
function replacer(node, value) {
  // Replace in tag content
  if (Array.isArray(node.content)) {
    for (let i = 0; i < node.content.length; i++) {
      if (typeof node.content[i] === 'string') {
        node.content[i] = node.content[i].replace(chromeOsRegex, value);
      }
    }
  }

  // Replace in attributes
  if (node.attrs) {
    for (const [key, v] of Object.entries(node.attrs)) {
      if (key !== 'class' && key !== 'id') {
        if (typeof v === 'string') {
          node.attrs[key] = v.replace(chromeOsRegex, value);
        }
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
  // Walk the tree and make sure all spellings of Chrome OS are consistent
  tree.walk((node) => {
    replacer(node, 'ChromeOS');

    // If logo test, replace with stylized version of Chrome OS
    if (node?.attrs?.class?.includes('logo__text')) {
      node.content[0] = 'chromeOS';
    }

    return node;
  });

  return tree;
}

module.exports = postHTMLChromeOSWord;
