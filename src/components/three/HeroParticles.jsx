import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 26000;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;      // 0 = noise, 1 = structure
  uniform float uShapeMix;   // 0 = network, 1 = chart
  uniform vec3  uMouse;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute vec3  aNetwork;
  attribute vec3  aChart;
  attribute float aRand;
  attribute float aSignal;

  varying float vSignal;
  varying float vMorph;

  void main() {
    vec3 noisePos  = position;
    vec3 structPos = mix(aNetwork, aChart, uShapeMix);
    vec3 pos       = mix(noisePos, structPos, uMorph);

    // gentle organic drift, stronger while in the noise state
    float t = uTime * 0.35 + aRand * 6.2831;
    pos += vec3(sin(t), cos(t * 1.1), sin(t * 0.7)) * 0.07 * (1.0 - uMorph * 0.65);

    // mouse repulsion in the view plane
    vec2 d = pos.xy - uMouse.xy;
    float dist = length(d);
    float force = smoothstep(2.6, 0.0, dist) * 1.0;
    pos.xy += normalize(d + 0.0001) * force;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float sizeBoost = mix(1.0, 2.0, aSignal);
    gl_PointSize = uSize * sizeBoost * uPixelRatio * (10.0 / -mvPosition.z);

    vSignal = aSignal;
    vMorph  = uMorph;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uNoiseColor;
  uniform vec3 uSignalColor;
  varying float vSignal;
  varying float vMorph;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);

    // cyan noise -> amber signal; resolve a touch warmer as structure forms
    vec3 col = mix(uNoiseColor, uSignalColor, vSignal);
    col = mix(col, uSignalColor, vMorph * 0.12 * (1.0 - vSignal));

    alpha *= mix(0.5, 1.0, vSignal);
    gl_FragColor = vec4(col, alpha);
  }
`;

function gaussian() {
  // Box-Muller
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export const HeroParticles = () => {
  const pointsRef = useRef();
  const matRef = useRef();
  const mouseTarget = useRef(new THREE.Vector3(999, 999, 0));
  const mouse = useRef(new THREE.Vector3(999, 999, 0));
  const intro = useRef(0);

  const { positions, network, chart, rand, signal } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3); // noise
    const network = new Float32Array(COUNT * 3);
    const chart = new Float32Array(COUNT * 3);
    const rand = new Float32Array(COUNT);
    const signal = new Float32Array(COUNT);

    // ---- noise cloud (loose box) ----
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = gaussian() * 4.2;
      positions[i * 3 + 1] = gaussian() * 2.8;
      positions[i * 3 + 2] = gaussian() * 2.4;
      rand[i] = Math.random();
    }

    // ---- network graph: clusters (nodes) + edges between nearest clusters ----
    const CLUSTERS = 120;
    const hubs = [];
    for (let c = 0; c < CLUSTERS; c++) {
      hubs.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 13,
          (Math.random() - 0.5) * 7.5,
          (Math.random() - 0.5) * 4
        )
      );
    }
    // nearest neighbour per hub
    const nearest = hubs.map((h, i) => {
      let best = -1, bestD = Infinity;
      hubs.forEach((g, j) => {
        if (i === j) return;
        const dd = h.distanceToSquared(g);
        if (dd < bestD) { bestD = dd; best = j; }
      });
      return best;
    });
    for (let i = 0; i < COUNT; i++) {
      if (Math.random() < 0.55) {
        // node cluster
        const h = hubs[(Math.random() * CLUSTERS) | 0];
        network[i * 3] = h.x + gaussian() * 0.22;
        network[i * 3 + 1] = h.y + gaussian() * 0.22;
        network[i * 3 + 2] = h.z + gaussian() * 0.18;
      } else {
        // edge between a hub and its nearest neighbour
        const a = (Math.random() * CLUSTERS) | 0;
        const b = nearest[a];
        const t = Math.random();
        const hb = hubs[a], hg = hubs[b];
        network[i * 3] = hb.x + (hg.x - hb.x) * t + gaussian() * 0.05;
        network[i * 3 + 1] = hb.y + (hg.y - hb.y) * t + gaussian() * 0.05;
        network[i * 3 + 2] = hb.z + (hg.z - hb.z) * t + gaussian() * 0.05;
      }
    }

    // ---- chart: a smooth data-terrain grid (XZ plane, Y = layered field) ----
    const gx = 200;
    const gz = Math.ceil(COUNT / gx);
    const W = 15, D = 8;
    let idx = 0;
    for (let zi = 0; zi < gz && idx < COUNT; zi++) {
      for (let xi = 0; xi < gx && idx < COUNT; xi++) {
        const x = (xi / (gx - 1) - 0.5) * W;
        const z = (zi / (gz - 1) - 0.5) * D;
        const y =
          Math.sin(x * 0.55) * 0.9 +
          Math.cos(z * 0.9) * 0.6 +
          Math.sin((x + z) * 0.4) * 0.5;
        chart[idx * 3] = x;
        chart[idx * 3 + 1] = y - 0.2;
        chart[idx * 3 + 2] = z;
        idx++;
      }
    }

    // ---- signal nodes (amber) ----
    for (let i = 0; i < COUNT; i++) {
      signal[i] = Math.random() < 0.07 ? 1 : 0;
    }

    return { positions, network, chart, rand, signal };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uShapeMix: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uSize: { value: 3.4 },
      uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
      uNoiseColor: { value: new THREE.Color(0.13, 0.82, 0.95) },
      uSignalColor: { value: new THREE.Color(0.99, 0.66, 0.16) },
    }),
    []
  );

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    const time = state.clock.elapsedTime;
    u.uTime.value = time;

    // intro: assemble from noise on first ~2.6s
    intro.current = THREE.MathUtils.damp(intro.current, 1, 1.1, delta);
    // keep the field mostly scattered (airy starfield) with structure only hinted
    const breathe = 0.46 + 0.16 * Math.sin(time * 0.2);
    u.uMorph.value = intro.current * breathe;
    // slowly alternate network <-> chart
    u.uShapeMix.value = 0.5 + 0.5 * Math.sin(time * 0.11);

    // mouse: unproject pointer onto z=0 plane
    const { pointer, camera } = state;
    const v = new THREE.Vector3(pointer.x, pointer.y, 0.5).unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const dz = -camera.position.z / dir.z;
    mouseTarget.current.copy(camera.position).add(dir.multiplyScalar(dz));
    mouse.current.lerp(mouseTarget.current, 0.12);
    u.uMouse.value.copy(mouse.current);

    // slow rotation + a tilt that grows as the chart-terrain takes over
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(time * 0.06) * 0.35 + pointer.x * 0.25;
      pointsRef.current.rotation.x = 0.12 * u.uShapeMix.value + pointer.y * -0.12;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-aNetwork" array={network} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-aChart" array={chart} count={COUNT} itemSize={3} />
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
