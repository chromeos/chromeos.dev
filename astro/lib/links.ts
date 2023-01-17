/**
 * Determines if passed-in link is external
 * @param {string} href - The link to check
 * @return {boolean} - True if the link is external
 */
export function isExternalLink(href: string): boolean {
  return RegExp('^https?://').test(href);
}
