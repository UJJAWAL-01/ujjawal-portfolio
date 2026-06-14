import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Top-of-page scroll progress rendered as a thin "price line" that fills
 * noise-cyan -> signal-amber as you advance through the page.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[70] h-0.5 origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
        boxShadow: '0 0 12px hsl(var(--primary) / 0.6)',
      }}
    />
  );
};
