window.addEventListener('load', () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(paintSetup);
  } else {
    paintSetup();
  }
});

/**
 * Sets up paint worklets
 */
async function paintSetup() {
  const { default: circleWorklet } = await import(
    '$js/worklets/circles.js?url'
  );
  const { default: shapeWorklet } = await import('$js/worklets/shape.js?url');

  if (!CSS?.paintWorklet) {
    import('css-paint-polyfill');
  }

  await CSS.paintWorklet.addModule(circleWorklet);
  await CSS.paintWorklet.addModule(shapeWorklet);
}
