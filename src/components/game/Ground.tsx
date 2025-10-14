import * as THREE from 'three';

export const Ground = () => {
  const platformSize = 20;
  const tileSize = 1;
  const totalSize = platformSize * tileSize;
  const platformHeight = 0.5;

  // Create grid lines geometry
  const points = [];
  for (let i = 0; i <= platformSize; i++) {
    const offset = (i - platformSize / 2) * tileSize;
    // Horizontal lines (along X axis)
    points.push(
      new THREE.Vector3(-totalSize / 2, 0.01, offset),
      new THREE.Vector3(totalSize / 2, 0.01, offset)
    );
    // Vertical lines (along Z axis)
    points.push(
      new THREE.Vector3(offset, 0.01, -totalSize / 2),
      new THREE.Vector3(offset, 0.01, totalSize / 2)
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group>
      {/* White grid lines */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#FFFFFF" toneMapped={false} />
      </lineSegments>
    </group>
  );
};
