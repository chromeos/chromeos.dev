import type { Microcopy } from '$types/sanity';
import { microcopy } from '$$sanity';

/**
 * TODO: Swap this to just getMicrocopy once all instances of that function have been converted
 * Get microcopy from locale code
 * @param {string} code - Locale code
 * @return {Microcopy}
 */
export function getMicrocopyFromLangCode(code: string): Microcopy {
  return Object.values(microcopy).find((m) => m.locale.code === code);
}
