import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { displacementMap, supportsRefraction } from '../../lib/liquid';

const assignRef = (ref, value) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
};

/**
 * Glass surface.
 * - Always: frosted fill, bright rim, and a specular highlight that follows the pointer.
 * - refract: in Chromium, also bends the backdrop at the rim like a lens.
 * - tilt: leans a few degrees toward the pointer.
 */
export const Glass = forwardRef(function Glass(
  {
    as: Comp = 'div',
    refract = false,
    radius = 20,
    bezel = 16,
    strength = 36,
    blur = 4,
    tilt = 0,
    strong = false,
    className,
    style,
    children,
    onPointerMove,
    onPointerLeave,
    ...rest
  },
  ref
) {
  const localRef = useRef(null);
  const rawId = useId();
  const filterId = `lg${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const [map, setMap] = useState(null);
  const enabled = refract && supportsRefraction();

  const setRefs = useCallback(
    (node) => {
      localRef.current = node;
      assignRef(ref, node);
    },
    [ref]
  );

  useEffect(() => {
    if (!enabled) return;
    const el = localRef.current;
    if (!el) return;
    let timer;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w && h) setMap({ w, h, url: displacementMap(w, h, radius, bezel) });
    };
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(update, 80);
    });
    ro.observe(el);
    update();
    return () => {
      ro.disconnect();
      clearTimeout(timer);
    };
  }, [enabled, radius, bezel]);

  const handleMove = (e) => {
    const el = localRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      if (tilt) {
        const rx = ((y / r.height) - 0.5) * -tilt;
        const ry = ((x / r.width) - 0.5) * tilt;
        el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
    }
    onPointerMove?.(e);
  };

  const handleLeave = (e) => {
    if (tilt && localRef.current) localRef.current.style.transform = '';
    onPointerLeave?.(e);
  };

  const backdrop = enabled && map ? `url(#${filterId}) blur(${blur}px) saturate(180%)` : undefined;

  return (
    <Comp
      ref={setRefs}
      className={cn('glass', strong && 'glass-strong', tilt && 'transition-transform duration-300 ease-out will-change-transform', className)}
      style={{
        borderRadius: radius,
        ...style,
        ...(backdrop && { backdropFilter: backdrop, WebkitBackdropFilter: backdrop }),
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {enabled && map && (
        <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
          <filter
            id={filterId}
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage href={map.url} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={strength} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}
      {children}
    </Comp>
  );
});
