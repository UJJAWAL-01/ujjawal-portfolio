import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

/** Show a short status message in the floating island at the top of the page. */
export const notify = (text) => window.dispatchEvent(new CustomEvent('island', { detail: { text } }));

const spring = { type: 'spring', stiffness: 420, damping: 32 };

export const Island = () => {
  const [msg, setMsg] = useState(null);
  const timer = useRef();

  useEffect(() => {
    const on = (e) => {
      clearTimeout(timer.current);
      setMsg({ text: e.detail.text, key: Date.now() });
      timer.current = setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener('island', on);
    return () => {
      window.removeEventListener('island', on);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[95] flex justify-center" aria-live="polite">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg.key}
            initial={{ opacity: 0, scale: 0.6, y: -14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.85, y: -10, filter: 'blur(4px)' }}
            transition={spring}
            className="flex items-center gap-2.5 rounded-full bg-[hsl(30_15%_10%)] py-2 pl-2.5 pr-4 text-[14px] font-medium text-white shadow-2xl shadow-black/25 dark:bg-white dark:text-[hsl(222_16%_11%)]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
              <Check size={14} strokeWidth={3} />
            </span>
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
