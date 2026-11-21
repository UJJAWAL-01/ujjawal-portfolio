import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { recommendation as rec } from '../content';
import { Glass } from './glass/Glass';
import { Section, Reveal, ArrowLink, WordReveal, ease } from './ui/section';

export const RecommendationSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <Section id="recommendation">
      <Reveal className="mx-auto max-w-4xl">
        <Glass radius={36} className="px-7 py-12 text-center md:px-16 md:py-16">
          <span aria-hidden="true" className="block font-display text-[72px] leading-[0.6] text-accent">“</span>
          <WordReveal
            as="blockquote"
            text={rec.quote}
            className="mt-4 text-[24px] font-semibold leading-[1.3] tracking-[-0.03em] md:text-[34px]"
          />
          <div className="mt-8 flex flex-col items-center gap-1">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-[14px] font-semibold text-accent">LB</span>
            <span className="mt-2 text-[15px] font-semibold">{rec.author}</span>
            <span className="meta max-w-md">{rec.title} · {rec.date}</span>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="text-[15px] font-medium text-foreground/80 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground"
            >
              {open ? 'Hide the letter' : 'Read more of the letter'}
            </button>
            <ArrowLink href={rec.href}>Verified on LinkedIn</ArrowLink>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0, filter: 'blur(6px)' }}
                animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="overflow-hidden"
              >
                <div className="mx-auto mt-8 max-w-2xl space-y-4 text-left text-[15px] leading-relaxed text-muted-foreground">
                  {rec.full.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Glass>
      </Reveal>
    </Section>
  );
};
