import * as THREE from 'three';

interface VoxelStructure {
  position: [number, number, number];
  blocks: [number, number, number, number, number, number][]; // [x, y, z, width, height, depth]
  color: string;
  opacity: number;
}

export const MysteriousStructures = () => {
  // Définir plusieurs structures mystérieuses
  const structures: VoxelStructure[] = [
    // Tour Nord-Ouest
    {
      position: [-28, -0.5, -28],
      blocks: [
        [0, 0, 0, 4, 18, 4],    // Base de la tour
        [0.5, 18, 0.5, 3, 10, 3], // Sommet plus fin
        [1.25, 28, 1.25, 1.5, 6, 1.5],     // Flèche
      ],
      color: '#4a5a6a',
      opacity: 0.75
    },
    // Structure en ruine Nord-Est
    {
      position: [26, -0.5, -26],
      blocks: [
        [0, 0, 0, 6, 14, 3],    // Mur principal
        [6, 0, 0, 3, 10, 3],      // Tour adjacente cassée
        [0, 14, 0, 3, 5, 2],     // Bout supérieur cassé
        [2, 19, 0.5, 2, 3, 1],   // Fragment haut
      ],
      color: '#505a68',
      opacity: 0.72
    },
    // Temple Sud
    {
      position: [0, -0.5, 30],
      blocks: [
        [-5, 0, 0, 10, 4, 8],     // Base large
        [-4, 4, 0.5, 8, 10, 7],   // Corps principal
        [-3, 14, 1, 6, 4, 6],    // Toit pyramidal bas
        [-1.5, 18, 2, 3, 3, 4],  // Sommet
      ],
      color: '#4a5868',
      opacity: 0.76
    },
    // Obélisque Ouest
    {
      position: [-32, -0.5, 3],
      blocks: [
        [0, 0, 0, 3, 24, 3],     // Colonne haute et fine
        [-0.5, 24, -0.5, 4, 3, 4], // Chapiteau
      ],
      color: '#555a75',
      opacity: 0.70
    },
    // Arche mystérieuse Est
    {
      position: [30, -0.5, 5],
      blocks: [
        [0, 0, 0, 3, 16, 3],     // Pilier gauche
        [8, 0, 0, 3, 16, 3],     // Pilier droit
        [0, 16, 0, 11, 4, 3],     // Linteau
      ],
      color: '#4d5d6d',
      opacity: 0.73
    },
    // Petite tour Sud-Ouest
    {
      position: [-24, -0.5, 22],
      blocks: [
        [0, 0, 0, 3.5, 12, 3.5],
        [0.75, 12, 0.75, 2, 8, 2],
      ],
      color: '#52627a',
      opacity: 0.68
    },
    // Ruine effondrée Sud-Est
    {
      position: [25, -0.5, 28],
      blocks: [
        [0, 0, 0, 7, 8, 4],      // Mur bas
        [0, 0, 5, 4, 12, 3],      // Mur perpendiculaire
        [7, 0, 0, 3, 5, 3],      // Fragment isolé
        [1, 8, 0.5, 3, 6, 2],    // Morceau haut du mur
      ],
      color: '#496978',
      opacity: 0.65
    }
  ];

  // Créer une structure voxel à partir des blocs
  const createVoxelStructure = (structure: VoxelStructure) => {
    return (
      <group position={structure.position} key={`structure-${structure.position.join('-')}`}>
        {structure.blocks.map((block, index) => {
          const [x, y, z, width, height, depth] = block;
          return (
            <mesh
              key={index}
              position={[x + width/2, y + height/2, z + depth/2]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial
                color={structure.color}
                transparent
                opacity={structure.opacity}
                roughness={0.9}
                metalness={0.1}
              />
            </mesh>
          );
        })}
      </group>
    );
  };

  return (
    <group name="mysterious-structures">
      {structures.map(structure => createVoxelStructure(structure))}
    </group>
  );
};
