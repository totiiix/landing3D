import * as THREE from 'three';

// Modèles de test créés avec des géométries Three.js
// Alternative aux GLB pour tester rapidement le système de décoration

interface ModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

// Arbre stylisé voxel
export const TestTree = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Tronc */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Feuillage niveau 1 */}
      {[-1, 0, 1].map((x) =>
        [-1, 0, 1].map((z) => {
          if (x === 0 && z === 0) return null;
          return (
            <mesh key={`l1-${x}-${z}`} position={[x * 0.3, 0.9, z * 0.3]} castShadow>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
          );
        })
      )}

      {/* Feuillage niveau 2 */}
      {[-1, 0, 1].map((x) =>
        [-1, 0, 1].map((z) => (
          <mesh key={`l2-${x}-${z}`} position={[x * 0.3, 1.2, z * 0.3]} castShadow>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        ))
      )}

      {/* Feuillage niveau 3 - sommet */}
      {[[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].map(([x, z], i) => (
        <mesh key={`l3-${i}`} position={[x * 0.3, 1.5, z * 0.3]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      ))}
    </group>
  );
};

// Rocher
export const TestRock = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) => {
  const positions = [
    { x: 0, y: 0.15, z: 0, scale: [0.5, 0.3, 0.5] as [number, number, number], rot: 0.2 },
    { x: 0.15, y: 0.2, z: 0.1, scale: [0.3, 0.4, 0.3] as [number, number, number], rot: 0.5 },
    { x: -0.12, y: 0.18, z: -0.08, scale: [0.35, 0.36, 0.35] as [number, number, number], rot: -0.3 },
    { x: 0.05, y: 0.1, z: -0.15, scale: [0.25, 0.2, 0.25] as [number, number, number], rot: 0.8 },
  ];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          position={[pos.x, pos.y, pos.z]}
          rotation={[0, pos.rot, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={pos.scale} />
          <meshStandardMaterial color="#808080" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
};

// Clôture en bois
export const TestFence = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Poteaux verticaux */}
      {[-1, 0, 1].map((i) => (
        <mesh key={`post-${i}`} position={[i * 0.4, 0.4, 0]} castShadow>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
      ))}

      {/* Barres horizontales */}
      {[0, 1].map((i) => (
        <mesh key={`bar-${i}`} position={[0, 0.3 + i * 0.3, 0]} castShadow>
          <boxGeometry args={[1, 0.08, 0.08]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
      ))}
    </group>
  );
};

// Buisson
export const TestBush = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) => {
  const positions = [
    [0, 0.2, 0],
    [0.2, 0.2, 0],
    [-0.2, 0.2, 0],
    [0, 0.2, 0.2],
    [0, 0.2, -0.2],
    [0, 0.4, 0],
  ] as [number, number, number][];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color="#2F4F2F" />
        </mesh>
      ))}
    </group>
  );
};

// Lampadaire
export const TestLamp = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Poteau */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Lampe */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.2, 0.15, 0.2]} />
        <meshStandardMaterial color="#FFFF88" emissive="#FFFF00" emissiveIntensity={0.5} />
      </mesh>

      {/* Lumière */}
      <pointLight position={[0, 1.2, 0]} intensity={1} distance={5} color="#FFFF88" castShadow />
    </group>
  );
};
