import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Quote, ExternalLink, ChevronDown, BadgeCheck } from 'lucide-react';
import { Panel } from './ui/panel';
import { SectionHeader } from './ui/section-header';

const rec = {
  analyst: 'Linzee Burch, MBA',
  title: 'Communications Manager · TAMU Division of Finance & Business Services',
  date: 'March 31, 2026',
  relationship: 'Worked with Ujjawal at Texas A&M University',
  link: 'https://www.linkedin.com/in/ujjawal-patel-7508b8199/',
  highlight:
    'A level of professional maturity and technical skill that far exceeds the typical expectations for a student worker.',
  pulls: [
    'Translating technical tasks into understandable comprehension and training for others is what will set UJ apart from the standard of an effective Data or Business Analyst.',
    'He doesn’t just wait for instructions; he anticipates needs and offers data-driven perspectives that help our team make better decisions.',
    'I recommend him without reservation.',
  ],
  full: [
    'UJ has proven himself to be an extremely reliable and solution-oriented team member. Helping the communications team is not part of his job description, but he jumps in without hesitation, approaching every task with speed, accuracy, and a positive attitude.',
    'One of his most significant contributions was helping us meet the ADA Title II accessibility requirements for our division’s website. He executed it without flaw, then documented his process and trained our permanent staff on the workflows he used so we could grow our skillsets.',
    'He operates with total transparency, keeping the team informed of his progress and consistently going above and beyond what is asked of him.',
  ],
};

export const RecommendationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [open, setOpen] = useState(false);

  return (
    <section id="recommendations" className="py-20 md:py-32 relative" ref={ref} data-testid="recommendations-section">
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.15] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="08"
          code="~/recommendation"
          meta="verified"
          title={<><span className="gradient-text">Recommendation</span></>}
          subtitle="A reference from a manager at Texas A&M, verified on LinkedIn."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Panel title={rec.analyst} status="verified" tone="live">
            <div className="grid md:grid-cols-[220px_1fr] gap-6">
              {/* author block */}
              <div className="flex flex-col gap-3 md:border-r border-border md:pr-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold">
                  LB
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{rec.analyst}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rec.title}</p>
                </div>
                <div className="pt-3 border-t border-border/60 space-y-1.5 text-xs text-muted-foreground">
                  <p>{rec.relationship}</p>
                  <p>{rec.date}</p>
                  <p className="flex items-center gap-1.5 text-[#18c08f]"><BadgeCheck size={13} /> Verified on LinkedIn</p>
                </div>
              </div>

              {/* quote block */}
              <div>
                <Quote className="w-7 h-7 text-primary/40 mb-3" />
                <p className="text-lg md:text-xl font-display text-foreground leading-snug mb-4">
                  &ldquo;{rec.highlight}&rdquo;
                </p>
                <ul className="space-y-3 mb-5">
                  {rec.pulls.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-accent font-mono text-xs mt-1">▸</span>{p}
                    </li>
                  ))}
                </ul>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 border-t border-border/60 pt-4 mb-4">
                        {rec.full.map((p, i) => (
                          <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-primary/80"
                  >
                    {open ? 'Show less' : 'Read full letter'}
                    <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <a href={rec.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-accent">
                    View on LinkedIn <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </Panel>
        </motion.div>
      </div>
    </section>
  );
};
