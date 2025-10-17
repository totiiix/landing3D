import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalProps {
  position?: [number, number, number];
  type?: 'blue' | 'green' | 'red' | 'gold';
}

// Configuration des couleurs selon le type
const getConfig = (type: 'blue' | 'green' | 'red' | 'gold') => {
  const configs = {
    blue: {
      crystal: '#4da6ff',
      glow: '#6bc4ff',
      particles: '#a3d9ff',
      halo: '#4da6ff',
      emissive: '#2e7acc'
    },
    green: {
      crystal: '#4dff88',
      glow: '#6bffa3',
      particles: '#a3ffc4',
      halo: '#4dff88',
      emissive: '#2ecc5e'
    },
    red: {
      crystal: '#ff4d4d',
      glow: '#ff6b6b',
      particles: '#ffa3a3',
      halo: '#ff4d4d',
      emissive: '#cc2e2e'
    },
    gold: {
      crystal: '#ffd700',
      glow: '#ffed4e',
      particles: '#fff5a3',
      halo: '#ffd700',
      emissive: '#cc9f00'
    }
  };
  return configs[type];
};

// Design 3 : Diamant pixelisé
export const CrystalDiamond = ({ position = [0, 0, 0], type = 'blue' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const config = useMemo(() => getConfig(type), [type]);

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      const floatY = Math.sin(timeRef.current * 1.5) * 0.15;
      groupRef.current.position.y = position[1] + 0.8 + floatY;
    }

    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.5;
      crystalRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.1;
    }

    if (haloRef.current) {
      const pulse = 0.8 + Math.sin(timeRef.current * 2) * 0.2;
      haloRef.current.scale.setScalar(pulse);
      haloRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Halo */}
      <mesh ref={haloRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.79, 0]}>
        <ringGeometry args={[0.3, 0.6, 32]} />
        <meshBasicMaterial color={config.halo} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      <group ref={crystalRef}>
        {/* Centre */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color={config.glow} emissive={config.glow} emissiveIntensity={1.2} />
        </mesh>
        {/* Haut */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color={config.crystal} emissive={config.crystal} emissiveIntensity={0.7} />
        </mesh>
        {/* Bas */}
        <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color={config.crystal} emissive={config.crystal} emissiveIntensity={0.7} />
        </mesh>
        {/* Coins */}
        {[
          [0.15, 0, 0],
          [-0.15, 0, 0],
          [0, 0, 0.15],
          [0, 0, -0.15],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={config.crystal} emissive={config.crystal} emissiveIntensity={0.5} transparent opacity={0.8} />
          </mesh>
        ))}
        <pointLight position={[0, 0, 0]} color={config.glow} intensity={2} distance={3} />
      </group>
    </group>
  );
};

// Design 4 : Cluster de cristaux
export const CrystalCluster = ({ position = [0, 0, 0], type = 'green' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const config = useMemo(() => getConfig(type), [type]);

  const crystals = [
    { pos: [0, 0, 0], size: 0.25, intensity: 1.5 },
    { pos: [0.2, -0.15, 0.1], size: 0.15, intensity: 0.8 },
    { pos: [-0.15, -0.1, -0.15], size: 0.18, intensity: 0.9 },
    { pos: [0.1, 0.2, -0.1], size: 0.12, intensity: 0.7 },
    { pos: [-0.18, 0.15, 0.12], size: 0.14, intensity: 0.75 },
  ];

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      const floatY = Math.sin(timeRef.current * 1.5) * 0.15;
      groupRef.current.position.y = position[1] + 0.8 + floatY;
    }

    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.5;
    }

    if (haloRef.current) {
      const pulse = 0.8 + Math.sin(timeRef.current * 2) * 0.2;
      haloRef.current.scale.setScalar(pulse);
      haloRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Halo */}
      <mesh ref={haloRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.79, 0]}>
        <ringGeometry args={[0.3, 0.6, 32]} />
        <meshBasicMaterial color={config.halo} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      <group ref={crystalRef}>
        {crystals.map((crystal, i) => (
          <mesh key={i} position={crystal.pos as [number, number, number]}>
            <boxGeometry args={[crystal.size, crystal.size * 1.5, crystal.size]} />
            <meshStandardMaterial
              color={i === 0 ? config.glow : config.crystal}
              emissive={i === 0 ? config.glow : config.crystal}
              emissiveIntensity={crystal.intensity}
            />
          </mesh>
        ))}
        <pointLight position={[0, 0, 0]} color={config.glow} intensity={2.5} distance={4} />
      </group>
    </group>
  );
};

// Design 6 : Étoile 3D
export const CrystalStar = ({ position = [0, 0, 0], type = 'red' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const config = useMemo(() => getConfig(type), [type]);

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      const floatY = Math.sin(timeRef.current * 1.5) * 0.15;
      groupRef.current.position.y = position[1] + 0.8 + floatY;
    }

    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.5;
      crystalRef.current.rotation.z += delta * 0.3;
    }

    if (haloRef.current) {
      const pulse = 0.8 + Math.sin(timeRef.current * 2) * 0.2;
      haloRef.current.scale.setScalar(pulse);
      haloRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Halo */}
      <mesh ref={haloRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.79, 0]}>
        <ringGeometry args={[0.3, 0.6, 32]} />
        <meshBasicMaterial color={config.halo} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      <group ref={crystalRef}>
        {/* Centre brillant */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={config.glow} emissive={config.glow} emissiveIntensity={1.5} toneMapped={false} />
        </mesh>

        {/* 6 pointes de l'étoile 3D */}
        {[
          [0.3, 0, 0],
          [-0.3, 0, 0],
          [0, 0.3, 0],
          [0, -0.3, 0],
          [0, 0, 0.3],
          [0, 0, -0.3],
        ].map(([x, y, z], i) => (
          <group key={i}>
            {/* Cube intermédiaire */}
            <mesh position={[x * 0.5, y * 0.5, z * 0.5]}>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial color={config.crystal} emissive={config.crystal} emissiveIntensity={0.8} />
            </mesh>
            {/* Pointe externe */}
            <mesh position={[x, y, z]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshStandardMaterial color={config.crystal} emissive={config.crystal} emissiveIntensity={0.6} transparent opacity={0.9} />
            </mesh>
          </group>
        ))}
        <pointLight position={[0, 0, 0]} color={config.glow} intensity={2.5} distance={4} />
      </group>
    </group>
  );
};
