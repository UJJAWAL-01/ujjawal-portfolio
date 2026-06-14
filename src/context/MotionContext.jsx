import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const MotionContext = createContext({
  lite: false,
  reducedMotion: false,
  cinematic: true,
  toggleLite: () => {},
});

export const useMotionPref = () => useContext(MotionContext);

export const MotionProvider = ({ children }) => {
  const [lite, setLite] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('portfolio-lite') === 'true';
  });

  const [reducedMotion, setReducedMotion] = useState(false);

  // Track OS-level reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Reflect state onto <html> so CSS can react, and persist the toggle.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('lite', lite);
    root.classList.toggle('reduce-motion', reducedMotion);
    localStorage.setItem('portfolio-lite', String(lite));
  }, [lite, reducedMotion]);

  const value = useMemo(
    () => ({
      lite,
      reducedMotion,
      cinematic: !lite && !reducedMotion,
      toggleLite: () => setLite((v) => !v),
    }),
    [lite, reducedMotion]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};
