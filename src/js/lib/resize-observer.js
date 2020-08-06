/**
 * @param {function} cb - Callback for the Resize Observer
 * @return {class} - Browsers's ResizeObserver or the polyfill
 */
export async function ponyfillResizeObserver(cb) {
  if ('ResizeObserver' in window) {
    return new ResizeObserver(cb);
  }

  // Need to disable new-cap as this is a dynamic module import
  return new (await import('resize-observer-polyfill')).default(cb); // eslint-disable-line new-cap
}
