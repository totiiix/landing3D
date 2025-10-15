import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TreeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const Tree = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: TreeProps) => {
  const { scene } = useGLTF('/models/nature/tree.glb');

  // Cloner la scène pour pouvoir l'utiliser plusieurs fois
  const clonedScene = scene.clone();

  // Activer les ombres pour tous les meshes
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

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
useGLTF.preload('/models/nature/tree.glb');
