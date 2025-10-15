import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

interface PropModelProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export const PropModel = ({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
}: PropModelProps) => {
  const { scene } = useGLTF(modelPath);

  // Clone the scene to allow multiple instances
  const clonedScene = scene.clone();

  // Configure shadows on all meshes
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;
      }
    });
  }, [clonedScene, castShadow, receiveShadow]);

  const scaleArray = typeof scale === 'number' ? [scale, scale, scale] : scale;

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scaleArray}
    />
  );
};

// Preload function for optimization
export const preloadProp = (modelPath: string) => {
  useGLTF.preload(modelPath);
};
