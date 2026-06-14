import { useRef } from 'react';
import { cn } from '../../lib/utils';
import { useMotionPref } from '../../context/MotionContext';

const TONE = {
  live: '#18c08f',
  online: '#18c08f',
  featured: 'hsl(var(--accent))',
  active: 'hsl(var(--accent))',
  closed: '#8a93a6',
  private: '#ff5f56',
  default: 'hsl(var(--primary))',
};

/**
 * A Bloomberg-style function panel: a labeled header strip (function code +
 * title + live status dot) over a data body. The card language for the site.
 * Pass `tilt` for subtle pointer-driven 3D parallax (cinematic only).
 */
export const Panel = ({
  code,
  title,
  status,
  tone = 'default',
  className,
  bodyClassName,
  blink = true,
  tilt = false,
  children,
  ...props
}) => {
  const { cinematic } = useMotionPref();
  const ref = useRef(null);
  const enableTilt = tilt && cinematic;
  const dot = TONE[tone] || TONE.default;

  const onMove = (e) => {
    if (!enableTilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateX(${(-py * 4.5).toFixed(2)}deg) rotateY(${(px * 4.5).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={enableTilt ? onMove : undefined}
      onMouseLeave={enableTilt ? onLeave : undefined}
      style={enableTilt ? { transition: 'transform 0.25s ease', willChange: 'transform' } : undefined}
      className={cn('panel', className)}
      {...props}
    >
      <div className="panel-head">
        {code && <span className="panel-tag">{code}</span>}
        <span className="panel-title">{title}</span>
        {status && (
          <span className="panel-status">
            <span
              className={blink ? 'caret-blink' : undefined}
              style={{
                width: 7,
                height: 7,
                borderRadius: 9999,
                background: dot,
                display: 'inline-block',
                boxShadow: `0 0 8px ${dot}`,
              }}
            />
            {status}
          </span>
        )}
      </div>
      <div className={cn('panel-body', bodyClassName)}>{children}</div>
    </div>
  );
};
