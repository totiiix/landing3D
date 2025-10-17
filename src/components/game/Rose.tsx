import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface RoseProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const Rose = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: RoseProps) => {
  const { scene } = useGLTF('/models/nature/rose.glb');

  // Cloner la scène une seule fois avec useMemo
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Remplacer le matériau pour le rendre visible
        child.material = new THREE.MeshStandardMaterial({
          color: '#ff1493', // Rose vif pour être sûr de le voir
          roughness: 0.5,
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
useGLTF.preload('/models/nature/rose.glb');
