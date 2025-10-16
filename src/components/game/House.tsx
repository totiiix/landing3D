import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface HouseProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const House = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: HouseProps) => {
  const { scene } = useGLTF('/models/house.glb');

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
      <primitive
        object={clonedScene}
        rotation={rotation}
        scale={scale}
      />
    </group>
  );
};

// Précharger le modèle
useGLTF.preload('/models/house.glb');
