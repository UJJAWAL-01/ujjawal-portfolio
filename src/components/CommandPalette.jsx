import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, CornerDownLeft, FolderGit2, Briefcase, LineChart, Wrench, User,
  Quote, Mail, Linkedin, Github, FileText, SunMoon, ArrowUp, Copy, PenLine, BookOpen,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { smoothScrollTo } from './SmoothScroll';
import { profile } from '../content';
import { notify } from './glass/Island';

export const CommandPalette = () => {
  const { toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => {
    const go = (sel) => () => smoothScrollTo(sel);
    const ext = (url) => () => window.open(url, '_blank', 'noopener');
    return [
      { id: 'work', label: 'Selected work', icon: FolderGit2, group: 'Go to', run: go('#work') },
      { id: 'experience', label: 'Experience', icon: Briefcase, group: 'Go to', run: go('#experience') },
      { id: 'writing', label: 'Writing', icon: PenLine, group: 'Go to', run: go('#writing') },
      { id: 'side', label: 'Markets, on the side', icon: LineChart, group: 'Go to', run: go('#side-work') },
      { id: 'stack', label: 'Toolbox', icon: Wrench, group: 'Go to', run: go('#stack') },
      { id: 'about', label: 'About', icon: User, group: 'Go to', run: go('#about') },
      { id: 'rec', label: 'Reference', icon: Quote, group: 'Go to', run: go('#recommendation') },
      { id: 'contact', label: 'Contact', icon: Mail, group: 'Go to', run: go('#contact') },
      { id: 'resume', label: 'Open résumé', icon: FileText, group: 'Links', run: ext(profile.resume) },
      { id: 'copy', label: 'Copy email address', icon: Copy, group: 'Links', run: () => navigator.clipboard?.writeText(profile.email).then(() => notify('Email copied')) },
      { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, group: 'Links', run: ext(profile.links.linkedin) },
      { id: 'github', label: 'GitHub', icon: Github, group: 'Links', run: ext(profile.links.github) },
      { id: 'medium', label: 'Medium', icon: BookOpen, group: 'Links', run: ext(profile.links.medium) },
      { id: 'theme', label: 'Toggle light / dark', icon: SunMoon, group: 'Settings', run: toggleTheme },
      { id: 'top', label: 'Back to top', icon: ArrowUp, group: 'Settings', run: go('#hero') },
    ];
  }, [toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(q));
  }, [query, commands]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (!typing && e.key === '/') {
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
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-background/30 px-4 pt-[14vh] backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command menu"
            className="glass glass-strong glass-blur w-full max-w-lg overflow-hidden rounded-[26px] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-foreground/10 px-5 py-3.5">
              <Search size={15} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKey}
                placeholder="Jump to a section or link…"
                className="flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-faint"
              />
              <span className="kbd">esc</span>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <div className="meta px-3 py-6 text-center">No matches.</div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(cmd)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                    i === active ? 'bg-[var(--glass-fill-strong)] text-foreground shadow-[var(--glass-inner)]' : 'text-muted-foreground'
                  }`}
                >
                  <cmd.icon size={15} className={i === active ? 'text-accent' : ''} />
                  <span className="flex-1 text-[14px]">{cmd.label}</span>
                  <span className="meta text-faint">{cmd.group}</span>
                  {i === active && <CornerDownLeft size={13} className="text-muted-foreground" />}
                </button>
              ))}
            </div>

            <div className="meta flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-foreground/10 px-5 py-2.5 text-faint">
              <span><span className="kbd">↑↓</span> move</span>
              <span><span className="kbd">↵</span> open</span>
              <span><span className="kbd">j</span> <span className="kbd">k</span> sections</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
