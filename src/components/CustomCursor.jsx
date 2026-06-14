import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionPref } from '../context/MotionContext';

const INTERACTIVE = 'a, button, input, textarea, select, [role="button"], [data-cursor]';

/**
 * "Data inspector" cursor: viewport-spanning cyan hairlines that track the
 * pointer with a live coordinate readout, and snap into an amber bracket
 * frame around whatever interactive element is hovered.
 * Desktop + cinematic only; hidden for touch / lite / reduced-motion.
 */
export const CustomCursor = () => {
  const { cinematic } = useMotionPref();
  const [enabled, setEnabled] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState(null); // {x,y,w,h} or null

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.3 });

  // Bracket box springs
  const bx = useSpring(0, { stiffness: 400, damping: 35 });
  const by = useSpring(0, { stiffness: 400, damping: 35 });
  const bw = useSpring(0, { stiffness: 400, damping: 35 });
  const bh = useSpring(0, { stiffness: 400, damping: 35 });

  const isFine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  useEffect(() => {
    setEnabled(cinematic && isFine);
  }, [cinematic, isFine]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('cursor-none');
      return;
    }
    document.documentElement.classList.add('cursor-none');

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE);
      if (el) {
        const r = el.getBoundingClientRect();
        bx.set(r.left - 6);
        by.set(r.top - 6);
        bw.set(r.width + 12);
        bh.set(r.height + 12);
        setTarget(true);
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE)) setTarget(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      document.documentElement.classList.remove('cursor-none');
    };
  }, [enabled, x, y, bx, by, bw, bh]);

  if (!enabled) return null;

  const accent = target ? 'hsl(var(--accent))' : 'hsl(var(--primary))';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      {/* Horizontal hairline */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ top: 0, y: sy, background: accent, opacity: 0.25 }}
      />
      {/* Vertical hairline */}
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{ left: 0, x: sx, background: accent, opacity: 0.25 }}
      />

      {/* Center reticle */}
      <motion.div
        className="absolute"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        <div
          className="relative"
          style={{ width: 18, height: 18 }}
        >
          <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2" style={{ background: accent }} />
          <span className="absolute left-1/2 bottom-0 h-1.5 w-px -translate-x-1/2" style={{ background: accent }} />
          <span className="absolute top-1/2 left-0 w-1.5 h-px -translate-y-1/2" style={{ background: accent }} />
          <span className="absolute top-1/2 right-0 w-1.5 h-px -translate-y-1/2" style={{ background: accent }} />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 3, height: 3, background: accent, boxShadow: `0 0 8px ${accent}` }}
          />
        </div>
      </motion.div>

      {/* Coordinate readout */}
      <motion.div
        className="absolute font-mono text-[10px] tracking-wider"
        style={{ x: sx, y: sy, translateX: 14, translateY: 10, color: accent, opacity: 0.7 }}
      >
        {String(coords.x).padStart(4, '0')}·{String(coords.y).padStart(4, '0')}
      </motion.div>

      {/* Bracket frame on hover */}
      <motion.div
        className="absolute rounded-md"
        style={{
          x: bx, y: by, width: bw, height: bh,
          opacity: target ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} w-2.5 h-2.5`}
            style={{
              borderColor: 'hsl(var(--accent))',
              borderStyle: 'solid',
              borderTopWidth: pos.includes('top') ? 1.5 : 0,
              borderBottomWidth: pos.includes('bottom') ? 1.5 : 0,
              borderLeftWidth: pos.includes('left') ? 1.5 : 0,
              borderRightWidth: pos.includes('right') ? 1.5 : 0,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
