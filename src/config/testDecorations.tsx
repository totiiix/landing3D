import { TestTree, TestRock, TestFence, TestBush, TestLamp } from '../components/game/TestModels';
import { BigTree } from '../components/game/BigTree';
import { Duck } from '../components/game/Duck';

// Configuration pour les modèles de test (sans GLB)
// Utilisez ceci pour voir des exemples immédiatement

const TILE_SIZE = 1;
const GRID_SIZE = 20;

// Helper to convert grid coordinates to world position
export const gridToWorld = (gx: number, gz: number, yOffset = 0) => ({
  x: (gx - GRID_SIZE / 2 + 0.5) * TILE_SIZE,
  y: yOffset,
  z: (gz - GRID_SIZE / 2 + 0.5) * TILE_SIZE,
});

export interface TestDecoration {
  id: string;
  Component: React.ComponentType<any>;
  gridPosition: { x: number; z: number };
  yOffset?: number;
  rotation?: [number, number, number];
  scale?: number;
}

// Position de départ du personnage (centre de la grille)
const PLAYER_START_POSITION = { x: Math.floor(GRID_SIZE / 2), z: Math.floor(GRID_SIZE / 2) }; // (10, 10)

// Exemples de décors de test - modifiez ou ajoutez les vôtres !
const allDecorations: TestDecoration[] = [
  // Arbres dans les coins
  {
    id: 'tree-1',
    Component: TestTree,
    gridPosition: { x: 3, z: 3 },
    scale: 1,
  },
  {
    id: 'tree-2',
    Component: TestTree,
    gridPosition: { x: 16, z: 3 },
    scale: 1.2,
  },
  {
    id: 'tree-3',
    Component: TestTree,
    gridPosition: { x: 3, z: 16 },
    scale: 0.9,
  },
  {
    id: 'tree-4',
    Component: TestTree,
    gridPosition: { x: 16, z: 16 },
    scale: 1.1,
  },

  // Rochers dispersés
  {
    id: 'rock-1',
    Component: TestRock,
    gridPosition: { x: 7, z: 5 },
    rotation: [0, Math.PI / 6, 0],
  },
  {
    id: 'rock-2',
    Component: TestRock,
    gridPosition: { x: 12, z: 8 },
    rotation: [0, -Math.PI / 4, 0],
    scale: 0.8,
  },
  {
    id: 'rock-3',
    Component: TestRock,
    gridPosition: { x: 5, z: 14 },
    rotation: [0, Math.PI / 3, 0],
  },

  // Clôture en ligne
  {
    id: 'fence-1',
    Component: TestFence,
    gridPosition: { x: 8, z: 10 },
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'fence-2',
    Component: TestFence,
    gridPosition: { x: 9, z: 10 },
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'fence-4',
    Component: TestFence,
    gridPosition: { x: 11, z: 10 },
    rotation: [0, Math.PI / 2, 0],
  },

  // Buissons décoratifs
  {
    id: 'bush-1',
    Component: TestBush,
    gridPosition: { x: 6, z: 7 },
  },
  {
    id: 'bush-2',
    Component: TestBush,
    gridPosition: { x: 13, z: 12 },
    scale: 0.9,
  },
  {
    id: 'bush-3',
    Component: TestBush,
    gridPosition: { x: 4, z: 11 },
    scale: 1.1,
  },

  // Lampadaires
  {
    id: 'lamp-1',
    Component: TestLamp,
    gridPosition: { x: 5, z: 9 },
  },
  {
    id: 'lamp-2',
    Component: TestLamp,
    gridPosition: { x: 14, z: 9 },
  },

  // Grand arbre (big_tree du pack nature) - Prend 4 cases (2x2)
  // Position centrale de l'arbre
  {
    id: 'big-tree-1',
    Component: BigTree,
    gridPosition: { x: 10, z: 5 },
    yOffset: 0.05,
    scale: 0.2,
  },
  // Cases additionnelles pour collision (arbre 2x2)
  {
    id: 'big-tree-collision-1',
    Component: () => null,
    gridPosition: { x: 11, z: 5 },
  },
  {
    id: 'big-tree-collision-2',
    Component: () => null,
    gridPosition: { x: 10, z: 6 },
  },
  {
    id: 'big-tree-collision-3',
    Component: () => null,
    gridPosition: { x: 11, z: 6 },
  },

  // Canard (duck) - Prend 1 case
  {
    id: 'duck-1',
    Component: Duck,
    gridPosition: { x: 10, z: 18 },
    yOffset: 0.5 ,
    scale: 0.017,
  },
];

// Filtrer les décors pour exclure la position de départ du personnage
export const testDecorations: TestDecoration[] = allDecorations.filter(
  (deco) =>
    deco.gridPosition.x !== PLAYER_START_POSITION.x ||
    deco.gridPosition.z !== PLAYER_START_POSITION.z
);

// Fonction pour vérifier si une position est occupée par un décor
export const isPositionOccupied = (x: number, z: number): boolean => {
  return testDecorations.some(
    (deco) => deco.gridPosition.x === x && deco.gridPosition.z === z
  );
};
