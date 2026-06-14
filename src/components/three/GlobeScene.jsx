import { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

const R = 2;

const locations = [
  { name: 'Mumbai', lat: 19.07, lon: 72.87 },
  { name: 'London', lat: 51.5, lon: -0.12 },
  { name: 'College Station', lat: 30.62, lon: -96.33 },
];

function latLon(lat, lon, r = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function buildArc(a, b) {
  const start = latLon(a.lat, a.lon);
  const end = latLon(b.lat, b.lon);
  const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.45);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

const TravelingDot = ({ curve, speed = 0.18, offset = 0, color = '#f5a623' }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    const p = curve.getPoint(t);
    if (ref.current) ref.current.position.copy(p);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
};

const Marker = ({ loc, pos, selected, onSelect }) => (
  <group position={pos}>
    {/* hit area */}
    <mesh
      onClick={(e) => { e.stopPropagation(); onSelect(loc.name); }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = ''; }}
    >
      <sphereGeometry args={[0.18, 12, 12]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
    <mesh>
      <sphereGeometry args={[selected ? 0.07 : 0.05, 16, 16]} />
      <meshBasicMaterial color="#f5a623" toneMapped={false} />
    </mesh>
    <mesh>
      <sphereGeometry args={[selected ? 0.17 : 0.1, 16, 16]} />
      <meshBasicMaterial color="#f5a623" transparent opacity={selected ? 0.3 : 0.16} toneMapped={false} />
    </mesh>
  </group>
);

const Globe = ({ selected, onSelect }) => {
  const groupRef = useRef();
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const targetQ = useRef(new THREE.Quaternion());
  const baseQ = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(0.2, 0, 0.08)), []);

  const dots = useMemo(() => {
    const N = 2600;
    const arr = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      arr[i * 3] = Math.cos(theta) * r * R;
      arr[i * 3 + 1] = y * R;
      arr[i * 3 + 2] = Math.sin(theta) * r * R;
    }
    return arr;
  }, []);

  const arcs = useMemo(() => [buildArc(locations[0], locations[1]), buildArc(locations[1], locations[2])], []);
  const arcPoints = useMemo(() => arcs.map((c) => c.getPoints(60)), [arcs]);
  const markers = useMemo(() => locations.map((l) => latLon(l.lat, l.lon, R * 1.01)), []);

  const atmosphereMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(0.12, 0.72, 0.92) } },
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `varying vec3 vN; uniform vec3 uColor; void main(){ float i = pow(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(uColor, 1.0) * clamp(i, 0.0, 1.0); }`,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      }),
    []
  );

  useEffect(() => {
    if (selected) {
      const loc = locations.find((l) => l.name === selected);
      if (loc) {
        const dir = latLon(loc.lat, loc.lon).normalize();
        targetQ.current.setFromUnitVectors(dir, new THREE.Vector3(0, 0, 1));
      }
    }
  }, [selected]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const goal = selectedRef.current ? targetQ.current : baseQ;
    const a = 1 - Math.pow(0.0015, delta);
    groupRef.current.quaternion.slerp(goal, a);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[R * 0.99, 48, 48]} />
        <meshBasicMaterial color="#070b14" />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={dots} count={dots.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#13c7e0" size={0.022} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
      </points>

      <mesh scale={1.18} material={atmosphereMat}>
        <sphereGeometry args={[R, 48, 48]} />
      </mesh>

      {arcPoints.map((pts, i) => (
        <Line key={i} points={pts} color="#f5a623" lineWidth={1.4} transparent opacity={0.85} />
      ))}
      {arcs.map((c, i) => (
        <TravelingDot key={i} curve={c} offset={i * 0.4} />
      ))}

      {locations.map((l, i) => (
        <Marker key={l.name} loc={l} pos={markers[i]} selected={selected === l.name} onSelect={onSelect} />
      ))}
    </group>
  );
};

export default function GlobeScene({ selected, onSelect }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <Globe selected={selected} onSelect={onSelect} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!selected}
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.6}
      />
    </Canvas>
  );
}
