import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ujjawal-patel-7508b8199/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/UJJAWAL-01', label: 'GitHub' },
  { icon: Mail, href: 'mailto:ujjawal.patel@tamu.edu', label: 'Email' },
];

const tickerItems = [
  'BUILT WITH REACT 19',
  'THREE.JS / R3F',
  'FRAMER MOTION',
  'TAILWIND',
  'DESIGNED & ENGINEERED BY UJJAWAL PATEL',
  'SIGNAL FROM NOISE',
];

export const Footer = () => {
  const year = new Date().getFullYear();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          timeZone: 'America/Chicago',
        }) + ' CT'
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-border" data-testid="footer">
      {/* Ticker strip */}
      <div className="border-b border-border/60 bg-background/40 overflow-hidden py-2">
        <div className="flex w-max animate-ticker">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {tickerItems.map((t, i) => (
                <span key={t + dup} className="flex items-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-6">
                  <span className={i % 2 === 0 ? 'text-primary' : 'text-accent'}>›</span>
                  <span className="ml-2">{t}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <a href="#hero" className="font-display font-bold text-lg" data-testid="footer-logo">
              <span className="text-primary">Ujjawal</span> <span className="text-foreground">Patel</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18c08f] caret-blink" />
              online
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                whileHover={{ y: -2 }}
                aria-label={link.label}
                data-testid={`footer-social-${link.label.toLowerCase()}`}
              >
                <link.icon size={16} />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
            <span className="tabular-nums text-primary/80">{time}</span>
            <span className="hidden sm:inline">© {year} UP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
