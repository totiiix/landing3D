import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface CarProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const Car = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: CarProps) => {
  const { scene } = useGLTF('/models/car.glb');

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
useGLTF.preload('/models/car.glb');
