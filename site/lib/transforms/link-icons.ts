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
export async function postHTMLLinkIcons(tree) {
  tree.match({ tag: 'a' }, (node) => {
    const classes = node?.attrs?.class?.split(' ') || [];
    let href = node?.attrs?.href || '';

    // Do a check for ChromeOS.dev links
    if (RegExp('^https?://chromeos.dev').test(href)) {
      href = href.replace(/^https?:\/\/chromeos\.dev/, '');
      node.attrs.href = href;
    }

    const external = RegExp('^https?://').test(href);

    const types = {
      link:
        classes.length === 0 ||
        classes.includes('type--link') ||
        classes.includes('type--page-nav'),
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

    if (node?.attrs?.class) {
      node.attrs.class = classes.join(' ');
    }

    return node;
  });
  return tree;
}
