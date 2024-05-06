import type { PortableTextBlock, PortableTextTextBlock } from '@sanity/types';
import type { TOC } from '$components/TOC.svelte';
import { slugify } from '$lib/data';

/**
 * Filter PortableText AST
 * Inspired by https://kittygiraudel.com/2022/05/19/table-of-contents-with-sanity-portable-text/
 * @param {PortableTextBlock[]} ast - PortableText AST
 * @param {function} match
 * @return {PortableTextBlock[]}
 */
export function filterAST(
  ast: PortableTextBlock[],
  match: (node: PortableTextBlock) => boolean,
) {
  return ast
    .reduce((acc, node) => {
      if (match(node)) {
        acc.push(node);
      }
      if (node.children) {
        acc.push(filterAST(node.children as PortableTextBlock[], match));
      }
      return acc;
    }, [])
    .flat();
}

/**
 *
 * @param {PortableTextBlock[]} body - PortableText AST
 * @return {TOC[]}
 */
export function buildTOC(body: PortableTextBlock[]): TOC[] {
  return filterAST(
    body,
    (node: PortableTextTextBlock) =>
      node?._type === 'block' && /h(2|3)/.test(node?.style),
  )
    .map((node) => {
      const title = node.children
        .map((node) => (typeof node === 'string' ? node : node.text || ''))
        .join('');

      return {
        depth: Number(node.style.replace('h', '')),
        title,
        url: `#${slugify(title)}`,
      };
    })
    .reduce((acc, cur) => {
      if (cur.depth === 2) {
        acc.push(cur);
      } else {
        const prev = acc[acc.length - 1];
        if (prev && prev.depth === 2) {
          prev.children = prev.children || [];
          delete cur.depth;
          prev.children.push(cur);
        }
      }
      return acc;
    }, [])
    .map((i) => {
      delete i.depth;
      return i;
    });
}

/**
 * Convert PortableText block AST to plain text, quick and dirty
 * TODO: Replace with recursive function
 * @param {PortableTextBlock[]} blocks - Portable Text Block
 * @return {string}
 */
export function blocksToText(blocks) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return toText(block.children);
    })
    .join('\n\n');
}

/**
 * Convert PortableText AST to plain text, quick and dirty
 * @param {PortableTextBlock[]} blocks - Portable Text Block
 * @return {string}
 */
export function toText(blocks) {
  return blocks
    .map((block) => {
      if (block.children) {
        return toText(block.children);
      } else if (block.text) {
        return block.text;
      } else {
        return '';
      }
    })
    .flat()
    .join('');
}
