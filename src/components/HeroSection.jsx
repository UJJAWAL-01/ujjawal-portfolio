import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Linkedin, Github, Mail, FileText, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { ScrambleText } from './ScrambleText';
import { DataField } from './three/DataField';
import { useMotionPref } from '../context/MotionContext';
import { smoothScrollTo } from './SmoothScroll';
import resume from '../assets/Resume_2026.pdf';

const BOOT_LINES = [
  '> ujjawal_terminal v2.7  (c) 2026',
  '> LOGIN: guest',
  '> AUTHENTICATING ............... OK',
  '> ACCESS GRANTED',
  '> loading sources [ txdot · markets · bi ] ... ok',
  '> launching profile: ujjawal.patel',
];

const BootOverlay = ({ onDone }) => {
  const [lines, setLines] = useState([]);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let li = 0;
    let ci = 0;
    let timer;

    const step = () => {
      if (li >= BOOT_LINES.length) {
        timer = setTimeout(onDone, 400);
        return;
      }
      const current = BOOT_LINES[li];
      if (ci <= current.length) {
        setTyped(current.slice(0, ci));
        ci += 1;
        timer = setTimeout(step, 14);
      } else {
        setLines((prev) => [...prev, current]);
        setTyped('');
        li += 1;
        ci = 0;
        timer = setTimeout(step, 90);
      }
    };
    step();
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-30 flex items-center justify-center bg-background"
    >
      <div className="font-mono text-sm md:text-base text-primary/90 px-6 w-full max-w-xl">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre">{l}</div>
        ))}
        <div className="whitespace-pre">
          {typed}
          <span className="caret-blink text-accent">▋</span>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const { cinematic } = useMotionPref();
  const [booting, setBooting] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('booted') !== 'true';
  });

  // Skip boot entirely outside cinematic mode.
  const showBoot = booting && cinematic;

  useEffect(() => {
    if (!cinematic && booting) setBooting(false);
  }, [cinematic, booting]);

  const finishBoot = () => {
    sessionStorage.setItem('booted', 'true');
    setBooting(false);
  };

  const contentDelay = showBoot ? 0 : 0; // content animates in after boot unmounts

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* 3D data field */}
      <DataField />

      {/* blueprint grid + vignette */}
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
      {/* center scrim: light touch so the field stays full behind the copy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 44% 38% at 50% 44%, hsl(var(--background) / 0.62) 0%, hsl(var(--background) / 0.3) 50%, transparent 76%)',
        }}
      />

      <AnimatePresence>
        {showBoot && <BootOverlay onDone={finishBoot} />}
      </AnimatePresence>

      {/* Content */}
      {!showBoot && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: contentDelay }}
              className="kicker mb-5"
            >
              [ signal from noise ]
            </motion.p>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6"
              data-testid="hero-name"
            >
              <ScrambleText text="Ujjawal" delay={150} className="text-foreground" />{' '}
              <ScrambleText
                text="Patel"
                delay={450}
                className="gradient-text text-glow-primary"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-xl mx-auto text-base md:text-lg text-foreground/90 leading-relaxed mb-7 [text-shadow:0_2px_22px_hsl(var(--background)),0_0_3px_hsl(var(--background))]"
            >
              Large datasets, turned into analysis people can actually use.
              Built across data engineering, analytics, and the markets.
            </motion.p>

            {/* Identity status strip, readable over the field */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mb-9 px-2 font-mono text-sm md:text-[15px] text-foreground/90 [text-shadow:0_1px_14px_hsl(var(--background)),0_0_4px_hsl(var(--background))]"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent caret-blink" />
                <span>MS MIS · Texas A&amp;M</span>
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span>Data Engineering Intern · TTI</span>
              <span className="text-muted-foreground/50">|</span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin size={15} className="text-primary" />
                College Station, TX
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3"
              data-testid="hero-cta"
            >
              <a href="https://www.linkedin.com/in/ujjawal-patel-7508b8199/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="rounded-full gap-2"><Linkedin size={18} /> LinkedIn</Button>
              </a>
              <a href="https://github.com/UJJAWAL-01" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="rounded-full gap-2"><Github size={18} /> GitHub</Button>
              </a>
              <a href="mailto:ujjawal.patel@tamu.edu">
                <Button variant="outline" size="lg" className="rounded-full gap-2"><Mail size={18} /> Email</Button>
              </a>
              <a href={resume} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full gap-2 glow-primary"><FileText size={18} /> Resume</Button>
              </a>
            </motion.div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      {!showBoot && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          onClick={() => smoothScrollTo('#about')}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          data-testid="scroll-indicator"
          aria-label="Scroll to about"
        >
          <ChevronDown size={28} />
        </motion.button>
      )}
    </section>
  );
};
