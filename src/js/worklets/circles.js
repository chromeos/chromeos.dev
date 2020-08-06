/* global registerPaint */

registerPaint(
  'circles',
  class {
    /**
     * Input properties to grab from the element's style
     * @return {string[]}
     */
    static get inputProperties() {
      return ['--shape-color', '--circle-type', '--circle-radius', '--circle-offset', '--parallax-top', 'border-image-outset'];
    }

    /**
     *
     * @param {object} ctx - Drawing context
     * @param {object} size - Size of canvas
     * @param {object} props - Input props
     */
    paint(ctx, size, props) {
      const color = props.get('--shape-color').toString();
      const type = props.get('--circle-type').toString();
      const pTop = parseFloat(props.get('--parallax-top').toString()) || 0;
      const radius = parseFloat(props.get('--circle-radius').toString()) || 150;
      const cOffset = parseFloat(props.get('--circle-offset').toString()) || 0;
      const offset = parseInt(props.get('border-image-outset').toString());

      let r = radius;
      let p = [offset + cOffset, offset + cOffset + pTop];

      if (type === 'featured') {
        r = (size.width - 600) / 2;
        p = [size.width / 2 + (r * 2) / 3 - 10, size.height / 2 + pTop];
      }

      if (type === 'full-circles') {
        const colors = color.split(',');
        const rs = [size.width * 0.21 > 300 ? 300 : size.width * 0.21, size.width * 0.5625 > 810 ? 810 : size.width * 0.5625];

        rs[0] = rs[0] / 2;
        rs[1] = rs[1] / 2;

        ctx.beginPath();
        ctx.arc(rs[0] / 4, rs[0] / 4, rs[0], 0, 2 * Math.PI);
        ctx.fillStyle = colors[0];
        ctx.fill();

        ctx.beginPath();
        ctx.arc(size.width, size.height + rs[1] / 3, rs[1], 0, 2 * Math.PI);
        ctx.fillStyle = colors[1];
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p[0], p[1], r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
  },
);
