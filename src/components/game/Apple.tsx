import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface AppleProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const Apple = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: AppleProps) => {
  const { scene } = useGLTF('/models/nature/apple.glb');

  // Cloner la scène une seule fois avec useMemo
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return (
    <group position={position}>
      {/* Point vert de debug au centre de la position */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>

      {/* Groupe avec offset pour centrer la pomme */}
      <group position={[-0.3, 0, 0]}>
        <primitive
          object={clonedScene}
          rotation={rotation}
          scale={scale}
        />
      </group>
    </group>
  );
};

// Précharger le modèle
useGLTF.preload('/models/nature/apple.glb');
