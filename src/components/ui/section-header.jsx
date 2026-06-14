import { motion } from 'framer-motion';

/**
 * Workspace-window section header. Reframes each section as a maximized
 * terminal window: a status breadcrumb bar over a large left-aligned title.
 */
export const SectionHeader = ({ index, code, title, subtitle, meta, status = 'live' }) => {
  const dot = status === 'active' ? 'hsl(var(--accent))' : '#18c08f';
  return (
    <div className="mb-10 md:mb-14">
      {/* breadcrumb / window bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 border-b border-border pb-3 font-mono text-[11px] md:text-xs"
      >
        <span className="text-accent font-bold">{index}</span>
        <span className="text-muted-foreground/70">/</span>
        <span className="text-muted-foreground tracking-wider">{code}</span>
        <span className="ml-auto flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
          {meta && <span>{meta}</span>}
          <span
            className="w-1.5 h-1.5 rounded-full caret-blink"
            style={{ background: dot, boxShadow: `0 0 8px ${dot}` }}
          />
        </span>
      </motion.div>

      {/* title row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-5 md:mt-7">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[0.95]"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};
