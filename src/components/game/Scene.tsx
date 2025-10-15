import { Canvas } from '@react-three/fiber';
import { Player } from './Player';
import { Ground } from './Ground';
import { Camera } from './Camera';
import { DecorationLayer } from './DecorationLayer';
import { TestDecorationLayer } from './TestDecorationLayer';

interface SceneProps {
  characterId: string;
  isEntering: boolean;
}

export const Scene = ({ characterId, isEntering }: SceneProps) => {
  return (
    <Canvas shadows camera={{ position: [0, 8, -8], fov: 60 }}>
      {/* Basic Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Game Objects */}
      <Player characterId={characterId} isEntering={isEntering} />
      <Ground />
      <DecorationLayer />

      {/* Test Decorations - Commentez cette ligne pour désactiver les modèles de test */}
      <TestDecorationLayer />

      {/* Camera Controller */}
      <Camera />
    </Canvas>
  );
};
