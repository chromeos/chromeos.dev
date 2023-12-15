import type { Microcopy } from '$types/sanity';
import { microcopy } from '$$sanity';

/**
 * Get microcopy from locale code
 * @param {string} code - Locale code
 * @return {Microcopy}
 */
export function getMicrocopy(code: string): Microcopy {
  return Object.values(microcopy).find((m) => m.locale.code === code);
}
