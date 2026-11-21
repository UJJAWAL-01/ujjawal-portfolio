import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Glass } from './Glass';
import { profile } from '../../content';

export const MediumIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <ellipse cx="7" cy="12" rx="6" ry="6.2" />
    <ellipse cx="16.6" cy="12" rx="3" ry="5.8" />
    <ellipse cx="21.9" cy="12" rx="1.1" ry="5.2" />
  </svg>
);

export const dockItems = [
  { label: 'GitHub', href: profile.links.github, icon: Github },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin },
  { label: 'Medium', href: profile.links.medium, icon: MediumIcon },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Résumé', href: profile.resume, icon: FileText },
];

const BASE = 46;
const PEAK = 66;

const DockIcon = ({ item, mouseX }) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  // Measure the icon's resting center once per hover, not on every mouse move
  const center = useRef(null);
  const distance = useTransform(mouseX, (x) => {
    if (x === Infinity) {
      center.current = null;
      return Infinity;
    }
    if (center.current == null) {
      const b = ref.current?.getBoundingClientRect();
      if (!b) return Infinity;
      center.current = b.left + b.width / 2;
    }
    return x - center.current;
  });
  const sizeRaw = useTransform(distance, [-150, 0, 150], [BASE, PEAK, BASE]);
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 180, damping: 14 });
  const external = item.href.startsWith('http') || item.label === 'Résumé';
  const Icon = item.icon;

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      style={{ width: size, height: size }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="relative flex shrink-0 items-center justify-center rounded-full bg-[var(--glass-fill-strong)] text-foreground/85 shadow-[var(--glass-inner),0_2px_8px_-2px_rgba(0,0,0,0.12)] transition-colors hover:text-accent"
    >
      <Icon size={20} />
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-full bg-[hsl(30_15%_10%)] px-2.5 py-1 text-[12px] font-medium text-white dark:bg-white dark:text-[hsl(222_16%_11%)]"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

/** macOS-style dock: icons swell as the pointer passes over them. */
export const Dock = ({ className }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <Glass
      radius={34}
      className={`inline-flex h-[70px] items-end gap-2.5 px-3 pb-3 ${className ?? ''}`}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      role="navigation"
      aria-label="Links"
    >
      {dockItems.map((item) => (
        <DockIcon key={item.label} item={item} mouseX={mouseX} />
      ))}
    </Glass>
  );
};
