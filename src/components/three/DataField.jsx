import { Suspense, lazy } from 'react';
import { useMotionPref } from '../../context/MotionContext';

// Lazy: pulls three.js / R3F out of the main bundle entirely.
const DataFieldCanvas = lazy(() => import('./DataFieldCanvas'));

/** Static fallback for lite mode / reduced motion / 3D unsupported. */
const StaticField = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 45%, hsl(var(--primary) / 0.12), transparent 70%)',
      }}
    />
    <div className="absolute inset-0 grid-bg grid-bg-fade opacity-60" />
  </div>
);

export const DataField = () => {
  const { cinematic } = useMotionPref();

  if (!cinematic) return <StaticField />;

  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={<StaticField />}>
        <DataFieldCanvas />
      </Suspense>
    </div>
  );
};
