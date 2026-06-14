import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 6500;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aRand;
  attribute float aSignal;
  varying float vSignal;
  void main() {
    vec3 pos = position;
    float t = uTime * 0.25 + aRand * 6.2831;
    pos += vec3(sin(t), cos(t * 1.2), sin(t * 0.8)) * 0.12;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + aSignal * 1.6) * uPixelRatio * (8.0 / -mv.z);
    vSignal = aSignal;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uNoise;
  uniform vec3 uSignal;
  varying float vSignal;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (length(c) > 0.5) discard;
    float a = smoothstep(0.5, 0.0, length(c));
    vec3 col = mix(uNoise, uSignal, vSignal);
    gl_FragColor = vec4(col, a * mix(0.35, 0.9, vSignal));
  }
`;

const Field = () => {
  const ref = useRef();
  const matRef = useRef();

  const { positions, rand, signal } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const rand = new Float32Array(COUNT);
    const signal = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // sphere shell
      const r = 4.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);
      rand[i] = Math.random();
      signal[i] = Math.random() < 0.08 ? 1 : 0;
    }
    return { positions, rand, signal };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
      uNoise: { value: new THREE.Color(0.13, 0.82, 0.95) },
      uSignal: { value: new THREE.Color(0.99, 0.66, 0.16) },
    }),
    []
  );

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-aRand" array={rand} count={COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aSignal" array={signal} count={COUNT} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default function AmbientCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Field />
    </Canvas>
  );
}
