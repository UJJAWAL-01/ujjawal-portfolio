import { useEffect } from 'react';
import Lenis from 'lenis';
import { useMotionPref } from '../context/MotionContext';

const SECTION_IDS = [
  'hero', 'about', 'education', 'skills', 'projects', 'research',
  'experience', 'certifications', 'recommendations', 'contact',
];

/**
 * Initializes Lenis smooth scrolling and global keyboard navigation.
 * - j / k (or arrows): jump between sections
 * - g / G: top / bottom
 * Respects reduced-motion: falls back to native instant scrolling.
 */
export const SmoothScroll = () => {
  const { reducedMotion } = useMotionPref();

  useEffect(() => {
    let lenis = null;
    let rafId = null;

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.1,
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

    const scrollToEl = (el) => {
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -10 });
      else el.scrollIntoView({ behavior: 'auto' });
    };

    const currentIndex = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let idx = 0;
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) idx = i;
      });
      return idx;
    };

    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey) return;

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(currentIndex() + 1, SECTION_IDS.length - 1);
        scrollToEl(document.getElementById(SECTION_IDS[next]));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(currentIndex() - 1, 0);
        scrollToEl(document.getElementById(SECTION_IDS[prev]));
      } else if (e.key === 'g') {
        scrollToEl(document.getElementById('hero'));
      } else if (e.key === 'G') {
        scrollToEl(document.getElementById('contact'));
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) { lenis.destroy(); window.__lenis = null; }
    };
  }, [reducedMotion]);

  return null;
};

/** Helper other components can call to scroll to a hash target via Lenis. */
export const smoothScrollTo = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -10 });
  else el.scrollIntoView({ behavior: 'smooth' });
};
