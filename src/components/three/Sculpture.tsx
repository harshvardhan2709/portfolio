import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface SculptureProps {
  reducedMotion: boolean;
  lowPower: boolean;
}

/** Procedural studio environment so PBR glass/metal has something to reflect (no external HDR). */
function StudioEnvironment() {
  const { gl, scene, invalidate } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    invalidate();
    return () => {
      scene.environment = null;
      envMap.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, invalidate]);

  return null;
}

function CoreSculpture({ reducedMotion, lowPower }: SculptureProps) {
  const { viewport } = useThree();
  const isDesktop = viewport.width > 6.2;
  const posX = isDesktop ? Math.min(viewport.width * 0.23, 2.2) : 0;
  const sculptureScale = isDesktop ? 0.74 : 0.52;

  const parallax = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const sparkleGeometry = useMemo(() => {
    const count = lowPower ? 60 : 140;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [lowPower]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    if (parallax.current) {
      parallax.current.rotation.y = THREE.MathUtils.damp(
        parallax.current.rotation.y,
        pointer.current.x * 0.4,
        2.2,
        delta
      );
      parallax.current.rotation.x = THREE.MathUtils.damp(
        parallax.current.rotation.x,
        pointer.current.y * 0.25,
        2.2,
        delta
      );
    }
    if (spinner.current) {
      spinner.current.rotation.y = t * 0.12;
      spinner.current.rotation.z = Math.sin(t * 0.3) * 0.08;
      spinner.current.position.y = Math.sin(t * 0.6) * 0.08;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.2;
    if (ringB.current) ringB.current.rotation.z = -t * 0.14;
  });

  const knotSegments: [number, number] = lowPower ? [160, 28] : [260, 44];

  return (
    <group position={[posX, 0, 0]} scale={sculptureScale}>
      <group ref={parallax}>
        <group ref={spinner}>
          {/* Emerald glass torus knot — the core */}
          <mesh>
            <torusKnotGeometry args={[1, 0.3, knotSegments[0], knotSegments[1]]} />
            <meshPhysicalMaterial
              color="#1f4d38"
              metalness={0.05}
              roughness={0.12}
              transmission={0.92}
              thickness={1.4}
              ior={1.45}
              clearcoat={1}
              clearcoatRoughness={0.08}
              envMapIntensity={1.4}
              attenuationColor="#2d6a4f"
              attenuationDistance={2.4}
            />
          </mesh>

          {/* Inner dark-metal shell for depth */}
          <mesh scale={0.62}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#151a17"
              metalness={0.95}
              roughness={0.28}
              envMapIntensity={0.9}
              flatShading
            />
          </mesh>
        </group>

        {/* Orbital rings */}
        <group rotation={[Math.PI / 2.35, 0.35, 0]}>
          <group ref={ringA}>
            <mesh>
              <torusGeometry args={[2.05, 0.012, 12, 160]} />
              <meshStandardMaterial color="#39453e" metalness={1} roughness={0.32} envMapIntensity={1.1} />
            </mesh>
            <mesh position={[2.05, 0, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color="#95d5b2"
                emissive="#52b788"
                emissiveIntensity={2.4}
                roughness={0.3}
              />
            </mesh>
          </group>
        </group>

        {!lowPower && (
          <group rotation={[Math.PI / 1.75, -0.5, 0.4]}>
            <group ref={ringB}>
              <mesh>
                <torusGeometry args={[2.45, 0.008, 12, 160]} />
                <meshStandardMaterial color="#2b342e" metalness={1} roughness={0.4} envMapIntensity={0.9} />
              </mesh>
              <mesh position={[-2.45, 0, 0]}>
                <sphereGeometry args={[0.038, 16, 16]} />
                <meshStandardMaterial
                  color="#74c69d"
                  emissive="#40916c"
                  emissiveIntensity={2.2}
                  roughness={0.3}
                />
              </mesh>
            </group>
          </group>
        )}

        {/* Atmospheric sparkles */}
        <points geometry={sparkleGeometry}>
          <pointsMaterial
            color="#74c69d"
            size={0.022}
            sizeAttenuation
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}

export default function Sculpture({ reducedMotion, lowPower }: SculptureProps) {
  const { viewport } = useThree();
  const isDesktop = viewport.width > 6.2;
  const posX = isDesktop ? Math.min(viewport.width * 0.23, 2.2) : 0;

  return (
    <>
      <StudioEnvironment />
      <ambientLight intensity={0.2} />
      <directionalLight position={[4 + posX, 6, 5]} intensity={1.5} />
      <spotLight position={[-6 + posX, 3, -4]} angle={0.6} penumbra={0.8} intensity={6} color="#2d6a4f" />
      <pointLight position={[posX, -3, 3]} intensity={0.7} color="#95d5b2" />
      <CoreSculpture reducedMotion={reducedMotion} lowPower={lowPower} />
    </>
  );
}
