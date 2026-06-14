import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, TrendingUp, LineChart, Calculator, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Panel } from './ui/panel';
import { Sparkline } from './ui/sparkline';
import { SectionHeader } from './ui/section-header';

// Live screenshot of the deployed app via thum.io (falls back to icon on error).
const shot = (url) => `https://image.thum.io/get/width/1200/crop/760/noanimate/${url}`;

const projects = [
  {
    code: 'NXS',
    title: 'NEXUS Trading Intelligence',
    icon: TrendingUp,
    link: 'https://nexus-trading-nine.vercel.app/',
    tags: ['Python', 'TypeScript', 'Open Source', 'Multi-Timeframe'],
    status: 'FEATURED',
    tone: 'featured',
    chart: true,
    seed: 19,
    wide: true,
    description:
      'A real-time trading dashboard that runs entirely in the browser, with no backend. It streams multi-timeframe technical analysis client-side, and you can start using it without a subscription or any API keys.',
  },
  {
    code: 'SCE',
    title: 'Signal Confidence Engine',
    icon: TrendingUp,
    link: 'https://signal-confidence-engine.vercel.app/',
    tags: ['Python', 'Technical Analysis', 'Multi-Timeframe'],
    status: 'LIVE',
    tone: 'live',
    chart: true,
    seed: 47,
    description:
      'Pulls trend, momentum, volume, and price structure across timeframes into a single confidence score. Every signal comes with the reasoning behind it, not just a verdict.',
  },
  {
    code: 'SEA',
    title: 'Sector ETF Analyzer',
    icon: LineChart,
    link: 'https://sector-rotatio-analyzer-iblxmim8yvj3krgenrxbmv.streamlit.app/',
    tags: ['Python', 'Streamlit', 'Risk Metrics', 'Backtesting'],
    status: 'LIVE',
    tone: 'live',
    chart: true,
    seed: 71,
    description:
      'Ranks sector leadership on risk-adjusted metrics like Sharpe and Alpha, with a built-in dual-momentum backtester for trying rotation strategies before any capital is on the line.',
  },
  {
    code: 'CFP',
    title: 'Consolidated Financial Planner',
    icon: Calculator,
    link: null,
    tags: ['Python', 'SQL', 'Figma', 'Financial Planning'],
    status: 'PRIVATE',
    tone: 'private',
    chart: false,
    seed: 5,
    wide: true,
    description:
      'Puts SIPs, bonds, PPF, and equities side by side so the trade-offs are obvious before any money actually moves. Designed in Figma, modeled in SQL.',
  },
];

const toneDot = { featured: 'hsl(var(--accent))', live: '#18c08f', private: '#ff5f56' };

const Preview = ({ project, tall }) => (
  <div className={`relative ${tall ? 'h-full min-h-[240px]' : 'h-52'} overflow-hidden bg-muted/40`}>
    {project.link ? (
      <img
        src={shot(project.link)}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
        onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
      />
    ) : null}
    {/* fallback / private */}
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/60 to-background"
      style={{ display: project.link ? 'none' : 'flex' }}
    >
      <project.icon className="w-16 h-16 text-primary/40" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent pointer-events-none" />
    <div className="absolute top-3 left-3 flex items-center gap-2">
      <span className="font-mono text-[10px] font-bold text-accent border border-accent/40 bg-background/80 backdrop-blur rounded px-1.5 py-0.5">
        {project.code}
      </span>
      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground bg-background/80 backdrop-blur rounded px-1.5 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: toneDot[project.tone] }} />
        {project.status}
      </span>
    </div>
    {project.chart && (
      <div className="absolute bottom-3 right-3 bg-background/70 backdrop-blur rounded px-2 py-1 border border-border/60">
        <Sparkline seed={project.seed} points={26} trend={1.0} width={76} height={20} area />
      </div>
    )}
  </div>
);

const Body = ({ project, big }) => (
  <div className={`${big ? 'p-7 md:p-9' : 'p-6'} flex flex-col ${big ? 'justify-center' : ''} h-full`}>
    <h3 className={`font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${big ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
      {project.title}
    </h3>
    <p className={`text-muted-foreground leading-relaxed mb-5 ${big ? 'text-[15px] max-w-xl' : 'text-sm'}`}>
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2 mb-6">
      {project.tags.map((tag) => (
        <span key={tag} className="font-mono text-[11px] text-primary/80 border border-primary/20 bg-primary/5 rounded px-2 py-0.5">{tag}</span>
      ))}
    </div>
    <div className="mt-auto">
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-md gap-2 font-mono text-sm uppercase tracking-wider glow-primary">
            Open Project <ExternalLink size={15} />
          </Button>
        </a>
      ) : (
        <Button variant="outline" disabled className="rounded-md gap-2 font-mono text-sm uppercase tracking-wider opacity-60">
          <Lock size={14} /> Private Repository
        </Button>
      )}
    </div>
  </div>
);

const ProjectCard = ({ project, index, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={project.wide ? 'md:col-span-2' : ''}
    data-testid={`project-card-${index}`}
  >
    <Panel code={project.code} title={project.title} status={project.status} tone={project.tone} tilt={!project.wide} className="h-full group overflow-hidden" bodyClassName="p-0">
      {project.wide ? (
        <div className="grid md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-border/60">
            <Preview project={project} tall />
          </div>
          <Body project={project} big />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="border-b border-border/60">
            <Preview project={project} />
          </div>
          <Body project={project} />
        </div>
      )}
    </Panel>
  </motion.div>
);

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 md:py-32 relative" ref={ref} data-testid="projects-section">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="04"
          code="~/projects"
          meta={`${projects.length} projects`}
          title={<>Selected <span className="gradient-text">Work</span></>}
          subtitle="Tools I actually use, built to turn data into decisions."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.code} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};
