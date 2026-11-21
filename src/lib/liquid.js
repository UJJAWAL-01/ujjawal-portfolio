// Helpers for the "liquid glass" refraction effect.
//
// Chromium can run an SVG filter on an element's backdrop
// (`backdrop-filter: url(#id)`). We feed that filter a displacement map
// shaped like the element: near the rim, pixels are pushed along the
// edge normal, which bends whatever sits behind the glass like a lens.
// Other browsers get the plain frosted material.

let cached;
export const supportsRefraction = () => {
  if (cached !== undefined) return cached;
  if (typeof window === 'undefined') return (cached = false);
  const brands = navigator.userAgentData?.brands?.map((b) => b.brand) ?? [];
  const chromium = brands.some((b) => /Chromium|Google Chrome|Microsoft Edge/.test(b));
  cached = chromium && CSS.supports('backdrop-filter', 'url(#x)');
  return cached;
};

/**
 * Encodes a displacement map for a rounded rectangle as a PNG data URL.
 * R and G hold the x and y displacement (128 = none).
 * @param {number} w      width in px
 * @param {number} h      height in px
 * @param {number} radius corner radius in px
 * @param {number} bezel  width of the refracting rim in px
 */
export const displacementMap = (w, h, radius, bezel) => {
  const W = Math.max(2, Math.round(w));
  const H = Math.max(2, Math.round(h));
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(W, H);
  const r = Math.min(radius, W / 2, H / 2);
  const hw = W / 2;
  const hh = H / 2;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      // signed distance to the rounded rect (negative inside)
      const sd = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
      const depth = -sd; // distance in from the edge
      let dx = 0;
      let dy = 0;
      if (depth >= 0 && depth < bezel) {
        let nx;
        let ny;
        if (qx > 0 && qy > 0) {
          const l = Math.hypot(qx, qy) || 1;
          nx = qx / l;
          ny = qy / l;
        } else if (qx > qy) {
          nx = 1;
          ny = 0;
        } else {
          nx = 0;
          ny = 1;
        }
        nx *= Math.sign(px) || 1;
        ny *= Math.sign(py) || 1;
        const t = 1 - depth / bezel; // 1 at the rim, 0 at the inner edge of the bezel
        const s = t * t * (3 - 2 * t);
        dx = nx * s;
        dy = ny * s;
      }
      const i = (y * W + x) * 4;
      img.data[i] = 128 + dx * 127;
      img.data[i + 1] = 128 + dy * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
};
