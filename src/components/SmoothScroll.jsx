import { useEffect } from 'react';
import Lenis from 'lenis';
import { sectionIds } from '../content';

const NAV_OFFSET = -56;

/**
 * Lenis smooth scrolling plus keyboard navigation:
 * j / k jump between sections, g / G go to top / bottom.
 * Falls back to native scrolling when the OS asks for reduced motion.
 */
export const SmoothScroll = () => {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;
    let rafId = null;

    if (!reduce) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      window.__lenis = lenis;
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const currentIndex = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let idx = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) idx = i;
      });
      return idx;
    };

    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector('[role="dialog"]')) return;

      let target = null;
      if (e.key === 'j') target = sectionIds[Math.min(currentIndex() + 1, sectionIds.length - 1)];
      else if (e.key === 'k') target = sectionIds[Math.max(currentIndex() - 1, 0)];
      else if (e.key === 'g') target = 'hero';
      else if (e.key === 'G') target = 'contact';
      if (target) smoothScrollTo(`#${target}`);
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        window.__lenis = null;
      }
    };
  }, []);

  return null;
};

/** Scroll to a section, accounting for the fixed nav. */
export const smoothScrollTo = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  if (selector === '#hero') {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: NAV_OFFSET });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET, behavior: 'smooth' });
};
