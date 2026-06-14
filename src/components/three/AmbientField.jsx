import { Suspense, lazy } from 'react';
import { useMotionPref } from '../../context/MotionContext';

// Lazy so three.js stays out of the main bundle (loaded only when cinematic).
const AmbientCanvas = lazy(() => import('./AmbientParticles'));

/**
 * Faint, slowly rotating point-cloud that echoes the hero's "signal from noise"
 * motif behind a section. Cinematic-only and non-interactive.
 */
export const AmbientField = ({ className = '' }) => {
  const { cinematic } = useMotionPref();
  if (!cinematic) return null;

  return (
    <div className={`absolute inset-0 -z-10 pointer-events-none opacity-[0.45] ${className}`}>
      <Suspense fallback={null}>
        <AmbientCanvas />
      </Suspense>
    </div>
  );
};
