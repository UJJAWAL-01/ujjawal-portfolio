import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/** Deterministic pseudo-random walk so each sparkline is stable across renders. */
function genSeries(seed, n, trend) {
  let s = (seed * 9301 + 49297) % 233280 || 1;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  let v = 50;
  const out = [];
  for (let i = 0; i < n; i++) {
    v += (rnd() - 0.5) * 16 + trend;
    v = Math.max(6, Math.min(94, v));
    out.push(v);
  }
  return out;
}

/**
 * Animated SVG sparkline / mini equity curve. Draws on scroll into view.
 * Green when the series ends higher than it started, red otherwise.
 */
export const Sparkline = ({
  seed = 1,
  points = 24,
  trend = 0.6,
  width = 96,
  height = 28,
  area = false,
  strokeWidth = 1.5,
  className,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const { d, areaD, up } = useMemo(() => {
    const data = genSeries(seed, points, trend);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    const coords = data.map((val, i) => {
      const x = i * stepX;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return [x, y];
    });
    const d = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const areaD = `${d} L${width},${height} L0,${height} Z`;
    return { d, areaD, up: data[data.length - 1] >= data[0] };
  }, [seed, points, trend, width, height]);

  const color = up ? '#18c08f' : '#ff5f56';
  const gid = `spark-${seed}-${up ? 'u' : 'd'}`;

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
    >
      {area && (
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {area && (
        <motion.path
          d={areaD}
          fill={`url(#${gid})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      )}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
    </svg>
  );
};
