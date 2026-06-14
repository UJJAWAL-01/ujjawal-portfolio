import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Database, BarChart3, CandlestickChart } from 'lucide-react';
import { Panel } from './ui/panel';
import { CountUp } from './ui/count-up';
import { SectionHeader } from './ui/section-header';
import { Trajectory } from './ui/trajectory';

const pillars = [
  {
    code: 'BA',
    icon: Briefcase,
    title: 'Business Analytics',
    description:
      'Ambiguous business questions, translated into the metrics, models, and trade-offs a decision actually turns on.',
  },
  {
    code: 'DE',
    icon: Database,
    title: 'Data Engineering',
    description:
      'Messy, large-scale data cleaned, normalized, and pipelined into reliable, query-ready foundations.',
  },
  {
    code: 'DA',
    icon: BarChart3,
    title: 'Data Analysis',
    description:
      'Exploratory analysis and visualization that finds the signal and holds up under scrutiny.',
  },
  {
    code: 'TMA',
    icon: CandlestickChart,
    title: 'Technical Market Analysis',
    description:
      'Systematic, indicator-driven strategies. Built, backtested, and run against live markets.',
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 md:py-32 relative" ref={ref} data-testid="about-section">
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="01"
          code="~/about"
          meta="profile"
          title={<>About <span className="gradient-text">Me</span></>}
          subtitle="The short version up top. The longer story is in the terminal."
        />

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Bio panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Panel code="BIO" title="Ujjawal Patel" status="Active" tone="active" className="h-full">
              <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-5">
                Making large data
                <span className="gradient-text"> make sense.</span>
              </h2>
              <div className="space-y-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  I'm an MIS grad student at <span className="text-foreground">Texas A&amp;M</span>,
                  with a computer engineering background. Most of what I do lives at the messy
                  point where business questions meet large datasets: getting the data clean,
                  modeling it, and turning it into something people can actually decide on.
                </p>
                <p>
                  Right now I'm a <span className="text-foreground">Data Engineering Intern at the
                  Texas A&amp;M Transportation Institute</span>, working across large statewide
                  datasets.
                </p>
                <p className="text-foreground/80">
                  Markets are the part I keep coming back to. They don't care about your opinion,
                  which is exactly why I like building and testing strategies there.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-border/60 grid grid-cols-3 gap-3">
                {[
                  { value: 8, suffix: '+', label: 'PROJECTS' },
                  { value: 5, suffix: '', label: 'CERTIFICATIONS' },
                  { value: 2027, suffix: '', label: 'MS · GRAD', static: true },
                ].map((s) => (
                  <div key={s.label} className="font-mono">
                    <div className="text-xl font-bold text-primary">
                      {s.static ? s.value : <CountUp value={s.value} suffix={s.suffix} />}
                    </div>
                    <div className="text-[9px] tracking-[0.15em] text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-[#18c08f] caret-blink shrink-0" />
                Available for full-time roles from May 2027
              </div>
            </Panel>
          </motion.div>

          {/* Pillars */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <Panel code={p.code} title={p.title} tilt className="h-full group">
                  <div className="w-11 h-11 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </Panel>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trajectory */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <Panel title="Trajectory" status="2023 to 2027">
            <Trajectory />
          </Panel>
        </motion.div>
      </div>
    </section>
  );
};
