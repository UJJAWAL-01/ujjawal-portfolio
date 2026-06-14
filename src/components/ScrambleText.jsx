import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}=+*^?#01';

/**
 * Decodes text with a scramble/glitch effect.
 * Runs on mount (after `delay`ms) and optionally again on hover.
 */
export const ScrambleText = ({
  text,
  className = '',
  delay = 0,
  speed = 1,
  hoverScramble = false,
  as: Tag = 'span',
}) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef(null);

  const run = () => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const total = (text.length / speed) * 28 + 350;

    const tick = (now) => {
      const p = Math.min(1, (now - start) / total);
      const revealed = Math.floor(p * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealed || text[i] === ' ') out += text[i];
        else out += CHARS[(Math.random() * CHARS.length) | 0];
      }
      setDisplay(out);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const id = setTimeout(run, delay);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag
      className={className}
      onMouseEnter={hoverScramble ? run : undefined}
      aria-label={text}
    >
      {display}
    </Tag>
  );
};
