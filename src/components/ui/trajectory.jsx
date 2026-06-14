import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const milestones = [
  { year: '2023', role: 'App Developer Intern', org: 'KJSCE' },
  { year: '2024', role: 'Forensic Analyst Intern', org: 'DeepCytes · UK' },
  { year: '2025', role: 'Business Analyst Intern', org: 'ESPS Finserv' },
  { year: '2025', role: 'B.Tech → MS MIS', org: 'KJSCE → Texas A&M' },
  { year: '2026', role: 'Data Engineering Intern', org: 'TTI' },
  { year: '2027', role: 'MS MIS (expected)', org: 'Texas A&M' },
];

const W = 920;
const H = 260;
const padX = 60;
const padTop = 40;
const padBottom = 56;

export const Trajectory = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const n = milestones.length;
  const usableH = H - padTop - padBottom;
  const pts = milestones.map((m, i) => {
    const x = padX + (i / (n - 1)) * (W - padX * 2);
    const y = H - padBottom - (i / (n - 1)) * usableH;
    return { ...m, x, y };
  });

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[n - 1].x},${H - padBottom} L${pts[0].x},${H - padBottom} Z`;

  return (
    <div ref={ref} className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[680px]" role="img" aria-label="Career trajectory timeline">
        <defs>
          <linearGradient id="traj-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
          <linearGradient id="traj-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.18)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
          </linearGradient>
        </defs>

        {/* baseline */}
        <line x1={padX} y1={H - padBottom} x2={W - padX} y2={H - padBottom} stroke="hsl(var(--border))" strokeWidth="1" />

        {/* area */}
        <motion.path d={area} fill="url(#traj-area)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }} />

        {/* line */}
        <motion.path
          d={line}
          fill="none"
          stroke="url(#traj-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {/* milestones */}
        {pts.map((p, i) => {
          const last = i === n - 1;
          const above = i % 2 === 0;
          const labelY = above ? p.y - 14 : p.y + 22;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.18 }}
            >
              <circle cx={p.x} cy={p.y} r={last ? 6 : 4.5} fill={last ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} />
              {last && <circle cx={p.x} cy={p.y} r={11} fill="hsl(var(--accent) / 0.2)" />}
              {/* connector to label */}
              <line x1={p.x} y1={p.y} x2={p.x} y2={above ? p.y - 8 : p.y + 8} stroke="hsl(var(--border))" strokeWidth="1" />
              <text x={p.x} y={labelY} textAnchor="middle" className="fill-foreground" style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                {p.role}
              </text>
              <text x={p.x} y={labelY + 14} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>
                {p.org}
              </text>
              <text x={p.x} y={H - padBottom + 20} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>
                {p.year}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};
