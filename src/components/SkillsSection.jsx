import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, BarChart3, Shield } from 'lucide-react';
import { Panel } from './ui/panel';
import { Sparkline } from './ui/sparkline';
import { SectionHeader } from './ui/section-header';

const sectors = [
  {
    code: 'DEV',
    title: 'Programming & Data',
    icon: Code2,
    rows: [
      { sym: 'PY', name: 'Python' },
      { sym: 'JAVA', name: 'Java' },
      { sym: 'C', name: 'C' },
      { sym: 'SQL', name: 'SQL' },
      { sym: 'HTML', name: 'HTML' },
      { sym: 'CSS', name: 'CSS' },
    ],
  },
  {
    code: 'BI',
    title: 'Analytics & Tools',
    icon: BarChart3,
    rows: [
      { sym: 'XL', name: 'MS Excel' },
      { sym: 'PBI', name: 'Power BI' },
      { sym: 'TBL', name: 'Tableau' },
      { sym: 'FIG', name: 'Figma' },
      { sym: 'PINE', name: 'Pine Script' },
      { sym: 'ASTD', name: 'Android Studio' },
    ],
  },
  {
    code: 'SEC',
    title: 'Security & Systems',
    icon: Shield,
    rows: [
      { sym: 'KALI', name: 'Kali Linux' },
      { sym: 'WIRE', name: 'Wireshark' },
      { sym: 'NMNR', name: 'Network Miner' },
      { sym: 'METR', name: 'Meterpreter' },
    ],
  },
];

const softSkills = [
  'Analytical Thinking', 'Logical Reasoning', 'Learning Agility', 'Collaboration',
  'Communication', 'User Story Mapping', 'Competitive Analysis',
  'Decision Making', 'Confidence Under Pressure',
];

const hashSeed = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 99991;
  return h + 13;
};

const SkillRow = ({ row }) => {
  const seed = hashSeed(row.sym + row.name);
  return (
    <div className="flex items-center gap-3 py-2.5 px-1 -mx-1 rounded hover:bg-primary/[0.06] transition-colors">
      <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
      <span className="text-sm text-foreground/90 flex-1 truncate">{row.name}</span>
      <Sparkline seed={seed} points={20} trend={0.5} width={64} height={18} className="shrink-0 opacity-60" />
    </div>
  );
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 md:py-32 relative" ref={ref} data-testid="skills-section">
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="03"
          code="~/skills"
          meta="toolkit"
          title={<>Skills <span className="gradient-text">&amp; Tools</span></>}
          subtitle="The languages, platforms, and tools I work with day to day."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.code}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Panel title={sector.title} status={`${sector.rows.length}`} className="h-full">
                {sector.rows.map((row) => (
                  <SkillRow key={row.sym} row={row} />
                ))}
              </Panel>
            </motion.div>
          ))}
        </div>

        {/* Soft skills as a sentiment strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Panel title="Strengths" status="">
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs text-foreground/80 border border-border bg-muted/30 rounded px-2.5 py-1 hover:border-accent/40 hover:text-accent transition-colors"
                >
                  <span className="text-accent mr-1.5">▸</span>{skill}
                </span>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>
    </section>
  );
};
