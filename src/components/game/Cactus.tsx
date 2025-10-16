import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface CactusProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const Cactus = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: CactusProps) => {
  const { scene } = useGLTF('/models/nature/cactus.glb');

  // Cloner la scène une seule fois avec useMemo
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Remplacer complètement le matériau par un nouveau matériau vert
        child.material = new THREE.MeshStandardMaterial({
          color: '#4a8c3a',
          roughness: 0.8,
          metalness: 0.1,
        });
      }
    });
    return clone;
  }, [scene]);

  return (
    <group position={position}>
      <primitive
        object={clonedScene}
        rotation={rotation}
        scale={scale}
      />
    </group>
  );
};

// Précharger le modèle
useGLTF.preload('/models/nature/cactus.glb');
