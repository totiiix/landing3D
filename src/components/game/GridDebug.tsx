import * as THREE from 'three';

const TILE_SIZE = 1;
const GRID_SIZE = 20;

// Conversion grille -> monde (même fonction que Player et Duck)
const gridToWorld = (gx: number, gz: number) => ({
  x: (gx - GRID_SIZE / 2 + 0.5) * TILE_SIZE,
  z: (gz - GRID_SIZE / 2 + 0.5) * TILE_SIZE,
});

export const GridDebug = () => {
  const points: JSX.Element[] = [];

  // Créer des points rouges au centre de chaque case
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let z = 0; z < GRID_SIZE; z++) {
      const worldPos = gridToWorld(x, z);

      points.push(
        <mesh
          key={`grid-${x}-${z}`}
          position={[worldPos.x, 0.1, worldPos.z]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="red" />
        </mesh>
      );
    }
  }

  return <group name="grid-debug">{points}</group>;
};

// Composant pour afficher la position du canard
export const DuckPositionDebug = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={[position[0], position[1], position[2]]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};
