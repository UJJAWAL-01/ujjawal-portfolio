import { useEffect, useRef } from 'react';

/*
 * Full-page background: a few large, soft color blobs over the base
 * color, drawn on a tiny canvas and scaled up (the browser's smoothing
 * does the blurring for free).
 *
 * It is painted once and only repainted on resize or theme change.
 * Every glass panel blurs whatever is behind it, so a constantly
 * moving background would force all of them to re-render every frame.
 */

const readHsl = (name) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? v.split(/\s+/).join(', ') : '0, 0%, 50%';
};

const BLOBS = [
  { c: '--aurora-1', x: 0.16, y: 0.22, r: 0.42 },
  { c: '--aurora-3', x: 0.84, y: 0.14, r: 0.38 },
  { c: '--aurora-2', x: 0.74, y: 0.74, r: 0.44 },
  { c: '--aurora-4', x: 0.2, y: 0.84, r: 0.4 },
  { c: '--aurora-5', x: 0.5, y: 0.5, r: 0.3 },
];

const SCALE = 1 / 10; // render at a tenth of the viewport size

export const Aurora = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const draw = () => {
      const root = getComputedStyle(document.documentElement);
      const a = parseFloat(root.getPropertyValue('--aurora-alpha'));
      const alpha = Number.isFinite(a) ? a : 0.75;
      const w = Math.max(32, Math.round(window.innerWidth * SCALE));
      const h = Math.max(32, Math.round(window.innerHeight * SCALE));
      canvas.width = w;
      canvas.height = h;

      ctx.fillStyle = `hsl(${readHsl('--background')})`;
      ctx.fillRect(0, 0, w, h);
      const big = Math.max(w, h);
      BLOBS.forEach((b) => {
        const color = readHsl(b.c);
        const cx = b.x * w;
        const cy = b.y * h;
        const r = Math.max(b.r * big, Math.min(w, h) * 0.2);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `hsla(${color}, ${alpha})`);
        g.addColorStop(0.55, `hsla(${color}, ${alpha * 0.37})`);
        g.addColorStop(1, `hsla(${color}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', schedule);
    const mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 h-full w-full" />
      <div aria-hidden="true" className="grain" />
    </>
  );
};
