import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TrainTrackProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const TrainTrack = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: TrainTrackProps) => {
  const { scene } = useGLTF('/models/nature/train_track.glb');

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
useGLTF.preload('/models/nature/train_track.glb');
