import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/** Counts up to `value` when scrolled into view. */
export const CountUp = ({ value, duration = 1.2, prefix = '', suffix = '', className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const isInt = Number.isInteger(value);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {isInt ? Math.round(display) : display.toFixed(2)}
      {suffix}
    </span>
  );
};
