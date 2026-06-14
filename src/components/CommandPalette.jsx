import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, CornerDownLeft, User, GraduationCap, BarChart3, FolderGit2,
  FlaskConical, Briefcase, Award, Star, Mail, Linkedin, Github, FileText,
  SunMoon, Zap, ArrowUp, ArrowDown,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useMotionPref } from '../context/MotionContext';
import { smoothScrollTo } from './SmoothScroll';
import resume from '../assets/Resume_2026.pdf';

export const CommandPalette = () => {
  const { toggleTheme } = useTheme();
  const { toggleLite } = useMotionPref();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => {
    const go = (sel) => () => smoothScrollTo(sel);
    const ext = (url) => () => window.open(url, '_blank', 'noopener');
    return [
      { id: 'about', label: 'About', hint: 'section', icon: User, group: 'Navigate', run: go('#about') },
      { id: 'education', label: 'Education', hint: 'section', icon: GraduationCap, group: 'Navigate', run: go('#education') },
      { id: 'skills', label: 'Skills & Tools', hint: 'section', icon: BarChart3, group: 'Navigate', run: go('#skills') },
      { id: 'projects', label: 'Selected Work', hint: 'section', icon: FolderGit2, group: 'Navigate', run: go('#projects') },
      { id: 'research', label: 'Research', hint: 'section', icon: FlaskConical, group: 'Navigate', run: go('#research') },
      { id: 'experience', label: 'Experience', hint: 'section', icon: Briefcase, group: 'Navigate', run: go('#experience') },
      { id: 'certs', label: 'Certifications', hint: 'section', icon: Award, group: 'Navigate', run: go('#certifications') },
      { id: 'recs', label: 'Recommendation', hint: 'section', icon: Star, group: 'Navigate', run: go('#recommendations') },
      { id: 'contact', label: 'Contact', hint: 'section', icon: Mail, group: 'Navigate', run: go('#contact') },
      { id: 'resume', label: 'Open Résumé', hint: 'PDF', icon: FileText, group: 'Actions', run: ext(resume) },
      { id: 'email', label: 'Email Ujjawal', hint: 'mailto', icon: Mail, group: 'Actions', run: () => (window.location.href = 'mailto:ujjawal.patel@tamu.edu') },
      { id: 'linkedin', label: 'LinkedIn', hint: 'profile', icon: Linkedin, group: 'Actions', run: ext('https://www.linkedin.com/in/ujjawal-patel-7508b8199/') },
      { id: 'github', label: 'GitHub', hint: 'repos', icon: Github, group: 'Actions', run: ext('https://github.com/UJJAWAL-01') },
      { id: 'session', label: 'Toggle theme (light / dark)', hint: 'theme', icon: SunMoon, group: 'Settings', run: toggleTheme },
      { id: 'lite', label: 'Toggle effects (lite mode)', hint: '3D on/off', icon: Zap, group: 'Settings', run: toggleLite },
      { id: 'top', label: 'Jump to Top', hint: 'g', icon: ArrowUp, group: 'Settings', run: go('#hero') },
      { id: 'bottom', label: 'Jump to Bottom', hint: 'G', icon: ArrowDown, group: 'Settings', run: go('#contact') },
    ];
  }, [toggleTheme, toggleLite]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + ' ' + c.hint + ' ' + c.group).toLowerCase().includes(q));
  }, [query, commands]);

  // Global hotkeys to open
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (!typing && (e.key === '/' || e.key === '?')) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const openEvt = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('palette:open', openEvt);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('palette:open', openEvt);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (cmd) => {
    setOpen(false);
    setTimeout(() => cmd.run(), 60);
  };

  const onListKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) run(filtered[active]); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[14vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl panel overflow-hidden"
          >
            {/* input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search size={16} className="text-primary shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKey}
                placeholder="Type a command or section…  e.g. PROJ, resume, session"
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground font-mono"
              />
              <kbd className="font-mono text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            {/* list */}
            <div className="max-h-[52vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">No matches.</div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(cmd)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === active ? 'bg-primary/10' : 'hover:bg-muted/40'
                  }`}
                >
                  <cmd.icon size={16} className={i === active ? 'text-primary' : 'text-muted-foreground'} />
                  <span className={`flex-1 text-sm ${i === active ? 'text-foreground' : 'text-muted-foreground'}`}>{cmd.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{cmd.group}</span>
                  {i === active && <CornerDownLeft size={13} className="text-primary" />}
                </button>
              ))}
            </div>

            {/* footer / shortcuts */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 border-t border-border bg-background/40 font-mono text-[10px] text-muted-foreground">
              <span><kbd className="text-primary">↑↓</kbd> navigate</span>
              <span><kbd className="text-primary">↵</kbd> run</span>
              <span><kbd className="text-primary">j / k</kbd> sections</span>
              <span><kbd className="text-primary">g / G</kbd> top / bottom</span>
              <span className="ml-auto"><kbd className="text-accent">⌘K</kbd> / <kbd className="text-accent">/</kbd></span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
