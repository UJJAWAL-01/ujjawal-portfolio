import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience, earlierExperience } from '../content';
import { Glass } from './glass/Glass';
import { Section, SectionHead, Reveal } from './ui/section';

const Job = ({ job, index }) => (
  <Reveal delay={index * 0.05} className="relative pl-10 md:pl-14">
    {/* timeline node */}
    <span className="absolute left-[11px] top-9 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-[19px]">
      {job.current && <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/40" />}
      <span className={`relative h-3 w-3 rounded-full ring-4 ring-background ${job.current ? 'bg-accent' : 'bg-foreground/30'}`} />
    </span>

    <Glass radius={28} className="p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[22px] font-semibold tracking-[-0.025em]">{job.org}</h3>
            {job.current && (
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[12px] font-semibold text-foreground/80">Current</span>
            )}
          </div>
          <p className="meta mt-0.5">{[job.unit, job.location].filter(Boolean).join(' · ')}</p>
        </div>
        <p className="meta pt-1.5 tabular-nums">{job.period}</p>
      </div>

      <ul className="mt-5 space-y-1">
        {job.roles.map((r) => (
          <li key={r.title} className="flex flex-wrap items-baseline justify-between gap-x-4">
            <span className="text-[16px] font-semibold text-foreground">{r.title}</span>
            {r.period && <span className="meta tabular-nums">{r.period}</span>}
          </li>
        ))}
      </ul>

      <ul className="ticks mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted-foreground">
        {job.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {job.stack.map((s) => (
          <span key={s} className="chip text-[12px]">{s}</span>
        ))}
      </div>
    </Glass>
  </Reveal>
);

export const ExperienceSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="experience">
      <SectionHead eyebrow="Experience" title="Where I've worked." />

      <div ref={ref} className="relative mx-auto max-w-4xl space-y-6">
        {/* rail that fills as you scroll */}
        <div className="absolute bottom-6 left-[10px] top-9 w-[2px] rounded-full bg-foreground/10 md:left-[18px]" />
        <motion.div
          style={{ scaleY: fill }}
          className="absolute bottom-6 left-[10px] top-9 w-[2px] origin-top rounded-full bg-gradient-to-b from-accent to-accent/30 md:left-[18px]"
        />

        {experience.map((job, i) => (
          <Job key={job.org} job={job} index={i} />
        ))}

        <Reveal className="relative pl-10 md:pl-14">
          <span className="absolute left-[11px] top-7 h-3 w-3 -translate-x-1/2 rounded-full bg-foreground/20 ring-4 ring-background md:left-[19px]" />
          <Glass radius={28} className="p-6 md:p-8">
            <h3 className="meta mb-4 font-semibold uppercase tracking-[0.08em]">Earlier</h3>
            <ul className="space-y-5">
              {earlierExperience.map((e) => (
                <li key={e.title} className="grid gap-x-8 gap-y-1 md:grid-cols-[1fr_auto]">
                  <div>
                    <p className="text-[15px]">
                      <span className="font-semibold text-foreground">{e.title}</span>
                      <span className="text-muted-foreground">, {e.org}</span>
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{e.note}</p>
                  </div>
                  <span className="meta tabular-nums md:order-none md:pt-0.5">{e.period}</span>
                </li>
              ))}
            </ul>
          </Glass>
        </Reveal>
      </div>
    </Section>
  );
};
