import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface OldManProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const OldMan = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: OldManProps) => {
  const { scene } = useGLTF('/models/old_man.glb');

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
      {/* Groupe avec offset pour centrer le modèle */}
      <group position={[-0.4, 0, 0]}>
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
useGLTF.preload('/models/old_man.glb');
