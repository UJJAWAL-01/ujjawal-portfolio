import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Linkedin, Mail, Github, FileText, Zap, ZapOff, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useMotionPref } from '../context/MotionContext';
import { smoothScrollTo } from './SmoothScroll';
import { Button } from './ui/button';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Refs', href: '#recommendations' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lite, toggleLite } = useMotionPref();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active-section tracking
  useEffect(() => {
    const ids = ['hero', ...navLinks.map((l) => l.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href) => {
    smoothScrollTo(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border py-2.5'
            : 'bg-transparent py-4'
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('#hero');
              }}
              className="flex items-center gap-2 text-[1.35rem] font-display font-bold tracking-tight"
              whileHover={{ scale: 1.03 }}
              data-testid="navbar-logo"
            >
              <span className="w-2 h-2 rounded-full bg-accent caret-blink" />
              <span className="text-primary">Ujjawal</span>
              <span className="text-foreground">Patel</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5" data-testid="desktop-nav">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative px-2 py-1.5 font-mono text-[12px] uppercase tracking-wide rounded transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    data-testid={`nav-link-${link.label.toLowerCase()}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded border border-primary/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => window.dispatchEvent(new Event('palette:open'))}
                className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                title="Command palette"
                data-testid="command-open"
              >
                <Search size={14} />
                <kbd className="font-mono text-[10px] tracking-wider">⌘K</kbd>
              </button>

              <div className="hidden md:flex items-center gap-0.5">
                <motion.a href="https://www.linkedin.com/in/ujjawal-patel-7508b8199/" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }} data-testid="social-linkedin"><Linkedin size={19} /></motion.a>
                <motion.a href="https://github.com/UJJAWAL-01" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }} data-testid="social-github"><Github size={19} /></motion.a>
                <motion.a href="mailto:ujjawal.patel@tamu.edu" className="p-2 text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }} data-testid="social-email"><Mail size={19} /></motion.a>
              </div>

              <Button variant="ghost" size="icon" onClick={toggleLite} className="rounded-md" title={lite ? 'Lite mode on, click for full effects' : 'Full effects on, click for lite mode'} data-testid="lite-toggle">
                {lite ? <ZapOff size={19} /> : <Zap size={19} className="text-accent" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-md"
                title={theme === 'dark' ? 'Session: After Hours, click for NY Open' : 'Session: NY Open, click for After Hours'}
                data-testid="theme-toggle"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><Sun size={19} /></motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Moon size={19} /></motion.div>
                  )}
                </AnimatePresence>
              </Button>

              <Button variant="ghost" size="icon" className="lg:hidden rounded-md" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-testid="mobile-menu-toggle">
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[56px] z-40 lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="mx-4 mt-2 rounded-lg border border-border bg-background/95 backdrop-blur-xl p-3">
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className={`px-4 py-3 text-left font-mono text-[15px] uppercase tracking-wider rounded transition-colors ${
                        isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                      data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                    >
                      <span className="text-accent mr-2">{isActive ? '▸' : ' '}</span>{link.label}
                    </button>
                  );
                })}
              </nav>
              <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border">
                <a href="https://www.linkedin.com/in/ujjawal-patel-7508b8199/" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary"><Linkedin size={20} /></a>
                <a href="https://github.com/UJJAWAL-01" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary"><Github size={20} /></a>
                <a href="mailto:ujjawal.patel@tamu.edu" className="p-2 text-muted-foreground hover:text-primary"><Mail size={20} /></a>
                <a href="/Resume_2026.pdf" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary"><FileText size={20} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
