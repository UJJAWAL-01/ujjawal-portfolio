import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Glass } from './Glass';

/**
 * A droplet of liquid glass that floats in the hero. Visitors can drag
 * it over the headline and watch the text bend through its rim.
 */
export const LiquidLens = ({ constraintsRef, className }) => {
  const [touched, setTouched] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 16, power: 0.25 }}
      whileDrag={{ scale: 1.08 }}
      whileHover={{ scale: 1.03 }}
      onDragStart={() => setTouched(true)}
      className={`absolute z-20 cursor-grab touch-none select-none active:cursor-grabbing ${className ?? ''}`}
      aria-label="Draggable glass lens"
      role="img"
    >
      <div>
        <Glass
          refract
          radius={999}
          bezel={38}
          strength={70}
          blur={0}
          className="h-[76px] w-[76px] [backdrop-filter:blur(2px)_saturate(170%)] md:h-[136px] md:w-[136px]"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          data-lit="true"
        >
          {/* specular glints */}
          <span className="pointer-events-none absolute left-[18%] top-[12%] h-[22%] w-[36%] -rotate-[24deg] rounded-full bg-white/70 blur-[3px]" />
          <span className="pointer-events-none absolute bottom-[14%] right-[20%] h-[8%] w-[14%] -rotate-[24deg] rounded-full bg-white/50 blur-[2px]" />
        </Glass>
      </div>

      <AnimatePresence>
        {!touched && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="meta pointer-events-none absolute inset-x-0 top-full mt-3 text-center whitespace-nowrap"
          >
            drag me
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
