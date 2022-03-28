/**
 *
 * @param {string} id - Icon ID
 * @param {string} modifier - Icon modifier to be used, defaults to false
 * @return {PostHTMLSubtree}
 */
function icon(id, modifier = false) {
  return {
    tag: 'span',
    attrs: {
      class: 'icon--container',
    },
    content: [
      '&#8288;',
      {
        tag: 'svg',
        attrs: {
          role: 'img',
          'aria-hidden': 'true',
          class: `icon ${modifier ? 'icon--' + modifier : ''}`,
        },
        content: [
          {
            tag: 'use',
            attrs: {
              href: `/images/icons/sprite.svg#${id}`,
            },
            content: [],
          },
        ],
      },
    ],
  };
}

/**
 * Updates selected items with correct icons
 * @param {PostHTMLTree} tree PostHTML AST
 * @return {PostHTMLTree} Modified tree
 */
async function postHTMLLinkIcons(tree) {
  tree.match({ tag: 'a' }, (node) => {
    const classes = node?.attrs?.class?.split(' ') || [];
    const href = node?.attrs?.href || '';
    const external = RegExp('^https?://').test(href);

    const types = {
      link: classes.length === 0 || classes.includes('type--link') || classes.includes('type--page-nav'),
      ctaLink: classes.includes('cta--link'),
      ctaBack: classes.includes('cta--back'),
    };

    // Normal links
    if (types.link && external) {
      node.content.push(icon('open-in-new', 'inline-external'));
    }

    // CTA links
    if (types.ctaLink) {
      classes.push(' cta--right-icon');
      node.content = node.content || [];
      if (external) {
        node.content.push(icon('arrow-forward', 'external'));
      } else {
        node.content.push(icon('arrow-forward'));
      }
    }

    // CTA back
    if (types.ctaBack) {
      classes.push(' cta--left-icon');
      node.content.unshift(icon('arrow-back'));
    }

    node.attrs.class = classes.join(' ');

    return node;
  });
  return tree;
}

module.exports = postHTMLLinkIcons;
