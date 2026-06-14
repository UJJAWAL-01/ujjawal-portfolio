import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, Briefcase, Shield, Code2, Database } from 'lucide-react';
import { Panel } from './ui/panel';
import { SectionHeader } from './ui/section-header';
import { JourneyGlobe } from './three/JourneyGlobe';

const stops = [
  { city: 'College Station, TX', note: 'TTI · now', tone: 'active', loc: 'College Station' },
  { city: 'Mumbai, India', note: 'ESPS · KJSCE', tone: 'closed', loc: 'Mumbai' },
  { city: 'Remote · UK', note: 'DeepCytes', tone: 'closed', loc: 'London' },
];

// maps each role's org code to its globe location
const codeToLoc = { TTI: 'College Station', ESPS: 'Mumbai', DCY: 'London', KJS: 'Mumbai' };

const experiences = [
  {
    code: 'TTI',
    role: 'Data Engineering Intern',
    company: 'Texas A&M Transportation Institute',
    location: 'College Station, TX',
    period: 'Jun 2026 – Present',
    status: 'Current',
    tone: 'active',
    icon: Database,
    short: 'Cleaning and normalizing large statewide transportation datasets into reliable, analysis-ready foundations.',
    full: [
      'Engineers data-cleaning and normalization workflows across large, multi-source statewide datasets',
      'Builds query-ready data foundations that downstream analysis and reporting depend on',
      'Surfaces insights from the cleaned data to support transportation-service outcomes',
    ],
  },
  {
    code: 'ESPS',
    role: 'Business Analyst Intern',
    company: 'ESPS Finserv Pvt. Ltd.',
    location: 'Mumbai, India',
    period: 'Jan 2025 – Jun 2025',
    status: 'Past',
    tone: 'closed',
    icon: Briefcase,
    short: 'Built the product catalog and trading indicators, and researched arbitrage models to lift client portfolio performance.',
    full: [
      'Designed an integrated product-catalog system for streamlined client access',
      'Developed automated research pipelines for market analysis',
      'Built long-short trading signals that increased profit margins by 20%',
      'Researched arbitrage models to optimize portfolio performance',
    ],
  },
  {
    code: 'DCY',
    role: 'Forensic Analyst Intern',
    company: 'DeepCytes Cyberlabs (UK)',
    location: 'Remote',
    period: 'Jun 2024 – Dec 2024',
    status: 'Past',
    tone: 'closed',
    icon: Shield,
    short: 'Automated investigation tooling and co-developed hardware to defend field devices against juice-jacking attacks.',
    full: [
      'Contributed to a comprehensive forensic investigation toolkit',
      'Authored technical documentation and investigation manuals',
      'Co-developed hardware prototypes preventing juice-jacking attacks on field devices',
      'Improved investigation efficiency through automation',
    ],
  },
  {
    code: 'KJS',
    role: 'Application Developer Intern',
    company: 'K.J. Somaiya College of Engineering',
    location: 'Mumbai, India',
    period: 'Jan 2023 – Mar 2023',
    status: 'Past',
    tone: 'closed',
    icon: Code2,
    short: 'Led interface design and development of an Android app for medicine redistribution, with measurable community impact.',
    full: [
      'Built mobile interfaces in Java and Android Studio',
      'Designed user-experience flows in Figma for optimal usability',
      'Led end-to-end development of the medicine-redistribution application',
      'Delivered measurable community-health impact through the platform',
    ],
  },
];

const toneDot = { active: 'hsl(var(--accent))', closed: '#8a93a6' };

const BlotterRow = ({ exp, open, onToggle, index, dim }) => (
  <div className={`border-b border-border/60 last:border-0 transition-opacity duration-300 ${exp.tone === 'active' ? 'bg-accent/[0.04]' : ''} ${dim ? 'opacity-30' : 'opacity-100'}`}>
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 md:gap-4 px-3 md:px-4 py-4 text-left hover:bg-muted/30 transition-colors"
      data-testid={`experience-row-${index}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: toneDot[exp.tone], boxShadow: `0 0 8px ${toneDot[exp.tone]}` }}
      />
      <span className={`font-mono text-[10px] font-bold border rounded px-1.5 py-0.5 shrink-0 w-14 text-center ${exp.tone === 'active' ? 'text-accent border-accent/40 bg-accent/10' : 'text-muted-foreground border-border'}`}>
        {exp.code}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm md:text-base font-semibold text-foreground truncate">{exp.role}</div>
        <div className="text-xs text-primary truncate">{exp.company}</div>
      </div>
      <span className="hidden md:block font-mono text-xs text-muted-foreground tabular-nums shrink-0">{exp.period}</span>
      <span className={`hidden sm:block font-mono text-[9px] uppercase tracking-widest shrink-0 w-16 text-right ${exp.tone === 'active' ? 'text-accent' : 'text-muted-foreground'}`}>{exp.status}</span>
      <ChevronDown size={16} className={`shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-4 md:px-6 pb-5 pt-1">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <exp.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.short}</p>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground mb-3 md:hidden">{exp.period} · {exp.location}</div>
            <ul className="space-y-2 border-t border-border/60 pt-3">
              {exp.full.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="text-accent font-mono text-xs mt-0.5">▸</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIdx, setOpenIdx] = useState(0);
  const [selectedLoc, setSelectedLoc] = useState(null);

  const pickLoc = (loc) => {
    setSelectedLoc((prev) => (prev === loc ? null : loc));
    const firstMatch = experiences.findIndex((e) => codeToLoc[e.code] === loc);
    if (firstMatch >= 0 && selectedLoc !== loc) setOpenIdx(firstMatch);
  };

  return (
    <section id="experience" className="py-20 md:py-32 relative" ref={ref} data-testid="experience-section">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.12] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="06"
          code="~/experience"
          meta={`${experiences.length} roles`}
          title={<><span className="gradient-text">Experience</span></>}
          subtitle="Four roles across data engineering, finance, forensics, and development, and the places they took me."
        />

        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-6 items-start">
          {/* Journey globe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <Panel title="Journey" status="3 stops" tone="active" bodyClassName="p-0">
              <div className="relative h-[300px] sm:h-[360px] bg-[#070b14]">
                <JourneyGlobe selected={selectedLoc} onSelect={pickLoc} />
                <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70 pointer-events-none">
                  click a marker
                </div>
              </div>
              <div className="border-t border-border p-2">
                {stops.map((s) => {
                  const isSel = selectedLoc === s.loc;
                  return (
                    <button
                      key={s.city}
                      onClick={() => pickLoc(s.loc)}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded transition-colors ${isSel ? 'bg-primary/10' : 'hover:bg-muted/40'}`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: s.tone === 'active' ? 'hsl(var(--accent))' : '#13c7e0', boxShadow: `0 0 8px ${s.tone === 'active' ? 'hsl(var(--accent))' : '#13c7e0'}` }}
                      />
                      <span className={`text-sm flex-1 text-left ${isSel ? 'text-primary' : 'text-foreground/90'}`}>{s.city}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{s.note}</span>
                    </button>
                  );
                })}
              </div>
            </Panel>
          </motion.div>

          {/* Blotter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Panel title="Roles" status={`${experiences.length} total`} bodyClassName="p-0">
              {selectedLoc && (
                <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-primary/[0.06] font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-muted-foreground">Filtered:</span>
                  <span className="text-primary">{selectedLoc}</span>
                  <button onClick={() => setSelectedLoc(null)} className="ml-auto text-muted-foreground hover:text-foreground">clear ✕</button>
                </div>
              )}
              <div className="hidden md:flex items-center gap-4 px-4 py-2 border-b border-border bg-background/30 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                <span className="w-1.5" />
                <span className="w-14 text-center">Org</span>
                <span className="flex-1">Role / Company</span>
                <span>Period</span>
                <span className="w-16 text-right">Status</span>
                <span className="w-4" />
              </div>
              {experiences.map((exp, i) => (
                <BlotterRow
                  key={exp.code}
                  exp={exp}
                  index={i}
                  open={openIdx === i}
                  dim={selectedLoc && codeToLoc[exp.code] !== selectedLoc}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              ))}
            </Panel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
