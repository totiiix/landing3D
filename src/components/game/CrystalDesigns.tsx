import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalProps {
  position?: [number, number, number];
  color?: string;
  glowColor?: string;
}

// Design 1 : Tour spirale avec cubes décalés
export const CrystalDesign1 = ({ position = [0, 0, 0], color = '#4da6ff', glowColor = '#6bc4ff' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.position.y = position[1] + 0.8 + Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Cubes empilés en spirale */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI) / 4;
          const offset = 0.08;
          return (
            <mesh key={i} position={[Math.cos(angle) * offset, i * 0.15 - 0.3, Math.sin(angle) * offset]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial
                color={i === 2 ? glowColor : color}
                emissive={i === 2 ? glowColor : color}
                emissiveIntensity={i === 2 ? 1.2 : 0.5}
              />
            </mesh>
          );
        })}
        <pointLight position={[0, 0, 0]} color={glowColor} intensity={2} distance={3} />
      </group>
    </group>
  );
};

// Design 2 : Croix/Plus 3D avec centre brillant
export const CrystalDesign2 = ({ position = [0, 0, 0], color = '#4dff88', glowColor = '#6bffa3' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.position.y = position[1] + 0.8 + Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Centre brillant */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
        {/* Branches de la croix */}
        {[
          [0.25, 0, 0],
          [-0.25, 0, 0],
          [0, 0.25, 0],
          [0, -0.25, 0],
          [0, 0, 0.25],
          [0, 0, -0.25],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
          </mesh>
        ))}
        <pointLight position={[0, 0, 0]} color={glowColor} intensity={2.5} distance={3} />
      </group>
    </group>
  );
};

// Design 3 : Diamant pixelisé (forme losange)
export const CrystalDesign3 = ({ position = [0, 0, 0], color = '#ff4d4d', glowColor = '#ff6b6b' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.position.y = position[1] + 0.8 + Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Centre */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={1.2} />
        </mesh>
        {/* Haut */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
        </mesh>
        {/* Bas */}
        <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
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
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
          </mesh>
        ))}
        <pointLight position={[0, 0, 0]} color={glowColor} intensity={2} distance={3} />
      </group>
    </group>
  );
};

// Design 4 : Cluster de cristaux (plusieurs petits cubes)
export const CrystalDesign4 = ({ position = [0, 0, 0], color = '#ffd700', glowColor = '#ffed4e' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.position.y = position[1] + 0.8 + Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  const crystals = [
    { pos: [0, 0, 0], size: 0.25, intensity: 1.5 },
    { pos: [0.2, -0.15, 0.1], size: 0.15, intensity: 0.8 },
    { pos: [-0.15, -0.1, -0.15], size: 0.18, intensity: 0.9 },
    { pos: [0.1, 0.2, -0.1], size: 0.12, intensity: 0.7 },
    { pos: [-0.18, 0.15, 0.12], size: 0.14, intensity: 0.75 },
  ];

  return (
    <group position={position}>
      <group ref={groupRef}>
        {crystals.map((crystal, i) => (
          <mesh key={i} position={crystal.pos as [number, number, number]}>
            <boxGeometry args={[crystal.size, crystal.size * 1.5, crystal.size]} />
            <meshStandardMaterial
              color={i === 0 ? glowColor : color}
              emissive={i === 0 ? glowColor : color}
              emissiveIntensity={crystal.intensity}
            />
          </mesh>
        ))}
        <pointLight position={[0, 0, 0]} color={glowColor} intensity={2.5} distance={4} />
      </group>
    </group>
  );
};

// Design 5 : Colonne avec anneaux
export const CrystalDesign5 = ({ position = [0, 0, 0], color = '#9d4edd', glowColor = '#c77dff' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.position.y = position[1] + 0.8 + Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Colonne centrale */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.12, 0.6, 0.12]} />
          <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={1.2} />
        </mesh>
        {/* Anneaux de cubes */}
        {[-0.2, 0, 0.2].map((y, ring) =>
          [0, 1, 2, 3].map((i) => {
            const angle = (i * Math.PI) / 2;
            const radius = 0.18;
            return (
              <mesh
                key={`${ring}-${i}`}
                position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}
              >
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
              </mesh>
            );
          })
        )}
        <pointLight position={[0, 0, 0]} color={glowColor} intensity={2} distance={3} />
      </group>
    </group>
  );
};

// Design 6 : Étoile 3D (forme étoilée voxel)
export const CrystalDesign6 = ({ position = [0, 0, 0], color = '#06ffa5', glowColor = '#3dffcd' }: CrystalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.z += delta * 0.3;
      groupRef.current.position.y = position[1] + 0.8 + Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Centre */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
        {/* 6 pointes (étoile 3D) */}
        {[
          [0.3, 0, 0],
          [-0.3, 0, 0],
          [0, 0.3, 0],
          [0, -0.3, 0],
          [0, 0, 0.3],
          [0, 0, -0.3],
        ].map(([x, y, z], i) => (
          <group key={i}>
            <mesh position={[x * 0.5, y * 0.5, z * 0.5]}>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[x, y, z]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.9} />
            </mesh>
          </group>
        ))}
        <pointLight position={[0, 0, 0]} color={glowColor} intensity={2.5} distance={4} />
      </group>
    </group>
  );
};
