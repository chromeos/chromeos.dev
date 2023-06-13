import circleWorklet from '$js/worklets/circles.js?url';
import shapeWorklet from '$js/worklets/shape.js?url';

if (!CSS?.paintWorklet) {
  import('css-paint-polyfill');
}

await CSS.paintWorklet.addModule(circleWorklet);
await CSS.paintWorklet.addModule(shapeWorklet);
