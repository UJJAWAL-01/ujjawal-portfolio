import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const ease = [0.22, 1, 0.36, 1];

/** Fades and sharpens content in once as it enters the viewport. */
export const Reveal = ({ children, delay = 0, y = 20, className, as = 'div', ...rest }) => {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
};

/** Heading whose words come into focus one after another. */
export const WordReveal = ({ text, as = 'h2', className, delay = 0 }) => {
  const Comp = motion[as];
  const words = text.split(' ');
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: '0.35em', filter: 'blur(10px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Comp>
  );
};

/** Centered section heading: eyebrow, large title, short intro. */
export const SectionHead = ({ eyebrow, title, intro, className }) => (
  <div className={cn('mx-auto mb-12 max-w-3xl text-center md:mb-16', className)}>
    {eyebrow && (
      <Reveal as="p" y={10} className="eyebrow">
        {eyebrow}
      </Reveal>
    )}
    <WordReveal
      text={title}
      className="mt-3 text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[56px]"
    />
    {intro && (
      <Reveal as="p" delay={0.15} className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
        {intro}
      </Reveal>
    )}
  </div>
);

export const Section = ({ id, className, children }) => (
  <section id={id} className={cn('scroll-mt-20 py-20 md:py-28', className)}>
    <div className="container-page">{children}</div>
  </section>
);

/** Inline link with a small arrow that nudges on hover. */
export const ArrowLink = ({ href, children, className, ...props }) => {
  const external = href?.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn('group inline-flex items-center gap-1 text-[15px] font-medium text-accent', className)}
      {...props}
    >
      <span className="underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-current">
        {children}
      </span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        <path d="M3.5 8.5 L8.5 3.5 M4.5 3.5 H8.5 V7.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
};
