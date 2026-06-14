import { Suspense, lazy } from 'react';
import { useMotionPref } from '../../context/MotionContext';

const GlobeScene = lazy(() => import('./GlobeScene'));

/** Static fallback for lite / reduced-motion. */
const Fallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div
      className="w-40 h-40 rounded-full border border-primary/30"
      style={{ background: 'radial-gradient(circle at 35% 30%, hsl(var(--primary) / 0.18), transparent 70%)' }}
    />
  </div>
);

export const JourneyGlobe = ({ selected, onSelect }) => {
  const { cinematic } = useMotionPref();
  if (!cinematic) return <Fallback />;
  return (
    <Suspense fallback={<Fallback />}>
      <GlobeScene selected={selected} onSelect={onSelect} />
    </Suspense>
  );
};
