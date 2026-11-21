import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { work } from '../content';
import { HexField } from './HexField';
import { Glass } from './glass/Glass';
import { CountUp } from './ui/count-up';
import { Section, SectionHead, Reveal, ease } from './ui/section';
import { cn } from '../lib/utils';

const shot = (url) => `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;

const Screenshot = ({ url, title }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="flex h-full w-full items-center justify-center meta">{title}</div>;
  return (
    <img
      src={shot(url)}
      alt={`${title} screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-top"
    />
  );
};

const Visual = ({ project }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <motion.div ref={ref} style={{ y, rotate }} className="relative">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[22px] bg-card shadow-[0_30px_60px_-28px_rgba(60,40,10,0.35)] ring-1 ring-foreground/[0.06]">
        {project.visual === 'hex' ? (
          <>
            <HexField className="absolute inset-0" cell={12} seed={23} scale={0.013} animate={false} />
            <span className="absolute bottom-3 left-3 rounded-full bg-card/85 px-2.5 py-1 text-[12px] font-medium text-muted-foreground backdrop-blur">
              Hover the hexagons
            </span>
          </>
        ) : (
          <Screenshot url={project.shotUrl} title={project.title} />
        )}
      </div>
    </motion.div>
  );
};

const LinkPill = ({ link }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'group inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[14px] font-medium transition-transform duration-300 hover:scale-[1.04] active:scale-95',
      link.primary
        ? 'bg-primary text-primary-foreground'
        : 'bg-[var(--glass-fill-strong)] text-foreground shadow-[var(--glass-inner),0_1px_3px_rgba(0,0,0,0.06)]'
    )}
  >
    {link.label}
    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </a>
);

const Project = ({ project, index }) => {
  const flip = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease }}
    >
      <Glass radius={34} tilt={1.5} className="p-6 sm:p-8 md:p-12">
        <div className={cn('grid items-start gap-10 lg:grid-cols-2 lg:gap-14', flip && 'lg:[&>*:first-child]:order-2')}>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{project.kicker}</span>
              {project.badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-[12px] font-semibold text-foreground/80">
                  <Sparkles size={13} className="text-accent" />
                  {project.badge}
                </span>
              )}
            </div>
            <h3 className="mt-3 text-[34px] font-semibold tracking-[-0.035em] md:text-[44px]">{project.title}</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{project.summary}</p>

            <dl className={cn('mt-8 grid gap-4', project.stats.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3')}>
              {project.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-[30px] font-semibold tracking-[-0.04em] tabular-nums md:text-[34px]">
                    <CountUp value={s.value} />
                  </dd>
                  <dd className="meta leading-4">{s.label}</dd>
                </div>
              ))}
            </dl>

            <ul className="ticks mt-8 space-y-2.5 text-[15px] leading-relaxed text-muted-foreground">
              {project.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span key={t} className="chip text-[12px]">{t}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.links.map((l) => (
                <LinkPill key={l.href} link={l} />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:pt-10">
            <Visual project={project} />
          </div>
        </div>
      </Glass>
    </motion.div>
  );
};

export const WorkSection = () => (
  <Section id="work">
    <SectionHead
      eyebrow="Selected work"
      title="Built end to end."
      intro="Two projects I designed, built, and shipped myself, from the data model to the interface."
    />
    <div className="space-y-8 md:space-y-12">
      {work.map((p, i) => (
        <Project key={p.id} project={p} index={i} />
      ))}
    </div>
    <Reveal className="mt-10 text-center">
      <span className="meta">More on GitHub, and the markets side projects further down.</span>
    </Reveal>
  </Section>
);
