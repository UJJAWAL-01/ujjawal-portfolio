import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, FolderGit2, Briefcase, PenLine, User, Mail, Command } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { smoothScrollTo } from './SmoothScroll';
import { Glass } from './glass/Glass';
import { notify } from './glass/Island';
import { nav, profile } from '../content';
import { cn } from '../lib/utils';

const icons = { work: FolderGit2, experience: Briefcase, writing: PenLine, about: User, contact: Mail };
const spring = { type: 'spring', stiffness: 380, damping: 32 };

const Mark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 6 L54.5 19 V45 L32 58 L9.5 45 V19 Z" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinejoin="round" />
    <path d="M32 22 L40.7 27 V37 L32 42 L23.3 37 V27 Z" fill="hsl(var(--accent))" />
  </svg>
);

const useActiveSection = () => {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
};

const ThemeButton = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const toggle = () => {
    toggleTheme();
    notify(theme === 'dark' ? 'Light mode' : 'Dark mode');
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      data-testid="theme-toggle"
      className={cn('relative flex h-9 w-9 items-center justify-center rounded-full text-foreground/75 transition-colors hover:text-foreground', className)}
    >
      <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} transition={spring}>
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </motion.span>
    </button>
  );
};

export const Navbar = () => {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => (e) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  return (
    <>
      {/* Desktop: one floating capsule */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-50 hidden justify-center md:flex"
      >
        <Glass
          refract
          radius={30}
          bezel={12}
          strength={30}
          strong={scrolled}
          className={cn('flex items-center gap-1 py-1.5 pl-4 pr-1.5 transition-[padding] duration-500', scrolled && 'pl-3')}
        >
          <a href="#hero" onClick={go('#hero')} className="mr-3 flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
            <Mark />
            <span>{profile.name}</span>
          </a>

          <nav className="flex items-center" aria-label="Primary">
            {nav.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={go(l.href)}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors',
                    isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-droplet"
                      transition={spring}
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--glass-fill-strong)] shadow-[var(--glass-inner),0_2px_8px_-3px_rgba(0,0,0,0.18)]"
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>

          <span className="mx-1.5 h-5 w-px bg-foreground/10" />
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('palette:open'))}
            aria-label="Open command menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/75 transition-colors hover:text-foreground"
          >
            <Command size={16} />
          </button>
          <ThemeButton />
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex h-9 items-center rounded-full bg-primary px-4 text-[14px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            Résumé
          </a>
        </Glass>
      </motion.header>

      {/* Mobile: small top pill + bottom tab bar */}
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:hidden">
        <Glass radius={24} strong={scrolled} className="flex w-full items-center justify-between py-1 pl-4 pr-1">
          <a href="#hero" onClick={go('#hero')} className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
            <Mark />
            {profile.name}
          </a>
          <div className="flex items-center">
            <ThemeButton />
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex h-8 items-center rounded-full bg-primary px-3 text-[13px] font-medium text-primary-foreground">
              Résumé
            </a>
          </div>
        </Glass>
      </header>

      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden"
      >
        <Glass refract radius={30} bezel={12} strength={26} strong className="flex w-full max-w-md items-center justify-between px-1.5 py-1.5">
          {nav.map((l) => {
            const Icon = icons[l.icon];
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={go(l.href)}
                className={cn(
                  'relative flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-medium transition-colors',
                  isActive ? 'text-accent' : 'text-foreground/60'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-droplet"
                    transition={spring}
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--glass-fill-strong)] shadow-[var(--glass-inner)]"
                  />
                )}
                <Icon size={19} />
                {l.label}
              </a>
            );
          })}
        </Glass>
      </nav>
    </>
  );
};
