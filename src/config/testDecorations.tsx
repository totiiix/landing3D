import { TestRock, TestFence, TestBush } from '../components/game/TestModels';
import { BigTree } from '../components/game/BigTree';
import { Tree } from '../components/game/Tree';
import { Duck } from '../components/game/Duck';
import { TrainTrack } from '../components/game/TrainTrack';
import { Train } from '../components/game/Train';
import { House } from '../components/game/House';
import { Car } from '../components/game/Car';
import { ParkingSpot } from '../components/game/ParkingSpot';
import { Cactus } from '../components/game/Cactus';
import { OldMan } from '../components/game/OldMan';
import type { CollisionSoundType } from '../hooks/useCollisionSound';

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
  collisionSound?: CollisionSoundType;
  color?: string;
}

// Position de départ du personnage (centre de la grille)
const PLAYER_START_POSITION = { x: Math.floor(GRID_SIZE / 2), z: Math.floor(GRID_SIZE / 2) }; // (10, 10)

// Exemples de décors de test - modifiez ou ajoutez les vôtres !
const allDecorations: TestDecoration[] = [
  // Arbres dans les coins
  {
    id: 'tree-1',
    Component: Tree,
    gridPosition: { x: 5, z: 3 },
    yOffset: 0.05,
    scale: 0.015,
    rotation: [0, 0, 0], // 0°
    collisionSound: 'tree',
  },
  {
    id: 'tree-2',
    Component: Tree,
    gridPosition: { x: 17, z: 3 },
    yOffset: 0.05,
    scale: 0.020,
    rotation: [0, Math.PI / 2, 0], // 90°
    collisionSound: 'tree',
  },
  {
    id: 'tree-3',
    Component: Tree,
    gridPosition: { x: 6, z: 16 },
    yOffset: 0.05,
    scale: 0.025,
    rotation: [0, Math.PI, 0], // 180°
    collisionSound: 'tree',
  },
  {
    id: 'tree-4',
    Component: Tree,
    gridPosition: { x: 16, z: 18 },
    yOffset: 0.05,
    scale: 0.015,
    rotation: [0, -Math.PI / 2, 0], // 270° (-90°)
    collisionSound: 'tree',
  },

  // Rochers dispersés
  {
    id: 'rock-1',
    Component: TestRock,
    gridPosition: { x: 7, z: 5 },
    rotation: [0, Math.PI / 6, 0],
    collisionSound: 'rock',
  },
  {
    id: 'rock-2',
    Component: TestRock,
    gridPosition: { x: 12, z: 8 },
    rotation: [0, -Math.PI / 4, 0],
    scale: 0.8,
    collisionSound: 'rock',
  },
  {
    id: 'rock-3',
    Component: TestRock,
    gridPosition: { x: 5, z: 14 },
    rotation: [0, Math.PI / 3, 0],
    collisionSound: 'rock',
  },
  {
    id: 'rock-4',
    Component: TestRock,
    gridPosition: { x: 17, z: 6 },
    rotation: [0, Math.PI / 8, 0],
    scale: 1.1,
    collisionSound: 'rock',
  },
  {
    id: 'rock-5',
    Component: TestRock,
    gridPosition: { x: 3, z: 3 },
    rotation: [0, -Math.PI / 3, 0],
    scale: 0.9,
    collisionSound: 'rock',
  },
  {
    id: 'rock-6',
    Component: TestRock,
    gridPosition: { x: 14, z: 15 },
    rotation: [0, Math.PI / 5, 0],
    collisionSound: 'rock',
  },
  {
    id: 'rock-7',
    Component: TestRock,
    gridPosition: { x: 8, z: 18 },
    rotation: [0, -Math.PI / 6, 0],
    scale: 0.85,
    collisionSound: 'rock',
  },
  {
    id: 'rock-8',
    Component: TestRock,
    gridPosition: { x: 18, z: 14 },
    rotation: [0, Math.PI / 4, 0],
    scale: 1.05,
    collisionSound: 'rock',
  },

  // Clôture en ligne
  {
    id: 'fence-1',
    Component: TestFence,
    gridPosition: { x: 4, z: 18 },
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-2',
    Component: TestFence,
    gridPosition: { x: 4, z: 19 },
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-3',
    Component: TestFence,
    gridPosition: { x: 9, z: 15 },
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-4',
    Component: TestFence,
    gridPosition: { x: 9, z: 14 },
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-5',
    Component: TestFence,
    gridPosition: { x: 13, z: 11 },
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-6',
    Component: TestFence,
    gridPosition: { x: 13, z: 10 },
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-7',
    Component: TestFence,
    gridPosition: { x: 18, z: 6},
    rotation: [0, Math.PI , 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-8',
    Component: TestFence,
    gridPosition: { x: 19, z: 6},
    rotation: [0, Math.PI , 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-9',
    Component: TestFence,
    gridPosition: { x: 19, z: 6},
    rotation: [0, Math.PI , 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-10',
    Component: TestFence,
    gridPosition: { x: 17, z: 18},
    rotation: [0, Math.PI , 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-11',
    Component: TestFence,
    gridPosition: { x: 1, z: 17},
    rotation: [0, Math.PI , 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-12',
    Component: TestFence,
    gridPosition: { x: 2, z: 17},
    rotation: [0, Math.PI , 0],
    collisionSound: 'fence',
  },
  {
    id: 'fence-13',
    Component: TestFence,
    gridPosition: { x: 3, z: 17},
    rotation: [0, Math.PI , 0],
    collisionSound: 'fence',
  },

  // Buissons décoratifs
  {
    id: 'bush-1',
    Component: TestBush,
    gridPosition: { x: 6, z: 7 },
    color: '#E8D96B', // Jaune paille
  },
  {
    id: 'bush-2',
    Component: TestBush,
    gridPosition: { x: 13, z: 12 },
    scale: 0.9,
    color: '#7A8C4A', // Vert olive
  },
  {
    id: 'bush-3',
    Component: TestBush,
    gridPosition: { x: 4, z: 11 },
    scale: 1.1,
    color: '#8B7355', // Marron clair
  },
  {
    id: 'bush-4',
    Component: TestBush,
    gridPosition: { x: 16, z: 5 },
    scale: 0.95,
    rotation: [0, Math.PI / 3, 0],
    color: '#B8A347', // Jaune-vert olive
  },
  {
    id: 'bush-5',
    Component: TestBush,
    gridPosition: { x: 9, z: 16 },
    scale: 1.05,
    rotation: [0, -Math.PI / 4, 0],
    color: '#5A7C3E', // Vert foncé
  },
  {
    id: 'bush-6',
    Component: TestBush,
    gridPosition: { x: 2, z: 6 },
    scale: 0.85,
    rotation: [0, Math.PI / 6, 0],
    color: '#6B5D3F', // Marron foncé
  },
  {
    id: 'bush-7',
    Component: TestBush,
    gridPosition: { x: 15, z: 11 },
    rotation: [0, -Math.PI / 5, 0],
    color: '#D4B870', // Jaune doré
  },
  {
    id: 'bush-8',
    Component: TestBush,
    gridPosition: { x: 7, z: 2 },
    scale: 0.9,
    rotation: [0, Math.PI / 2, 0],
    color: '#9C8B5A', // Beige-marron
  },
  {
    id: 'bush-9',
    Component: TestBush,
    gridPosition: { x: 18, z: 17 },
    scale: 1.1,
    rotation: [0, -Math.PI / 3, 0],
    color: '#6D8C42', // Vert mousse
  },
  {
    id: 'bush-10',
    Component: TestBush,
    gridPosition: { x: 11, z: 14 },
    scale: 0.95,
    rotation: [0, Math.PI / 7, 0],
    color: '#A0954F', // Olive clair
  },

  // Grand arbre (big_tree du pack nature) - Prend 4 cases (2x2)
  // Position centrale de l'arbre
  {
    id: 'big-tree-1',
    Component: BigTree,
    gridPosition: { x: 10, z: 4 },
    yOffset: 0.05,
    scale: 0.2,
    collisionSound: 'bigTree',
  },
  // Cases additionnelles pour collision (arbre 2x2)
  {
    id: 'big-tree-collision-1',
    Component: () => null,
    gridPosition: { x: 11, z: 4 },
    collisionSound: 'bigTree',
  },
  {
    id: 'big-tree-collision-2',
    Component: () => null,
    gridPosition: { x: 10, z: 5 },
    collisionSound: 'bigTree',
  },
  {
    id: 'big-tree-collision-3',
    Component: () => null,
    gridPosition: { x: 11, z: 5 },
    collisionSound: 'bigTree',
  },

  // Deuxième grand arbre - Prend 4 cases (2x2)
  {
    id: 'big-tree-2',
    Component: BigTree,
    gridPosition: { x: 3, z: 8 },
    yOffset: 0.05,
    scale: 0.22,
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'bigTree',
  },
  // Cases additionnelles pour collision (arbre 2x2)
  {
    id: 'big-tree-2-collision-1',
    Component: () => null,
    gridPosition: { x: 4, z: 8 },
    collisionSound: 'bigTree',
  },
  {
    id: 'big-tree-2-collision-2',
    Component: () => null,
    gridPosition: { x: 3, z: 9 },
    collisionSound: 'bigTree',
  },
  {
    id: 'big-tree-2-collision-3',
    Component: () => null,
    gridPosition: { x: 4, z: 9 },
    collisionSound: 'bigTree',
  },

  // Canard (duck) - Prend 1 case
  {
    id: 'duck-1',
    Component: Duck,
    gridPosition: { x: 10, z: 18 },
    yOffset: 0.5 ,
    scale: 0.017,
  },

  // Rocher sur la position de départ du canard
  {
    id: 'rock-9',
    Component: TestRock,
    gridPosition: { x: 10, z: 18 },
    rotation: [0, Math.PI / 3, 0],
    scale: 0.9,
    collisionSound: 'rock',
  },

  // Vieil homme
  {
    id: 'old-man-1',
    Component: OldMan,
    gridPosition: { x: 2, z: 18 },
    yOffset: 0.05,
    scale: 0.9,
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'oldMan',
  },

  // Cactus dispersés
  {
    id: 'cactus-1',
    Component: Cactus,
    gridPosition: { x: 8, z: 6 },
    yOffset: 0.05,
    scale: 0.4,
    rotation: [0, Math.PI / 4, 0],
    collisionSound: 'cactus',
  },
  {
    id: 'cactus-2',
    Component: Cactus,
    gridPosition: { x: 17, z: 12 },
    yOffset: 0.05,
    scale: 0.8,
    rotation: [0, -Math.PI / 2, 0],
    collisionSound: 'cactus',
  },
  {
    id: 'cactus-3',
    Component: Cactus,
    gridPosition: { x: 4, z: 17 },
    yOffset: 0.05,
    scale: 0.6,
    rotation: [0, Math.PI / 2, 0],
    collisionSound: 'cactus',
  },
  {
    id: 'cactus-4',
    Component: Cactus,
    gridPosition: { x: 13, z: 4 },
    yOffset: 0.05,
    scale: 0.8,
    rotation: [0, Math.PI , 0],
    collisionSound: 'cactus',
  },

  // Ligne de rails devant la grille (de gauche à droite)
  {
    id: 'track-1',
    Component: TrainTrack,
    gridPosition: { x: 0, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0], // Rotation 90° pour orientation horizontale
  },
  {
    id: 'track-2',
    Component: TrainTrack,
    gridPosition: { x: 1, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-3',
    Component: TrainTrack,
    gridPosition: { x: 2, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-4',
    Component: TrainTrack,
    gridPosition: { x: 3, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-5',
    Component: TrainTrack,
    gridPosition: { x: 4, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-6',
    Component: TrainTrack,
    gridPosition: { x: 5, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-7',
    Component: TrainTrack,
    gridPosition: { x: 6, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-8',
    Component: TrainTrack,
    gridPosition: { x: 7, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-9',
    Component: TrainTrack,
    gridPosition: { x: 8, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-10',
    Component: TrainTrack,
    gridPosition: { x: 9, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-11',
    Component: TrainTrack,
    gridPosition: { x: 10, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-12',
    Component: TrainTrack,
    gridPosition: { x: 11, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-13',
    Component: TrainTrack,
    gridPosition: { x: 12, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-14',
    Component: TrainTrack,
    gridPosition: { x: 13, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-15',
    Component: TrainTrack,
    gridPosition: { x: 14, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-16',
    Component: TrainTrack,
    gridPosition: { x: 15, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-17',
    Component: TrainTrack,
    gridPosition: { x: 16, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-18',
    Component: TrainTrack,
    gridPosition: { x: 17, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-19',
    Component: TrainTrack,
    gridPosition: { x: 18, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-20',
    Component: TrainTrack,
    gridPosition: { x: 19, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  // Extension de la ligne vers la gauche (x négatifs)
  {
    id: 'track-21',
    Component: TrainTrack,
    gridPosition: { x: -1, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-22',
    Component: TrainTrack,
    gridPosition: { x: -2, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-23',
    Component: TrainTrack,
    gridPosition: { x: -3, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-24',
    Component: TrainTrack,
    gridPosition: { x: -4, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-25',
    Component: TrainTrack,
    gridPosition: { x: -5, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'track-26',
    Component: TrainTrack,
    gridPosition: { x: -6, z: 22 },
    yOffset: 0.01,
    scale: 0.05,
    rotation: [0, Math.PI / 2, 0],
  },

  // Train sur les rails
  // Note: Le modèle 3D a un décalage interne, donc les valeurs semblent incohérentes
  // mais produisent le bon positionnement visuel sur les rails
  {
    id: 'train-1',
    Component: Train,
    gridPosition: { x: -50, z: 299.4 },
    yOffset: -10,
    scale: 0.6,
    rotation: [0, 0, 0],
  },

  // Maison
  {
    id: 'house-1',
    Component: House,
    gridPosition: { x: 10, z: -5 },
    yOffset: 0.05,
    scale: 1.1,
    rotation: [0, 0, 0],
  },

  // Place de parking
  {
    id: 'parking-1',
    Component: ParkingSpot,
    gridPosition: { x: 21.5, z: 12 },
    yOffset: 0.01,
    rotation: [0, 0, 0],
  },

   {
    id: 'parking-2',
    Component: ParkingSpot,
    gridPosition: { x: 21.5, z: 6 },
    yOffset: 0.01,
    rotation: [0, 0, 0],
  },

  // Voiture - Prend 2 cases (1x2)
  {
    id: 'car-1',
    Component: Car,
    gridPosition: { x: 20.1, z: 11 },
    yOffset: 0,
    scale: 0.1,
    rotation: [0, 2 * Math.PI , 0],
  },
  // Case additionnelle pour collision (voiture 1x2)
  {
    id: 'car-collision-1',
    Component: () => null,
    gridPosition: { x: 21, z: 13 },
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

// Fonction pour obtenir le type de son de collision à une position
export const getCollisionSoundAt = (x: number, z: number): CollisionSoundType => {
  const deco = testDecorations.find(
    (deco) => deco.gridPosition.x === x && deco.gridPosition.z === z
  );
  return deco?.collisionSound || 'default';
};
