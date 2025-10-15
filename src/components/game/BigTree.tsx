import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

interface BigTreeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const BigTree = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: BigTreeProps) => {
  const { scene } = useGLTF('/models/test/big_tree.glb');

  // Cloner la scène pour pouvoir l'utiliser plusieurs fois
  const clonedScene = scene.clone();

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

// Précharger le modèle
useGLTF.preload('/models/test/big_tree.glb');
