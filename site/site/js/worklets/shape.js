/* global registerPaint */

registerPaint(
  'shape',
  class {
    /**
     * Input properties to grab from the element's style
     * @return {string[]}
     */
    static get inputProperties() {
      return ['--shape', '--shape-color', '--shape-size', '--shape-rotation', '--shape-offset'];
    }

    /**
     *
     * @param {number} from - Starting value
     * @param {string|number} value - Value to change the starting value by
     * @return {number}
     */
    determineChange(from, value) {
      if (typeof value === 'string' && value.endsWith('%')) return from * this.normalizeUnits(value);
      return this.normalizeUnits(value);
    }

    /**
     *
     * @param {string|number} value - Value to be parsed
     * @return {number} normalized value
     */
    normalizeUnits(value) {
      if (typeof value === 'string') {
        if (value.endsWith('px')) {
          return parseFloat(value);
        } else if (value.endsWith('%')) {
          return parseFloat(value) / 100;
        } else if (value.endsWith('deg')) {
          return (parseFloat(value) * Math.PI) / 180;
        } else {
          return parseFloat(value);
        }
      } else {
        return value;
      }
    }

    /**
     *
     * @param {object} ctx - Drawing context
     * @param {object} size - Size of canvas
     * @param {object} props - Input props
     */
    paint(ctx, size, props) {
      const shapes = props
        .get('--shape')
        .toString()
        .trim()
        .split(',')
        .map((s) => s.trim());
      const colors = props
        .get('--shape-color')
        .toString()
        .trim()
        .split(',')
        .map((s) => s.trim());
      const sizes = props
        .get('--shape-size')
        .toString()
        .trim()
        .split('),')
        .map((r) => r.replace(/\(|\)/g, '').trim().split(' '));
      const rotations = props
        .get('--shape-rotation')
        .toString()
        .trim()
        .split(',')
        .map((s) => s.trim());
      const offsets = props
        .get('--shape-offset')
        .toString()
        .trim()
        .split('),')
        .map((r) => r.replace(/\(|\)/g, '').trim().split(' '));

      const width = size.width;
      const height = size.height;

      // Save canvas
      ctx.save();

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        const color = colors[i];
        const size = sizes[i];
        const sizeX = this.determineChange(width, size[0] || 0);
        const sizeY = this.determineChange(height, size[1] || 0);
        const rotation = this.normalizeUnits(rotations[i] || '0deg');
        const offset = offsets[i];
        const offsetX = this.determineChange(width, offset[0] || 0);
        const offsetY = this.determineChange(height, offset[1] || 0);

        // Restore canvas between each loop
        ctx.restore();

        if (shape === 'triangle') {
          const size = Math.min(sizeX, sizeY);
          ctx.beginPath();
          ctx.rotate(rotation);
          ctx.moveTo(offsetX, offsetY);
          ctx.lineTo(offsetX + size, offsetY);
          ctx.lineTo(offsetX + size, offsetY + size);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        }
        if (shape === 'circle') {
          const size = Math.min(sizeX, sizeY);
          ctx.beginPath();
          ctx.arc(offsetX + size / 2, offsetY + size / 2, size / 2, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        }
        if (shape === 'moon') {
          const size = Math.min(sizeX, sizeY);
          ctx.beginPath();
          ctx.rotate(rotation);
          ctx.arc(offsetX + size / 2, offsetY + size / 2, size / 2, 0, Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        }

        // Save canvas for next loop
        ctx.save();
      }
    }
  },
);
