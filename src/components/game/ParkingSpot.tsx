import * as THREE from 'three';
import { useMemo } from 'react';

interface ParkingSpotProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  depth?: number;
}

export const ParkingSpot = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 3,
  depth = 3,
}: ParkingSpotProps) => {
  const lineHeight = 0.01; // Même hauteur que les lignes de la grille

  // Créer la géométrie des lignes de parking
  const geometry = useMemo(() => {
    const points = [];
    const halfWidth = width / 2;
    const halfDepth = depth / 2;

    // Ligne gauche
    points.push(
      new THREE.Vector3(-halfWidth, lineHeight, -halfDepth),
      new THREE.Vector3(-halfWidth, lineHeight, halfDepth)
    );

    // Ligne droite
    points.push(
      new THREE.Vector3(halfWidth, lineHeight, -halfDepth),
      new THREE.Vector3(halfWidth, lineHeight, halfDepth)
    );

    // Ligne avant
    points.push(
      new THREE.Vector3(-halfWidth, lineHeight, -halfDepth),
      new THREE.Vector3(halfWidth, lineHeight, -halfDepth)
    );

    // Ligne arrière
    points.push(
      new THREE.Vector3(-halfWidth, lineHeight, halfDepth),
      new THREE.Vector3(halfWidth, lineHeight, halfDepth)
    );

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [width, depth]);

  return (
    <group position={position} rotation={rotation}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#ffffff" toneMapped={false} linewidth={2} />
      </lineSegments>
    </group>
  );
};
