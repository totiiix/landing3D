import * as THREE from 'three';

interface MountainLayer {
  distance: number;
  color: string;
  opacity: number;
  points: [number, number][];
}

export const MountainSilhouettes = () => {
  // Définir plusieurs couches de montagnes à différentes distances
  const mountainLayers: MountainLayer[] = [
    // Montagnes très lointaines (les plus claires)
    {
      distance: -80,
      color: '#a0b0c0',
      opacity: 0.3,
      points: [
        [-100, 0], [-80, 8], [-60, 5], [-40, 12], [-20, 6], [0, 15],
        [20, 8], [40, 10], [60, 4], [80, 9], [100, 0]
      ]
    },
    // Montagnes moyennes
    {
      distance: -60,
      color: '#8a9aaa',
      opacity: 0.45,
      points: [
        [-100, 0], [-75, 6], [-50, 10], [-25, 7], [0, 13],
        [25, 9], [50, 14], [75, 5], [100, 0]
      ]
    },
    // Montagnes proches (les plus sombres)
    {
      distance: -45,
      color: '#708090',
      opacity: 0.6,
      points: [
        [-100, 0], [-70, 5], [-40, 9], [-10, 6], [10, 11],
        [40, 7], [70, 8], [100, 0]
      ]
    }
  ];

  // Créer une forme de montagne à partir des points
  const createMountainShape = (points: [number, number][]) => {
    const shape = new THREE.Shape();

    shape.moveTo(points[0][0], points[0][1]);

    // Créer des courbes douces entre les points
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1] || curr;

      // Point de contrôle pour courbe de Bézier
      const cpX = (prev[0] + curr[0]) / 2;
      const cpY = Math.max(prev[1], curr[1]) + 1;

      shape.quadraticCurveTo(cpX, cpY, curr[0], curr[1]);
    }

    // Fermer la forme en revenant au sol
    shape.lineTo(points[points.length - 1][0], 0);
    shape.lineTo(points[0][0], 0);

    return shape;
  };

  return (
    <group name="mountain-silhouettes">
      {mountainLayers.map((layer, index) => {
        const shape = createMountainShape(layer.points);
        const geometry = new THREE.ShapeGeometry(shape);

        return (
          <mesh
            key={index}
            position={[0, -1, layer.distance]}
            geometry={geometry}
          >
            <meshBasicMaterial
              color={layer.color}
              transparent
              opacity={layer.opacity}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};
