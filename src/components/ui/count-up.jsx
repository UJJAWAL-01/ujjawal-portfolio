import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/** Counts a value like "10.6M", "30+" or "9.15" up from zero when it scrolls into view. */
export const CountUp = ({ value, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const match = /^([\d.]+)(.*)$/.exec(value);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const [shown, setShown] = useState(match ? (0).toFixed(decimals) : value);

  useEffect(() => {
    if (!inView || !match) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target.toFixed(decimals));
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {match ? `${shown}${suffix}` : value}
    </span>
  );
};
