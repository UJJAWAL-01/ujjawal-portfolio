import { useEffect, useRef } from 'react';

/*
 * Full-page background: a few large, soft color blobs drifting slowly
 * over the base color. Drawn on a tiny canvas and scaled up, so the
 * browser's smoothing does the blurring for free. Blobs lean gently
 * toward the pointer and shift with scroll position.
 */

const readHsl = (name) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? v.split(/\s+/).join(', ') : '0, 0%, 50%';
};

const BLOBS = [
  { c: '--aurora-1', x: 0.18, y: 0.2, r: 0.42, sx: 0.07, sy: 0.05, p: 0.0 },
  { c: '--aurora-3', x: 0.82, y: 0.16, r: 0.38, sx: 0.05, sy: 0.07, p: 1.7 },
  { c: '--aurora-2', x: 0.7, y: 0.72, r: 0.44, sx: 0.06, sy: 0.05, p: 3.1 },
  { c: '--aurora-4', x: 0.24, y: 0.82, r: 0.4, sx: 0.07, sy: 0.06, p: 4.4 },
  { c: '--aurora-5', x: 0.5, y: 0.48, r: 0.3, sx: 0.08, sy: 0.08, p: 5.6 },
];

const SCALE = 1 / 10; // render at a tenth of the viewport size

export const Aurora = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let colors = [];
    let base = '';
    let alpha = 0.75;
    let raf = 0;
    let last = 0;
    let t = 0;
    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };

    const readColors = () => {
      colors = BLOBS.map((b) => readHsl(b.c));
      base = readHsl('--background');
      const a = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--aurora-alpha'));
      alpha = Number.isFinite(a) ? a : 0.75;
    };

    const resize = () => {
      w = Math.max(32, Math.round(window.innerWidth * SCALE));
      h = Math.max(32, Math.round(window.innerHeight * SCALE));
      canvas.width = w;
      canvas.height = h;
    };

    const draw = () => {
      const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `hsl(${base})`;
      ctx.fillRect(0, 0, w, h);
      const m = Math.min(w, h);
      BLOBS.forEach((b, i) => {
        const ox = Math.sin(t * 0.13 + b.p) * b.sx + (pointer.x - 0.5) * 0.08 * (i % 2 ? -1 : 1);
        const oy = Math.cos(t * 0.11 + b.p) * b.sy + (pointer.y - 0.5) * 0.06 + Math.sin(scroll * 6.28 + b.p) * 0.06;
        const cx = (b.x + ox) * w;
        const cy = (b.y + oy) * h;
        const r = b.r * Math.max(w, h) * (0.9 + 0.1 * Math.sin(t * 0.2 + b.p));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(r, m * 0.2));
        g.addColorStop(0, `hsla(${colors[i]}, ${alpha})`);
        g.addColorStop(0.55, `hsla(${colors[i]}, ${alpha * 0.37})`);
        g.addColorStop(1, `hsla(${colors[i]}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (now - last < 50) return; // 20fps is plenty for a slow drift
      t += Math.min(now - last, 120) / 1000;
      last = now;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      draw();
    };

    const onPointer = (e) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };

    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    readColors();
    resize();
    draw();
    window.addEventListener('resize', resize);
    if (!reduce) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 h-full w-full" />
      <div aria-hidden="true" className="grain" />
    </>
  );
};
