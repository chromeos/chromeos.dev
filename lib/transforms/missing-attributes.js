const slug = require('uslug');
const select = require('posthtml-match-helper');
const { addClass, setAttribute, getChildrenByTag } = require('../helpers/posthtml');

/**
 *
 * @param {PostHTMLTree} tree
 * @return {PostHTMLTree}
 */
module.exports = async function postHTMLMissingAttributes(tree) {
  // Add type--page-nav and toc__link classes to TOC links
  tree.match(select('.toc'), node => {
    addClass('type--caption')(getChildrenByTag('li', node));
    addClass('type--page-nav toc__link')(getChildrenByTag('a', node));

    return node;
  });

  // Add link class to Cookie Disclaimer
  tree.match(select('#cookieDisclaimer'), node => {
    addClass('type--link')(getChildrenByTag('a', node));
    return node;
  });

  // Add classes to footnotes
  tree.match(select('.footnote-list'), addClass('type--small'));
  tree.match(select('.footnote-backref'), addClass('type--link'));
  tree.match(select('.footnote-item'), node => {
    if (node?.content?.length) {
      for (const child of node.content) {
        if (child.tag && child?.tag.toLowerCase() === 'p') {
          addClass('footnote-item__p')(child);
        }
      }
    }
    return node;
  });

  // Add message class to messages
  tree.match(select('[class*="message--"]'), addClass('message'));

  // Add IDs to terms
  tree.match(select('dt'), node => setAttribute('id', slug(node.content?.[0]))(node));

  // Add slugs to PWA checklist
  tree.match(select('.api'), node => {
    const anchors = getChildrenByTag('a', node);
    for (const anchor of anchors) {
      const text = slug(anchor.content[0]);
      setAttribute('data-id', text)(anchor);
    }
    return node;
  });

  // Add sub-classes to code figures
  tree.match(select('.code-figure'), node => {
    addClass('code-figure--caption type--label')(getChildrenByTag('figcaption', node));

    return node;
  });

  // Add data headers to tables for responsive table solution
  tree.match(select('table'), node => {
    const headers = getChildrenByTag('th', node).map(header => header.content?.[0]);
    for (const body of getChildrenByTag('tbody', node)) {
      const rows = body.content ? body.content.filter(row => row.tag === 'tr') : [];
      for (const row of rows) {
        const cells = getChildrenByTag('td', row);
        for (let i = 0; i < cells.length; i++) {
          setAttribute('data-header', headers[i])(cells[i]);
        }
      }
    }

    return node;
  });

  // Add missing class to header anchor's parent
  tree.walk(node => {
    if (node?.content?.length) {
      const link = node.content.find(child => child?.tag === 'a' && child?.attrs?.class?.includes('header-anchor'));
      if (link) {
        const currentClass = node?.attrs?.class || '';
        if (!currentClass.includes('header-anchor--wrapper')) {
          setAttribute('class', `${currentClass} header-anchor--wrapper`)(node);
        }
      }
    }

    return node;
  });

  return tree;
};
