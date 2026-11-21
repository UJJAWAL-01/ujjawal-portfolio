import { motion } from 'framer-motion';
import { Code2, Database, Map, Sparkles, Cloud } from 'lucide-react';
import { stack } from '../content';
import { Glass } from './glass/Glass';
import { Section, SectionHead, Reveal } from './ui/section';
import { cn } from '../lib/utils';

const icons = { Languages: Code2, 'Data engineering': Database, Geospatial: Map, 'AI & agents': Sparkles, 'Cloud & tools': Cloud };

// Bento layout: wide tiles for the long groups
const span = { 'Data engineering': 'md:col-span-2', Geospatial: 'md:col-span-2' };

export const StackSection = () => (
  <Section id="stack">
    <SectionHead eyebrow="Toolbox" title="What I work with." />
    <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3 md:gap-5">
      {stack.map((g, gi) => {
        const Icon = icons[g.group] ?? Code2;
        const ai = g.group === 'AI & agents';
        return (
          <Reveal key={g.group} delay={gi * 0.05} className={cn('h-full', span[g.group])}>
            <Glass radius={28} className={cn('h-full p-6', ai && 'ring-1 ring-accent/25')}>
              <div className="mb-4 flex items-center gap-2.5">
                <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', ai ? 'bg-accent text-white' : 'bg-accent-soft text-accent')}>
                  <Icon size={17} />
                </span>
                <h3 className="text-[16px] font-semibold tracking-[-0.02em]">{g.group}</h3>
              </div>
              <motion.div
                className="flex flex-wrap gap-1.5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ staggerChildren: 0.03, delayChildren: 0.15 }}
              >
                {g.items.map((s) => (
                  <motion.span
                    key={s}
                    className="chip"
                    variants={{ hidden: { opacity: 0, scale: 0.8, y: 6 }, show: { opacity: 1, scale: 1, y: 0 } }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </Glass>
          </Reveal>
        );
      })}
    </div>
  </Section>
);
