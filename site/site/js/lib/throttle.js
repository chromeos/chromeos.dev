/**
 * @param {Function} fn
 * @return {Function}
 */
export function throttle(fn) {
  let tick = false;

  /**
   * @param {Event} e
   */
  return function (e) {
    if (!tick) {
      window.requestAnimationFrame(() => {
        fn(e);
        tick = false;
      });
      tick = true;
    }
  };
}

/**
 *
 * @param {Function} fn - Function to call on scroll
 */
export function scrollListener(fn) {
  window.addEventListener('scroll', throttle(fn), { passive: true });
}

/**
 *
 * @param {Function} fn - Function to call on scroll
 */
export function resizeListener(fn) {
  window.addEventListener('resize', throttle(fn), { passive: true });
}
