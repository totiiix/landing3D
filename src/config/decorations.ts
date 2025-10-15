export interface Decoration {
  id: string;
  modelPath: string;
  gridPosition: { x: number; z: number };
  yOffset?: number;
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

const TILE_SIZE = 1;
const GRID_SIZE = 20;

// Helper to convert grid coordinates to world position
export const gridToWorld = (gx: number, gz: number, yOffset = 0) => ({
  x: (gx - GRID_SIZE / 2 + 0.5) * TILE_SIZE,
  y: yOffset,
  z: (gz - GRID_SIZE / 2 + 0.5) * TILE_SIZE,
});

// Configuration des décors - Vous pouvez ajouter vos modèles GLB ici
export const decorations: Decoration[] = [
  // Exemples avec modèles GLB - décommentez et ajustez les chemins
  // {
  //   id: 'tree-1',
  //   modelPath: '/models/tree.glb',
  //   gridPosition: { x: 5, z: 5 },
  //   yOffset: 0,
  //   scale: 1,
  // },
  // {
  //   id: 'rock-1',
  //   modelPath: '/models/rock.glb',
  //   gridPosition: { x: 8, z: 12 },
  //   yOffset: 0,
  //   rotation: [0, Math.PI / 4, 0],
  //   scale: 0.8,
  // },
  // {
  //   id: 'fence-1',
  //   modelPath: '/models/fence.glb',
  //   gridPosition: { x: 3, z: 7 },
  //   yOffset: 0,
  //   rotation: [0, Math.PI / 2, 0],
  // },
];

// Fonction pour vérifier si une position de grille est occupée
export const isPositionOccupied = (x: number, z: number): boolean => {
  return decorations.some(
    (deco) => deco.gridPosition.x === x && deco.gridPosition.z === z
  );
};
