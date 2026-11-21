import { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

/*
 * A slowly drifting synthetic terrain drawn on a pointy-top hex grid.
 * Cells below a "water line" are depressions and fill with the accent,
 * deeper = stronger. A nod to h3-lowpoints, drawn with plain canvas 2D.
 */

// ---------- deterministic value noise ----------
const hash = (x, y, seed) => {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};
const smooth = (t) => t * t * (3 - 2 * t);
const noise = (x, y, seed) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = smooth(x - xi);
  const v = smooth(y - yi);
  const a = hash(xi, yi, seed);
  const b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed);
  const d = hash(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};
const fbm = (x, y, seed) => {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let o = 0; o < 4; o++) {
    sum += amp * noise(x * freq, y * freq, seed + o * 17);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
};

const readVar = (name) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw ? raw.split(/\s+/).join(', ') : '0, 0%, 50%';
};

const WATER = 0.4;

export const HexField = ({
  cell = 15,
  seed = 7,
  scale = 0.011,
  animate = true,
  interactive = true,
  className,
  style,
  label = 'Decorative synthetic terrain on a hexagon grid',
}) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const tipRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const tip = tipRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = animate && !reduce;

    let width = 0;
    let height = 0;
    let cells = [];
    let colors = { fg: readVar('--foreground'), accent: readVar('--accent') };
    let t = 0;
    let last = 0;
    let raf = 0;
    let visible = true;
    let hover = -1;
    const r = cell;
    const hw = Math.sqrt(3) * r; // horizontal spacing
    const vh = 1.5 * r; // vertical spacing

    // Precomputed unit hexagon (pointy top), drawn slightly inset to leave a gap
    const corners = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return [Math.cos(a) * r * 0.88, Math.sin(a) * r * 0.88];
    });

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = [];
      const rows = Math.ceil(height / vh) + 2;
      const cols = Math.ceil(width / hw) + 2;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hw + (row % 2 ? hw / 2 : 0);
          const y = row * vh;
          cells.push({ x, y, row, col, e: 0 });
        }
      }
    };

    const elevation = (x, y) => {
      const n = fbm(x * scale + t * 0.045, y * scale + t * 0.02, seed);
      return Math.min(1, Math.max(0, (n - 0.22) / 0.56));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const e = elevation(c.x, c.y);
        c.e = e;
        let fill;
        if (e < WATER) {
          const depth = (WATER - e) / WATER;
          fill = `hsla(${colors.accent}, ${0.1 + depth * 0.5})`;
        } else {
          const h = (e - WATER) / (1 - WATER);
          fill = `hsla(${colors.fg}, ${0.03 + Math.pow(h, 1.5) * 0.15})`;
        }
        ctx.beginPath();
        ctx.moveTo(c.x + corners[0][0], c.y + corners[0][1]);
        for (let k = 1; k < 6; k++) ctx.lineTo(c.x + corners[k][0], c.y + corners[k][1]);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      }

      if (hover >= 0 && cells[hover]) {
        const c = cells[hover];
        ctx.beginPath();
        ctx.moveTo(c.x + corners[0][0] * 1.08, c.y + corners[0][1] * 1.08);
        for (let k = 1; k < 6; k++) ctx.lineTo(c.x + corners[k][0] * 1.08, c.y + corners[k][1] * 1.08);
        ctx.closePath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `hsla(${colors.fg}, 0.9)`;
        ctx.stroke();

        if (tip) {
          const elev = Math.round(80 + c.e * 420);
          const low = c.e < WATER;
          const depth = low ? ((WATER - c.e) * 14).toFixed(1) : null;
          tip.textContent = low
            ? `cell ${c.row},${c.col}  ·  ${elev} m  ·  depression, ${depth} m deep`
            : `cell ${c.row},${c.col}  ·  ${elev} m`;
          const tx = Math.min(c.x + 14, width - tip.offsetWidth - 8);
          const ty = c.y < 40 ? c.y + 18 : c.y - 34;
          tip.style.transform = `translate(${Math.max(8, tx)}px, ${ty}px)`;
          tip.style.opacity = '1';
        }
      } else if (tip) {
        tip.style.opacity = '0';
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) {
        last = now;
        return;
      }
      if (now - last < 33) return; // ~30fps is plenty for a slow drift
      t += Math.min(now - last, 100) / 1000;
      last = now;
      draw();
    };

    const pick = (px, py) => {
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < cells.length; i++) {
        const dx = cells[i].x - px;
        const dy = cells[i].y - py;
        const d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return bestD <= r * r ? best : -1;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const next = pick(e.clientX - rect.left, e.clientY - rect.top);
      if (next !== hover) {
        hover = next;
        if (!shouldAnimate) draw();
      }
    };
    const onLeave = () => {
      hover = -1;
      if (!shouldAnimate) draw();
    };

    build();
    draw();

    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    // Re-read theme colors whenever the light/dark class on <html> changes
    const mo = new MutationObserver(() => {
      colors = { fg: readVar('--foreground'), accent: readVar('--accent') };
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    if (interactive) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerdown', onMove);
      canvas.addEventListener('pointerleave', onLeave);
    }
    if (shouldAnimate) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [cell, seed, scale, animate, interactive]);

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden', className)} style={style}>
      <canvas ref={canvasRef} role="img" aria-label={label} className="absolute inset-0 block" />
      {interactive && (
        <div
          ref={tipRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 whitespace-pre rounded-md border border-border bg-popover/95 px-2 py-1 font-mono text-[11px] text-foreground opacity-0 shadow-sm transition-opacity duration-150"
        />
      )}
    </div>
  );
};
