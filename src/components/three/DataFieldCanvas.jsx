import { Canvas } from '@react-three/fiber';
import { HeroParticles } from './HeroParticles';

/** Heavy three.js entry point, loaded lazily so it stays out of the main bundle. */
export default function DataFieldCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <HeroParticles />
    </Canvas>
  );
}
