import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { hero, profile } from '../content';
import { Glass } from './glass/Glass';
import { Dock } from './glass/Dock';
import { LiquidLens } from './glass/LiquidLens';
import { smoothScrollTo } from './SmoothScroll';
import { ease } from './ui/section';
import { cn } from '../lib/utils';

const localTime = () =>
  new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: profile.timezone });

const Clock = () => {
  const [time, setTime] = useState(localTime);
  useEffect(() => {
    const id = setInterval(() => setTime(localTime()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} CT</span>;
};

/** Name that comes into focus one letter at a time. */
const FocusName = ({ text }) => (
  <motion.h1
    initial="hidden"
    animate="show"
    transition={{ staggerChildren: 0.035, delayChildren: 0.25 }}
    aria-label={text}
    className="text-[52px] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-[80px] md:text-[112px] lg:text-[128px]"
    data-testid="hero-name"
  >
    {text.split('').map((ch, i) => (
      <motion.span
        key={i}
        aria-hidden="true"
        className="inline-block"
        variants={{
          hidden: { opacity: 0, y: '0.25em', filter: 'blur(14px)' },
          show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
        }}
      >
        {ch === ' ' ? ' ' : ch}
      </motion.span>
    ))}
  </motion.h1>
);

const rise = (delay) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } },
  transition: { duration: 0.9, delay, ease },
});

const NowStrip = () => (
  <Glass radius={26} className="grid grid-cols-2 overflow-hidden lg:grid-cols-4">
    {hero.now.map((item, i) => {
      const body = (
        <>
          <span className="meta">{item.label}</span>
          <span className="mt-1 block text-[15px] font-semibold tracking-[-0.015em] text-foreground">{item.value}</span>
          <span className="block text-[13px] text-muted-foreground">
            {item.clock ? (
              <>
                {item.note} · <Clock />
              </>
            ) : (
              item.note
            )}
          </span>
        </>
      );
      const cls = cn(
        'block px-5 py-4 text-left',
        i % 2 === 1 && 'border-l border-foreground/[0.07]',
        i >= 2 && 'border-t border-foreground/[0.07] lg:border-t-0',
        i === 2 && 'lg:border-l'
      );
      return item.href ? (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo(item.href);
          }}
          className={cn(cls, 'transition-colors hover:bg-white/25 dark:hover:bg-white/5')}
        >
          {body}
        </a>
      ) : (
        <div key={item.label} className={cls}>
          {body}
        </div>
      );
    })}
  </Glass>
);

export const HeroSection = () => {
  const ref = useRef(null);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-28 md:pb-16 md:pt-32"
      data-testid="hero-section"
    >
      <div className="container-page relative text-center">
        <motion.div {...rise(0.05)} className="flex justify-center">
          <Glass radius={999} className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[13px] font-medium text-foreground/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </Glass>
        </motion.div>

        <div className="mt-7">
          <FocusName text={profile.name} />
        </div>

        <motion.p {...rise(0.75)} className="mt-5 text-[26px] font-semibold tracking-[-0.03em] md:text-[36px]">
          <span className="text-shine">{hero.role}</span>
        </motion.p>

        <motion.p {...rise(0.9)} className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-[20px]">
          {hero.lede}
        </motion.p>
        <motion.p {...rise(1)} className="meta mx-auto mt-2 max-w-2xl">
          {hero.sub}
        </motion.p>

        <motion.div {...rise(1.15)} className="mt-9 flex justify-center" data-testid="hero-cta">
          <Dock />
        </motion.div>

        <motion.div {...rise(1.3)} className="mx-auto mt-12 max-w-4xl md:mt-16">
          <NowStrip />
        </motion.div>
      </div>

      <LiquidLens constraintsRef={ref} className="left-[76%] top-[19%] md:left-[70%] md:top-[22%]" />

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 2 }, y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
          onClick={() => smoothScrollTo('#work')}
          aria-label="Scroll to work"
          className="text-foreground/40 transition-colors hover:text-foreground"
        >
          <ChevronDown size={26} />
        </motion.button>
      </div>
    </section>
  );
};
